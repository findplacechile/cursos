import { CourseSchema } from "@/lib/models";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = router({
  readAll: publicProcedure.query(async () => {
    try {
      return await prisma.categorie.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error al obtener los campos",
      });
    }
  }),
});
