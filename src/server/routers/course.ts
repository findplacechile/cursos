import { CourseSchema } from "@/lib/models";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const courseRouter = router({
  // create: adminProcedure
  //   .input(
  //     CourseSchema.omit({
  //       id: true,
  //     })
  //   )
  //   .mutation(async (opts) => {
  //     try {
  //       const courseFound = await prisma.courses.findFirst({
  //         where: {
  //           name: opts.input.name,
  //         },
  //       });

  //       if (courseFound) {
  //         ThrowError(Error, "CONFLICT", "El curso ya existe");
  //       }
  //       return await prisma.courses.create({
  //         data: opts.input,
  //       });
  //     } catch (error) {
  //       ThrowError(error);
  //     }
  //   }),
  readAll: publicProcedure.query(async () => {
    try {
      return await prisma.course.findMany();
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
        return await prisma.course.findUnique({
          where: {
            id: opts.input.id,
          },
          include: {
            teacher: true,
            coursesObjectives: {
              include: {
                objectives: true,
              },
            },
            coursesModules: {
              include: {
                modules: {
                  include: {
                    modulesLessons: {
                      include: {
                        lessons: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al obtener la lesson",
        });
      }
    }),
});
