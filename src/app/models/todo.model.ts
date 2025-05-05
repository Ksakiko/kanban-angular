export type Todo = {
  id?: string;
  todo: string;
  listId: string;
};

export type TodoInput = {
  todo: string;
  listId: string;
};

export type List = {
  id?: string;
  title: string;
};
