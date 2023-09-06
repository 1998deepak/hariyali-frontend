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
// ----------
import Gopalakrishnanpng from "../../../assets/img/trustee/DumyUser.png";
import AnjiReddypng from "../../../assets/img/trustee/DumyUser.png";
import SatishReddypng from "../../../assets/img/trustee/DumyUser.png";
import RajendraPrasadpng from "../../../assets/img/trustee/DumyUser.png";
import ManojKumarpng from "../../../assets/img/trustee/DumyUser.png";
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
// -----------------------
const [anandMahindranaandishow, setAnandMahindranaandiShow] = useState(false);
const AnandMahindranaandiClose = () => setAnandMahindranaandiShow(false);
const AnandMahindranaandi = () => setAnandMahindranaandiShow(true);

  const [anjiReddyshow, setAnjiReddyShow] = useState(false);
  const AnjiReddyClose = () => setAnjiReddyShow(false);
  const AnjiReddy = () => setAnjiReddyShow(true);

  const [gopalakrishnanshow, setGopalakrishnanShow] = useState(false);
  const GopalakrishnanClose = () => setGopalakrishnanShow(false);
  const Gopalakrishnan = () => setGopalakrishnanShow(true);

  const [satishReddyshow, setSatishReddyShow] = useState(false);
  const SatishReddyClose = () => setSatishReddyShow(false);
  const SatishReddy = () => setSatishReddyShow(true);

  const [rajendraPrasadshow, setRajendraPrasadShow] = useState(false);
  const RajendraPrasadClose = () => setRajendraPrasadShow(false);
  const RajendraPrasad = () => setRajendraPrasadShow(true);

  const [manojKumarshow, setManojKumarShow] = useState(false);
  const ManojKumarClose = () => setManojKumarShow(false);
  const ManojKumar = () => setManojKumarShow(true);

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
          </div><section className="bg-green"><div className="container">
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
            </div> </div>
          </section>
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
          <section id="knowYourPatners" className="bg-venture bg-green">
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
                                  <div className="moretrstee" onClick={AnjiReddy}><BsArrowRight /></div>
                                  <img src={AnjiReddyimg} className="hi-iconimg" alt="Anji Reddy" />
                                  <div className="trsteename">Late Dr. K. Anji Reddy
                                    <div className="trsteename-desc">Founding Chairman</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={AnandMahindranaandi}><BsArrowRight /></div>
                                  <img src={AnandMahindraimg} className="hi-iconimg" alt="Anand Mahindra" />
                                  <div className="trsteename">Anand Mahindra
                                    <div className="trsteename-desc">Chairman and Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2 ">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee"  onClick={Gopalakrishnan}><BsArrowRight /></div>
                                  <img src={Gopalakrishnanimg} className="hi-iconimg" alt="Gopalakrishnan" />
                                  <div className="trsteename">Senapathy “Kris” Gopalakrishnan
                                    <div className="trsteename-desc">Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={SatishReddy} ><BsArrowRight /></div>
                                  <img src={SatishReddyimg} className="hi-iconimg" alt="SatishReddy" />
                                  <div className="trsteename">Satish Reddy
                                    <div className="trsteename-desc">Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee"  onClick={RajendraPrasad}><BsArrowRight /></div>
                                  <img src={RajendraPrasadimg} className="hi-iconimg" alt="RajendraPrasad" />
                                  <div className="trsteename">Maganti Rajendra Prasad
                                    <div className="trsteename-desc">Life Trustee</div></div>
                                </div></a>
                            </div>
                            <div className="col-6 col-md-2">
                              <a className="hi-icon hi-icondiv">
                                <div className="trstee-div">
                                  <div className="moretrstee" onClick={ManojKumar}><BsArrowRight /></div>
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
          {/* ------------------- */}
          <Modal show={anjiReddyshow} onHide={AnjiReddyClose}>
            <Modal.Header closeButton>
              <Modal.Title>Dr. K. Anji Reddy (1941-2013)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={AnjiReddypng} alt="AnjiReddy" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  When Dr. Reddy agreed to be founder chair of the board of Naandi Foundation in 1998 at the behest of the then Chief Minister of Andhra Pradesh – it was a unique coming together of polity and business with a shared vision of eradicating poverty. Being aware of the critical need for a daring, forward-looking and visionary CEO, Dr. Reddy waited till he found the right man – the thirty-year-old Manoj Kumar – in 2000. At the same time inspiring and watchful, Dr. Reddy urged Manoj to push all frontiers and create, within a decade, the largest and fastest growing not-for-profit in the country which boldly outsourced government programmes and took up work on a scale hitherto unprecedented in the NGO sector. As this first decade of exhilarating growth came to a close, Dr. Reddy saw the opportunity for growth and further scale, in the realm of ‘social business’ and once again, in a first-ever move in the development world, led Manoj to spin off one portfolio after another of Naandi Foundation into a business enterprise.
