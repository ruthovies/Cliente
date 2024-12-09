// Clases y arrays
class Persona {
    constructor(nombre, peso, altura) {
        this.nombre = nombre;
        this.peso = peso;
        this.altura = altura;
    }
}

class IMC {
    constructor(nombre, imc) {
        this.nombre = nombre;
        this.imc = imc;
    }
}

const personas = [];
const personasFueraDeRango = [];


    // Función para añadir persona
    function añadirPersona(nombre, peso, altura) {
        if (!nombre || peso <= 0 || altura <= 0) {
            alert("Datos inválidos.");
            return;
        }
        personas.push({ nombre, peso, altura });
        mostrarPersonas();
    }

    // Función para modificar persona
    function modificarPersona(nombre, nuevoPeso, nuevaAltura) {
        const persona = personas.find(p => p.nombre === nombre);
        if (persona) {
            persona.peso = nuevoPeso;
            persona.altura = nuevaAltura;
            mostrarPersonas();
        } else {
            alert("Persona no encontrada.");
        }
    }

    // Función para calcular IMC
    function calcularIMC() {
        personasFueraDeRango.length = 0;
        $('#tablaPersonas tbody').empty();
        $('#tablaFueraDeRango tbody').empty();

        personas.forEach(persona => {
            const imc = persona.peso / (persona.altura ** 2);
            let categoria;
            if (imc <= 18.48) categoria = "Demasiado delgada";
            else if (imc <= 24.99) categoria = "Peso normal";
            else categoria = "Demasiado obesa";

            // Agregar persona a la tabla
            $('#tablaPersonas tbody').append(`
                <tr>
                    <td>${persona.nombre}</td>
                    <td>${persona.peso}</td>
                    <td>${persona.altura}</td>
                    <td>${imc.toFixed(2)}</td>
                    <td>${categoria}</td>
                </tr>
            `);

            // Agregar personas fuera de rango a otra tabla
            if (categoria !== "Peso normal") {
                personasFueraDeRango.push({ nombre: persona.nombre, imc: imc.toFixed(2) });
                $('#tablaFueraDeRango tbody').append(`
                    <tr>
                        <td>${persona.nombre}</td>
                        <td>${imc.toFixed(2)}</td>
                    </tr>
                `);
            }
        });
    }

    // Función para mostrar personas en la tabla
    function mostrarPersonas() {
        $('#tablaPersonas tbody').empty();
        personas.forEach(persona => {
            $('#tablaPersonas tbody').append(`
                <tr>
                    <td>${persona.nombre}</td>
                    <td>${persona.peso}</td>
                    <td>${persona.altura}</td>
                </tr>
            `);
        });
    }

    // Evento para añadir persona
    $('#formAñadir').submit(function(e) {
        e.preventDefault();
        const nombre = $('#nombre').val();
        const peso = parseFloat($('#peso').val());
        const altura = parseFloat($('#altura').val());
        añadirPersona(nombre, peso, altura);
        $(this).trigger('reset');
    });

    // Evento para modificar persona
    $('#formModificar').submit(function(e) {
        e.preventDefault();
        const nombre = $('#modNombre').val();
        const nuevoPeso   = parseFloat($('#modPeso').val());
        const nuevaAltura = parseFloat($('#modAltura').val());
        modificarPersona(nombre, nuevoPeso, nuevaAltura);
        $(this).trigger('reset');
    });

    // Evento para calcular IMC al hacer clic en el botón
    $('#calcularIMC').click(function() {
        calcularIMC();
    })