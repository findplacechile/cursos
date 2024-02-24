import Image from "next/image";
import Avatar from "@/app/_assets/images/avatar.jpg";
import Link from "next/link";
import { Categorie } from "@prisma/client";

interface CategoryCardProps {
  category: Categorie;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, id } = category;
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
      </div>
      <div className="flex items-center p-6">
        <Link className="inline-block w-full" href={`categories/${id}`}>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-500/90 h-10 px-4 py-2">
            Inscribirse
          </button>
        </Link>
      </div>
    </div>
  );
};
