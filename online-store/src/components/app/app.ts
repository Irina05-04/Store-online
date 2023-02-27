import { FooterComponent } from '../footer/footerComponent';
import { HeaderComponent } from '../header/headerComponent';
import { DrawProductsController } from '../../controller/DrawProductsController';
import '../../global.scss';

export class App {
    constructor(private element: HTMLElement) {}
    start() {
        const footer = new FooterComponent();
        const controller = new DrawProductsController();
        const header = new HeaderComponent();
        this.element.prepend(header.getNode());
        this.element.append(controller.getNode());
        this.element.append(footer.getNode());
    }
}
