import { v4 as uuid } from "uuid";
import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

const id = uuid();
const product = new Product(id, "Coca cola", 10.00);

const input : InputUpdateProductDto = {
    id: id,
    name: "Coca cola",
    price: 10.00
};

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };

  describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
      const productRepository = MockRepository();
      const useCase = new UpdateProductUseCase(productRepository);

      const output = await useCase.execute(input);

      expect(output).toEqual(input);
    });
  });
  