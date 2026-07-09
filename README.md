# DevOps Deployment Documentation

## Serviots DevOps Engineer Technical Assessment

**Candidate:** Akshatha P G

---

# Project Overview

This project demonstrates the deployment of two independent applications on a single AWS EC2 instance using Docker, Jenkins, Amazon ECR, PostgreSQL RDS, and Nginx Reverse Proxy.

## Applications

### Application 1
CRUD API

- Backend: Node.js + Express.js
- Database: PostgreSQL
- Dockerized
- Jenkins CI/CD
- Amazon ECR
- EC2 Deployment

---

### Application 2
Multi-Auth Service

- Backend: Node.js + Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Dockerized
- Jenkins CI/CD
- Amazon ECR
- EC2 Deployment

---

# Architecture

```
                    GitHub
                       │
                GitHub Webhook
                       │
                    Jenkins
         ┌─────────────┴─────────────┐
         │                           │
   CRUD API Pipeline         Multi-Auth Pipeline
         │                           │
         ▼                           ▼
    Docker Build               Docker Build
         │                           │
         ▼                           ▼
      Amazon ECR                Amazon ECR
         │                           │
         └─────────────┬─────────────┘
                       ▼
                  AWS EC2
         ┌─────────────┴─────────────┐
         │                           │
   CRUD API Container         Multi-Auth Container
      Port 5000                  Port 5001
         │                           │
         └─────────────┬─────────────┘
                       ▼
                     Nginx
                       │
                       ▼
                Public Access
```

---

# AWS Infrastructure

## Amazon EC2

- Ubuntu 24.04 LTS
- Docker Installed
- Jenkins Installed
- Nginx Installed

---

## Amazon RDS

PostgreSQL

Two separate databases

- crud_db
- multiauth_db

---

## Amazon ECR

Repositories

- crud-api
- multi-auth

---

# Docker

Each application has its own Dockerfile.

Containers

| Application | Internal Port | Host Port |
|-------------|--------------|----------|
| CRUD API | 5000 | 5000 |
| Multi-Auth | 5000 | 5001 |

---

# Jenkins CI/CD

Two independent pipelines were created.

## CRUD API Pipeline

1. Checkout Source
2. Build Docker Image
3. Login to Amazon ECR
4. Push Docker Image
5. Pull Latest Image
6. Deploy Container
7. Health Check
8. Cleanup

---

## Multi-Auth Pipeline

1. Checkout Source
2. Build Docker Image
3. Prisma Migration
4. Login to Amazon ECR
5. Push Docker Image
6. Pull Latest Image
7. Deploy Container
8. Health Check
9. Cleanup

---

# GitHub Webhooks

Both repositories are integrated with GitHub Webhooks.

Whenever code is pushed to the repository:

GitHub

↓

Webhook

↓

Jenkins

↓

Automatic Deployment

---

# Nginx Reverse Proxy

Nginx routes incoming traffic.

```
/
```

↓

CRUD API

```
/auth/*
```

↓

Multi-Auth

---

# Security

Implemented Security Features

- Docker Isolation
- JWT Authentication
- HTTP Only Cookies
- Helmet
- Environment Variables
- PostgreSQL RDS
- Security Groups
- SSH restricted to administrator IP

---

# Deployment Flow

```
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

AWS EC2

↓

Docker Deployment

↓

Health Check

↓

Application Live
```

---

# Public Endpoints

## CRUD API

```
http://13.235.241.150/
```

---

## Multi-Auth

```
http://13.235.241.150/auth/login
```

```
http://13.235.241.150/auth/signup
```

```
http://13.235.241.150/auth/verify
```

---

# AWS Services Used

- Amazon EC2
- Amazon RDS PostgreSQL
- Amazon ECR
- IAM
- Security Groups

---

# Future Improvements

- Automatic Rollback
- HTTPS using Let's Encrypt
- Prometheus
- Grafana
- Kubernetes
- CloudWatch Monitoring

---

# Author

**Akshatha P G**

DevOps Engineer