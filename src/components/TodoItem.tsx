import type { Todo } from "../db/schema";

const TodoItem = ({ content, completed, id }: Todo) => {
  return (
    <div
      id={`todo-${id}`}
      class="flex items-center justify-between p-4 rounded-lg shadow-sm"
    >
      <div class="flex items-center">
        <input
          id={`checkbox-${id}`}
          class="mr-2"
          type="checkbox"
          checked={completed}
          hx-post={`/todos/${id}/toggle`}
          hx-target={`#todo-${id}`}
          hx-swap="outerHTML"
        />
        <p class={`${completed ? "line-through" : ""}`}>{content}</p>
      </div>
      <button
        type="button"
        hx-delete={`/todos/${id}`}
        hx-target={`#todo-${id}`}
        hx-swap="outerHTML"
      >
        ␥
      </button>
    </div>
  );
};

export default TodoItem;
