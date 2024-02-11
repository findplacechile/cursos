"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res)
    router.push('/dashboard')
      router.refresh()
  });
  return (
    <div className="grid h-screen w-full grid-cols-1 items-center justify-center gap-4 px-8 md:grid-cols-2 lg:px-32">
      <h1 className="text-4xl font-black text-indigo-600">
        Inicia Sesión y Administra{" "}
        <span className="text-black">Tus Registros</span>
      </h1>
      <div className="flex rounded-xl bg-white p-8">
        <form className="grid w-full gap-4" onSubmit={onSubmit}>
          <fieldset>
          <label>
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            placeholder="user@email.com"
          />
          </fieldset>

{errors.email && typeof errors.email === 'string' && (
  <span className="text-red-500">{errors.email}</span>
)}

          <label className="text-left text-base font-semibold text-black">
            Contraseña
          </label>
          <input
            className="rounded-xl border-slate-200 bg-[#eef5fa] p-3 text-base"
            type="password"
            {...register("password")}
          />
         {errors.password && typeof errors.password === 'string' && (
  <span className="text-red-500">{errors.password}</span>
)}

          <button type="submit" className="btn bg-purple-700">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
