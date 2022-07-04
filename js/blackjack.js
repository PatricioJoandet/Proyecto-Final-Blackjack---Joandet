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
let auth = true;
let i = 0;
let userId = 0;
let div = document.getElementById("botones");
let cartas = document.getElementById("cartas");
let x = 0;
let seguir = document.createElement("div");
seguir.innerHTML = `<p>¿Seguir jugando?</p>`;
let si = document.createElement("button");
let no = document.createElement("button");
const container = document.createElement("div")
container.id = "container"
let body = document.body
let mazoApi = 0;
let header = document.getElementById("header")
let imgs = []
let cartasUserDiv = document.createElement("div");
let cartasPcDiv = document.createElement("div");
cartasPcDiv.classList.add("cartasBox")
cartasUserDiv.classList.add("cartasBox")
let imgUserDiv = document.createElement("div")
let imgPcDiv = document.createElement("div")
let conteo = document.createElement("p")
let conteoPc = document.createElement("p")

function noti(msg){
    Toastify({
        text: msg,
        duration: 1500,
        style: {
            background: "rgb(92,0,0)",
            background: "linear-gradient(90deg, rgba(92,0,0,1) 0%, rgba(112,0,0,1) 10%, rgba(187,0,0,1) 79%, rgba(255,0,0,1) 100%)"
        }
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
    header.appendChild(container)
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
    header.appendChild(container)
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
                    nav.appendChild(logOut)
                    nav.removeChild(btn1)
                    nav.removeChild(btn2)
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
    imgs=[]
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
        cartaPc = 10;
    }
    cartaPc2 = resp.cards[3].value
    if(cartaPc2!= "JACK" && cartaPc2 != "QUEEN" && cartaPc2 != "KING" && cartaPc2 != "ACE"){
        cartaPc2= Number(cartaPc2)
    }
    if(cartaPc2 === "JACK" || cartaPc2 === "QUEEN" || cartaPc2 === "KING" || cartaPc2 === "ACE"){
        cartaPc2 = 10;
    }
    manoPc = cartaPc + cartaPc2

    imgs.push(resp.cards[0].image)
    imgs.push(resp.cards[1].image)
    imgs.push(resp.cards[2].image)
    imgs.push(resp.cards[3].image)
    
}
 
async function pedir(){
    let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`)
    let resp = await call.json()
    carta1 = resp.cards[0].value
    imgs.push(resp.cards[0].image)
    if(carta1!= "JACK" && carta1 != "QUEEN" && carta1 != "KING" && carta1 != "ACE"){
        carta1= Number(carta1)
    }
    if(carta1 === "JACK" || carta1 === "QUEEN" || carta1 === "KING" || carta1 === "ACE"){
        carta1 = 10;
    }
    mano+=carta1
    let ult = imgs[imgs.length - 1]
    conteo.innerHTML = `Sacaste un ${carta1}. Tu mano ahora vale ${mano}`
    imgUserDiv.innerHTML += `<img src="${ult}" width = 100 height = auto>`;
    if(mano===21){
        cartasUserDiv.classList.add("won")
        cartasPcDiv.classList.add("lose")
        cont()
    }
    if(mano>21){
        cartasUserDiv.classList.add("lose")
        cartasPcDiv.classList.add("won")
        lost++
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        cont()
    }
}

async function quedarse(){
    let y = 0
    for (y = 0;manoPc<17;y++){
        console.log(imgs.length)
        let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`)
        let resp = await call.json()
        cartaPc = resp.cards[0].value
        imgPcDiv.innerHTML += `<img src="${resp.cards[0].image}" width = 100 height = auto>`
        if(cartaPc!= "JACK" && cartaPc != "QUEEN" && cartaPc != "KING" && cartaPc != "ACE"){
            cartaPc= Number(cartaPc)
        }
        if(cartaPc === "JACK" || cartaPc === "QUEEN" || cartaPc === "KING" || cartaPc === "ACE"){
            cartaPc = 10;
        }
        manoPc+=cartaPc;
    }
    console.log(cartaPc2)
    console.log(cartaPc)
    conteoPc.innerHTML = `La casa sacó ${y} cartas y se quedó con ${manoPc}`
    imgPcDiv.innerHTML += `<img src="${imgs[3]}" width = 100 height = auto>`


    if(manoPc>21){
        cartasPcDiv.classList.add("lose")
        cartasUserDiv.classList.add("won")
        won++;
        cont()
    }else if(mano<manoPc && manoPc<21){
        cartasPcDiv.classList.add("won")
        cartasUserDiv.classList.add("lose")
        lost++
        cont();
    }else if(mano === manoPc){
        cartasPcDiv.classList.add("won")
        cartasUserDiv.classList.add("won")
        draw++;
        cont()
    }else if(mano>manoPc && mano<21){
        cartasPcDiv.classList.add("lose")
        cartasUserDiv.classList.add("won")
        won++
        cont()
    }else if(manoPc === 21){
        cartasPcDiv.classList.add("won")
        cartasUserDiv.classList.add("lose")
        lost++
        cont()
    }
}

async function jugar(){
    if(auth === false){
       noti("Es necesario iniciar sesion para poder jugar")
    }else{
        cartasPcDiv.classList.remove("won", "lose")
        cartasUserDiv.classList.remove("won", "lose")
        seguir.remove()
        stats.remove()
        cartasPcDiv.innerHTML = ``
        cartasUserDiv.innerHTML = ``
        imgUserDiv.innerHTML = ``
        imgPcDiv.innerHTML = ``
        cartas.innerHTML = ``
        let i = 0
        btnPedir.disabled=false;
        btnQuedar.disabled=false;
        mano = 0;
        manoPc = 0;
        await repartir();
        btnPedir.style.visibility = `visible`;
        btnQuedar.style.visibility = `visible`;
        cartas.appendChild(cartasPcDiv)
        cartas.appendChild(cartasUserDiv)
        cartasPcDiv.innerHTML = `<h2>Cartas de la casa </h2>`
        cartasUserDiv.innerHTML = `<h2>Tus cartas</h2>`
        cartasPcDiv.appendChild(conteoPc)
        cartasUserDiv.appendChild(conteo)
        cartasPcDiv.appendChild(imgPcDiv)
        cartasUserDiv.appendChild(imgUserDiv)
        conteo.innerHTML = `Tu mano vale ${mano}`
        conteoPc.innerHTML = `${cartaPc} y una carta oculta.`
        imgs.forEach(element => {
            if(i<2){
                let imgJugador = document.createElement("img")
                imgJugador.width = 100
                imgJugador.height.innerHTML = "auto"
                imgJugador.src = element
                imgUserDiv.appendChild(imgJugador)
                }
            if(i==2){
                let imgPc = document.createElement("img")
                imgPc.width = 100
                imgPc.height.innerHTML = "auto"
                imgPc.src = element
                imgPcDiv.appendChild(imgPc)
                }
            i++    
            });
        }
        if(mano === 21){
            cartas.innerHTML = `Blackjack! Ganaste!`
            cont();
        }
    }


function cont(){
    body.appendChild(seguir)
}

function fin(){ 
    body.appendChild(stats)
    stats.innerHTML =`<h2>Estadisticas:</h2>Victorias: ${won}
    Derrotas: ${lost}
    Empates: ${draw}`
}

let stats = document.createElement("div");
let nav = document.getElementById("nav");
let logOut = document.createElement("button")
logOut.innerHTML = `Cerrar sesión`
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


logOut.addEventListener("click", () =>{
    auth= false;
    nav.insertBefore(btn1,nav.firstChild)
    nav.insertBefore(btn2, nav.firstChild)
    nav.removeChild(logOut)
})

btnPedir.addEventListener("click", () =>{
    pedir();
})


btnQuedar.addEventListener("click", () =>{
    btnPedir.disabled = true;
    btnQuedar.disabled = true;
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
seguir.appendChild(si)
seguir.appendChild(no)         

si.addEventListener("click", () =>{
    body.removeChild(seguir)
    cartasUserDiv.classList.remove("won", "lose")
    cartasPcDiv.classList.remove("won", "lose")
    jugar()
})

no.addEventListener("click", () =>{
    body.removeChild(seguir)
    fin();
})

const btnMode = document.createElement("button")
btnMode.innerHTML = "Tema claro/Tema oscuro"
nav.appendChild(btnMode);

document.body.classList.add(localStorage.getItem("tema"))

function mode(){
    let tema = localStorage.getItem("tema")
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

let infoBtn = document.getElementById("infoIcon");
infoBtn.addEventListener("click", ()=>{
    Swal.fire({
        title: '¿Como jugar?',
        text: 'El objetivo del juego es alcanzar el valor 21, o lo más cercano posible sin pasarse. Si sacas 21, ganas automaticamente. Si la casa se pasa de 21, ganas. Si nadie se pasa de 21, o suma 21, gana el que tenga la mano de mayor valor',
        icon: 'info',
        confirmButtonText: 'Ok!'
      })
    })

