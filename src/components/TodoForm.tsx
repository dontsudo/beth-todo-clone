const TodoForm = () => {
  return (
    <form
      class="flex mt-4"
      hx-post="/todos"
      hx-swap="beforebegin"
      hx-trigger="submit"
      _="on htmx:afterRequest reset() me"
    >
      <input
        type="text"
        name="content"
        class="form-input border-2 border-gray-300 rounded-md p-2 flex-grow mr-2"
        placeholder="Add a new todo..."
      />
      <button
        type="submit"
        class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
