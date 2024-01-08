import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoEntity, UpdateTodoDto } from "../../domain";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";

export class TodoDatasourceImpl implements TodoDatasource {
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    // * Este método retorna un array de TodoEntity, no es lo mismo
    // * que el array de objetos todo, hay que mapearlo y convertir
    // * cada objeto todo en un TodoEntity.
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) throw `Todo with id ${id} is not found`;

    return TodoEntity.fromObject(todo);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({ data: createTodoDto });

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    // * Usamos la propia función de esta clase para validar si existe
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    // * Usamos la propia función de esta clase para validar si existe
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
