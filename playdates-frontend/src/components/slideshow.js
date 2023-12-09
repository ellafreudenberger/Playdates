//https://www.npmjs.com/package/react-alice-carousel
import React from 'react';
import '../index.css';
import image1 from '../carousel-images/Dog1.jpg';
import image2 from '../carousel-images/Dog2.jpg';
import image3 from '../carousel-images/Dog3.jpeg';
import image4 from '../carousel-images/Dog4.jpg';
import image5 from '../carousel-images/Dog5.jpeg';
import image6 from '../carousel-images/Dog6.jpeg';
import image7 from '../carousel-images/Dog7.jpeg';
import image8 from '../carousel-images/Dog8.jpeg';
import image9 from '../carousel-images/Dog9.jpeg';
import image10 from '../carousel-images/Dog10.jpeg';
import image11 from '../carousel-images/Dog11.jpeg';
import image12 from '../carousel-images/Dog12.jpg';
import image13 from '../carousel-images/Dog13.jpeg';
import image14 from '../carousel-images/Dog14.jpeg';
import image15 from '../carousel-images/Dog15.jpeg';
import image16 from '../carousel-images/Dog16.jpeg';
import image17 from '../carousel-images/Dog17.jpeg';
import image18 from '../carousel-images/Dog18.jpeg';
import image20 from '../carousel-images/Dog20.jpeg';
import image21 from '../carousel-images/Dog21.jpeg';
import image22 from '../carousel-images/Dog22.jpeg';
import image23 from '../carousel-images/Dog23.jpeg';
import image24 from '../carousel-images/Dog24.jpg';
import image26 from '../carousel-images/Dog26.jpeg';
import image27 from '../carousel-images/Dog27.jpeg';
import image28 from '../carousel-images/Dog28.jpeg';
import image29 from '../carousel-images/Dog29.jpeg';
import image30 from '../carousel-images/Dog30.jpeg';
import image31 from '../carousel-images/Dog31.jpeg';
import image32 from '../carousel-images/Dog32.jpeg';
import image33 from '../carousel-images/Dog33.jpeg';
import image34 from '../carousel-images/Dog34.jpeg';
import image35 from '../carousel-images/Dog35.jpg';
import image36 from '../carousel-images/Dog36.jpeg';


import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const Slideshow = () => {
    const items = [
        <img src={image1} alt="1" className="slideshow-image"/>,
        <img src={image2} alt="2" className="slideshow-image"/>,
        <img src={image3} alt="3" className="slideshow-image"/>,
        <img src={image4} alt="4" className="slideshow-image"/>,
        <img src={image5} alt="5" className="slideshow-image"/>,
        <img src={image6} alt="1" className="slideshow-image"/>,
        <img src={image7} alt="2" className="slideshow-image"/>,
        <img src={image8} alt="3" className="slideshow-image"/>,
        <img src={image9} alt="4" className="slideshow-image"/>,
        <img src={image10} alt="5" className="slideshow-image"/>,
        <img src={image11} alt="1" className="slideshow-image"/>,
        <img src={image12} alt="2" className="slideshow-image"/>,
        <img src={image13} alt="3" className="slideshow-image"/>,
        <img src={image14} alt="4" className="slideshow-image"/>,
        <img src={image15} alt="5" className="slideshow-image"/>,
        <img src={image16} alt="1" className="slideshow-image"/>,
        <img src={image17} alt="2" className="slideshow-image"/>,
        <img src={image18} alt="3" className="slideshow-image"/>,
        <img src={image20} alt="5" className="slideshow-image"/>,
        <img src={image21} alt="1" className="slideshow-image"/>,
        <img src={image22} alt="2" className="slideshow-image"/>,
        <img src={image23} alt="3" className="slideshow-image"/>,
        <img src={image24} alt="4" className="slideshow-image"/>,
        <img src={image26} alt="1" className="slideshow-image"/>,
        <img src={image27} alt="2" className="slideshow-image"/>,
        <img src={image28} alt="3" className="slideshow-image"/>,
        <img src={image29} alt="4" className="slideshow-image"/>,
        <img src={image30} alt="5" className="slideshow-image"/>,
        <img src={image31} alt="1" className="slideshow-image"/>,
        <img src={image32} alt="2" className="slideshow-image"/>,
        <img src={image33} alt="3" className="slideshow-image"/>,
        <img src={image34} alt="4" className="slideshow-image"/>,
        <img src={image35} alt="5" className="slideshow-image"/>,
        <img src={image36} alt="1" className="slideshow-image"/>,
    ]


    return (
        <AliceCarousel
          autoPlay
          autoPlayInterval={2000}
          mouseTracking
          items={items}
          responsive={{ 0: { items: 4 } }}
        />
      );
};

export default Slideshow;
