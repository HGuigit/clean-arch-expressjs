type ProductOutput = {
    id: String,
    name: String,
    price: number
}


export interface OutputListProductDto {
    products: ProductOutput[]
}