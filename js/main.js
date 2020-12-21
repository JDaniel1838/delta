const d = document,
    w = window,
    detenerNarrador = w.speechSynthesis,
    BotonMicro = d.querySelector(".microfonoDes"),
    APINarrador = new SpeechSynthesisUtterance(),
    APIPregunta = new SpeechSynthesisUtterance(),
    
    
    /*Instrucciones API RECONOMIENTO VOZ */
    APIVoz = new webkitSpeechRecognition();
    APIVoz.lang = "es-ES";
APIVoz.continuous = true;
APIVoz.interimResults = false;


//Intruccion Voz pregunta 
let VocesA = [],
    VocesEspaniol = [],
    fecha = new Date();
HoraActual = fecha.getHours(),
    saludo = undefined,
    PreguntaActiva = false,
    contadorPregunta = 0;


Voces();
const MicroDest = d.querySelector(".microfonoDes"),
    MicroAct = d.querySelector(".microfonoAct"),
    Pintruccions = d.querySelector(".textoMicroActivado"),
    Confirmar = d.querySelector(".si"),
    Denegar = d.querySelector(".no"),
    ActivarDIV = d.querySelector(".ConfirmarBusqueda");

let Pregunta;//variable contiene el reconocimiento de voz;



/*Variables preguntas */
//R de respuesta
//Array pera Funtion Chistes 
let horaR,
    fechaR,
    NumYaUsados = [],
    EsAqui = false,
    PreguntaGoogle = false;








/*FUNCIONES DE PREGUNTAS */
function FuncHora() {
    let Tiempo = new Date(),
        hora = Tiempo.getHours(),
        minutos = Tiempo.getMinutes(),
        f24Hrs = Tiempo.getHours(),
        AmPm;

        if (hora<=12) {
            hora = Tiempo.getHours();
        }
    
        if (hora>12) {
            (Tiempo.getHours() - 12);
        }
    
        if (f24Hrs<=12) {
            AmPm = "am";
        }
        if (f24Hrs>13) {
            AmPm = "pm"
    }

    horaR = `La hora es ${hora} ${minutos} ${AmPm}`
    
    return horaR;
}


function FuntDia() {
    let Tiempo = new Date(),
        Dia = Tiempo.getDay(),
        DiaMes = Tiempo.getDate(),
        Mes = Tiempo.getMonth(),
        Anio = Tiempo.getFullYear();
    
    if (Dia === 0) {
        Dia = "Domingo";
    }
    
    if (Dia === 1) {
        Dia = "Lunes";
    }

    if (Dia === 2) {
        Dia = "Martes";
    }

    if (Dia === 3) {
        Dia = "Miercoles";
    }

    if (Dia === 4) {
        Dia = "Jueves";
    }

    if (Dia === 5) {
        Dia = "Viernes";
    }

    if (Dia === 6) {
        Dia = "Sabado";
    }

    if (Mes === 0) {
        Mes = "Enero";
    }

    if (Mes === 1) {
        Mes = "Febrero";
    }

    if (Mes === 2) {
        Mes = "Marzo";
    }

    if (Mes === 3) {
        Mes = "Abril";
    }

    if (Mes === 4) {
        Mes = "Mayo";
    }

    if (Mes === 5) {
        Mes = "Junio";
    }

    if (Mes === 6) {
        Mes = "Julio";
    }

    if (Mes === 7) {
        Mes = "Agosto";
    }

    if (Mes === 8) {
        Mes = "Septiembre";
    }

    if (Mes === 9) {
        Mes = "Octubre";
    }

    if (Mes === 10) {
        Mes = "Noviembre";
    }

    if (Mes === 11) {
        Mes = "Diciembre";
    }

    fechaR = `hoy es ${Dia} ${DiaMes} de ${Mes} del ${Anio}`
    return fechaR;
}

