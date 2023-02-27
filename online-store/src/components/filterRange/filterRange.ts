import BaseComponent from '../base/baseComponent';
import './filterRange.scss';
import { FilterRangeComponent } from './filterRangeComponent';
import * as dataJSON from '../../file.json';
import { Notebook } from '../../interface/notebookInterface';

export class FilterRange extends BaseComponent {
    private products: Notebook[] = [];
    constructor(private filterRange: (type: string, value: string[]) => void) {
        super({
            classNames: ['filterRange'],
        });
        const filterName = new BaseComponent({
            tagName: 'div',
            classNames: ['filterName'],
            textContent: 'Фильтр по диапазону',
        });
        this.insertChild(filterName);
        this.products = dataJSON.default;
        const maxPrice: number = +this.products.reduce((current, prev) =>
            +current.price > +prev.price ? current : prev
        ).price;
        const minPrice: number = +this.products.reduce((current, prev) =>
            +current.price < +prev.price ? current : prev
        ).price;
        const filterPrice = new FilterRangeComponent(
            ['filter-range__price', 'price'],
            'цена:',
            minPrice,
            maxPrice,
            localStorage['filterminprice'] ? <number>localStorage['filterminprice'] : minPrice,
            localStorage['filtermaxprice'] ? <number>localStorage['filtermaxprice'] : maxPrice,
            'slider-price',
            500,
            (value) => this.filterRange('price', value)
        );
        this.insertChild(filterPrice);
        const maxDate: number = +this.products.reduce((current, prev) => (+current.year > +prev.year ? current : prev))
            .year;
        const minDate: number = +this.products.reduce((current, prev) => (+current.year < +prev.year ? current : prev))
            .year;
        const filterDate = new FilterRangeComponent(
            ['filter-range__date', 'date'],
            'год выпуска:',
            minDate,
            maxDate,
            localStorage['filterminyear'] ? <number>localStorage['filterminyear'] : minDate,
            localStorage['filtermaxyear'] ? <number>localStorage['filtermaxyear'] : maxDate,
            'slider-date',
            1,
            (value) => this.filterRange('year', value)
        );
        this.insertChild(filterDate);
    }
}
