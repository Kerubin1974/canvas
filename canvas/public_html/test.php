<?php
header("Content-Type: text/html; charset=utf-8");

$search_palindrome = "asassfgsАргентина манит d неграjscscc"; // строка поиска палиндрома


$str=$search_palindrome; 
$str=preg_replace('/[^a-zA-Zа-яА-Я0-9\s]/u', '',mb_strtolower($str, 'UTF-8'));
echo "<h1>".palindrome($str)."</h1>";


/*===========================functions==============================*/
function palindrome($str){
	if(esPal($str)) return $str;

	$searchStr = $str; $revStr = $str; $maxStr = $str{0};
	$num = mb_strlen($str, 'utf-8');
	mb_internal_encoding("UTF-8");
	for ($i=3; $i < $num; $i++) { 
		if( esPal($searchStr) ) {
			$maxStr = ( strlen($maxStr)<strlen($searchStr) ) ? $searchStr : $maxStr;
			continue;
		}
		$revStr =  $searchStr;
		$numR = mb_strlen($revStr, 'utf-8');
		for ($n=3; $n < $numR; $n++) {
			if( esPal($revStr) ) {
				$maxStr = ( strlen($maxStr)<strlen($revStr) ) ? $revStr : $maxStr;
				continue;
			}
			$revStr = mb_substr($revStr, 0, -1);
		}
		$searchStr = mb_substr($searchStr, 1); 
	}

	return $maxStr;
}

function strrevUTF8($str){
	preg_match_all('/./us', $str, $ar);
	return implode(array_reverse($ar[0]));
}

function esPal($str){
	$str=preg_replace('/\s/', '', $str);
	$s = ( $str == strrevUTF8($str) ) ? true : false;
	return $s;
}
