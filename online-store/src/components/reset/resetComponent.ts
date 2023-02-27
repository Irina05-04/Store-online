import BaseComponent from '../base/baseComponent';
import './reset.scss';

export class Reset extends BaseComponent {
    constructor(private resetFilter: () => void) {
        super({
            classNames: ['reset-button'],
            textContent: 'сброс фильтров',
        });
        this.addListener('click', () => {
            resetFilter();
        });
    }
}
