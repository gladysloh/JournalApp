import React from 'react';
import { IonSlides, IonSlide, IonContent } from '@ionic/react';

import './Slides.css';

import JournalTextEdit from '../Journal/JournalTextEdit';
import JournalImageEdit from '../Journal/JournalImageEdit';

// Optional parameters to pass to the swiper instance.
// See https://swiperjs.com/swiper-api for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400
};

export const SlideExample: React.FC = () => {

    return (
        <IonContent>
            <IonSlides className="ionslides" pager={true} options={slideOpts}>
            <IonSlide>
                <h1>ADD TEXT</h1>
                <JournalTextEdit />
            </IonSlide>
            <IonSlide>
                <h1>ADD IMAGE</h1>
                <JournalImageEdit />
            </IonSlide>
            </IonSlides>
        </IonContent>
    );
};

export default SlideExample;