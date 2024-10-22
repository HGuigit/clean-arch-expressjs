import { v4 as uuid } from "uuid";
import { InputFindCustomerDto } from "../../customer/find/find.customer.dto";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

const id = uuid();
const product = new Product(id, "Coca Cola", 10.00);
const input: InputFindCustomerDto = {
    id
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};


describe('Unit tests for product use case', () => {

    it('should find a product', async () => {
        const productRepo = MockRepository();

        const useCase = new FindProductUseCase(productRepo);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: input.id,
            name: product.name,
            price: product.price
        })

    })

    it('should not find a product', async () => {
        const productRepo = MockRepository();

        productRepo.find.mockImplementation(() => {
            throw new Error("Product not found");
        });
        const useCase = new FindProductUseCase(productRepo);

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    })


})
