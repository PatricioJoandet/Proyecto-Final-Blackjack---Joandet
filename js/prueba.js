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
let div = document.getElementById("juego");


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
    alert(`Te quedaste con ${mano}. La Casa tiene ${manoPc}`)
    if(manoPc<=16 && manoPc<mano){
        while(manoPc<17){
            alert("La casa pide una carta")
            cartaPc = mazo[Math.floor(Math.random() * mazo.length)];
            alert(`La casa saca ${cartaPc}`)
            pos = mazo.indexOf(cartaPc);
            mazo.splice(pos, 1);
            manoPc+=cartaPc;
            alert(`La casa tiene ${manoPc}`)
        }
    }

}

let op = document.createElement("button");
let op2 = document.createElement("button");

op.innerHTML = "Pedir";
op2.innerHTML = "Quedarse";

function opciones(){
    op.addEventListener("click", () =>{
                    pedir();
                    div.innerHTML = `Tu carta es un ${carta1} y tu mano vale ${mano}`;
                    if(mano === 21){
                        div.innerHTML = "BLACKJACK! Ganaste!"
                    }else if(mano>21){
                        div.innerHTML = "Te pasaste!";
                        lost += 1;
                    } 
                })
                op2.addEventListener("click", () =>{
                   div.innerHTML = `Te quedaste con ${mano}. La Casa tiene ${manoPc}`
                    if(manoPc <= 16){
                        while(manoPc<17){
                            div.innerHTML ="La casa pide una carta"
                            cartaPc = mazo[Math.floor(Math.random() * mazo.length)];
                            pos = mazo.indexOf(cartaPc);
                            mazo.splice(pos, 1);
                            manoPc+=cartaPc;
                            div.innerHTML = `La casa tiene ${manoPc}`
                        }
                    }   
                    if(manoPc>21){
                        div.innerHTML = `La casa se pasó con ${manoPc}. Ganaste!`
                        won++;
                    }else if(mano === 21){
                       div.innerHTML = "BLACKJACK! Ganaste!";
                    }else if(mano<manoPc){
                        div.innerHTML = `La casa gana con ${manoPc}`;
                        lost++;
                    }else if(mano>manoPc){
                       div.innerHTML = `Ganaste con ${mano}!`;         
                        won+=1;
                    }else if(mano===manoPc){
                        div.innerHTML = "Empate";
                        draw++;
                    }
    })
}


function jugar(){
            repartir()
            div.innerHTML = `Tus cartas son: ${carta1} y ${carta2}. Suman ${mano}. La Casa tiene un ${cartaPc} y una carta oculta.`
            if(mano === 21){
                div.innerHTML = "Blackjack! Ganaste!"
                won++;
            }  
            div.appendChild(op);
            div.appendChild(op2);
            while(mano!=21 && mano<21){
                opciones()
            } 
        
}


function inicio(){
    alert("Mesa de Blackjack. El objetivo es llegar a 21, o lo mas cercano, sin pasarse. si te pasas, perdes.")
    jugar();
}

function fin(){ 
    p.append(`Victorias: ${won}
    Derrotas: ${lost}
    Empates: ${draw}`)
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