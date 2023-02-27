import * as dataJSON from '../file.json';
import { Notebook } from '../interface/notebookInterface';

export class ProductService {
    private products: Notebook[] = [];
    loadProducts() {
        this.products = dataJSON.default;
    }
    getProducts() {
        return this.products;
    }
    setProducts(products: Notebook[]) {
        this.products = products;
    }
    getArrayFilter(type: string) {
        const buf: string[] = [];
        this.products.map((item) => {
            const value: string = Object.getOwnPropertyDescriptor(item, type)?.value;
            if (!buf.includes(value)) {
                buf.push(value);
            }
        });
        return buf.sort();
    }
}
