// app/page.tsx
import DeleteTodoButton from "@/components/DeleteTodoButton";
import * as queries from "@/src/graphql/queries";
import { deleteTodo } from "@/utils/crudServer";
import { cookiesClient, createTodo } from "@/utils/crudServer";

export default async function Home() {
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });

  // dummy comment to trigger commit and deploy
  const todos = data.listTodos.items;

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <form action={createTodo}>
        <input name="name" placeholder="Add a todo" />
        <input name="description" placeholder="Add a description" />
        <button type="submit">Add</button>
      </form>

      {(!todos || todos.length === 0 || errors) && (
        <div>
          <p>No todos, please add one.</p>
        </div>
      )}

      <ul>
        {todos.map((todo) => {
          return (
            <li style={{ listStyle: "none" }}>
              <div>{todo.name}</div>
              <div>{todo.description}</div>
              <DeleteTodoButton handleClick={deleteTodo} id={todo.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
