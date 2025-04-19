// types.ts
export interface Todo {
  _id: string;
  activity: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TodoMutation = Omit<Todo, "_id" | "createdAt" | "updatedAt">;

export interface LoadingStates {
  creating: boolean;
  toggling: { [key: string]: boolean };
  deleting: { [key: string]: boolean };
  updating: { [key: string]: boolean };
  reordering: boolean;
}


// types.ts
export type TodoUpdatePayload = Partial<Omit<Todo, '_id' | 'createdAt' | 'updatedAt'>>;