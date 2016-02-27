import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Redirect } from 'react-router';
import PremiumPage from './premium_page.jsx';
import Entry from './entry/entry.jsx';
import * as resize from './resize';

$(document).ready(() => {
  let lastEntry = require('./entries').length - 1
  render(
    <Router>
      <Route path="/" component={PremiumPage} >
        <IndexRedirect to={`/entries/${lastEntry}`} />
        <Route path="/entries/:entryId" component={Entry} />
      </Route>
      <Redirect from="*" to="/" />
    </Router>,
    document.getElementById('premium_page')
  )

  $(window).on('resize', resize.video)
           .on('resize', resize.tracklist)
           .resize();
})
