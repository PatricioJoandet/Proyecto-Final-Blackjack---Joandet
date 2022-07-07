let carta1 = 0;
let carta2 = 0;
let cartaPc = 0;
let cartaPc2 = 0;
let mano = 0;
let manoPc = 0;
let won = 0;
let lost = 0;
let draw = 0;
let bet = 0;
let user;
const users = [];
let auth = false;
let i = 0;
let userId = 0;
let botones = document.getElementById("botones");
let cartas = document.getElementById("cartas");
let seguir = document.createElement("div");
let si = document.createElement("button");
let no = document.createElement("button");
const container = document.createElement("div")
let body = document.body
let mazoApi = 0;
let header = document.getElementById("header")
let imgs = []
let cartasUserDiv = document.createElement("div");
let cartasPcDiv = document.createElement("div");
let imgUserDiv = document.createElement("div")
let imgPcDiv = document.createElement("div")
let conteo = document.createElement("p")
let conteoPc = document.createElement("p")
let userData = document.getElementById("user")
let bets = document.getElementById("bets")
let footer = document.getElementById("footer")
let stats = document.createElement("div");
let nav = document.getElementById("nav");
const logOut = document.createElement("button")
const btnIniciar = document.createElement("button");
const btnNew = document.createElement("button");
const btnPlay = document.createElement("button");
const btnRec = document.createElement("button");
const btnPedir = document.createElement("button");
const btnQuedar = document.createElement("button");
const btnBet = document.createElement("button")
const btnDeal = document.createElement("button")
const btnMode = document.createElement("button")
let betting = document.createElement("div")
let infoBtn = document.getElementById("infoIcon");
let ganancia = 0;

btnIniciar.innerHTML = "Login";
btnNew.innerHTML = "Sign Up";
btnPlay.innerHTML = "Jugar";
btnRec.innerHTML = "Recarga";
btnPedir.innerHTML = "Pedir";
btnQuedar.innerHTML = "Quedarse";
btnBet.innerHTML = `Apostar`;
btnDeal.innerHTML = `Repartir`;
seguir.innerHTML = `<p>¿Seguir jugando?</p>`;
logOut.innerHTML = `Cerrar sesión`
si.innerHTML = "Si";
no.innerHTML = "No";
btnMode.innerHTML = "Tema claro/Tema oscuro";


nav.appendChild(btnIniciar);
nav.appendChild(btnNew);
nav.appendChild(btnPlay);
nav.appendChild(btnRec);
nav.appendChild(btnMode);
seguir.appendChild(si)
seguir.appendChild(no)

body.classList.add(localStorage.getItem("tema"))
cartasPcDiv.classList.add("cartasBox")
cartasUserDiv.classList.add("cartasBox")
container.id = "container"

function notiError(msg){
    Toastify({
        text: msg,
        duration: 1500,
        style: {
            background: "rgb(92,0,0)",
            background: "linear-gradient(90deg, rgba(92,0,0,1) 0%, rgba(112,0,0,1) 10%, rgba(187,0,0,1) 79%, rgba(255,0,0,1) 100%)"
        }
        }).showToast();
}

function notiOk(msg){
    Toastify({
        text: msg,
        duration: 1500,
        style: {
            background: "rgb(34,193,195)",
            background: "linear-gradient(79deg, rgba(34,193,195,1) 0%, rgba(43,228,101,1) 100%)"
        }
        }).showToast();
}

