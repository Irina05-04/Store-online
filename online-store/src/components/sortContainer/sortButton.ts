import BaseComponent from '../base/baseComponent';
export let nameSortB: boolean;

export class SortButton extends BaseComponent {
    constructor(
        name: string[],
        content: string,
        private sortProductsAsc: () => void,
        private sortProductsDes: () => void,
        private color: () => void
    ) {
        super({
            classNames: name,
            textContent: content,
        });
        this.addListener('click', () => {
            if (typeof this.getContent() == 'string') {
                if (this.getContent()?.includes('↑')) {
                    this.setContent(
                        (<string>this.getContent()?.slice(0, <number>this.getContent()?.length - 1)).concat('↓')
                    );
                    this.sortProductsDes();
                } else if (this.getContent()?.includes('↓')) {
                    this.setContent(
                        (<string>this.getContent()?.slice(0, <number>this.getContent()?.length - 1)).concat('↑')
                    );
                    this.sortProductsAsc();
                } else {
                    this.setContent(<string>this.getContent()?.concat('↑'));
                    this.sortProductsAsc();
                }
            }
            this.setAttribute('style', 'color: black');
            color();
        });
    }
}
