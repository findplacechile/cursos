import { publicProcedure, router } from "../trpc";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import mercadopago from "mercadopago";


export const ordersRouter = router({
  createOrder: publicProcedure
    .mutation(async () => {
      try {
        // Configurar mercadopago
        mercadopago.configure({
          access_token: "TEST-8853581783728437-022215-548480cb674960bc06913309fa962a81-1693929423"
        });

        // Crear la orden
        const result = await mercadopago.preferences.create({
          items: [
            {
              title: "Laptop",
              unit_price: 500,
              currency_id: "PEN",
              quantity: 1,
            },
          ],
          notification_url: "https://e720-190-237-16-208.sa.ngrok.io/webhook",
          back_urls: {
            success: "http://localhost:3000/success",
            // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
            // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
          },
        });

        console.log(result);

        return result.body;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error al crear la orden",
        });
      }
    }),
});
