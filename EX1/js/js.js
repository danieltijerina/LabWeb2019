
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$('#escribe_reseña').click(function () {
  $('#seccion_comentario').toggleClass('hidden');
});

/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/
$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function (data) {
    console.log(data);
    var newHtml = '';

    $(data).find('comment').each(function () {
      var div = document.createElement('div');
      div.classList.add('review');
      var name = document.createElement('p');
      name.innerText = $(this).find('name').text();
      name.classList.add('nombre');
      div.append(name);
      var stars = getStarsSpans($(this).find('stars').text());
      console.log(stars);
      div.innerHTML += stars;
      var text = document.createElement('p');
      text.innerText = $(this).find('text').text();
      div.append(text);

      $('#seccion_reviews').append(div);
    });
  },
  error: function (errorMsg) {
    console.log(errorMsg);
  },
});

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#btn-publicar').click(function () {
  if ($('#nombre').val() == "" || $('#comentario').text() == "") {
    $('#error_comment').toggleClass('hidden');
  } else {
    var div = document.createElement('div');
    div.classList.add('review');
    var name = document.createElement('p');
    name.innerText = $('#nombre').val();
    name.classList.add('nombre');
    div.append(name);
    var stars = getStarsSpans($("input[name='rating']:checked").val());
    console.log(stars);
    div.innerHTML += stars;
    var text = document.createElement('p');
    text.innerText = $('#comentario').text();
    div.append(text);

    $('#seccion_reviews').append(div);

    $("input[name='rating']:checked").val(0);
    $('#nombre').val('');
    $('#email').val('');
    $('#comentario').text('');
  }
});

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').click(function() {
  $("input[name='rating']:checked").val(0);
  $('#nombre').val('');
  $('#email').val('');
  $('#comentario').text(''); 

  $('#seccion_comentario').toggleClass('hidden');
});

/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for (let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for (let i = 0; i < 5 - stars; i++) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}