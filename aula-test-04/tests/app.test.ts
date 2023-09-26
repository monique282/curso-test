import app from "app";
import supertest from "supertest";

const server = supertest(app);
// vamos montar um test
// teste que fazer sentido ficarem no mesmo lugar
describe("Api deveria iniciar de formar correta", () => {

    it("/health", async () => {
        // o supertest vai fazer tudo que preciso para o teste em questão de servidor(express) e requicição(axios)
        const result = await server.get("/health");
        console.log(result)

        // ver se o jest esta ok
        const {statusCode} = result;
        expect(statusCode).toBe(200)
    });
});