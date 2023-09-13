import React from "react";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import CaptchaContact from "../user/CaptchaContact";
import { ContactUsService } from "../../../services/ContactUsService/contactUs.service";
import { toast, ToastContainer } from "react-toastify";

function Faq() {
  return (
    <>
      {/* body */}
      <section className="banner banner-faq">
        <div className="title">{/* <h1>Conatct Us</h1> */}</div>
      </section>
      <ToastContainer />
      <div className="">
        <div className="">
          <div className="pv-75">
            <div className="feature-description pb-0">
              <div className="container">
                <h2 className="sub-title text-center mb-0">FAQ</h2>
              </div>
            </div>

            <div className="container">
              <div className="row">
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
              </div>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        How do I see and get info about my tree once I’ve bought it?
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-c ollapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <p>
                            When you buy trees from EcoTree, we add them to your
                            online account. You’ll be able to track their progress and
                            geolocate them using aerial maps and photos of the forest.
                            <br /> You will also have access to a CO2 absorption meter
                            as well as a recovery meter over time. We send all
                            customers a regular email newsletter to help you keep up
                            to date with special offers and information about our
                            forests.
                            <br /> Every year, we send you our detailed annual report
                            for you to learn about the work we’ve done in our forests,
                            our progress as a company and plans for the future. Read
                            our latest annual report now. Finally, most of our forests
                            are open. That means you can come and visit the forest
                            where your trees grow at any time. Just check our list of
                            forests to see if your forest is labelled ‘open to the
                            public’.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                        How does it work?
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <p>Why do we need to plant trees anyway? 1. Absorb CO2.</p>
                        <ol>
                            <li>
                                Purify the air.
                            </li>
                            <li>Help ensure the preservation of biodiversity.</li>
                            <li>Are a source of raw materials.</li>
                            <li>Create jobs.</li>
                            <li>Aid the renewal of damaged land.</li>
                            <li>Filter water.</li>
                            <li> Have agricultural benefits.</li>
                            <li>Provide resources for medicine.{" "}</li>
                        </ol>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseOne">
                        Are the trees I buy already planted or will they be planted in the future?
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <p>
                      At EcoTree, we work in harmony with the seasons and only
                      plant new tree saplings in the winter. This means we need
                      to anticipate demand for our trees ahead of time. So if
                      you are buying a sapling, it might not be planted for a
                      little while. If it’s listed as a mature tree at purchase,
                      then it’s obviously growing away nicely already.
                      <br />
                      If demand for our trees is higher than we expected, we
                      have a pre-sale system set up to ensure that everyone can
                      still buy trees and contribute over the long term to the
                      vital work our planet’s forests do in capturing carbon.
                    </p>
                    </div>                    
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseOne">
                        Do I get a certificate or other proof that I own my trees?
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseOne">
                        Does the price of my tree include all taxes and fees?{" "}
                        </button>
                    </h2>
                    <div id="collapseFive" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <p>
                            Once your trees have been paid for, you will never have to
                            pay more costs or taxes. Your initial payment covers the
                            vital work we do to maintain a vibrant, sustainable forest
                            (such as pruning, thinning and mushroom treatments). It
                            also covers all the costs involved in the notary deeds,
                            property taxes and maps or surveys of the forest where
                            your trees are planted (cadastral fees).
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
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseOne">
                        How long do trees take to reach maturity?{" "}
                        </button>
                    </h2>
                    <div id="collapseSix" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="true" aria-controls="collapseOne">
                        Why is tree ownership good for the planet?
                        </button>
                    </h2>
                    <div id="collapseSeven" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default Faq;
