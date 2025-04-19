import { useEffect } from "react";
import { useLocalStorage } from "./use-localstorage";
import { todoApi } from "@/utils/api/api";
import { Todo } from "@/utils/types";


export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await todoApi.getAll();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  return { todos, setTodos };
};
