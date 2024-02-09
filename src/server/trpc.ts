import { TRPCError, initTRPC } from "@trpc/server";
import Decimal from "decimal.js";
import superjson from "superjson";
import { Context } from "./context";

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  "decimal.js"
);

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const { createCallerFactory, router } = t;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  if (!opts.ctx.session?.user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return opts.next({
    ctx: {
      session: opts.ctx.session,
    },
  });
});
