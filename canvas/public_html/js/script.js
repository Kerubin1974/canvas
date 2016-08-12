var cn = new Object;
var cyr = {'wh':10, 'color':'green'}; // узлы структуры
var os = new Array; // Массив сохраненных узлов
var jsonOS; // сохраненный объект OS в JSON
var nos = new Array; // Массив нового узла, каждый узел задается объектом с координатами {x:1, y:1}
var i = 0; // колличество поллигонов
var start = false;
var x, y; // положение курсора при движении мыши
var points; // points строка
var uzelAmend = false // изменение узла
os.img = './img/genplan-tmp.png'; // изображение к кторому привязываются полигоны
// os.w = 600; os.h = 500; // размеры
os.w = 856; os.h = 619; // размеры
// os[1] = {'name':'name', 'fill' : 'rgba(234,234,234, .4)', 'draw':'polygon', 'stroke-width' : '1', 'stroke' : 'rgb(0,0,0)', 'points' : '70.504,218.389 15.44,118.89 510.444,18.89 180.444,18.89 235.444,118.89 180.444,218.89', 'id' : 'os'+1};
// os[2] = {'name':'name2', 'fill' : 'rgba(000,234,234, .4)', 'draw':'polygon', 'stroke-width' : '1', 'stroke' : 'rgb(0,255,0)', 'points' : '0.444,218.89 15.444,118.89 70.444,18.89 180.444,18.89 235.444,118.89 180.444,218.89', 'id' : 'os'+2};
// <rect width="200" height="200" fill="rgb(234,234,234)" stroke-width="1" stroke="rgb(0,0,0)"/>
// <circle cx="102" cy="102" r="100" fill="rgb(234,234,234)" stroke-width="1" stroke="rgb(0,0,0)"/>
i = os.length;
cn.draw = ['rectangle', 'circle', 'polygon']; // возможные действия рисования
cn.act = cn.draw[2]; // по умолчанию рисуем polygon
// cn.img = '../img/computer.jpg';
cn.x = 0; cn.y = 0; // положение курсора
var ss = false; // старт-стоп рисования

document.addEventListener("DOMContentLoaded", Canva);

var SVG = {
	// создание полигона в svg
	//нужные пространства имен
	svgns: 'http://www.w3.org/2000/svg',
	xlink: 'http://www.w3.org/1999/xlink',

	//создание svg элемента
	createElement: function(name, attrs){
		var element = document.createElementNS(SVG.svgns, name);

		if(attrs) {
			SVG.setAttr(element, attrs);
		}
		return element;
	},

	//установка атрибутов
	setAttr: function(element, attrs) {
		for(var i in attrs) {
			if(i === 'href') { //путь к изображению приписывается в атрибуте xlink:href
				element.setAttributeNS(SVG.xlink, i, attrs[i]);
			} else { //обычный атрибут
				element.setAttribute(i, attrs[i]);
			}
		}
		return element;
	}
}

var createObjs = function(){
	// прорисовка всех сохраненных полигонов
	// cn.svg.innerHtml='';
	if(jsonOS){
		clearSvg();
		os = JSON.parse(jsonOS);
		os.forEach(function(item, n){
			var ele = SVG.createElement('polygon');
			var elem = SVG.setAttr(ele, item);
			cn.svg.appendChild(elem);
		});
	}
}

var clearSvg = function(){
	// очищаем содержимое svg
	var oss = os;
	var elem = cn.svg.getElementsByTagName('*'); // выбираем все элементы контейнера
	for (var i = elem.length - 1; i >= 0; i--) {
		elem[i].parentNode.removeChild(elem[i]);
	}
	// console.log(os);
}

function Canva(){
	var div = document.getElementById('poligon');
	// div.style.width = os.w+"px";
	// div.style.height = os.h+"px";
	cn.spanXY = document.getElementById('xy'); // показывает положение курсора
	cn.svg = document.getElementById('svg');
	cn.gps = document.getElementById('gps');
	cn.descr = document.getElementById('otvet'); cn.descr.style.display = 'none';
	// cn.svg.style.width = os.w+"px";
	// cn.svg.style.height = os.h+"px";
	cn.svg.setAttribute('viewBox', '0 0 '+os.w+' '+os.h);
	cn.svg.style.backgroundImage = "url("+os.img+")";
	createObjs();
}