function funtOperaciones(StringConOper){
    let SepararString = StringConOper.split(''),//Convierte String a Array
        
        //VARIABLES PARA LOS SIMBOLOS
        BuscarSuma = SepararString.indexOf("+"),//posicion donde esta el simbolo "+"
        BuscarREsta = SepararString.indexOf("-"),
        BuscarMult = SepararString.indexOf("*"),
        BuscarDiv = SepararString.indexOf("/"),
    
        PreguntaOperacion = SepararString.join(''), //convierte el array en string

        ExpSumaLetra = new RegExp("mas", ""), //Expresion Regular por si viene en letra
        ExpRestaLetra = new RegExp("menos", ""),
        ExpMultLetra = new RegExp("por", ""),
        ExpDivLetra = new RegExp("entre", ""),

        VarIfSuma = ExpSumaLetra.test(PreguntaOperacion),
        VarIfResta = ExpRestaLetra.test(PreguntaOperacion),
        VarIFMult = ExpMultLetra.test(PreguntaOperacion),
        VarIFDiv = ExpDivLetra.test(PreguntaOperacion);
    

    if (BuscarSuma >1|| VarIfSuma === true) {
        let PreguntaEnSuma = undefined;

        if (BuscarSuma > 1) {
            SepararString.splice(BuscarSuma, 1, "mas");//remplaza el "+" por mas
            PreguntaEnSuma = SepararString.join('');
        }

        if (VarIfSuma === true) {
            PreguntaEnSuma = SepararString.join('');
        }

        let Expresion = new RegExp("es", "");
        let VEmpierza1Num = ((Expresion.exec(PreguntaEnSuma)["index"]) + 3),
            VTermina1Num = ExpSumaLetra.exec(PreguntaEnSuma)["index"],
            ResultadoSuma = undefined;
        
        //cambiar todos los PreguntaOperacionSuma de los puntos
        
        
        let Num1 = PreguntaEnSuma.substring(VEmpierza1Num, VTermina1Num),
        Num2 = PreguntaEnSuma.substring((VTermina1Num + 4), PreguntaEnSuma.length);
    
        ResultadoSuma = (parseInt(Num1) + parseInt(Num2));
        APIPregunta.text = `${Num1} mas ${Num2} es ${ResultadoSuma}`;
        detenerNarrador.speak(APIPregunta);

        setTimeout(() => {
            MicroDest.classList.add("activado");
            MicroAct.classList.remove("activado");
        }, 1800);
        Pintruccions.textContent = ``;
    }


    
    if (BuscarREsta >1 || VarIfResta === true) {
        let PreguntaEnResta = undefined;

        if (BuscarREsta > 1) {
            SepararString.splice(BuscarREsta, 1, "menos");//remplaza el "+" por mas
            PreguntaEnResta = SepararString.join('');
        }

        if (VarIfResta === true) {
            PreguntaEnResta = SepararString.join('');
        }

        let Expresion = new RegExp("es", "");
        let VEmpierza1Num = ((Expresion.exec(PreguntaEnResta)["index"]) + 3),
            VTermina1Num = ExpRestaLetra.exec(PreguntaEnResta)["index"],
            ResultadoResta = undefined;
        
        //cambiar todos los PreguntaOperacionSuma de los puntos
        
        
        let Num1 = PreguntaEnResta.substring(VEmpierza1Num, VTermina1Num),
        Num2 = PreguntaEnResta.substring((VTermina1Num + 6), PreguntaEnResta.length);
    
        ResultadoResta = (parseInt(Num1) - parseInt(Num2));
        APIPregunta.text = `${Num1} menos ${Num2} es ${ResultadoResta}`;
        detenerNarrador.speak(APIPregunta);

        setTimeout(() => {
            MicroDest.classList.add("activado");
            MicroAct.classList.remove("activado");
        }, 1800);
        Pintruccions.textContent = ``;

    }
    
    if (BuscarMult >1|| VarIFMult === true) {
        let PreguntaEnMult = undefined;

        if (BuscarMult > 1) {
            SepararString.splice(BuscarMult, 1, "por");//remplaza el "+" por mas
            PreguntaEnMult = SepararString.join('');
        }

        if (VarIFMult === true) {
            PreguntaEnMult = SepararString.join('');
        }

        let Expresion = new RegExp("es", "");
        let VEmpierza1Num = ((Expresion.exec(PreguntaEnMult)["index"]) + 3),
            VTermina1Num = ExpMultLetra.exec(PreguntaEnMult)["index"],
            ResultadoMult = undefined;
        
        //cambiar todos los PreguntaOperacionSuma de los puntos
        
        
        let Num1 = PreguntaEnMult.substring(VEmpierza1Num, VTermina1Num),
        Num2 = PreguntaEnMult.substring((VTermina1Num + 4), PreguntaEnMult.length);
    
        ResultadoMult = (parseInt(Num1) * parseInt(Num2));
        APIPregunta.text = `${Num1} por ${Num2} es ${ResultadoMult}`;
        detenerNarrador.speak(APIPregunta);

        setTimeout(() => {
            MicroDest.classList.add("activado");
            MicroAct.classList.remove("activado");
        }, 1800);
        Pintruccions.textContent = ``;
    }



    if (BuscarDiv >1|| VarIFDiv === true) {
        let PreguntaEnDiv = undefined;

        if (BuscarSuma > 1) {
            SepararString.splice(BuscarSuma, 1, "mas");//remplaza el "+" por mas
            PreguntaEnDiv = SepararString.join('');
        }

        if (VarIFDiv === true) {
            PreguntaEnDiv = SepararString.join('');
        }

        let Expresion = new RegExp("es", "");
        let VEmpierza1Num = ((Expresion.exec(PreguntaEnDiv)["index"]) + 3),
            VTermina1Num = ExpDivLetra.exec(PreguntaEnDiv)["index"],
            ResultadoDiv = undefined;
        
        //cambiar todos los PreguntaOperacionSuma de los puntos
        
        
        let Num1 = PreguntaEnDiv.substring(VEmpierza1Num, VTermina1Num),
        Num2 = PreguntaEnDiv.substring((VTermina1Num + 6), PreguntaEnDiv.length);
    
        ResultadoDiv = (parseInt(Num1) / parseInt(Num2));


        APIPregunta.text = `${Num1} entre ${Num2} es ${ResultadoDiv.toFixed(2)}`;
        
        detenerNarrador.speak(APIPregunta);

        setTimeout(() => {
            MicroDest.classList.add("activado");
            MicroAct.classList.remove("activado");
        }, 1800);
        Pintruccions.textContent = ``;
    }
    


}


