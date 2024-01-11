
import { envs } from "../src/config/envs";
import { AppRoutes } from '../src/presentation/routes';
import { Server } from "../src/presentation/server";

// * Servidor de pruebas para testing
export const testServer = new Server({
  port: envs.PORT,
  routes: AppRoutes.routes,
  // public_path: envs.PUBLIC_PATH,
});
