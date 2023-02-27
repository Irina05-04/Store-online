import { ProductButtonState } from '../../enums/productButton';
import { Notebook } from '../../interface/notebookInterface';
import BaseComponent from '../base/baseComponent';

export class ButtonComponent extends BaseComponent {
    constructor(
        product: Notebook,
        private addToCart: (product: Notebook) => void,
        private removeFromCart: (id: Notebook['id']) => void
    ) {
        super({
            tagName: 'div',
            classNames: ['card__button'],
            textContent: ProductButtonState.Add,
        });
        if (localStorage.getItem(<string>(<unknown>product.id)) == 'true') {
            this.setAttribute('style', 'background: rgba(128, 0, 0, 0.4);');
            this.setContent(ProductButtonState.Remove);
        } else {
            this.removeAttribute('style');
            this.setContent(ProductButtonState.Add);
        }
        this.addListener('click', () => {
            const isNotInCart = this.getNode().textContent === ProductButtonState.Add;
            this.setContent(isNotInCart ? ProductButtonState.Remove : ProductButtonState.Add);
            isNotInCart
                ? this.setAttribute('style', 'background: rgba(128, 0, 0, 0.4);')
                : this.removeAttribute('style');
            isNotInCart ? addToCart(product) : removeFromCart(product.id);
            isNotInCart
                ? (localStorage[product.id] = 'true')
                : localStorage.setItem(<string>(<unknown>product.id), 'false');
        });
    }
}
