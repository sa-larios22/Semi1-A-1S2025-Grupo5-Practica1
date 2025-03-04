# 📚 API Documentation - EbookVault

Esta API permite gestionar una plataforma de libros electrónicos con funcionalidades de autenticación, gestión de usuarios, adquisición y administración de libros.

## 📌 Base URL
```
https://loadbalancer-domain.com:5000/api
```

## 📌 Endpoints Disponibles

### **🔹 Autenticación**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `POST` | `/auth/register` | Registrar un usuario |
| `POST` | `/auth/login` | Iniciar sesión |

### **🔹 Usuarios**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `GET` | `/users/me` | Obtener perfil del usuario autenticado |
| `PUT` | `/users/me` | Actualizar perfil del usuario |

### **🔹 Libros**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `GET` | `/books` | Listar todos los libros |
| `GET` | `/books/{book_id}` | Obtener detalles de un libro |
| `POST` | `/books/{book_id}/purchase` | Adquirir un libro |
| `GET` | `/users/me/books` | Listar los libros adquiridos por el usuario |

### **🔹 Administración de libros (Solo Admin)**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `POST` | `/admin/books` | Agregar un libro |
| `PUT` | `/admin/books/{book_id}` | Modificar un libro |
| `DELETE` | `/admin/books/{book_id}` | Eliminar un libro |

---

## 📌 Estructura de Datos

### **📝 Registro de usuario**
#### 📥 Request (JSON)
```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "profile_picture": "https://s3.amazonaws.com/ebookvault/profile.jpg",
  "birth_date": "2000-05-15"
}
```
#### 📤 Response (201 Created)
```json
{
  "message": "User registered successfully"
}
```

---

### **📝 Inicio de sesión**
#### 📥 Request (JSON)
```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```
#### 📤 Response (200 OK)
```json
{
  "user": {
    "id": 1,
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "profile_picture": "https://s3.amazonaws.com/ebookvault/profile.jpg",
    "role": "user"
  }
}
```

---

### **📝 Obtener perfil del usuario**
#### 📤 Response (200 OK)
```json
{
  "id": 1,
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan@example.com",
  "profile_picture": "https://s3.amazonaws.com/ebookvault/profile.jpg",
  "books_purchased": 3
}
```

---

### **📝 Listar libros**
#### 📤 Response (200 OK)
```json
[
  {
    "id": 1,
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "cover_image": "https://s3.amazonaws.com/ebookvault/covers/el_principito.jpg",
    "available": true
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "cover_image": "https://s3.amazonaws.com/ebookvault/covers/1984.jpg",
    "available": false
  }
]
```

---

### **📝 Agregar un libro (Solo Admin)**
#### 📥 Request (JSON)
```json
{
  "title": "Cien años de soledad",
  "author": "Gabriel García Márquez",
  "cover_image": "https://s3.amazonaws.com/ebookvault/covers/cien_años.jpg",
  "synopsis": "Historia de la familia Buendía...",
  "categories": ["Realismo Mágico", "Novela"],
  "year": 1967,
  "pdf_url": "https://s3.amazonaws.com/ebookvault/books/cien_años.pdf"
}
```
#### 📤 Response (201 Created)
```json
{
  "message": "Book added successfully"
}
```

---

### **📝 Eliminar un libro (Solo Admin)**
#### 📤 Response (200 OK)
```json
{
  "message": "Book deleted successfully"
}
```
