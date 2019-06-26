import React from 'react';
import {
 Navbar,
 NavbarBrand,
  } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar style={{backgroundColor:'#009688', color:'#fff'}} light expand="md">
          <NavbarBrand href="/"><h3 style={{color:'#ffffff'}}>Moga Visualizer</h3></NavbarBrand>
          
        </Navbar>
      </div>
    );
  }
}