import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import mercadopago from "mercadopago";
import { calculateCourseValue } from "@/app/utils/calculateCourseValue";

export const ordersRouter = router({
  purchaseCourse: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.number(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { userId, courseId } = opts.input;

        // Aquí debes implementar la lógica para calcular el valor del curso
        // y realizar la compra del curso por parte del usuario

        // Por ejemplo, puedes usar la función de Prisma para encontrar el curso
        const course = await prisma.course.findUnique({
          where: {
            id: courseId,
          },
        });

        if (!course) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Curso no encontrado",
          });
        }

        // Calcula el valor del curso
        const totalValue = course.price ?? 0;

        // Realiza la compra del curso
        await prisma.purchase.create({
          data: {
            userId,
            courseId,
            // Puedes agregar más información de la compra según tus necesidades
            // como el valor total, el estado de la compra, etc.
          },
        });

        return {
          success: true,
          message: `Curso comprado con éxito. Total: ${totalValue}`,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al comprar el curso",
        });
      }
    }),
});
