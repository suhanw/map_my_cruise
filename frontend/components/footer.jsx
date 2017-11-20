import React from 'react';
import {Link} from 'react-router-dom';

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
            <a href ="http://www.mapmyrun.com/" target="_">
              <div className="mapmyrun-logo"></div>
              mapmyrun
            </a>
          </li>
          <li className="fitness-link"><a href="http://www.mapmyfitness.com/" target="_">fitness</a></li>
          <li className="walk-link"><a href="http://www.mapmywalk.com/" target="_">walk</a></li>
          <li className="ride-link"><a href="http://www.mapmyride.com/" target="_">ride</a></li>
          <li className="hike-link"><a href="http://www.mapmyhike.com/" target="_">hike</a></li>
        </ul>
      </section>
    </section>

    <section className="links-bar-background">
      <section className="links-bar">
        <ul className="social-links">
          <li>SOCIAL</li>
          <li><a href="https://www.linkedin.com/in/suhanwijaya/" target="_">Add me on LinkedIn</a></li>
          <li><a href="https://github.com/suhanw" target="_">Add me on Github</a></li>
          <li><a href="https://angel.co/suhanw" target="_">Add me on AngelList</a></li>
        </ul>
        <ul className='about-us-links'>
          <li>AFFILIATIONS</li>
          <li><a href="https://www.appacademy.io/" target="_">App Academy</a></li>
          <li><a href="http://www.ucla.edu/" target="_">UC, Los Angeles</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Singapore" target="_">Singapore</a></li>
        </ul>
        <ul className="help-links">
          <li>ABOUT ME</li>
          <li><a href="https://www.sixflags.com/magicmountain" target="_">Roller Coasters</a></li>
          <li><a href="http://www.imdb.com/?ref_=nv_home" target="_">Movies</a></li>
          <li><a href="https://gimletmedia.com/reply-all/" target="_">Podcasts</a></li>
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
        <i className="fa fa-fighter-jet" aria-hidden="true"></i>
        UNDER THE SEA
      </strong>
      <ul>
        <li>© 2017 Wijaya®, Inc. All rights reserved</li>
        <li>No Privacy Policy</li>
        <li>No Terms of Use</li>
      </ul>
    </section>
  </footer>
);

export default Footer;
