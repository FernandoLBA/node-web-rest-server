import { Request, Response } from "express";

import { TodoRepository } from "../../domain";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  UpdateTodo,
} from "../../domain/use-cases";

// * Este controller si usa USE CASES
export class TodosController {
  // * Inyección de dependencias
  // * Se usa la clase abstracta TodoRepository para que acepte cualquier repository
  constructor(private readonly todoRepository: TodoRepository) {}

  /**
   * Obtiene todos los todos
   * @param req
   * @param res
   */
  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };

  /**
   * Obtiene un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(+id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  /**
   * Crea un nuevo todo
   * @param req
   * @param res
   * @returns
   */
  public createTodo = (req: Request, res: Response) => {
    // * Aquí invocamos al método de la clase y le mandamos el body, esto retorna un array:
    // *    error  ,       instancia
    // * [undefined, new CreateTodoDto(text)]
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  /**
   * Actualiza un todo existente
   * @param req
   * @param res
   * @returns
   */
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  /**
   * Elimina un todo por su id
   * @param req
   * @param res
   * @returns
   */
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
