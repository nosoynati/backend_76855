## CoderHouse - Backend #2

### Proyecto integrador

Consignas:
1. Desarrollar un sitio de ecommerce con un sistema de autenticación de usuarios
2. Rutas: 


Estructura de carpetas

```js
│config
│ ├─models
│ │ └─userModel.js  
│ ├─auth
│ │ └─passport.config.js
│ └─db.config.js
├src
│ ├─middlewares
│ │ └─auth.middleware.js
│ ├─routes
│ │ ├─auth.routes.js
│ │ ├─user.routes.js
│ │ └─main.routes.js
│ ├─utils
│ │ └─isValidPassword.js
│ └─app.js
└package.json
```