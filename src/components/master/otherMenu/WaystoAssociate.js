import React, {useState} from "react";
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

import indImg1 from "../../../assets/img/ind1.avif";
import indImg2 from "../../../assets/img/ind2.avif";

import monsoonImg from "../../../assets/img/monsoon.jpg";
import winterImg from "../../../assets/img/winter.jpg";
import associateImg from "../../../assets/img/funnel.png";

function WaystoAssociate() {
    const [activeTab, setActiveTab] = useState('individual');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

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
                    <div className="pv-75">
                        <h2 className="sub-title text-center mb-0">Plantation season</h2>
                        <p className="text-center"> You can chose plant any of the season or both and reporting for next two years.</p>
                        <p className="text-center">The sapling takes 3 years of nurturing and monitoring to be self – dependent. We provide support to the plant for these 3 years and in case if the plant doesn’t survive, we replace it with a new sapling.
                                Each donation is eligible for tax exemption under section 80G.</p>
                        <div className="row justify-content-center mt-5">
                            <div className="col col-md-3">
                                <div class="card plantation-card">
                                    <img src={monsoonImg} class="card-img-top" alt="..."/>
                                    {/* <i className="icon-monsoon"></i> */}
                                    <div class="card-body">
                                        <h5 class="card-title text-center">Monsoon <span>(Jun - Sep)</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-md-3">
                                <div class="card plantation-card">
                                    <img src={winterImg} class="card-img-top" alt="..."/>
                                    {/* <i className="icon-monsoon"></i> */}
                                    <div class="card-body">
                                    <h5 class="card-title text-center">Winter <span>(Nov - Jan)</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h3 className="text-center my-5 sub-title">On successful donation, every donor<br/> will receive a donation receipt and plantation report</h3>
                    <ul className="row donor-benefits">
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span class="bg-receipt"></span>
                        Donor receipts <br/><small>(Tax exemption under 80G)</small></li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span class="bg-certificate"></span>Certificate</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span class="bg-report"></span> Plantation Report</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span class="bg-follow"></span>Follow on report for year 1</li>
                        <li className="col-12 col-sm-6 col-md-3 col-lg-2"><span class="bg-follow"></span>Follow on report for year 2</li>                        
                    </ul>
                </div>
                <section className="">
                    <div className="container">
                        <div className="pv-75">
                            <ul class="nav nav-pills justify-content-center mb50">                            
                                <a className={`nav-link ${activeTab === 'individual' ? 'show active' : ''}`} onClick={() => handleTabClick('individual')}>Individual</a>
                                <a className={`nav-link ${activeTab === 'corporate' ? 'show active' : ''}`} onClick={() => handleTabClick('corporate')}>Corporate</a>
                            </ul>
                            
                            <div className="tab-content group-content" id="myTabContent">
                            {activeTab === 'individual' &&
                                <div className={`tab-pane fade ${activeTab === 'individual' ? 'show active' : ''}`} id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                    <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-center donation-card-group">
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100" >
                                                <img src={indImg1} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Runs, walks & cyclothons</h5>
                                                    <p className="card-text">Whether you're planning to run a 5K or go for a full marathon, you can set up a ‘pledge’ page and invite your family, friends and colleagues to support your efforts by contributing to Hariyali.</p>
                                                    
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={indImg2} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Organise your own fundraiser -</h5>
                                                    <p className="card-text"> Get your family, friends and colleagues together for some fun activities by throwing a high-tea party or a kitty party, lunch / dinner get-togethers, movie screenings, book readings, theatre shows, or anything else you can think of, and raise funds for Hariyali.</p>
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card h-100">
                                                <img src={indImg2} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Fundraise at your personal celebrations </h5>
                                                    <p className="card-text">Make your special celebration an occasion to contribute towards greening the planet.</p>
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {activeTab === 'corporate' &&
                                <div className={`tab-pane fade ${activeTab === 'corporate' ? 'show active' : ''}`} id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                    <div className="row justify-content-center donation-card-group">
                                        <div className="col-12 col-md-3">
                                            <div className="card" >
                                                <img src={indImg1} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Campaign with Employee</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    {/* <a href="#" className="btn btn-primary">Donate</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card" >
                                                <img src={indImg2} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Campaign with Customer</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card" >
                                                <img src={indImg2} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Special Days Celebration</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <div className="card" >
                                                <img src={indImg2} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">Gift</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    {/* <a href="#" className="btn btn-primary">Gift</a> */}
                                                </div>
                                                <div class="card-footer">
                                                    <a href="#" className="btn btn-primary">Donate</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            </div> 
                                                      
                        </div>
                    </div>
                </section>
                <div className="container pv-75">
                    <h2 className="sub-title text-center mb30">
                    Corporate Social Responsibility
                    </h2>
                    <p className="">Become a Corporate Partner for Project Hariyali and contribute towards making our nation Carbon Neutral by 2070. Project Hariyali aligns with Schedule VII of the Companies Act 2013 (India) under (iv) ensuring environmental sustainability, ecological balance, protection of flora and fauna, animal welfare, agroforestry, conservation of natural resources and maintaining quality of soil, air and water . Our implementation expertise, 
                        ability to map project milestones and outcomes, as well as a comprehensive monitoring and reporting framework makes Project Hariyali a preferred CSR partner.</p>
                    <div className="row justify-content-between py-3">
                        <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
                            <div className="positin-relative " >
                                <div className="discoverImg"><img src={csr1} width="100%" /></div>                               
                            </div>
                        </div>
                        <div className="col-lg-2 col-12 mb-lg-0 mb-3 discover-block">
                            <div className="positin-relative" >
                                <div className="discoverImg"><img src={csr2} width="100%" /></div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-12 discover-block">
                            <div className="positin-relative aos-init aos-animate" >
                                <div className="discoverImg"><img src={csr3} width="100%" /></div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="col-lg-2 col-12 discover-block">
                            <div className="positin-relative aos-init aos-animate">
                                <div className="discoverImg"><img src={csr4} width="100%" /></div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-12 discover-block">
                            <div className="positin-relative aos-init aos-animate">
                                <div className="discoverImg"><img src={csr5} width="100%" /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="bg-green">
                <div className="container pv-75">
                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <div className="feature-description">
                                <h2 className="text-capitalize">Cause Related Marketing</h2>
                                <p>Partner with Project Hariyali to develop cause-related marketing campaigns which highlight your organisation’s 
                                commitment towards Environment. Customised, co-branded campaigns can be conceptualised to help you build good will for your business, 
                                while ensuring environmental sustainability.</p>
                                <p>Options to associate with Project Hariyali.</p>
                            </div>                        
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="feature-image br-0">
                                <img src={associateImg} alt="Image " width={500}/>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="row no-gutters">
                        <div className="col-12 col-md-3">
                            <div className="card">
                                <span class="">Campaign with employees</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card">
                                <span class="">Campaign with Customers</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card">
                                <span class="">Special Days Celebration</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <div className="card">
                                <span class="">Gifting</span>
                            </div>
                        </div>                        
                    </div> */}
                </div>
                </section>
                {/* <img src={planting} alt="planting" className="imgwidth100" /> */}
                {/* <div className="section bggray">
                    <Container className="pt30">
                        <div>
                            
                            <p>
                                The plantations are done during the <span className="colorgreen">Monsoon (June - Sept)</span> and <span className="colorgreen">Winter (Nov - Jan) season</span>.
                                <br />
                                On successful donation, every donor will receive a donation receipt and plantation report
                                <br />The sapling takes 3 years of nurturing and monitoring to be self – dependent. We provide support to the plant for these 3 years and in case if the plant doesn’t survive, we replace it with a new sapling.
                                Each donation is eligible for tax exemption under section 80G.
                                <br />
                                Under any circumstance is the plant does not survive, a new plant is then replaced
                            </p>
                        </div>
                        <div>
                           
                            <p>
                                As an individual you can<span className="colorgreen"> Donate</span> or <span className="colorgreen">Gift a Plant</span> or <span className="colorgreen">Commemorate an occasion</span>.
                                <br />
                                As a corporate, you can donate as well as run campaigns for your <span className="colorgreen">customer | employees | business partner | vendor</span>.
                                <br />
                                for CSR donations, please read out to us at
                                <br />
                                Contact mentioned in the same <span className="colorgreen">mail:- GANGAR.SUNNY@mahindra.com</span> and <span className="colorgreen">his Contact No:- +91 93224 56789</span>
                            </p>
                        </div>
                    </Container>
                </div> */}
            </div>
            {/* body */}
        </>
    );
}

export default WaystoAssociate;
