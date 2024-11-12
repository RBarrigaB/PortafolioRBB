window.onload = function () {

    //** Head - variables **
    let headTitle = document.getElementById("head__title");
    let headerName = document.getElementById("header__name");
    let navHome = document.getElementById("nav__home");
    let navResumen = document.getElementById("nav__resume");
    let navPortafolio = document.getElementById("nav__portafolio");
    let navContacto = document.getElementById("nav__contacto");
    let groupList = document.getElementById("group__list");

    //** Contenido - variables **
    let aboutMeLabel = document.querySelectorAll(".about__me__label");
    let aboutMe = document.getElementById("about__me");
    let fullImageProfile = document.getElementById("full__image__profile");

    
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
      console.log(data.proyectos)
      data.proyectos.forEach((proyecto) => {
        groupList.appendChild(crearProducto(proyecto.href,proyecto.name));
      })
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
        })
        aboutMe.innerHTML = data.aboutMe.join(" ");
        fullImageProfile.src = data.fullImageProfile;

  
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });

      const crearProducto = (href,name) => {
        const producto = document.createElement("li");
        producto.innerHTML = `<li><a target="_blank" rel="noopener noreferrer"
        href="${href}"><span>${name}</span></a></li>`
        return producto;
      }
  };
  