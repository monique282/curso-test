import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";
import e from "express";

const api = supertest(app);

// faiz limpar o banco toda vez que esecuta um test
beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {

  //deve criar um usuário
  it("should create a user", async () => {

    // serve para criar um usuario para passar no test
    const { status } = await api.post("/users").send({
      email: "m1@m.com",
      password: "1234"
    });

    // verificando se foi criado
    expect(status).toBe(201)
  });

  // deverá receber 409 ao tentar criar dois usuários com o mesmo e-mail
  it("should receive 409 when trying to create two users with same e-mail", async () => {
    // serve para criar um usuario para passar no test
    const result = await api.post("/users").send({
      email: "m1@m.com",
      password: "1234"
    });
    expect(result.status).toBe(201)

    // serve para criar um usuario para passar no test
    const { status } = await api.post("/users").send({
      email: "m1@m.com",
      password: "1234"
    });

    expect(status).toBe(409)
  });

});

describe("GET /users tests", () => {

  //deve retornar um único usuário
  it("should return a single user", async () => {

    // criando o senario
    await prisma.user.create({
      data: {
        email: "m1@m.com",
        password: "1234"
      }
    })

    // validando se esta vindo somente 1 usuario
    const { status, body } = await api.get(`/users`);
    expect(status).toBe(200);
    expect(body).toHaveLength(1);

    // validando se os usuarios estão no formato correto
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
      ])
    )


  });

  //deve retornar 404 quando não for possível encontrar um usuário por id
  it("should return 404 when can't find a user by id", async () => {

    // criando um senario
    const book = await prisma.user.create({
      data: {
        email: "m1@m.com",
        password: "1234"
      }
    })

    // validando o senario
    const { status } = await api.get(`/users/2`);
    expect(status).toBe(404);

  });


  //deve retornar todos os usuários
  it("should return all users", async () => {

    // criando o senario
    await prisma.user.create({
      data: {
        email: "m1@m.com",
        password: "12348"
      }
    })

    await prisma.user.create({
      data: {
        email: "m2@m.com",
        password: "12343"
      }
    })

    await prisma.user.create({
      data: {
        email: "m3@m.com",
        password: "1234"
      }
    })

    // validando se esta vindo todos os usuarios
    const { status, body } = await api.get(`/users`);
    expect(status).toBe(200);
    expect(body).toHaveLength(3)
    console.log(body)

    // validando se os usuarios estão no formato correto
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
      ])
    )

  });

})