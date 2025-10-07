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
      "role": "user"
    }
  ```
  - [POST] /api/auth/logout
  - [GET] /api/sessions/current [🔐 logged in user]

- Cart:

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

- Order:

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