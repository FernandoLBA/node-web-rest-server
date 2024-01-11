import request from "supertest";

import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "body-parser";

describe("todo routes testing", () => {
  // * Antes de cada prueba inicia el server
  beforeAll(async () => {
    await testServer.start();
  });

  // * Después de cada prueba cierra el server
  afterAll(() => {
    testServer.close();
  });

  // * Borramos toda la base de datos antes de cada prueba
  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: "Hola texto 1" };
  const todo2 = { text: "Hola texto 2" };

  test("should return TODOs api/todos", async () => {
    // * Creamos un bulk con 2 todos de una vez a la bd
    await prisma.todo.createMany({ data: [todo1, todo2] });

    // * Se inyecta una instancia de la clase Server y se llama su método app
    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeUndefined();
  });

  test("should return a TODO api/todos/:id", async () => {
    // * Insertamos un todo en la bd
    const todo = await prisma.todo.create({ data: todo1 });

    // * Traemos un registro por id de la bd
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo1.text,
      completedAt: undefined,
    });
  });

  test("should return a 404 not found apu/todos/:id", async () => {
    const { body } = await request(testServer.app)
      .get(`/api/todos/777`)
      .expect(404);

    console.log(body);
  });
});
