import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy butter", completedAt: null },
  { id: 3, text: "Buy bread", completedAt: new Date() },
];

export class TodosController {
  // * Inyección de dependencias
  constructor() {}

  /**
   * Obtiene todos los todos
   * @param req
   * @param res
   */
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  /**
   * Obtiene un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    const todo = todos.find((todo) => todo.id === +id);

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };

  /**
   * Crea un nuevo todo
   * @param req
   * @param res
   * @returns
   */
  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const newTodo = {
      text,
      completedAt: new Date(),
      id: todos.length + 1,
    };

    todos.push(newTodo);

    res.json(newTodo);
  };

  /**
   * Actualiza un todo existente
   * @param req
   * @param res
   * @returns
   */
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });

    // * Actualizamos el todo
    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json(todo);
  };

  /**
   * Elimina un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const todo = todos.find((todo) => todo.id === id);

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    // * Se le pasa por referencia el index del todo y se remueve del array
    todos.splice(todos.indexOf(todo), 1);

    res.json(todo);
  };
}
