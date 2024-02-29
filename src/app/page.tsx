"use client"

import React from "react";
import { FaPuzzlePiece, FaRunning } from "react-icons/fa";
import { MdBuild } from "react-icons/md";
import { trpc } from "./_trpc/client";
import { CategoryCard } from "./_components/CategoryCard";
import Loading from "./_components/Loading";
import Link from "next/link";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export default function Home() {
  const categories = trpc.category.readAll.useQuery()

  return (
    <>
    <Navbar />
    <main className="flex flex-col items-center">
      <div className="flex flex-col w-full bg-indigo-400 h-96 items-center justify-center gap-4">
        <h1>Los mejores cursos del mundo</h1>
        <h2>Crea y aprende al mismo tiempo</h2>
        <Link className="p-0" href={`courses`}>
          <button>
            Inscribirse
          </button>
        </Link>
      </div>
      <section className="flex flex-col items-center mt-10 mb-5 text-center gap-4">
      <h1>Nuestra metodología</h1>
      <p>Una lesson podrías estar relacionada con muchos cursos, entonces con una lesson podrías estar aprendiendo muchas cosas al mismo tiempo.</p>
      </section>
      <section className="grid md:grid-cols-3 gap-8 w-5/6">
        <article className="flex flex-col items-center bg-white p-8 rounded shadow-lg gap-2">
        <MdBuild className="w-16 h-16 text-purple-700" />
          <h2>Aprende Creando</h2>
          <p className="text-center">
            Menos teoría y más práctica. Comenzarás creando tu propio proyecto desde 0 y en el camino
            aprenderás cada paso.
          </p>
        </article>
        <article className="flex flex-col items-center bg-white p-8 rounded shadow-lg">
          <FaRunning className="w-16 h-16 text-[#1bc1ac]" />
          <h2>Aprende Rápido</h2>
          <p className="text-center">
            Vamos directo al grano, estás invirtiendo tu tiempo y/o dinero, por lo mismo desarrollamos cursos que duren el menor tiempo posible.
          </p>
        </article>
        <article className="flex flex-col items-center bg-white p-8 rounded shadow-lg">
          <FaPuzzlePiece className="w-16 h-16 text-red-500" />
          <h2>Aprende lo Necesario</h2>
          <p className="text-center">
            Puedes inscribirte en un curso completo o solo en una lesson, así aprenderás lo necesario y aprovecharás mejor tu tiempo y dinero.
          </p>
        </article>
      </section>
      <section className="flex flex-col items-center mt-10 mb-5 text-center gap-4">
      <h1>Mira nuestros cursos</h1>
      </section>
      <section className="flex flex-col items-center text-center gap-4 w-5/6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.isLoading ? (
          <Loading />
        ) : (
          categories.data?.map((category) => (
            <React.Fragment key={category.id}>
              <div className="flex items-center gap-3">
                <CategoryCard category={category} />
              </div>
            </React.Fragment>
          ))
        )}
      </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
