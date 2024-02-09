"use client";

import { useForm } from "react-hook-form";
import { User, defaultUserValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/lib/models";
import { trpc } from "../_trpc/client";

export const UserList = () => {
  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: defaultUserValues,
    resolver: zodResolver(UserSchema),
  });

  const users = trpc.user.readAll.useQuery();
  const createUser = trpc.user.create.useMutation({
    onSuccess: () => {
      users.refetch();
      reset();
    },
  });
  const updateUser = trpc.user.update.useMutation({
    onSuccess: () => {
      users.refetch();
      reset();
    },
  });
  const deleteUser = trpc.user.delete.useMutation({
    onSuccess: () => {
      users.refetch();
    },
  });

  const onSubmit = (data: User) => {
    if (data.id) {
      updateUser.mutate(data);
    } else {
      createUser.mutate(data);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("name")} />
        <button type="submit">Submit</button>
      </form>
      <br />
      <ul>
        {users.isLoading ? (
          <li>Loading...</li>
        ) : (
          users.data?.map((user) => (
            <li key={user.id}>
              <span>{user.name}</span>|{" "}
              <button
                onClick={() =>
                  reset(user, {
                    keepDefaultValues: true,
                  })
                }
              >
                Edit
              </button>
              | <button onClick={() => deleteUser.mutate(user)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
