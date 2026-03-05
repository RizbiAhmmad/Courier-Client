import React from 'react';
import Banner from './Banner';
import ShippingHero from './ShippingHero';
import FAQAccordion from './FAQ';
import ContactForm from './ContactForm';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ShippingHero></ShippingHero>
            <FAQAccordion></FAQAccordion>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;