import { Request, Response } from "express";

import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

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
    // * Aquí invocamos al método de la clase y le mandamos el body, esto retorna un array:
    // *    error  ,       instancia
    // * [undefined, new CreateTodoDto(text)]
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
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
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} is not found` });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: +id,
      },
      data: updateTodoDto!.values,
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
