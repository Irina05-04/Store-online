import { Notebook } from '../../interface/notebookInterface';
import BaseComponent from '../base/baseComponent';
import { ProductComponent } from '../product/productCartComponent';
import './productsContainer.scss';

export class ProductsContainer extends BaseComponent {
    constructor(
        private addToCart: (product: Notebook) => void,
        private removeFromCart: (id: Notebook['id']) => void,
        private products: Notebook[]
    ) {
        super({
            classNames: ['wrapper'],
        });
        const productComponents = this.products.map((item) => {
            return new ProductComponent(item, addToCart, removeFromCart);
        });
        this.insertChildren(productComponents);
    }
    remove(): void {
        this.setInnerHTML('');
    }
}
