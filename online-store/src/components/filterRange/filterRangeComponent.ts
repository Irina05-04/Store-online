import BaseComponent from '../base/baseComponent';
import * as noUiSlider from '../../../node_modules/nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.css';

export class FilterRangeComponent extends BaseComponent {
    constructor(
        name: string[],
        content: string,
        min: number,
        max: number,
        minS: number,
        maxS: number,
        ind: string,
        step: number,
        private filterRange: (values: string[]) => void
    ) {
        super({
            classNames: name,
        });
        const description = new BaseComponent({
            textContent: content,
        });
        this.insertChild(description);
        const slider: noUiSlider.target = document.createElement('div') as noUiSlider.target;
        slider.classList.add('slider');
        slider.setAttribute('id', `${ind}`);
        this.insertChildS(slider);
        /* eslint-disable */
        noUiSlider.create(slider, {
            start: [minS, maxS],
            connect: true,
            range: {
                'min': min,
                'max': max,
            },
            step: step,
            behaviour: 'tap-drag',
            pips: {
                mode: noUiSlider.PipsMode.Count, 
                stepped: true,
                values: 5,
            },
        });

        slider.noUiSlider?.on('change', function (values: (string | number)[]) { 
            filterRange(<string[]>(<unknown[]>values));
        });
        /* eslint-enable */
    }
}
