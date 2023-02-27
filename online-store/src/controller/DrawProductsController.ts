import BaseComponent from '../components/base/baseComponent';
import { CartComponent } from '../components/cart/cartComponent';
import { FilterContainer } from '../components/filterContainer/filterContainer';
import { ProductsContainer } from '../components/productsContainer/productsContainer';
import { Reset } from '../components/reset/resetComponent';
import { SeachComponent } from '../components/search/seachComponent';
import { SortComponent } from '../components/sortContainer/sortComponent';
import { Notebook } from '../interface/notebookInterface';
import { CartService } from '../services/cartService';
import { ProductService } from '../services/productService';
import './draw.scss';

const productService = new ProductService();

export class DrawProductsController extends BaseComponent {
    private readonly cartService: CartService;
    cart: CartComponent;
    private productsContainer: ProductsContainer;
    private filter: FilterContainer;
    private filterContainer: BaseComponent;
    private products: Notebook[];
    constructor() {
        super({
            classNames: ['wrapper-container'],
        });
        this.cart = new CartComponent();
        this.cartService = new CartService();
        productService.loadProducts();
        this.products = productService.getProducts();
        this.filterContainer = new BaseComponent();
        this.insertChild(this.filterContainer);
        this.filter = new FilterContainer(
            (type, value) => this.filterValue(type, value),
            (type, value) => this.filterRangefun(type, value)
        );
        this.filterContainer.insertChild(this.filter);
        const reset = new Reset(() => this.resetFilter());
        this.insertChild(reset);
        const search = new SeachComponent((value) => this.searchProduct(value));
        this.insertChild(search);
        const sort = new SortComponent(
            () => this.sortProductsNameAsc(),
            () => this.sortProductsNameDes(),
            () => this.sortProductsDateAsc(),
            () => this.sortProductsDateDes()
        );
        this.insertChild(sort);
        this.products.map((item) => {
            const keys = Object.keys(localStorage);
            for (const key of keys) {
                if (key == <string>(<unknown>item.id)) {
                    if (localStorage.getItem(key) == 'true') {
                        this.cartService.addToCart(item);
                    }
                }
            }
        });
        this.cart.setAmount(this.cartService.getCount());
        this.filterFunction();
        this.sortFunction();
        this.productsContainer = new ProductsContainer(
            (product) => {
                this.cartService.addToCart(product);
                this.cart.setAmount(this.cartService.getCount());
                localStorage.setItem('count', this.cartService.getCount());
            },
            (id) => {
                this.cartService.removeFromCart(id);
                this.cart.setAmount(this.cartService.getCount());
                localStorage.setItem('count', this.cartService.getCount());
            },
            productService.getProducts()
        );
        this.insertChild(this.productsContainer);
    }
    sortProductsNameAsc() {
        this.createContainer(productService.getProducts().sort((a, b) => (a.name > b.name ? 1 : -1)));
        localStorage['sort'] = 'nameAsc';
    }
    sortProductsNameDes() {
        this.createContainer(productService.getProducts().sort((a, b) => (a.name < b.name ? 1 : -1)));
        localStorage['sort'] = 'nameDes';
    }
    sortProductsDateAsc() {
        this.createContainer(productService.getProducts().sort((a, b) => (a.year > b.year ? 1 : -1)));
        localStorage['sort'] = 'dateAsc';
    }
    sortProductsDateDes() {
        this.createContainer(productService.getProducts().sort((a, b) => (a.year < b.year ? 1 : -1)));
        localStorage['sort'] = 'dateDes';
    }
    searchProduct(value: string) {
        productService.setProducts(this.products);
        this.filterFunction();
        const buff = productService
            .getProducts()
            .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        productService.setProducts(buff);
        this.createContainer(buff);
        if (productService.getProducts().length == 0) {
            alert('Совпадений не найдено');
        }
    }
    filterValue(type: string, value: string) {
        productService.setProducts(this.products);
        if (localStorage[`filter${type}`]) {
            this.filterStorage(type, value);
        } else {
            localStorage.setItem(`filter${type}`, value);
            this.filterStorage(type, value);
        }
    }
    filterRangefun(type: string, value: string[]) {
        productService.setProducts(this.products);
        localStorage[`filtermin${type}`] = value[0].slice(0, value[0].length - 3);
        localStorage[`filtermax${type}`] = value[1].slice(0, value[1].length - 3);
        this.filterFunction();
        this.createContainer(productService.getProducts());
        if (productService.getProducts().length == 0) {
            alert('Совпадений не найдено');
        }
    }
    createContainer(products: Notebook[]) {
        this.productsContainer.remove();
        this.productsContainer = new ProductsContainer(
            (product) => {
                this.cartService.addToCart(product);
                this.cart.setAmount(this.cartService.getCount());
                localStorage.setItem('count', this.cartService.getCount());
            },
            (id) => {
                this.cartService.removeFromCart(id);
                this.cart.setAmount(this.cartService.getCount());
                localStorage.setItem('count', this.cartService.getCount());
            },
            products
        );
        this.insertChild(this.productsContainer);
    }
    filterStorage(type: string, value: string) {
        this.sortFunction();
        localStorage[`filter${type}`] = value;
        this.filterFunction();
        this.createContainer(productService.getProducts());
        if (productService.getProducts().length == 0) {
            alert('Совпадений не найдено');
        }
    }
    sortFunction() {
        for (const key in localStorage) {
            if (key.includes('sort')) {
                if (localStorage['sort'] == 'nameAsc') {
                    productService.setProducts(productService.getProducts().sort((a, b) => (a.name > b.name ? 1 : -1)));
                } else if (localStorage['sort'] == 'nameDes') {
                    productService.setProducts(productService.getProducts().sort((a, b) => (a.name < b.name ? 1 : -1)));
                } else if (localStorage['sort'] == 'dateAsc') {
                    productService.setProducts(productService.getProducts().sort((a, b) => (a.year > b.year ? 1 : -1)));
                } else if (localStorage['sort'] == 'dateDes') {
                    productService.setProducts(productService.getProducts().sort((a, b) => (a.year < b.year ? 1 : -1)));
                }
            }
        }
    }
    filterFunction() {
        for (const key in localStorage) {
            if (key.includes('filter')) {
                if (key.includes('min')) {
                    const newProducts = productService
                        .getProducts()
                        .filter(
                            (item) =>
                                +Object.getOwnPropertyDescriptor(item, key.replace('filtermin', ''))?.value >=
                                localStorage[key]
                        );
                    productService.setProducts(newProducts);
                } else if (key.includes('max')) {
                    const newProducts = productService
                        .getProducts()
                        .filter(
                            (item) =>
                                +Object.getOwnPropertyDescriptor(item, key.replace('filtermax', ''))?.value <=
                                localStorage[key]
                        );
                    productService.setProducts(newProducts);
                } else {
                    const newProducts = productService
                        .getProducts()
                        .filter(
                            (item) =>
                                Object.getOwnPropertyDescriptor(item, key.replace('filter', ''))?.value ==
                                localStorage[key]
                        );
                    productService.setProducts(newProducts);
                }
            }
        }
    }
    resetFilter() {
        localStorage.reset = 'true';
        this.filter.remove();
        for (const key in localStorage) {
            if (key.includes('filter')) {
                localStorage.removeItem(key);
            }
        }
        this.filter = new FilterContainer(
            (type, value) => this.filterValue(type, value),
            (type, value) => this.filterRangefun(type, value)
        );
        this.filterContainer.insertChild(this.filter);
        productService.setProducts(this.products);
        this.sortFunction();
        this.createContainer(productService.getProducts());
        localStorage.reset = 'false';
    }
}
