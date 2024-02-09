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
            <Image
              className="clip-custom h-72 w-full rounded-lg object-cover"
              width={100}
              height={100}
              src={Avatar}
              alt="Clase Image"
            />
            <h1>{clase.data?.name}</h1>
            <h2>Lo que aprenderás</h2>
            
            <h2>Descripción</h2>
          </main>
        </div>
      )}
    </div>
  );
}
