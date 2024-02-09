import { clasesRouter } from "./routers/clases";
import { courseRouter } from "./routers/course";
import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  greeting: publicProcedure.query(() => "Hello from tRPC"),
  user: userRouter,
  course: courseRouter,
  clase: clasesRouter,
});

export type AppRouter = typeof appRouter;
