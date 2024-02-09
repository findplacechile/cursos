import { z } from "zod";
import { ClaseSchema, CourseObjectivesSchema, CourseSchema, ObjectiveSchema, UserRoleSchema, UserSchema } from "./models";

export type User = z.infer<typeof UserSchema>;
export const defaultUserValues: User = {
  id: "",
  name: null,
  email: null,
  emailVerified: null,
  image: null,
  roleId: 2,
} as const;

export type UserRole = z.infer<typeof UserRoleSchema>;
export const defaultUserRoleValues: UserRole = {
  id: 0,
  name: "",
} as const;

export type Course = z.infer<typeof CourseSchema>;

 export type CourseObjectives = z.infer<
  typeof CourseObjectivesSchema
>;
export const defaultCourseObjectivesValues = {
  id: 0,
  time: null,
  courseId: "",
  objectiveId: 0,
} as const;

/**
 ** Clases
 */
export type Clase = z.infer<typeof ClaseSchema>;
export const defaultClasesValues = {
  id: 0,
  name: "",
} as const;

/**
 ** Objectives
 */
 export type Objective = z.infer<typeof ObjectiveSchema>;
 export const defaultObjectivesValues = {
   id: 0,
   name: "",
 } as const;
