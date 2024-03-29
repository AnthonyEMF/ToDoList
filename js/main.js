// Recupera las tareas almacenadas en LocalStorage, si no encuentra nada es un arreglo vacio
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Guarda las tareas en el LocalStorage coviertondo el arreglo en una cadena JSON
function guardarTareas(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Agrega la tarea ingresada al arreglo 'tareas'
function agregarTarea(){
    // Obtiene los datos ingresados en el Input
    const tareaInput = document.getElementById('nuevaTarea');
    // Verifica si el Input no esta vacio
    if(tareaInput.value){
        // Agrega la tarea en forma de objeto con id, texto y estado
        tareas.push({
            id: Date.now(), // El ID se basa en la fecha y hora actual
            text: tareaInput.value,
            completed: false
        });
        // Limpia el Input despues de agregar la tarea
        tareaInput.value = '';
        imprimirTareas();
        guardarTareas();
    }
}

// Cambia el estado de completado de una tarea en especifico
function marcarTarea(id){
    // Encuentra y obtiene el indice basandose en el ID
    const tareaIndex = tareas.findIndex((tarea) => tarea.id === id);
    // Si se encuentra la tarea cambia su estado de completado
    if(tareaIndex !== -1){ 
        tareas[tareaIndex].completed = !tareas[tareaIndex].completed;
        imprimirTareas();
        guardarTareas();
    }
}

// Eliminar una tarea en especifico
function eliminarTarea(id){
    // Excluye la tarea con el ID coincidente
    tareas = tareas.filter((tarea) => tarea.id !== id);
    imprimirTareas();
    guardarTareas();
}

// Renderiza la lista de tareas en el HTML
function imprimirTareas(){
    // Obtiene el elemento que contendra la lista
    const divListaTareas = document.getElementById('listaTareas');
    // Limpia la lista de tareas existente
    divListaTareas.innerHTML = '';
    // Itera sobre el arreglo creando un elemento en el HTML por cada tarea
    tareas.forEach((tarea) => {
        const divTarea = document.createElement('div');
        // Dependiendo de la variable 'completed' se aignara la clase correspondiente
        divTarea.className = `tarea${tarea.completed ? 'Completada' : ''}`;
        divTarea.innerHTML = `
            <span>${tarea.text}</span>
            <div>
                <button id="btnCompletar" onclick="marcarTarea(${tarea.id})">${tarea.completed ? 'Desmarcar' : 'Completar'}</button>
                <button id="btnEliminar" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </div>
        `;
        // Introduce el elemento creado en el contenedor padre
        divListaTareas.appendChild(divTarea);
    });
}

// Muestra la lista de tareas cada vez que se carga la pagina
document.addEventListener('DOMContentLoaded', function(){
    imprimirTareas();
    // Agrega la tarea si se presiona la tecla Enter
    const tareaInput = document.getElementById('nuevaTarea');
    tareaInput.addEventListener('keypress', function(evento){
        if(evento.key === 'Enter'){
            agregarTarea();
        }
    });
});