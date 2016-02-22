import { render } from 'react-dom';
import PremiumPage from './premium_page.jsx';
import Songs from './audioplayer/songs';
import * as resize from './resize';
import './video_swapper'

render(
  <PremiumPage songs={Songs}/>,
  document.getElementById('premium_page')
)

$(window).on('resize', resize.video)
         .on('resize', resize.tracklist)
         .resize();
