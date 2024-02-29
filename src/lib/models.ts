import { z } from "zod";
import { Decimal as DecimalPackage } from "decimal.js";

const String = z.string();
const Int = z.coerce.number().int();
const BigInt = z.coerce.bigint();
const Float = z.coerce.number();
const Boolean = z.boolean();
const DateTime = z.coerce.date();
const Decimal = z.custom<DecimalPackage>((val) => {
  if (val instanceof DecimalPackage) {
    return { success: true, data: val };
  } else {
    return { success: false, error: "Not a decimal" };
  }
});

export const RoleSchema = z.enum(["STUDENT", "PROFESSOR", "ADMIN"]);

export const UserSchema = z.object({
  id: String,
  name: String.nullable(),
  email: String.nullable(),
  emailVerified: DateTime.nullable(),
  image: String.nullable(),

  roleId: Int,
});

export const UserRoleSchema = z.object({
  id: Int,
  name: String,
});

/**
 ** CoursesObjectives
 */
 export const CourseObjectivesSchema = z.object({
  id: Int,
  courseId: Int,
  objectiveId: Int,
});

/**
 ** Courses
 */
 export const CourseSchema = z.object({
  id: Int,
  name: String,
  description: String,
  teacherId: String,
});

/**
 ** Modules
 */
 export const ModuleSchema = z.object({
  id: Int,
  name: String,
});

/**
 ** Lessons
 */
 export const LessonSchema = z.object({
  id: Int,
  name: String,
  description: String,
});

/**
 ** Objectives
 */
 export const ObjectiveSchema = z.object({
  id: Int,
  name: String,
});

/**
 ** 
 */
 export const CourseModulesSchema = z.object({
  id: Int,
  time: DateTime,
  courseId: Int,
  moduleId: Int,
});

/**
 ** LoginUser
 **/
 export const LoginUserSchema = z.object({
  email: String,
  password: String.min(3),
});

