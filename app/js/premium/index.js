import { render } from 'react-dom';
import PremiumPage from './premium_page.jsx';
import Songs from './audioplayer/songs';
import entries from './entries';
import * as resize from './resize';

render(
  <PremiumPage songs={Songs} entries={entries} />,
  document.getElementById('premium_page')
)

$(window).on('resize', resize.video)
         .on('resize', resize.tracklist)
         .resize();
