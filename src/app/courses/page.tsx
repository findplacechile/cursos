"use client";

import { trpc } from "../_trpc/client";
import React from "react";
import Loading from "../_components/Loading";
import { CoursePreview } from "../_components/CoursePreview";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Courses() {

  const courses = trpc.course.readAll.useQuery();
  console.log(courses)

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-8">
      {courses.isLoading ? (
        <Loading />
      ) : (
        courses.data?.map((course) => (
          <React.Fragment key={course.id}>
            <div className="flex items-center gap-3">
              <CoursePreview course={course} />
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
}
