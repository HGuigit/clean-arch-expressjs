import { v4 as uuid } from "uuid";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create(
    "a",
    "Coca Cola",
    10.00
  );

const product2 = ProductFactory.create(
    "a",
    "Guarana",
    11.00
);

const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
  };
  describe("Unit test for listing products use case", () => {
    it("should list products", async () => {
      const repository = MockRepository();
      const useCase = new ListProductUseCase(repository);

      const output = await useCase.execute();

      expect(output.products.length).toBe(2);
      expect(output.products[0].price).toBe(product1.price);
      expect(output.products[0].name).toBe(product1.name);
      expect(output.products[1].price).toBe(product2.price);
      expect(output.products[1].name).toBe(product2.name);
    });
  });