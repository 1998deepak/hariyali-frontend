import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "../../../assets/css/abouthover-effect.css";
// import "react-image-gallery/styles/css/image-gallery.css";
import goalimg from "../../../assets/img/goal.jpg";
import projectimg from "../../../assets/img/associate.jpg";
import mahindralogo from "../../../assets/img/mahindra-logo.png";
import naandilogo from "../../../assets/img/naandilogo.jpg";
import arakuImg from "../../../assets/img/slider/araku.jpg";
import tarnImg from "../../../assets/img/slider/tarn.jpg";
import wardhaImg from "../../../assets/img/slider/wardha.png";
import AnandMahindraimg from "../../../assets/img/trustee/AnandMahindra.jpg";
import BharatDoshiimg from "../../../assets/img/trustee/BharatDoshi.jpg";
import UlhasYargopimg from "../../../assets/img/trustee/UlhasYargop.jpg";
import DumyUserimg from "../../../assets/img/trustee/DumyUser.jpg";
import SheetalMehtaimg from "../../../assets/img/trustee/SheetalMehta.jpg";
import AnandMahindrapng from "../../../assets/img/trustee/AnandMahindra.png";
import BharatDoshipng from "../../../assets/img/trustee/BharatDoshi.png";
import UlhasYargoppng from "../../../assets/img/trustee/UlhasYargop.png";
import ProchieMukherjipng from "../../../assets/img/trustee/DumyUser.png";
import MarioNazarathpng from "../../../assets/img/trustee/DumyUser.png";
import SheetalMehtapng from "../../../assets/img/trustee/SheetalMehta.png";
import AnjiReddyimg from "../../../assets/img/trustee/DumyUser.png";
import Gopalakrishnanimg from "../../../assets/img/trustee/DumyUser.png";
import SatishReddyimg from "../../../assets/img/trustee/DumyUser.png";
import RajendraPrasadimg from "../../../assets/img/trustee/DumyUser.png";
import ManojKumarimg from "../../../assets/img/trustee/DumyUser.png";
import { BsArrowRight } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
function AboutUs() {
  const [anandMahindrashow, setAnandMahindraShow] = useState(false);
  const AnandMahindraClose = () => setAnandMahindraShow(false);
  const AnandMahindra = () => setAnandMahindraShow(true);

  const [bharatDoshishow, setBharatDoshiShow] = useState(false);
  const BharatDoshiClose = () => setBharatDoshiShow(false);
  const BharatDoshi = () => setBharatDoshiShow(true);

  const [ulhasYargopshow, setUlhasYargopShow] = useState(false);
  const UlhasYargopClose = () => setUlhasYargopShow(false);
  const UlhasYargop = () => setUlhasYargopShow(true);

  const [prochieMukherjishow, setProchieMukherjiShow] = useState(false);
  const ProchieMukherjiClose = () => setProchieMukherjiShow(false);
  const ProchieMukherji = () => setProchieMukherjiShow(true);

  const [marioNazarathshow, setMarioNazarathShow] = useState(false);
  const MarioNazarathClose = () => setMarioNazarathShow(false);
  const MarioNazarath = () => setMarioNazarathShow(true);

  const [sheetalMehtashow, setSheetalMehtaShow] = useState(false);
  const SheetalMehtaClose = () => setSheetalMehtaShow(false);
  const SheetalMehta = () => setSheetalMehtaShow(true);
  return (
    <>
      {/* body */}
      <section className="banner banner-about">
        <div className="title">
        </div>
      </section>
      <div className="">
        <div className="section bggray">
          <div className="container">
            <div className="pv-75">
              <div className="feature-description">
                <h2 className="sub-title  text-center">Who Are We</h2>
                <p className="text-center">Project Hariyali is a joint initiative by Mahindra Foundation and Naandi Foundation. One million trees have been planted each year since 2007 across India. The project is part of nature-based solution that focuses on natural resource management and global organic farming protocols to improve the eco-system. Going forward, the project aims to plant 5 million trees per annum. Hariyali project is part of nuture base solution. To <a href="#knowYourPatners">know more</a> about foundation </p>
              </div>
            </div>
            <div className="row align-items-center pv-75">
              <div className="col-12">
                <div className="feature-description">
                  <h2 className="sub-title  text-center">Details about initiative</h2>
                  <p className="text-center">The project was launched on 2nd October 2007, as an afforestation initiative, with a target to plant a million trees every year.
                    Project Hariyali aims to increase the green cover, arrest the rising ecological imbalance to create environmentally conscious and aware citizenry.</p>
                  <p>We are currently active in three regions for large scale plantation:</p>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="card h-100">
                        <img src={arakuImg} className="img-fluid rounded-start" alt="..." />
                        <div className="card-body text-center">
                          <h5 className="card-title">Southern India</h5>
                          <p className="card-text">The project started in <b className="colorgreen">Araku Valley</b>, <b className="colorgreen">Visakhapatnam</b>, <b className="colorgreen">Andhra Pradesh</b> started in 2010</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="card h-100">
                        <img src={tarnImg} className="img-fluid rounded-start" alt="..." />
                        <div className="card-body text-center">
                          <h5 className="card-title">Northern India</h5>
                          <p className="card-text">The project <b className="colorgreen">Shravasti in Uttar Pradesh</b>,
                            <b className="colorgreen">Tarn Taran & Moga in Punjab</b> and <b className="colorgreen">Solan in Himachal Pradesh</b> started in 2021</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                      <div className="card h-100">
                        <img src={wardhaImg} className="img-fluid rounded-start" alt="..." />
                        <div className="card-body text-center">
                          <h5 className="card-title">Western India</h5>
                          <p className="card-text">The project is being currently replicated in <b className="colorgreen">Wardha, Maharashtra</b> started in 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="bg-tree">
            <div className="container">
              <div className="row align-items-center pv-75">
                <div className="col-12 col-md-6 col-lg-5">
                  <div className="feature-image">
                    <img src={goalimg} alt="" />
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-7">
                  <div className="feature-description">
                    <h2 className="text-capitalize">Goal</h2>
                    <p className=""><quote><b className="colorgreen">Planting 5 million trees</b> per annum through partnerships with like-minded organizations and people and in the process support livelihood of marginalized farmer communities.</quote></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="knowYourPatners" className="bg-venture">
            <div className="container">
              <div className="row pv-75">
                <div className="col-12">
                  <div className="feature-description">
                    <h2 className="sub-title  text-center">Know your Partners</h2>
                    <div className="text-center"><img src={mahindralogo} alt="mahindralogo" /></div>
                    <p className="text-center">
                      <b>Mahindra Foundation</b> is a public charitable trust incorporated in 1969 and registered under Maharashtra Public Trust Act.

                      Mahindra Foundation operates with a vision to carry out public charitable objects and purposes wide enough for the extension of the benefit thereof to all irrespective of caste, community, creed, or religion through its public charitable activities. Mahindra Foundation has provided medical relief and donation of medical equipment for the treatment of underprivileged. During national calamities like floods in Uttarakhand and Bihar, COVID etc Mahindra Foundation has mobilized resources for the relief of poor. The Foundation has constructed toilets under Swachh Bharat Swachh Vidyalaya project of Govt of India. Mahindra Foundation has implemented environmental protection projects like Vijay Vidarbha, Solar lighting and Hariyali project in Kashmir.

                      The Trust is also registered u/s 12AB of Income Tax Act and has registration u/s 80G of Income Tax Act, 1961.
                    </p>
                    <div>
                      <section id="set-1">
                        <div className="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1b">
                          <div className="justify-content-center mb-4 row">
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={AnandMahindra}><BsArrowRight /></div>
                                  <img src={AnandMahindraimg} className="hi-iconimg" alt="Anand Mahindra" />
                                  <div className="trsteename">Anand Mahindra
                                    <div className="trsteename-desc">Chairman</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={BharatDoshi}><BsArrowRight /></div>
                                  <img src={BharatDoshiimg} className="hi-iconimg" alt="Bharat Doshi" />
                                  <div className="trsteename">Bharat Doshi
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={UlhasYargop}><BsArrowRight /></div>
                                  <img src={UlhasYargopimg} className="hi-iconimg" alt="" />
                                  <div className="trsteename">Ulhas Yargop
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={ProchieMukherji}><BsArrowRight /></div>
                                  <img src={DumyUserimg} className="hi-iconimg" alt="" />
                                  <div className="trsteename">Prochie Mukherji
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={MarioNazarath}><BsArrowRight /></div>
                                  <img src={DumyUserimg} className="hi-iconimg" alt="" />
                                  <div className="trsteename">Mario Nazarath
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={SheetalMehta}><BsArrowRight /></div>
                                  <img src={SheetalMehtaimg} className="hi-iconimg" alt="" />
                                  <div className="trsteename">Sheetal Mehta
                                    <div className="trsteename-desc">Executive Director</div></div>
                                </div></a>
                            </div>

                          </div>
                        </div>
                      </section>
                    </div> 
                    <div className="text-center naandilogo"><img src={naandilogo} alt="naandilogo" /></div>
                    <p>
                      <b>Naandi Foundation </b>is an apolitical, autonomous public charitable trust and a not-for-profit organisation having registration under section 12AB of income-tax Act, 1961 is tax exempt and is recognised by tax authorities. Born out of the idea of creating a professionally run organization managed by eminent business leaders as Trustees, Naandi serves as a new experiment in the socio-development sector of India. Its foot print has expanded year on year across 17 states touching the lives of more than 6 million underserved people so far.
                      Naandi Foundation is one of the largest and fastest growing social sector organisations in India working to make poverty history.
                    </p>
                    <div>
                      <section id="set-1">
                        <div className="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1b">
                          <div className="justify-content-center mb-4 row">
                          <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" ><BsArrowRight /></div>
                                  <img src={AnjiReddyimg} className="hi-iconimg" alt="Anji Reddy" />
                                  <div className="trsteename">Late Dr. K. Anji Reddy
                                    <div className="trsteename-desc">Founding Chairman</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={AnandMahindra}><BsArrowRight /></div>
                                  <img src={AnandMahindraimg} className="hi-iconimg" alt="Anand Mahindra" />
                                  <div className="trsteename">Anand Mahindra
                                    <div className="trsteename-desc">Chairman and Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" ><BsArrowRight /></div>
                                  <img src={Gopalakrishnanimg} className="hi-iconimg" alt="Gopalakrishnan" />
                                  <div className="trsteename">Senapathy “Kris” Gopalakrishnan
                                    <div className="trsteename-desc">Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" ><BsArrowRight /></div>
                                  <img src={SatishReddyimg} className="hi-iconimg" alt="SatishReddy" />
                                  <div className="trsteename">Satish Reddy
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" ><BsArrowRight /></div>
                                  <img src={RajendraPrasadimg} className="hi-iconimg" alt="RajendraPrasad" />
                                  <div className="trsteename">Maganti Rajendra Prasad
                                    <div className="trsteename-desc">Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee"><BsArrowRight /></div>
                                  <img src={ManojKumarimg} className="hi-iconimg" alt="ManojKumar" />
                                  <div className="trsteename">Manoj Kumar
                                    <div className="trsteename-desc">CEO & Ex-Officio Secretary to the Board</div></div>
                                </div></a>
                            </div>
                            

                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
          {/* popup */}
          <Modal show={anandMahindrashow} onHide={AnandMahindraClose}>
            <Modal.Header closeButton>
              <Modal.Title>Anand Mahindra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={AnandMahindrapng} alt="AnandMahindra" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Anand Mahindra is the Chairman of the US $31.63 billion Mahindra Group and the Executive Chairman of Mahindra & Mahindra Ltd. His tenure has seen the Group expand domestically and internationally into a range of major industrial sectors from automobiles and agriculture to IT and aerospace.
                    <br />
                    He has served on several influential bodies globally, including the Global Board of Advisors of the Council on Foreign Relations, New York and the International Advisory Council of Singapore’s Economic Development Board. Mahindra has been named in Barron's List of Top 30 CEOs worldwide (2016) and Fortune Magazine’s list of the World’s 50 Greatest Leaders (2014). He was appointed ‘Knight in the National Order of the Legion of Honour’ by the President of the French Republic (2016). In June 2022, he was appointed as a non-official director on the central board of the Reserve Bank.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={prochieMukherjishow} onHide={ProchieMukherjiClose}>
            <Modal.Header closeButton>
              <Modal.Title>Prochie Mukherji</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={ProchieMukherjipng} alt="ProchieMukherji" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Space Holder - Ulhas Yargop, worked with the Mahindra Group for 27 years in various capacities including Group President-IT Sector, Group CTO and Chairman of the Group Sustainability Council. He superannuated in 2019.
                    <br />Ulhas is currently the Chairman of Bristlecone. He previously served on the boards of Tech Mahindra, AT&T Global Network Services India Pvt. Ltd., Comviva Technologies, FixStream Technologies, d.light design Inc., etc.
                    <br />Ulhas is a member of the Managing Committee of Harvard Business School (India) Research Center, a member of the Board of Governors of The Mahindra United World College of India, Mahindra University, President-Trustee of Mahindra International, a Trustee of K.C. Mahindra Education Trust, Tech Mahindra Foundation, Mahindra World School Educational Trust, Chennai, Mahindra Education Society, Mumbai and Mahindra Academy, Zaheerabad.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={marioNazarathshow} onHide={MarioNazarathClose}>
            <Modal.Header closeButton>
              <Modal.Title>Mario Nazarath</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={MarioNazarathpng} alt="MarioNazarath" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Space Holder - Ulhas Yargop, worked with the Mahindra Group for 27 years in various capacities including Group President-IT Sector, Group CTO and Chairman of the Group Sustainability Council. He superannuated in 2019.
                    <br />Ulhas is currently the Chairman of Bristlecone. He previously served on the boards of Tech Mahindra, AT&T Global Network Services India Pvt. Ltd., Comviva Technologies, FixStream Technologies, d.light design Inc., etc.
                    <br />Ulhas is a member of the Managing Committee of Harvard Business School (India) Research Center, a member of the Board of Governors of The Mahindra United World College of India, Mahindra University, President-Trustee of Mahindra International, a Trustee of K.C. Mahindra Education Trust, Tech Mahindra Foundation, Mahindra World School Educational Trust, Chennai, Mahindra Education Society, Mumbai and Mahindra Academy, Zaheerabad.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={sheetalMehtashow} onHide={SheetalMehtaClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sheetal Mehta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={SheetalMehtapng} alt="SheetalMehta" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Sheetal Mehta is Executive Director of the Mahindra Foundation since 20…. She is also Senior Vice President – CSR for the Mahindra Group and a member of the CSR Council and has played a key role in designing the CSR architecture and road map for the Mahindra Group. Sheetal is President, Mahindra Foundation USA; and Trustee & President, Mahindra Education Society which looks after 2 schools.
                    <br />
                    Sheetal began her career as a Management Trainee in Mahindra & Mahindra Ltd in 1982. During her two decades in the Marketing department of the Automotive Sector, Sheetal lead the strategy for the flagship products as Product Manager for the Armada, Bolero & Voyager. She was deputed to the Mahindra Ford Joint Venture and launched the Ford Escort in India as their Brand Manager. She has attended a number of executive development courses and marketing management courses at Indian Institute of Management, Ahmedabad, Bangalore & Calcutta and National University of Singapore, Singapore, including a course on Strategic Perspectives in Nonprofit Management at Harvard Business School.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={ulhasYargopshow} onHide={UlhasYargopClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ulhas Yargop</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={UlhasYargoppng} alt="UlhasYargop" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Ulhas Yargop, worked with the Mahindra Group for 27 years in various capacities including Group President-IT Sector, Group CTO and Chairman of the Group Sustainability Council. He superannuated in 2019.
                    <br />Ulhas is currently the Chairman of Bristlecone. He previously served on the boards of Tech Mahindra, AT&T Global Network Services India Pvt. Ltd., Comviva Technologies, FixStream Technologies, d.light design Inc., etc.
                    <br />Ulhas is a member of the Managing Committee of Harvard Business School (India) Research Center, a member of the Board of Governors of The Mahindra United World College of India, Mahindra University, President-Trustee of Mahindra International, a Trustee of K.C. Mahindra Education Trust, Tech Mahindra Foundation, Mahindra World School Educational Trust, Chennai, Mahindra Education Society, Mumbai and Mahindra Academy, Zaheerabad.
                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={bharatDoshishow} onHide={BharatDoshiClose}>
            <Modal.Header closeButton>
              <Modal.Title>Bharat Doshi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={BharatDoshipng} alt="BharatDoshi" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                    Bharat Doshi, after an exemplary career spanning over four decades in the Mahindra Group, retired as Executive Director and Group CFO, Mahindra and Mahindra Ltd. in 2013. Whilst at Mahindras, he also led the initiative of conceptualizing, establishing and nurturing Mahindra Finance and was its Chairman from April 2008 to March 2016. Doshi is currently the Chairman of Mahindra Intertrade Limited and is also a Director of Mahindra Holdings Limited, and Governor on the Board of The Mahindra United World College of India.
                    <br />Doshi was nominated as a Director, for a period of 4 years, on the Central Board of Directors of the Reserve Bank of India in March 2016. He was President of the Bombay Chamber of Commerce & Industry in 2009 -10. Doshi is a recipient of several top honours including being selected as India’s Best CFO.
                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          {/* popup */}
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default AboutUs;
