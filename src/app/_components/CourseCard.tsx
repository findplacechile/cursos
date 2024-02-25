import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Link from "next/link";
import { Course } from "@prisma/client";
import { VscBook } from "react-icons/vsc";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { name, description, requirements, id, feature_image, teacherId } =
    course;
  return (
    <Link className="p-0 text-gray-900" href={`courses/${id}`}>
      <div className="rounded-md border bg-white p-4 flex flex-col items-start gap-4">
        <div>
          <Image src={Avatar} alt="Course thumbnail" className="rounded-md" />
        </div>
        <h3>{name}</h3>
        <div className="bg-[#1bc1ac] p-1 rounded-full">
          <VscBook />
        </div>
        <p>$20.000</p>
        <div className="w-full bg-gray-200 rounded-full">
    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: "45%" }}>45%</div>
  </div>
      </div>
    </Link>
  );
};
