import { Notebook } from '../interface/notebookInterface';

export class CartService {
    private cart: Notebook[] = [];
    setLength(l: number) {
        this.cart.length = l;
    }
    getProducts() {
        return this.cart;
    }
    getCount() {
        return <string>(<unknown>this.cart.length);
    }
    addToCart(product: Notebook) {
        if (this.cart.length >= 20) {
            alert('Корзина заполнена');
        } else this.cart.push(product);
    }
    removeFromCart(id: Notebook['id']) {
        this.cart = this.cart.filter((product) => {
            return product.id !== id;
        });
    }
}
