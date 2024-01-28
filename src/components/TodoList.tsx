import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import type { Todo } from "../db/schema";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div class="space-y-2 mt-5">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  );
};

export default TodoList;
