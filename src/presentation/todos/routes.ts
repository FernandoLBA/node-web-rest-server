import { Router } from "express";

import { TodoDatasourceImpl } from "../../infraestructure/datasources/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.repository.impl";
import { TodosController } from "./controller";

/**
 * Esta clase va listando todas las rutas de este modulo "todos"
 */
export class TodosRoutes {
  static get routes(): Router {
    const router = Router();
    // * Necesitamos instanciar el datasource impl para inyactarlo al repository
    const datasource = new TodoDatasourceImpl()
    // * Se inyecta el datasource al repositoryimpl
    const repository = new TodoRepositoryImpl(datasource);
    // * Se inyecta el repository
    const todosController = new TodosController(repository);

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
