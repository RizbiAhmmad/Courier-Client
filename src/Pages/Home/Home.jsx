import React from 'react';
import Banner from './Banner';
import ShippingHero from './ShippingHero';
import FAQAccordion from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ShippingHero></ShippingHero>
            <FAQAccordion></FAQAccordion>
        </div>
    );
};

export default Home;