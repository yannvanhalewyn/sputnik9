// Resizing the tracklist
export function tracklist() {
  var topPadding = 150;
  var height = $(window).height() - $(".controller").height() - topPadding;
  $("#tracklist").css("height", height);
};

// Resizing the iFrame
export function video() {
  var aspectRatio = 9 / 16
  var frame = $('.video-wrap iframe')
  frame.height(frame.width() * aspectRatio)
}
