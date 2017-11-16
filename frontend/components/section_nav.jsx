import React from 'react';
import {NavLink} from 'react-router-dom';

// takes in an array of sections

class SectionNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };

    this.renderTabs = this.renderTabs.bind(this);
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
        <NavLink
          key={i}
          exact={true}
          to={tabPath}
          activeClassName="selected-tab">
          <li>
            {this.renderTabName(tabPath)}
          </li>
        </NavLink>
      );
    });
    return tabDoms;
  }

  renderTabName(tabPath) {
    let tabPathArr = tabPath.split('/');
    let tabName;
    if (tabPathArr.length > 2) {
        tabName = tabPathArr[2];
        tabName = tabName.toUpperCase();
        if (tabPathArr[1] === 'friends') {
          return 'FIND FRIENDS';
        }
        return `MY ${tabName}`;
    } else if (tabPathArr[1] === 'dashboard') {
      return 'ACTIVITY FEED';
    } else if (tabPathArr[1] === 'friends') {
      return 'MY FRIENDS';
    }
  }

}


export default SectionNav;
