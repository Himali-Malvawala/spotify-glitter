//FOR THE LOCAL, IT WORKED ALL THE TIME
// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma = new PrismaClient();

//FROM THE PRISMA DEPLOY-TO-VERCEL BLOG
// import { PrismaClient } from '@prisma/client'

// // Avoid instantiating too many instances of Prisma in development
// // https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
// let prisma

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }
//   prisma = global.prisma
// }

// export default prisma;

//FROM PRISMA OFFICAL DOCS

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
