"use client";

import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

export default function Course({
  params: { coursesId },
}: {
  params: { coursesId: string };
}) {
  const selectedCourse = trpc.course.findById.useQuery({
    id: parseInt(coursesId),
  });

  return (
    <div className="w-full">
      <div className="bg-gray-100 border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center justify-between h-14 md:h-20">
            <a
              className="flex items-center space-x-2 text-lg font-bold"
              href="#"
            >
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <span className="sr-only">Shadcn</span>
              </span>
            </a>
            <div className="hidden md:flex md:space-x-4">
              <a
                className="flex items-center h-14 px-4 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                Web Development
              </a>
              <a
                className="flex items-center h-14 px-4 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                Design
              </a>
              <a
                className="flex items-center h-14 px-4 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                Marketing
              </a>
            </div>
            <div className="flex md:hidden">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
      <div className="container px-4 py-8 space-y-8 md:py-12 md:space-y-12 lg:space-y-16 xl:space-y-20">
        <div className="grid gap-6 lg:grid-cols-2 xl:gap-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              {selectedCourse.data?.name}
            </h1>
            <p className="text-base leading-loose text-gray-500 md:text-xl dark:text-gray-400">
              {selectedCourse.data?.description}
            </p>
          </div>
          <div className="flex flex-col md:justify-end space-y-2 md:space-y-4">
            <div className="flex items-center space-x-2 text-sm font-medium md:space-x-4 md:text-base">
              <div className="flex items-center space-x-2">
                <Image
                  src={Avatar}
                  width="40"
                  height="40"
                  className="rounded-full object-cover"
                  alt="Instructor"
                />
                <span className="font-semibold">Wes Bos</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">10h 42m</span>
            </div>
            <Link
              href={`${coursesId}/view?couseId=${coursesId}`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 max-w-[200px] md:justify-self-end"
            >
              Enroll in Course
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">What you'll learn</h2>
            <ul className="pl-4 space-y-2">
              <li>Building components with utility classes</li>
              <li>Responsive design with variants</li>
              <li>Customizing your own design system</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Requirements</h2>
            <ul className="pl-4 space-y-2">
              <li>Basic knowledge of HTML and CSS</li>
              <li>Code editor (VS Code recommended)</li>
              <li>Desire to learn and experiment</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 py-8 space-y-8 md:py-12 md:space-y-12 lg:space-y-16 xl:space-y-20">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">What you'll learn</h2>
              <ul className="pl-4 space-y-2">
                <li>Building components with utility classes</li>
                <li>Responsive design with variants</li>
                <li>Customizing your own design system</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Requirements</h2>
              <ul className="pl-4 space-y-2">
                <li>Basic knowledge of HTML and CSS</li>
                <li>Code editor (VS Code recommended)</li>
                <li>Desire to learn and experiment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
