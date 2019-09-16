$(document).ready(function() {
  /*$.getJSON('https://danieltijerina.github.io/LabWeb2019/Lab3/data/grammys.json', function(info) {
    var items = [];
    $.each(info, function(index, value) {
        console.log(info);
      	items.push("<option value='" + index + "'>" + value.field + "</option>");
    });
    $('#category_types').append(items);
  });*/
  
  $.ajax({
    url: 'https://mauriciogm97.github.io/ClaseWeb/lab3/data/grammys.json',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      var items = [];
      $.each(data.fields, function(index, value) {
	console.log(value);
        items.push("<option value='" + index + "'>" + value.field + "</option>");
      });
      $('#category_types').append(items);     
    },
	  error : function(errorMsg) {
		  console.log(errorMsg);
	  }
  });

  $('#category_types').on('change', function() {
    console.log($(this).value);
  });
});
