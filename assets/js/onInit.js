window.onload = function () {
  //** Head - variables **
  let headTitle = document.getElementById("head__title");
  let headerName = document.getElementById("header__name");
  let navHome = document.getElementById("nav__home");
  let navResumen = document.getElementById("nav__resume");
  let navPortafolio = document.getElementById("nav__portafolio");
  let navContacto = document.getElementById("nav__contacto");
  let groupList = document.getElementById("group__list");
  let leyendaName = document.getElementById("leyenda__name");
  let personalInfoList = document.getElementById("about__me__personal__data");

  //** Contenido - variables **
  let aboutMeLabel = document.querySelectorAll(".about__me__label");
  let aboutMe = document.getElementById("about__me");
  let aboutMeTitle = document.getElementById("about__me__title");
  let fullImageProfile = document.getElementById("full__image__profile");
  let aboutMeInfoLabel = document.getElementById("about__me__info__label");
  let aboutMeDescription = document.getElementById("about__me__description");
  // ** Contenido - formación **
  let formacionTitleLabel = document.getElementById("formacion__label__title");
  let formacionDescripcion = document.getElementById("formacion__descripcion");
  // ** Contenido - resumen **
  let resumenLabel = document.getElementById("resumen__titulo");
  let resumenName = document.getElementById("resumen__name");
  let resumenDesc = document.getElementById("resumen__desc");
  // ** Contenido - educación **
  let educacionContenedor = document.getElementById("educacion__container");
  // ** Contenido - experiencia **
  let experienciaContenedor = document.getElementById("experiencia__container");
  // ** Contenido - Portafolio **
  let portafolioTitulo = document.getElementById("portafolio__titulo");
  let portafolioIntro = document.getElementById("portafolio__introduccion");
  let portafolioListaFiltros = document.getElementById("portfolio-flters");
  let portafolioContenido = document.getElementById("portafolio__contenido");
  // ** Contacto **
  let contactoMainLabel = document.getElementById("contact__contacto");
  let contactoIntro = document.getElementById("contact__intro");
  let contactoEmailLabel = document.getElementById("contact__email__label");
  let contactoEmailValue = document.getElementById("contact__email__value");
  let contactoCelularLabel = document.getElementById("contact__celular__label");
  let contactoCelularValue = document.getElementById("contact__celular__value");
  let formNameLabel = document.getElementById("form__name__label");
  let formEmailLabel = document.getElementById("form__email__label");
  let formEmailAsunto = document.getElementById("form__asunto__label");
  let formEmailMensaje = document.getElementById("form__mensaje__label");
  let formSubmitBtn = document.getElementById("form__submit__btn");

  //Head y Header - injección data
  fetch("constant/header.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      headTitle.innerHTML = data.title;
      headerName.innerHTML = data.name;
      navHome.innerHTML = data.navHome;
      navResumen.innerHTML = data.navResume;
      navPortafolio.innerHTML = data.navPortafolio;
      navContacto.innerHTML = data.navContacto;
      leyendaName.innerHTML = data.leyendaName;
      data.proyectos.forEach((proyecto) => {
        groupList.appendChild(crearProducto(proyecto.href, proyecto.name));
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });

  //Contenido - injección data
  fetch("constant/content.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      aboutMeLabel.forEach((label) => {
        label.innerHTML = data.aboutMeLabel;
      });
      aboutMe.innerHTML = data.aboutMe.join(" ");
      fullImageProfile.src = data.fullImageProfile;
      aboutMeTitle.innerHTML = data.aboutMeTitulo;
      aboutMeInfoLabel.innerHTML = data.aboutMeInfoLabel;
      data.personalInfo.forEach((personalData) => {
        personalInfoList.appendChild(
          crearInformacionPersonal(personalData.label, personalData.data)
        );
      });
      aboutMeDescription.innerHTML = data.aboutMeDesc.join(" ");
      formacionTitleLabel.innerHTML = data.formacionLabel;
      formacionDescripcion.innerHTML = data.formacionDesc.join(" ");
      resumenLabel.innerHTML = data.resumen.label;
      resumenName.innerHTML = data.resumen.nombre;
      resumenDesc.innerHTML = data.resumen.descripcion;
      educacionContenedor.appendChild(agregarTitulo(data.educacion.label));
      data.educacion.titulos.forEach((educacionData) => {
        educacionContenedor.appendChild(
          crearSeccionEducacion(
            educacionData.profesion,
            educacionData.fecha,
            educacionData.institucion,
            educacionData.descripcion
          )
        );
      });
      experienciaContenedor.appendChild(agregarTitulo(data.experiencia.label));
      data.experiencia.experienciaLaboral.forEach((personalExp) => {
        experienciaContenedor.appendChild(
          agregarExperiencia(
            personalExp.posicion,
            personalExp.fecha,
            personalExp.lugar,
            personalExp.actividades
          )
        );
      });
      portafolioTitulo.innerHTML = data.portafolio.titulo;
      portafolioIntro.innerHTML = data.portafolio.introduccion.join(" ");
      data.portafolio.filtros.forEach((filtro) => {
        portafolioListaFiltros.appendChild(
          crearElementoFiltro(filtro.nombre, filtro.tipoFiltro)
        );
      });
      let contador = 0;
      let ready = false;
      data.portafolio.proyectos.forEach((proyecto) => {
        portafolioContenido.appendChild(
          crearElementoPortafolio(
            proyecto.imagen,
            proyecto.pagina,
            proyecto.codigoFuente,
            proyecto.claseFiltro,
            contador++
          )
        );
        if (data.portafolio.proyectos.length === contador) {
          ready = true;
        }
      });
      if (ready) {
        $(document).trigger("elementosCreados");
      }
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });

  //Contact form
  //Head y Header - injección data
  fetch("constant/contactForm.json")
    .then((response) => response.json()) // Convierte la respuesta en formato JSON
    .then((data) => {
      contactoMainLabel.innerHTML = data.label;
      contactoIntro.innerHTML = data.introduccion.join(" ");
      contactoEmailLabel.innerHTML = data.emailLabel;
      contactoEmailValue.innerHTML = data.emailValue;
      contactoCelularLabel.innerHTML = data.celLabel;
      contactoCelularValue.innerHTML = data.celValue;
      formNameLabel.innerHTML = data.nameFormLabel;
      formEmailLabel.innerHTML = data.mailFormLabel;
      formEmailAsunto.innerHTML = data.asuntoFormLabel;
      formEmailMensaje.innerHTML = data.mensajeFormLabel;
      formSubmitBtn.innerHTML = data.submitFormBtnLabel;
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });

  const crearProducto = (href, name) => {
    const producto = document.createElement("li");
    producto.innerHTML = `<li><a target="_blank" rel="noopener noreferrer"
        href="${href}"><span>${name}</span></a></li>`;
    return producto;
  };

  const crearInformacionPersonal = (label, data) => {
    const info = document.createElement("li");
    info.innerHTML = `<i class="icofont-rounded-right"></i><strong>${label}:</strong> ${data}`;
    return info;
  };

  const crearSeccionEducacion = (titulo, fecha, lugar, descripcion) => {
    const educacionElement = document.createElement("div");
    educacionElement.innerHTML = `				<div class="resume-item">
							<h4>${titulo}</h4>
							<h5>${fecha}</h5>
							<p class="text-justify"><em>${lugar}</em></p>
							<p class="text-justify">${descripcion}</p></div>`;
    return educacionElement;
  };

  const agregarTitulo = (titulo) => {
    const title = document.createElement("h3");
    title.innerHTML = `<h3 class="resume-title">${titulo}</h3>`;
    return title;
  };

  const agregarExperiencia = (posicion, fecha, lugar, actividades) => {
    const expDiv = document.createElement("div");
    expDiv.innerHTML = `<div class="resume-item">
							<h4>${posicion}</h4>
							<h5>${fecha}</h5>
							<p><em>${lugar}</em></p>
						</div>`;
    const ul = document.createElement("ul");
    actividades.forEach((actividad) => {
      let li = document.createElement("li");
      li.innerHTML = actividad;
      ul.appendChild(li);
    });
    expDiv.appendChild(ul);
    return expDiv;
  };

  const crearElementoFiltro = (nombre, filtro) => {
    const li = document.createElement("li");
    li.setAttribute("data-filter", filtro);
    li.textContent = nombre;
    if (filtro === "*") {
      li.classList.add("filter-active");
    }

    return li;
  };

  const crearElementoPortafolio = (
    imgPath,
    urlPage,
    urlFont,
    claseFiltro,
    numProyecto
  ) => {
    // Crear el div principal
    const divContent = document.createElement("div");
    divContent.className = `col-lg-4 col-md-6 portfolio-item ${claseFiltro}`;

    // Condicional para generar el contenido HTML
    if (urlPage && urlPage.trim() !== "") {
      divContent.innerHTML = `
      <div class="portfolio-wrap">
        <img src="${imgPath}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a target="_blank" rel="noopener noreferrer" href="${urlPage}" title="Proyecto ${numProyecto}"><i class="bx bx-plus"></i></a>
          <a target="_blank" rel="noopener noreferrer" href="${urlFont}" title="Código fuente"><i class="bx bx-link"></i></a>
        </div>
      </div>`;
    } else {
      divContent.innerHTML = `
      <div class="portfolio-wrap">
        <img src="${imgPath}" class="img-fluid" alt="">
        <div class="portfolio-links">
          <a target="_blank" rel="noopener noreferrer" href="${urlFont}" title="Código fuente"><i class="bx bx-link"></i></a>
        </div>
      </div>`;
    }
    return divContent;
  };
};
