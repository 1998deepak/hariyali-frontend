import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
// import "react-image-gallery/styles/css/image-gallery.css";
import { Zoom } from "react-slideshow-image";

// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";

import image1 from "../../../assets/img/slider/banner1.png";
import image2 from "../../../assets/img/slider/banner2.png";
import image3 from "../../../assets/img/slider/banner3.png";

import testimonialImg from "../../../assets/img/testimonial.png";

// const slides = [
//   {
//     title: 'When you cut a tree you take a life and when you plant a tree you plant a HOPE',
//     description: 'PLANT A TREE',
//   },
//   {
//     title: 'Take your first step towards a green future',
//     description: 'Araku Valley, Vishakhapatnam, Andhra Pradesh',
//   },
// ];

// const zoomOutProperties = {
//   duration: 5000,
//   infinite: true,
//   indicators: false,
//   arrows: true,
// };


// const Slideshow = () => {
//   return (
//     <div className="slide-container">

//       <Zoom {...zoomOutProperties}>
//         {slides.map((each, index) => (
//           <>          
//             <div className="award-wrapper">
//               <h4>{each.title}</h4>
//             </div>           
//           </>
//         ))}
//       </Zoom>

//     </div>
//   );
// };



function WhySupportUs() {

  const awards = [
    {
      quote:
        'FICCI CSR Awards – In Skill Development & Livelihood Category'
    },
    {
      quote:
        'The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category'
    },
    {
      quote:
        'Food Vision 2050 Prize by Rockefeller Foundation to Naandi Foundation'
    },
    {
      quote:
        'Limca book of Awards.'
    }
  ]

  const testimonials = [
    {
      image: testimonialImg,
      name: 'Maria Kate',
      quote:
        'Our farm yields 894 kgs of crimson red cherries which we have given to the co-operative thereby earning 6 times of what we earned two years ago.”- Koppula Srinivas and Karramma from Gondhi Rapa village (Hukumpeta mandal), Araku. The family has been a part of Hariyali since 201', 
    },
    {
      image: image3,
      name: 'Maria Kate',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
    },
    {
      image: image1,
      name: 'Maria Kate',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
    },
    {
      image: image2,
      name: 'Maria Kate',
      quote:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus et deleniti nesciunt sint eligendi reprehenderit reiciendis, quibusdam illo, beatae quia fugit consequatur laudantium velit magnam error. Consectetur distinctio fugit doloremque.',
    },
    // Add other testimonials
  ];

  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };
  return (
    <>
      {/* body */}
      <section className="banner banner-support">
        <div className="title">{/* <h1>Why Support Us</h1> */}</div>
      </section>
      <div className="container pv-75">
        <div className="row mb30 impact-wrapper">
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-tree"></i> */}
              <h4>Number of trees planted since 2007</h4>
              <p>20.89 Millions</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-survival"></i> */}
              <h4>Overall survival rate of plant since inspection</h4>
              <p>85% Plus</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-carbon"></i> */}
              <h4>Trees sequestered through the project Since inspection </h4>
              <p> approx.</p>
            </div>
          </div>
          <div className="col-12 col-md-4 text-center">
            <div className="tree-features">
              {/* <i className="icon-carbon"></i> */}
              <h4>
                Project has witnessed significant positive change in bio
                diversity
              </h4>
              {/* <p> approx.</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <p>
          Project Hariyali is a unique blend in the sphere of
          environmental sustainability and impacting livelihood.
          <br />
          The Project on large scale{" "}
          <span className="colorgreen">
            tree planting, natural resource management, Global
            regenerative organic farming
          </span>{" "}
          protocols to enrich agricultural eco-system and build
          functional forests as means to increase communities' income
          for an overall wellbeing of the community and mother earth
          <br />
          <br />
          We are available at
          <span className="colorgreen"> 1t.org</span>
        </p>
      </div>
      <div className="container pv-75">
        <h3 className="text-center sub-title">Awards Won</h3>
        <div className="awards-slider">
          <Zoom scope={0.4}>
            {awards.map((contant, index) => (
              <div className="row justify-content-center my-5 overflow-x">
                <div className="col-12 col-md-6 mb-3"></div>
                <div key={index} className="slide-content">
                  <div className="award-wrapper">
                    <h4>{contant.quote}</h4>
                  </div>
                </div>
              </div>
            ))}
          </Zoom>
        </div>
        
        {/* <div className="row justify-content-center my-5 overflow-x">
          <div className="col-12 col-md-6 mb-3">
                <div className="award-wrapper">
                  <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
                </div>   
            </div>
            <div className="col-12 col-md-6 mb-3">
                <div className="award-wrapper">
                  <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
                </div>   
            </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>FICCI CSR Awards – In Skill Development & Livelihood Category</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>The CSR Conclave and Awards by IFCCI in the Environment and Sustainability Category</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>Food Vision 2050 Prize by Rockefeller Foundation to Naandi Foundation</h4>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="award-wrapper">
              <h4>Limca book of Awards.</h4>
            </div>
          </div>
        </div> */}
      </div>
      <div className="container">
        <h3 className="text-center sub-title">Testimonials</h3>
        <div className="row">
          <div className="col-12 col-md-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/h5JfhFJG3vQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-12 col-md-6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YnhmRcQ4q6M"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        {/* <Slideshow /> */}
        <div className="testimonial-slider">
          <Zoom {...zoomOutProperties} >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="slide-content support-content my-5">
                <img src={testimonial.image} alt="avatar" className="mb-5" />
                <h3 className="mb-3">{testimonial.name}</h3>
                <p className="text-muted">
                  <i className="fas fa-quote-left pe-2"></i>
                  {testimonial.quote}
                </p>
              </div>
            ))}
          </Zoom>
        </div>

      </div>
      {/* body */}
    </>
  );
}

export default WhySupportUs;



