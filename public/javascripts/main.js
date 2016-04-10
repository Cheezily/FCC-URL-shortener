$(document).ready(function() {

  //change the banner to contain the link url and
  //change the cursor to make the table row look like a link
  $('tr:not(:first)').hover(function() {
    $(this).css('cursor', 'pointer');
    var link = $(this).children('.link').text();
    if (link === "--") {
      $('.goTo').text("Select a Link From the List");
    } else {
      $('.goTo').text("Let's go to " + ($(this).children('.link').text()));
    }
  });

  //redirect the user to the link in the clicked table row
  $('tr:not(:first)').click(function() {
    var link = $(this).children('.link').text();
    if (link != "--") {
      window.document.location = link;
    }
  });

  //resets the banner text. Otherwise, the last link the user hovered over
  //remains there
  $('table').mouseout(function() {
    $('.goTo').text("Select a Link From the List");
  });
});
