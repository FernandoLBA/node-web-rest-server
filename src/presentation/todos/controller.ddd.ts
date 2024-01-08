import { Request, Response } from "express";

import { TodoRepository } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// * Controlador hecho sin USE CASES
export class TodosController {
  // * Inyección de dependencias
  // * Se usa la clase abstracta TodoRepository para que acepte cualquier repository
  constructor(private readonly todoRepository: TodoRepository) {}

  /**
   * Obtiene todos los todos
   * @param req
   * @param res
   */
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

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

    try {
      const todo = await this.todoRepository.findById(+id);

      res.json(todo);
    } catch (error) {
      res.status(400).json(error);
    }
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

    try {
      const todo = await this.todoRepository.create(createTodoDto!);

      res.json(todo);
    } catch (error) {
      res.status(400).json(error);
    }
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

    try {
      const updatedTodo = await this.todoRepository.updatebyId(updateTodoDto!);

      return res.json(updatedTodo);
    } catch (error) {
      res.status(400).json(error);
    }
  };

  /**
   * Elimina un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
      const deleted = await this.todoRepository.deleteById(id);

      res.json(deleted);
    } catch (error) {
      res.status(400).json(error);
    }
  };
}
