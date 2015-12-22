//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});



$(document).ready(function() {

  // Pre cache elements for later reference
  var progressWrap = $('.progress-wrap');
  var progressBar = $('.progress-bar');
  var aboutSection = $('#about')[0];

  // on browser resize...
  $(window).resize(moveProgressBar);

  // SIGNATURE PROGRESS
  function moveProgressBar() {
    console.log("moveProgressBar");
    var getPercent = (progressWrap.data('progress-percent') / 100);
    var getProgressWrapWidth = progressWrap.width();
    var progressTotal = getPercent * getProgressWrapWidth;
    var animationLength = 2500;

    // on page load, animate percentage bar to data percentage length
    // .stop() used to prevent animation queueing
    progressBar.stop().animate({
      left: progressTotal
    }, animationLength);
  }

  // Only move progress bar when user has arrived at about section
  var hasMoved = false;
  $(window).on('scroll', function(e) {
    if (aboutSection.getBoundingClientRect().top <= 0) {
      if (!hasMoved) {
        moveProgressBar();
        hasMoved = true;
      }
    }
  });
})
