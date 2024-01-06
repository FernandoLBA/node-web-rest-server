import { Router } from "express";

import { TodosController } from "./controller";

/**
 * Esta clase va listando todas las rutas de este modulo "todos"
 */
export class TodosRoutes {
  static get routes(): Router {
    const router = Router();
    const todosController = new TodosController();

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