function CuentaChistes() {
    let Chistes = ["¿Qué le dice un jaguar a otro jaguar?. Jaguar you", "¿Por qué un huevo fue al banco a pedir dinero prestado?. Porque estaba quebrado", "¿Qué le dice una taza a otra?. ¿Qué taza ciendo?", "¿Qué bebe el hombre invisible a la hora de almuerzo?. Leche evaporada", "¿Por qué lloraba el libro de matemáticas?. ¡Porque tenía muchos problemas!","¿Qué le dijo el 0 al 8?. Me gusta tu cinturón", "¿Cuál animal puede saltar más alto que una casa?. Cualquiera, porque las casas no saltan.", "¿Cómo estornuda un tomate?. ¡Keeeétchup!","¿Qué le dijo un techo a otro techo?. Techo de menos"],
        NumActual = Math.round(Math.random() * Chistes.length);
    
    function NumNoRepert() {

        while (NumYaUsados.includes(NumActual) === true) {
            NumActual = Math.ceil(NumActual / 2) + Math.round(Math.random() * 3); 
        }
        
        NumYaUsados.push(NumActual);

    }
    NumNoRepert();
    
    if (Chistes[NumActual] === undefined) {
        Chistes[NumActual] = "¿Qué le dice un pato a otro pato? ¡Estamos empatados!";
    }

    if (NumActual > Chistes.length) {
        Chistes[NumActual] = "¿Por qué está feliz la escoba?. Porque ba, rriendo.";
    }

    if (Chistes.length === NumYaUsados.length) {
        Chistes[NumActual] = "Lo lamento, ya no me se mas chistes.";
    }
    
    APIPregunta.text = Chistes[NumActual];
    detenerNarrador.speak(APIPregunta);
    
    setTimeout(() => {
        MicroDest.classList.add("activado");
        MicroAct.classList.remove("activado");
    }, 1800);
    Pintruccions.textContent = ``;

}

function  Carusel() {
    const $slides = d.querySelectorAll(".slider-slide");
    
    let i = 0;
    
    setInterval(() => {
        $slides[i].classList.remove("activado");
        i++
        if (i >= $slides.length) {
            i = 0;  
        }
        $slides[i].classList.add("activado");
    }, 12000);
}

