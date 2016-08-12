INSERT INTO test_category (id, parent_category_id, name) VALUES
(1, 0, ‘автомобили марка’),
(2, 1, ‘автомобиль год выпуска’),
(3, 2, ‘автомобиль модель’),
(4, 3, ‘автосервис СТО заказчики’),
(5, 0, ‘автозапчасти производители’),
(6, 3, ‘запчасти двигателя’),
(7, 3, ‘запчасти кузова’),
(8, 3, ‘запчасти коробка передач’),
(9, 3, ‘запчасти подвеска рычаги’),
(10, 6, ‘номер детали двигателя’),
(11, 7, ‘номер детали кузова’),
(12, 8, ‘номер детали коробка передач’),
(13, 9, ‘номер детали подвеска рычаги’),
(14, 11, ‘кросс номер детали кузова’)
;

INSERT INTO `test`.`test_category` (`id`, `parent_category_id`, `name`) VALUES 
(3, 2, 'автомобиль модель'),
(4, 3, 'автосервис СТО заказчики'),
(5, 0, 'автозапчасти производители'),
(6, 3, 'запчасти двигателя'),
(7, 3, 'запчасти кузова'),
(8, 3, 'запчасти коробка передач'),
(9, 3, 'запчасти подвеска рычаги'),
(10, 6, 'номер детали двигателя'),
(11, 7, 'номер детали кузова'),
(12, 8, 'номер детали коробка передач'),
(13, 9, 'номер детали подвеска рычаги'),
(14, 11, 'кросс номер детали кузова')
;

////////////////////////////////
#1
SELECT *
FROM category
WHERE parent_category_id =0
AND name LIKE 'авто%';
............................

#2
SELECT cat.name
FROM category cat LEFT JOIN category podcat ON cat.id = podcat.parent_category_id
GROUP BY cat.id
HAVING COUNT( podcat.id ) <4;
..................................

#3
SELECT *
FROM category
WHERE id NOT IN 
(
	SELECT parent_category_id FROM category
)
....................................

#index
KEY key_name (name(4)),
INDEX index_name (parent_category_id, name)
////////////////////////////////////////////////////////
SELECT * FROM category 
WHERE 
	id NOT IN 
	( 
		SELECT parent_category_id FROM category WHERE id IN 
		( 
			SELECT parent_category_id FROM category WHERE id IN 
			( 
				SELECT parent_category_id FROM category WHERE id IN 
				( 
					SELECT parent_category_id FROM category 
				)
			) 
		)
	);