class User{
    constructor(nombre, pass, fichas, ganancia){
        this.nombre = nombre;
        this.pass = pass;
        this.fichas = fichas;
        this.ganancia = ganancia;
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
    btnCrear.addEventListener("click", ()=>{

        if(userCreate.value === "" || userCreatePass.value === ""){
            notiError(`Error de registro, intentelo nuevamente`); 
        }else{
            users[i] = new User(userCreate.value,userCreatePass.value,100,0)
            i++;
            userCreate.remove()
            userCreatePass.remove()
            btnCrear.remove()
            notiOk("Registro exitoso, inicie sesion para continuar.");
        }
    })
}

function login(){ 
    const ok = document.createElement("button");
    const userLogin = document.createElement("input");
    const userPass = document.createElement("input");
    const btnLogin = document.createElement("button");
    btnLogin.innerHTML = "Log in";
    ok.innerHTML = "Continuar";
    userLogin.type = "text";
    userLogin.placeholder = "Usuario";
    userPass.type = "password";
    userPass.placeholder= "Contraseña";
    header.appendChild(container);
    container.appendChild(userLogin);
    container.appendChild(userPass);
    container.appendChild(btnLogin);
    btnLogin.addEventListener("click", ()=>{
        let userLoginInput = userLogin.value;
        let userPassInput = userPass.value;
        if(users.length === 0 || userLogin.value === "" || userPass.value === ""){
            container.innerHTML = "";
            notiError(`Usuario y contraseña no encontrados o incorrectos`);
            auth = false;
        }else{
            for(let j=0;j<users.length;j++){
                if(userLoginInput === users[j].nombre && userPassInput === users[j].pass){
                    notiOk(`Ingreso correcto. Bienvenido/a ${users[j].nombre}`)
                    auth = true;
                    userId = j;
                    nav.appendChild(logOut);
                    nav.removeChild(btnIniciar);
                    nav.removeChild(btnNew);
                    userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
                    break;
                }
            if(auth===false){
                container.innerHTML = "";
                notiError(`Usuario y contraseña no encontrados o incorrectos`);
                auth = false;
            }
        }
        userLogin.remove();
        userPass.remove();
        btnLogin.remove();
        }
    })
}

function recarga(){
    if(auth === false){
        notiError(`Para ver y recargar fichas es necesario estar logueado.`);       
    }else{
        notiOk(`Tenes ${users[userId].fichas} fichas.`);
        const cargar = document.createElement("button");
        const cargaInput = document.createElement("input");
        cargar.innerHTML = "Cargar";
        cargaInput.placeholder= "Cantidad de fichas a cargar";
        header.appendChild(container);
        container.appendChild(cargaInput);
        container.appendChild(cargar);
        cargar.addEventListener("click",()=>{
            carga = Number(cargaInput.value);
            if(isNaN(carga) || carga<0){
                notiError("Ingrese un monto valido")
            }else{
                users[userId].fichas+=carga;
                userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
                notiOk(`Ahora tenes ${users[userId].fichas}. Suerte!`);
                container.remove();}
        })
    }
}

async function repartir(){
    imgs=[];
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
        carta1= Number(carta1);
    }
    if(carta1 === "JACK" || carta1 === "QUEEN" || carta1 === "KING"){
        carta1 = 10;
    }

    carta2 = resp.cards[1].value;
    if(carta2 != "JACK" && carta2 != "QUEEN" && carta2 != "KING" && carta2 != "ACE"){
        carta2= Number(carta2);
    }
    if(carta2 === "JACK" || carta2 === "QUEEN" || carta2 === "KING"){
        carta2 = 10;
    }
    if(carta1 === "ACE" || carta2 === "ACE"){
        if(carta1==="ACE"){
            if(carta2+11>21){
                carta1 = 1
            }else{
                carta1 = 11
            }
        }else{
            if(carta1+11>21){
                carta2 = 1
            }else{
                carta2 = 11
            }
        }
    }
    mano = carta1 + carta2;

    cartaPc = resp.cards[2].value;
    if(cartaPc!= "JACK" && cartaPc != "QUEEN" && cartaPc != "KING" && cartaPc != "ACE"){
        cartaPc= Number(cartaPc);
    }
    if(cartaPc === "JACK" || cartaPc === "QUEEN" || cartaPc === "KING" || cartaPc === "ACE"){
        cartaPc = 10;
    }
    cartaPc2 = resp.cards[3].value;
    if(cartaPc2!= "JACK" && cartaPc2 != "QUEEN" && cartaPc2 != "KING" && cartaPc2 != "ACE"){
        cartaPc2= Number(cartaPc2);
    }
    if(cartaPc2 === "JACK" || cartaPc2 === "QUEEN" || cartaPc2 === "KING" || cartaPc2 === "ACE"){
        cartaPc2 = 10;
    }
    manoPc = cartaPc + cartaPc2;

    imgs.push(resp.cards[0].image);
    imgs.push(resp.cards[1].image);
    imgs.push(resp.cards[2].image);
    imgs.push(resp.cards[3].image);
    
}
 