<br/>
For the rest of the Naandi family, Dr. Reddy was a leader who could make the impossible possible, a benchmark of professionalism and a father figure rolled into one. He would speak out his dream (“when will every person in every village of India have safe water to drink”, to give just one instance), and the whole Naandi team led by the CEO would not rest till they had come up with a viable plan to make this dream a reality – such was his inspiring leadership.
<br/>
Dreaming big, and making the big dreams come true – always with the poorest man in India at the centre of these dreams – is something that characterised Dr. Reddy’s work throughout his life. He is remembered by the world for his contribution in making pharma products globally competitive and ensuring that medicines were affordable to the common man. He was especially recognised for his passion in leveraging genuine technological interventions and making active pharmaceutical ingredients and formulations effective by getting out medicines into the market in the shortest possible time.
<br/>
The son of a turmeric farmer in rural Andhra Pradesh, he went to a local government school and received his first Bachelor of Science degree from a local college. Thereafter he did his BSc-Tech in Pharmaceuticals and Fine Chemicals from UDCT, Mumbai followed by a PhD in chemical engineering from National Chemical Laboratory in 1969. He set up Dr. Reddy’s Laboratories with an initial investment of Rs 25 lakhs. This company, in 2001, became India’s first company to be listed on the New York Stock Exchange and is worth more than $ 2 billion today. The Government of India honoured him with the Padma Bhushan for his contribution to the Indian pharma industry. He was a member of the Prime Minister’s Council on Trade and Industry, a Fellow of the Indian National Academy of Engineering and Chairman of the Andhra Pradesh Industrial Development Corporation.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={gopalakrishnanshow} onHide={GopalakrishnanClose}>
            <Modal.Header closeButton>
              <Modal.Title>Senapathy “Kris” Gopalakrishnan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={Gopalakrishnanpng} alt="Gopalakrishnan" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  When Dr. Reddy agreed to be founder chair of the board of Naandi Foundation in 1998 at the behest of the then Chief Minister of Andhra Pradesh – it was a unique coming together of polity and business with a shared vision of eradicating poverty. Being aware of the critical need for a daring, forward-looking and visionary CEO, Dr. Reddy waited till he found the right man – the thirty-year-old Manoj Kumar – in 2000. At the same time inspiring and watchful, Dr. Reddy urged Manoj to push all frontiers and create, within a decade, the largest and fastest growing not-for-profit in the country which boldly outsourced government programmes and took up work on a scale hitherto unprecedented in the NGO sector. As this first decade of exhilarating growth came to a close, Dr. Reddy saw the opportunity for growth and further scale, in the realm of ‘social business’ and once again, in a first-ever move in the development world, led Manoj to spin off one portfolio after another of Naandi Foundation into a business enterprise.
<br/>
For the rest of the Naandi family, Dr. Reddy was a leader who could make the impossible possible, a benchmark of professionalism and a father figure rolled into one. He would speak out his dream (“when will every person in every village of India have safe water to drink”, to give just one instance), and the whole Naandi team led by the CEO would not rest till they had come up with a viable plan to make this dream a reality – such was his inspiring leadership.
<br/>
Dreaming big, and making the big dreams come true – always with the poorest man in India at the centre of these dreams – is something that characterised Dr. Reddy’s work throughout his life. He is remembered by the world for his contribution in making pharma products globally competitive and ensuring that medicines were affordable to the common man. He was especially recognised for his passion in leveraging genuine technological interventions and making active pharmaceutical ingredients and formulations effective by getting out medicines into the market in the shortest possible time.
<br/>
The son of a turmeric farmer in rural Andhra Pradesh, he went to a local government school and received his first Bachelor of Science degree from a local college. Thereafter he did his BSc-Tech in Pharmaceuticals and Fine Chemicals from UDCT, Mumbai followed by a PhD in chemical engineering from National Chemical Laboratory in 1969. He set up Dr. Reddy’s Laboratories with an initial investment of Rs 25 lakhs. This company, in 2001, became India’s first company to be listed on the New York Stock Exchange and is worth more than $ 2 billion today. The Government of India honoured him with the Padma Bhushan for his contribution to the Indian pharma industry. He was a member of the Prime Minister’s Council on Trade and Industry, a Fellow of the Indian National Academy of Engineering and Chairman of the Andhra Pradesh Industrial Development Corporation.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={gopalakrishnanshow} onHide={GopalakrishnanClose}>
            <Modal.Header closeButton>
              <Modal.Title>Senapathy “Kris” Gopalakrishnan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={Gopalakrishnanpng} alt="Gopalakrishnan" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  Mr. Senapathy “Kris” Gopalakrishnan, co-founder of Infosys, served as its Vice Chairman from 2011 to 2014 and as the CEO and MD from 2007 to 2011. He was awarded the Padma Bhushan in 2011, one of the highest civilian honours in India.
