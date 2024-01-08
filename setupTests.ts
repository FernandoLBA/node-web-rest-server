/**
 * Este archivo se crea con la finalidad de que nuestros tests, usen las variables de entorno de 
 * test (.env.test) y no las de desarrollo (.env).
 * 
 * Luego hay que revisar dentro del archivo jest.config.ts y buscar la key "setupFiles", la
 * cual obtiene un array de strings, y dentro se debe colocar lo siguiente:
 * ["<rootDir>/setupTests.ts"]
 */

import { config } from "dotenv";

config({
  path: ".env.test",
});