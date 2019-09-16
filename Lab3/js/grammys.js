$(document).ready(function() {
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
	    
      $('#category_types').on('change', function() {
        displaySection(data.fields[$(this).val()]);
      });
    },
    error : function(errorMsg) {
      console.log(errorMsg);
    }
  });
	
  function displaySection(field) {
	  let section = $('#nominees_section');
	  section.html('');
	  
	  let title = document.createElement('h2');
	  title.innerText = field.field;
	  nominees_section.append(title);

	  if (field.description) {
		  var desc = document.createElement('p');
		  desc.innerHTML = field.description;
		  desc.addClass('description');
		  nominees_section.append(desc);
	  }
  }
});
