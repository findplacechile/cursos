"use client";

import Logo from "../_assets/images/find-place-logo.png";
import Image from "next/image";
import { Role } from "@/lib/types";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Courses,
  Currency,
  FolderUser,
  Gauge,
  SignOut,
  User,
} from "./Icons";
import useStore from "../_stores/useStore";
import { useAsideNavStore } from "../_stores/useAsideNavStore";

interface Menu {
  title: string;
  src: React.ReactNode;
  to?: string;
  role: Role[];
  gap?: boolean;
  subMenuItems?: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  src: string;
  to: string;
  role?: Role[];
}

const Menus: Menu[] = [
  {
    title: "Escritorio",
    src: <Gauge />,
    to: "/dashboard",
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
  {
    title: "Mis Cursos",
    src: <Courses />,
    to: "/dashboard/my-courses",
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
  {
    title: "Estudiantes",
    src: <User />,
    role: ["ADMIN", "PROFESSOR"],
  },
  {
    title: "Mi Perfil",
    src: <FolderUser />,
    gap: true,
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
  {
    title: "Facturación",
    src: <Currency />,
    to: "/dashboard/invoice",
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
];

export const AdminNav = () => {
  const asideNavHidden = useStore(useAsideNavStore, (state) => state.hidden);

  return (
    <aside
    >
      <figure className="flex w-full items-center justify-center">
        <Image
          className="text-white"
          height={100}
          width={100}
          src={Logo}
          alt="Find Place logo"
          priority
        />
      </figure>
      <div className="flex flex-col items-center gap-2 p-3 text-base-300">
        <ul className="pt-5">
          {Menus.map((Menu, index) => (
            <li key={index}>
              <Link
                className="flex items-center gap-4 p-2 text-white"
                href={Menu.to || "#"}
              >
                <span className="text-neutral-500">{Menu.src}</span>
                <span className="text-base-100">{Menu.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
