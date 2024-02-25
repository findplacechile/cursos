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

// Category
const categoriesData = [
  {
    name: "Desarrollo web",
  },
  {
    name: "Emprendimiento",
  },
  {
    name: "Matemáticas",
  },
  {
    name: "Inglés",
  },
];

// Course
const coursesData = [
  {
    name: "Cómo crear un Sitio Web",
    description: "Podríamos decir que este es el curso más importante, aquí aprenderás las bases para que puedas desarrollar cualquier tipo de sitio web, este es el punto 0 y te recomendamos comenzar por aquí, si adquieres estos conocimientos todo será más fácil",
    requirements: [
      "Laptop, Notebook u ordenador de escritorio",
      "Internet",
    ],
    categoryId: 1,
    feature_image: "url_de_la_imagen",
  },
  {
    name: "Cómo crear un onePage",
    description: "Un curso para crear un sitio web de una sola página, se recomienda para sitios web que no tienen mucha información o contenido que mostrar, se integran llamadas a las acción como formularios de contacto, botones de WhatsApp, redes sociales, etc.",
    requirements: [
      "Laptop, Notebook u ordenador de escritorio",
      "Internet",
    ],
    categoryId: 1,
    feature_image: "url_de_la_imagen",
  },
  {
    name: "Cómo crear un E-commerce",
    description: "Podríamos decir que este es el curso más importante, aquí aprenderás las bases para que puedas desarrollar cualquier tipo de sitio web, este es el punto 0 y te recomendamos comenzar por aquí, si adquieres estos conocimientos todo será más fácil",
    requirements: [
      "Laptop, Notebook u ordenador de escritorio",
      "Internet",
    ],
    categoryId: 1,
    feature_image: "url_de_la_imagen",
  },
];

// Module
const modulesData = [
  {
    name: "Estructura general",
  },
  {
    name: "El dominio",
  },
  {
    name: "El hosting",
  },
];

// Clase
const clasesData = [
  {
    name: "Cómo registrar un dominio",
    url: "https://player.vimeo.com/video/454271149?h=b46bc61641",
    description: "Descripción de la clase",
  },
];

// Objetive
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

// CourseModule
const coursesModulesData = [
  {
    courseId: 1,
    moduleId: 1,
  },
  {
    courseId: 1,
    moduleId: 2,
  },
  {
    courseId: 1,
    moduleId: 3,
  },
];

// ModuleClase
const modulesClasesData = [
  {
    moduleId: 2,
    claseId: 1,
  },
];

// CourseObjective
const coursesObjectivesData = [
  {
    courseId: 1,
    objectiveId: 1,
  },
  {
    courseId: 1,
    objectiveId: 2,
  },
  {
    courseId: 1,
    objectiveId: 3,
  },
  {
    courseId: 1,
    objectiveId: 4,
  },
  {
    courseId: 1,
    objectiveId: 5,
  },
  {
    courseId: 1,
    objectiveId: 6,
  },
  {
    courseId: 1,
    objectiveId: 7,
  },
  {
    courseId: 1,
    objectiveId: 8,
  },
];

async function main() {
  // Crear los roles de usuario
  await prisma.userRole.deleteMany();
  await prisma.userRole.createMany({ data: userRoleData });
  await prisma.$executeRaw`ALTER SEQUENCE "UserRole_id_seq" RESTART WITH 1`;

  // Crear los usuarios
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: userData });

   // Crear las categorias
   await prisma.categorie.deleteMany();
   await prisma.categorie.createMany({ data: categoriesData });
   await prisma.$executeRaw`ALTER SEQUENCE "categories_id_seq" RESTART WITH 1`;

  // Crear los cursos
  await prisma.course.deleteMany();
  await prisma.course.createMany({ data: coursesData });
  await prisma.$executeRaw`ALTER SEQUENCE "courses_id_seq" RESTART WITH 1`;

  // Crear los módulos
  await prisma.module.deleteMany();
  await prisma.module.createMany({ data: modulesData });
  await prisma.$executeRaw`ALTER SEQUENCE "modules_id_seq" RESTART WITH 1`;

  // Crear las clases
  await prisma.clase.deleteMany();
  await prisma.clase.createMany({ data: clasesData });
  await prisma.$executeRaw`ALTER SEQUENCE "clases_id_seq" RESTART WITH 1`;

  // Crear los objetivos
  await prisma.objective.deleteMany();
  await prisma.objective.createMany({ data: objectivesData });
  await prisma.$executeRaw`ALTER SEQUENCE "objectives_id_seq" RESTART WITH 1`;

  // Ahora que los cursos y módulos existen, puedes crear los cursosModules
  await prisma.coursesModules.deleteMany();
  await prisma.coursesModules.createMany({ data: coursesModulesData });
  //await prisma.$executeRaw`ALTER SEQUENCE "coursesModules_id_seq" RESTART WITH 1`;

  // Crear las relaciones entre módulos y clases
  await prisma.modulesClases.deleteMany();
  await prisma.modulesClases.createMany({ data: modulesClasesData });
  //await prisma.$executeRaw`ALTER SEQUENCE "modulesClases_id_seq" RESTART WITH 1`;

  // Crear las relaciones entre cursos y objetivos
  await prisma.coursesObjectives.deleteMany();
  await prisma.coursesObjectives.createMany({ data: coursesObjectivesData });
  //await prisma.$executeRaw`ALTER SEQUENCE "coursesObjectives_id_seq" RESTART WITH 1`;


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
