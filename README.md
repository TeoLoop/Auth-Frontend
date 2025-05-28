# 🚀 Mini Frontend React - Sistema de Autenticación

Frontend desarrollado en React que se integra con el [microservicio de autenticación AuthService](https://github.com/TeoLoop/AuthService) para proporcionar un sistema completo de registro, login y gestión de usuarios.

## 📋 Características

- ✅ **Registro de usuarios** con validación en tiempo real
- 🔐 **Login con JWT** y manejo de tokens
- 👤 **Perfil de usuario** con información protegida
- 🛡️ **Rutas protegidas** con autenticación requerida
- 🎨 **Interfaz responsive** y moderna
- 🔄 **Gestión automática de tokens** (almacenamiento y renovación)
- 📱 **Experiencia de usuario optimizada** con feedback visual

## 🛠️ Tecnologías Utilizadas

- **React** 18+ - Biblioteca principal
- **React Router Dom** - Navegación y rutas protegidas
- **Axios** - Cliente HTTP para consumir APIs
- **React Hook Form** - Manejo de formularios
- **Context API** - Gestión de estado global de autenticación
- **CSS Modules/Styled Components** - Estilos
- **React Toastify** - Notificaciones

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- [AuthService](https://github.com/TeoLoop/AuthService) ejecutándose en el backend

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/TeoLoop/Auth-Frontend/
   cd Auth-Frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```


3. **Inicia el servidor de desarrollo**
   ```bash
   npm rund dev
   # o
   yarn start
   ```

La aplicación estará disponible en `http://localhost:5173`

## 🔌 Integración con AuthService

### Endpoints consumidos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Registro de nuevos usuarios | ❌ No requerida |
| `POST` | `/api/auth/login` | Autenticación de usuarios | ❌ No requerida |
| `GET` | `/api/user/{username}` | Obtener perfil del usuario | ✅ JWT requerido |


## 📱 Características de la UI

### Formularios de Autenticación

- **Validación en tiempo real** de campos
- **Feedback visual** para errores y éxitos
- **Manejo de errores** del backend (duplicados, credenciales incorrectas)

### Gestión de Estados

- **Loading states** para todas las operaciones asíncronas
- **Error handling** con mensajes descriptivos
- **Navegación automática** post-autenticación



## 🐛 Troubleshooting

### Problemas Comunes

1. **CORS Error**
   - Asegúrate de que el backend tenga configurado CORS para `http://localhost:5173`

2. **Errores de red**
   - Verifica que el AuthService esté ejecutándose en el puerto correcto
     

## 🚀 Deployment

### Build para Producción

```bash
npm run build
```

## 🔗 Enlaces Relacionados

- [AuthService Backend](https://github.com/TeoLoop/AuthService) - Microservicio de autenticación

## 👨‍💻 Autor

**Mateo López**
- [LinkedIn](https://www.linkedin.com/in/lopezmateo/)
- [GitHub](https://github.com/TeoLoop)
