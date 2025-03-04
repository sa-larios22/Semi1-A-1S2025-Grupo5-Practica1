# 📚 API Documentation - EbookVault

Esta API permite gestionar una plataforma de libros electrónicos con funcionalidades de autenticación, gestión de usuarios, adquisición y administración de libros.

## 📌 Base URL
```
http://localhost:5000/api
```

---

## 📌 Endpoints Disponibles

### **🔹 Autenticación**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `POST` | `/auth/register` | Registrar un usuario |
| `POST` | `/auth/login` | Iniciar sesión |

### **🔹 Usuarios**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `GET` | `/users/me?email={email}` | Obtener perfil del usuario |
| `PUT` | `/users/me?email={email}` | Actualizar perfil del usuario |

### **🔹 Libros**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `GET` | `/books` | Listar todos los libros |
| `GET` | `/books/{book_id}` | Obtener detalles de un libro |
| `POST` | `/books` | Agregar un nuevo libro (Admin) |
| `PUT` | `/books/{book_id}` | Modificar un libro (Admin) |
| `DELETE` | `/books/{book_id}` | Eliminar un libro (Admin) |

### **🔹 Compras**
| **Método** | **Endpoint** | **Descripción** |
|------------|-------------|----------------|
| `POST` | `/purchases` | Adquirir un libro |
| `GET` | `/purchases/{user_id}` | Listar los libros adquiridos por el usuario |

---

## 📌 Estructura de Datos

### **📝 Registro de usuario**
#### 📥 Request (JSON)
```json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "birthDate": "1995-05-20",
  "profilePicture": "https://example.com/profile.jpg",
  "role": "USER"
}
```
#### 📤 Response (201 Created)
```json
{
  "message": "User registered successfully",
  "user_id": 1
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
  "message": "Login successful",
  "user": {
    "id": 1,
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan@example.com",
    "profilePicture": "https://example.com/profile.jpg",
    "role": "USER"
  }
}
```

---

### **📝 Obtener perfil del usuario**
#### 📤 Response (200 OK)
```json
{
  "id": 1,
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan@example.com",
  "profilePicture": "https://example.com/profile.jpg",
  "birthDate": "1995-05-20",
  "role": "USER"
}
```

---

### **📝 Listar libros**
#### 📤 Response (200 OK)
```json
[
  {
    "id": 1,
    "title": "Cien años de soledad",
    "author": "Gabriel García Márquez",
    "coverImage": "https://example.com/cien_años.jpg",
    "synopsis": "Historia de la familia Buendía...",
    "categories": {"genero": "Ficción", "tema": "Historia familiar"},
    "year": 1967,
    "pdfUrl": "https://example.com/cien_años.pdf"
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
  "coverImage": "https://example.com/cien_años.jpg",
  "synopsis": "Historia de la familia Buendía...",
  "categories": {"genero": "Ficción", "tema": "Historia familiar"},
  "year": 1967,
  "pdfUrl": "https://example.com/cien_años.pdf"
}
```
#### 📤 Response (201 Created)
```json
{
  "message": "Book added successfully",
  "book_id": 1
}
```

---

### **📝 Comprar un libro**
#### 📥 Request (JSON)
```json
{
  "userId": 1,
  "bookId": 1
}
```
#### 📤 Response (201 Created)
```json
{
  "message": "Purchase successful",
  "purchase_id": 1
}
```

---

### **📝 Listar compras de un usuario**
#### 📤 Response (200 OK)
```json
[
  {
    "purchase_id": 1,
    "purchaseDate": "2025-03-05T14:30:00",
    "book": {
      "id": 1,
      "title": "Cien años de soledad",
      "author": "Gabriel García Márquez",
      "coverImage": "https://example.com/cien_años.jpg",
      "pdfUrl": "https://example.com/cien_años.pdf"
    }
  }
]
```

---

### **📝 Eliminar un libro (Solo Admin)**
#### 📤 Response (200 OK)
```json
{
  "message": "Book deleted successfully"
}
```