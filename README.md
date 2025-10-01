## CoderHouse - Backend #2

### Proyecto integrador

Consignas:
1. Desarrollar un sitio de ecommerce con un sistema de autenticación de usuarios
2. Rutas y endpoints: 

Rough draft of folder structure
See complete view [here](/README.paths.md)

```js
│config
│ ├─models
│ │ └─model.js
│ ├─auth
│ │ └─passport.config.js
│ └─db.config.js
├src
│ ├─middlewares
│ │ └─auth.middleware.js
│ ├─routes
│ │ └─main.routes.js
│ ├─utils
│ │ └─isValidPassword.js
│ └─app.js
└package.json
```

### Rutas

* root: `'/'`

* USERS

  - [GET] /api/users [🔐 admin]
  - [PUT] /api/users/{id} [🔐 admin]
  - [DELETE] /api/users/{id} [🔐 admin]

  ```json
  //PUT USER body example
    {
      "first_name": "XXX",
      "last_name": "XXX",
      "age": XX,
      "role": ["user" || "admin" || "editor"]
    }
  ```

- Auth:

  - [POST] /api/auth/login
  - [POST] /api/auth/register

  ```json
  // REGSITER body example
     {
      "first_name": "XXX",
      "last_name": "XXX",
      "email": "XXX@mail.com",
      "password":"XXXXXXXXX",
      "age": XX,
      "role": ["user" || "admin" || "editor"]
    }
  ```
  - [POST] /api/auth/logout
  - [GET] /api/sessions/current [🔐 logged in user]


- Order:

  - [GET] /orders
  - [GET] /orders/{id}
  - [GET] /orders/listview [💻 html view]
  - [POST] /orders/ [🔐 users]
  ```json
  //order body example
     {
      "order":"XXX",
      "items":[
        {
          "nombre":"producto 1",
          "unitPrice":1000,
          "qty":1
        },
        {
          "nombre":"producto 2",
          "unitPrice":3000,
          "qty":3
        }
      ]
    }
  ```
  - [GET] /cart
  - [DELETE] /cart/{id}