"use client";

import { trpc } from "@/app/_trpc/client";
import Loading from "@/app/_components/Loading";
import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";

export default function Clase({ params: { clasesId } }: { params: { clasesId: string } }) {
  const claseId = parseInt(clasesId, 10);
  const clase = trpc.clase.findById.useQuery({ id: claseId });
  console.log(clase)
  return (
    <div>
      {clase.isLoading ? (
        <Loading />
      ) : (
        <div className="p-2 md:p-8">
          <main className="grid grid-cols-1 gap-3">
          <iframe
            width="560"
            height="315"
            src={clase.data?.url}
            title={clase.data?.name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
            <h1>{clase.data?.name}</h1>
            <h2>Lo que aprenderás</h2>
            
            <h2>Descripción</h2>
          </main>
        </div>
      )}
    </div>
  );
}
