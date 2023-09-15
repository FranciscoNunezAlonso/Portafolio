const menu = document.querySelector('.nav_menu');
const menuList = document.querySelector('.nav_list');
const link = document.querySelectorAll('.nav_link');

menu.addEventListener('click', function(){
    menuList.classList.toggle('nav_list-show');
});

link.forEach(function(link){
    link.addEventListener('click', function(){
        menuList.classList.remove('nav_list-show');
    })
});

//Variables
var nombre = document.getElementById("nombre");
var email = document.getElementById("email");
var mensaje = document.getElementById("mensaje");

// Botones
var btnEnviar = document.getElementById("btnEnviar");

//flags
let flagNombre = false;
let flagEmail = false;
let flagMensaje = false;
var isValid = true;

//alertas
let alertValidacionesTextoNombre = document.getElementById("alertValidacionesTextoNombre");
let alertValidacionesNombre = document.getElementById("alertValidacionesNombre");
let alertValidacionesTextoEmail = document.getElementById("alertValidacionesTextoEmail");
let alertValidacionesEmail = document.getElementById("alertValidacionesEmail");
let alertValidacionesTextoMensaje = document.getElementById("alertValidacionesTextoMensaje");
let alertValidacionesMensaje = document.getElementById("alertValidacionesMensaje");


// validaciones --------------------------------------------------------------------- 
const validarEmail = (email) => {
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
    return expresionRegular.test(email);
};

const validarNombre = (nombre) => {
    const expresionRegular =/^(?!.*([a-zA-ZáÁéÉíÍóÓúÚñÑüÜ])\1{2})[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]*$/;
    return expresionRegular.test(nombre);
};

const validarMensaje = (mensaje) => {
    const expresionRegular = /^.{20,200}$/;
    return expresionRegular.test(mensaje);
};
const btnEmail = document.getElementById('btnEnviar');


// Evento bnt enviar email -------------------------------------------------------------
btnEmail.addEventListener('click', (e) => {
    e.preventDefault();

    
    alertValidacionesTextoNombre.innerHTML = "";
    alertValidacionesTextoEmail.innerHTML = "";
    alertValidacionesTextoMensaje.innerHTML = ""

    alertValidacionesNombre.style.display = "none";
    alertValidacionesEmail.style.display = "none";
    alertValidacionesMensaje.style.display = "none";

    nombre.style.border = "";
    email.style.border = "";
    mensaje.style.border = "";

    nombre.value = nombre.value.trim();
    email.value = email.value.trim();
    mensaje.value = mensaje.value.trim();

    // Validación del nombre
    if (!validarNombre(nombre.value) || nombre.value.length < 3 || nombre.value.length > 15) {
        flagNombre = false;
        alertValidacionesTextoNombre.insertAdjacentHTML("beforeend", `El <strong> nombre </strong> no es válido</br>`);
        alertValidacionesNombre.style.display = "block";
        nombre.style.border = "solid 2px #B4016C";
    } else {
        flagNombre = true;
    }

    // Validación del email
    if (!validarEmail(email.value)) {
        flagEmail = false;
        alertValidacionesTextoEmail.insertAdjacentHTML("beforeend", `El <strong> correo electrónico </strong> no es válido</br>`);
        alertValidacionesEmail.style.display = "block";
        email.style.border = "solid 2px #B4016C";
    } else {
        flagEmail = true;
    }

    // Validación del mensaje
    if (!validarMensaje(mensaje.value)) {
        flagMensaje = false;
        alertValidacionesTextoMensaje.insertAdjacentHTML("beforeend", `El <strong> mensaje </strong> no es válido, debe contener al menos 20 caracteres</br>`);
        alertValidacionesMensaje.style.display = "block";
        mensaje.style.border = "solid 2px #B4016C";
    } else {
        flagMensaje = true;
    }

    if (flagNombre && flagEmail && flagMensaje) {
        const serviceID = 'service_m213mzb';
        const templateID = 'template_ap6598k';
        emailjs.sendForm(serviceID, templateID, form)
        .then(msg => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu Mensaje se ha sido enviada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            // Limpiar los campos del formulario
            nombre.value = "";
            email.value = "";
            mensaje.value = "";
        }).catch(err => alert("Hubo un error al enviar el mensaje"));
    } else {
    }
});