$(document).ready(function () {
  // botones de guardar de cada formulario
  let btnZonas = $("#btnZonas");
  // let btnAnimalGuardar = document.getElementById("btnAnimalGuardar");
  // let btnAnimalComentar = document.getElementById("btnAnimalComentar");
  let btnRespuestaEnviar = $("#btnRespuestaEnviar");

  // contenedores dinamicos de zonas y animales
  let containerDropdown = $("#containerDropdown");
  let sectionComentarios = $("#sectionComentarios");

  //titulos de zonas y formularios
  let titleZonaAnimal = $("#titleZonaAnimal");
  let titleFormAnimal = $("#titleFormAnimal");

  //captura de formularios
  let formZonas = $("#formZonas");
  let formAnimal = $("#formAnimal");
  let formComentarios = $("#formComentarios");
  let formRespuesta = $("#formRespuesta");

  //input de zonas y animales
  let inputZona = $("#zonasGuardar");
  let inputAnimal = $("#animalGuardar");
  let textareaComentario = $("#textareaComentario");
  let autorComentario = $("#autorComentario");
  let textareaRespuesta = $("#textareaRespuesta");
  let autorRespuesta = $("#autorRespuesta");

  //contenedor burger
  let btnBurger = $("#btnBurger");
  let containerBurger = $(".aparecer");

  // contenedor del buscador
  let dropdownContent = $("#dropdown-content");
  let containerWall = $("#containerWall");

  // on() click
  $(document).on("click", 'button[class="btn-especies"]', especie);
  $(document).on("click", 'button[name="btn-animal"]', animalesDrop);
  $(document).on("click", 'a[name="comentarios"]', comentarios);
  $(document).on("click", 'button[name="responder"]', responder);
  $(document).on("click", 'button[name="resTotal"]', resTotal);

  btnBurger.click(() => {
    if (containerBurger.hasClass("aparecer")) {
      containerBurger.removeClass("aparecer");
    } else {
      containerBurger.addClass("aparecer");
    }
  });

  //-------------------------------------------------------------------------------------------------------------
  //(2)--boton de aparecer el formulario de crear zonas ---------------------------------------------------------
  btnZonas.click(function () {
    formZonas.show();
    formAnimal.hide();
    sectionComentarios.hide();

    containerBurger.removeClass("aparecer");
  });

  // caja.click(function(){
  // 	$(this).css("background", "blue")
  // 		   .css("color", "white");
  // });

  //--------------------------------------------------------------------------------------------------------------
  // (2.1) formulario de guardar zonas----------al dar  click btnZonas------------------------------------------------------------------------
  formZonas.submit(zonas);
  function zonas(e) {
    let area = inputZona.val();
    console.log(area);

    if (area === "") {
      alert("agrega datos correctos");
      return false; // al haber dejado alguno de estos espacios libres entra al if y no se ejecuta mas codigo
    }

    let zona = {
      id: Date.now(),
      area,
      animales: [],
    };
    // console.log(zona);
    if (localStorage.getItem("zonas") === null) {
      let zonas = [];
      zonas.push(zona);

      localStorage.setItem("zonas", JSON.stringify(zonas)); // lo guardo en mi localStorage
      alert("la zona se agrego correctamente");
    } else {
      // al ya haber algo almacenado en le localStorage en el proximo usario entra al else
      let zonas = JSON.parse(localStorage.getItem("zonas")); // capturo los datos que tengo en el localStorge
      let found = zonas.find((element) => element.area === area);
      if (found !== undefined) {
        formZonas.trigger("reset");
        alert("la zona ya existe agrega otra zona ");
        return false;
      } else {
        zonas.push(zona); // ya teniendo mi arrays capturado del local storage le agrego mas datos ingresados actualmente
        localStorage.setItem("zonas", JSON.stringify(zonas)); // vuelvo y guardo todo en mi localStogaje
        alert("la zona se agrego correctamente");
      }
    }

    e.preventDefault();
    formZonas.trigger("reset");
    formZonas.hide();
    containerBurger.addClass("aparecer");

    leerZona();
  } // fin crear zonas

  // (2.2) aqui se creara cada boton de especie = zona------ y al lado el dropown--------------------------------------------------------------------
  function leerZona() {
    let zonas = JSON.parse(localStorage.getItem("zonas"));

    containerDropdown.html(""); //cada vez que pase por aqui se blanquean mis botones y se vuelven a pintar al recorrer el array si no se pintaria lo de mi array mas lo que ya hay

    // en este for estoy recorriendo mi arrays de objetos almacenados en mi local storage

    if (localStorage.getItem("zonas") == null) {
      return false;
    } else {
      let dropdowAnimales = "";
      for (let i = 0; i < zonas.length; i++) {
        let area = zonas[i].area;
        let id = zonas[i].id;

        dropdowAnimales += `<div class="btn-group  btnGrupoDrop">
        <button type="button" id=${id} class="btn-especies" >${area}</button>
        <button type="button"  id=${id} name="btn-animal" class="btn-animal dropdown-toggle dropdown-toggle-split "
            data-bs-toggle="dropdown" aria-expanded="false" >
            <span class="visually-hidden">Toggle Dropdown</span>
        </button>
        <ul  class="dropdown-menu" id="ulAnimal${id}"></ul>
       
    </div>`;

        // ulAnimal.innerHTML += `<li><a id=${id} name="comentarios" class="dropdown-item" href="#">${animal}</a></li>`;
      } // fin del for
      containerDropdown.html(dropdowAnimales);
    }
  } // fin leer();
  leerZona(); // aqui are el llamado a la function leerZona para que se pinte en mi pantalla lo  que hay dentro de mi localStorage

  //(2.3)----al dar click encima de una especie= zonaCreada onClick=especie(${id})-- se abrira un formulario para agregar animales a esa zona---------------------------------------
  let idZona;
  function especie(e) {
    idZona = parseInt(this.id);

    let zonas = JSON.parse(localStorage.getItem("zonas"));

    let positionZona = zonas.findIndex(function (element) {
      return idZona === element.id;
    });
    console.log(positionZona);
    let formZona = zonas[positionZona].area;
    titleFormAnimal.html(
      ` <h2 class="titleZonas titleH2">agregar un nuevo animal a la zona de ${formZona}</h2>`
    );

    formZonas.hide();
    formAnimal.show();

    sectionComentarios.hide();
    containerBurger.removeClass("aparecer");
  }

  // (2.4) ----------formulario de crear y guardar animales por especies en el local storage ------------------------
  formAnimal.submit(animall);
  function animall(e) {
    let zonas = JSON.parse(localStorage.getItem("zonas"));
    let animalInput = inputAnimal.val();

    if (animalInput === "") {
      alert("agrega datos correctos");
      return false; // al haber dejado alguno de estos espacios libres entra al if y no se ejecuta mas codigo
    }

    let especie = {
      id: Date.now(),
      animalInput,
      nota: [],
    };

    //for para verificar que no alla animales repetidos- en ninguna zona------------------------------------------------
    let found;
    for (let i = 0; i < zonas.length; i++) {
      found = zonas[i].animales.find(
        (element) => element.animalInput === animalInput
      );
      if (found !== undefined) {
        // si es diferente de undefined es porque si lo consiguio entonces una alerta de que no puede repetir animales en ninguna zona
        found = false;
        alert("el animal ya esta agregado en esta u otra zona");
        break;
      }
    }

    if (found === undefined) {
      let auxZona = zonas.find((el) => idZona === el.id);
      auxZona.animales.push(especie);

      let position = zonas.findIndex(function (element) {
        return idZona === element.id;
      });
      zonas[position] = auxZona;
      localStorage.setItem("zonas", JSON.stringify(zonas));
      alert(`el animal : ${animalInput} se agrego correctamente`);
    }

    e.preventDefault();
    formAnimal.trigger("reset");
    containerBurger.removeClass("aparecer");
  }

  //(3)---------------------------------------------------------------------------------------------------------------------------------------------------------
  //(3)--Muro------click en la flecha del drop me correra la function de leer los animales dentro del dropdown---onClick=animalesDrop(${id})----------------------------------------------

  function animalesDrop(e) {
    formZonas.hide(); // me desaparece el formulario de zonas y el formulario de animales
    formAnimal.hide();
    sectionComentarios.hide(); // me esconde la section de comentarion que esta en la section de containerWall
    idZona = parseInt(this.id);
    leerAnimal();
  }

  //(3.1) --------aqui se crearan los animales dentro del button drop ----esta function correra al dar click en la flecha drop--------------------------------------------------------------

  function leerAnimal() {
    let zonas = JSON.parse(localStorage.getItem("zonas"));
    let ulAnimal = $("#ulAnimal" + idZona);

    ulAnimal.html("");
    let auxAnimal = zonas.find((el) => idZona === el.id);
    let especies = auxAnimal.animales;
    // en este for estoy recorriendo mi arrays de objetos almacenados en mi local storage
    let animalEspecie = "";
    for (let i = 0; i < especies.length; i++) {
      let animal = especies[i].animalInput;
      let id = especies[i].id;

      animalEspecie += `<li><a id=${id} name="comentarios" class="dropdown-item" href="#">${animal}</a></li>`;
    }
    ulAnimal.html(animalEspecie);
  }

  //-(3.2)------ onClick=comentarios(${id}) ---aparecera  el formulario-------------------------------------------------------------------------------------------------------------
  let idAnimal;
  function comentarios(id) {
    sectionComentarios.show();
    idAnimal = parseInt(this.id);
    containerBurger.removeClass("aparecer");

    leerComentarios();
  }

  //(3.3)------ apareceran todos los comentarios y el tutilo dinamico de zona  y animal----------------------------------------------

  function leerComentarios() {
    let containerComentario = $("#containerComentario");
    let zonas = JSON.parse(localStorage.getItem("zonas"));

    let positionZona = zonas.findIndex(function (element) {
      return idZona === element.id;
    });
    let auxZona = zonas.find((el) => idZona === el.id);

    let positionAnimal = auxZona.animales.findIndex(
      (element) => element.id === idAnimal
    );
    // let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

    // console.log(zonas[positionZona].animales[positionAnimal].nota);
    let zonaAnimal = zonas[positionZona].area;
    let especieAnimal =
      zonas[positionZona].animales[positionAnimal].animalInput;

    titleZonaAnimal.html(
      ` <h2 class="titleComentarios" id="zonaAnimal">zona de : ${zonaAnimal} - animal : ${especieAnimal}</h2>`
    );
    containerComentario.html("");
    let nota = zonas[positionZona].animales[positionAnimal].nota;

    let comentariosTodos = "";

    for (let i = 0; i < nota.length; i++) {
      let id = zonas[positionZona].animales[positionAnimal].nota[i].id;
      let x =
        zonas[positionZona].animales[positionAnimal].nota[i].respuestas.length;

      let comentarioText =
        zonas[positionZona].animales[positionAnimal].nota[i].comentarioText;

      let comentarioAutor =
        zonas[positionZona].animales[positionAnimal].nota[i].comentarioAutor;

      let fecha = zonas[positionZona].animales[positionAnimal].nota[i].fecha;

      comentariosTodos += `<div class="cadaComentario" id="cadaComentario">
        <div class="sectionComentario " id="sectionComentario${id}">
           <li class="liComentario">${comentarioText}</li>
           <li class="autorComentario liComentarios">autor:${comentarioAutor}</li>
           <li class="fechaComentario liComentarios">fecha:${fecha}</li>
           <div class="respuestaComentario" id="respuestaComentario${id}"></div>
        </div>
        <button id=${id} name="responder" class="btnResponder btnPrimary" type="button" 
         data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">responder</button>
        <button id=${id} name="resTotal" class="btnRespuestas btnPrimary">ver ${x} respuestas</button>
        <div id= "cajaRespuesta${id}" class="cajaRespuesta"></div>
    </div>`;
    }
    containerComentario.html(comentariosTodos);
  }

  //(4)---- comentarios titulo dinamico-------------------------------------------------------------------------
  //(4) ---FormComentarios---guardo comentarios ----despues del submit comentarios vuelvo y hago que se muestren los comentarios-------------------------

  formComentarios.submit(comentar);
  function comentar(e) {
    let zonas = JSON.parse(localStorage.getItem("zonas"));
    let comentarioText = textareaComentario.val();
    let comentarioAutor = autorComentario.val();

    if (comentarioText === "" || comentarioAutor === "") {
      alert("agrega datos correctos");
      return false;
    }

    let comentario = {
      id: Date.now(),
      comentarioText,
      comentarioAutor,
      fecha: new Date().toISOString().slice(0, 10),
      respuestas: [],
    };

    let position = zonas.findIndex(function (element) {
      return idZona === element.id;
    });
    let auxZona = zonas.find((el) => idZona === el.id);

    let position2 = auxZona.animales.findIndex(
      (element) => element.id === idAnimal
    );
    let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

    auxAnimal.nota.unshift(comentario);
    zonas[position].animales[position2] = auxAnimal;
    localStorage.setItem("zonas", JSON.stringify(zonas));
    // console.log(zonas);
    formComentarios.trigger("reset");
    e.preventDefault();
    leerComentarios();
  }

  //(4.1)--------onClick=resForm(${id})-bandera al cliclear responder-----se abrira un formulario MODAL de respuestas-------------------------
  let idResponder;
  function responder() {
    idResponder = parseInt(this.id);
    let cajaRes = $(`#cajaRespuesta${idResponder}`);
    cajaRes.html("");
  }
  //(4.2)-----modal formulario de enviar respuestas-----guardar respuestas---------------------------------------------------------------------

  btnRespuestaEnviar.click(function () {
    let zonas = JSON.parse(localStorage.getItem("zonas"));
    let respuestaTextarea = textareaRespuesta.val();
    let respuestaAutor = autorRespuesta.val();

    // let cajaRespuesta = document.getElementById(`cajaRespuesta${idResponder}`);

    if (respuestaTextarea === "" || respuestaAutor === "") {
      alert("agrega datos correctos");
      return false;
    }

    let response = {
      respuestaTextarea,
      respuestaAutor,
      fecha: new Date().toISOString().slice(0, 10),
    };

    let positionZona = zonas.findIndex(function (element) {
      return idZona === element.id;
    });
    let auxZona = zonas.find((el) => idZona === el.id);

    let positionAnimal = auxZona.animales.findIndex(
      (element) => element.id === idAnimal
    );
    let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

    let positionNota = auxAnimal.nota.findIndex(
      (element) => element.id === idResponder
    );

    let auxNota = auxAnimal.nota.find((element) => idResponder === element.id);

    auxNota.respuestas.unshift(response);

    zonas[positionZona].animales[positionAnimal].nota[positionNota] = auxNota;
    localStorage.setItem("zonas", JSON.stringify(zonas));

    formRespuesta.trigger("reset");

    alert(
      `la respuesta del autor : ${respuestaAutor} se a guardado correctamente`
    );
    leerComentarios();
  });

  // --------------------------------------------------------------------------------------------------------------------------------------
  // (5)-------------------function donde se leeran las respuestas-------al dar click --ver respuestas----------------------------------------
  let idRespuestas;
  function resTotal(e) {
    idRespuestas = parseInt(this.id);
    leerRespuestas(idRespuestas);
  }

  function leerRespuestas() {
    let comentarioRespuesta = $(`#respuestaComentario${idRespuestas}`);
    // cajaRespuesta.innerHTML = "";
    let zonas = JSON.parse(localStorage.getItem("zonas"));

    let positionZona = zonas.findIndex(function (element) {
      return element.id === idZona;
    });
    let auxZona = zonas.find((el) => idZona === el.id);

    let positionAnimal = auxZona.animales.findIndex(
      (element) => element.id === idAnimal
    );
    let auxAnimal = auxZona.animales.find((element) => idAnimal === element.id);

    let positionNota = auxAnimal.nota.findIndex(
      (element) => element.id === idRespuestas
    );

    let respuesta =
      zonas[positionZona].animales[positionAnimal].nota[positionNota]
        .respuestas;

    comentarioRespuesta.html("");
    let respuestasTotal = "";
    for (let i = 0; i < respuesta.length; i++) {
      let respuestaTextarea =
        zonas[positionZona].animales[positionAnimal].nota[positionNota]
          .respuestas[i].respuestaTextarea;
      let respuestaAutor =
        zonas[positionZona].animales[positionAnimal].nota[positionNota]
          .respuestas[i].respuestaAutor;
      let fechaRespuesta =
        zonas[positionZona].animales[positionAnimal].nota[positionNota]
          .respuestas[i].fecha;

      respuestasTotal += `<div class="containerRespuesta">
        <li class="parrafoRespuesta" id="parrafoRespueta">
          ${respuestaTextarea}
        </li>
        <li class="autorRespuesta liRespuesta">autor:${respuestaAutor}</li>
        <li class="fechaRespuesta liRespuesta">fecha:${fechaRespuesta}</li>
      </div>`;
    }
    comentarioRespuesta.html(respuestasTotal);
  }
});
