//import { Notebook } from '../../interface/notebookInterface';
import BaseComponent from '../base/baseComponent';
import { FilterValueItem } from '../filterValueItem/filterValueItem';
import '../filtersValue/filtersValue.scss';

export class FilterValueComponent extends BaseComponent {
    private arrayButton: FilterValueItem[] = [];
    constructor(type: string, arr: string[], private filterValue: (type: string, value: string) => void) {
        super({
            tagName: 'div',
            classNames: [`filter__${type}`, `${type}`],
        });
        const description = new BaseComponent({
            tagName: 'p',
            classNames: [`${type}__description`],
            textContent: `${type}:`,
        });
        this.insertChild(description);
        arr.map((item) => {
            let el: FilterValueItem;
            if (type == 'color') {
                el = new FilterValueItem(
                    [`${type}__item`],
                    () => this.filterValue(type, item),
                    () => this.color(type, item)
                );
                el.setAttribute('style', `background: ${item};`);
                this.arrayButton.push(el);
                if (localStorage[`filter${type}`] == item) {
                    this.color(type, item);
                }
            } else {
                el = new FilterValueItem(
                    [`${type}__item`],
                    () => this.filterValue(type, item),
                    () => this.color(type, item),
                    item
                );
                this.arrayButton.push(el);
                if (localStorage[`filter${type}`] == item) {
                    this.color(type, item);
                }
            }
            this.insertChild(el);
            if (localStorage.reset == 'true') {
                this.arrayButton.map((item) => {
                    if (type == 'color') {
                        item.removeClass('click-color');
                    } else {
                        item.removeAttribute('style');
                    }
                });
            }
        });
    }
    color(type: string, content: string) {
        this.arrayButton.map((item) => {
            if (type == 'color') {
                item.removeClass('click-color');
                if (item.getAttribute('style') != null) {
                    if (item.getAttribute('style')?.includes(`background: ${content}`)) {
                        item.addClass('click-color');
                    }
                }
            } else {
                item.removeAttribute('style');
                if (item.getContent() == content) {
                    item.setAttribute('style', 'color: black');
                }
            }
        });
    }
}