function SonidoFinal(audio) {
    const $Sonido = d.createElement("audio");
    $Sonido.src = audio;
    $Sonido.play();
}



function BusquedaExterna(PreguntadeBusqueda) {
    detenerNarrador.cancel();
    ActivarDIV.classList.remove("activado");

    let tester,
        BuscaEpacios = new RegExp(" ", "gi"),
        url,
        ExpBuscaEspacios = PreguntadeBusqueda.replace(BuscaEpacios, '+'),
        largoDePantalla = w.outerHeight,
        anchoDePantalla = w.outerWidth;
    
    url = `https://www.google.com/search?q=${ExpBuscaEspacios}`;


    tester = window.open(url, "tester",
        `innerWidth=${anchoDePantalla},
        innerHeight=${largoDePantalla}`);
    
    Pregunta = ``;
    APINarrador.text = `esto es lo que encontre sobre, ${PreguntadeBusqueda}`;

    detenerNarrador.speak(APINarrador);
    location.reload();



}


























/*Funcion con las voces para el navegador*/
function Voces() {
    
    
    if (HoraActual>= 0 & HoraActual<=6) {
        saludo = "Buenas noches";
    }

    if (HoraActual>= 7 & HoraActual<=11) {
        saludo = "Buenos Dias";
    }

    if (HoraActual>= 12 & HoraActual<=18) {
        saludo = "Buenas Tardes";
    }

    if (HoraActual>= 19 & HoraActual<=24) {
        saludo = "Buenas noches";
    }

    d.addEventListener("DOMContentLoaded", (e) => {
        detenerNarrador.addEventListener("voiceschanged", (e) => {
            VocesA = detenerNarrador.getVoices();
            VocesA.forEach((Voz) => {
                if (Voz.name == "Microsoft Sabina Desktop - Spanish (Mexico)" || Voz.name == "Google español" || Voz.name == "Microsoft Helena Desktop - Spanish (Spain)") {
                    VocesEspaniol.push(Voz);
                }//Google español
            });
        });

        FuncHora();
        FuntDia();
        //Carusel();
    });
    
    APIVoz.onresult = (e) => {
        const Resultados = e.results,
            PreguntaEnDOM = d.querySelector(".textoIntrucciones");
        Pregunta = Resultados[Resultados.length - 1][0].transcript;

        Pintruccions.textContent += `${Pregunta}`;
            Pintruccions.classList.add("activado");
        console.log(Pregunta);
        PreguntaEnDOM.classList.add("activado");
    }

    d.addEventListener("click", (e) => {

        if (e.target === BotonMicro) {
            detenerNarrador.cancel();
            PreguntaActiva = true;
            Pintruccions.textContent = ``;

            MicroDest.classList.remove("activado");
            MicroAct.classList.add("activado");


            APINarrador.voice = VocesEspaniol[1];
            APINarrador.text = `${saludo}, En que te puedo ayudar?`;

            detenerNarrador.speak(APINarrador);
            
            
            
            
            //Voz de respuesta
            APIPregunta.voice = VocesEspaniol[1];
            setTimeout(() => {
                APIVoz.start();    
            }, 2600);
        }

        if (e.target === MicroAct) {
            TeclaEnter(e);
        }

        if (e.target === Confirmar) {
            APIVoz.abort();
            BusquedaExterna(Pregunta);
        }

        if (e.target === Denegar) {
            APIVoz.abort();
            detenerNarrador.cancel();
            ActivarDIV.classList.remove("activado");
            APINarrador.text = `Busqueda Cancelada`;
            detenerNarrador.speak(APINarrador);

        }
    });

    //fUNCION REMUEVE ACENTOS
    const removeAccents = (caneda) => {
        return caneda.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    let Contador1 = 1;

/*Funcion TECLA ENTER deteniene grabacion*/
    function TeclaEnter(e) {
        //deteniene el narrador por si el usuario no espero, y para que no se encimen las voces
        detenerNarrador.cancel();
        APIVoz.abort();

        if (e.key === "Enter" || e.target === MicroAct) {
            EsAqui = false;
            contadorPregunta = (contadorPregunta +1);
            
            if (PreguntaActiva === true) {

                SonidoFinal("sinews/click.mp3");

                if (Pregunta === undefined || Pregunta <= 1) {
                    console.log("No entendi la pregunta");
                APINarrador.text = `No entendi la pregunta. Dila otra vez`;
                
                detenerNarrador.speak(APINarrador);
                
                setTimeout(() => {
                    MicroDest.classList.add("activado");
                    MicroAct.classList.remove("activado");
                }, 2000);
                    Pregunta = "";
                return Pintruccions.textContent = ``; 
                
                }

                if (Pregunta.length > 0) {
                    if (Pregunta.length > 0 && Contador1 === 1) {
                        
                        //remueve acentos
                        let PreguntaFinal = removeAccents(Pregunta).toLowerCase();
                        //varible por si quieren sumar
                        let VoperacionesMat = PreguntaFinal.substring(0, 9);
                        
                        
                        if (PreguntaFinal === "que hora es") {
                            console.log("pregunta de hora");
                            APIPregunta.text = horaR;
                            detenerNarrador.speak(APIPregunta);
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;
                            
                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "que dia es hoy") {
                            console.log("pregunta de fecha");
                            APIPregunta.text = fechaR;
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }

                        if (PreguntaFinal === "cuanto es uno mas uno" ) {
                            APIPregunta.text = `uno mas uno es dos`;
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            EsAqui = true;
                            Pregunta = "";
                        }
    
    
                        if (VoperacionesMat === "cuanto es") {
                            if (PreguntaFinal.length <= 9) {

                                APIPregunta.text = `a ocurrido un error, no has dicho la operacion completa`;
                                detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            return Pintruccions.textContent = `Vuelve a intentarlo`;

                            }

                            if (PreguntaFinal === "cuanto es uno mas uno" ) {
                                APIPregunta.text = `uno mas uno es dos`;
                                detenerNarrador.speak(APIPregunta);
                                Pintruccions.textContent = ``;
        
                                return setTimeout(() => {
                                    MicroDest.classList.add("activado");
                                    MicroAct.classList.remove("activado");
                                }, 1800);
                            }

                            console.log("pregunta de operacion matematica");
                            funtOperaciones(PreguntaFinal);

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "cuentame un chiste") {
                            console.log("pregunta de chiste");
                            CuentaChistes();

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "cual es tu nombre") {
                            console.log("pregunta de nombre");
                            APIPregunta.text = "Mi nombre es DELTA";
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "cual es tu color favorito") {
                            console.log("pregunta de color favorito");
                            APIPregunta.text = "Mi color favorito es el amarillo azulado";
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "cuantos anos tienes") {
                            console.log("pregunta de anios");
                            APIPregunta.text = "tengo Menos de los que aparento";
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "que significa tu nombre") {
                            console.log("pregunta de signif nombre");
                            APIPregunta.text = "DELTA es la cuarta letra en el alfabeto griego";
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
    
                        if (PreguntaFinal === "que musica te gusta") {
                            console.log("pregunta de musica");
                            APIPregunta.text = "me gusta la musica Electronica";
                            detenerNarrador.speak(APIPregunta);
    
                            setTimeout(() => {
                                MicroDest.classList.add("activado");
                                MicroAct.classList.remove("activado");
                            }, 1800);
                            Pintruccions.textContent = ``;

                            //La preguntra entra aqui si la Var EsAqui se hace true
                            EsAqui = true;
                            Pregunta = "";
                        }
                        
                    }

                } if (EsAqui === false && Pregunta.length > 0) {

                        //VARIABLES PARA LA VOZ
                    console.log("PREGUNTA DESCONOCIDA, BUSQUEDA EN GGOLE");
                        /*HABLA EL NARRADOR */
                        APIPregunta.text = "No tengo una respuesta para eso. ¿Quieres que, haga una busqueda en Google? ";
                        detenerNarrador.speak(APIPregunta);
            
                        //INICIA A ESCUCHAR EL SI O NO
                            MicroDest.classList.add("activado");
                            MicroAct.classList.remove("activado");
                        
                        Pintruccions.textContent = ``;
            
                        ActivarDIV.classList.add("activado");
                    

                }

            }

        }

    }



    

    d.addEventListener("keyup", (e) => {
        TeclaEnter(e);
    });
}






