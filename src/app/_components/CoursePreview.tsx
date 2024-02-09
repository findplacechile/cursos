// components/CoursePreview.tsx
import Image from "next/image";
//import Avatar from "../../_assets/images/avatar.jpg";
import { Course } from "@/lib/types";

interface CourseProps {
  course: Course
}

export const CoursePreview = ({ course }: CourseProps) => {
  return (
    <div className="z-50 h-fit w-[29rem] rounded-t-xl bg-white shadow-md">
      {/* <Image
        className="h-64 rounded-t-xl object-cover object-center"
        width={100}
        height={100}
        src={Avatar}
        alt="User avatar"
      /> */}
      <div className="flex flex-col items-center gap-4 p-4">
        <h1 className="card-title line-clamp-1 uppercase">{course.name}</h1>
      </div>
    </div>
  );
};
