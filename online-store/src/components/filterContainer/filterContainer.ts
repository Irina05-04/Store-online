import BaseComponent from '../base/baseComponent';
import { FilterRange } from '../filterRange/filterRange';
import { FiltersValue } from '../filtersValue/filtersValue';
import './filterContainer.scss';

export class FilterContainer extends BaseComponent {
    constructor(
        private filterValue: (type: string, value: string) => void,
        private filterRangefun: (type: string, value: string[]) => void
    ) {
        super({
            classNames: ['filter-wrapper'],
        });
        const filter = new FiltersValue((type, value) => this.filterValue(type, value));
        const filterRange = new FilterRange((type, value) => this.filterRangefun(type, value));
        this.insertChild(filter);
        this.insertChild(filterRange);
    }
}
