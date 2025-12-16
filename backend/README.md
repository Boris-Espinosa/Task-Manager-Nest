# ✅ Task Manager API

[English](#english) | [Español](#español)

---

<a name="english"></a>

## 🇬🇧 English

### 📖 Description

Task Manager API is a RESTful backend service built with NestJS for managing personal tasks and to-do lists. It allows users to register, authenticate, and organize their tasks with features like task completion tracking, user-specific task lists, and secure authentication.

### 🎯 Problem it Solves

- **Task Organization**: Keep all your tasks organized in one centralized location
- **Personal Productivity**: Track and manage your daily to-do items efficiently
- **Task Completion**: Mark tasks as completed or pending to monitor your progress
- **User-Specific Tasks**: Each user has their own private task list
- **Secure Access**: JWT-based authentication ensures your tasks remain private and secure
- **Task History**: Keep a record of when tasks were created and last updated

### 🛠️ Technologies Used

#### Backend Stack

- **NestJS** - Progressive Node.js framework for building efficient and scalable server-side applications
- **TypeScript** - Strongly typed programming language that builds on JavaScript
- **TypeORM** - Object-Relational Mapping library for TypeScript and JavaScript
- **MySQL** - Relational database management system
- **JWT (@nestjs/jwt)** - JSON Web Tokens for secure authentication
- **Bcrypt** - Password hashing and encryption
- **Class-validator** - Decorator-based validation for DTOs
- **Class-transformer** - Object transformation and serialization
- **RxJS** - Reactive programming library
- **Jest** - Testing framework
- **ESLint + Prettier** - Code linting and formatting

### 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL database (local or remote)
- npm or yarn package manager

### ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Boris-Espinosa/Task-Manager-Nest.git
cd Task-Manager-Nest/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=task_manager

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Application Port
PORT=3000
```

4. Start the development server:

```bash
npm run start:dev
```

### 🚀 Available Scripts

- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot-reload
- `npm run start:debug` - Start the server in debug mode
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests

### 📡 API Endpoints

#### Authentication (`/auth`)

| Method | Endpoint      | Description              | Auth Required |
| ------ | ------------- | ------------------------ | ------------- |
| POST   | `/auth/login` | Login user               | No            |
| GET    | `/auth/me`    | Get current user profile | Yes           |

#### Users (`/users`)

| Method | Endpoint | Description    | Auth Required |
| ------ | -------- | -------------- | ------------- |
| POST   | `/`      | Register user  | No            |
| GET    | `/`      | Get all users  | Yes           |
| GET    | `/:id`   | Get user by ID | Yes           |
| PATCH  | `/:id`   | Update user    | Yes           |
| DELETE | `/:id`   | Delete user    | Yes           |

#### Tasks (`/tasks`)

| Method | Endpoint | Description          | Auth Required |
| ------ | -------- | -------------------- | ------------- |
| POST   | `/`      | Create a new task    | Yes           |
| GET    | `/`      | Get all user's tasks | Yes           |
| GET    | `/:id`   | Get task by ID       | Yes           |
| PATCH  | `/:id`   | Update task          | Yes           |
| DELETE | `/:id`   | Delete task          | Yes           |

### 📝 API Request Examples

#### Register a User

```bash
POST /users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

#### Get Current User

```bash
GET /auth/me
Authorization: Bearer <your_jwt_token>
```

#### Create a Task

```bash
POST /tasks
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "description": "Complete project documentation",
  "completed": false
}
```

#### Get All User's Tasks

```bash
GET /tasks
Authorization: Bearer <your_jwt_token>
```

#### Update a Task

```bash
PATCH /tasks/1
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "description": "Complete project documentation - Updated",
  "completed": true
}
```

#### Delete a Task

```bash
DELETE /tasks/1
Authorization: Bearer <your_jwt_token>
```

### 🗂️ Project Structure

```
backend/
├── src/
│   ├── main.ts                      # Application entry point
│   ├── app.module.ts                # Root module
│   ├── app.controller.ts            # Root controller
│   ├── app.service.ts               # Root service
│   ├── auth/
│   │   ├── auth.module.ts           # Authentication module
│   │   ├── auth.controller.ts       # Auth endpoints
│   │   ├── auth.service.ts          # Auth business logic
│   │   └── dto/
│   │       └── input-user.dto.ts    # DTO for user login
│   ├── common/
│   │   ├── guards/
│   │   │   └── auth.guard.ts        # JWT authentication guard
│   │   └── interfaces/
│   │       └── clientUser.ts        # Client user interface
│   ├── users/
│   │   ├── users.module.ts          # Users module
│   │   ├── users.controller.ts      # User endpoints
│   │   ├── users.service.ts         # User business logic
│   │   ├── user.entity.ts           # User entity/model
│   │   └── dto/
│   │       ├── create-user.dto.ts   # DTO for creating users
│   │       └── update-user.dto.ts   # DTO for updating users
│   └── tasks/
│       ├── tasks.module.ts          # Tasks module
│       ├── tasks.controller.ts      # Task endpoints
│       ├── tasks.service.ts         # Task business logic
│       ├── task.entity.ts           # Task entity/model
│       └── dto/
│           ├── create-task.dto.ts   # DTO for creating tasks
│           └── update-task.dto.ts   # DTO for updating tasks
├── test/
│   ├── app.e2e-spec.ts              # End-to-end tests
│   └── jest-e2e.json                # E2E test configuration
├── .env                             # Environment variables
├── nest-cli.json                    # NestJS CLI configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mjs                # ESLint configuration
└── package.json                     # Project dependencies
```

### 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, a token is returned that must be included in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

Token expiration is configured in the [auth.module.ts](src/auth/auth.module.ts) (default: 1 day).

### 📦 Data Models

#### User Entity

```typescript
{
  id: number (auto-generated),
  username: string (required),
  email: string (required, unique),
  password: string (required, hashed, not selected by default),
  created_at: Date (auto-generated),
  updated_at: Date (auto-generated),
  tasks: Task[] (one-to-many relationship)
}
```

#### Task Entity

```typescript
{
  id: number (auto-generated),
  description: string (required),
  completed: boolean (default: false),
  created_at: Date (auto-generated),
  updated_at: Date (auto-generated),
  author_id: number (foreign key),
  created_by: User (many-to-one relationship)
}
```

### 🔧 Features

- ✅ User registration and authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ RESTful API architecture
- ✅ TypeORM for database operations
- ✅ User-specific task management
- ✅ Task completion tracking
- ✅ DTO validation with class-validator
- ✅ Modular architecture with NestJS
- ✅ TypeScript for type safety
- ✅ Unit and E2E testing setup
- ✅ Code quality tools (ESLint + Prettier)
- ✅ Protected routes with authentication guards
- ✅ Automatic timestamps for data tracking

### 🚀 Deployment

To deploy this application:

1. Build the project:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start:prod
```

Make sure to set up your production environment variables and database before deployment.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

UNLICENSED

### 👤 Author

Boris Espinosa

---

<a name="español"></a>

## 🇪🇸 Español

### 📖 Descripción

Task Manager API es un servicio backend RESTful construido con NestJS para gestionar tareas personales y listas de pendientes. Permite a los usuarios registrarse, autenticarse y organizar sus tareas con características como seguimiento de finalización de tareas, listas de tareas específicas por usuario y autenticación segura.

### 🎯 Problema que Resuelve

- **Organización de Tareas**: Mantén todas tus tareas organizadas en un lugar centralizado
- **Productividad Personal**: Rastrea y gestiona tus elementos pendientes diarios de manera eficiente
- **Finalización de Tareas**: Marca tareas como completadas o pendientes para monitorear tu progreso
- **Tareas Específicas por Usuario**: Cada usuario tiene su propia lista privada de tareas
- **Acceso Seguro**: La autenticación basada en JWT asegura que tus tareas permanezcan privadas y seguras
- **Historial de Tareas**: Mantén un registro de cuándo se crearon las tareas y cuándo se actualizaron por última vez

### 🛠️ Tecnologías Utilizadas

#### Stack Backend

- **NestJS** - Framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables
- **TypeScript** - Lenguaje de programación fuertemente tipado que se construye sobre JavaScript
- **TypeORM** - Biblioteca de mapeo objeto-relacional para TypeScript y JavaScript
- **MySQL** - Sistema de gestión de bases de datos relacionales
- **JWT (@nestjs/jwt)** - Tokens Web JSON para autenticación segura
- **Bcrypt** - Cifrado y hash de contraseñas
- **Class-validator** - Validación basada en decoradores para DTOs
- **Class-transformer** - Transformación y serialización de objetos
- **RxJS** - Biblioteca de programación reactiva
- **Jest** - Framework de testing
- **ESLint + Prettier** - Linting y formateo de código

### 📋 Prerequisitos

- Node.js (v16 o superior)
- Base de datos MySQL (local o remota)
- Gestor de paquetes npm o yarn

### ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Boris-Espinosa/Task-Manager-Nest.git
cd Task-Manager-Nest/backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en el directorio raíz:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_DATABASE=task_manager

# Configuración JWT
JWT_SECRET=tu_clave_secreta_jwt

# Puerto de la Aplicación
PORT=3000
```

4. Inicia el servidor de desarrollo:

```bash
npm run start:dev
```

### 🚀 Scripts Disponibles

- `npm run start` - Inicia el servidor de producción
- `npm run start:dev` - Inicia el servidor de desarrollo con recarga automática
- `npm run start:debug` - Inicia el servidor en modo debug
- `npm run build` - Construye la aplicación para producción
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código
- `npm run format` - Formatea el código con Prettier
- `npm run test` - Ejecuta las pruebas unitarias
- `npm run test:watch` - Ejecuta las pruebas en modo watch
- `npm run test:cov` - Ejecuta las pruebas con reporte de cobertura
- `npm run test:e2e` - Ejecuta las pruebas end-to-end

### 📡 Endpoints de la API

#### Autenticación (`/auth`)

| Método | Endpoint      | Descripción                       | Requiere Auth |
| ------ | ------------- | --------------------------------- | ------------- |
| POST   | `/auth/login` | Iniciar sesión                    | No            |
| GET    | `/auth/me`    | Obtener perfil del usuario actual | Sí            |

#### Usuarios (`/users`)

| Método | Endpoint | Descripción        | Requiere Auth |
| ------ | -------- | ------------------ | ------------- |
| POST   | `/`      | Registrar usuario  | No            |
| GET    | `/`      | Obtener usuarios   | Sí            |
| GET    | `/:id`   | Obtener usuario    | Sí            |
| PATCH  | `/:id`   | Actualizar usuario | Sí            |
| DELETE | `/:id`   | Eliminar usuario   | Sí            |

#### Tareas (`/tasks`)

| Método | Endpoint | Descripción              | Requiere Auth |
| ------ | -------- | ------------------------ | ------------- |
| POST   | `/`      | Crear una nueva tarea    | Sí            |
| GET    | `/`      | Obtener todas las tareas | Sí            |
| GET    | `/:id`   | Obtener tarea por ID     | Sí            |
| PATCH  | `/:id`   | Actualizar tarea         | Sí            |
| DELETE | `/:id`   | Eliminar tarea           | Sí            |

### 📝 Ejemplos de Peticiones a la API

#### Registrar un Usuario

```bash
POST /users
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Iniciar Sesión

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com"
}
```

#### Obtener Usuario Actual

```bash
GET /auth/me
Authorization: Bearer <tu_token_jwt>
```

#### Crear una Tarea

```bash
POST /tasks
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "description": "Completar documentación del proyecto",
  "completed": false
}
```

#### Obtener Todas las Tareas del Usuario

```bash
GET /tasks
Authorization: Bearer <tu_token_jwt>
```

#### Actualizar una Tarea

```bash
PATCH /tasks/1
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json

{
  "description": "Completar documentación del proyecto - Actualizado",
  "completed": true
}
```

#### Eliminar una Tarea

```bash
DELETE /tasks/1
Authorization: Bearer <tu_token_jwt>
```

### 🗂️ Estructura del Proyecto

```
backend/
├── src/
│   ├── main.ts                      # Punto de entrada de la aplicación
│   ├── app.module.ts                # Módulo raíz
│   ├── app.controller.ts            # Controlador raíz
│   ├── app.service.ts               # Servicio raíz
│   ├── auth/
│   │   ├── auth.module.ts           # Módulo de autenticación
│   │   ├── auth.controller.ts       # Endpoints de autenticación
│   │   ├── auth.service.ts          # Lógica de negocio de auth
│   │   └── dto/
│   │       └── input-user.dto.ts    # DTO para login de usuario
│   ├── common/
│   │   ├── guards/
│   │   │   └── auth.guard.ts        # Guard de autenticación JWT
│   │   └── interfaces/
│   │       └── clientUser.ts        # Interfaz de usuario cliente
│   ├── users/
│   │   ├── users.module.ts          # Módulo de usuarios
│   │   ├── users.controller.ts      # Endpoints de usuarios
│   │   ├── users.service.ts         # Lógica de negocio de usuarios
│   │   ├── user.entity.ts           # Entidad/modelo de usuario
│   │   └── dto/
│   │       ├── create-user.dto.ts   # DTO para crear usuarios
│   │       └── update-user.dto.ts   # DTO para actualizar usuarios
│   └── tasks/
│       ├── tasks.module.ts          # Módulo de tareas
│       ├── tasks.controller.ts      # Endpoints de tareas
│       ├── tasks.service.ts         # Lógica de negocio de tareas
│       ├── task.entity.ts           # Entidad/modelo de tarea
│       └── dto/
│           ├── create-task.dto.ts   # DTO para crear tareas
│           └── update-task.dto.ts   # DTO para actualizar tareas
├── test/
│   ├── app.e2e-spec.ts              # Pruebas end-to-end
│   └── jest-e2e.json                # Configuración de pruebas E2E
├── .env                             # Variables de entorno
├── nest-cli.json                    # Configuración de NestJS CLI
├── tsconfig.json                    # Configuración de TypeScript
├── eslint.config.mjs                # Configuración de ESLint
└── package.json                     # Dependencias del proyecto
```

### 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Después de un inicio de sesión exitoso, se devuelve un token que debe incluirse en el encabezado `Authorization` para rutas protegidas:

```
Authorization: Bearer <tu_token_jwt>
```

La expiración del token se configura en [auth.module.ts](src/auth/auth.module.ts) (por defecto: 1 día).

### 📦 Modelos de Datos

#### Entidad de Usuario

```typescript
{
  id: number (auto-generado),
  username: string (requerido),
  email: string (requerido, único),
  password: string (requerido, hasheado, no seleccionado por defecto),
  created_at: Date (auto-generado),
  updated_at: Date (auto-generado),
  tasks: Task[] (relación uno-a-muchos)
}
```

#### Entidad de Tarea

```typescript
{
  id: number (auto-generado),
  description: string (requerido),
  completed: boolean (por defecto: false),
  created_at: Date (auto-generado),
  updated_at: Date (auto-generado),
  author_id: number (clave foránea),
  created_by: User (relación muchos-a-uno)
}
```

### 🔧 Características

- ✅ Registro y autenticación de usuarios con JWT
- ✅ Hash de contraseñas con bcrypt
- ✅ Arquitectura API RESTful
- ✅ TypeORM para operaciones de base de datos
- ✅ Gestión de tareas específicas por usuario
- ✅ Seguimiento de finalización de tareas
- ✅ Validación de DTOs con class-validator
- ✅ Arquitectura modular con NestJS
- ✅ TypeScript para seguridad de tipos
- ✅ Configuración de pruebas unitarias y E2E
- ✅ Herramientas de calidad de código (ESLint + Prettier)
- ✅ Rutas protegidas con guards de autenticación
- ✅ Marcas de tiempo automáticas para seguimiento de datos

### 🚀 Despliegue

Para desplegar esta aplicación:

1. Construye el proyecto:

```bash
npm run build
```

2. Inicia el servidor de producción:

```bash
npm run start:prod
```

Asegúrate de configurar tus variables de entorno de producción y base de datos antes del despliegue.

### 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor, siéntete libre de enviar un Pull Request.

1. Haz un Fork del proyecto
2. Crea tu rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Agrega una CaracteristicaIncreible'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

### 📄 Licencia

UNLICENSED

### 👤 Autor

Boris Espinosa
