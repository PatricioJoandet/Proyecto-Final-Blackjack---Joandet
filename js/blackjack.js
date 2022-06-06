let carta1 = 0;
let carta2 = 0;
let cartaPc = 0;
let cartaPc2 = 0;
let mano = 0;
let manoPc = 0;
let won = 0;
let lost = 0;
let draw = 0;
let pos = 0;
let mazo = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
let bet = 0;
let user;
const users = [];
let auth = true;
let i = 0;
let userId = 0;
let div = document.getElementById("botones");
let cartas = document.getElementById("cartas") 
let x = 0;

class User{
    constructor(nombre, pass, fichas){
        this.nombre = nombre;
        this.pass = pass;
        this.fichas = fichas;
    }
}

function crearUser(){
    users[i] = new User(prompt("Ingrese su nombre"), prompt("Ingrese una contraseña"), 100);
    i++;
    alert(`Registro exitoso! Para continuar, debe loguearse `);
    console.log(users)

}

function login(){
    let login = prompt("Ingrese usuario");
    let pass = prompt("Ingrese contraseña")
    if(users.length === 0){
        alert("Usuario y contraseña no encontrados o incorrectos.")
        auth = false;

    }else{
        for(let j=0;j<users.length;j++){
            if(login === users[j].nombre && pass === users[j].pass){
                alert(`Ingreso correcto. Bienvenido/a ${users[j].nombre}`)
                auth = true;
                userId = j;

                break;
            }
        if(auth===false){
            alert("Usuario y contraseña no encontrados o incorrectos.")
            auth = false;

        }
        }
    }
}


function recarga(){
    if(auth === false){
        alert(`Para ver y recargar fichas es necesario estar logueado.`);       
    }else{
        alert(`Tenes ${users[userId].fichas} fichas.`)
        let carga = Number(prompt("Cuantas fichas queres cargar?"));
        users[userId].fichas+=carga;
        alert(`Ahora tenes ${users[userId].fichas}. Suerte!`);
    }
     
}


function repartir(){
    mano = 0;
    manoPc = 0;
    carta1 = 0;
    carta2 = 0;
    cartaPc = 0;
    cartaPc2  = 0;
    mazo = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
    carta1 = mazo[Math.floor(Math.random() * mazo.length)];
    pos = mazo.indexOf(carta1);   /// Esto averigua el indice de la carta q salio
    mazo.splice(pos, 1);          /// Aca se borra esa carta del mazo para evitar que salgan repetidas
    carta2 = mazo[Math.floor(Math.random() * mazo.length)];
    pos = mazo.indexOf(carta2);
    mazo.splice(pos, 1);
    mano = carta1 + carta2;
    cartaPc = mazo[Math.floor(Math.random() * mazo.length)];
    pos = mazo.indexOf(cartaPc);
    mazo.splice(pos, 1);
    cartaPc2 = mazo[Math.floor(Math.random() * mazo.length)];
    pos = mazo.indexOf(cartaPc2);
    mazo.splice(pos, 1);
    manoPc = cartaPc + cartaPc2;
    
}
 
function pedir(){
    carta1 = mazo[Math.floor(Math.random() * mazo.length)];
    pos = mazo.indexOf(carta1);
    mazo.splice(pos, 1);
    mano += carta1;
}

function quedarse(){
    let y = 0
    cartas.innerHTML = `Te quedaste con ${mano}. La Casa tiene ${manoPc}`
    for (y = 0;manoPc<17;y++){
        cartaPc = mazo[Math.floor(Math.random() * mazo.length)];
        pos = mazo.indexOf(cartaPc);
        mazo.splice(pos, 1);
        manoPc+=cartaPc;
    }
    cartas.innerHTML = `Te quedaste con ${mano}.<br>La casa saca ${y} cartas y se queda con ${manoPc}`
}

function seguir(){

}


function jugar(){
    console.log(mano);
    btnPedir.disabled=false;
    mano = 0;
    manoPc = 0;
    btnPedir.style.visibility = `visible`;
    btnQuedar.style.visibility = `visible`;
    repartir();
    cartas.innerHTML = `Tus cartas son: ${carta1} y ${carta2}. Tu mano vale ${mano}.<br>
                            La casa tiene un ${cartaPc} y una carta oculta.`;
    if(mano === 21){
        cartas.innerHTML = `Blackjack! Ganaste!`
        seguir();
    }else if(mano < 21){
    }
}


function fin(){ 
    p.innerHTML =`Victorias: ${won}
    Derrotas: ${lost}
    Empates: ${draw}`
}




let p = document.getElementById("stats");
let nav = document.getElementById("nav");


let btn1 = document.createElement("button");
let btn2 = document.createElement("button");
let btn3 = document.createElement("button");
let btn4 = document.createElement("button");

btn1.innerHTML = "Login";
btn2.innerHTML = "Sign Up";
btn3.innerHTML = "Jugar";
btn4.innerHTML = "Recarga";

nav.appendChild(btn1);
nav.appendChild(btn2);
nav.appendChild(btn3);
nav.appendChild(btn4);

let btnPedir = document.createElement("button");
let btnQuedar = document.createElement("button");

div.appendChild(btnPedir);
div.appendChild(btnQuedar);

btnPedir.style.visibility = `hidden`
btnQuedar.style.visibility = `hidden`

btnPedir.innerHTML = "Pedir";
btnQuedar.innerHTML = "Quedarse";


btnPedir.addEventListener("click", () =>{
    pedir();
    console.log("hola")
    cartas.innerHTML = `Sacaste un ${carta1}. Tu mano vale ${mano}.<br>La casa tiene un ${cartaPc} y una carta oculta.`;
            if(mano>21){
                cartas.innerHTML = `Te pasaste con ${mano}`
                lost++
                seguir()
            }
})

btn1.addEventListener("click", () => {
    login();
});

btn2.addEventListener("click", () => {
    crearUser();
});

btn3.addEventListener("click", () => {
    jugar();
});

btn4.addEventListener("click", () => {
    recarga();
});
