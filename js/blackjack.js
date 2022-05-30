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
let auth = false;
let i = 0;
let userId = 0;


class User{
    constructor(nombre, pass, fichas){
        this.nombre = nombre;
        this.pass = pass;
        this.fichas = fichas;
    }
}


function menu(){
   let a = Number(prompt(`Bienvenido a Mesa de blackjack 21!
    1. Crear usuario
    2. Ingresar
    3. Jugar
    4. Recarga`))
    switch(a){
        case 1:
            crearUser()
            break;
        case 2:
            login()
            break;
        case 3:
            jugar()
            break;
        case 4:
            recarga()
            break;
        default:
            alert("Opcion no valida")
            menu();
    }
}

function crearUser(){
    users[i] = new User(prompt("Ingrese su nombre"), prompt("Ingrese una contraseña"), 100);
    i++;
    alert(`Registro exitoso! Para continuar, debe loguearse `);
    console.log(users)
    menu();
}

function login(){
    let login = prompt("Ingrese usuario");
    let pass = prompt("Ingrese contraseña")
    if(users.length === 0){
        alert("Usuario y contraseña no encontrados o incorrectos.")
        auth = false;
        menu();
    }else{
        for(let j=0;j<users.length;j++){
            if(login === users[j].nombre && pass === users[j].pass){
                alert(`Ingreso correcto. Bienvenido/a ${users[j].nombre}`)
                auth = true;
                userId = j;
                menu();
                break;
            }
        if(auth===false){
            alert("Usuario y contraseña no encontrados o incorrectos.")
            auth = false;
            menu();
        }
        }
    }
}


function recarga(){
    if(auth === false){
        alert(`Para ver y recargar fichas es necesario estar logueado.`);
        menu();        
        
    }else{
        alert(`Tenes ${users[userId].fichas} fichas.`)
        let carga = Number(prompt("Cuantas fichas queres cargar?"));
        users[userId].fichas+=carga;
        alert(`Ahora tenes ${users[userId].fichas}. Suerte!`);
        menu();
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



function jugar(){
    if(auth === true){
        again = true;
        let x = 0;
        do{
            repartir()
            alert(`Tus cartas son: ${carta1} y ${carta2}. Suman ${mano}. La Casa tiene un ${cartaPc} y una carta oculta.`)
            if(mano === 21){
                alert("Blackjack! Ganaste!")
                won++;
                x = prompt("Seguir jugando? SI - NO")
                if(x === "SI"){
    
                    again = true;
                }else if(x === "NO"){
                    fin()
                    again = false;
                }
            }
            while(mano!=21 && mano<21){
                let op = prompt("PEDIR carta o QUEDARSE?");    
                if(op == "PEDIR"){
                    pedir();
                    alert(`Tu carta es un ${carta1} y tu mano vale ${mano}`);
                    if(mano === 21){
                        alert("BLACKJACK! Ganaste!")
                        x = prompt("Seguir jugando? SI - NO")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }
                    }else if(mano>21){
                        alert("Te pasaste!");
                        lost += 1;
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }   
                    } 
                }else if(op === "QUEDARSE"){
                    alert(`Te quedaste con ${mano}. La Casa tiene ${manoPc}`)
                    if(manoPc <= 16){
                        while(manoPc<17){
                            alert("La casa pide una carta")
                            cartaPc = mazo[Math.floor(Math.random() * mazo.length)];
                            pos = mazo.indexOf(cartaPc);
                            mazo.splice(pos, 1);
                            manoPc+=cartaPc;
                            alert(`La casa tiene ${manoPc}`)
                        }
                    }   
                        if(manoPc>21){
                        alert(`La casa se pasó con ${manoPc}. Ganaste!`)
                        won++;
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }   
                    }               
                    if(mano === 21){
                        alert("BLACKJACK! Ganaste!")
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }
                    }else if(mano<manoPc){
                        alert(`La casa gana con ${manoPc}`)
                        lost++;
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }
                    }else if(mano>manoPc){
                        alert(`Ganaste con ${mano}!`)                
                        won+=1;
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }
                    }else if(mano===manoPc){
                        alert("Empate");
                        draw++;
                        x = prompt("Seguir jugando? SI - No")
                        if(x === "SI"){
    
                            again = true;
                            break;
                        }else if(x === "NO"){
                            fin()
                            again = false;
                            break;
                        }
                    }
                }
            }
        }while(again==true);
    }else{
        alert("Debe iniciar sesion para poder jugar");
        menu();
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

let p = document.getElementById("stats")
menu();