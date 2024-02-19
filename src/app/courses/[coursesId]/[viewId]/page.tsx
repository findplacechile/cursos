"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Product from "@/app/_assets/images/product-preview.jpg";
import { trpc } from "@/app/_trpc/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ViewCourse() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("couseId");
  const lessonId = searchParams.get("lessonId");
  const selectedCourse = trpc.course.findById.useQuery({
    id: parseInt(courseId as string),
  });

  const toggleModule = (moduleId: number) => {
    setOpenModule((prevModuleId) =>
      prevModuleId === moduleId ? null : moduleId
    );
  };
  console.log(lessonId)

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_400px] p-10 md:p-0">
      <div className="grid gap-4 md:p-10">
        <div className="rounded-lg border shadow-video overflow-hidden">
          <div className="aspect-[16/9]">
            {/* {lessonId && (
              <iframe
                width="560"
                height="315"
                src={lessonId}
                title={"Videos"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )} */}
            {lessonId && (
  <>
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${lessonId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <div className="text-center mt-4">
      <h2 className="text-xl font-semibold">{lessonId}</h2>
    </div>
  </>
)}


            {/* {lessonId && lessonId === "1" ? (
              <Image
                src={Avatar}
                alt="Instructor"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <Image
                src={Product}
                alt="Instructor"
                className="object-cover w-full h-full rounded-md"
              />
            )} */}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{selectedCourse.data?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {selectedCourse.data?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                src={Avatar}
                alt="Instructor"
                className="rounded-full"
                height="40"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="30"
              />
              <div className="space-y-0.5">
                <h3 className="font-semibold">John Smith</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  10,000 students | 4.5 rating
                </p>
              </div>
            </div>
            <button className="sm">Message Instructor</button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="border-t pt-4">
            <h2 className="font-semibold">Progress</h2>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <span>1. Introduction to Data Science</span>
                <progress
                  className="flex-1 h-2 rounded-lg"
                  max="100"
                  value="50"
                />
                <span>50%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>2. Data Analysis with Pandas</span>
                <progress
                  className="flex-1 h-2 rounded-lg"
                  max="100"
                  value="0"
                />
                <span>0%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3. Machine Learning Fundamentals</span>
                <progress
                  className="flex-1 h-2 rounded-lg"
                  max="100"
                  value="0"
                />
                <span>0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid items-start bg-slate-50 text-sm h-screen sticky top-0 z-10">
        <div className="space-y-0">
          <h3 className="font-semibold bg-white p-4 border-b">Contenido del curso</h3>
          {/* <ul className="list-disc list-inside">
            <li>Expert instruction</li>
            <li>Real-world examples</li>
            <li>Knowledge checks</li>
            <li>Quizzes</li>
          </ul> */}
          <div className="grid text-sm">
            {selectedCourse.data?.coursesModules.map((module) => (
              <div className="flex items-center" key={module.id}>
                  <details
                  className="w-full"
                  open={openModule === module.id}
                  onToggle={() => toggleModule(module.id)}
                >
                  <summary className="cursor-pointer flex justify-between items-center border-b p-4 bg-white">
                    <span className="font-semibold text-black">{module.modules.name}</span>
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
                          href={`${pathname}?couseId=${courseId}&lessonId=${clase.clases.url}`}
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
        {/* <button className="w-full lg:w-auto">Take Quiz</button> */}
      </div>
    </div>
  );
}
