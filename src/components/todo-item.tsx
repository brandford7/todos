// TodoItem.tsx
import { Todo } from "@/utils/types";
import React from "react";
import { FaCheckCircle, FaCircle, FaEdit, FaTrash } from "react-icons/fa";


interface TodoItemProps {
  todo: Todo;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  isUpdating: boolean;
}

export const TodoItem = React.memo(
  ({ todo, onEdit, onDelete, onToggle, isUpdating }: TodoItemProps) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editText, setEditText] = React.useState(todo.activity);

    const handleEditSubmit = () => {
      onEdit(todo._id, editText);
      setIsEditing(false);
    };

    return (
      <div className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <button
                type="button"
          onClick={() => onToggle(todo._id)}
          className="mr-3 text-gray-400 hover:text-green-500 transition-colors"
          disabled={isUpdating}
          aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        >
          {todo.completed ? (
            <FaCheckCircle className="w-5 h-5 text-green-500" /> 
          ) : (
            <FaCircle className="w-5 h-5" />
          )}
        </button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
                    <label className="hidden">Edit Todo </label>
                    <input
                       title="todo"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditSubmit}
                className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <span
              className={`${
                todo.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {todo.activity}
            </span>
            <div className="flex gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600"
                aria-label="Edit todo"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="text-red-500 hover:text-red-600"
                aria-label="Delete todo"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
