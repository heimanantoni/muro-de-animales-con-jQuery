$(document).ready(function () {
  let btnSearch = $("#btnSearch");

  let formSearch = $("#formSearch");

  let inputSearch = $("#inputSearch");

  // contenedor del buscador
  let containerSearch = $("#containerSearch");
  let nadaEncontrado = $("#nadaEncontrado");
  let zonasEncontradas = $("#zonasEncontradas");
  let animalEncontrado = $("#animalEncontrado");
  let notaEncontrada = $("#notaEncontrada");
  let respuestaEncontrada = $("#respuestaEncontrada");

  let dropdownContent = $("#dropdown-content");
  let containerWall = $("#containerWall");

  // contenedor del buscador

  //(1)------formulario de busqueda------y----mostrar lo encontrado--------------------------------------------------------------------------

  formSearch.submit(function (e) {
    let coincidencia = inputSearch.val();

    if (coincidencia === "") {
      alert("agrega datos correctos");
      return false;
    }
    dropdownContent.hide();
    containerWall.hide();

    let prueba = JSON.parse(localStorage.getItem("zonas"));
    let retiene1;
    let retiene2;
    let coind = [];

    if (prueba !== null) {
      for (let i = 0; i < prueba.length; i++) {
        retiene1 = prueba[i].area.search(coincidencia);

        if (retiene1 !== -1) {
          coind.push({
            zona: prueba[i].area,
          });
        }

        let animal = prueba[i].animales;
        for (let j = 0; j < animal.length; j++) {
          retiene1 = animal[j].animalInput.search(coincidencia);

          if (retiene1 !== -1) {
            coind.push({
              zona: prueba[i].area,
              animal: prueba[i].animales[j].animalInput,
            });
          }
          let notas = animal[j].nota;

          for (let k = 0; k < notas.length; k++) {
            retiene1 = notas[k].comentarioAutor.search(coincidencia);
            retiene2 = notas[k].comentarioText.search(coincidencia);

            if (retiene1 !== -1 || retiene2 !== -1) {
              coind.push({
                zona: prueba[i].area,
                animal: prueba[i].animales[j].animalInput,
                nota: prueba[i].animales[j].nota[k],
              });
            }

            let res = notas[k].respuestas;

            for (let l = 0; l < res.length; l++) {
              retiene1 = res[l].respuestaAutor.search(coincidencia);
              retiene2 = res[l].respuestaTextarea.search(coincidencia);

              if (retiene1 !== -1 || retiene2 !== -1) {
                coind.push({
                  zona: prueba[i].area,
                  animal: prueba[i].animales[j].animalInput,
                  nota: prueba[i].animales[j].nota[k],
                  respuesta: prueba[i].animales[j].nota[k].respuestas[l],
                });
              }
            }
          }
        }
      }

      // console.log(coind);
      nadaEncontrado.html("");
      zonasEncontradas.html("");
      animalEncontrado.html("");
      notaEncontrada.html("");
      respuestaEncontrada.html("");

      let zonasCoincidencia = "";
      let zonasAnimalCoincidencia = "";
      let zonasAnimalComentarioCoincidencia = "";
      let zonasAnimalComentarioRespuestaCoincidencia = "";

      if (coind.length !== 0) {
        for (let i = 0; i < coind.length; i++) {
          let area = coind[i].zona;
          let animal = coind[i].animal;
          let nota1 = coind[i].nota;
          let respuesta1 = coind[i].respuesta;

          let validarArea =
            area !== undefined &&
            animal === undefined &&
            nota1 === undefined &&
            respuesta1 === undefined;

          let validarAreaAnimal =
            area !== undefined &&
            animal !== undefined &&
            nota1 === undefined &&
            respuesta1 === undefined;

          let validarAreaAnimalComentarios =
            area !== undefined &&
            animal !== undefined &&
            nota1 !== undefined &&
            respuesta1 === undefined;

          let validarAreaAnimalComentariosRespuesta =
            area !== undefined &&
            animal !== undefined &&
            nota1 !== undefined &&
            respuesta1 !== undefined;

          if (validarArea) {
            zonasCoincidencia += `<div class="coincidencia">zona : ${area}</div>`;
            zonasEncontradas.html(zonasCoincidencia);
          } else if (validarAreaAnimal) {
            zonasAnimalCoincidencia += `<div class="coincidencia">
                                        <div>zona : ${area}</div>
                                        <div>animal : ${animal}</div>
                                        </div>`;

            animalEncontrado.html(zonasAnimalCoincidencia);
          } else if (validarAreaAnimalComentarios) {
            zonasAnimalComentarioCoincidencia += `<div class="coincidencia">
                                        <div>zona : ${area}</div>
                                        <div>animal : ${animal}</div>
                                        <div>comentario texto : ${nota1.comentarioText}</div>
                                        <div>comentario autor : ${nota1.comentarioAutor}</div>
                                        </div>`;
            notaEncontrada.html(zonasAnimalComentarioCoincidencia);
          } else if (validarAreaAnimalComentariosRespuesta) {
            zonasAnimalComentarioRespuestaCoincidencia += `<div class="coincidencia">
                                                  <div>zona : ${area}</div>
                                                  <div>animal : ${animal}</div>
                                                  <div>comentario texto :  ${nota1.comentarioText}</div>
                                                  <div>comentario autor : ${nota1.comentarioAutor}</div>
                                                  <div>respuesta texto : ${respuesta1.respuestaTextarea}</div>
                                                  <div>respuesta autor : ${respuesta1.respuestaAutor}</div>
                                                  </div>`;

            respuestaEncontrada.html(
              zonasAnimalComentarioRespuestaCoincidencia
            );
          }
        } // fin del for
      } else {
        nadaEncontrado.html(
          `<div class="coincidencia">"NO SE ENCONTRARON COINCIDENCIAS"</div>`
        );
      }
    }
    containerSearch.show();

    formSearch.trigger("reset");
    e.preventDefault();
  });

  //(1.1) -------boton de vista de busqueda desaparecer busqueda aprarecer muro------------------------------------------

  btnSearch.click(function (e) {
    containerSearch.hide();
    dropdownContent.show();
    containerWall.show();
  });
});
