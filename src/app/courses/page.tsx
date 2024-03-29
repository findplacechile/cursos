"use client";

import { trpc } from "../_trpc/client";
import React from "react";
import Loading from "../_components/Loading";
import { CourseCard } from "../_components/CourseCard";
import { AsideNav } from "../_components/AsideNav";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Courses() {
  const courses = trpc.course.readAll.useQuery();

  return (
    <>
    <div className="sticky top-0">
    <Navbar />
    </div>
    <main className="flex w-screen">
      <aside className="left-0 bg-white fixed top-18 h-full w-1/5">
        <AsideNav />
      </aside>
      <section className="grid md:grid-cols-3 gap-6 p-14 w-4/5 ml-60">
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
      </section>
    </main>
    <Footer />
    </>
  );
}
