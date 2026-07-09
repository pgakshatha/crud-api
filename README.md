# Multi-Auth Service

## Overview

This project is part of the Serviots DevOps Engineer Technical Assessment.

The objective was to deploy two independent applications on the same AWS EC2 instance using Docker, Jenkins, Nginx, PostgreSQL RDS, and Amazon ECR while maintaining complete deployment automation through CI/CD pipelines.

Application 1:
- CRUD API
- Node.js
- PostgreSQL

Application 2:
- Multi-Auth Service
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

# Architecture

```
                    GitHub
                       │
                GitHub Webhook
                       │
                   Jenkins
          ┌────────────┴────────────┐
          │                         │
     CRUD API Pipeline      Multi-Auth Pipeline
          │                         │
          ▼                         ▼
      Docker Build             Docker Build
          │                         │
          ▼                         ▼
        Amazon ECR              Amazon ECR
          │                         │
          └────────────┬────────────┘
                       ▼
                   AWS EC2
          ┌────────────┴────────────┐
          │                         │
     CRUD API Container     Multi-Auth Container
        Port 5000              Port 5001
          │                         │
          └────────────┬────────────┘
                       ▼
                     Nginx
                       │
                       ▼
                 Public Access
```

---

# Technology Stack

- AWS EC2
- AWS RDS PostgreSQL
- Amazon ECR
- Docker
- Jenkins
- GitHub
- GitHub Webhooks
- Nginx
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

# Infrastructure

## EC2

- Ubuntu 24.04 LTS
- Docker Installed
- Jenkins Installed
- Nginx Installed

---

## Database

AWS RDS PostgreSQL

Separate databases are used for each application.

Database 1

CRUD API Database

Database 2

Multi-Auth Database

This provides complete logical separation between applications while minimizing infrastructure cost by using a single RDS instance.

---

# Docker

Each application has its own Dockerfile.

Docker Images are stored in Amazon ECR.

Repositories

- crud-api
- multi-auth

---

# Jenkins

Two independent Jenkins Pipelines were created.

Pipeline 1

CRUD API

Stages

- Checkout
- Build Docker Image
- Login to Amazon ECR
- Push Docker Image
- Deploy Container
- Health Check
- Cleanup

Pipeline 2

Multi-Auth

Stages

- Checkout
- Build Docker Image
- Prisma Migration
- Login to Amazon ECR
- Push Docker Image
- Deploy Container
- Health Check
- Cleanup

GitHub Webhooks trigger both pipelines automatically after every push.

---

# Nginx Reverse Proxy

Both applications are deployed on the same EC2 instance.

Nginx routes incoming traffic without port conflicts.

Routing

CRUD API

```
/
```

Multi-Auth

```
/auth/*
```

---

# Environment Variables

Application configuration is managed using environment variables.

No secrets or credentials are committed to Git.

Environment files are stored only on the deployment server.

Example

```
PORT=

DATABASE_URL=

JWT_PRIVATE_KEY=

JWT_PUBLIC_KEY=

CORS_ORIGIN=

COOKIE_DOMAIN=
```

---

# Security

Security measures implemented

- Docker container isolation
- Environment Variables
- JWT Authentication
- HTTP Only Cookies
- Helmet Middleware
- XSS Protection
- CORS
- Nginx Reverse Proxy
- SSH restricted to trusted IP
- RDS accessible only from EC2 Security Group

---

# CI/CD Flow

Developer

↓

Git Push

↓

GitHub

↓

GitHub Webhook

↓

Jenkins

↓

Docker Build

↓

Amazon ECR

↓

EC2 Deployment

↓

Health Check

↓

Application Live

---

# Health Checks

CRUD API

```
GET /
```

Response

```
{
    "success": true,
    "message": "CRUD API is running"
}
```

Multi-Auth

```
GET /health
```

Response

```
{
    "status": true,
    "message": "Multi-Auth Service is Healthy"
}
```

---

# API Endpoints

Signup

```
POST /auth/signup
```

Login

```
POST /auth/login
```

Refresh Token

```
POST /auth/refresh
```

Verify Token

```
GET /auth/verify
```

Logout

```
POST /auth/logout
```

Health

```
GET /health
```

---

# Port Usage

| Port | Purpose |
|-------|----------|
|22|SSH|
|80|HTTP|
|443|HTTPS (Optional)|
|9090|Jenkins|
|5000|CRUD API Container|
|5001|Multi-Auth Container|

---

# Deployment Strategy

The deployment process follows these steps.

1. Push code to GitHub.
2. GitHub Webhook triggers Jenkins.
3. Jenkins builds Docker Image.
4. Docker Image pushed to Amazon ECR.
5. EC2 pulls latest image.
6. Existing container stopped.
7. New container started.
8. Health check executed.
9. Application becomes available.

---

# Database Strategy

A single AWS RDS PostgreSQL instance is used with two independent databases.

Advantages

- Lower AWS Cost
- Easy Management
- Logical Isolation
- Separate Credentials
- Independent Application Data

---

# Rollback Strategy

If deployment fails or health checks do not pass, the deployment pipeline can be configured to redeploy the previous stable Docker image stored in Amazon ECR.

This minimizes downtime and ensures application availability.

---

# Future Improvements

- HTTPS using Let's Encrypt
- Automatic Rollback
- Prometheus Monitoring
- Grafana Dashboard
- CloudWatch Logs
- Docker Compose
- Kubernetes Deployment

---

# Author

Akshatha P G

DevOps Engineer
