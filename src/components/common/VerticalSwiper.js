import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import '../VerticalCarousel.css';
import ramphal from "../../../src/assets/img/DonationImg.jpg";

export default function VerticalSwiper() {
    const settings = {
        dots: true,
        infinite: true,
        vertical: true, // Enable vertical mode
        verticalSwiping: true, // Enable vertical swiping
        slidesToShow: 1,
        
      customPaging: (i) => (
        <div className="custom-dot">
          <span>{i + 1}</span>
        </div>
      )
    };
    const slides = [
        {
          id: 1,
          imageUrl: ramphal,
          caption: 'Qualifying a Location',
        },
        {
          id: 2,
          imageUrl: ramphal,
          caption: 'Understanding Farmer Requirements',
        },
        {
          id: 3,
          imageUrl: ramphal,
          caption: 'Preparing a Plan',
        },
        {
            id: 4,
            imageUrl: ramphal,
            caption: 'Sapling Distribution',
        },
        {
            id: 5,
            imageUrl: ramphal,
            caption: 'Skilling Farmers',
        },
      ];
  return (
    
    <div className="vertical-carousel-container">
        
      <Slider {...settings}>
      {slides.map((slide) => (
          <div className="carousel-item" key={slide.id}>
            <img src={slide.imageUrl} alt={slide.caption} />
            <div className="caption">
                {slide.caption}
            </div>
          </div>
        ))}
      </Slider>
    </div>
    // <>
    //   <Swiper
    //     direction={'vertical'}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     modules={[Pagination]}
    //     className="mySwiper"
    //   >
    //     <SwiperSlide>Slide 1</SwiperSlide>
    //     <SwiperSlide>Slide 2</SwiperSlide>
    //     <SwiperSlide>Slide 3</SwiperSlide>
    //     <SwiperSlide>Slide 4</SwiperSlide>
    //     <SwiperSlide>Slide 5</SwiperSlide>
    //   </Swiper>
    // </>
  )
}
