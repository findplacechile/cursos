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
import { TbWorldWww } from "react-icons/tb";
import { FaPlaneDeparture } from "react-icons/fa";

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
    title: "Desarrollo Web",
    src: <TbWorldWww />,
    to: "/dashboard",
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
  {
    title: "Emprendimiento",
    src: <FaPlaneDeparture />,
    to: "/dashboard/my-courses",
    role: ["STUDENT", "PROFESSOR", "ADMIN"],
  },
];

export const AsideNav = () => {
  const asideNavHidden = useStore(useAsideNavStore, (state) => state.hidden);

  return (
    <aside
    >
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
