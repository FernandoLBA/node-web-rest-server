import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoRepository {
  // Todo: hay que hacer la paginación
  abstract getAll(): Promise<TodoEntity[]>;
  
  abstract findById(id: number): Promise<TodoEntity>;
  abstract create(createTodoDto: CreateTodoDto):Promise<TodoEntity>;
  abstract updatebyId(updateTodoDto: UpdateTodoDto):Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}