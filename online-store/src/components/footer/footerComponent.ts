import './footer.scss';
import BaseComponent from '../base/baseComponent';

export class FooterComponent extends BaseComponent {
    constructor() {
        super({
            tagName: 'footer',
            classNames: ['footer'],
            parentNode: document.body,
        });
        const footerWrapper: BaseComponent = new BaseComponent({
            tagName: 'div',
            classNames: ['footer__wrapper'],
        });
        this.insertChild(footerWrapper);
        const gitLink = new BaseComponent({
            tagName: 'a',
            classNames: ['footer__gitLink'],
            textContent: 'link gitHub',
        });
        gitLink.setAttribute('href', 'https://github.com/Irina05-04?tab=repositories');
        footerWrapper.insertChild(gitLink);
        const year = new BaseComponent({
            tagName: 'p',
            classNames: ['footer__year'],
            textContent: '2022',
        });
        footerWrapper.insertChild(year);
        const schoolLogo = new BaseComponent({
            tagName: 'a',
            classNames: ['footer__schoolLogo'],
        });
        schoolLogo.setAttribute('href', 'https://rs.school/js/');
        footerWrapper.insertChild(schoolLogo);
        const schoolLogoImg = new BaseComponent({
            tagName: 'img',
            classNames: ['schoolLogo'],
        });
        schoolLogoImg.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
        schoolLogo.insertChild(schoolLogoImg);
    }
}
