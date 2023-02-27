import BaseComponent from '../base/baseComponent';
import './cart.scss';

export class CartComponent extends BaseComponent {
    constructor() {
        super({
            tagName: 'div',
            classNames: ['header__cart'],
        });
        const cartImage = new BaseComponent({
            tagName: 'img',
            classNames: ['cart'],
        });
        cartImage.setAttribute('src', `https://cdn-icons-png.flaticon.com/512/3081/3081822.png`);
        this.insertChild(cartImage);
        const amount = new BaseComponent({
            tagName: 'div',
            classNames: ['amount'],
            textContent: localStorage.count,
        });
        this.insertChild(amount);
    }
    setAmount(count: string) {
        const amount = document.querySelector('.amount');
        if (amount) {
            amount.innerHTML = count;
        }
    }
}
