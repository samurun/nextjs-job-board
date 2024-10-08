import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // Declare the type of the global variable, no need for var/let/const
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use let or const for assignment, avoiding the no-var error
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Export the prisma instance
export default prisma;

// Only assign the global variable if we're not in production
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
