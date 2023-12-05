export interface Todo {
  id: number;
  name: string;
  complete: boolean;
  pinned?: boolean;
  editing?: boolean;
}

// let todos: Todo[] = []
