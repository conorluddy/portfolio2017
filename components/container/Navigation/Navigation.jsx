/*
  Navigation
  Stateful Container Component

  Component description...

  To import this elsewhere (directory nesting level may vary):
  import Navigation from '../../Navigation/Navigation.jsx';
*/

import React from 'react';
import { Link, IndexLink } from 'react-router';
import Grip from '../../presentation/Grip/Grip.jsx';
import NavigationSection from '../../presentation/NavigationSection/NavigationSection.jsx';
import NavOverlay from '../../presentation/NavOverlay/NavOverlay.jsx';
import TriggerArrow from '../../presentation/TriggerArrow/TriggerArrow.jsx';

class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      section: 'landing',
      transparency: 90
    };

    this.setSectionDevelopment = this.setSectionDevelopment.bind(this);
    this.setSectionPhotography = this.setSectionPhotography.bind(this);
    this.setSectionLanding = this.setSectionLanding.bind(this);
    this.setSectionBiased = this.setSectionBiased.bind(this);
    this.clearSection = this.clearSection.bind(this);
    this.stashNav = this.stashNav.bind(this);
  }

  setSectionDevelopment() {
    if (this.state.section !== 'development') {
      this.setState({
        section: 'development',
        transparency: 60
      });
    } else {
      this.clearSection();
    }
    this.props.setNavActive(1);
  }

  setSectionPhotography() {
    if (this.state.section !== 'photography') {
      this.setState({
        section: 'photography',
        transparency: 60
      });
    } else {
      this.clearSection();
    }
    this.props.setNavActive(1);
  }

  setSectionBiased() {
    if (this.props.routeSection === 'dev') {
      this.setSectionDevelopment();
    } else if (this.props.routeSection === 'photo') {
      this.setSectionPhotography();
    } else {
      this.setSectionLanding();
    }
  }

  setSectionLanding() {
    if (this.state.section !== 'landing') {
      this.setState({
        section: 'landing',
        transparency: 90
      });
    } else {
      this.clearSection();
    }
    this.props.setNavActive(1);
  }

  stashNav() {
    this.setState({section: null});
    this.props.setNavActive(0);
  }

  clearSection() {
    this.setState({
      section: 'landing',
      transparency: 90
    });
    this.props.setNavActive(1);
  }

  getClassNames() {
    return this.state.section ? '' : ' is-stashed';
  }

  componentWillMount() {
    for (var i = 0; i < this.props.tree.children.length; i++) {
      if (this.props.tree.children[i].name === 'development') {
        this.setState({
          'treeDev': this.props.tree.children[i]
        });
      }
      if (this.props.tree.children[i].name === 'photography') {
        this.setState({
          'treePhoto': this.props.tree.children[i]
        });
      }
    }
  }

  render() {
    let sectionNav = null;
    let photoNavItems = [];
    let devNavItems = [];
    let tempName;

    for (var i = 0; i < this.state.treePhoto.children.length; i++) {
      tempName = this.state.treePhoto.children[i].name;
      tempName = this.state.treePhoto.children[i].extension ? tempName.substring(0, tempName.length - this.state.treePhoto.children[i].extension.length) : tempName;

      photoNavItems.push({
        label: tempName,
        path: '/photography/' + tempName,
        md: this.state.treePhoto.children[i].path,
        children: this.state.treePhoto.children[i].children
      });
    }

    for (var i = 0; i < this.state.treeDev.children.length; i++) {
      tempName = this.state.treeDev.children[i].name;
      tempName = this.state.treeDev.children[i].extension ? tempName.substring(0, tempName.length - this.state.treeDev.children[i].extension.length) : tempName;

      devNavItems.push({
        label: tempName,
        path: '/development/' + tempName,
        md: this.state.treeDev.children[i].path,
        children: this.state.treeDev.children[i].children
      });
    }

    if (!this.state.section) {
      sectionNav = <TriggerArrow handleClick={this.setSectionBiased} nsew='nw' />
    } else if (this.state.section === 'development') {
      sectionNav = <NavigationSection section={this.state.section} navList={devNavItems} clearSection={this.clearSection} stashNav={this.stashNav} side='left' />;
    } else if (this.state.section === 'photography') {
      sectionNav = <NavigationSection section={this.state.section} navList={photoNavItems} clearSection={this.clearSection} stashNav={this.stashNav} side='right' />;
    }

    return (
      <div className="cpnt-navigation">
          <NavOverlay className={this.getClassNames()} setSectionDevelopment={this.setSectionDevelopment} setSectionPhotography={this.setSectionPhotography} sectionNav={sectionNav} transparency={this.state.transparency} stashNav={this.stashNav} />
      </div>
    );
  }

}

export default Navigation;
