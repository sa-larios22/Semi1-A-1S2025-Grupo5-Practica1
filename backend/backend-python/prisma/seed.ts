  import { PrismaClient } from '@prisma/client';

  const prisma = new PrismaClient();

  async function main() {
    console.log('Ejecutando seed.ts...');

    // Crear usuarios
    const users = await Promise.all([
      prisma.user.create({ 
        data: { 
          firstName: 'Juan', 
          lastName: 'Pérez', 
          email: 'juan.perez@example.com', 
          password: 'hashedpassword1', 
          birthDate: new Date('1990-05-15'), 
          role: 'USER' 
        } 
      }),
      prisma.user.create({ 
        data: { 
          firstName: 'Ana', 
          lastName: 'Gómez', 
          email: 'ana.gomez@example.com', 
          password: 'hashedpassword2', 
          birthDate: new Date('1985-08-20'), 
          role: 'ADMIN' 
        } 
      }),
      prisma.user.create({ 
        data: { 
          firstName: 'Carlos', 
          lastName: 'Rodríguez', 
          email: 'carlos.rodriguez@example.com', 
          password: 'hashedpassword3', 
          birthDate: new Date('1995-02-10'), 
          role: 'USER' 
        } 
      }),
      prisma.user.create({ 
        data: { 
          firstName: 'María', 
          lastName: 'López', 
          email: 'maria.lopez@example.com', 
          password: 'hashedpassword4', 
          birthDate: new Date('2000-09-25'), 
          role: 'USER' 
        } 
      }),
      prisma.user.create({ 
        data: { 
          firstName: 'Luis', 
          lastName: 'Fernández', 
          email: 'luis.fernandez@example.com', 
          password: 'hashedpassword5', 
          birthDate: new Date('1993-11-12'), 
          role: 'USER' 
        } 
      }),
    ]);
    

  // Crear libros
  const books = await Promise.all([
    prisma.book.create({ 
      data: { 
        title: 'Introducción a TypeScript', 
        author: 'Carlos López', 
        coverImage: 'https://example.com/cover1.jpg', 
        synopsis: 'Un libro completo sobre TypeScript.', 
        categories: ['Programación', 'JavaScript'], 
        year: 2022, 
        pdfUrl: 'https://example.com/book1.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Prisma ORM en la Práctica', 
        author: 'Laura Martínez', 
        coverImage: 'https://example.com/cover2.jpg', 
        synopsis: 'Guía básica para usar Prisma con bases de datos.', 
        categories: ['Bases de Datos', 'ORM'], 
        year: 2023, 
        pdfUrl: 'https://example.com/book2.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Arquitectura de Software', 
        author: 'Juan Pérez', 
        coverImage: 'https://example.com/cover3.jpg', 
        synopsis: 'Principios y patrones para diseñar software escalable.', 
        categories: ['Software', 'Arquitectura'], 
        year: 2021, 
        pdfUrl: 'https://example.com/book3.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Algoritmos y Estructuras de Datos', 
        author: 'Ana Gómez', 
        coverImage: 'https://example.com/cover4.jpg', 
        synopsis: 'Un recorrido por los algoritmos más usados.', 
        categories: ['Programación', 'Algoritmos'], 
        year: 2020, 
        pdfUrl: 'https://example.com/book4.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Machine Learning con Python', 
        author: 'Pedro Ramírez', 
        coverImage: 'https://example.com/cover5.jpg', 
        synopsis: 'Aplicaciones prácticas de Machine Learning en Python.', 
        categories: ['Ciencia de Datos', 'Machine Learning'], 
        year: 2022, 
        pdfUrl: 'https://example.com/book5.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Redes Neuronales y Deep Learning', 
        author: 'Sofía Herrera', 
        coverImage: 'https://example.com/cover6.jpg', 
        synopsis: 'Introducción a redes neuronales y su implementación.', 
        categories: ['IA', 'Deep Learning'], 
        year: 2023, 
        pdfUrl: 'https://example.com/book6.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Programación en Rust', 
        author: 'Carlos Mena', 
        coverImage: 'https://example.com/cover7.jpg', 
        synopsis: 'Conceptos esenciales para programar en Rust.', 
        categories: ['Programación', 'Rust'], 
        year: 2021, 
        pdfUrl: 'https://example.com/book7.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Desarrollo Web con Next.js', 
        author: 'Miguel Torres', 
        coverImage: 'https://example.com/cover8.jpg', 
        synopsis: 'Guía completa para desarrollar sitios web con Next.js.', 
        categories: ['Desarrollo Web', 'Next.js'], 
        year: 2022, 
        pdfUrl: 'https://example.com/book8.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Bases de Datos SQL y NoSQL', 
        author: 'Lucía Fernández', 
        coverImage: 'https://example.com/cover9.jpg', 
        synopsis: 'Comparación entre bases de datos SQL y NoSQL.', 
        categories: ['Bases de Datos', 'SQL', 'NoSQL'], 
        year: 2020, 
        pdfUrl: 'https://example.com/book9.pdf' 
      } 
    }),
    prisma.book.create({ 
      data: { 
        title: 'Fundamentos de Ciberseguridad', 
        author: 'Fernando Castillo', 
        coverImage: 'https://example.com/cover10.jpg', 
        synopsis: 'Principios básicos de ciberseguridad y protección de datos.', 
        categories: ['Ciberseguridad', 'Seguridad Informática'], 
        year: 2021, 
        pdfUrl: 'https://example.com/book10.pdf' 
      } 
    }),
  ]);
  

  // Crear compras
  const purchases = await Promise.all([
    prisma.purchase.create({ data: { userId: users[0].id, bookId: books[0].id } }),
    prisma.purchase.create({ data: { userId: users[0].id, bookId: books[1].id } }),
    prisma.purchase.create({ data: { userId: users[1].id, bookId: books[2].id } }),
    prisma.purchase.create({ data: { userId: users[1].id, bookId: books[3].id } }),
    prisma.purchase.create({ data: { userId: users[2].id, bookId: books[4].id } }),
    prisma.purchase.create({ data: { userId: users[2].id, bookId: books[5].id } }),
    prisma.purchase.create({ data: { userId: users[3].id, bookId: books[6].id } }),
    prisma.purchase.create({ data: { userId: users[3].id, bookId: books[7].id } }),
    prisma.purchase.create({ data: { userId: users[4].id, bookId: books[8].id } }),
    prisma.purchase.create({ data: { userId: users[4].id, bookId: books[9].id } }),
  ]);
  

    console.log('Seed.ts ejecutado correctamente');
  }

  main()
    .catch((e) => {
      console.error(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
