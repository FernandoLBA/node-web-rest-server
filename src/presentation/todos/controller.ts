import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  // * Inyección de dependencias
  constructor() {}

  /**
   * Obtiene todos los todos
   * @param req
   * @param res
   */
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    res.json(todos);
  };

  /**
   * Obtiene un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    const todo = await prisma.todo.findUnique({
      where: {
        id: +id,
      },
    });

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
  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const todo = await prisma.todo.create({
      data: { text },
    });

    res.json(todo);
  };

  /**
   * Actualiza un todo existente
   * @param req
   * @param res
   * @returns
   */
  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: +id,
      },
      data: {
        text,
        completedAt: completedAt ? new Date(completedAt) : null,
      },
    });

    res.json(updatedTodo);
  };

  /**
   * Elimina un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(+id))
      return res.status(400).json({ error: "Id argument is not a number" });

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });

    const deleted = await prisma.todo.delete({ where: { id } });

    res.json(deleted);
  };
}