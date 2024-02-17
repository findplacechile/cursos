"use client";

import { trpc } from "../_trpc/client";
import React from "react";
import Loading from "../_components/Loading";
import { CoursePreview } from "../_components/CoursePreview";
import { CourseCard } from "../_components/CourseCard";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Courses() {
  const courses = trpc.course.readAll.useQuery();
  // console.log(courses);

  return (
    <div>
      <div className="flex flex-col gap-2 px-14 pt-14">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Introduction to Web Development
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Designed for beginners
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-14">
        {courses.isLoading ? (
          <Loading />
        ) : (
          courses.data?.map((course) => (
            <React.Fragment key={course.id}>
              <div className="flex items-center gap-3">
                <CourseCard course={course} />
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
