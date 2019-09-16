$(document).ready(function() {
  $.getJSON('https://danieltijerina.github.io/LabWeb2019/Lab3/data/grammys.json', function(info) {
    var items = [];
    $.each(info, function(index, value) {
      	items.push("<option value='" + index + "'>" + value.field + "<option/>");
    });
    $('#category_types').append(items);
  });

  $('#category_types').on('change', function() {
    console.log($(this).value);
  });
});