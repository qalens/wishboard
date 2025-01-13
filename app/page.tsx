import { getUsers } from "@/db/user";
export default async function Home() {
  const users = await getUsers()
  return (
    <html>
      <body>
        <div>Hello Prisma</div>
      </body>
    </html>
  );
}
