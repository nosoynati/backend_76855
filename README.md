## CoderHouse - Backend #2

### Proyecto integrador

Consignas:
1. Desarrollar un sitio de ecommerce con un sistema de autenticación de usuarios
2. Rutas y endpoints: 

### Estrucutra de carpetas
<details>
<summary> ver más </summary>

```js
│config
│ ├─models
│ │ └─ models.js
│ ├─auth
│ │ └─ passport.config.js
│ └─ db.config.js
├ server
│ ├─ server.js
├ src
│ ├─middlewares
│ │ └─ auth.middleware.js
│ ├─controllers
│ │ └─ controller.js
│ ├─dao
│ │ └─ dao.js
│ ├─dto
│ │ └─ dto.js
│ ├─routes
│ │ └─ main.routes.js
│ ├─ services
│ │ └─ service.js
│ ├─utils
│ │ ├─ hbsHelper.js
│ │ └─ isValidPassword.js
│ ├─ views
│ │ ├─ layouts
│ │ ├─ mails
│ │ ├─ orders
│ │ └─ main.handlebars.js
│ └─app.js
└package.json
```


</details>

### Rutas

* root: `'/'`
____

- **Users**

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
____
- **Auth**

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
      "role": "user"
    }
  ```
  - [POST] /api/auth/logout
  - [GET] /api/sessions/current [🔐 logged in user]
____
- **Cart**

  - [GET] /cart [🔐 users]
  - [POST] /cart
  - [DELETE] /cart/{id}

  ```json
  // cart body example
    {
    "productId":"68ddb3ba16ac602c86742d2b",
    "qty":2
    }
  ```
  ```json
  // cart response example
  {
    "status": "Ok!",
    "cart": {
        "_id": "68e066fb6d299a338eeb8527",
        "user": "68dfd4348a9026f2b9a394c4",
        "items": [
            {
                "product": "68dfd3698a9026f2b9a3949d",
                "qty": 3,
                "_id": "68e066fb6d299a338eeb8528"
            },
            {
                "product": "68dfd38c8a9026f2b9a394a1",
                "qty": 8,
                "_id": "68e12c2cf050d296cc881c58"
            },
            {
                "product": "68dfd3aa8a9026f2b9a394a5",
                "qty": 4,
                "_id": "68e52545c7e2be330c3f9da1"
            }
        ],
        "createdAt": "2025-10-04T00:14:51.547Z",
        "updatedAt": "2025-10-07T14:38:55.157Z",
        "__v": 2
    }
  }
  ```

- **Orders**

  La orden se genera a partir del carrito creado, por lo que se pasa sólo un código.
  Al hacer get deberá mostrar la orden con su id de mdb, el carrito y el carrito.

  - [GET] /orders/api [🔐 users]
  - [GET] /orders/api/{id}
  - [GET] /orders/listview [💻 html view]
  - [POST] /orders/ [🔐 users]

  ```json
  //order body example
    {
      "code":"XXX"
    }
  ```

  ```json
  // order response example
  {
    "orders": [
        {
            "_id": "68e1336b4fea2433233c86ea",
            "code": "120",
            "buyerName": "Pedro",
            "buyerEmail": "pedrosanchez@mail.com",
            "items": [
                {
                    "productId": "68dfd3698a9026f2b9a3949d",
                    "title": "Pasta de maní",
                    "qty": 3,
                    "unitPrice": 3700
                },
                {
                    "productId": "68dfd38c8a9026f2b9a394a1",
                    "title": "Galletitas",
                    "qty": 8,
                    "unitPrice": 1200
                }
            ],
            "total": 20700,
            "status": "pending",
            "createdAt": "2025-10-04T14:47:07.730Z",
            "updatedAt": "2025-10-04T16:13:15.169Z",
            "__v": 0
        }
    ]
  }
  ```