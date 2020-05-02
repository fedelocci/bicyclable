
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Col, Nav, NavItem, NavLink, Row, TabContent, TabPane,
} from 'reactstrap';
import classnames from 'classnames';

import TabRoute from './Tabs/TabRoute';

const MENU = {
  ROUTE: 'route',
};

const Informations = ({ info }) => {
  const [menu, setMenu] = useState(MENU.ROUTE);
  const toggle = (m) => setMenu(m);
  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: menu === MENU.ROUTE })}
            onClick={() => { toggle(MENU.ROUTE); }}
          >
            Route
          </NavLink>
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
      <TabContent activeTab={menu}>
        <TabPane tabId={MENU.ROUTE}>
          <Row>
            <Col sm="12">
              <TabRoute info={info} />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

Informations.propTypes = {
  info: PropTypes.arrayOf(PropTypes.shape({})),
};

Informations.defaultProps = {
  info: {},
};

export default Informations;
