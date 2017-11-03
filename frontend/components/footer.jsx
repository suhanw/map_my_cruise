

import React from 'react';

const Footer = () => (
  <footer>
    <section className="mobile-app-bar">
      <ul>
        <li>If you want actual apps that are useful, please feel free to click on the links.</li>
        <li>
          <a href="https://www.apple.com/ios/app-store/" target="_">
            <figure className='mobile-apple-icon'></figure>
          </a>
        </li>
        <li>
          <a href="https://play.google.com/store?hl=en" target="_">
            <figure className='mobile-google-icon'></figure>
          </a>
        </li>
      </ul>
    </section>

    <section className="products-bar-background">
      <section className="products-bar">
        <figure className="iphone">
        </figure>
        <ul>
          <li className="mapmyrun-link">
            <i className="fa fa-superpowers" aria-hidden="true"></i>
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
          <li><a href="https://www.linkedin.com/in/suhanwijaya/" target="_">Add me on LinkedIn</a></li>
          <li><a href="https://github.com/suhanw" target="_">Add me on Github</a></li>
          <li><a href="https://www.facebook.com/suhanw" target="_">Add me on Facebook</a></li>
        </ul>
        <ul className="help-links">
          <li>HELP</li>
          <li>Account Settings</li>
          <li>Support</li>
          <li>Developer / API</li>
        </ul>
        <ul className='about-us-links'>
          <li>ABOUT ME</li>
          <li>Advertise</li>
          <li>Join Our Team</li>
          <li>Shop Under Armour</li>
        </ul>
        <ul className='fitness-community-links'>
          <li>TOMFOOLERY COMMUNITY</li>
          <li>
            <figure className='fitness-community-icon spock'>
              <a href="https://www.youtube.com/watch?v=cSLeBKT7-sM" target="_">
                <i className="fa fa-hand-spock-o" aria-hidden="true"></i>
              </a>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon paper'>
              <a href="https://www.youtube.com/watch?v=cSLeBKT7-sM" target="_">
                <i className="fa fa-hand-paper-o" aria-hidden="true"></i>
              </a>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon rock'>
              <a href="https://www.youtube.com/watch?v=cSLeBKT7-sM" target="_">
                <i className="fa fa-hand-rock-o" aria-hidden="true"></i>
              </a>
            </figure>
          </li>
          <li>
            <figure className='fitness-community-icon scissors'>
              <a href="https://www.youtube.com/watch?v=cSLeBKT7-sM" target="_">
                <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
              </a>
            </figure>
          </li>
        </ul>
      </section>
    </section>


    <section className="legal-bar">
      <strong>
        <i className="fa fa-superpowers" aria-hidden="true"></i>
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
