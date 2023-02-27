import BaseComponent from '../base/baseComponent';
import './seach.scss';

export class SeachComponent extends BaseComponent {
    constructor(private searchProduct: (value: string) => void) {
        super({
            tagName: 'div',
            classNames: ['seach'],
        });
        const imgDiv = new BaseComponent({
            tagName: 'div',
            classNames: ['seach__image'],
        });
        this.insertChild(imgDiv);
        const img = new BaseComponent({
            tagName: 'img',
            classNames: ['seachImg'],
        });
        img.setAttribute('src', 'https://cdn-icons-png.flaticon.com/512/163/163073.png');
        imgDiv.insertChild(img);
        const search: HTMLInputElement = document.createElement('input');
        search.setAttribute('type', 'search');
        search.setAttribute('autofocus', '');
        search.setAttribute('placeholder', 'поиск');
        search.addEventListener('input', () => {
            searchProduct(search.value);
        });
        this.insertChildS(search);
    }
}
