var cn = new Object;
var cyr = {'wh':10, 'color':'green'}; // узлы структуры
cyr.all = [] // объекты узлов структуры
var os = new Array; // Массив узлов, каждый узел задается объектом с координатами {x:1, y:1}
var i = 0; // колличество поллигонов
var ss = false; // старт-стоп рисования
os.img = '../img/computer.jpg'; // изображение к кторому привязываются полигоны
os.w = 600; os.h = 400; // размеры
os[i] = [{'name':'name', 'color':'#00f', 'draw':'polygon'}];
os[i].push({x:10, y:10});
os[i].push({x:100, y:10});
os[i].push({x:200, y:100});
os[i].push({x:250, y:150});
os[i].push({x:23, y:150});
os[1] = [{'name':'name2', 'color':'#f00', 'draw':'polygon2'}];
os[1].push({x:12, y:12});
os[1].push({x:22, y:22});
os[1].push({x:72, y:52});
os[1].push({x:82, y:32});
// os.push({'name':'name', 'color':'red'});
// console.log(os);

cn.draw = ['rectangle', 'circle', 'polygon']; // возможные действия рисования
cn.act = cn.draw[0]; // по умолчанию рисуем прямоугольник
// cn.img = '../img/computer.jpg';
cn.x = 0; cn.y = 0; // положение курсора
var ss = false; // старт-стоп рисования

document.addEventListener("DOMContentLoaded", Canva);

function Canva(){
	cn.obj = document.getElementById('canva');
	if (!cn.obj.getContext) return; // если нет потдержки canvas - то просто выходим
	whCanva(); // установим высоту и ширину
	cn.ctx = cn.obj.getContext("2d");
	cn.ctx2 = cn.obj.getContext("2d");
	cn.ctx.strokeStyle = 'blue';
	cn.ctx.lineWidth = 2; // толщина линии
	eventProcessing(); // зададим обработчик
	// create(); // начнемс, чтоли
}

function whCanva(){
	// в стилях и атрибутах задаем высоту ширину по настройкам
	cn.obj.style.width = os.w+'px';
	cn.obj.style.height = os.h+'px';
	cn.obj.setAttribute("width", os.w+"px");
	cn.obj.setAttribute("height", os.h+"px");
	cn.obj.style.backgroundImage = "url("+os.img+")";
}

function xy_canva(e){
	// положение курсора
	cn.x = e.pageX - cn.obj.offsetLeft;
	cn.y = e.pageY - cn.obj.offsetTop;
	// console.log(cn.x+'--'+cn.y);
}

function eventProcessing(){
	// навешиваем необходимые обработчики
 	// Подключаем требуемые для рисования события
    // Canvas.obj.onmousedown = onmousedownCanva; // Кнопка мыши нажата над элементом
    // Canvas.obj.onmouseup = stopDrawing; // Кнопка мыши отпущена над элементом
    // Canvas.obj.onmouseout = stopDrawing; // Мышь ушла с элемента
    // Canvas.obj.onmousemove = draw; // Каждое движение мыши над элементом генерирует это событие
    cn.obj.onclick = clickCanva;
}

function clickCanva(e){
	// клик по канве
	xy_canva(e);
	var id = f_thisCircle(cn.x, cn.y);
	if(id) alert(id);
}

var render = function() {
	// отрисовка всеx полигонов
    // Очищаем канву.
    cn.ctx.clearRect(0,0, cn.obj.width, cn.obj.height);
    // перебераем все наши полигоны
    os.forEach(function(item, n) {
    	item.forEach(function(it, nn){
    		if(nn==0){
    			cn.ctx.fillStyle = it.color;
    			cn.ctx.beginPath();
    		}else{
    			cn.ctx.lineTo(it.x, it.y);
    		}
    		console.log(it.x+'--'+it.y);
    	});
    	cn.ctx.closePath();
		cn.ctx.fill();
		// cn.ctx.stroke();
		// console.log( n + ": " + item + " (массив:" + os[n][0].color + ")" );
	});
};

var renderThis = function(){
	// отрисовка текущего полигона № i
	// очищает канву
	cn.ctx.clearRect(0,0, cn.obj.width, cn.obj.height);
	os[i].forEach(function(it, n){
		if(n==0){
    		cn.ctx.fillStyle = it.color;
    		cn.ctx.beginPath();
    	}else{
    		if(n==1){
    			cn.ctx.moveTo(it.x, it.y);
    			console.log('1 : '+it.x+'--'+it.y);
    		}else{
    			cn.ctx.lineTo(it.x, it.y);
    			console.log('all : '+it.x+'--'+it.y);
    		}
    	}
	});
	cn.ctx.closePath();
	cn.ctx.fill();
	// cn.ctx.stroke();
	fcircleAll();
};

function fcircle(x,y){
	// узел полигона
	cn.ctx2.fillStyle = cyr.color; // заливка
	cn.ctx2.strokeStyle = 'blue'; //
	var wh = cyr.wh;
	cn.ctx2.fillRect(x-wh/2, y-wh/2, wh, wh);
}

function fcircleAll(){
	// все узлы текущего полигона
	cn.ctx2.fillStyle = cyr.color; // заливка
	cn.ctx2.strokeStyle = 'blue'; //
	var wh = cyr.wh;
	var wh2 = cyr.wh/2;
	os[i].forEach(function(it, n){
		cyr.all[n] = cn.obj.getContext("2d");
		cyr.all[n].fillStyle = cyr.color;
		// cyr.all[n].fillRect(it.x-wh/2, it.y-wh/2, wh, wh);
		cyr.all[n].beginPath();
		cyr.all[n].moveTo(it.x-wh2, it.y-wh2);
		cyr.all[n].lineTo(it.x+wh2, it.y-wh2);
		cyr.all[n].lineTo(it.x+wh2, it.y+wh2);
		cyr.all[n].lineTo(it.x-wh2, it.y+wh2);
		cyr.all[n].fill();
		cyr.all[n].closePath();
	});
	console.log(cyr.all);
}

function f_thisCircle(xx, yy){
	// совпадение с узлом
	for (var a = 1; a <= os[i].length; a++) {
		if(xx>=os[i][a].x && xx<=(os[i][a].x+cyr.wh) && yy>=os[i][a].y && yy<=(os[i][a].y+cyr.wh)){
			return a;
		}
	}
	return false;

	// os[i].forEach(function(obj, ct){
	// 	if(ct!=0) {
	// 		if(x>=obj.x && x<=(obj.x+cyr.wh) && y>=obj.y && y<=(obj.y+cyr.wh)){
	// 			return ct;
	// 		}
	// 	}
	// });
	// return false;

	// var esElem = os[i].filter(function(obj){
	// 	return (x>=obj.x && x<=(obj.x+cyr.wh) && y>=obj.y && y<=(obj.y+cyr.wh));
	// });
	// return esElem[0];


	// os[i].forEach(function(obj, n){
	// 	if(n==0) continue;
	// 	if(x>=obj.x && x<=(obj.x+cyr.wh) && y>obj.y && y<(obj.y+cyr.wh)){
	// 		return n;
	// 	}else{
	// 		return false;
	// 	}
	// });
	// cyr.all.forEach(function(obj, n){
	// 	obes = obj.isPointInPath(x, y);
	// 	if(obes) {console.log('id :'+obes); return n;}
	// });
	// var d = cn.ctx.isPointInPath(x, y);
	// return false;
}

function f_stop(){
	renderThis();
}