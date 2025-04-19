// TodoList.tsx

import { useTodos } from "@/hooks/use-todo";
import { useTodoMutations } from "@/hooks/use-todo-mutation";
import { TodoForm } from "./todo-form";
import { TodoItem } from "./todo-item";


export const TodoList = () => {
  const { todos, setTodos } = useTodos();
  const { loading, createTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodoMutations(setTodos);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo List</h1>

        <TodoForm
          onSubmit={async (activity) =>
            createTodo({ activity, completed: false })
          }
          isSubmitting={loading.creating}
        />

        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onEdit={(id, newText) =>
                updateTodo(id, {
                  activity: newText,
                  completed: todo.completed,
                })
              }
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              isUpdating={!!loading.updating[todo._id]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
