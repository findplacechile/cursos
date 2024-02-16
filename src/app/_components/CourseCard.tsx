import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Link from "next/link";
import { Course } from "@prisma/client";

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { name, description, requirements, id } = course;
  return (
    <div
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
      data-v0-t="card"
    >
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={Avatar}
          alt="Course thumbnail"
          className="object-cover w-full h-full rounded-se-lg rounded-ss-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          by <span className="font-medium">Dr. Gabriela Sánchez</span>
        </p>
        <p className="text-sm text-gray-500">4h 30m</p>
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm font-medium text-gray-500">
            Requirements:
          </span>
          <span className="text-sm text-gray-500">{requirements}</span>
        </div>
      </div>
      <div className="flex items-center p-6">
        <Link className="inline-block w-full" href={`courses/${id}`}>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-500/90 h-10 px-4 py-2">
            Enroll
          </button>
        </Link>
      </div>
    </div>
  );
};
