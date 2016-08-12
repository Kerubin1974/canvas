document.addEventListener("DOMContentLoaded", Canva);
function Canva(){
	var td = document.getElementsByClassName('c');
	var table = document.getElementById('t');
	// td[0].style.color = 'green';
	// table.classList.add('a');
	// table.rows[0].cells[0].style.color = 'green';
	td[0].innerHTML='<font color="green">'+td[0].innerHTML+'</font>';
	console.log(td);
}

/*
..................................................
var td = document.getElementsByClassName('c');
var table = document.getElementById('t');

# 1-й способ
	td[0].style.color = 'green';
# 2-й способ
	table.classList.add('a');
# 3-й способ
	table.rows[0].cells[0].style.color = 'green';
# 4-й способ
	td[0].innerHTML='<font color="green">'+td[0].innerHTML+'</font>';
*/