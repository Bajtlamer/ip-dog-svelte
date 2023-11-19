import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)

  const user = await prisma.user.create({
    data: {
      fullname: 'Administrator',
      username: 'admin',
      email: '',
      isActive: true,
      isAdmin: true,
      password: await bcrypt.hash('admin', SALT_ROUNDS),
      servers: {
        create: [
          {
          name:"Proxy server DC7",
          hostname: 'https://ipdog-api/',
        },
        {
          name:"Proxy server HQ",
          hostname: 'https://ipdog-api-hq/',
        }
      ],
    },
  }})
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })