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
let bet = 0;
let user;
const users = [];
let auth = false;
let i = 0;
let userId = 0;
let div = document.getElementById("botones");
let progreso = document.getElementById("progreso")
let cartas = document.getElementById("cartas");
let miMano = document.getElementById("mano");
let x = 0;
let seguir = document.createElement("p");
seguir.innerHTML = "¿Seguir jugando?";
let si = document.createElement("button");
let no = document.createElement("button");
const container = document.createElement("div")
container.id = "container"
let body = document.body
let mazoApi = 0;


function noti(msg){
    Toastify({
        text: msg,
        duration: 1500
        }).showToast();
}

class User{
    constructor(nombre, pass, fichas){
        this.nombre = nombre;
        this.pass = pass;
        this.fichas = fichas;
    }
}

function crearUser(){ 
    const userCreate = document.createElement("input")
    const userCreatePass = document.createElement("input")
    const btnCrear = document.createElement("button")
    
    btnCrear.innerHTML = "Registrarse"
    userCreate.placeholder = "Nombre de usuario"
    userCreatePass.placeholder = "Ingrese su contraseña"
    userCreate.type = "text"
    userCreatePass.type = "password"

    
    body.insertBefore(container,body.firstChild)
    container.appendChild(userCreate)
    container.appendChild(userCreatePass)
    container.appendChild(btnCrear)
    const ok = document.createElement("button")
    ok.innerHTML = "Continuar"
    btnCrear.addEventListener("click", ()=>{

        if(userCreate.value === "" || userCreatePass.value === ""){
            container.innerHTML = `Error de registro, intentelo nuevamente`
            container.appendChild(ok)
            ok.addEventListener("click", ()=>{
                container.remove();
            })
        }else{
            users[i] = new User(userCreate.value,userCreatePass.value,100)
            i++;
            userCreate.remove()
            userCreatePass.remove()
            btnCrear.remove()
            container.innerHTML = "Registro exitoso, inicie sesion para continuar."
            container.appendChild(ok)
            ok.addEventListener("click",()=>{
                container.remove();
            })
        }
    })
}

function login(){ 
    const ok = document.createElement("button")
    const userLogin = document.createElement("input")
    const userPass = document.createElement("input")
    const btnLogin = document.createElement("button")
    btnLogin.innerHTML = "Log in"
    ok.innerHTML = "Continuar"
    userLogin.type = "text"
    userLogin.placeholder = "Usuario"
    userPass.type = "password"
    userPass.placeholder= "Contraseña"    
    body.insertBefore(container,body.firstChild)
    container.appendChild(userLogin)
    container.appendChild(userPass)
    container.appendChild(btnLogin)
    btnLogin.addEventListener("click", ()=>{
        let userLoginInput = userLogin.value;
        let userPassInput = userPass.value;
        if(users.length === 0 || userLogin.value === "" || userPass.value === ""){
            container.innerHTML = ""
            noti(`Usuario y contraseña no encontrados o incorrectos`)
            container.appendChild(ok)
            auth = false;
            ok.addEventListener("click", ()=>{
                container.remove();
            })
        }else{
            for(let j=0;j<users.length;j++){
                if(userLoginInput === users[j].nombre && userPassInput === users[j].pass){
                    noti(`Ingreso correcto. Bienvenido/a ${users[j].nombre}`)
                    auth = true;
                    userId = j;
                    break;
                }
            if(auth===false){
                container.innerHTML = ""
                noti(`Usuario y contraseña no encontrados o incorrectos`)
                auth = false;
            }
        }
        userLogin.remove()
        userPass.remove()
        btnLogin.remove()
        }
    })
}

function recarga(){
    if(auth === false){
        noti(`Para ver y recargar fichas es necesario estar logueado.`);       
    }else{
        noti(`Tenes ${users[userId].fichas} fichas.`)
        const cargar = document.createElement("button")
        const cargaInput = document.createElement("input")
        cargar.innerHTML = "Cargar"
        cargaInput.placeholder= "Cantidad de fichas a cargar"    
        body.insertBefore(container,body.firstChild)
        container.appendChild(cargaInput)
        container.appendChild(cargar)
        cargar.addEventListener("click",()=>{
            carga = Number(cargaInput.value)
            users[userId].fichas+=carga;
            noti(`Ahora tenes ${users[userId].fichas}. Suerte!`);
            container.remove()
        })
    }
}


async function repartir(){
    mano = 0;
    manoPc = 0;
    carta1 = 0;
    carta2 = 0;
    cartaPc = 0;
    cartaPc2  = 0;
    await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(resp => resp.json())
    .then(data =>{
    mazoApi=data;
    })
    let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=4`)
    let resp = await call.json()
    console.log(resp)
    carta1 = resp.cards[0].value
    if(carta1!= "JACK" && carta1 != "QUEEN" && carta1 != "KING" && carta1 != "ACE"){
        carta1= Number(carta1)
    }
    if(carta1 === "JACK" || carta1 === "QUEEN" || carta1 === "KING" || carta1 === "ACE"){
        carta1 = 10;
    }
    carta2 = resp.cards[1].value
    if(carta2 != "JACK" && carta2 != "QUEEN" && carta2 != "KING" && carta2 != "ACE"){
        carta2= Number(carta2)
    }
    if(carta2 === "JACK" || carta2 === "QUEEN" || carta2 === "KING" || carta2 === "ACE"){
        carta2 = 10;
    }
    mano = carta1 + carta2

    cartaPc = resp.cards[2].value
    if(cartaPc!= "JACK" && cartaPc != "QUEEN" && cartaPc != "KING" && cartaPc != "ACE"){
        cartaPc= Number(cartaPc)
    }
    if(cartaPc === "JACK" || cartaPc === "QUEEN" || cartaPc === "KING" || cartaPc === "ACE"){
        carta1 = 10;
    }
    cartaPc2 = resp.cards[3].value
    if(cartaPc2!= "JACK" && cartaPc2 != "QUEEN" && cartaPc2 != "KING" && cartaPc2 != "ACE"){
        cartaPc2= Number(cartaPc2)
    }
    if(cartaPc2 === "JACK" || cartaPc2 === "QUEEN" || cartaPc2 === "KING" || cartaPc2 === "ACE"){
        cartaPc2 = 10;
    }
    manoPc = cartaPc + cartaPc2
    progreso.innerHTML = `Empieza el juego y se reparten las cartas.`
    
}
 
async function pedir(){
    let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`)
    let resp = await call.json()
    carta1 = resp.cards[0].value
    if(carta1!= "JACK" && carta1 != "QUEEN" && carta1 != "KING" && carta1 != "ACE"){
        carta1= Number(carta1)
    }
    if(carta1 === "JACK" || carta1 === "QUEEN" || carta1 === "KING" || carta1 === "ACE"){
        carta1 = 10;
    }
    mano+=carta1
    progreso.innerHTML = `Pediste una carta.`
    cartas.innerHTML = await `Sacaste un ${carta1}. `;
    miMano.innerHTML = await `Tu mano vale ${mano}.<br>La casa tiene un ${cartaPc} y una carta oculta.`
}

async function quedarse(){
    let y = 0
    cartas.innerHTML = ``
    for (y = 0;manoPc<17;y++){
        let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`)
        let resp = await call.json()
        cartaPc = resp.cards[0].value
        if(cartaPc!= "JACK" && cartaPc != "QUEEN" && cartaPc != "KING" && cartaPc != "ACE"){
            cartaPc= Number(cartaPc)
        }
        if(cartaPc === "JACK" || cartaPc === "QUEEN" || cartaPc === "KING" || cartaPc === "ACE"){
            cartaPc = 10;
        }
        manoPc+=cartaPc;
        if(manoPc>21){
            progreso.innerHTML = `La casa se pasa con ${manoPc}. Ganaste!`
            won++;
        }
    }
    progreso.innerHTML = `Te quedaste con ${mano}.<br>La casa saca ${y} cartas y se queda con ${manoPc}`
    if(mano<manoPc){
        miMano.innerHTML = `La casa gana con ${manoPc}`
        lost++
        cont();
    }else if(mano === manoPc){
        miMano.innerHTML = `Empate`
        draw++;
        cont()
    }else if(mano>manoPc && mano<21){
        miMano.innerHTML= `Ganaste!`
        won++
        cont()
    }
}



async function jugar(){
    if(auth === false){
        container.innerHTML = "Es necesario iniciar sesion para poder jugar"
        body.insertBefore(container,body.firstChild)

    }else{
        btnPedir.disabled=false;
        btnQuedar.disabled=false;
        mano = 0;
        manoPc = 0;
        await repartir();
        btnPedir.style.visibility = `visible`;
        btnQuedar.style.visibility = `visible`;
        cartas.innerHTML = `<b>Tus cartas:</b> ${carta1} y ${carta2}.<br> `;
        miMano.innerHTML = `Tu mano es ${mano}.La casa tiene un ${cartaPc} y una carta oculta.`
        if(mano === 21){
            cartas.innerHTML = `Blackjack! Ganaste!`
            cont();
        }
    }

}

function cont(){
    seguir.style.visibility= "visible"
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
    if (mano === 21){
        progreso.innerHTML = `Blackjack! Ganaste!`
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        won++
        cont();
    }else if(mano>21){
        progreso.innerHTML = `Te pasaste! Perdiste`
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        lost++;
        cont();
    }

})


btnQuedar.addEventListener("click", () =>{
    btnPedir.disabled = true;
    btnQuedar.disabled = true;
    progreso.innerHTML = `Te quedaste`
    quedarse()
})

btn1.addEventListener("click", () => {
    container.innerHTML= ""
    login();
});

btn2.addEventListener("click", () => {
    container.innerHTML= ""
    crearUser();
});

btn3.addEventListener("click", () => {
    jugar();
});

btn4.addEventListener("click", () => {
    container.innerHTML= ""
    recarga();
});


si.innerHTML = "Si";
no.innerHTML = "No";
seguir.appendChild(si);
seguir.appendChild(no);
botones.appendChild(seguir)
seguir.style.visibility = `hidden`         

si.addEventListener("click", () =>{
    seguir.style.visibility = "hidden"
    jugar()
})

no.addEventListener("click", () =>{
    seguir.style.visibility = "hidden";
    fin();
})


const btnMode = document.createElement("button")
btnMode.innerHTML = "Tema claro/Tema oscuro"
nav.appendChild(btnMode);

document.body.classList.add(localStorage.getItem("tema"))

function mode(){
    let tema = localStorage.getItem("tema")
    console.log("a")
}

btnMode.addEventListener("click", () =>{
    if(document.body.className === "null"){
        document.body.classList.add("dkMode")
        localStorage.setItem("tema","dkMode")
        mode()
    }
    
    if(document.body.className === "lgMode"){
        document.body.classList.remove("lgMode")
        document.body.classList.add("dkMode")
        localStorage.setItem("tema","dkMode")
        mode()
    }else if(document.body.className === "dkMode"){
        localStorage.setItem("tema","lgMode")
        document.body.classList.remove("dkMode")
        document.body.classList.add("lgMode")
        
        mode()
    }
})

