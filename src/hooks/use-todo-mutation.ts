import { useCallback, useState } from "react";
import { todoApi } from "@/utils/api/api";
import { toast } from "react-toastify";
import { LoadingStates, Todo, TodoMutation } from "@/utils/types";

export const useTodoMutations = (
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  const [loading, setLoading] = useState<LoadingStates>({
    creating: false,
    toggling: {},
    deleting: {},
    updating: {},
    reordering: false,
  });

  const handleError = (error: unknown, defaultMessage: string) => {
    const message = error instanceof Error ? error.message : defaultMessage;
    toast.error(message);
    throw error;
  };

  const createTodo = useCallback(
    async (mutation: TodoMutation) => {
      setLoading((prev) => ({ ...prev, creating: true }));
      const controller = new AbortController();

      try {
        const newTodo = await todoApi.create(mutation, {
          signal: controller.signal,
        });
        if (!newTodo._id) throw new Error("Invalid todo response");

        setTodos((prev) => [...prev, newTodo]);
        toast.success("Todo created!");
      } catch (error) {
        handleError(error, "Failed to create todo");
      } finally {
        controller.abort();
        setLoading((prev) => ({ ...prev, creating: false }));
      }
    },
    [setTodos]
  );

  const updateTodo = useCallback(
    async (id: string, mutation: TodoMutation) => {
      setLoading((prev) => ({
        ...prev,
        updating: { ...prev.updating, [id]: true },
      }));
      const controller = new AbortController();

      try {
        const updatedTodo = await todoApi.update(id, mutation, {
          signal: controller.signal,
        });
        if (!updatedTodo._id) throw new Error("Invalid todo response");

        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? updatedTodo : todo))
        );
        toast.success("Todo updated!");
      } catch (error) {
        handleError(error, "Failed to update todo");
      } finally {
        controller.abort();
        setLoading((prev) => ({
          ...prev,
          updating: { ...prev.updating, [id]: false },
        }));
      }
    },
    [setTodos]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      setLoading((prev) => ({
        ...prev,
        deleting: { ...prev.deleting, [id]: true },
      }));
      const controller = new AbortController();

      try {
        await todoApi.delete(id, { signal: controller.signal });
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        toast.success("Todo deleted!");
      } catch (error) {
        handleError(error, "Failed to delete todo");
      } finally {
        controller.abort();
        setLoading((prev) => ({
          ...prev,
          deleting: { ...prev.deleting, [id]: false },
        }));
      }
    },
    [setTodos]
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      setLoading((prev) => ({
        ...prev,
        toggling: { ...prev.toggling, [id]: true },
      }));
      const controller = new AbortController();

      try {
        const updatedTodo = await todoApi.toggle(id, {
          signal: controller.signal,
        });
        if (!updatedTodo._id) throw new Error("Invalid todo response");

        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? updatedTodo : todo))
        );
      } catch (error) {
        handleError(error, "Failed to toggle todo");
      } finally {
        controller.abort();
        setLoading((prev) => ({
          ...prev,
          toggling: { ...prev.toggling, [id]: false },
        }));
      }
    },
    [setTodos]
  );

  return { loading, createTodo, updateTodo, deleteTodo, toggleTodo };
};
