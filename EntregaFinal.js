//Básicamente me he guiado por la clase 11 del workshop y repasé conceptos de HTML y CSS, por lo que me armé algo pequeñito según el modelo del profe

//defino un arreglo vacío para poder guardar información en el local storage
let carrito = [];


//organizo las FUNCIONES al inicio
//las funciones trabajan con nodos a partir HTML (DOM)
function agregar_al_carrito(e){

    console.log("Se seleccionó:" , e.target)

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombre_producto = padre.querySelector("h5").textContent;
    let precio_producto = padre.querySelector("p").textContent;
    let img_producto = abuelo.querySelector("img").src;
   
    console.log(nombre_producto);
    console.log(precio_producto);
    console.log(img_producto);

    //aquí quise usar una clase pero no me salió, lo voy a repasar
    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,        
    };

    //transformo mi información en objeto JSON y lo guardo en mi carrito
    let producto_json = JSON.stringify( producto );
    localStorage.setItem("productos" , producto_json);

    carrito.push(producto_json)
   
    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);

    mostrar_carrito( producto );
    

}


function mostrar_carrito( producto ){

    let fila = document.createElement("tr");

    fila.innerHTML = `<td>${producto.nombre}</td>
                      <td>${producto.precio}</td>
                      <td><button class="btn btn-danger borrar_elemento">X</button></td>`;

    let tabla = document.getElementById("cuerpoTabla");
    tabla.append( fila );

    //capturo elemento (boton)
    let btn_borrar = document.querySelectorAll(".borrar_elemento");

    //incluyo un evento de mouse (CLICK: mousedown-up)
    for( let boton of btn_borrar){

        boton.addEventListener("click" , borrar_producto);
    }
}


function borrar_producto(e){

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    abuelo.remove();

}


//capturo elemento (boton) a partir de una clase de CSS
let btn_compra = document.querySelectorAll(".botonCompra");
console.log(btn_compra);

//incluyo un evento de mouse (CLICK: mousedown-up) tras recorrer la información obtenida
for( let boton of btn_compra){
    boton.addEventListener("click" , agregar_al_carrito); 

}


//trato (no lo logro, pero dejo el código para corregir) de recuperar la info del carrito para que se borren también de allí los productos (corrección pendiente de la entrega 3)
let recupero_productos= localStorage.getItem("productos");
recupero_productos=JSON.parse(recupero_productos)


//utilizo librería SweetAlert2 para mi botón de Compra final
let btn_fin = document.getElementById("botonFin")
btn_fin.addEventListener("click", function(){
   
    Swal.fire({
        title:'Terminaste tu compra?',
        text: 'Continuar al pago',
        footer: '<a href="file:///C:/Users/luisi/OneDrive/Documentos/CoderJS/EntregaFinal+NunezSanchez/EntregaFinal.html">Volver</a>'
      })
      
})



//Implemento Fetch: traigo una lista de "usuarios" de mi página
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li');
    let img = createNode('img');
    let span = createNode('span');
    img.src = author.picture.medium;
    span.innerHTML = `${author.name.first} ${author.name.last}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});