async function pedir(){
    let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`)
    let resp = await call.json()
    carta1 = resp.cards[0].value;
    imgs.push(resp.cards[0].image)
    if(carta1!= "JACK" && carta1 != "QUEEN" && carta1 != "KING" && carta1 != "ACE"){
        carta1= Number(carta1);
    }
    if(carta1 === "JACK" || carta1 === "QUEEN" || carta1 === "KING"){
        carta1 = 10;
    }
    if(carta1 === "ACE"){
        if(mano+11>21){
            carta1 = 1
        }else{
            carta1 = 11
        }
    }

    mano+=carta1
    let ult = imgs[imgs.length - 1];
    conteo.innerHTML = `Sacaste un ${carta1}. Tu mano ahora vale ${mano}`;
    imgUserDiv.innerHTML += `<img src="${ult}" width = 100 height = auto>`;
    if(mano===21){
        cartasUserDiv.classList.add("won");
        cartasPcDiv.classList.add("lose");
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        users[userId].fichas+=bet*2;
        users[userId].ganancia+=bet;
        won++;
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        cont();
    }
    if(mano>21){
        cartasUserDiv.classList.add("lose");
        cartasPcDiv.classList.add("won");
        lost++;
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        users[userId].ganancia-=bet;
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        cont();
    }
}

async function quedarse(){
    imgPcDiv.innerHTML += `<img src="${imgs[3]}" width = 100 height = auto>`;
    let y = 0;
    for (y = 0;manoPc<17 && manoPc<mano;y++){
        let call = await fetch(`https://deckofcardsapi.com/api/deck/${mazoApi.deck_id}/draw/?count=1`);
        let resp = await call.json();
        cartaPc = resp.cards[0].value;
        imgPcDiv.innerHTML += `<img src="${resp.cards[0].image}" width = 100 height = auto>`;
        if(cartaPc!= "JACK" && cartaPc != "QUEEN" && cartaPc != "KING" && cartaPc != "ACE"){
            cartaPc= Number(cartaPc);
        }
        if(cartaPc === "JACK" || cartaPc === "QUEEN" || cartaPc === "KING" || cartaPc === "ACE"){
            cartaPc = 10;
        }
        manoPc+=cartaPc;
    }
    if(y===0){
        conteoPc.innerHTML = `La casa se quedó con ${manoPc}`
    }else{
        conteoPc.innerHTML = `La casa sacó ${y} cartas y se quedó con ${manoPc}`
    }
    if(manoPc>21){
        cartasPcDiv.classList.add("lose");
        cartasUserDiv.classList.add("won");
        users[userId].fichas+=bet*2;
        users[userId].ganancia+=bet
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        won++;
        cont();
    }else if(mano<manoPc && manoPc<21){
        cartasPcDiv.classList.add("won");
        cartasUserDiv.classList.add("lose");
        users[userId].ganancia-=bet
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        lost++;
        cont();
    }else if(mano === manoPc){
        cartasPcDiv.classList.add("won");
        cartasUserDiv.classList.add("won");
        users[userId].fichas+=bet;
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        draw++;
        cont();
    }else if(mano>manoPc && mano<21){
        cartasPcDiv.classList.add("lose");
        cartasUserDiv.classList.add("won");
        users[userId].fichas+=bet*2;
        users[userId].ganancia+=bet
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        won++;
        cont();
    }else if(manoPc === 21){
        cartasPcDiv.classList.add("won");
        cartasUserDiv.classList.add("lose");
        users[userId].ganancia-=bet
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        lost++;
        cont();
    }
}

function apuesta(){
    bet = 0;
    container.innerHTML = ``;
    let betInput = document.createElement("input");
    betInput.placeholder = `Fichas a apostar`;
    const ok = document.createElement("button");
    ok.innerHTML = "Apostar";
    container.appendChild(betInput);
    container.appendChild(ok);
    bets.appendChild(container);
    ok.addEventListener("click", () =>{
        if(Number(betInput.value)>users[userId].fichas){
            notiError("No tenes saldo suficiente. Hace una recarga.");
        }else if(Number(betInput.value)<=0 || isNaN(betInput.value)){
            notiError("Apuesta invalida");
            apuesta();
        }else{
            bet = Number(betInput.value);
            users[userId].fichas-=bet;
            userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
            container.remove();
            betting.innerHTML = `<p>Apuestas: ${bet}</p> `;
        }
    })
}

async function jugar(){
    if(auth === false){
       notiError("Es necesario iniciar sesion para poder jugar");
    }else{
        conteo.innerHTML = ``;
        conteoPc.innerHTML = ``;
        mano = 0;
        manoPc = 0;
        cartaPc = 0;
        bet= 0;
        btnDeal.disabled=false;
        btnBet.disabled=false;
        botones.appendChild(btnBet);
        botones.appendChild(btnDeal);
        botones.appendChild(btnPedir);
        botones.appendChild(btnQuedar);
        bets.classList.add("betsBox");
        cartasPcDiv.classList.remove("won", "lose");
        cartasUserDiv.classList.remove("won", "lose");
        bets.innerHTML = `<h2>Apuestas</h2>`;
        betting.innerHTML = `<p>Apuestas: ${bet}</p>`;
        bets.appendChild(betting);
        seguir.remove();
        stats.remove();
        cartasPcDiv.innerHTML = ``;
        cartasUserDiv.innerHTML = ``;
        imgUserDiv.innerHTML = ``;
        imgPcDiv.innerHTML = ``;
        cartas.innerHTML = ``;
        mano = 0;
        manoPc = 0;
        btnPedir.disabled = true;
        btnQuedar.disabled = true;
        cartas.appendChild(cartasPcDiv);
        cartas.appendChild(cartasUserDiv);
        cartasPcDiv.innerHTML = `<h2>Cartas de la casa </h2>`;
        cartasUserDiv.innerHTML = `<h2>Tus cartas</h2>`;
        cartasPcDiv.appendChild(conteoPc);
        cartasUserDiv.appendChild(conteo);
        cartasPcDiv.appendChild(imgPcDiv);
        cartasUserDiv.appendChild(imgUserDiv);
        }
}

