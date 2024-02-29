import { categoryRouter } from "./routers/category";
import { lessonsRouter } from "./routers/lessons";
import { courseRouter } from "./routers/course";
import { ordersRouter } from "./routers/pursache";
import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello from tRPC"),
  user: userRouter,
  course: courseRouter,
  lesson: lessonsRouter,
  order: ordersRouter,
  category: categoryRouter,
});

export type AppRouter = typeof appRouter;
