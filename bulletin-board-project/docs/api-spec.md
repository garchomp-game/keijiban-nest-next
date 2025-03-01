# API Specification for Bulletin Board Project

## Overview
The Bulletin Board Project is a multi-functional application that allows users to create, manage, and interact with posts. This document outlines the API specifications for the backend services built with Nest.js.

## Base URL
The base URL for the API is: `http://localhost:3000/api`

## Authentication API

### Login
- **Endpoint:** `POST /auth/login`
- **Request Body:**
  - `email`: string (required)
  - `password`: string (required)
- **Response:**
  - **200 OK**
    - `accessToken`: string
    - `user`: User object
  - **401 Unauthorized**
    - `message`: string

### Register
- **Endpoint:** `POST /auth/register`
- **Request Body:**
  - `name`: string (required)
  - `email`: string (required)
  - `password`: string (required)
- **Response:**
  - **201 Created**
    - `user`: User object
  - **400 Bad Request**
    - `message`: string

## User API

### Get User Profile
- **Endpoint:** `GET /users/me`
- **Headers:**
  - `Authorization`: Bearer token
- **Response:**
  - **200 OK**
    - `user`: User object
  - **401 Unauthorized**
    - `message`: string

### Update User Profile
- **Endpoint:** `PUT /users/me`
- **Headers:**
  - `Authorization`: Bearer token
- **Request Body:**
  - `name`: string (optional)
  - `email`: string (optional)
- **Response:**
  - **200 OK**
    - `user`: User object
  - **400 Bad Request**
    - `message`: string

## Posts API

### Create Post
- **Endpoint:** `POST /posts`
- **Headers:**
  - `Authorization`: Bearer token
- **Request Body:**
  - `title`: string (required)
  - `content`: string (required)
- **Response:**
  - **201 Created**
    - `post`: Post object
  - **400 Bad Request**
    - `message`: string

### Get All Posts
- **Endpoint:** `GET /posts`
- **Response:**
  - **200 OK**
    - `posts`: Array of Post objects

### Get Post by ID
- **Endpoint:** `GET /posts/:id`
- **Response:**
  - **200 OK**
    - `post`: Post object
  - **404 Not Found**
    - `message`: string

### Update Post
- **Endpoint:** `PUT /posts/:id`
- **Headers:**
  - `Authorization`: Bearer token
- **Request Body:**
  - `title`: string (optional)
  - `content`: string (optional)
- **Response:**
  - **200 OK**
    - `post`: Post object
  - **400 Bad Request**
    - `message`: string
  - **404 Not Found**
    - `message`: string

### Delete Post
- **Endpoint:** `DELETE /posts/:id`
- **Headers:**
  - `Authorization`: Bearer token
- **Response:**
  - **204 No Content**
  - **404 Not Found**
    - `message`: string

## Error Handling
All error responses will include a `message` field describing the error. 

## Conclusion
This API specification serves as a guide for developers to implement and interact with the Bulletin Board Project's backend services.