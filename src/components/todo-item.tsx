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
          <div className="flex-1 flex flex-col md:flex-row gap-2">
            <input
              title="edit"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
              autoFocus
            />
            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={handleEditSubmit}
                className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600 w-full md:w-auto"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full md:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <span
              className={`text-base md:text-[inherit] ${
                todo.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              {todo.activity}
            </span>
            <div className="flex gap-2 ml-0 md:ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600 p-2 md:p-1"
                aria-label="Edit todo"
              >
                <FaEdit className="w-5 h-5 md:w-4 md:h-4" />
              </button>
              <button
                onClick={() => onDelete(todo._id)}
                className="text-red-500 hover:text-red-600 p-2 md:p-1"
                aria-label="Delete todo"
              >
                <FaTrash className="w-5 h-5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);
