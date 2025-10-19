# API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Endpoints](#endpoints)

   * [Products](#products)
   * [Inventory Transactions](#inventory-transactions)
5. [Error Responses](#error-responses)
6. [Notes](#notes)

---

## Overview

This API provides backend services for managing products and inventory transactions. It is built using **Node.js, Express.js, Knex.js, and PostgreSQL**.

## Authentication

* Currently, the API does **not require authentication**.
* Future versions may implement **JWT-based authentication**.

## Base URL

```text
http://localhost:3000/api
```

## Endpoints

### Products

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/products`     | Get all products           |
| GET    | `/products/:id` | Get a single product by ID |
| POST   | `/products`     | Create a new product       |
| PUT    | `/products/:id` | Update an existing product |
| DELETE | `/products/:id` | Delete a product           |

#### Example: GET /products

**Request**

```http
GET /api/products HTTP/1.1
Host: localhost:3000
```

**Response**

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "High-end gaming laptop",
    "current_stock": 10
  }
]
```

### Inventory Transactions

| Method | Endpoint                      | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| GET    | `/inventory_transactions`     | Get all inventory transactions |
| POST   | `/inventory_transactions`     | Create a new transaction       |
| GET    | `/inventory_transactions/:id` | Get a single transaction by ID |

#### Example: POST /inventory_transactions

**Request**

```json
{
  "product_id": 1,
  "type": "in",
  "quantity": 20
}
```

**Response**

```json
{
  "id": 1,
  "product_id": 1,
  "type": "in",
  "quantity": 20,
  "created_at": "2025-10-18T14:00:00Z"
}
```

## Error Responses

| Status Code | Meaning               | Example Response                            |
| ----------- | --------------------- | ------------------------------------------- |
| 400         | Bad Request           | `{ "error": "Invalid product ID" }`         |
| 404         | Not Found             | `{ "error": "Product not found" }`          |
| 500         | Internal Server Error | `{ "error": "Database connection failed" }` |

## Notes

* All requests and responses use **JSON format**.
* Ensure your **PostgreSQL database is running** before testing endpoints.
* Future updates may include **authentication, pagination, and filtering**.
