var Canvas = new Object;
Canvas.width = 800;
Canvas.height = 500;
Canvas.draw = ['rectangle', 'circle', 'polygon']; // возможные действия рисования
Canvas.act = Canvas.draw[0]; // по умолчанию рисуем прямоугольник
Canvas.img = '../img/computer.jpg';
Canvas.xy = [0, 0]; // положение курсора (1-е значение - x, 2-е - y)
var os = []; // Массив узлов, каждый узел задается объектом с координатами
Canvas.n = 0; // колличество объектов
i = 0;
var ss = false; // старт-стоп рисования

document.addEventListener("DOMContentLoaded", Canva);

function Canva(){
	Canvas.obj = document.getElementById('canva');
	if (!Canvas.obj.getContext) return; // если нет потдержки canvas - то просто выходим
	whCanva(); // установим высоту и ширину
	Canvas.ctx = Canvas.obj.getContext("2d");
	Canvas.ctx2 = Canvas.obj.getContext("2d");
	Canvas.ctx.fillStyle = '#00f'; // заливка
	Canvas.ctx.strokeStyle = '#f00'; // цвет линии
	Canvas.ctx.lineWidth = 2;
	create(); // начнемс, чтоли
}

function whCanva(){
	// в стилях и атрибутах задаем высоту ширину по настройкам
	Canvas.obj.style.width = Canvas.width+'px';
	Canvas.obj.style.height = Canvas.height+'px';
	Canvas.obj.setAttribute("width", Canvas.width+"px");
	Canvas.obj.setAttribute("height", Canvas.height+"px");
	Canvas.obj.style.backgroundImage = "url("+Canvas.img+")";
}

function create(){
	var ctx = Canvas.ctx;
	// ctx.fillStyle = "rgb(200,0,0)";
 //    ctx.fillRect (10, 10, 55, 50);
 //    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
 //    ctx.fillRect (30, 30, 55, 50);
 	// Подключаем требуемые для рисования события
    // Canvas.obj.onmousedown = onmousedownCanva; // Кнопка мыши нажата над элементом
    // Canvas.obj.onmouseup = stopDrawing; // Кнопка мыши отпущена над элементом
    // Canvas.obj.onmouseout = stopDrawing; // Мышь ушла с элемента
    // Canvas.obj.onmousemove = draw; // Каждое движение мыши над элементом генерирует это событие
    Canvas.obj.onclick = clickCanva;
}

function clickCanva(e){
	xy_canavas(e);
	if( commonCircle() ){
		f_line();
		fcircle();
	}
}

function xy_canavas(e){
	// положение курсора
	Canvas.xy[0] = e.pageX - Canvas.obj.offsetLeft;
	Canvas.xy[1] = e.pageY - Canvas.obj.offsetTop;
}

function f_line(){
	var ctx = Canvas.ctx;
	if(!ss){
		Canvas.n++;
		os[0] = [[Canvas.xy[0], Canvas.xy[1]]];
		ss = true;
		Canvas.ctx.beginPath();
		Canvas.ctx.moveTo(Canvas.xy[0], Canvas.xy[1]);
	} else {
		Canvas.ctx.lineTo(Canvas.xy[0], Canvas.xy[1]);
		Canvas.ctx.stroke();
		os.push([Canvas.xy[0], Canvas.xy[1]]);
	}
	// os[Canvas.n] = [Canvas.xy[0], Canvas.xy[1]];
	i++;
	/*
	ctx.beginPath(); // начинаем рисовать
	ctx.arc(160, 160, 30, 0, 360, false);
	ctx.fill(); // заливаем окружность

	ctx.moveTo(160, 0);
	ctx.lineTo(200, 120);
	ctx.lineTo(320, 160);
	ctx.lineTo(200, 200);
	ctx.lineTo(160, 320);
	ctx.lineTo(120, 200);
	ctx.lineTo(0, 160);
	ctx.lineTo(120, 120);
	ctx.lineTo(160, 0);
	ctx.stroke(); // обводим фигуры
	*/
}

function fcircle(){
	Canvas.ctx2.fillStyle = 'green'; // заливка
	Canvas.ctx2.strokeStyle = 'blue'; //
	var st = 10;
	Canvas.ctx2.fillRect(Canvas.xy[0]-st/2, Canvas.xy[1]-st/2, st, st);
}

function f_stop(){
	alert('sss');
	// Canvas.ctx2.clearRect(0, 0, 300, 300);
	console.log(os);
}

function commonCircle(){
	var es = Canvas.ctx2.isPointInPath(Canvas.xy[0], Canvas.xy[1]);
	if(es) {
		console.log(Canvas.xy[0]+'---'+Canvas.xy[1]);
		return false;
	}else{
		return true;
	}
}