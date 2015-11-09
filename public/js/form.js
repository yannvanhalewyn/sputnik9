var form = $('.form').find('input, textarea')
.on('keyup blur focus', function(e) {
  var $this = $(this);
  var label = $this.prev('label');
  var classes = [];

  if ($this.is(":focus")) classes.push("highlight");
  if ($this.val().length > 0) classes.push("active");

  label.attr("class", classes.join(" "));
})

$('.tab a').on('click', function(e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);
});
