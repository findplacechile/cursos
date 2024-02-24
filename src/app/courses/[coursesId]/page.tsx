"use client";

import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { FaCheck, FaFile, FaGraduationCap, FaUserGraduate } from "react-icons/fa6";
import { FaChalkboardTeacher, FaPhotoVideo, FaRegStar, FaStar } from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

export default function Course({
  params: { coursesId },
}: {
  params: { coursesId: string };
}) {
  const selectedCourse = trpc.course.findById.useQuery({
    id: parseInt(coursesId),
  });
  const [openModule, setOpenModule] = useState<number | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("couseId");

  const toggleModule = (moduleId: number) => {
    setOpenModule((prevModuleId) =>
      prevModuleId === moduleId ? null : moduleId
    );
  };

  console.log(selectedCourse);

  return (
    <>
    <Navbar />
    <div className="grid p-4 gap-4 lg:p-8 lg:grid-cols-[1fr_400px]">
      <main className="grid grid-cols-1 p-8 gap-8 bg-white rounded-md">
        <section className="grid grid-cols-1 gap-2">
          <h1>{selectedCourse.data?.name}</h1>
          <div className="flex items-center gap-8 p-2 rounded bg-slate-100">
            <p className="flex items-center gap-2">
            <FaChalkboardTeacher />
              Creado por
              <span>
                {selectedCourse.data?.teacher?.name}{" "}
                {selectedCourse.data?.teacher?.lastName}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <FaUserGraduate />
              1.257{" "}
              <span>
                estudiantes
              </span>
            </p>
            <p className="flex items-center gap-2 text-yellow-500">
              4,9
              <FaStar />
              <span>
                (276 valoraciones)
              </span>
            </p>
          </div>
        </section>
        <div className="sticky top-0 z-10 bg-white pt-2 border-b-2">
          <nav className="flex flex-row gap-2">
            <a href="#description">
              <FaFile /> Descripción
            </a>
            <a href="#objective">
              <FaGraduationCap />
              Lo que aprenderás
            </a>
            <a href="#requeriments">
              <GrResources />
              Requisitos
            </a>
            <a href="#lessons">
              <FaPhotoVideo />
              Contenido
            </a>
            <a href="#flow">
              <FaPhotoVideo />
              Flujo
            </a>
          </nav>
        </div>
        <Image
          src={Avatar}
          width="600"
          height="300"
          className="rounded-md"
          alt="Instructor"
        />
        <section
          id="description"
          className="grid grid-cols-1 rounded-md p-2 gap-2"
        >
          <h2 className="flex flex-row items-center gap-2">
            <FaFile />
            Descripción
          </h2>
          <hr />
          <p className="mt-8">{selectedCourse.data?.description}</p>
        </section>
        <section
          id="objective"
          className="grid grid-cols-1 rounded-md p-2 gap-2"
        >
          <h2 className="flex flex-row items-center gap-2">
            <FaGraduationCap />
            Lo que aprenderás
          </h2>
          <hr />
          <ul className="mt-8">
            {selectedCourse.data?.coursesObjectives.map((objective) => (
              <li key={objective.id}>
                <FaCheck />
                {objective.objectives.name}
              </li>
            ))}
          </ul>
        </section>
        <section
          id="requeriments"
          className="grid grid-cols-1 rounded-md p-2 gap-2"
        >
          <h2>Requisitos</h2>
          <hr />
          <ul className="mt-8">
            {selectedCourse.data?.requirements.map((requirement, index) => (
              <li key={index}>
                <FaCheck /> {requirement}
              </li>
            ))}
          </ul>
        </section>
        <section id="content" className="grid grid-cols-1 rounded-md p-2 gap-2">
          <h2>Contenido del curso</h2>
          <hr />
          <div className="grid items-start text-sm mt-8">
            <div className="space-y-0">
              <div className="grid text-sm">
                {selectedCourse.data?.coursesModules.map((module) => (
                  <div className="flex items-center" key={module.id}>
                    <details
                      className="w-full"
                      open={openModule === module.id}
                      onToggle={() => toggleModule(module.id)}
                    >
                      <summary className="cursor-pointer flex justify-between items-center border-b p-4 bg-slate-50">
                        <span className="font-semibold text-black">
                          {module.modules.name}
                        </span>
                        {openModule === module.id ? (
                          <MdKeyboardArrowUp className="w-5 h-5 ml-auto" />
                        ) : (
                          <MdKeyboardArrowDown className="w-5 h-5 ml-auto" />
                        )}
                      </summary>
                      <ul className="p-4 list-none">
                        {module.modules.modulesClases.map((clase) => (
                          <li key={clase.id}>
                            <Link
                              className="rounded-none w-full"
                              href={`${pathname}?couseId=${courseId}&lessonId=${
                                clase.clases.url
                              }&lessonName=${encodeURIComponent(
                                clase.clases.name
                              )}&lessonDescription=${encodeURIComponent(
                                clase.clases.description
                              )}`}
                            >
                              {clase.clases.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="flow"
          className="grid grid-cols-1 rounded-md p-2 gap-2"
        >
          <h2 className="flex flex-row items-center gap-2">
            <FaFile />
            Flujo de aprendizaje 
          </h2>
          <hr />
          <p className="mt-8">Este curso está diseñado para que puedas inscribirte en todas las clases o solo en una, puedes ir aprendiendo desde el comienzo o solo ir a una clase para aprender algo específico, si estás comenzando te recomendamos que comiences por el primer módulo y no te saltes ninguna clase.<br/> Algunas clases tienen relación con otros cursos, por lo que estarías aprendiendo muchas cosas al mismo tiempo</p>
        </section>
      </main>
      <aside className="h-screen sticky top-0 z-10">
        <section className="rounded-md p-4 lg:p-8">
          <Link
            href={`${coursesId}/view?couseId=${coursesId}`}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 max-w-[200px] md:justify-self-end"
          >
            Comenzar
          </Link>
        </section>
      </aside>
    </div>
    <Footer />
    </>
  );
}