<br/>
Kris is the chairman of the International Institute of Information Technology, Bangalore and Vice Chairman of the Board for Information Technology Education Standards (BITES) set up by the Government of Karnataka.
<br/>
In April 2012, Kris was appointed as a member of the reconstituted United Nations Global Compact Board for three years. He was elected as the President of India’s apex industry chamber Confederation of Indian Industry (CII) for the year 2013-14.
<br/>
Kris is a Trustee of the Infosys Science Foundation. He is the Chief Mentor of Startup Village, a technology incubator in his native Kerala state.
<br/>
Kris has contributed Rs. 225 Crore (40 Million USD) to the pure sciences to develop a Centre for Brain Research at the Indian Institute of Science in Bangalore.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={satishReddyshow} onHide={SatishReddyClose}>
            <Modal.Header closeButton>
              <Modal.Title>Satish Reddy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={SatishReddypng} alt="SatishReddy" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  Mr. Senapathy “Kris” Gopalakrishnan, co-founder of Infosys, served as its Vice Chairman from 2011 to 2014 and as the CEO and MD from 2007 to 2011. He was awarded the Padma Bhushan in 2011, one of the highest civilian honours in India.
<br/>
Kris is the chairman of the International Institute of Information Technology, Bangalore and Vice Chairman of the Board for Information Technology Education Standards (BITES) set up by the Government of Karnataka.
<br/>
In April 2012, Kris was appointed as a member of the reconstituted United Nations Global Compact Board for three years. He was elected as the President of India’s apex industry chamber Confederation of Indian Industry (CII) for the year 2013-14.
<br/>
Kris is a Trustee of the Infosys Science Foundation. He is the Chief Mentor of Startup Village, a technology incubator in his native Kerala state.
<br/>
Kris has contributed Rs. 225 Crore (40 Million USD) to the pure sciences to develop a Centre for Brain Research at the Indian Institute of Science in Bangalore.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={satishReddyshow} onHide={SatishReddyClose}>
            <Modal.Header closeButton>
              <Modal.Title>Satish Reddy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={SatishReddypng} alt="SatishReddy" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  Satish Reddy is the Chairman of Dr Reddy’s Laboratories Ltd. His association with Dr. Reddy’s began in 1991 when he joined Globe Organics, a Dr. Reddy’s group company as Executive Director.
<br/>
In 1993, he was appointed as Executive Director of Dr. Reddy’s Laboratories with responsibility for new product introduction, manufacturing and commercialization of active pharmaceutical ingredients (API). He led the company’s global expansion into Emerging Markets like Russia and CIS countries, among others. In 1997 he became Managing Director and in 2013 was appointed Vice Chairman and Managing Director.
A strong advocate of responsible corporate citizenship, Satish pursues his interest in human capital development through various not-for-profit organisations. Two positions of note are:
Chairman of Dr. Reddy’s Foundation, a not-for-profit organization focusing on creating sustainable livelihoods and providing education, and Trustee of the Naandi Foundation, which focuses on child rights, sustainable livelihoods and safe drinking water and is a leader in providing academic support and daily meals to more than 1.3 million children in government schools across India.
<br/>
Satish was identified as a “Young Global Leader for 2007” by the World Economic Forum, and was awarded the “IBLA – India Corporate Citizen of the Year” by CNBC in 2005 for his contributions to Corporate Social Responsibility.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={rajendraPrasadshow} onHide={RajendraPrasadClose}>
            <Modal.Header closeButton>
              <Modal.Title>Maganti Rajendra Prasad</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={RajendraPrasadpng} alt="RajendraPrasad" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  Rajendra Prasad, an Entrepreneur–Technocrat heads one of the leading infrastructure developers in the country – Soma Enterprise Ltd. He has been associated with the construction Industry for more than 32 years and has been instrumental in implementing several major infrastructure projects.
