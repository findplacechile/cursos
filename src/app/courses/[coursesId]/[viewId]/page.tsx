"use client";

import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa6";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Product from "@/app/_assets/images/product-preview.jpg";
import { trpc } from "@/app/_trpc/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ViewCourse() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("couseId");
  const lessonId = searchParams.get("lessonId");
  const selectedCourse = trpc.course.findById.useQuery({
    id: parseInt(courseId as string),
  });

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_400px] p-10">
      <div className="grid gap-4">
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
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${lessonId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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
          <div className="grid gap-2">
            <h2 className="font-semibold">Modules</h2>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <button className="rounded-full border-gray-200 dark:border-gray-800">
                  <FaPlay className="w-3 h-3 mr-1.5" />
                  Start
                </button>
                <details>
                  <summary className="cursor-pointer list-disc list-inside underline">
                    Introduction to Data Science
                  </summary>
                  <ul className="pl-4 text-xs">
                    <li>Lesson 1: What is Data Science? (5m)</li>
                    <li>Lesson 2: Introduction to SQL (8m)</li>
                    <li>Lesson 3: Python for Data Science (12m)</li>
                  </ul>
                </details>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border-gray-200 dark:border-gray-800">
                  <FaPlay className="w-3 h-3 mr-1.5" />
                  Start
                </button>
                <details>
                  <summary className="cursor-pointer list-disc list-inside underline">
                    Data Analysis with Pandas
                  </summary>
                  <ul className="pl-4 text-xs">
                    <li>Lesson 1: Introduction to Pandas (5m)</li>
                    <li>Lesson 2: DataFrames and Series (8m)</li>
                    <li>Lesson 3: Data Cleaning with Pandas (12m)</li>
                  </ul>
                </details>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-full border-gray-200 dark:border-gray-800">
                  <FaPlay className="w-3 h-3 mr-1.5" />
                  Start
                </button>
                <details>
                  <summary className="cursor-pointer list-disc list-inside underline">
                    Machine Learning Fundamentals
                  </summary>
                  <ul className="pl-4 text-xs">
                    <li>Lesson 1: Introduction to ML (5m)</li>
                    <li>Lesson 2: Supervised vs. Unsupervised Learning (8m)</li>
                    <li>Lesson 3: Model Evaluation (12m)</li>
                  </ul>
                </details>
              </div>
            </div>
          </div>
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
      <div className="grid items-start gap-4 px-4 py-6 text-sm bg-gray-100 border-t lg:py-10 lg:grid-flow-col lg:gap-6 dark:bg-gray-800 dark:border-gray-800">
        <div className="space-y-2">
          <h3 className="font-semibold">Your learning experience</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This course includes:
          </p>
          {/* <ul className="list-disc list-inside">
            <li>Expert instruction</li>
            <li>Real-world examples</li>
            <li>Knowledge checks</li>
            <li>Quizzes</li>
          </ul> */}
          <div className="grid gap-2 text-sm">
            {selectedCourse.data?.coursesModules.map((module) => (
              <div className="flex items-center gap-2" key={module.id}>
                <details>
                  <summary className="cursor-pointer list-disc list-inside underline">
                    {module.modules.name}
                  </summary>
                  <ul className="pl-4 text-xs">
                    {module.modules.modulesClases.map((clase) => (
                      <li key={clase.id}>
                        <Link
                          href={`${pathname}?couseId=${courseId}&lessonId=${clase.clases.url}`}
                        >
                          <button className="rounded-full border-gray-200 dark:border-gray-800">
                            <FaPlay className="w-3 h-3 mr-1.5" />
                          </button>
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
