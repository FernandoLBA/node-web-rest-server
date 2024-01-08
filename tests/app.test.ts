import { envs } from "../src/config/envs";
import { Server } from "../src/presentation/server";

// * Así hacemos un mock de todo lo que está dentro de una ruta
jest.mock("../src/presentation/server");

describe("App.ts tests", () => {
  test("should call server with arguments and with prototype.start", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
