"use server";
import prisma from "@/lib/db";
import { generateIdFromEntropySize } from "lucia";
import { lucia } from "@/lib/auth";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { validateRequest } from "@/lib/validateReq";
import { redirect } from "next/navigation";

export const signup = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const exists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!exists) {
    const userId = generateIdFromEntropySize(10);
    const hashed = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    await prisma.user.create({
      data: {
        id: userId,
        username,
        password: hashed,
      },
    });
    return redirect("/login");
  }
};

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const exists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (exists) {
    const validPassword = await verify(exists.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) return;
    else {
      const session = await lucia.createSession(exists.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return redirect("/home");
    }
  }
}

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
};
