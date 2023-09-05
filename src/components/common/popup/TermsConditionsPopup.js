import React from "react";
import { Button, Modal, Row } from "react-bootstrap";

const TermsConditionsPopup = ({ showConditons, handleCloseConditions }) => {
  return (
    <Modal
      size="lg"
      show={showConditons}
      onHide={handleCloseConditions}
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <Modal.Header style={{ backgroundColor: "#23aa4a" }} closeButton>
        <Modal.Title>Privacy Policy</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-70h">
        <Row>
          <p>
            Project Hariyali is a joint initiative of Mahindra Foundation and
            Naandi Foundation which focusses on improving India's green cover
            and protecting biodiversity. It is the fulfillment of a shared
            vision of Mahindra Foundation and Naandi Foundation for the
            preservation of the environment which includes but is not restricted
            to large scale tree plantation, natural resource management, global
            organic farming protocols to support local community livelihoods,
            enriching the agricultural eco system and build functional forests.
          </p>
          <p>
            In this collaboration, Naandi Foundation shall be responsible for
            all the on-ground implementation as well as the day-to-day
            management of Project Hariyali. Whereas, Mahindra Foundation shall
            be responsible for creating awareness about Project Hariyali,
            resource mobilization, grant management, corporate and retail
            partnerships, donor servicing, reporting and communications,
            monitoring and evaluation of this Project. Mahindra Foundation and
            Naandi Foundation are committed to protecting the privacy and
            security of your personal data. Your privacy is important to us.
          </p>
          <p>
            This privacy policy provides you with information on how Mahindra
            Foundation having its registered office at Gateway Building, Apollo
            Bunder, Colaba, Mumbai 400 001, Maharashtra, India and Naandi
            Foundation having its registered office at 502, Trendset Towers,
            Road No 2, Banjara Hills, Hyderabad 500 034, Telangana, India
            (together referred to as “we”, “us”, “our”) will process your
            personal data as (i) a (potential) donor; and as (ii) a user of this
            website ___________________.
          </p>
          <p>
            By visiting this website, you expressly give us consent to process
            your personal data in accordance with this privacy policy. If you do
            not agree to the terms of the privacy policy, please do not use or
            access this website.
          </p>
          <p>1. Which of your data we process</p>
          <p>
            Website visitors: In the course of your visit of this website, we
            will automatically collect the following information:
          </p>
          <p>
            <ul>
              <li>• the selected page on the website (URL);</li>
              <li>• date and the time of your visit of this website;</li>
              <li>• your IP address;</li>
              <li>• name and version of your web browser;</li>
              <li>
                • the website (URL) you have visited before you accessed this
                website; and
              </li>
              <li>• certain cookies (see point 2 below).</li>
            </ul>
          </p>
          <p>
            In case someone else uses the “tell a friend” feature on the
            website, or you send us a request via email we will process your
            name and email address.
          </p>
          <p>
            Donors: We collect personal data in course of your donation from you
            directly (name, email address, residential address, citizenship,
            Permanent Account Number (PAN) (for Indians), passport number (for
            foreign citizens) when you provide us with your personal data by
            donating to Project Hariyali. There is no obligation to provide the
            data that we ask you for. However, if you do not provide your
            personal data, you will not be able to make use of all the functions
            of this website or donate.
          </p>
          <p>2. Cookies</p>
          <p>
            This website uses so-called cookies. A cookie is a small file that
            may be installed on your computer when you visit a website. Cookies
            are generally used to provide site visitors with additional
            functionality within the site. They may for example be created to
            keep track of your visit and support your navigation of the website,
            help you resume where you left off and/or remember your preferences
            and settings when you visit the website again. Cookies cannot
            access, read or modify any other data on your computer.
          </p>
          <p>
            Most of the cookies used on this website are session cookies. They
            are automatically deleted once you leave the website. On the other
            hand, persistent cookies remain on your computer until you delete
            them in your browser. We use persistent cookies to recognize you
            when you visit this website the next time.
          </p>
          <p>
            If you want to control the cookies installed on your computer, you
            can modify your browser settings so that it notifies you when a
            website wants to install a cookie or you can block cookies
            altogether. You can also delete cookies that have already been
            installed on your computer. Refer to the 'Help' function within your
            browser for more information on how to do these things.
          </p>
          <p>
            Please note, however, that disabling cookies might affect your
            online experience and/or prevent you from taking full advantage of
            the website as some cookies are necessary for the website to
            function and cannot be switched off in our systems. They are usually
            only set in response to actions made by you to a request for
            services, such as setting your privacy preferences, logging in or
            filling in forms. You can set your browser to block or alert you
            about these cookies. These cookies do not store any personally
            identifiable information.
          </p>
          <p>3. Purpose for which we process your data</p>
          <p>
            We will process your personal data set out in point 1 for the
            following purposes:
          </p>
          <p>
            <ul>
              <li>
                • to make this website and its services available to you and to
                further optimize and develop this website
              </li>
              <li>• to create website usage statistics</li>
              <li>• to communicate with you</li>
              <li>• to confirm incoming donations</li>
              <li>• to respond to queries or requests submitted by you</li>
              <li>• to process any payment(s) made by you</li>
              <li>
                • to provide you with relevant information regarding Project
                Hariyali that you have expressly chosen to receive (e.g.,
                newsletters)
              </li>
              <li>
                • to review and respond to your feedback, comments, or other
                information you submit on the website
              </li>
              <li>
                • to ensure that your donation is used for Project Hariyali
              </li>
              <li>
                • to provide you with regular updates on the utilization of your
                funds and growth of the tree(s) planted
              </li>
              <li>
                • to be able to recognize, prevent and investigate attacks of
                this website
              </li>
              <li>• to protect our rights and legitimate interests</li>
              <li>• to comply with obligations to public authorities</li>
            </ul>
          </p>
          <p>4. Legal basis of the processing</p>
          <p>
            We process your personal data provided by you either (i) on the
            basis of our prevailing legitimate interest to achieve the purposes
            set out above; (ii) on the basis of the necessity for the
            performance of the contract we have concluded with you or to take
            steps at your request prior to entering into such an agreement; or
            (iii) on the basis of the necessity to comply with legal obligations
            to which we are subject. If we process your data on the basis of
            your consent, we will ask for your consent in a separate process.
          </p>
          <p>5. Transfer of your personal data</p>
          <p>
            As far as this is necessary for the purposes set out above, we will
            transfer your personal data to the following recipients who have a
            need to know and who will process it for us based on our
            instructions and for no other purpose:
          </p>
          <p>
            <ul>
              <li>
                • Service provider(s) that we may use to support us on the
                functionalities and performance of the website as well as for
                the reasons consistent with the purposes for which information
                (including personal data) was collected and/or other purposes as
                per applicable law. Please note that when you are re-directed to
                the payment gateway for your donation, please be sure to review
                any linked policies provided during payment processing as they
                will apply to you.
              </li>
              <li>
                • Public authorities (e.g., tax authorities, government
                agencies, law enforcement agencies) or third parties as required
                by applicable law.
              </li>
            </ul>
          </p>
          <p>
            We only transfer your personal data to recipients that have an
            adequate level of data protection by implementing appropriate
            technical and organizational security measures, or we take measures
            to ensure that all recipients provide an adequate level of data
            protection as prescribed by applicable law.
          </p>
          <p>6. Security of your personal data</p>
          <p>
            We are strongly committed to protecting your privacy and the
            security of your personal data. Accordingly, we implement
            appropriate technical and organisational measures to protect
            personal data and other information that is processed by us.
          </p>
          <p>
            While we endeavour to always protect our systems, websites,
            operations and information against unauthorized access, use,
            modification, and disclosure, due to the inherent nature of the
            Internet, we cannot guarantee that any information, during
            transmission or while stored on our systems, will be absolutely safe
            and secure from intrusion by others.
          </p>
          <p>
            You too have an important role in protecting your personal data. You
            should not share your donor id, password or other authentication
            data provided to you with anyone. If you have any reason to believe
            that your donor id or password has been compromised, please contact
            us as detailed below.
          </p>
          <p>7. Retention period</p>
          <p>
            We will retain your personal data for as long as we reasonably
            consider it necessary for achieving the purposes set out under Point
            3 above and as is permissible under applicable law. We will, in any
            case, retain your personal data for as long as there are statutory
            retention obligations or potential legal claims are not yet
            time-barred.
          </p>
          <p>8. Your rights in connection with your personal data</p>
          <p>
            We respect your right to access and control your information, and we
            will respond to your requests for information and, where applicable,
            will correct, amend, or delete your personal data. In such cases, we
            will need you to respond with proof of your identity before you can
            exercise these rights.
          </p>
          <p>
            Please note that applicable law might require that we cannot comply
            with every request. We will be required to keep your personal data
            due to statutory retention requirements despite your request for
            erasure.
          </p>
          <p>
            Under applicable law, you have, among others, the rights (under the
            conditions set out in applicable law):
          </p>
          <p>
            <ol type="i">
              <li>
                to check whether and what kind of personal data we hold about
                you and to request copies of such data
              </li>{" "}
              <li>
                to request the correction, completion, updation, or erasure of
                your personal data that is inaccurate or processed in
                non-compliance with applicable requirements
              </li>{" "}
              <li>
                to request us to restrict the processing of your personal data
              </li>{" "}
              <li>
                in certain circumstances, to object for legitimate reasons to
                the processing of your personal data or to revoke consent
                previously granted for the processing where such revocation does
                not affect the lawfulness of the processing until the
                revocation. If you have consented to our processing of your
                personal data, you have the right to withdraw your consent at
                any time, free of charge.
              </li>{" "}
              <li>to request data portability</li>{" "}
              <li>
                to know the identities of third parties to which your personal
                data are transferred
              </li>{" "}
              <li>to readily available means of grievance redressal,</li>{" "}
              <li>to lodge a complaint with the competent authority, and</li>{" "}
              <li>
                to nominate any individual who shall in the event of death or
                physical or mental incapacity exercise your rights in accordance
                with applicable data protection laws.
              </li>
            </ol>
          </p>
          <p>
            If you are no longer interested in receiving any correspondence
            and/or other marketing information from us, please e-mail your
            request to us at support@hariyali.org.in
          </p>
          <p>9. Contact details</p>
          <p>
            Please address your requests, concerns, complaints, or questions
            concerning the processing of your personal data to:
          </p>
          <p>
            Cecil Court,<br />
            MB Marg, <br />
            near Regal Cinema,<br />
            Apollo Bunder, Colaba, <br />
            Mumbai, Maharashtra 400005 <br />
            support@hariyali.org.in
          </p>
          <p>10. Changes to the Privacy Policy</p>
          <p>
            We reserve the right to change this privacy policy at our sole
            discretion. Any material changes to the privacy policy will be
            posted on this page. We encourage you to review this privacy policy
            regularly for such changes. The updated privacy policy will take
            effect as soon as it has been updated.
          </p>
          <p>This privacy policy was last updated as of 14th August 2023.</p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseConditions}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsConditionsPopup;
