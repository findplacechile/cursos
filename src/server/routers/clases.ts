import { CourseSchema } from "@/lib/models";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const clasesRouter = router({
  // create: adminProcedure
  //   .input(
  //     ClasesSchema.omit({
  //       id: true,
  //     })
  //   )
  //   .mutation(async (opts) => {
  //     try {
  //       const courseFound = await prisma.clases.findFirst({
  //         where: {
  //           name: opts.input.name,
  //         },
  //       });

  //       if (courseFound) {
  //         ThrowError(Error, "CONFLICT", "El curso ya existe");
  //       }
  //       return await prisma.clases.create({
  //         data: opts.input,
  //       });
  //     } catch (error) {
  //       ThrowError(error);
  //     }
  //   }),
  readAll: publicProcedure.query(async () => {
    try {
      return await prisma.clase.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error al obtener los campos",
      });
    }
  }),
  findById: publicProcedure
    .input(
      z.object({
        id: z.coerce.number().int(),
      })
    )
    .query(async (opts) => {
      try {
        return await prisma.clase.findUnique({
          where: {
            id: opts.input.id,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener la clase",
        });
      }
    }),
});
