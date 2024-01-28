import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { eq } from "drizzle-orm";

import { db } from "./db";
import { todos } from "./db/schema";
import { RootLayout, TodoItem, TodoList } from "./components";

const app = new Elysia()
  .use(html())
  .get("/", () => (
    <RootLayout>
      <body
        class="flex w-full h-screen justify-center items-center"
        hx-get="/todos"
        hx-trigger="load"
        hx-swap="innerHTML"
      ></body>
    </RootLayout>
  ))
  .get("/todos", async () => {
    const data = await db.query.todos.findMany();
    return <TodoList todos={data} />;
  })
  .get(
    "/todos/:id",
    async ({ params }) => {
      const todo = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))
        .get();

      if (!todo) throw new Error("Todo not found");

      return <TodoItem {...todo} />;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post(
    "/todos",
    async ({ body }) => {
      const todo = await db
        .insert(todos)
        .values({
          content: body.content,
          completed: false,
        })
        .returning()
        .get();

      return <TodoItem {...todo} />;
    },
    {
      body: t.Object({
        content: t.String({ minLength: 1 }),
      }),
    }
  )
  .post(
    "/todos/:id/toggle",
    async ({ params }) => {
      const todo = await db
        .select()
        .from(todos)
        .where(eq(todos.id, params.id))
        .get();

      if (!todo) throw new Error("Todo not found");

      const updatedTodo = await db
        .update(todos)
        .set({ completed: !todo.completed })
        .where(eq(todos.id, params.id))
        .returning()
        .get();

      return <TodoItem {...updatedTodo} />;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .delete(
    "/todos/:id",
    async ({ params }) => {
      // 빈 걸로 리턴하면 빈 걸로 바뀜 (hx-swap="outerHTML")
      await db.delete(todos).where(eq(todos.id, params.id)).execute();
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .listen({ port: 3000 });

console.log(`Use ${app.server?.hostname}:${app.server?.port}`);
