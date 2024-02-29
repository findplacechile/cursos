"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPlay, FaXmark } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Product from "@/app/_assets/images/product-preview.jpg";
import { trpc } from "@/app/_trpc/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { VscBook } from "react-icons/vsc";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ViewCourse() {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("couseId");
  const lessonId = searchParams.get("lessonId");
  const lessonName = searchParams.get("lessonName");
  const lessonDescription = searchParams.get("lessonDescription");
  const selectedCourse = trpc.course.findById.useQuery({
    id: parseInt(courseId as string),
  });

  const toggleModule = (moduleId: number) => {
    setOpenModule((prevModuleId) =>
      prevModuleId === moduleId ? null : moduleId
    );
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  console.log(lessonId);

  return (
    <>
      <div className="grid lg:grid-cols-[1fr_400px]">
        <div className="grid gap-2 md:gap-0 md:p-8 items-start">
          {lessonId && (
            <>
              <div className="aspect-video">
                <iframe
                  className="w-full h-full md:rounded-md"
                  src={lessonId}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
              <div className="grid text-start px-4 md:px-2">
                <h2 className="text-2xl">{lessonName}</h2>
                <p className="text-black">{lessonDescription}</p>
              </div>
            </>
          )}
        </div>
        <div
          className={`grid items-start bg-slate-50 text-sm lg:h-screen sticky top-0 z-10 ${
            showSidebar ? "" : "hidden"
          } lg:block`}
        >
          <div className="space-y-0">
            <div className="flex bg-white p-4 border-b justify-between items-center">
              <h3 className="font-semibold">{selectedCourse.data?.name}</h3>
              <div className="hidden lg:flex items-center gap-1">
                <IoExitOutline />
                <h3 className="text-gray-600">Salir</h3>
              </div>
              <div className="flex lg:hidden items-center gap-1 bg-red-500 text-white p-2 rounded">
                <FaXmark />
              </div>
            </div>
            <div className="grid text-sm">
              {selectedCourse.data?.coursesModules.map((module) => (
                <div className="flex items-center" key={module.id}>
                  <details
                    className="w-full"
                    open={openModule === module.id}
                    onToggle={() => toggleModule(module.id)}
                  >
                    <summary className="cursor-pointer flex justify-between items-center border-b p-4 bg-white">
                      <span className="font-semibold text-black">
                        {module.modules.name}
                      </span>
                      {openModule === module.id ? (
                        <MdKeyboardArrowUp className="w-5 h-5 ml-auto" />
                      ) : (
                        <MdKeyboardArrowDown className="w-5 h-5 ml-auto" />
                      )}
                    </summary>
                    <ul>
                      {module.modules.modulesLessons.map((lesson) => (
                        <li key={lesson.id}>
                          <Link
                            className="rounded-none w-full"
                            href={`${pathname}?couseId=${courseId}&lessonId=${
                              lesson.lessons.url
                            }&lessonName=${encodeURIComponent(
                              lesson.lessons.name
                            )}&lessonDescription=${encodeURIComponent(
                              lesson.lessons.description
                            )}`}
                            onClick={toggleSidebar}
                          >
                            {lesson.lessons.name}
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
      </div>
      <div className="grid grid-cols-4 bg-blue-950 lg:hidden z-50 fixed bottom-0 w-full">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="btn-footer"
        >
          <IoExitOutline className="h-6 w-6" />
          Salir
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="btn-footer"
        >
          <FaArrowLeft className="h-6 w-6" />
          Anterior
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="btn-footer"
        >
          <FaArrowRight className="h-6 w-6" />
          Siguiente
        </button>
        <button onClick={toggleSidebar} className="btn-footer">
          <VscBook className="h-6 w-6" />
          Contenido
        </button>
      </div>
    </>
  );
}
