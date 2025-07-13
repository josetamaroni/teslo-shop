# Teslo Shop 

## Tabla de Contenido
- [Teslo Shop](#teslo-shop)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Descripción](#descripción)
  - [Correr en Dev](#correr-en-dev)
  - [Correr en Prod](#correr-en-prod)
  - [Librerías](#librerías)

## Descripción
    Es un ecommerce realizado con 
    Next.js - Prisma - PostgreSql - Auth Next - Zustand - Zod - bcryptjs - Reac Hook Form - react-paypal-js


## Correr en Dev
1. Clonar el repositorio
2. Crear un copia del archivo ```.env.template``` y renombrar a ```.env``` y cambiar las variables de entorno
3. Instalar dependencias ```npm install``` 
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev```
6. Ejecutar el seed ```npm run seed```
7. Correr el proyecto ```npm run dev```



```bash
npm run dev
```

## Correr en Prod



## Librerías 
- [Swiper](https://swiperjs.com/)