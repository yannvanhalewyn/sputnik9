import { render } from 'react-dom';
import { Router, Route, IndexRedirect } from 'react-router';
import PremiumPage from './premium_page.jsx';
import Entry from './entry/entry.jsx';
import * as resize from './resize';

render(
  <Router>
    <Route path="/" component={PremiumPage} foo={"bar"}>
      <IndexRedirect to="/entries/0" />
      <Route path="entries/:entryId" component={Entry} />
    </Route>
  </Router>,
  document.getElementById('premium_page')
)

$(window).on('resize', resize.video)
         .on('resize', resize.tracklist)
         .resize();
