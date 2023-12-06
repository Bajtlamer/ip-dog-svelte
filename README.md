# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

## PRISMA db and seeds configuration

#### Seeding your database with TypeScript or JavaScript

1. Create a new file named seed.ts. This can be placed anywhere within your projects folder structure. The below example places it in the /prisma folder.

2. In the seed.ts file, import Prisma Client, initialize it and create some records. As an example, take the following Prisma schema with a User and Post model:

```bash
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  published Boolean
  user      User    @relation(fields: [userId], references: [id])
  userId    Int
}
```
Create some new users and posts in your seed.ts file:

```bash
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          content: 'https://www.prisma.io/nextjs',
          published: true,
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
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
```

3. Add typescript, ts-node and @types/node development dependencies:

```bash
npm install -D typescript ts-node @types/node
```

4. Add the prisma.seed field to your package.json file:

```bash
{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "devDependencies": {
    "@types/node": "^14.14.21",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.3"
  }
}
```
Some projects may require you to add compile options. When using Next.js for example, you would setup your seed script like so:

```bash
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

5. Initialize db follow created configuration schema:
```bash
npx prisma migrate dev --name init
```

6. To seed the database, run the db seed CLI command:

```bash
npx prisma db seed
```



You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

The icons are used from [https://icon-sets.iconify.design/pepicons-pencil/dots-x/](https://icon-sets.iconify.design/pepicons-pencil/dots-x/)