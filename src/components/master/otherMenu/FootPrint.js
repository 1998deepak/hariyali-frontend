import React from "react";
import "animate.css/animate.min.css";
import "../../../assets/css/footprint.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Wardhaimg from "../../../assets/img/footprint/wardha.jpg";
import Mogaimg from "../../../assets/img/footprint/moga.jpg";
import Solanimg from "../../../assets/img/footprint/solan.jpg";
import Taranimg from "../../../assets/img/footprint/taran.jpg";
import Shravastiimg from "../../../assets/img/footprint/shravast.jpg";
import Arakuimg from "../../../assets/img/footprint/araku.jpg";
// import Footo from "../../../assets/img/foot1.png";
import { Container, Row } from "react-bootstrap";
import { FiArrowRightCircle } from "react-icons/fi";
import image from "../../../assets/img/bannerWherearewe.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FootPrint() {
  const [arakushow, setArakuShow] = useState(false);
  const [shravastishow, setShravastiShow] = useState(false);
  const [solanshow, setSolanShow] = useState(false);
  const [taranshow, setTaranShow] = useState(false);
  const [mogashow, setMogaShow] = useState(false);
  const [wardhashow, setWardhaShow] = useState(false);

  const ArakuClose = () => setArakuShow(false);
  const Araku = () => setArakuShow(true);
  const ShravastiClose = () => setShravastiShow(false);
  const Shravasti = () => setShravastiShow(true);
  const SolanClose = () => setSolanShow(false);
  const Solan = () => setSolanShow(true);
  const TaranClose = () => setTaranShow(false);
  const Taran = () => setTaranShow(true);
  const MogaClose = () => setMogaShow(false);
  const Moga = () => setMogaShow(true);
  const WardhaClose = () => setWardhaShow(false);
  const Wardha = () => setWardhaShow(true);

  return (
    <>
      {/* body */}
      <section className="banner banner-footprint">
        <div className="title"></div>
      </section>
      <div>
        <Container className="pv-75">
          <Row className="justify-content-between  padding30tb contact-form-wrap">
            <div className="otherbotmborder">
              <div className="otherpages-heading text-center sub-title">
                Where Are We{" "}
              </div>
              <p className="text-center">
                We are currently active in three regions for large scale
                plantations – Southern, Northern and Western India. We have
                projects in the states of Andhra Pradesh, Uttar Pradesh, Punjab,
                Himachal Pradesh and Maharashtra.
              </p>
            </div>
            <div class="grid">
              <figure class="effect-apollo" onClick={Araku}>
                <img src={Arakuimg} alt="Araku" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Araku Valley</span>,<br /> Andhra Pradesh
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Araku}>View more</a>
                </figcaption>
              </figure>
              <figure class="effect-apollo" onClick={Shravasti}>
                <img src={Shravastiimg} alt="Shravastiimg" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Shravasti</span>,<br /> Uttar Pradesh
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Shravasti}>View more</a>
                </figcaption>
              </figure>
              <figure class="effect-apollo" onClick={Moga}>
                <img src={Mogaimg} alt="Mogaimg" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Moga</span>,<br /> Punjab
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Moga}>View more</a>
                </figcaption>
              </figure>
              <figure class="effect-apollo" onClick={Taran}>
                <img src={Taranimg} alt="Taranimg" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Tarn Taran</span>,<br /> Punjab
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Taran}>View more</a>
                </figcaption>
              </figure>
              <figure class="effect-apollo" onClick={Solan}>
                <img src={Solanimg} alt="Solanimg" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Solan</span>,<br /> Himachal Pradesh
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Solan}>View more</a>
                </figcaption>
              </figure>
              <figure class="effect-apollo" onClick={Wardha}>
                <img src={Wardhaimg} alt="Wardhaimg" />
                <figcaption>
                  <h2>
                    {" "}
                    <span>Wardha</span>,<br /> Maharashtra
                  </h2>
                  <p className="arrowright-foot">
                    <FiArrowRightCircle />
                  </p>
                  <a onClick={Wardha}>View more</a>
                </figcaption>
              </figure>
            </div>
          </Row>
        </Container>
        <div className="container">
          <h2 className="sub-title text-center mb-0">FAQ</h2>
          {/* <div className="row">
                <div className="col-12 col-md-4">
                  <div className="faqpercent-div">
                    <div className="faqpercent-no">70%</div>
                    <div className="faqpercentname">Direct Programme</div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="faqpercent-div">
                    <div className="faqpercent-no">20%</div>
                    <div className="faqpercentname">
                      Project Management & Monitoring
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="faqpercent-div">
                    <div className="faqpercent-no">10%</div>
                    <div className="faqpercentname">Administration</div>
                  </div>
                </div>
              </div> */}
          {/* <div class="accordion my-5" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How do I see and get info about my tree once I’ve bought it?
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-c ollapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    When you buy trees from EcoTree, we add them to your online
                    account. You’ll be able to track their progress and
                    geolocate them using aerial maps and photos of the forest.
                    <br /> You will also have access to a CO2 absorption meter
                    as well as a recovery meter over time. We send all customers
                    a regular email newsletter to help you keep up to date with
                    special offers and information about our forests.
                    <br /> Every year, we send you our detailed annual report
                    for you to learn about the work we’ve done in our forests,
                    our progress as a company and plans for the future. Read our
                    latest annual report now. Finally, most of our forests are
                    open. That means you can come and visit the forest where
                    your trees grow at any time. Just check our list of forests
                    to see if your forest is labelled ‘open to the public’.
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How does it work?
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>Why do we need to plant trees anyway? 1. Absorb CO2.</p>
                  <ol>
                    <li>Purify the air.</li>
                    <li>Help ensure the preservation of biodiversity.</li>
                    <li>Are a source of raw materials.</li>
                    <li>Create jobs.</li>
                    <li>Aid the renewal of damaged land.</li>
                    <li>Filter water.</li>
                    <li> Have agricultural benefits.</li>
                    <li>Provide resources for medicine. </li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Are the trees I buy already planted or will they be planted in
                  the future?
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    At EcoTree, we work in harmony with the seasons and only
                    plant new tree saplings in the winter. This means we need to
                    anticipate demand for our trees ahead of time. So if you are
                    buying a sapling, it might not be planted for a little
                    while. If it’s listed as a mature tree at purchase, then
                    it’s obviously growing away nicely already.
                    <br />
                    If demand for our trees is higher than we expected, we have
                    a pre-sale system set up to ensure that everyone can still
                    buy trees and contribute over the long term to the vital
                    work our planet’s forests do in capturing carbon.
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Do I get a certificate or other proof that I own my trees?
                </button>
              </h2>
              <div
                id="collapseFour"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    As a tree owner with EcoTree, you get a certificate of
                    ownership. Our IT Department stores all records of
                    ownership, hosted on servers outside EcoTree.
                    <br />
                    On top of this, we provide proof that we are maintaining a
                    properly accounted register annually to the financial
                    authorities (The AMF - Autorité des Marchés Financiers) in
                    France.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Does the price of my tree include all taxes and fees?{" "}
                </button>
              </h2>
              <div
                id="collapseFive"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    Once your trees have been paid for, you will never have to
                    pay more costs or taxes. Your initial payment covers the
                    vital work we do to maintain a vibrant, sustainable forest
                    (such as pruning, thinning and mushroom treatments). It also
                    covers all the costs involved in the notary deeds, property
                    taxes and maps or surveys of the forest where your trees are
                    planted (cadastral fees).
                    <br />
                    Under current French tax law, any capital gain is
                    non-taxable if it relates to the sale of trees worth less
                    than €5,000 after 22 years or more of tree ownership.
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  How long do trees take to reach maturity?{" "}
                </button>
              </h2>
              <div
                id="collapseSix"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    Every tree species we offer is different, in terms of how
                    long it takes to reach maturity, but we’re talking decades
                    for all of them!
                    <br />
                    Not all the trees we offer are new planted saplings. Some
                    have been growing a number of years already.
                    <br />
                    You can see how old a tree is when you buy it and how many
                    years we expect it to grow before we cut it, on the tree’s
                    product information card.
                  </p>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Why is tree ownership good for the planet?
                </button>
              </h2>
              <div
                id="collapseSeven"
                class="accordion-collapse collapse "
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p>
                    Writer George Monbiot and biologist Garret Hardin have
                    highlighted how vital our connection to nature is in its
                    conservation. That’s why we’re going beyond donations.
                    <br />
                    Our tree owners (like you!) have a lifetime of reasons to
                    stay engaged and passionate about protecting forests.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How do I see and get info about my tree once I’ve bought it?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  When you buy trees from EcoTree, we add them to your online
                    account. You’ll be able to track their progress and
                    geolocate them using aerial maps and photos of the forest.
                    <br /> You will also have access to a CO2 absorption meter
                    as well as a recovery meter over time. We send all customers
                    a regular email newsletter to help you keep up to date with
                    special offers and information about our forests.
                    <br /> Every year, we send you our detailed annual report
                    for you to learn about the work we’ve done in our forests,
                    our progress as a company and plans for the future. Read our
                    latest annual report now. Finally, most of our forests are
                    open. That means you can come and visit the forest where
                    your trees grow at any time. Just check our list of forests
                    to see if your forest is labelled ‘open to the public’.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>How does it work?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                <p>Why do we need to plant trees anyway? 1. Absorb CO2.</p>
                  <ol>
                    <li>Purify the air.</li>
                    <li>Help ensure the preservation of biodiversity.</li>
                    <li>Are a source of raw materials.</li>
                    <li>Create jobs.</li>
                    <li>Aid the renewal of damaged land.</li>
                    <li>Filter water.</li>
                    <li> Have agricultural benefits.</li>
                    <li>Provide resources for medicine. </li>
                  </ol>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Are the trees I buy already planted or will they be planted in the future?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    At EcoTree, we work in harmony with the seasons and only
                    plant new tree saplings in the winter. This means we need to
                    anticipate demand for our trees ahead of time. So if you are
                    buying a sapling, it might not be planted for a little
                    while. If it’s listed as a mature tree at purchase, then
                    it’s obviously growing away nicely already.
                    <br />
                    If demand for our trees is higher than we expected, we have
                    a pre-sale system set up to ensure that everyone can still
                    buy trees and contribute over the long term to the vital
                    work our planet’s forests do in capturing carbon.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Do I get a certificate or other proof that I own my trees?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    As a tree owner with EcoTree, you get a certificate of
                    ownership. Our IT Department stores all records of
                    ownership, hosted on servers outside EcoTree.
                    <br />
                    On top of this, we provide proof that we are maintaining a
                    properly accounted register annually to the financial
                    authorities (The AMF - Autorité des Marchés Financiers) in
                    France.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Does the price of my tree include all taxes and fees?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    Once your trees have been paid for, you will never have to
                    pay more costs or taxes. Your initial payment covers the
                    vital work we do to maintain a vibrant, sustainable forest
                    (such as pruning, thinning and mushroom treatments). It also
                    covers all the costs involved in the notary deeds, property
                    taxes and maps or surveys of the forest where your trees are
                    planted (cadastral fees).
                    <br />
                    Under current French tax law, any capital gain is
                    non-taxable if it relates to the sale of trees worth less
                    than €5,000 after 22 years or more of tree ownership.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>How long do trees take to reach maturity?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    Every tree species we offer is different, in terms of how
                    long it takes to reach maturity, but we’re talking decades
                    for all of them!
                    <br />
                    Not all the trees we offer are new planted saplings. Some
                    have been growing a number of years already.
                    <br />
                    You can see how old a tree is when you buy it and how many
                    years we expect it to grow before we cut it, on the tree’s
                    product information card.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography> Why is tree ownership good for the planet?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    Writer George Monbiot and biologist Garret Hardin have
                    highlighted how vital our connection to nature is in its
                    conservation. That’s why we’re going beyond donations.
                    <br />
                    Our tree owners (like you!) have a lifetime of reasons to
                    stay engaged and passionate about protecting forests.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

        </div>
      </div>{" "}
      <Modal show={arakushow} onHide={ArakuClose}>
        <Modal.Header closeButton>
          <Modal.Title>Araku Valley</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Arakuimg} alt="Arakuimg" className="footpop-img" />
            <p className="footpop-p">
              Araku Valley is located in the tribal region which is under the
              jurisdiction of the ITDA Paderu (Integrated Tribal Development
              Agency) Paderu falling in Alluri Sitharama Raju district, Andhra
              Pradesh. We are working in 723 villages spread across 5 mandals
              impacting over 1,20,000 farmer families. As of 2023, 14.90 million
              trees have been planted. (Plantation Season – Monsoon)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={shravastishow} onHide={ShravastiClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shravasti, Uttar Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img
              src={Shravastiimg}
              alt="Shravastiimg"
              className="footpop-img"
            />
            <p className="footpop-p">
              Shravasti is situated 175 kms from state capital Lucknow.
              According to the Government of India, it is among the 121
              minority- concentrated district in India. The 2018 Niti Aayog
              Ranking puts it at fourth most backward district in India. We are
              currently working in 65 villages in Sirsia block. As of 2023, 1.71
              lakh trees have been planted. (Plantation Season – Monsoon,
              Winter)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={solanshow} onHide={SolanClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solan, Himacgal Pradesh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Solanimg} alt="Solanimg" className="footpop-img" />
            <p className="footpop-p">
              Solan is a predominantly rural district with less than 20% of the
              population living in urban areas. The forest resources are
              experiencing severe stress with increasing pressure from the
              burgeoning population and rising impact of human commercial
              activities. As of 2023, 70 K trees have been planted. (Plantation
              Season – Winter)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={taranshow} onHide={TaranClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tarn Taran, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Taranimg} alt="Taranimg" className="footpop-img" />
            <p className="footpop-p">
              Tarn Taran Sahib is a city in the state of Punjab, Northern India.
              The main occupation in this area is agriculture and agro industry
              with very few other industries. We are currently working in 50
              villages in 5 districts. In Tarn Taran, 60% farmers belong to
              affirmative action category and 32% farmers belong to other
              backward classes. As of 2023, 1.67 lakh trees have been planted.
              (Plantation Season – Monsoon, Winter)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={mogashow} onHide={MogaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Moga, Punjab</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Mogaimg} alt="Mogaimg" className="footpop-img" />
            <p className="footpop-p">
              Moga is in the Indian State Of Punjab The total rural population
              is almost 80 percent, 20% being the urban population. We are
              currently working in 50 villages in 3 districts. In Moga, 60%
              farmers belong to affirmative action category and 32% farmers
              belong to other backward classes. As of 2023, 1.84 lakh trees have
              been planted. (Plantation Season – Monsoon, Winter)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={wardhashow} onHide={WardhaClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wardha, Maharashtra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="program-details" closeButton>
            <img src={Wardhaimg} alt="Wardha" className="footpop-img" />
            <p className="footpop-p">
              Wardha district is located in the Vidarbha region of the State of
              Maharashtra. 74% is residing in rural area and 26% is residing in
              urban area. We are currently working in 22 villages across 4
              Tehsils. Plantation is in progress. (Plantation Season – Monsoon)
            </p>
          </div>
        </Modal.Body>
      </Modal>
      {/* body */}
    </>
  );
}

export default FootPrint;
