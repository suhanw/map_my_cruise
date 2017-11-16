import React from 'react';
import {Link} from 'react-router-dom';

// takes in an array of sections

class SectionNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };

    // this.renderStyles = this.renderStyles.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {

    return(
      <nav className="section-nav">
        <ul>
          {this.renderTabs()}
          <li className="space-filler"></li>
        </ul>
      </nav>
    );
  }

  // renderStyles() {
  //   const {sectionNavTabs} = this.props;
  //   const tabWidth = (1 / sectionNavTabs.length) * 100;
  //
  //   return {
  //     width: `${tabWidth}%`,
  //   };
  // }

  renderTabs() {
    const {selectedTab} = this.state;
    const {sectionNavTabs} = this.props;
    const tabDoms = sectionNavTabs.map((tabPath, i)=>{
      return (
        <Link
          key={i}
          to={tabPath}
          className={(i === selectedTab) ? "selected-tab" : ""}>
          <li>
            {this.renderTabName(tabPath)}
          </li>
        </Link>
      );
    });
    return tabDoms;
  }

  renderTabName(tabPath) {
    if (tabPath === '/dashboard') {
      return 'ACTIVITY FEED';
    } else {
      let tabName = tabPath.split('/')[2];
      tabName = tabName.toUpperCase();
      return `MY ${tabName}`;
    }
  }

  handleClick(i) {

  }
}


export default SectionNav;
