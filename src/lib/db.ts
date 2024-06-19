import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.DATABASE_URL}`,
  authToken: `${process.env.AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });
// const prisma = new PrismaClient();
export const luciAdapter = new PrismaAdapter(prisma.session, prisma.user)

export default prisma;
