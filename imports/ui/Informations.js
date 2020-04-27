import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Informations = () => (
  <div>
    <Nav tabs>
      <NavItem>
        <NavLink href="#" active>Route</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default Informations;
