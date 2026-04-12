import React from 'react';
import Banner from './Banner';
import ShippingHero from './ShippingHero';
import ExtraHomeSection from './ExtraHomeSection';
import FAQAccordion from './FAQ';
import ContactForm from './ContactForm';
import Blog from './Blog';

const Home = () => {
    return (
        <div>
            <Banner/>
            <ShippingHero></ShippingHero>
            <ExtraHomeSection />
            <Blog></Blog>
            <FAQAccordion></FAQAccordion>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;