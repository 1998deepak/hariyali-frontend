import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
// import "react-image-gallery/styles/css/image-gallery.css";
// program
import planting from "../../../assets/img/about/hariyali-img-4.jpg";
import Donateslid from "../../../assets/img/slider/Donateslid.jpg";
import downslide from "../../../assets/img/slider/downslide.jpg";
import csr1 from "../../../assets/img/csr1.png";
import csr2 from "../../../assets/img/csr2.png";
import csr3 from "../../../assets/img/csr3.png";
import csr4 from "../../../assets/img/csr4.png";
import csr5 from "../../../assets/img/csr5.png";
// SDG Images
import sdg13 from "../../../assets/img/SDG/sdg13.png";
import sdg15 from "../../../assets/img/SDG/sdg15.png";
import sdg8 from "../../../assets/img/SDG/sdg8.png";
import sdg14 from "../../../assets/img/SDG/sdg14.png";
import sdg17 from "../../../assets/img/SDG/sdg17.png";

import indImg1 from "../../../assets/img/ind1.avif";
import indImg2 from "../../../assets/img/ind2.avif";

import monsoonImg from "../../../assets/img/plant-that-is-growing-dirt.jpg";
import winterImg from "../../../assets/img/winter.jpg";
import associateImg from "../../../assets/img/funnel.png";
import freeshImage from "../../../assets/img/fresh-growth-green-plant-nature-beauty-generated-by-ai.jpg";
import freeshImage1 from "../../../assets/img/plant-that-is-growing-dirt.jpg"
import freeshImage2 from "../../../assets/img/hand-holding-pile-soil-with-plant-growing-out-it.jpg"
import freeshImage3 from "../../../assets/img/organic-farm-harvests-fresh-fruit-vegetables-generated-by-ai.jpg"
import freeshImage4 from "../../../assets/img/one-man-holding-freshly-planted-seedling-developing-growth-generated-by-ai.jpg";

import ind1 from "../../../assets/img/ind1.gif";
import ind2 from "../../../assets/img/ind2.gif";
import ind3 from "../../../assets/img/ind3.gif";


import limcaAward from "../../../assets/img/Limca Records 2015_page-0001.jpg";
import limcaAward1 from "../../../assets/img/Limca Records 2020_pages-to-jpg-0001.jpg";

