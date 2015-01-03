'use strict';

angular.module('avm.components')
	.service('ingredientsService', function ($q, $localStorage, $filter) {
		var self = this;
		var ingredients = [
			{
				"id": "almond",
				"name": {
					"en": "Almond",
					"ru": "Миндаль"
				},
				"description": {
					"en": "The almond is a species of tree native to the Middle East and South Asia. Almond is also the name of the edible and widely cultivated seed of this tree.",
					"ru": "Минда́ль (лат. Prunus dulcis, в прошлом — Prunus amygdalus или Amygdalus communis) — кустарник или небольшое дерево из подрода Миндаль (Amygdalus) рода Слива. Миндаль часто причисляется к орехам, хотя на самом деле он является косточковым плодом. По величине и форме плод похож на абрикосовую косточку."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Almond",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BD%D0%B4%D0%B0%D0%BB%D1%8C"
				},
				"nutrition_facts": {
					"energy": 576,
					"carbohydrates": 21.69,
					"fat": 49.42,
					"protein": 21.22,
					"water": 4.70,
					"vitamins": ["E", "B"],
					"minerals": ["Calcium", "Magnesium", "Phosphorus", "Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "ambarella",
				"name": {
					"en": "Ambarella",
					"ru": "Амбарелла"
				},
				"description": {
					"en": "Spondias dulcis (syn. Spondias cytherea), known commonly as ambarella, is an equatorial or tropical tree, with edible fruit containing a fibrous pit.",
					"ru": "Амбарелла — латиноамериканское название этого растения; оно также известно под названиями «яблоко Цитеры» (фр. pomme Cythère), «полинезийская слива» (англ. polynesian-plum), «жёлтая слива» (англ. yellow plum), Otaheite-apple, Tahitian quince."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Spondias_dulcis",
					"ru": "https://ru.wikipedia.org/wiki/%D0%90%D0%BC%D0%B1%D0%B0%D1%80%D0%B5%D0%BB%D0%BB%D0%B0"
				},
				"nutrition_facts": {
					"energy": 46,
					"carbohydrates": 12.4,
					"fat": 0.1,
					"protein": 0.2,
					"water": 87.3,
					"vitamins": ["A", "C"],
					"minerals": ["Calcium", "Phosphorus"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "apple",
				"name": {
					"en": "Apple",
					"ru": "Яблоко"
				},
				"description": {
					"en": "The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found today. Apples have been grown for thousands of years in Asia and Europe, and were brought to North America by European colonists.",
					"ru": "Я́блоко — плод яблони, который употребляется в пищу в свежем виде, служит сырьём в кулинарии и для приготовления напитков. Считается, что родиной яблони является Центральная Азия. Наибольшее распространение получила яблоня домашняя. На сегодняшний день существует множество сортов этого вида яблони, произрастающих в различных климатических условиях."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Apple",
					"ru": "https://ru.wikipedia.org/wiki/%D0%AF%D0%B1%D0%BB%D0%BE%D0%BA%D0%BE"
				},
				"nutrition_facts": {
					"energy": 52,
					"carbohydrates": 13.81,
					"fat": 0.17,
					"protein": 0.26,
					"water": 85.56,
					"vitamins": ["C"],
					"minerals": ["Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "apricot",
				"name": {
					"en": "Apricot",
					"ru": "Абрикос"
				},
				"description": {
					"en": "An apricot is a fruit or the tree that bears the fruit. Usually, an apricot tree is from the tree species Prunus armeniaca, but the species Prunus brigantina, Prunus mandshurica, Prunus mume, and Prunus sibirica are closely related, have similar fruit, and are also called apricots.",
					"ru": "Абрикос — дерево; вид рода Слива семейства Розовые (Rosaceae), а также плод этого дерева. Абрикос называют также жёлтосливником, морелью, курагой, жерделью, урюком. Абрикос сибирский (Prunus sibirica L.), растущий в диком состоянии в горах Даурии, — это другой вид рода Слива."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Apricot",
					"ru": "https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%80%D0%B8%D0%BA%D0%BE%D1%81"
				},
				"nutrition_facts": {
					"energy": 48,
					"carbohydrates": 11,
					"fat": 0.4,
					"protein": 1.4,
					"water": 86.35,
					"vitamins": ["A", "B5", "C", "E"],
					"minerals": ["Manganese", "Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "baeli_fruit",
				"name": {
					"en": "Baeli Fruit",
					"ru": "Баиль"
				},
				"description": {
					"en": "Aegle marmelos, commonly known as bael is a species of tree native to India. It is present throughout Southeast Asia as a naturalized species. The tree is considered to be sacred by Hindus. Its fruits are used in traditional medicine and as a food throughout its range.",
					"ru": "Баиль — медленнорастущее дерево высотой 12-15 м высотой с овальными листьями 4-10 см длиной 2-5 см шириной. Плод круглый или продолговатый, диаметром 5-20 см, с тонкой деревянистой оболочкой, серо-зелёной, когда плод недозрелый, и желтоватой, когда он созревает. Внутри плода находится центральное ядро и 8-20 треугольных сегментов, с тонкими тёмно-оранжевыми стенами, заполненных бледно-оранжевой душистой тестообразной сладкой, чуть вяжущей, мякотью."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Aegle_marmelos",
					"ru": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%B8%D0%BB%D1%8C"
				},
				"nutrition_facts": {
					"energy": 137,
					"carbohydrates": 31.8,
					"fat": 0.3,
					"protein": 1.8,
					"water": 61.5,
					"vitamins": ["A", "B", "C"],
					"minerals": ["Calcium", "Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "banana",
				"name": {
					"en": "Banana",
					"ru": "Банан"
				},
				"description": {
					"en": "Banana is the common name for a type of herb and also the name for the herbaceous plants that grow this herb. These plants belong to the genus Musa. They are native to the tropical region of Southeast Asia. There are about 100 different species of banana.It is thought that bananas were grown for food for the first time in Papua New Guinea.Today, they are cultivated in tropical regions around the world.Most banana plants are grown for their herbs, but some are grown as ornamental plants, or for their fibres. In parts of Africa, beer has been made by fermenting the juice of certain cultivars, known as beer bananas. The ash of banana can be used to make soap. In Asia, bananas are often planted to provide shade to plants that like shade, for example coffee, cocoa, nutmeg or black pepper. Because of this, banana plants can often be found in plantations of other crops.",
					"ru": "Банан — название съедобных плодов культивируемых видов рода Банан (Musa).С ботанической точки зрения банан является ягодой, многосеменной и толстокожей. У культурных форм часто отсутствуют семена, ненужные при вегетативном размножении. Имеют размеры до 15 см в длину и 3—4 см в диаметре. Соплодия могут состоять из 300 плодов и иметь массу до 50—60 кг. Бананы — одна из древнейших пищевых культур, а для тропических стран важнейшее пищевое растение и главная статья экспорта. Спелые бананы широко употребляются в пищу по всему миру, их используют при приготовлении большого количества блюд. Помимо употребления в свежем виде, в кухне некоторых народов бананы могут зажариваться, или вариться как в очищенном, так и в неочищенном виде. Во многих странах бананы являются одним из основных источников питания — например, только в Эквадоре годовое потребление этого продукта составляет 73,8 кг на душу населения (для сравнения, в России этот показатель равен 7,29 кг). Существенную долю потребления бананы также составляют в Бурунди (189,4 кг), Самоа (85,0 кг), Коморских Островах (77,8 кг) и на Филиппинах (40,6 кг)."
				},
				"wiki": {
					"en": "http://simple.wikipedia.org/wiki/Banana",
					"ru": "https://ru.wikipedia.org/wiki/%D0%91%D0%B0%D0%BD%D0%B0%D0%BD"
				},
				"nutrition_facts": {
					"energy": 89,
					"carbohydrates": 22.84,
					"fat": 0.33,
					"protein": 1.09,
					"water": 74.91,
					"vitamins": ["B2","B5", "B6", "B9","C"],
					"minerals": ["Magnesium", "Manganese","Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "beetroot",
				"name": {
					"en": "Beetroot",
					"ru": "Свекла"
				},
				"description": {
					"en": "The beetroot is the taproot portion of the beet plant, also known in North America as the table beet, garden beet, red or golden beet, or informally simply as the beet. It is several of the cultivated varieties of beet (Beta vulgaris) grown for their edible taproots and their greens. These varieties have been classified as B. vulgaris subsp. vulgaris Conditiva Group. Other than as a food, its uses include food coloring and as a medicinal plant. Many beet products are made from other Beta vulgaris varieties, particularly sugar beet.",
					"ru": "Свёкла (корнеплод) — корнеплод культивируемых разновидностей растений вида свёкла обыкновенная. У дикорастущих разновидностей данного вида корнеплод отсутствует."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Beetroot",
					"ru": "http://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D1%91%D0%BA%D0%BB%D0%B0_(%D0%BA%D0%BE%D1%80%D0%BD%D0%B5%D0%BF%D0%BB%D0%BE%D0%B4)"
				},
				"nutrition_facts": {
					"energy": 43,
					"carbohydrates": 9.96,
					"fat": 0.18,
					"protein": 1.68,
					"water": 80,
					"vitamins": ["B5","B6","B9","C"],
					"minerals": ["Iron","Magnesium","Manganese","Phosphorus","Potassium","Sodium","Zinc"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "bitter_gourd",
				"name": {
					"en": "Bitter Gourd",
					"ru": "Горький огурец"
				},
				"description": {
					"en": "Momordica charantia, known as bitter melon, bitter gourd, bitter squash or balsam-pear in English, has many other local names. Goya from the indigenous language of Okinawa and karela from Sanskrit are also used by English-language speakers.It is a tropical and subtropical vine of the family Cucurbitaceae, widely grown in Asia, Africa, and the Caribbean for its edible fruit, which is extremely bitter. Its many varieties differ substantially in the shape and bitterness of the fruit.",
					"ru": "Момордика харанция, или Горький огурец (лат. Momordica charantia) — однолетняя травянистая лиана семейства Тыквенные.Момордика харанция — однодомная лиана, вырастающая до 4 метров в длину. Стебли пятигранные с продольными бороздками и простыми усиками."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Momordica_charantia",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D0%BC%D0%BE%D1%80%D0%B4%D0%B8%D0%BA%D0%B0_%D1%85%D0%B0%D1%80%D0%B0%D0%BD%D1%86%D0%B8%D1%8F"
				},
				"nutrition_facts": {
					"energy": 19,
					"carbohydrates": 4.32,
					"fat": 0.18,
					"protein": 0.84,
					"water": 95,
					"vitamins": ["B1","B2","B5","B9","C","K"],
					"minerals": ["Magnesium","Potassium","Zinc"]
				},
				"properties": {
					"flavor": ["Bitter"]
				}
			},
			{
				"id": "cantaloupe",
				"name": {
					"en": "Cantaloupe",
					"ru": "Канталупа"
				},
				"description": {
					"en": "The cantaloupe originated in Iran, India and Africa; it was first cultivated in Iran some 5000 years ago and in Greece and Egypt some 4000 years ago.The European cantaloupe is lightly ribbed (sutured), with a gray-green skin that looks quite different from that of the North American cantaloupe.",
					"ru": "Канталупа (Cucumis melo var. cantalupensis) — растение семейства Тыквенные (Cucurbitaceae), разновидность дыни.Плоды канталупы покрыты полосатой кожурой. В длину, как правило, 15—25 см. Мякоть плода оранжевого цвета. Транспортабельны, но долгое хранение противопоказано.Исходный материал для разведения попал в Европу во времена крестовых походов. Католические монахи привезли из Армении семена местных дынь. Эти дыни были преподнесены главе католической церкви — Папе Римскому как изысканный десерт. Угощение пришлось по вкусу, и Папа отправил семена для возделывания в своё имение в Канталупии. Отсюда эти дыни и получили своё нынешнее название — канталупы. В настоящее время канталупы — широко возделываемый вид дынь как в Старом, так и в Новом Свете."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Cantaloupe",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BD%D1%82%D0%B0%D0%BB%D1%83%D0%BF%D0%B0_(%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5)"
				},
				"nutrition_facts": {
					"energy": 34,
					"carbohydrates": 8.16 ,
					"fat": 0.19,
					"protein": 0.84,
					"water": 90,
					"vitamins": ["A","B3","B6","B9","C"],
					"minerals": ["Manganese","Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "carrot",
				"name": {
					"en": "Carrot",
					"ru": "Морковь"
				},
				"description": {
					"en": "The carrot (Daucus carota subsp. sativus; is a root vegetable, usually orange in colour, though purple, red, white, and yellow varieties exist. It has a crisp texture when fresh. The most commonly eaten part of a carrot is a taproot, although the greens are sometimes eaten as well. It is a domesticated form of the wild carrot Daucus carota, native to Europe and southwestern Asia. The domestic carrot has been selectively bred for its greatly enlarged and more palatable, less woody-textured edible taproot. The Food and Agriculture Organization of the United Nations (FAO) reports that world production of carrots and turnips (these plants are combined by the FAO for reporting purposes) for calendar year 2011 was almost 35.658 million tonnes. Almost half were grown in China. Carrots are widely used in many cuisines, especially in the preparation of salads, and carrot salads are a tradition in many regional cuisines.",
					"ru": "Морковь посевная (лат. Daucus carota subsp. sativus) — двухлетнее растение, подвид вида морковь дикая. Обычно в быту под словом «морковь» подразумевается широко распространенный корнеплод именно этого растения.Двулетние травянистое растение с мясистным корнеплодом и многократно перисто-рассечёнными листьями."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Carrot",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_%D0%BF%D0%BE%D1%81%D0%B5%D0%B2%D0%BD%D0%B0%D1%8F"
				},
				"nutrition_facts": {
					"energy": 41,
					"carbohydrates": 9.6,
					"fat": 0.24,
					"protein": 0.93,
					"water": 89,
					"vitamins": ["A","B1","B2","B3","B5","B6","B9","C","E"],
					"minerals": ["Manganese","Potassium","Sodium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "cashew_apple",
				"name": {
					"en": "Cashew Apple",
					"ru": "Яблоко Кешью"
				},
				"description": {
					"en": "The cashew tree (Anacardium occidentale) is a tropical evergreen that produces the cashew nut and the cashew apple. It can grow as high as 14 metres (46 ft), but the dwarf cashew, growing up to 6 metres (20 ft), has proved more profitable, with earlier maturity and higher yields.The cashew nut is served as a snack or used in recipes, like other nuts, although it is actually a seed. The cashew apple is a fruit, whose pulp can be processed into a sweet, astringent fruit drink or distilled into liqueur.",
					"ru": "Ке́шью (англ. cashew, от порт. caju), или Анака́рдиум за́падный (лат. Anacardium occidentale), Инди́йский оре́х — дерево, плод которого является распространённым продуктом питания; вид рода Анакардиум семейства Сумаховые. Родина — Бразилия. Культивируют в тропиках. Дерево кешью в Бразилии, близ ФорталезыПлоды ореховидные, ядро съедобное; из скорлупы добывают масло-кажу (кардойль), используемое в медицине и технике. Плодоножку, разросшуюся в виде груши, употребляют в пищу (так называемое яблоко-кажу).Из стволов старых деревьев, достигающих 12 метров, добывают камедь."
				},
				"wiki": {
					"en": "https://en.wikipedia.org/wiki/Cashew#Cashew_apple",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9A%D0%B5%D1%88%D1%8C%D1%8E"
				},
				"nutrition_facts": {
					"energy": 39,
					"carbohydrates": 9.5,
					"fat": 0.5,
					"protein": 0.15,
					"water": 86,
					"vitamins": ["C"],
					"minerals": ["Iron","Phosphorus"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "cashew_nut",
				"name": {
					"en": "Cashew Nut",
					"ru": "Кешью"
				},
				"description": {
					"en": "The cashew tree (Anacardium occidentale) is a tropical evergreen that produces the cashew nut and the cashew apple. It can grow as high as 14 metres (46 ft), but the dwarf cashew, growing up to 6 metres (20 ft), has proved more profitable, with earlier maturity and higher yields.The cashew nut is served as a snack or used in recipes, like other nuts, although it is actually a seed. The cashew apple is a fruit, whose pulp can be processed into a sweet, astringent fruit drink or distilled into liqueur.",
					"ru": "Ке́шью (англ. cashew, от порт. caju), или Анака́рдиум за́падный (лат. Anacardium occidentale), Инди́йский оре́х — дерево, плод которого является распространённым продуктом питания; вид рода Анакардиум семейства Сумаховые. Родина — Бразилия. Культивируют в тропиках. Дерево кешью в Бразилии, близ ФорталезыПлоды ореховидные, ядро съедобное; из скорлупы добывают масло-кажу (кардойль), используемое в медицине и технике. Плодоножку, разросшуюся в виде груши, употребляют в пищу (так называемое яблоко-кажу).Из стволов старых деревьев, достигающих 12 метров, добывают камедь."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Cashew",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9A%D0%B5%D1%88%D1%8C%D1%8E"
				},
				"nutrition_facts": {
					"energy": 553 ,
					"carbohydrates": 30.19,
					"fat": 43.85,
					"protein": 18.22,
					"water": 10,
					"vitamins": ["B1","B2","B3","B5","B6","E"],
					"minerals": ["Potassium","Copper","Iron","Magnesium","Manganese","Phosphorus","Selenium","Zinc"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "cocoa_fruit",
				"name": {
					"en": "Cocoa Fruit",
					"ru": "Какао"
				},
				"description": {
					"en": "The cocoa bean, also cacao bean or simply cocoa (/ˈkoʊ.koʊ/) or cacao (/kəˈkaʊ/), is the dried and fully fermented fatty seed of Theobroma cacao, from which cocoa solids and cocoa butter are extracted. They are the basis of chocolate, as well as many Mesoamerican foods such as mole sauce and tejate.A cocoa pod (fruit) has a rough and leathery rind about 3 cm (1.2 in) thick (this varies with the origin and variety of pod). It is filled with sweet, mucilaginous pulp (called 'baba de cacao' in South America) enclosing 30 to 50 large seeds that are fairly soft and white to a pale lavender color. While seeds are usually white, they become violet or reddish brown during the drying process. The exception is rare varieties of white cacao, in which the seeds remain white. Historically, white cacao was cultivated by the Rama people of Nicaragua.",
					"ru": "Бобы какао или какао-бобы — миндалевидные семена, содержащиеся в плоде (стручке) шоколадного дерева (Theobroma cacao). Источник какао-порошка и какао-масла, из которого изготавливают шоколад.Плод какао содержит, помимо мякоти, от 30 до 50 достаточно крупных семян светлой (как правило, бледно-лиловой) окраски, расположенных пятью рядами. Бобы какао состоят на 40-50 % из жира, именуемого маслом какао, и сухих веществ, из которых получают какао-порошок. Легко отделяемая от бобов оболочка измельчается в шрот, который называется какаовелла."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Cocoa_bean",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BA%D0%B0%D0%BE-%D0%B1%D0%BE%D0%B1%D1%8B"
				},
				"nutrition_facts": {
					"energy": 120,
					"carbohydrates": 19.0,
					"fat": 2.5,
					"protein": 5.0,
					"water": 75,
					"vitamins": ["C"],
					"minerals": ["Magnesium","Calcium","Iron"]
				},
				"properties": {
					"flavor": ["Sour", "Sweet"]
				}
			},
			{
				"id": "cucumber",
				"name": {
					"en": "Сucumber",
					"ru": "Огурец"
				},
				"description": {
					"en": "Cucumber (Cucumis sativus) is a widely cultivated plant in the gourd family Cucurbitaceae. It is a creeping vine that bears cylindrical fruits that are used as culinary vegetables. There are three main varieties of cucumber: slicing, pickling, and burpless. Within these varieties, several different cultivars have emerged. The cucumber is originally from Southern Asia, but now grows on most continents. Many different varieties are traded on the global market.",
					"ru": "Огуре́ц обыкнове́нный, или Огурец посевно́й (лат. Cucumis sativus) — однолетнее травянистое растение, вид рода Огурец (Cucumis) семейства Тыквенные (Cucurbitaceae).Огурцы богаты сложными органическими веществами, которые играют важную роль в обмене веществ. Эти вещества способствуют усвоению других продуктов питания и улучшают пищеварение. Они возбуждают аппетит. Свежий огурец эффективно повышает кислотность желудочного сока, поэтому противопоказан страдающим гастритом с повышенной кислотностью и язвенной болезнью.Содержащийся в огурцах калий улучшает работу сердца и почек. К тому же в огурцах, как и в других овощах, много клетчатки. Клетчатка не усваивается организмом человека, но она регулирует работу кишечника и выводит из организма излишки холестерина. Избыток холестерина способствует развитию атеросклероза, болезней печени, почек и других органов."
				},
				"wiki": {
					"en": "https://en.wikipedia.org/wiki/Cucumber",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9E%D0%B3%D1%83%D1%80%D0%B5%D1%86_%D0%BE%D0%B1%D1%8B%D0%BA%D0%BD%D0%BE%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9"
				},
				"nutrition_facts": {
					"energy": 16,
					"carbohydrates": 3.63,
					"fat": 0.11 ,
					"protein": 0.65,
					"water": 96,
					"vitamins": ["B5","K"],
					"minerals": ["Magnesium","Manganese"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},

			{
				"id": "curry_leaf",
				"name": {
					"en": "Curry leaf",
					"ru": "Листья Карри"
				},
				"description": {
					"en": "The curry tree (Murraya koenigii) is a tropical to sub-tropical tree in the family Rutaceae (the rue family, which includes rue, citrus, and sandalwood), which is native to India and Sri Lanka.Its leaves are used in many dishes in India and neighbouring countries. Often used in curries, the leaves are generally called by the name 'curry leaves,' although they are also literally 'sweet neem leaves' in most Indian languages (as opposed to ordinary neem leaves which are very bitter and in the family Meliaceae, not Rutaceae).",
					"ru": "Карри или Муррайя Кёнига (лат. Murraya koenigii) — растение семейства Рутовые, вид рода Муррайя, распространённое в тропических и субтропических районах Индии.Это невысокое дерево высотой до 4-6 м и с диаметром ствола до 40 см Листья перистые, с 11-21 листочками. Каждый листочек — 2-4 см длиной и 1-2 см шириной, с сильным ароматом. Цветки белые, ароматные. Плод — маленькая чёрная блестящая ягода.Листья растения в Индии и на Шри-Ланке широко употребляются как пряность. Плоды съедобны, но их семена ядовиты."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Curry_tree",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9C%D1%83%D1%80%D1%80%D0%B0%D0%B9%D1%8F_%D0%9A%D1%91%D0%BD%D0%B8%D0%B3%D0%B0"
				},
				"nutrition_facts": {
					"energy": 0,
					"carbohydrates": 18.7,
					"fat": 1,
					"protein": 6.1,
					"water": 66.3,
					"vitamins": [" A"],
					"minerals": ["Calcium","Phosphorus","Iron"]
				},
				"properties": {
					"flavor": [""]
				}
			},
			{
				"id": "custard_apple",
				"name": {
					"en": "Сustard Apple",
					"ru": "Черимойя"
				},
				"description": {
					"en": "Annona cherimola, originally called Chirimuya by the Inca people who lived where it was growing in the Andes of South America, is an edible fruit-bearing species of the genus Annona from the family Annonaceae. It is now widely cultivated mostly for its sweet fruits that share the name Custard-apple with others in its family. Other English common names include cherimoya, chirimoyo, momona, kelemoio.",
					"ru": "Черимойя (лат. Annona cherimola) — плодовое дерево, вид рода Аннона (Annona) семейства Анноновые (Annonaceae).Спелые плоды черимойи съедобны в свежем виде. При употреблении они разрезаются и мякоть съедается при помощи ложки. Черимойя используется при изготовлении мороженого, шербетов, прохладительных напитков, добавляется как компонент в фруктовые салаты. Сок её плодов также сбраживается в алкогольный напиток. Её поджаренные истолчённые семена являются довольно сильным рвотным средством. В смеси с жиром порошок семян используется для борьбы с вшами и кожными паразитами."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Annona_cherimola",
					"ru": "http://ru.wikipedia.org/wiki/%D0%A7%D0%B5%D1%80%D0%B8%D0%BC%D0%BE%D0%B9%D1%8F"
				},
				"nutrition_facts": {
					"energy": 85,
					"carbohydrates": 20,
					"fat": 0.5,
					"protein": 68,
					"water": 20,
					"vitamins": ["C"],
					"minerals": ["Calcium","Phosphorous"]
				},
				"properties": {
					"flavor": ["Sour", "Sweet"]
				}
			},
			{
				"id": "dates",
				"name": {
					"en": "Dates",
					"ru": "Финики"
				},
				"description": {
					"en": "Dates have been a staple food of the Middle East and the Indus Valley for thousands of years. They are believed to have originated around Iraq, and have been cultivated since ancient times from Mesopotamia to prehistoric Egypt, possibly as early as 4000 BCE. The Ancient Egyptians used the fruits to make date wine, and ate them at harvest. There is archaeological evidence of date cultivation in eastern Arabia in 6000 BCE. ",
					"ru": "Финик пальчатый (лат. Phoenix dactylifera) — вид деревьев из рода Финиковая пальма семейства Пальмовые (Пальмы). Финики на протяжении тысячелетий остаются одним из основных видов пищи в странах Ближнего Востока и Северной Африки. В Индии убеждены, что первыми финиковую пальму одомашнили носители индской цивилизации. В Месопотамии, которая традиционно считается родиной финиковой пальмы, обнаружены свидетельства возделывания этого дерева за 4 тыс. лет до н. э. В Древнем Египте финики использовались как сырьё для производства вина. С появлением оросительных систем в Хадрамауте (Йемен), у Вади Хадрамаут, финик пальчатый стали культивировать и там.В наше время основными поставщиками фиников на мировой рынок являются страны Северной Африки, главным образом Алжир и Тунис."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Date_palm",
					"ru": "http://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BD%D0%B8%D0%BA_%D0%BF%D0%B0%D0%BB%D1%8C%D1%87%D0%B0%D1%82%D1%8B%D0%B9"
				},
				"nutrition_facts": {
					"energy": 282,
					"carbohydrates": 75.03 ,
					"fat": 0.39,
					"protein": 2.45,
					"water": 20.53,
					"vitamins": ["B1","B2","B3","B5","B6","B9"],
					"minerals": ["Iron","Magnesium","Manganese","Phosphorus","Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},

			{
				"id": "dragon_fruit",
				"name": {
					"en": "Dragon Fruit",
					"ru": "Питайя"
				},
				"description": {
					"en": "A pitaya /pɨˈtaɪ.ə/ or pitahaya /ˌpɪtəˈhaɪ.ə/ is the fruit of several cactus species. Pitaya usually refers to fruit of the genus Stenocereus, while Pitahaya or Dragon fruit always refers to fruit of the genus Hylocereus.",
					"ru": "Питайя или питахайя, — общее название плода нескольких видов из семейства Кактусовые, в основном из рода Hylocereus («сладкая питайя»).Растения, плоды которых называют питайей, — вьющиеся эпифитные лианообразные кактусы, распространённые в Мексике, Центральной и Южной Америке.В настоящее время эти растения также культивируются в ряде стран Юго-Восточной Азии — таких, как Вьетнам, Таиланд, Филиппины, Индонезия, Шри-Ланка и Малайзия, Япония (о. Окинава), Китай, Тайвань, а также в США (Гавайи), Израиле, Северной Австралии.Hylocereus цветёт только по ночам; крупные белые ароматные цветы типичной для кактусовых цветов формы. Плод сладкой питайи имеет белую кремообразную мякоть и нежный аромат."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Pitaya",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9F%D0%B8%D1%82%D0%B0%D0%B9%D1%8F"
				},
				"nutrition_facts": {
					"energy": 28,
					"carbohydrates": 11.0,
					"fat": 0.4,
					"protein": 1.1,
					"water": 87,
					"vitamins": ["C"],
					"minerals": ["Iron" ]
				},
				"properties": {
					"flavor": ["Sour", "Sweet"]
				}
			},
			{
				"id": "durian",
				"name": {
					"en": "Durian",
					"ru": "Дуриан"
				},
				"description": {
					"en": "The durian (/ˈdjʊriən/) is the fruit of several tree species belonging to the genus Durio. There are 30 recognised Durio species, at least nine of which produce edible fruit. Durio zibethinus is the only species available in the international market: other species are sold in their local regions.Regarded by many people in southeast Asia as the king of fruits, the durian is distinctive for its large size, strong odour, and formidable thorn-covered husk. The fruit can grow as large as 30 centimetres (12 in) long and 15 centimetres (6 in) in diameter, and it typically weighs one to three kilograms (2 to 7 lb). Its shape ranges from oblong to round, the colour of its husk green to brown, and its flesh pale yellow to red, depending on the species.",
					"ru": "Дуриан (лат. Durio) — род растений семейства Мальвовые, включающий в себя около 30 видов, произрастающих в дождевых тропических лесах Юго-Восточной Азии. Виды рода — большие, слабо ветвящиеся, вечнозелёные деревья с корнями-подпорками и простыми листьями.Цветки крупные, белого или красного цвета, развиваются на стволах (каулифлория) или крупных ветвях (рамифлория), раскрываются к вечеру и опыляются летучими мышами и пчёлами.Плоды дуриана достигают в диаметре до 20 см и массы до 4 кг[источник не указан 271 день]. Они имеют очень твёрдую оболочку и покрыты мощными колючками, защищающими содержимое недозрелого плода от животных. Раскрывается плод пятью створками, по краю которых расположены тёмные семена с мясистыми придатками — ариллусами.Плоды дуриана, несмотря на отвратительный запах, который исключает их хранение в закрытых помещениях, считаются наиболее ценными фруктами в Юго-Восточной Азии и в Южной Америке (в частности в Бразилии). Местные жители говорят, что запах дуриана вызывает видения ада, а вкус — райские наслаждения."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Durian",
					"ru": "http://ru.wikipedia.org/wiki/%D0%94%D1%83%D1%80%D0%B8%D0%B0%D0%BD"
				},
				"nutrition_facts": {
					"energy": 147,
					"carbohydrates": 27.09,
					"fat": 5.33,
					"protein": 1.47,
					"water": 65,
					"vitamins": ["B1","B2","B3","B5","B6","B9","C"],
					"minerals": ["Magnesium","Manganese","Phosphorus","Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "fig",
				"name": {
					"en": "Fig",
					"ru": "Инжир"
				},
				"description": {
					"en": "The common fig (Ficus carica) is a species of flowering plant in the genus Ficus, from the family Moraceae, known as the common fig (or just the fig). It is the source of the fruit also called the fig, and as such is an important crop in those areas where it is grown commercially. Native to the Middle East and western Asia, it has been sought out and cultivated since ancient times, and is now widely grown throughout the temperate world, both for its fruit and as an ornamental plant.",
					"ru": "Инжи́р, или Фи́га, или Фи́говое де́рево, или Смоко́вница обыкнове́нная, или Смо́ква, или Ви́нная я́года (лат. Fícus cárica) — субтропический листопадный фикус. Карийским фикус назван по месту, которое считается родиной инжира — горная область древней Карии, провинции Малой Азии. В Средней Азии, на Кавказе и в Крыму выращивают в открытом грунте как ценное плодовое растение, дающее плоды — винные ягоды.Широко распространён в странах Средиземноморья, в Грузии, в горах Армении, на Апшеронском полуострове, в центральных районах Азербайджана, на Черноморском побережье Краснодарского края и Абхазии.Инжир — одно из самых древних культурных растений, предположительно — самое древнее[2][3]. В культуре инжир выращивался сначала в Аравии, откуда был заимствован Финикией, Сирией и Египтом. В XIII веке до н. э. играл важную роль в сельском хозяйстве царства Пилос. В Америку попал только в конце XVI века."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Common_fig",
					"ru": "http://ru.wikipedia.org/wiki/%D0%98%D0%BD%D0%B6%D0%B8%D1%80"
				},
				"nutrition_facts": {
					"energy": 249 ,
					"carbohydrates": 63.87,
					"fat": 0.93,
					"protein": 3.3,
					"water": 33,
					"vitamins": ["B1","B2","B3","B6","B9","K"],
					"minerals": ["Calcium","Iron","Magnesium","Manganese","Phosphorus","PotassiumZ","inc"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
			{
				"id": "ginger",
				"name": {
					"en": "Ginger",
					"ru": "Имбирь"
				},
				"description": {
					"en": "Ginger or ginger root is the rhizome of the plant Zingiber officinale, consumed as a delicacy, medicine, or spice. It derives its name to its genus and family (Zingiberaceae). Other notable members of this plant family are turmeric, cardamom and galangal. The distantly related dicots in the Asarum genus have the common name wild ginger because of their similar taste.Ginger is indigenous to southern China, spreading eventually to the Spice Islands, other parts of Asia and subsequently to West Africa and the Caribbean. Ginger was exported to Europe via India in the first century AD as a result of the lucrative spice trade. India remains the largest producer of ginger.",
					"ru": "Имби́рь апте́чный, или Имбирь лека́рственный, или Имбирь настоя́щий, или Имбирь обыкнове́нный (лат. Zīngiber officināle) — многолетнее травянистое растение; типовой вид рода Имбирь семейства Имбирные (Zingiberaceae). В русском языке часто называется просто имбирь; имбирём называют также сырые или переработанные корневища растения."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Ginger",
					"ru": "http://ru.wikipedia.org/wiki/%D0%98%D0%BC%D0%B1%D0%B8%D1%80%D1%8C_%D0%B0%D0%BF%D1%82%D0%B5%D1%87%D0%BD%D1%8B%D0%B9"
				},
				"nutrition_facts": {
					"energy": 336,
					"carbohydrates": 71.62,
					"fat": 4.24,
					"protein": 8.98,
					"water": 15,
					"vitamins": ["B2","B3","B5","B6"],
					"minerals": ["Calcium","Iron","Magnesium","Manganese","Phosphorus","Potassium","Zinc"]
				},
				"properties": {
					"flavor": ["Pungency"]
				}
			},
			{
				"id": "gotukola",
				"name": {
					"en": "Gotukola",
					"ru": "Центелла"
				},
				"description": {
					"en": "Centella asiatica, commonly known as centella and gotu kola, is a small, herbaceous, annual plant of the family Mackinlayaceae or subfamily Mackinlayoideae of family Apiaceae, and is native to wetlands in Asia.[2][3] It is used as a medicinal herb in Ayurvedic medicine, traditional African medicine, and traditional Chinese medicine. It is also known as the Asiatic pennywort or Indian pennywort in English, among various other names in other languages.",
					"ru": "Центелла азиатская (лат. Centélla asiática) — травянистое цветковое растение, вид рода Центелла семейства Зонтичные (Apiaceae); ранее этот род обычно включали в семейство Аралиевые (Araliaceae), иногда включали в семейство Щитолистниковые (Hydrocotylaceae).Растение широко распространено в Азии и Австралии, используется как пищевое и лекарственное растение.В Юго-Восточной Азии центеллу применяют как стимулирующее и тонизирующее средство, улучшающее обмен веществ, при бронхитах, бронхиальной астме, туберкулёзе[4]. Растение входит в фармакопею Индии и Британскую Травяную Фамакопею, используется как диуретическое, антисептическое, слабительное, противоревматическое средство и в дерматологии. На Мадагаскаре используется для лечения лепры и туберкулёза"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Centella_asiatica",
					"ru": "http://ru.wikipedia.org/wiki/%D0%A6%D0%B5%D0%BD%D1%82%D0%B5%D0%BB%D0%BB%D0%B0_%D0%B0%D0%B7%D0%B8%D0%B0%D1%82%D1%81%D0%BA%D0%B0%D1%8F"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["C","B1","B2","B3"],
					"minerals": ["Calcium","Magnesium","Manganese","Phosphorus","Potassium","Selenium","Zinc"]
				},
				"properties": {
					"flavor": ["Bitter","Sweet"]
				}
			},
			{
				"id": "grapefruit",
				"name": {
					"en": "Grapefruit",
					"ru": "Грейпфрут"
				},
				"description": {
					"en": "The grapefruit (Citrus × paradisi) is a subtropical citrus tree known for its sour to semi-sweet fruit, an 18th-century hybrid first bred in Barbados. When found, it was named the Forbidden fruit;and it has also been misidentified with the pomelo or shaddock, one of the parents of this hybrid, the other being sweet orange.",
					"ru": "Грейпфру́т (Citrus paradisi — субтропическое вечнозелёное дерево рода цитрус семейства рутовых (Rutaceae), а также его плод, достигающий в диаметре 10—15 см. Первым поведал миру о грейпфруте валлийский ботаник-священник Гриффитс Хьюджес в 1750 году. Он назвал фрукт «запретным плодом», позднее грейпфрут стали называть «маленьким шеддоком» из-за его сходства с помело, которое тогда называли шеддоком (по фамилии английского капитана Шеддока, завезшего его в XVII веке на остров Барбадос), а в 1814 году на Ямайке торговцы переименовали плод в грейпфрут. После 1880 г. начался быстрый рост промышленного производства этой культуры в США, затем в странах Карибского бассейна, Бразилии, Израиле и ЮАР), а в XX веке грейпфрут занял ведущее место на мировом фруктовом рынке."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Grapefruit",
					"ru": "https://ru.wikipedia.org/wiki/%D0%93%D1%80%D0%B5%D0%B9%D0%BF%D1%84%D1%80%D1%83%D1%82"
				},
				"nutrition_facts": {
					"energy": "33",
					"carbohydrates": "8.41",
					"fat": "0.10",
					"protein": "0.69",
					"water": "90,48",
					"vitamins": ["B5","C"],
					"minerals": ["Magnesium","Potassium"]
				},
				"properties": {
					"flavor": ["Bitter","Sweet"]
				}
			},
			{
				"id": "grapes",
				"name": {
					"en": "Grapes",
					"ru": "Виноград"
				},
				"description": {
					"en": "A grape is a fruiting berry of the deciduous woody vines of the botanical genus Vitis. Grapes can be eaten raw or they can be used for making wine, jam, juice, jelly, grape seed extract, raisins, vinegar, and grape seed oil. Grapes are a non-climacteric type of fruit, generally occurring in clusters.",
					"ru": "Виногра́д — плоды винограда культурного и некоторых других растений рода Виноград, в зрелом виде представляющие собой сладкие ягоды. Ценный пищевой продукт и сырьё для виноделия. Плоды винограда, а также продукты его переработки обладают ценными лечебными, вкусовыми и пищевыми качествами."
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Grape",
					"ru": "https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D0%B4_(%D1%8F%D0%B3%D0%BE%D0%B4%D0%B0)"
				},
				"nutrition_facts": {
					"energy": "69",
					"carbohydrates": "18.1",
					"fat": "0.16",
					"protein": "0.72",
					"water": "85",
					"vitamins": ["B1","B2","B6","K"],
					"minerals": ["Potassium"]
				},
				"properties": {
					"flavor": ["Sweet"]
				}
			},
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Start here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



			{
				"id": "guava",
				"name": {
					"en": "Guava",
					"ru": "Гуава"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?guava",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "jackfruit",
				"name": {
					"en": "Jackfruit",
					"ru": "Джекфрут"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Jackfruit",
					"ru": "https://ru.wikipedia.org/wiki/%D0%94%D0%B6%D0%B5%D0%BA%D1%84%D1%80%D1%83%D1%82"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "jambu",
				"name": {
					"en": "Jambu",
					"ru": "Джамбу"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Syzygium",
					"ru": "https://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D0%B7%D0%B8%D0%B3%D0%B8%D1%83%D0%BC"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "kirala",
				"name": {
					"en": "Kirala",
					"ru": "Кирала"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "",
					"ru": ""
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "kiwi",
				"name": {
					"en": "Kiwi",
					"ru": "Киви"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?kiwi",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "lawulu",
				"name": {
					"en": "Lawulu",
					"ru": "Лавулу"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Pouteria_campechiana",
					"ru": "http://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B5%D0%BB"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "lemon",
				"name": {
					"en": "Lemon",
					"ru": "Лемон"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?lemon",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "lime",
				"name": {
					"en": "Lime",
					"ru": "Лайм"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?lime",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "lovi",
				"name": {
					"en": "Lovi",
					"ru": "Лови"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Flacourtia_inermis",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "mandarin",
				"name": {
					"en": "Mandarin",
					"ru": "Мандарин"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?mandarin",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "mango",
				"name": {
					"en": "Mango",
					"ru": "Манго"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?mango",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "mangosteen",
				"name": {
					"en": "Mangosteen",
					"ru": "Мангустин"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?mangosteen",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "naminan",
				"name": {
					"en": "Naminan",
					"ru": "Наминан"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "nelli",
				"name": {
					"en": "Nelli",
					"ru": "Нелли"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Phyllanthus_emblica",
					"ru": "https://ru.wikipedia.org/wiki/%D0%A4%D0%B8%D0%BB%D0%BB%D0%B0%D0%BD%D1%82%D1%83%D1%81_%D1%8D%D0%BC%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "orange",
				"name": {
					"en": "Orange",
					"ru": "Апельсиновый"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?orange",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "palm_fruit",
				"name": {
					"en": "Palm Fruit",
					"ru": "Пальмировая пальма"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Borassus_flabellifer",
					"ru": "https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D0%BB%D1%8C%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%8F_%D0%BF%D0%B0%D0%BB%D1%8C%D0%BC%D0%B0"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "papaya",
				"name": {
					"en": "Papaya",
					"ru": "Папайя"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?papaya",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "passion_fruit",
				"name": {
					"en": "Passion Fruit",
					"ru": "Маракуя"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?passion_fruit",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "peach",
				"name": {
					"en": "Peach",
					"ru": "Персик"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?peach",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "peanut",
				"name": {
					"en": "Peanut",
					"ru": "Арахис"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?peanut",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "pear",
				"name": {
					"en": "Pear",
					"ru": "Груша"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?pear",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "pineapple",
				"name": {
					"en": "Pineapple",
					"ru": "Ананас"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?pineapple",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "pomegranate",
				"name": {
					"en": "Pomegranate",
					"ru": "Гранат"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?pomegranate",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "raisin",
				"name": {
					"en": "Raisin",
					"ru": "Изюм"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?raisin",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "rambutan",
				"name": {
					"en": "Rambutan",
					"ru": "Рамбутан"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?rambutan",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sapodilla",
				"name": {
					"en": "Sapodilla",
					"ru": "Саподилла"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "silver_melon",
				"name": {
					"en": "Silver Melon",
					"ru": "Серебрянная Дыня"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?silver_melon",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sour_orange",
				"name": {
					"en": "Sour Orange",
					"ru": "Кислый Апельсин"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?sour_orange",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sour_guava",
				"name": {
					"en": "Sour Guava",
					"ru": "Кислая Гуава"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?sour_guava",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "soursop_annona",
				"name": {
					"en": "Soursop Annona",
					"ru": "Аннона"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?soursop_annona",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "starfruit",
				"name": {
					"en": "Starfruit",
					"ru": "Карамболь"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?starfruit",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "strawberry",
				"name": {
					"en": "Strawberry",
					"ru": "Клубника"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?strawberry",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sugar_cane",
				"name": {
					"en": "Sugar Cane",
					"ru": "Сахарный тросник"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?sugar_cane",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sweet_coconut",
				"name": {
					"en": "Sweet Coconut",
					"ru": "Сладкий Кокос"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?sweet_coconut",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "sweet_melon",
				"name": {
					"en": "Sweet Melon",
					"ru": "Сладкая Дыня"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?sweet_melon",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "tamarind",
				"name": {
					"en": "Tamarind",
					"ru": "Тамаринд"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?tamarind",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "tangerine",
				"name": {
					"en": "Tangerine",
					"ru": "Тангерин"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?tangerine",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "tomato",
				"name": {
					"en": "Tomato",
					"ru": "Помидор"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?tomato",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "veralu",
				"name": {
					"en": "Veralu",
					"ru": "Вералу"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?veralu",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "watermelon",
				"name": {
					"en": "Watermelon",
					"ru": "Арбуз"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "?watermelon",
					"ru": "?"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			},
			{
				"id": "woodapple",
				"name": {
					"en": "Woodapple",
					"ru": "Деревянное Яблоко"
				},
				"description": {
					"en": "?",
					"ru": "?"
				},
				"wiki": {
					"en": "http://en.wikipedia.org/wiki/Limonia_acidissima",
					"ru": "https://ru.wikipedia.org/wiki/%D0%94%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%BE%D0%B5_%D1%8F%D0%B1%D0%BB%D0%BE%D0%BA%D0%BE"
				},
				"nutrition_facts": {
					"energy": "?",
					"carbohydrates": "?",
					"fat": "?",
					"protein": "?",
					"water": "?",
					"vitamins": ["?"],
					"minerals": ["?"]
				},
				"properties": {
					"flavor": ["?"]
				}
			}
		];

		/**
		 * Retrieves all ingredients
		 * @returns {promise}
		 */
		self.getAll = function () {
			var deferred = $q.defer();
			deferred.resolve(ingredients);
			return deferred.promise;
		};

		/**
		 * Retrieves ingredient by id
		 * @returns {promise}
		 */
		self.getOne = function (id) {
			var deferred = $q.defer();
			deferred.resolve($filter('filter')(ingredients, {id: id})[0]);
			return deferred.promise;
		}
	});