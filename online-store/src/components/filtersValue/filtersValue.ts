import { ProductService } from '../../services/productService';
import BaseComponent from '../base/baseComponent';
import { FilterValueComponent } from '../filterValueComponent/filterValueComponent';
import './filtersValue.scss';

const productService = new ProductService();

export class FiltersValue extends BaseComponent {
    constructor(private filterValue: (type: string, value: string) => void) {
        super({
            classNames: ['filter'],
        });
        const filterName = new BaseComponent({
            tagName: 'div',
            classNames: ['filterName'],
            textContent: 'Фильтр по значению',
        });
        this.insertChild(filterName);
        productService.loadProducts();

        const filterBrend = new FilterValueComponent('brend', productService.getArrayFilter('brend'), (type, value) =>
            this.filterValue(type, value)
        );
        this.insertChild(filterBrend);

        const filterColor = new FilterValueComponent('color', productService.getArrayFilter('color'), (type, value) =>
            this.filterValue(type, value)
        );
        this.insertChild(filterColor);

        const filterSize = new FilterValueComponent('screen', productService.getArrayFilter('screen'), (type, value) =>
            this.filterValue(type, value)
        );
        this.insertChild(filterSize);

        const filterOS = new FilterValueComponent('system', productService.getArrayFilter('system'), (type, value) =>
            this.filterValue(type, value)
        );
        this.insertChild(filterOS);
    }
}
