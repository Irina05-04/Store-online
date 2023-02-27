import { Notebook } from '../../interface/notebookInterface';
import BaseComponent from '../base/baseComponent';
import { ButtonComponent } from '../button/buttonComponent';
import './productCart.scss';
export class ProductComponent extends BaseComponent {
    constructor(
        private product: Notebook,
        private addToCart: (product: Notebook) => void,
        private removeFromCart: (id: Notebook['id']) => void
    ) {
        super({
            classNames: ['card'],
        });
        this.setInnerHTML(this.fillCard());
        this.insertChild(this.buttonComponent);
    }
    private buttonComponent = new ButtonComponent(this.product, this.addToCart, this.removeFromCart);
    fillCard() {
        return `<div class="card__image"><img src="${this.product.image}" title="" alt=""></div>
            <div class="card__name">${this.product.name}</div>
            <div class="card__description"><span class="item">год выпуска:</span> ${this.product.year}</div>
            <div class="card__description"><span class="item">цвет:</span> ${this.product.color}</div>
            <div class="card__description"><span class="item">производитель:</span> ${this.product.brend}</div>
            <div class="card__description"><span class="item">размер экрана:</span> ${this.product.screen}</div>
            <div class="card__description"><span class="item">память SSD:</span> ${this.product.SSD}</div>
            <div class="card__description"><span class="item">операционная система:</span> ${this.product.system}</div>
            <div class="card__price">${this.product.price} руб</div>`;
    }
}
