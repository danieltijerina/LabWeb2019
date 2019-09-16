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
		  desc.classList.add('description');
		  nominees_section.append(desc);
	  }
	  $.each(field.categories, function(index, category) {
		  let cat_title = document.createElement('h3');
		  cat_title.innerText = category.category_name
		  nominees_section.append(cat_title);
		  
		  if(category.description) {
			  var cat_desc = document.createElement('p');
			  cat_desc.innerHTML = category.description;
			  cat_desc.classList.add('description');
			  nominees_section.append(cat_desc);
		  }
		  appendNominees(category.nominees, category.winner_id);
	  });
  }
	
  function appendNominees(nominees, winnerId) {
	  let section = $('nominees_section');
	  let nomineeList = document.createElement('ul');
	  
	  $.each(nominees, function(index, nominee) {
		  let nomineeLi = document.createElement('li');

		  let title = document.createElement('h4');
		  title.innerText = nominee.nominee;
		  nomineeLi.appendChild(title);

		  if (index === winnerId) {
			  title.classList.add('winner');
			  let winnerText = document.createElement('span');
			  winnerText.innerText = "WINNER";
			  nomineeLi.appendChild(winnerText);
		  }

		  if (nominee.artist) {
			  let text = document.createElement('p');
			  text.innerHTML = nominee.artist;
			  text.classList.add('description')
			  nomineeLi.appendChild(text);
		  }	

		  if (nominee.info) {
			  let info = document.createElement('p');
			  info.innerHTML = nominee.info;
			  info.classList.add('description');
			  nomineeLi.appendChild(nomineeInfo);
		  }
		  
		  nomineeList.append(nomineeLi);
	  });
	  section.append(nomineeList);
  }
});
