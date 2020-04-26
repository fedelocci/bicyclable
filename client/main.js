import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '/imports/sass/index.scss';

import App from '/imports/ui/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('bicyclable'));
});
