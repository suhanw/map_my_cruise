import React from 'react';

const Footer = () => (
  <footer>
    <section className="mobile-app-bar">
      <ul>
        <li>Track every mile you run, connect your devices, and get closer to your next PR.</li>
        <li>
          <figure className='mobile-apple-icon'>
          </figure>
        </li>
        <li>
          <figure className='mobile-google-icon'>
          </figure>
        </li>
      </ul>
    </section>

    <section className="products-bar-background">
      <section className="products-bar">
        <figure className="iphone">
        </figure>
        <ul>
          <li className="mapmyrun-link">
            <i className="fa fa-wheelchair-alt" aria-hidden="true"></i>
            mapmycruise
          </li>
          <li className="fitness-link">fitness</li>
          <li className="walk-link">walk</li>
          <li className="ride-link">ride</li>
          <li className="hike-link">hike</li>
        </ul>
      </section>
    </section>

    <section className="links-bar-background">
      <section className="links-bar">
        <ul className="social-links">
          <li>SOCIAL</li>
          <li>Like us on Facebook</li>
          <li>Follow us on Twitter</li>
          <li>MapMyRun Blog</li>
        </ul>
        <ul className="help-links">
          <li>HELP</li>
          <li>Account Settings</li>
          <li>Support</li>
          <li>Developer / API</li>
        </ul>
        <ul className='about-us-links'>
          <li>ABOUT US</li>
          <li>Advertise</li>
          <li>Join Our Team</li>
          <li>Shop Under Armour</li>
        </ul>
        <ul className='fitness-community-links'>
          <li>UA FITNESS COMMUNITY</li>
          <li>
            <figure className='fitness-community-icon paper'>
              <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon rock'>
              <i className="fa fa-hand-rock-o" aria-hidden="true"></i>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon scissors'>
              <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon spock'>
              <i className="fa fa-hand-spock-o" aria-hidden="true"></i>
            </figure>
          </li>
        </ul>
      </section>
    </section>


    <section className="legal-bar">
      <strong>
        <i className="fa fa-wheelchair-alt" aria-hidden="true"></i>
        UNDER THE SEA
      </strong>
      <ul>
        <li>© 2017 Wijaya®, Inc. All rights reserved</li>
        <li>Privacy Policy</li>
        <li>Terms of Use</li>
      </ul>
    </section>
  </footer>
);

export default Footer;
