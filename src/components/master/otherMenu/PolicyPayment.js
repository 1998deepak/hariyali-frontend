import React from "react";
import { Container, Row } from "react-bootstrap";
import "animate.css/animate.min.css";
import "react-image-gallery/styles/css/image-gallery.css";

function PolicyPayment() {
  return (
    <>
      {/* body */}
      <section className="banner banner-policy">
        <div className="title"></div>
      </section>
      <div className="container">
        <div className="pv-75">
          <div className="feature-description">
            <h2 className="sub-title text-center mb-0">Privacy Policy</h2>
          </div>
          {/* <div className="col-12">
                        <div>
                            <div className="otherpages-subheading textupp">Data Protection Notice</div>
                            <p>
                                Mahindra Foundation and Naandi Foundation is committed to protecting the privacy and security of your personal data. Your privacy is important to us.
                                This notice provides you with information on how<span className="colorgreen"> Mahindra Foundation and Naandi Foundation (“we”)</span> will process your personal data as (i) a (potential) donor; and (ii) a user of our website.
                            </p></div>
                        <div className="otherpages-subheading">1. Which of your data we process</div>
                        <p>
                            <span className="bold">Website visitors:</span> In the course of your visit of this website we will automatically collect the following information:
                        </p>
                        <div className="otherpagesulli mb-2r">
                            <ul><li>
                                The selected page on our website (URL)</li>
                                <li>Date and the time of your visit of this website</li>
                                <li>Your IP address</li>
                                <li>Name and version of your web browser</li>
                                <li>The website (URL) you have visited before you accessed this website
                                </li><li>Certain cookies (see point 2 below)
                                </li></ul>
                        </div>
                        <p>In case someone else uses the <span className="colorgreen">"tell a friend"</span> feature on our website, or you send us a request via email we will process your name and email address.
                        </p>
                        <p><span className="bold">Donors: </span>
                            We collect personal data in course of your donation from you directly <span className="colorgreen">(name, email address, mailing address, company name, contact details)</span>, when you provide us with your personal data by donation to Nanhi Kali.
                            <br />
                            There is no obligation to provide the data that we ask you for. However, if you do not provide your personal data, you will not be able to make use of all the functions of this website or donate.
                        </p>
                        <div className="otherpages-subheading mt25 textupp">2. Cookies</div>
                        <p>This website uses so-called cookies. A cookie is a small file that may be installed on your computer when you visit a website. Cookies are generally used to provide site visitors with additional functionality within the site. They may for example be created to keep track of your visit and support your navigation of the website, help you resume where you left off and/or remember your preferences and settings when you visit the website again. Cookies cannot access, read or modify any other data on your computer.
                            <br />
                            Most of the cookies used on this website are so-called session cookies. They are automatically deleted once you leave the website. On the other hand, persistent cookies remain on your computer until you delete them in your browser. We use persistent cookies to recognise you when you visit this website the next time.<br />
                            If you want to control the cookies installed on your computer, you can modify your browser settings so that it notifies you when a website wants to install a cookie or you can block cookies altogether. You can also delete cookies that have already been installed on your computer. Refer to the 'Help' function within your browser for more information on how to do these things.<br />
                            Please note, however, that disabling cookies might affect your online experience and/or prevent you from taking full advantage of our website.
                        </p>

                        <div className="otherpages-subheading textupp">
                            3. Purpose for which we process your data
                        </div>
                        <p>We will process your personal data set out in point 1 for the following purposes:</p>
                        <div className="otherpagesulli mb-2r">
                            <ul><li>To make this website and its services available to you and to further optimize and develop this website</li><li>
                                To be able to recognize, prevent and investigate attacks of this website</li>
                                <li>To create website usage statistics
                                </li><li>To be able to recognize, prevent and investigate attacks of this website
                                </li><li>To communicate with you</li><li>
                                    To confirm incoming donations
                                </li><li>
                                    To provide you with relevant information regarding our program (e.g. newsletters)
                                </li>
                                <li>To ensure that your donation is used for the support of Hariyali project

                                </li><li>To comply with obligations to public authorities</li>
                            </ul>
                        </div>
                        <div className="otherpages-subheading textupp">
                            4. Legal basis of the processing
                        </div>
                        <p>We process your personal data provided by you either</p>
                        <p>
                            (i) on the basis of our prevailing legitimate interest according to Article 6 (1) (f) General Data Protection Regulation ("GDPR") to achieve the purposes set out above
                            <br />
                            (ii) on the basis of the necessity for the performance of the contract we have concluded with you or to take steps at your request prior to entering into such an agreement (Article 6 (1) (b) GDPR) or
                            <br />
                            (iii) on the basis of the necessity to comply with legal obligations to which we are subject (Article 6 (1) (c) GDPR). If we process your data on the basis of your consent (Article 6(1)(a) GDPR), we will ask for your consent in a separate process.

                        </p>
                        <div className="otherpages-subheading textupp">
                            5. Transfer of your personal data
                        </div>
                        <p>As far as this is necessary for the purposes set out above, we will transfer your personal data to the following recipients:</p>
                        <div className="otherpagesulli mb-2r">
                            <ul><li>Mahindra Foundation, Address: K. C. Mahindra Education Trust, Cecil Court, Near Regal Cinema, Mahakavi Bhushan Marg, Mumbai 400 001, India
                            </li><li>IT service providers</li>
                                <li>Public authorities (e.g. Income Tax Dept of India)</li>
                            </ul></div>
                        <p>Mahindra Foundation and Naandi Foundation are located in India which, according to the European Commission, does not provide an adequate level of data protection. We will therefore transfer your personal data to Mahindra Foundation and Naandi Foundation only as necessary for the administration of your donation (Article 49(1)(b) GDPR).</p>
                        <div className="otherpages-subheading textupp">
                            6. Retention periods </div>
                        <p>
                            We will retain your personal data for as long as we reasonably consider it necessary for achieving the purposes set out under Point 1 above and as is permissible under applicable law. We will, in any case, retain your personal data for as long as there are statutory retention obligations or potential legal claims are not yet time-barred.
                        </p>

                        <div className="otherpages-subheading textupp">
                            7. Your rights in connection with your personal data</div>
                        <p>
                            Under applicable law, you have, among others, the rights (under the conditions set out in applicable law)
                        </p>
                        <p> (i) to check whether and what kind of personal data we hold about you and to request copies of such data
                            <br />
                            (ii) to request correction, supplementation or deletion of your personal data that is inaccurate or processed in non-compliance with applicable requirements
                            <br />
                            (iii) to request us to restrict the processing of your personal data
                            <br />
                            (iv) in certain circumstances, to object for legitimate reasons to the processing of your personal data or to revoke consent previously granted for the processing where such revocation does not affect the lawfulness of the processing until the revocation
                            <br />
                            (v) to request data portability
                            <br />
                            (vi) to know the identities of third parties to which your personal data are transferred
                            <br />
                            (vii) to lodge a complaint with the competent authority.

                        </p>
                        <div className="otherpages-subheading textupp">
                            8. Our contact details</div>
                        <p>
                            Please address your requests or questions concerning the processing of your personal data to:
                            <br /><br />
                            <span className="bold"> The Naandi Foundation</span>
                            <br />

                            The Mahindra Foundation, UK<br />
                            MHA MacIntyre Hudson, New Bridge Street House,<br />
                            30-34 New Bridge Street,<br />
                            London EC4V 6BJ<br />
                            <span className="colorgreen"> support@mahindrafoundationuk.org</span>
                            <br /><br />
                            <span className="bold">The Mahindra Foundation</span>
                            <br />

                            K. C. Mahindra Education Trust, <br />
                            Cecil Court, Near Regal Cinema,<br />
                            Mahakavi Bhushan Marg, <br />
                            Mumbai 400 001, India<br />
                            <span className="colorgreen"> support@mahindrafoundation.org</span>
                        </p>
                        <div className="otherpages-subheading textupp">
                            9. Changes to our Privacy Policy</div>
                        <p>
                            Any material changes to the privacy policy will be posted on this page. The updated Privacy Policy will take effect as soon as it has been updated.
                            <br /><br />
                            I have read the above privacy policy and consent to share my data for the <span className="colorgreen">Hariyali project</span> .

                        </p>
                    </div> */}
          <div className="col-12">
            <p>Project Hariyali is a joint initiative of Mahindra Foundation and Naandi Foundation which focusses on improving India's green cover and protecting biodiversity. It is the fulfillment of a shared vision of Mahindra Foundation and Naandi Foundation for the preservation of the environment which includes but is not restricted to large scale tree plantation, natural resource management, global organic farming protocols to support local community livelihoods, enriching the agricultural eco system and build functional forests. </p>

            <p>In this collaboration, Naandi Foundation shall be responsible for all the on-ground implementation as well as the day-to-day management of Project Hariyali. Whereas, Mahindra Foundation shall be responsible for creating awareness about Project Hariyali, resource mobilization, grant management, corporate and retail partnerships, donor servicing, reporting and communications, monitoring and evaluation of this Project.</p>

            <p>Mahindra Foundation and Naandi Foundation are committed to protecting the privacy and security of your personal data. Your privacy is important to us. </p>

            <p>This privacy policy provides you with information on how Mahindra Foundation having its registered office at Gateway Building, Apollo Bunder, Colaba, Mumbai 400 001, Maharashtra, India and Naandi Foundation having its registered office at 502, Trendset Towers, Road No 2, Banjara Hills, Hyderabad 500 034, Telangana, India (together referred to as “we”, “us”, “our”) will process your personal data as (i) a (potential) donor; and as (ii) a user of this website. </p>

            <p>By visiting this website, you expressly give us consent to process your personal data in accordance with this privacy policy. If you do not agree to the terms of the privacy policy, please do not use or access this website.</p>

            <p><b>1.	Which of your data we process</b></p>

            <p><b>Website visitors:</b> In the course of your visit of this website, we will automatically collect the following information:</p>

            <p><li> the selected page on the website (URL);</li></p>
            <p><li> date and the time of your visit of this website;</li></p>
            <p><li> your IP address;</li></p>
            <p><li> name and version of your web browser;</li></p>
            <p><li> the website (URL) you have visited before you accessed this website; and</li></p>
            <p><li> certain cookies (see point 2 below).</li></p>

            <p><b>Donors:</b> We collect personal data (name, email address, residential address, citizenship, Permanent Account Number (PAN) for Indians, passport number (for foreign citizens) from you directly in course of your donation to Project Hariyali.</p>

            <p>There is no obligation to provide the data that we ask you for. However, if you do not provide your personal data, you will not be able to make use of all the functions of this website or donate.</p>
            <p><b>2.	Cookies</b></p>

            <p>This website uses so-called cookies. A cookie is a small file that may be installed on your computer when you visit a website. Cookies are generally used to provide site visitors with additional functionality within the site. They may for example be created to keep track of your visit and support your navigation of the website, help you resume where you left off and/or remember your preferences and settings when you visit the website again. Cookies cannot access, read, or modify any other data on your computer.</p>

            <p>Most of the cookies used on this website are session cookies. They are automatically deleted once you leave the website. On the other hand, persistent cookies remain on your computer until you delete them in your browser. We use persistent cookies to recognize you when you visit this website the next time.</p>

            <p>If you want to control the cookies installed on your computer, you can modify your browser settings so that it notifies you when a website wants to install a cookie, or you can block cookies altogether. You can also delete cookies that have already been installed on your computer. Refer to the ‘Help’ function within your browser for more information on how to do these things.</p>

            <p>Please note, however, that disabling cookies might affect your online experience and/or prevent you from taking full advantage of the website as some cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies. These cookies do not store any personally identifiable information.</p>

            <p><b>3.	Purpose for which we process your data</b></p>

            <p>We will process your personal data set out in point 1 for the following purposes:</p>

            <p><li>	to make this website and its services available to you and to further optimize and develop this website</li></p>
            <p><li>	to create website usage statistics</li></p>
            <p><li>	to communicate with you</li></p>
            <p><li>	to confirm incoming donations</li></p>
            <p><li>	to respond to queries or requests submitted by you</li></p>
            <p><li>	to process any payment(s) made by you</li></p>
            <p><li>	to provide you with relevant information regarding Project Hariyali that you have expressly chosen to receive (e.g., newsletters)</li></p>
            <p><li>	to review and respond to your feedback, comments, or other information you submit on the website</li></p>
            <p><li>	to ensure that your donation is used for Project Hariyali</li></p>
            <p><li>	to provide you with regular updates on the utilization of your funds and growth of the tree(s) planted</li></p>
            <p><li>	to be able to recognize, prevent and investigate attacks on this website</li></p>
            <p><li>	to protect our rights and legitimate interests</li></p>
            <p><li>	to comply with obligations to public authorities</li></p>

            <p><b>4.	Legal basis of the processing</b></p>

            <p>We process your personal data provided by you either (i) on the basis of our prevailing legitimate interest to achieve the purposes set out above; or (ii) on the basis of the necessity for the performance of the contract we have concluded with you or to take steps at your request prior to entering into such an agreement; or (iii) on the basis of the necessity to comply with legal obligations to which we are subject; or (iv) on a voluntary basis for any one or more of the specified purpose(s) set out above and in respect of which you have not indicated to us that you do not consent to the use of your personal data. If we process your data on the basis of your consent, we will ask for your consent in a separate process. </p>

            <p><b>5.	Transfer of your personal data</b></p>

            <p>As far as this is necessary for the purposes set out above, we will transfer your personal data to the following recipients who have a need to know and who will process it for us based on our instructions and for no other purpose:</p>

            <p><li>	Service provider(s) that we may use to support us on the functionalities and performance of the website as well as for the reasons consistent with the purposes for which information (including personal data) was collected and/or other purposes as per applicable law. Please note that when you are re-directed to the payment gateway for your donation, please be sure to review any linked policies provided during payment processing as they will apply to you.</li></p>
           <p><li>	Public authorities (e.g., tax authorities, government agencies, law enforcement agencies) or third parties as required by applicable law.</li></p>

            <p>We only transfer your personal data to recipients that have an adequate level of data protection by implementing appropriate technical and organizational security measures, or we take measures to ensure that all recipients provide an adequate level of data protection as prescribed by applicable law. </p>

            <p><b>6.	Security of your personal data </b></p>  

            <p>We are strongly committed to protecting your privacy and the security of your personal data. Accordingly, we implement appropriate technical and organisational measures to protect personal data and other information that is processed by us.</p>

            <p>While we endeavour to always protect our systems, website, operations and information against unauthorized access, use, modification, and disclosure, due to the inherent nature of the Internet, we cannot guarantee that any information, during transmission or while stored on our systems, will be absolutely safe and secure from intrusion by others.</p>

            <p>You too have an important role in protecting your personal data. You should not share your donor id, password or other authentication data provided to you with anyone. If you have any reason to believe that your donor id or password has been compromised, please contact us as detailed below.</p>

            <p><b>7.	Retention period</b></p>

            <p>We will retain your personal data for as long as we reasonably consider it necessary for achieving the purposes set out under Point 3 above and as is permissible under applicable law. We will, in any case, retain your personal data for as long as there are statutory retention obligations or potential legal claims are not yet time barred.</p>

            <p><b>8.	Your rights in connection with your personal data</b></p>

            <p>We respect your right to access and control your information, and we will respond to your requests for information and, where applicable, will correct, amend, or delete your personal data. In such cases, we will need you to respond with proof of your identity before you can exercise these rights.</p>

            <p>Please note that applicable law might require that we cannot comply with every request. We will be required to keep your personal data due to statutory retention requirements despite your request for erasure.</p>

            <p>Under applicable law, you have, among others, the rights (under the conditions set out in applicable law): </p>
                                                                                                          
            <p>(i) to check whether and what kind of personal data we hold about you and to request copies of such data</p>
            <p>(ii) to request the correction, completion, updation, or erasure of your personal data that is inaccurate or processed in non-compliance with applicable requirements	</p> 
            <p>(iii) to request us to restrict the processing of your personal data </p>
            <p>(iv) in certain circumstances, to object for legitimate reasons to the processing of your personal data or to revoke consent previously granted for the processing where such revocation does not affect the lawfulness of the processing until the revocation. If you have consented to our processing of your personal data, you have the right to withdraw your consent at any time, free of charge.</p>
            <p>(v) to request data portability </p>                                                                   
            <p>(vi) to know the identities of third parties to which your personal data are transferred </p>                                                                               
            <p>(vii) to readily available means of grievance redressal,</p>
            <p>(viii) to lodge a complaint with the competent authority, and</p>
            <p>(ix) to nominate any individual who shall in the event of death, or physical or mental incapacity exercise your rights in accordance with applicable data protection laws.</p>

            <p>If you are no longer interested in receiving any correspondence and/or other marketing information from us, please e-mail your request to us at <a href="mailto:support@hariyali.org.in">support@hariyali.org.in</a></p>

            <p><b>9.	Contact details</b></p>

            <p>Please address your requests, concerns, complaints, or questions concerning the processing of your personal data to: </p>

           <p>Mr. Sunny Gangar, 
            Mahindra Foundation, 
            Gateway Building,
            Apollo Bunder, Colaba, 
            Mumbai 400 001, Maharashtra, India 
            Email: <a href="mailto:support@hariyali.org.in">support@hariyali.org.in</a></p>

            <p><b>10.	Changes to the Privacy Policy</b></p>

            <p>We reserve the right to change this privacy policy at our sole discretion. Any material changes to the privacy policy will be posted on this page. We encourage you to review this privacy policy regularly for such changes. The updated privacy policy will take effect as soon as it has been updated.</p>

            <p>This privacy policy was last updated as of 29th September 2023.</p>

          </div>
        </div>
      </div>
      {/* body */}
    </>
  );
}

export default PolicyPayment;