function cont(){
    body.insertBefore(seguir, footer);
}

function fin(){ 
    body.insertBefore(stats, footer);
    stats.innerHTML =`<h2>Estadisticas:</h2>Victorias: ${won}
    Derrotas: ${lost}
    Empates: ${draw}`;
}

function mode(){
    let tema = localStorage.getItem("tema");
}

btnDeal.addEventListener("click", async () =>{
    btnBet.disabled = true;
    btnDeal.disabled = true;
    btnPedir.disabled = false;
    btnQuedar.disabled = false;
    let i = 0;
    await repartir()
    imgs.forEach(element => {
        if(i<2){
            let imgJugador = document.createElement("img");
            imgJugador.width = 100;
            imgJugador.height.innerHTML = "auto";
            imgJugador.src = element;
            imgUserDiv.appendChild(imgJugador);
            }
        if(i==2){
            let imgPc = document.createElement("img");
            imgPc.width = 100;
            imgPc.height.innerHTML = "auto";
            imgPc.src = element;
            imgPcDiv.appendChild(imgPc);
            }
        i++;
        });
    conteo.innerHTML = `Tu mano vale ${mano}`;
    conteoPc.innerHTML = `${cartaPc} y una carta oculta.`;  
    if(mano === 21){
        conteo.innerHTML = `Blackjack! Ganaste!`
        cartasPcDiv.classList.add("lose");
        cartasUserDiv.classList.add("won");
        users[userId].fichas+=bet*3;
        users[userId].ganancia+=bet*2
        userData.innerHTML = `<b>Usuario:</b> ${users[userId].nombre} <b>Fichas:</b> ${users[userId].fichas} <b>Ganancias:</b> ${users[userId].ganancia}`;
        won++;
        cont();
    }  
})

logOut.addEventListener("click", () =>{
    auth= false;
    userData.innerHTML = ``;
    cartas.innerHTML = ``;
    botones.innerHTML= ``;
    bets.innerHTML= ``;
    bets.classList.remove("betsBox")
    stats.innerHTML = ``;
    nav.insertBefore(btnIniciar,nav.firstChild);
    nav.insertBefore(btnNew, nav.firstChild);
    nav.removeChild(logOut);
})

btnPedir.addEventListener("click", () =>{
    pedir();
})

btnQuedar.addEventListener("click", () =>{
    btnPedir.disabled = true;
    btnQuedar.disabled = true;
    quedarse();
})

btnBet.addEventListener("click", ()=>{
    apuesta();
})

btnIniciar.addEventListener("click", () => {
    container.innerHTML= "";
    login();
});

btnNew.addEventListener("click", () => {
    container.innerHTML= "";
    crearUser();
});

btnPlay.addEventListener("click", () => {
    jugar();
});

btnRec.addEventListener("click", () => {
    container.innerHTML= "";
    recarga();
});

si.addEventListener("click", () =>{
    body.removeChild(seguir);
    cartasUserDiv.classList.remove("won", "lose");
    cartasPcDiv.classList.remove("won", "lose");
    jugar();
})

no.addEventListener("click", () =>{
    body.removeChild(seguir);
    fin();
})

btnMode.addEventListener("click", () =>{
    if(document.body.className === "null"){
        document.body.classList.add("dkMode");
        localStorage.setItem("tema","dkMode");
        mode();
    }
    
    if(document.body.className === "lgMode"){
        document.body.classList.remove("lgMode");
        document.body.classList.add("dkMode");
        localStorage.setItem("tema","dkMode");
        mode()
    }else if(document.body.className === "dkMode"){
        localStorage.setItem("tema","lgMode");
        document.body.classList.remove("dkMode");
        document.body.classList.add("lgMode");
        mode();
    }
})

infoBtn.addEventListener("click", ()=>{
    Swal.fire({
        title: '¿Como jugar?',
        text: 'El objetivo del juego es alcanzar el valor 21, o lo más cercano posible sin pasarse. Si sacas 21, ganas automaticamente. Si la casa se pasa de 21, ganas. Si nadie se pasa de 21, o suma 21, gana el que tenga la mano de mayor valor',
        icon: 'info',
        confirmButtonText: 'Ok!'
      })
    })