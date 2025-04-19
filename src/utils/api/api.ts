import { Todo, TodoMutation } from "../types";

//const API_BASE = "https://todos-i9x1.onrender.com/api/todos";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Define a standard request configuration type
type RequestConfig = {
  signal?: AbortSignal;
  timeout?: number;
};

export const todoApi = {
  getAll: async (config?: RequestConfig): Promise<Todo[]> => {
    const response = await fetch(API_BASE, {
      signal: config?.signal,
    });
    return handleResponse<Todo[]>(response);
  },

  create: async (todo: TodoMutation, config?: RequestConfig): Promise<Todo> => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
      signal: config?.signal,
    });
    return handleResponse<Todo>(response);
  },

  update: async (
    id: string,
    todo: TodoMutation,
    config?: RequestConfig
  ): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
      signal: config?.signal,
    });
    return handleResponse<Todo>(response);
  },

  delete: async (id: string, config?: RequestConfig): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      signal: config?.signal,
    });
    await handleResponse<void>(response);
  },

  toggle: async (id: string, config?: RequestConfig): Promise<Todo> => {
    const response = await fetch(`${API_BASE}/${id}/toggle`, {
      method: "PUT",
      signal: config?.signal,
    });
    return handleResponse<Todo>(response);
  },
};

// Shared response handler with error checking
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await parseError(response);
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  if (response.status === 204) {
    // No content (for delete)
    return undefined as unknown as T;
  }

  return response.json() as Promise<T>;
}

// Error parsing utility
async function parseError(response: Response): Promise<{ message: string }> {
  try {
    return await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error:unknown) {
    return { message: response.statusText };
  }
}