function WaystoAssociate() {

    const [activeTab, setActiveTab] = useState('individual');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(tab);
        if(tab == 'corporate'){
            document.getElementById("associate").style.display="block";
            document.getElementById("plantTree").style.display="none";
        }else{
            document.getElementById("associate").style.display="none";
            document.getElementById("plantTree").style.display="block";
        }
    };
    const items = [
    [
      { quote: "Diwali",img: "limcaAward"},
      { quote: "Christmas",img: "limcaAward"},
      { quote: "Birthday",img: "limcaAward"},
      { quote: "New Year",img: "limcaAward"},
      { quote: "EID",img: "limcaAward"},
    ],
    [   
        { quote: "Wedding / Work anniversary",img: "limcaAward"},
        { quote: "Baby Shower",img: "limcaAward"},
        { quote: "Achievement",img: "limcaAward"},
        { quote: "Condolence",img: "limcaAward"},
    ],
    // Add more item groups as needed
  ];
    
    return (
        <>
            <section className="banner banner-associate">
                <div className="title">
                    {/* <h1>Ways to Associate</h1> */}
                </div>
            </section>
            
            {/* body */}
            <div className="">
                <div className="container">
                    {/* <div className="pv-75">
                        <h2 className="sub-title text-center mb-0">Way to associate</h2>
                    </div> */}
                    <div className="pv-75">
                    <div className="feature-description">
                        <h2 className="sub-title text-center mb-0">How To Associate</h2></div>
                        <p className="text-center">There are two seasons for a plantation </p>
                        <div className="row justify-content-center mt-5">
                            <div className="col col-md-3">
                                <div className="card plantation-card">
                                    <img src={monsoonImg} className="card-img-top" alt="..." />
                                    {/* <i className="icon-monsoon"></i> */}
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Monsoon <span>(Jun - Sep)</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-3">
                                <div className="card plantation-card">
                                    <img src={winterImg} className="card-img-top" alt="..." />
                                    {/* <i className="icon-monsoon"></i> */}
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Winter <span>(Nov - Jan)</span></h5>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <br/>
                        <div>
                                <p className="text-center"> You can chose to plant in any of the above season or both at ₹ 450/- per plant.</p>
                                <p className="text-center">The sapling takes 3 years of nurturing and monitoring to be self – dependent. We provide support to the plant for these 3 years and in case if the plant doesn’t survive, we replace it with a new sapling.
                                </p>
                                <br/>
                                <i className="text-center">* Each donation supports mainatainace of plant and hand-holding of the farmers for additonal two years .</i>
                            </div>
                    </div>
                </div>
                <div className="container pv-75">
                    <h3 className="text-center my-5 sub-title">On successful donation, every donor<br /> will receive a donation receipt and plantation report</h3>
                    <ul className="row donor-benefits">
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span className="bg-receipt"></span>
                            Donor receipts <br /><small>(Tax exemption under 80G)</small></li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span className="bg-certificate"></span>Certificate</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span className="bg-report"></span> Plantation Report</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span className="bg-follow"></span>Follow on report for year 1</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span className="bg-follow"></span>Follow on report for year 2</li>
                    </ul>
                </div>
                <section className="">
                    <div className="container">
                        <div className="pv-75">
                            <ul className="nav nav-pills justify-content-center pb-75">
                                <a className={`nav-link ${activeTab === 'individual' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('individual')}>Individual</a>

                                <a className={`nav-link ${activeTab === 'corporate' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('corporate')}>Corporate</a>
                            </ul>

                            <div className="tab-content group-content" id="myTabContent">
                                <div className={`tab-pane fade ${activeTab === 'individual' ? 'show active' : ''}`}
                                    id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row justify-content-center donation-card-group">
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100" >
                                                <img src={indImg1} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                    <h5 className="card-title">Plant a tree</h5>
                                                    {/* <p className="card-text">Whether you're planning to run a 5K or go for a full marathon, you can set up a ‘pledge’ page and invite your family, friends and colleagues to support your efforts by contributing to Hariyali.</p> */}
                                                    {/* <a href="#" className="btn btn-primary">Donate</a> */}
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100" >
                                                <img src={indImg2} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                    <h5 className="card-title">Gift a tree</h5>
                                                    {/* <p className="card-text">Get your family, friends and colleagues together for some fun activities by throwing a high-tea party or a kitty party, lunch / dinner get-togethers, movie screenings, book readings, theatre shows, or anything else you can think of, and raise funds for Hariyali.</p> */}
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary"></a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100" >
                                                <img src={indImg2} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                    <h5 className="card-title">Commonorate an occassion</h5>
                                                    {/* <p className="card-text">Make your special celebration an occasion to contribute towards greening the planet.</p> */}
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${activeTab === 'corporate' ? 'show active' : ''}`}
                                    id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row justify-content-center donation-card-group">
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={freeshImage1} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                    <h5 className="card-title ">Campaign with employees</h5>
                                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                    
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={freeshImage2} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                <h5 className="card-title">Campaign with Customers</h5>
                                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                    
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={freeshImage3} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                <h5 className="card-title">Special Days Celebration</h5>
                                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                {/* <div className="card-footer">
                                                <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={freeshImage4} className="card-img-top" alt="..." />
                                                <div className="card-body tree-features1">
                                                    <h5 className="card-title ">Gifting</h5>
                                                    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                {/* <div className="card-footer">
                                                    <a href="#" className="btn btn-primary">Plant a Tree</a>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="bg-green pv-75">
                    <div id="plantTree" className="container" style={{display : "block"}}>
                        <div className="certificate-slider">
                        <Carousel indicators={true}>
                            {items.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex justify-content-center">
                                {item.map((subItem, subIndex) => (
                                    <>
                                    <div className="certificate-tile">                                        
                                        {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
                                        <div
                                        key={index}
                                        className="slide-content2"
                                        >
                                        <div className="certificate-wrapper">                                        
                                            <img src={subItem.img} alt=""/>
                                            <h4>{subItem.quote}</h4>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                                </div>
                            </Carousel.Item>
                            ))}
                        </Carousel>
                        </div>
                        
                        <div className="row support-content1">
                            <div className="col-12 col-md-4">
                                <div className="text-center h-101">
                                    <div className="card-img-top">
                                        <img src={ind1} className="" alt="..." />
                                    </div>
                                    <div className="card-body tree-features1">
                                        <h5 className="card-title">Runs, walks & cyclothons</h5>
                                        <p>Runs, walks & cyclothons -Whether you're planning to run a 5K or go for a full marathon, you can set up a ‘pledge’ page and invite your family, friends and colleagues to support your efforts by contributing to Hariyali.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="text-center h-101">
                                    <div className="card-img-top">
                                        <img src={ind3} className="" alt="..." />
                                    </div>
                                    <div className="card-body tree-features1">
                                        <h5 className="card-title">Organise your own fundraiser</h5>
                                        <p>Organise your own fundraiser - Get your family, friends and colleagues together for some fun activities by throwing a high-tea party or a kitty party, lunch / dinner get-togethers, movie screenings, book readings, theatre shows, or anything else you can think of, and raise funds for Hariyali.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="text-center h-101">
                                    <div className="card-img-top">
                                        <img src={ind2} className="" alt="..." />
                                    </div>                                
                                    <div className="card-body tree-features1">
                                        <h5 className="card-title">Fundraise at your personal celebrations</h5>
                                        <p>Fundraise at your personal celebrations – Make your special celebration an occasion to contribute towards greening the planet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{display : "none"}} id="associate" className="bg-green">
                    <div className="container">
                        <div className="certificate-slider">
                        <Carousel indicators={true}>
                            {items.map((item, index) => (
                            <Carousel.Item key={index}>
                                <div className="d-flex justify-content-center">
                                {item.map((subItem, subIndex) => (
                                    <>
                                    <div className="certificate-tile">                                        
                                        {/* <div key={index} className="col-12 col-md-6 mb-3"></div> */}
                                        <div
                                        key={index}
                                        className="slide-content2"
                                        >
                                        <div className="certificate-wrapper">                                        
                                            <img src={subItem.img} alt=""/>
                                            <h4>{subItem.quote}</h4>
                                        </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                                </div>
                            </Carousel.Item>
                            ))}
                        </Carousel>
                        </div>
                        <div className="pv-75" >
                            <h2 className="sub-title text-center mb30">
                                Corporate Social Responsibility
                            </h2>
                            <p className="">Become a Corporate Partner for Project Hariyali and contribute towards making our nation Carbon Neutral by 2070. Project Hariyali aligns with Schedule VII of the Companies Act 2013 (India) under (iv) ensuring environmental sustainability, ecological balance, protection of flora and fauna, animal welfare, agroforestry, conservation of natural resources and maintaining quality of soil, air and water . Our implementation expertise,
                                ability to map project milestones and outcomes, as well as a comprehensive monitoring and reporting framework makes Project Hariyali a preferred CSR partner.</p>
                            <div className="row justify-content-between py-3">
                                <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
                                    <div className="positin-relative " >
                                    <div className="discoverImg"><img src={sdg13} width="100%" /></div>
                                    {/* <div className="discoverLink text-lg-start text-center"><span>Trust Positive </span></div> */}
                                    {/* <a href="/trust-positive" className="stretched-link"></a> */}
                                    </div>
                                </div>
                                <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
                                    <div className="positin-relative" >
                                    <div className="discoverImg"><img src={sdg15} width="100%" /></div>
                                    {/* <div className="discoverLink text-lg-start text-center"><span>Planet Positive </span></div> */}
                                    {/* <a href="/sustainability" className="stretched-link"></a> */}
                                    </div>
                                </div>
                                <div className="col-lg-2 col-12 discover-block">
                                    <div className="positin-relative aos-init aos-animate" >
                                    <div className="discoverImg"><img src={sdg8} width="100%" /></div>
                                    {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals </span></div> */}
                                    {/* <a href="/our-business" className="stretched-link"></a> */}
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="col-lg-2 col-12 discover-block">
                                    <div className="positin-relative aos-init aos-animate">
                                    <div className="discoverImg"><img src={sdg14} width="100%" /></div>
                                    {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals </span></div> */}
                                    {/* <a href="/our-business" className="stretched-link"></a> */}
                                    </div>
                                </div>
                                <div className="col-lg-2 col-12 discover-block">
                                    <div className="positin-relative aos-init aos-animate">
                                    <div className="discoverImg"><img src={sdg17} width="100%" /></div>
                                    {/* <div className="discoverLink text-lg-start text-center"><span>Discover Business Verticals</span></div> */}
                                    {/* <a href="/our-business" className="stretched-link"></a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pv-75">
                            <div className="row mt-5">
                                <div className="col-12 col-md-6">
                                    <div className="feature-description">
                                        <h2 className="text-capitalize">Cause Related Marketing</h2>
                                        <p>Partner with Project Hariyali to develop cause-related marketing campaigns which highlight your organisation’s
                                            commitment towards Environment. Customised, co-branded campaigns can be conceptualised to help you build good will for your business,
                                            while ensuring environmental sustainability.</p>
                                        {/* <p>Options to associate with Project Hariyali.</p> */}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="feature-image br-0">
                                        <img src={associateImg} alt="Image " width={500} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>               
                </section>
                {/* <section className="bg-green">
                    
                </section> */}
                 
            </div>
            {/* body */}
        </>
    );
}

export default WaystoAssociate;
