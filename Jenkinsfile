pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REGISTRY = "218014315199.dkr.ecr.ap-south-1.amazonaws.com"
        ECR_REPOSITORY = "crud-api"

        IMAGE_NAME = "crud-api"
        IMAGE_TAG = "${BUILD_NUMBER}"

        CONTAINER_NAME = "crud-api"
        ENV_FILE = "/opt/crud-api/.env"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."

                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                echo "Logging into Amazon ECR..."

                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Tag Docker Images') {
            steps {
                echo "Tagging Images..."

                sh '''
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                    docker tag ${IMAGE_NAME}:latest ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                echo "Pushing Images to Amazon ECR..."

                sh '''
                    docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                    docker push ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo "Deploying Application..."

                sh '''
                    docker pull ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest

                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p 5000:5000 \
                        --env-file ${ENV_FILE} \
                        ${ECR_REGISTRY}/${ECR_REPOSITORY}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo "Checking Application Health..."

                sh '''
                    sleep 20
                    curl --fail http://localhost:5000/health
                '''
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning old Docker images..."

                sh '''
                    docker image prune -af || true
                '''
            }
        }
    }

    post {

        success {
            echo "=========================================="
            echo "Build Number : ${BUILD_NUMBER}"
            echo "Application deployed successfully."
            echo "=========================================="
        }

        failure {
            echo "=========================================="
            echo "Pipeline Failed"
            echo "Check Jenkins Console Output"
            echo "=========================================="
        }

        always {
            cleanWs()
        }
    }
}