
// vamos montar um test
// teste que fazer sentido ficarem no mesmo lugar
describe("teste com as contas da calculadora", () => {
    it("deveria retornar a soma de dois valores", () => {
        expect(1 + 2).toBe(3);
    })
    it("deveria retornar a subitração de dois valores", () => {
        expect(1 - 2).toBe(-1);
    })
    it("deveria retornar a multiplicação de dois valores", () => {
        expect(1 * 2).toBe(2);
    })
    it("deveria retornar a divisão de dois valores", () => {
        expect(1 / 2).toBe(0.5);
    })
})