<br/>
Mr Prasad is committed towards social welfare and is involved in various social and philanthropic initiatives, including financing and constructing two Rural Water Conservation projects in Chittoor district of Andhra Pradesh for the benefit of the rural poor; and constructing a building for Andhra Mahila Sabha, Hyderabad to facilitate training of handicapped and disabled children. He has contributed actively in several projects towards betterment of educational and health facilities for the poor.

                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={manojKumarshow} onHide={ManojKumarClose}>
            <Modal.Header closeButton>
              <Modal.Title>Manoj Kumar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="trustee-popup" closeButton>
                <div className="trustee-popup-img">
                  <img src={ManojKumarpng} alt="ManojKumar" />
                </div>
                <div>
                  <p className="trustee-popup-div" >
                  A Robert McNamara Fellow of the World Bank, Manoj’s career as a professional began with stints in Ministry of Finance, development banking, micro-finance, and international humanitarian organisations before becoming the founding CEO of Naandi Foundation in 2000 AD. Under his leadership, Naandi’s first decade saw Manoj design and implement innovative solutions that enhanced efficiency and quality of large-scale government services. Creation of the largest network of centralised kitchens for providing 1 billion midday meals to a million school going children being one such example. 
<br/>
Through lesser-known development financing models, Manoj led the transformation of tribal communities of Araku Valley (Eastern Ghats) caught in the quagmire of poverty, Naxal (Maoist) insurgency, and aggravating ecological fragility into a region with biodiverse functional forests (30 million trees – mostly coffee, fruits, shade and timber) and thus creating an iconic global brand – ARAKU Coffee that enabled 100,000 tribal lives to come out of poverty. The successful regenerative agriculture model of Araku is being replicated in rural and urban India under the aegis of ‘Arakunomics’ which was awarded the prestigious ‘Food System Vision Prize 2050’ by the Rockefeller Foundation, New York, USA. 
<br/>
Manoj was named by the Financial Times, London as one of the 25 people to watch out for in India.


                  </p></div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={anandMahindranaandishow} onHide={AnandMahindranaandiClose}>
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
                  Anand Mahindra started off at Mahindra in 1981 when he joined Mahindra Ugine Steel Co (MUSCO), a major producer of specialty steels, as Executive Assistant to the Finance Director. In 1989, he was appointed President & Deputy Managing Director of the company.
<br/>
While at MUSCO, Anand Mahindra spearheaded Mahindra’s growth and diversification into new business areas like real estate and hospitality management. In 1991, he was appointed Deputy Managing Director of Mahindra & Mahindra, the country’s leading producer of tractors and off-road vehicles. He initiated a comprehensive change program to make the company an efficient and aggressive competitor in the new liberalized economic environment in India. He became a Managing Director in 1997, and was promoted to Vice Chairman in 2003. He was appointed Chairman of the board in 2012.
<br/>
During his tenure, the Mahindra Group has made significant steps forward through inorganic growth. Notable acquisitions include Ssangyong Motors, Reva Electric Car Company, Satyam Computer Services (now merged with Tech Mahindra), Aerostaff Australia, and Gippsland Aeronautics among others.
A few of the boards and committees that Anand Mahindra serves on are:
<br/>
Harvard Business School Association of India – Cofounder and Asia/Pacific Advisory Board
National Sports Development Fund (NSDF), Government of India – Council and Executive Committee
India Council for Sustainable Development
Anand has received a great many awards over the years. Some of these are:
Knight of the Order of Merit from the President of the French Republic
 Harvard Business School Alumni Achievement Award 2008
Business Leader of the Year 2009 from the Economic Times
Top 25 Most Powerful Business people in Asia from Fortune magazine, 2011
Global Leadership Award June 2012 by the US-India Business Council
Business Courage Award 2012 by Asia Business Leadership Forum
Best Transformational Leader Award 2012 by the Asian Centre For Corporate Governance & Sustainability
<br/>
Anand Mahindra takes a keen interest in education, and apart from being a Trustee of the K.C. Mahindra Education Trust, which provides scholarships to students, he is also on the Board of Governors of the Mahindra United World College of India. In 1996, he initiated the Nanhi Kali program to provide free education to economically underprivileged girl children in India. He is also the Chairman of the Board of the Naandi Foundation, a leader in providing academic support and providing agriculture and natural resource management knowledge to small farmers across India.
<br/>
Mr. Mahindra serves on the board of Naandi Community Water Services, a social enterprise set up by Naandi Foundation in partnership with danone.communities – that provides safe drinking water to rural India catering to 5,00,000 customers.
<br/>
He frequently shares his views and ideas on economics and business through his writings in various business magazines. You can follow his personal views on Twitter via @anandmahindra.
Mr. Mahindra graduated magna cum laude from Harvard College, USA in 1977 and earned an MBA from the Harvard Business School, USA in 1981.
<br/>
A strong believer in the power of liberal arts to shape the leaders of the future, he gave an endowment of $10 million to the Harvard Humanities Center in 2010 – now known as the Mahindra Humanities Center.
Anand Mahindra enjoys world cinema, reading, listening to the Blues, sailing, and tennis. He lives in Mumbai with his wife. They have two daughters.
 

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
