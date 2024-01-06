import { Router } from "express";

import { TodosRoutes } from "./todos/routes";

/**
 * Esta clase lista todas las rutas de la app
 */
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodosRoutes.routes);

    return router;
  }
}
