import React from "react";
import { FaPlus } from "react-icons/fa";

interface TodoFormProps {
  onSubmit: (activity: string) => Promise<void>;
  isSubmitting: boolean;
}

export const TodoForm = ({ onSubmit, isSubmitting }: TodoFormProps) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await onSubmit(input);
      setInput("");
    } catch (error) {
        // Error handled in parent
        console.error(error);
        
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center gap-2"
        >
          <FaPlus />
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};
