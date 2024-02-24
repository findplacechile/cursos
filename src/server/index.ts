import { categoryRouter } from "./routers/category";
import { clasesRouter } from "./routers/clases";
import { courseRouter } from "./routers/course";
import { ordersRouter } from "./routers/orders";
import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello from tRPC"),
  user: userRouter,
  course: courseRouter,
  clase: clasesRouter,
  order: ordersRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
