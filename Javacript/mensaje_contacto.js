// Cargar la librería de EmailJS desde la CDN
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

// Ejecutar la inicialización de EmailJS una vez que la librería se haya cargado
script.onload = function() {
    (function() {
        // Reemplaza 'TU_USER_ID_DE_EMAILJS' con tu verdadero User ID de EmailJS
        emailjs.init('HnYpU38tjC6IjbH0F');
    })();

    // Configurar el evento 'submit' para el formulario de contacto
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtén los valores del formulario
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var message = document.getElementById('message').value;

        // Envía el email usando EmailJS
        emailjs.send('service_qtn66lh', 'template_f4jjj2n', {
            from_name: name,
            from_email: email,
            message: message
        })
        
        // Limpia el formulario después del envío
        this.reset();
    });
};

// Añadir el script al documento
document.head.appendChild(script);
