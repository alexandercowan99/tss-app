import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
const client = await db.connect();

const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      name: 'Alexander',
      email: 'a.cowan853@gmail.com',
      password: '123456',
    },
  ];
  
console.log(users)

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await seedUsers();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
    console.log(error)
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
  }