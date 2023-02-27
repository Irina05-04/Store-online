import BaseComponent from '../base/baseComponent';

export class FilterValueItem extends BaseComponent {
    constructor(className: string[], private filter: () => void, private color: () => void, content?: string) {
        super({
            textContent: content,
            classNames: className,
        });
        this.addListener('click', () => {
            filter();
            color();
        });
    }
}
