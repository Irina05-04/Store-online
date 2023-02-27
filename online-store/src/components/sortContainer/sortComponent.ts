import BaseComponent from '../base/baseComponent';
import { SortButton } from './sortButton';

export class SortComponent extends BaseComponent {
    private arrayButton: SortButton[] = [];
    private sortName: SortButton;
    private sortDate: SortButton;
    constructor(
        private sortProductsNameAsc: () => void,
        private sortProductsNameDes: () => void,
        private sortProductsDateAsc: () => void,
        private sortProductsDateDes: () => void
    ) {
        super({
            classNames: ['sort'],
        });
        const sortDescription = new BaseComponent({
            tagName: 'div',
            classNames: ['sort__description'],
            textContent: 'Сортировать по:',
        });
        let nameContent;
        if (localStorage.sort) {
            if (localStorage.sort == 'nameAsc') {
                nameContent = 'названию↑';
            } else if (localStorage.sort == 'nameDes') {
                nameContent = 'названию↓';
            } else nameContent = 'названию';
        }
        let dateContent;
        if (localStorage.sort) {
            if (localStorage.sort == 'dateAsc') {
                dateContent = 'году выпуска↑';
            } else if (localStorage.sort == 'dateDes') {
                dateContent = 'году выпуска↓';
            } else dateContent = 'году выпуска';
        }
        this.insertChild(sortDescription);
        this.sortName = new SortButton(
            ['sort__name'],
            nameContent ? nameContent : 'названию',
            () => this.sortProductsNameAsc(),
            () => this.sortProductsNameDes(),
            () => this.color('названию')
        );
        this.arrayButton.push(this.sortName);
        this.insertChild(this.sortName);
        this.sortDate = new SortButton(
            ['sort__date'],
            dateContent ? dateContent : 'году выпуска',
            () => this.sortProductsDateAsc(),
            () => this.sortProductsDateDes(),
            () => this.color('году выпуска')
        );
        this.arrayButton.push(this.sortDate);
        this.insertChild(this.sortDate);
        if (localStorage.sort) {
            if (localStorage.sort == 'nameAsc' || localStorage.sort == 'nameDes') {
                this.sortName.setAttribute('style', 'color: black');
            } else if (localStorage.sort == 'dateAsc' || localStorage.sort == 'dateDes') {
                this.sortDate.setAttribute('style', 'color: black');
            }
        }
    }
    color(content: string) {
        this.arrayButton.map((item) => {
            item.removeAttribute('style');
            if (item.getContent()?.includes(content)) {
                item.setAttribute('style', 'color: black');
            } else if (item.getContent()?.includes('↑') || item.getContent()?.includes('↓')) {
                item.setContent(<string>item.getContent()?.slice(0, <number>item.getContent()?.length - 1));
            }
        });
    }
}