function createNew(){
	var txt = document.querySelector('input[type=text]').value;
	var color = document.querySelector('input[type=color]').value;
	nos[0] = [{'text': txt, 'fill': hexToRgb(color, 0.4), 'draw':'polygon'}]; // запишем значения цвета и текста
	var n2 = document.getElementById('n2');
	var span = document.getElementById('spanBot');
	if(ss){
		ss = false;
		// сохраняем значения, если они есть
		if(nos.length>3) saveOS();
		span.textContent = 'создать'; span.style.background = 'green';
		n2.style.display='block';
		eventProcessing(false); // отключаем обработчики
		// console.log(nos);
	}else{
		ss =true;
		i = os.length;
		span.textContent = 'сохранить'; span.style.background = 'blue';
		n2.style.display='none';
		eventProcessing(true); // включаем обработчик
	}
}

function eventProcessing(es){
	// навешиваем необходимые обработчики
 	// Подключаем требуемые для рисования события

    // Canvas.obj.onmousedown = onmousedownCanva; // Кнопка мыши нажата над элементом
    // Canvas.obj.onmouseup = stopDrawing; // Кнопка мыши отпущена над элементом
    // Canvas.obj.onmouseout = stopDrawing; // Мышь ушла с элемента
    // Canvas.obj.onmousemove = draw; // Каждое движение мыши над элементом генерирует это событие
    // cn.svg.onclick = clickCanva;
    if(es){
    	cn.svg.onmousedown = clickSVG;
    }else{
    	start = false;
    	cn.svg.onmousedown = null;
    	cn.svg.onmousemove = null;
    }
}

function clickSVG(e){
	xy_svg(e); // получаем значения курсора
	if( !uzelAmend ) saveXY(); // сохраняем значения
	if(!start){
		// первый клик -- начало рисования линий
		start = true;
		// навешиваем обработчик событий
		cn.svg.onmousemove = draw;
		cn.svg.onmouseout = drawStop;
		cn.tmp = createTmpSvg(); // создаем временный объект
	}else{
		if(uzelAmend){
			// изменение узла полигона
		}else{
			// посторение полигона
			points += cn.x+','+cn.y+' ';
			cn.tmp.setAttribute('points', points);
		}
	}
	if(!uzelAmend){
		var elem = uzel.create();
		elem.onmouseout = unhoversvg; // сначала повесим обработчик ухода с узла
	}
	console.log('uzel : '+uzelAmend+'::'+'SVG points : '+points);
	// elem.onmousedown = uzel.clicksvg;
	// elem.onmouseup = uzel.unclicksvg;
	// elem.onmousemove = uzel.hoversvg;
}

function hover(e){
	uzel.hover(e);
}

function createTmpSvg(){
	// создаем временный полигон рисования
	points = cn.x+','+cn.y+' ';
	var ele = SVG.createElement('polygon');
	var item = {
		'name':'tmp',
		'fill' : nos[0][0].fill,
		'draw':'polygon',
		'stroke-width' : '1',
		'stroke' : 'rgb(0,0,0)',
		'points' : points,
		'id' : 'tmp'
	}
	var elem = SVG.setAttr(ele, item);
	cn.svg.appendChild(elem);
	return (elem);
}

function draw(e){
	// получаем значения курсора
	// console.log(e);
	x = e.offsetX;
	y = e.offsetY;
	cn.spanXY.innerText = x+':'+y;
	if( uzelAmend ){
		// изменение узла
		nos[cyr.num][0].x=x;
		nos[cyr.num][0].y=y;
		points = returnPointsStr();
		cn.tmp.setAttribute('points', points);
		cyr.uzel.setAttribute('x', x-5);
		cyr.uzel.setAttribute('y', y-5);
	}else{
		// отрисовка стороны полигона
		sd = points+x+','+y+' ';
		cn.tmp.setAttribute('points', sd);
	}
}
function drawStop(){
	cn.tmp.setAttribute('points', points);
}

function xy_svg(e){
	// положение курсора
	cn.x = e.offsetX;
	cn.y = e.offsetY;
}

function saveXY(){
	// записываем координаты в массив
	nos.push([{x:cn.x, y:cn.y}]);
}

