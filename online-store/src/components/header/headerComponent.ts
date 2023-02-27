import './header.scss';
import BaseComponent from '../base/baseComponent';
import { CartComponent } from '../cart/cartComponent';

export class HeaderComponent extends BaseComponent {
    constructor() {
        super({
            tagName: 'header',
            classNames: ['header'],
            parentNode: document.body,
        });
        const headerWrapper = new BaseComponent({
            tagName: 'div',
            classNames: ['header__wrapper'],
        });
        this.insertChild(headerWrapper);
        const logo = new BaseComponent({
            tagName: 'h1',
            classNames: ['header__logo'],
            textContent: 'FlyMore',
        });
        headerWrapper.insertChild(logo);
        const cart = new CartComponent();
        headerWrapper.insertChild(cart);
    }
}
