import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// UserRole
const userRoleData = [
  {
    name: "Admin",
  },
  {
    name: "Professor",
  },
  {
    name: "Student",
  },
];

// User
const userData = [
  {
    name: "Fernando",
    email: "findplacechile@gmail.com",
    password: "$2b$10$mgjotYzIXwrK1MCWmu4tgeUVnLcb.qzvqwxOq4FXEL8k2obwXivDi", // TODO: template password 1234 (bcrypt) testing only
    roleId: 1,
  },
];

const coursesData = [
  {
    name: "Cómo crear un onePage",
    description:
      "Un curso para crear un sitio web de una sola página, se recomienda para sitios web que no tienen mucha información o contenido que mostrar, se integran llamadas a las acción como formularios de contacto, botones de WhatsApp, redes sociales, etc.",
  },
];
const modulesData = [
  {
    name: "Estructura general",
  },
  {
    name: "El dominio",
  },
];
const objectivesData = [
  {
    name: "Registrar un dominio",
  },
  {
    name: "Adquirir un hosting",
  },
  {
    name: "Instalar y configurar Wordpress",
  },
  {
    name: "Crear un menú",
  },
  {
    name: "Crear botones",
  },
  {
    name: "Enlazar whatsApp y teléfono",
  },
  {
    name: "Enlazar redes sociales",
  },
  {
    name: "Publicar la Web",
  },
];
const clasesData = [
  {
    name: "Cómo registrar un dominio",
    url: "https://www.youtube.com/watch?v=90RLzVUuXe4&list=RD90RLzVUuXe4&start_radio=1"
  },
];

async function main() {
  // ========================================
  // Code for PostgreSQL
  // ----------------------------------------
  // UserRole
  // ----------------------------------------
   await prisma.userRole.deleteMany();
   await prisma.userRole.createMany({ data: userRoleData });
   await prisma.$executeRaw`ALTER SEQUENCE "UserRole_id_seq" RESTART WITH 1`;
  // ----------------------------------------
  // User
  // ----------------------------------------
   await prisma.user.deleteMany();
   await prisma.user.createMany({ data: userData });
     // Courses
  await prisma.course.deleteMany();
  await prisma.course.createMany({ data: coursesData });
  await prisma.$executeRaw`ALTER SEQUENCE courses_id_seq RESTART WITH 1`;
    // Modules
    await prisma.module.deleteMany();
    await prisma.module.createMany({ data: modulesData });
    await prisma.$executeRaw`ALTER SEQUENCE modules_id_seq RESTART WITH 1`;
  // Objectives
  await prisma.objective.deleteMany();
  await prisma.objective.createMany({ data: objectivesData });
  await prisma.$executeRaw`ALTER SEQUENCE objectives_id_seq RESTART WITH 1`;
    // Clases
    await prisma.clase.deleteMany();
    await prisma.clase.createMany({ data: clasesData });
    await prisma.$executeRaw`ALTER SEQUENCE clases_id_seq RESTART WITH 1`;
  // ========================================
  // Code for MySQL
  // ----------------------------------------
  // UserRole
  // ----------------------------------------
  // await prisma.userRole.deleteMany();
  // await prisma.userRole.createMany({ data: userRoleData });
  // await prisma.$executeRaw`ALTER TABLE UserRole AUTO_INCREMENT = 1`;
  // ----------------------------------------
  // User
  // ----------------------------------------
  // await prisma.user.deleteMany();
  // await prisma.user.createMany({ data: userData });
  // ========================================
  // Code for MongoDB
  // ----------------------------------------
  // UserRole
  // ----------------------------------------
  // await prisma.userRole.deleteMany();
  // await prisma.userRole.createMany({ data: userRoleData });
  // ----------------------------------------
  // User
  // ----------------------------------------
  // await prisma.user.deleteMany();
  // await prisma.user.createMany({ data: userData });
  // ========================================
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
