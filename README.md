# Teslo Shop

## Tabla de Contenido
- [Teslo Shop](#teslo-shop)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Descripción](#descripción)
  - [Correr en Dev](#correr-en-dev)
  - [Correr en Prod](#correr-en-prod)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Librerías](#librerías)

## Descripción
Teslo Shop es un ecommerce realizado con:
- Next.js
- Prisma
- PostgreSQL
- NextAuth
- Zustand
- Zod
- bcryptjs
- React Hook Form
- react-paypal-js
- TailwindCSS

## Correr en Dev

1. Clonar el repositorio
2. Crear una copia del archivo `.env.template` y renombrar a `.env`, luego configurar las variables de entorno necesarias.
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Levantar la base de datos con Docker:
   ```bash
   docker compose up -d
   ```
5. Ejecutar las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```
6. Ejecutar el seed:
   ```bash
   npm run seed
   ```
7. Iniciar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

## Correr en Prod

1. Configura las variables de entorno en `.env` para producción.
2. Construye el proyecto:
   ```bash
   npm run build
   ```
3. Inicia el proyecto:
   ```bash
   npm start
   ```

## Estructura del Proyecto

```
├── .env
├── .env.template
├── .gitignore
├── docker-compose.yml
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── nextauth.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── .next/
├── postgres/
├── prisma/
├── public/
└── src/
    ├── app/
    ├── components/
    ├── context/
    ├── interfaces/
    ├── lib/
    ├── middleware/
    ├── seed/
    ├── store/
    ├── utils/
    └── validation/
```

- **src/**: Código fuente principal de la aplicación.
- **prisma/**: Esquemas y migraciones de la base de datos.
- **public/**: Archivos estáticos.
- **postgres/**: Archivos de configuración de la base de datos para Docker.
- **.next/**: Archivos generados por Next.js (build).
- **docker-compose.yml**: Configuración para levantar PostgreSQL con Docker.

## Librerías

- [Swiper](https://swiperjs.com/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [React Hook Form](https://react-hook-form.com/)
- [@paypal/react-paypal-js](https://www.npmjs.com/package/@paypal/react-paypal-js)
- [TailwindCSS](https://tailwindcss.com/)
- [Sonner](https://sonner.emilkowal.ski/) <!-- Notificación/toasts -->
- [clsx](https://www.npmjs.com/package/clsx) <!-- Utilidad para clases condicionales -->
- [react-icons](https://react-icons.github.io/react-icons/) <!-- Iconos SVG para React -->