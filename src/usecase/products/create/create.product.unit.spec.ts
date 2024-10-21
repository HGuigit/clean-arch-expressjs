import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";


const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
};


describe('Unit tests for product use case', () => {
    let input: InputCreateProductDto;

    beforeEach(() => {
        input = {
            name: 'Coca cola',
            price: 10.00
        };
    });

    it('should create a product', async () => {
        const productRepo = MockRepository();

        const useCase = new CreateProductUseCase(productRepo);
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })

    })

    it('should throw error when name is missing', async () => {
        const productRepo = MockRepository();
        const useCase = new CreateProductUseCase(productRepo);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
        "Name is required"
        );
    })

    it('should throw error when price is missing', async () => {
        const productRepo = MockRepository();
        const useCase = new CreateProductUseCase(productRepo);

        input.price = -1;

        await expect(useCase.execute(input)).rejects.toThrow(
        "Price must be greater than zero"
        );
    })
})


