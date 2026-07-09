pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ECR_REGISTRY = "218014315199.dkr.ecr.ap-south-1.amazonaws.com"
        ECR_REPOSITORY = "crud-api"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                git branch: 'main', url: 'https://github.com/pgakshatha/crud-api.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t crud-api:latest .'
            }
        }

        stage('Login to Amazon ECR') {
            steps {
                echo 'Logging into Amazon ECR...'
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Tag Docker Image') {
            steps {
                echo 'Tagging Docker image...'
                sh '''
                docker tag crud-api:latest \
                $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image to Amazon ECR...'
                sh '''
                docker push \
                $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}