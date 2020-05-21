// pregunta
//POSICION [0] CABECERO DE LA PREGUNTA 
	//POSICION [1] OPCION 1
	//POSICION [2] OPCION 2
	//POSICION [3] OPCION 3
	//POSICION [4] OPCION 4
	//POSICION [5] POSICION DE RESPUESTA CORRECTA 
var questions = [
	// 1
	[
		"¿Que lenguaje se utiliza para diseñar estilos en html?",
		"Javascript",
		"CSS",
		"PHP",
		"AngularJS",
		1
	],
	//2
	[
		"¿Cómo se llama la rama de las matemáticas en que los números son representados por letras y símbolos?",
		"Adición",
		"Álgebra",
		"Geometría",
		"Topología",
		1
	],
	//3
	[
	"¿Cuántos colores tenía la primera tarjeta gráfica?",
		"1",
		"4",
		"2",
	   "16",
		2
	],
	//4
	[
		"¿Quién fue el inventor de la bombilla ?",
		"Newton",
		"Edison",
		"Fahrenheit",
		"Janssen",
		1
	],
	//5
	[
		"¿Qué significan las siglas USB?",
		"Universal Serial Button",
		"Uniform Serial Bus",
		"Uniform Sonic Boom",
		"Universal Serial Bus",
		4	
	],
	//6
	[
		"¿Cuál de los siguientes números es primo?",
		"3",
		"1222",
		"36",
		"45",
		1
	],
	//7
	[
		"¿Cómo se llama el creador de Linux?",
		"Bill Gates",
		"Richard Stallman",
		"Steve Jobs",
		"Linus Torvalds",
	3
	],
	//8	
	[
		"Cuál fue la primera versión de Windows?",
		"Windows 3.0",
		"Windows 95",
		"My Windows",
		"Windows 1.0",
		3
	],
	//9
	[
		"¿A qué es igual un número dividido por si mismo?",
		"Infinito",
		"0",
		"Al número",
		"1",
		3
	],
	//10
	[
		"¿Cómo se marca el inicio de código PHP?",
		"&lt;?php",
		"&lt;?",
		"Los 2 anteriores",
		"Ninguno de los anteriores",
		2
	],
	//11
	[
		"¿Cuál lenguaje de programacion no es de alto nivel?",
		"Java",
		"Visual Basic",
		"BCPL",
		"C++",
		2
	],
	//12
	[
		"¿Quién creo la computadora?", 
		"Nikola Tesla",
		"Konrad Zuse",
		"John Von Neumann",
		"Bill Gates",
		1
	],
	//13
	[
		"¿Cuál no es un gestor de bases de datos?",
		"Oracle",
		"Db2",
		"Cassandra",
		"Ruby",
		3
	],
	//14
	[
		"¿Qué tipo de lenguaje es PHP?",
		"Interpretado",
		"Compilado",
		"Los 2 anteriores",
		"Ninguno de los anteriores",
		0
	],
	//15
	[
		"¿Quién diseño Javascript?",
		"Mark Zuckerberg",
		"Bill Gates",
		"Brendan Eich",
		"Rasmus Lerdorf",
		2
	],
	//16
	[
		"¿cual de estas es una caracteristica del producto de software?",
		"el software no se estropea... se desactualiza",
		"el software no se desarrolla... se fabrica",
		"el software no se construye a medida... se ensambla.",
		"todas las anteriores.",
		2
	],
	//17
	[
		"¿cuando implentar Cliente/Servidor?",
		"Respuesta dinnamica de mercado",
		"cambios estructurales y organizativos",
		"cambio en organigramas",
		"todas las anteriores.",
		4
	],
	//18
	[
		"¿Cual de los siguientes es un gestor de base de datos no relacional?",
		"MySql",
		"Oracle",
		"Mongo",
		"DB2",
		3
	],
	//19
	[
		"¿Cual de los siguientes es un tipo de hash?",
		"MD5",
		"SHA-512",
		"DES",
		"Todos los anteriores.",
		4
	],
	//20
	[
		"¿Cual no es un lenguaje de front-end",
		"Node.js",
		"Angular",
		"React",
		"TypeScript",
		4
	],
];

// Estilo de preguntas
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");

// Variables
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 30, // segundos
	timeLeftForQuestion; 


$(function() {

	// Uso de jQuery para escuchar el evento click del botón de Comenzar y Volver a jugar.
	$('button.start').click(start);
	$('.play_again button').click(restart);

	// La función restart inicializa los valores de las variables de estado del juego.
	function restart() {
		points = 0;
		pointsPerQuestion = 50;
		currentQuestion = 0;
		timeLeftForQuestion = timeForQuestion;
		$('.start.NombreJugador').value="";
	
		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	//  La función start da inicio al juego 
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion(); // Desplazar a siguiente pregunta
		});
	}

	// Se encarga de mostrar las preguntas
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) { // Recorre el arreglo de preguntas
			var q = questions[i]; //Toma el index de cada pregunta Y sus respuestas
			var html = questionTemplate({
				question: q[0], // Posicion 0 donde se encuentra la pregunta
				index: i,
				// Preguntas ubicadas por posicion en el arreglo
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};

		$('.question.card input').change(optionSelected);
	}

	// Se encarga de mover la pregunta
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}

		// Se muestra la siguiente pregunta.
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	// Funcion cronometro
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		timeLeftForQuestion = timeForQuestion;

		// Cada 1 segundo, se llama la funcion countdownTick(). 
		questionTimer = setTimeout(countdownTick, 1000);
	}

	// Mostramos la tarjeta de pregunta correspondiente al índice que la función recibe por parámetro.
	function showQuestionCardAtIndex(index) { // inicia en 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	// Funcion que resta un segundo al cronometro
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) { 
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 1000);
	}

	// Actualizacion del tiempo  
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	// Actualiza los puntos en pantalla.
	function updatePoints() {
		$('.points span.points').html(points + ' puntos');
	}

	// Evaluacion de la respuesta enviada
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];


		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length || selected!==correct) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}

	// Animacion respuesta correcta
	function correctAnimation() {
		animatePoints('right');
	}

	// Animación respuesta incorrecta.
	function wrongAnimation() {
		animatePoints('wrong');
	}

	// Animar los puntajes en pantalla
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	// Funcion que reinicia al terminar el juego 
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + ' puntos');
		$('.question.card:visible').hide();
		$('.finish.card').show();
	}

	// Reinicio 
	restart();

});


function validar(NombreJugador){
    if (NombreJugador.value===""){
		alert("Ingrese su Nickname");
		location.reload();
	}
    else {
	return false;
	}}
