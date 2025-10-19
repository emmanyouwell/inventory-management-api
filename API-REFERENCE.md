# API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Endpoints](#endpoints)

   - [Products](#products)
   - [Tags](#tags)

5. [Error Responses](#error-responses)
6. [Notes](#notes)

---

## Overview

This API provides backend services for managing products and inventory transactions. It is built using **Node.js, Express.js, Knex.js, and PostgreSQL**.

## Authentication

- Currently, the API does **not require authentication**.

## Base URL

```text
http://localhost:3000/api
```

## Endpoints

## Products

| Method | Endpoint              | Description                  |
| :----- | :-------------------- | :--------------------------- |
| GET    | `/products`           | Get all products             |
| GET    | `/products/:id`       | Get a single product by ID   |
| POST   | `/products`           | Create a new product         |
| POST   | `/products/:id/stock` | Record inventory transaction |
| PATCH  | `/products/:id`       | Update an existing product   |
| DELETE | `/products/:id`       | Delete a product             |

### Usage

### `GET /products`

**Request**

```http
GET /api/products
```

**Queries**

| Query     | Value   | Purpose                           |
| :-------- | :------ | :-------------------------------- |
| Name      | String  | Search products by name           |
| Tag       | String  | Search products by tag name       |
| min_stock | Integer | Filter products by minimum stocks |

#### Example
```http
GET /api/products?name=Bluetooth&tag=Electronics&min_stock=10
```


**Response**

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "description": "High-quality over-ear Bluetooth headphones with noise cancellation and 20-hour battery life.",
      "current_stock": 15,
      "tags": [
        {
          "id": 1,
          "name": "Electronics"
        },
        {
          "id": 2,
          "name": "Footwear"
        },
        {
          "id": 3,
          "name": "Sale"
        }
      ],
      "created_at": "2025-10-18T14:42:38.098Z",
      "updated_at": "2025-10-18T14:42:38.098Z"
    }
  ]
}
```

### `GET /products/:id`

**Request**

```http
GET /api/products/:id
```

#### Example
```http
GET /api/products/2
```

**Response**

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {
    "id": 2,
    "name": "Smart LED TV 32-inch",
    "description": "Full HD Smart TV with built-in streaming apps and HDMI connectivity.",
    "current_stock": 10,
    "tags": [
      {
        "id": 1,
        "name": "Electronics"
      }
    ],
    "created_at": "2025-10-18T14:42:38.098Z",
    "updated_at": "2025-10-18T14:42:38.098Z"
  }
}
```

### `POST /products`

**Request**

```http
POST /api/products
```

**Body**

```json
{
  "name": "Product name",
  "description": "Product Description",
  "tags": [1, 2, 3]
}
```

**Response**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Product name",
    "description": "Product description",
    "current_stock": 0,
    "created_at": "2025-10-18T23:43:51.553Z",
    "updated_at": "2025-10-18T23:43:51.553Z",
    "tags": [1, 2, 3]
  }
}
```

### `POST /products/:id/stock`

**Request**

```http
POST /api/products/:id/stock
```

#### Example
```http
POST /api/products/1/stock
```

**Body**

```json
{
  "quantity": 3,
  "type": "in"
}
```

**Response**

```json
{
  "success": true,
  "message": "Inventory transaction created successfully",
  "data": {
    "id": 1,
    "product_id": 13,
    "quantity": 3,
    "type": "in",
    "created_at": "2025-10-18T23:44:19.128Z",
    "updated_at": "2025-10-18T23:44:19.128Z"
  }
}
```

### `PATCH /products/:id`

**Request**

```http
PATCH /api/products/:id
```

#### Example
```http
PATCH /api/products/1
```


**Body**

```json
{
  "name": "New name",
  "description": "New description"
}
```

**Response**

```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "New name",
    "description": "New description",
    "current_stock": 0,
    "created_at": "2025-10-18T23:43:51.553Z",
    "updated_at": "2025-10-18T23:43:51.553Z"
  }
}
```

### `DELETE /products/:id`

**Request**

```http
DELETE /api/products/:id
```

#### Example
```http
DELETE /api/products/1
```

**Response**

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Tags

| Method | Endpoint    | Description                |
| :----- | :---------- | :------------------------- |
| GET    | `/tags`     | Get all products           |
| GET    | `/tags/:id` | Get a single product by ID |
| POST   | `/tags`     | Create a new product       |
| PATCH  | `/tags/:id` | Update an existing product |
| DELETE | `/tags/:id` | Delete a product           |

### `GET /tags`

**Request**

```http
GET /api/tags
```

**Response**

```json
{
  "success": true,
  "message": "Tags fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "created_at": "2025-10-18T14:42:38.147Z",
      "updated_at": "2025-10-18T14:42:38.147Z"
    }
  ]
}
```

### `GET /tags/:id`

**Request**

```http
GET /api/tags/:id
```

#### Example
```http
GET /api/tags/1
```


**Response**

```json
{
  "success": true,
  "message": "Tag fetched successfully",
  "data": {
    "id": 1,
    "name": "Electronics",
    "created_at": "2025-10-19T01:17:30.654Z",
    "updated_at": "2025-10-19T01:17:30.654Z"
  }
}
```

### `POST /tags`

**Request**

```http
POST /api/tags
```

**Body**

```json
{
  "name": "Test"
}
```

**Response**

```json
{
  "success": true,
  "message": "Tag created successfully",
  "data": {
    "id": 4,
    "name": "Test",
    "created_at": "2025-10-18T23:29:07.855Z",
    "updated_at": "2025-10-18T23:29:07.855Z"
  }
}
```

### `PATCH /tags/:id`

**Request**

```http
PATCH /api/tags/:id
```

#### Example
```http
PATCH /api/tags/1
```


**Body**

```json
{
  "name": "Electronics"
}
```

**Response**

```json
{
  "success": true,
  "message": "Tag updated successfully",
  "data": {
    "id": 1,
    "name": "Electronics",
    "created_at": "2025-10-19T01:17:30.654Z",
    "updated_at": "2025-10-19T01:17:30.654Z"
  }
}
```

### `DELETE /tags/:id`

**Request**

```http
DELETE /api/tags/:id
```

#### Example
```http
DELETE /api/tags/1
```

**Response**

```json
{
  "success": true,
  "message": "Tag deleted successfully"
}
```

## Error Responses

| Status Code | Meaning               | Example Response                            |
| :---------- | :-------------------- | :------------------------------------------ |
| 400         | Bad Request           | `{ "error": "Invalid product ID" }`         |
| 404         | Not Found             | `{ "error": "Product not found" }`          |
| 500         | Internal Server Error | `{ "error": "Database connection failed" }` |

## Notes

- All requests and responses use **JSON format**.
- Ensure your **PostgreSQL database is running** before testing endpoints.
