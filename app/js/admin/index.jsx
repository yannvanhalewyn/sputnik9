import React from 'react';
import { render } from 'react-dom';
import CodesTable from './components/codes_table.jsx';


var codes = [];
try {
  codes = JSON.parse(document.getElementById('unlock_codes').text)
} catch(err) {
  codes = [];
}

render(<CodesTable codes={codes}/>, document.getElementById('admin-react-parent'))
