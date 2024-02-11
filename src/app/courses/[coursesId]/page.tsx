"use client";

import { trpc } from "@/app/_trpc/client";
import Loading from "@/app/_components/Loading";
import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import { AsideNav } from "@/app/_components/AsideNav";
import { useState } from "react";

export default function Course({ params: { coursesId } }: { params: { coursesId: string } }) {
  const courseId = parseInt(coursesId, 10);
  const course = trpc.course.findById.useQuery({ id: courseId });
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  console.log(course)
  const toggleModule = (moduleId: number) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };
  return (
    <div>
      {course.isLoading ? (
        <Loading />
      ) : (
        <div className="p-2 md:p-8">
          <main className="grid grid-cols-1 gap-3">
            <Image
              className="clip-custom h-72 w-full rounded-lg object-cover"
              width={100}
              height={100}
              src={Avatar}
              alt="Course Image"
            />
            <h1>{course.data?.name}</h1>
            <p>{course.data?.description}</p>
            <h2>Lo que aprenderás</h2>
            <ul>
              {course.data?.coursesObjectives.map((courseObjective) => (
                <li key={courseObjective.id}>{courseObjective.objectives.name}</li>
              ))}
            </ul>
            <h2>Descripción</h2>
          </main>
            <ul>
              {course.data?.coursesModules.map((courseModule) => (
                <li key={courseModule.id}>
                  <button
                    onClick={() => toggleModule(courseModule.id)}
                    className="cursor-pointer p-2 bg-gray-200 hover:bg-gray-300"
                  >
                    {courseModule.modules.name}
                  </button>
                  {expandedModule === courseModule.id && (
                    <div className="p-2 bg-gray-100">
                      {/* Contenido adicional del módulo aquí */}
                      <p>Contenido del módulo {courseModule.modules.name}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
        </div>
      )}
    </div>
  );
}