function saveOS(){
	// cохраняем значения
	var i = os.length;
	points = '';
	cn.svg.onmousemove = null;
	cn.svg.onmouseout = null;
	nos.forEach(function(elem, i){
		if(i!=0){
			points += elem[0].x+','+elem[0].y+' ';
		}
	});
	points=points.slice(0,-1); // удалим последний символ (он пустой)
	os.push({
		'name' : nos[0][0].text,
		'fill' : nos[0][0].fill,
		'draw' : nos[0][0].draw,
		'stroke-width' : '1',
		'stroke' : 'rgb(0,0,0)',
		'points' : points,
		'id' : 'os'+i
	});
	nos.length = 0; // очистим массив
	// очистим узлы
	var rect = document.querySelectorAll('rect[class=svghover]');
	for (var i = 0; i < rect.length; i++) {
		rect[i].remove();
	}
	jsonOS =JSON.stringify(os);
	cn.gps.innerText = jsonOS;
	createObjs();
}

function returnPointsStr(){
	// возвращаем строку points
	var points = '';
	nos.forEach(function(elem, i){
		if(i!=0){
			points += elem[0].x+','+elem[0].y+' ';
		}
	});
	return points;
}
function hexToRgb(hex, opacity) {
	// возвращает знчение цвета меняя HEX на RGB
	var h=hex.replace('#', '');
	h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

	for(var i=0; i<h.length; i++)
        h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

    if (typeof opacity != 'undefined')  h.push(opacity);

    return 'rgba('+h.join(',')+')';
}

/*==============================*/
function showPolygons(){
	console.log('text');
	clearSvg();
	cn.descr.innerText = '';
	os.forEach(function(item, n){
		var ele = SVG.createElement('polygon');
		var elem = SVG.setAttr(ele, item);
		cn.svg.appendChild(elem);
		// добаиляем обработчик
		elem.onmousemove = description;
		elem.onmouseout = nodescription;
		elem.style.opacity = 0.4;
	});
}
function showP2() {
	var poligons=document.getElementsByTagName('poligon');
	for (var i = 0; i < poligons.length; i++) {
		poligons.onmousemove = onMousePoli;
	}
}
function onMousePoli(e){
	alert('es');
}
function description(e){
	var n = this.getAttribute('name');
	this.style.opacity = 1;
	cn.descr.innerText = n;
	cn.descr.style.display = 'block';
	// console.log(e);
}

function nodescription(e){
	this.style.opacity = 0.4;
	cn.descr.innerText = '';
	cn.descr.style.display = 'none';
}

/*=================================================*/
var uzel = {
	// сторона узла
	wh: 10,
	color: 'green',
	hovercolor: 'red',
	create: function(){
		// создание узла структуры
		var wh = this.wh;
		var item = {
			'x': cn.x-wh/2,
			'y': cn.y-wh/2,
			'width': wh,
			'height': wh,
			'fill': this.color,
			'class': 'svghover',
			'num': (nos.length-1),
			'id': cn.x+'_'+cn.y
		};
		var ele = SVG.createElement('rect');
		var elem = SVG.setAttr(ele, item);
		cn.svg.appendChild(elem);
		return elem;
	}
};
	// onmousedown = onmousedownCanva; // Кнопка мыши нажата над элементом
    // onmouseup = stopDrawing; // Кнопка мыши отпущена над элементом
    // onmouseout = stopDrawing; // Мышь ушла с элемента
    // onmousemove = Каждое движение мыши над элементом генерирует это событие
function hoversvg(evt){
	// при наведении на узел
	// uzelAmend = true;
	this.setAttribute('fill', uzel.hovercolor);
	// вешаем обрабочик клика по узлу
	this.onmousedown = clicksvg;
	this.onmouseup = unclicksvg;
	console.log('ждем : '+uzelAmend);
}
function unhoversvg(evt){
	// ушли с узла (первым отработает)
	uzelAmend = false;
	this.setAttribute('fill', uzel.color);
	// вешаем обработчик наведения на элемент а остальные отключаем
	this.onmousemove = hoversvg;
	this.onmousedown = null;
	this.onmouseup = null;
}
function clicksvg(evt){
	// зажата кнопка на узлом (передвигаем)
	cyr.num = this.getAttribute('num');
	cyr.uzel = this;
	uzelAmend = true;
	console.log('зажата');
}
function unclicksvg(){
	// отжата клавиша (сохраняем изменения)
	uzelAmend = false;
	console.log('отжата');
}
