/* ================= DATA ================= */
const L=(id,t,th,code,q,o,a)=>({id,t,th,code,quiz:{q,o,a}});

/* ================= MY PROJECTS SHOWCASE =================
   Real, deployed projects shown on the Projects page (see V.projects in
   js/views-community.js → myProjectCard()). Each entry is one card.
   To add a new project later, just push another object here — id: unique
   slug, title/desc: short human copy, tech: array of technology names
   (only ones you can actually confirm), url: the live deployed link. */
const MY_PROJECTS=[
 {id:'habit-tracker',title:'Трекер привычек',
  desc:'Ежедневный чек-лист привычек: отмечайте выполнение за день, прогресс сохраняется прямо в браузере.',
  tech:['HTML','CSS','JavaScript'],url:'https://extraordinary-kheer-4684d4.netlify.app/'},
 {id:'weather-app',title:'Погода',
  desc:'Карточка с показателями погоды — компактный интерфейс для отображения текущих данных.',
  tech:['HTML','CSS','JavaScript'],url:'https://cheery-salamander-48942c.netlify.app/'},
 {id:'tic-tac-toe',title:'Крестики-нолики',
  desc:'Классическая игра для двух игроков на одном экране: ходы по очереди и определение победителя.',
  tech:['HTML','CSS','JavaScript'],url:'https://sparkly-rabanadas-c4d4f3.netlify.app/'},
 {id:'calculator-history',title:'Калькулятор с историей',
  desc:'Калькулятор с основными арифметическими операциями и историей предыдущих вычислений.',
  tech:['HTML','CSS','JavaScript'],url:'https://animated-buttercream-676409.netlify.app/'}
];

const COURSES=[
{id:'js',t:'JavaScript Basics',sub:'Основы языка веба: переменные, условия, циклы, функции и массивы. Код запускается прямо в уроке.',run:'js',level:'Beginner',hours:24,proj:3,group:'web',author:'teacher',video:'https://www.youtube.com/watch?v=PkZNo7MFNFg',mods:[
 {t:'Введение',ls:[
  L('js-1','Первая программа: console.log',
   `<p>JavaScript работает в каждом браузере. Чтобы увидеть результат работы программы, используют <code>console.log()</code> — он выводит значение в консоль разработчика.</p><p>Строки пишут в кавычках, числа — без. Каждая инструкция заканчивается точкой с запятой.</p>`,
   `console.log("Привет, мир!");\nconsole.log(2 + 3);`,
   'Что выведет console.log(2 + 3)?',['23','5','"2 + 3"','Ошибку'],1),
  L('js-2','Переменные: let и const',
   `<p>Переменная — это имя, под которым хранится значение. <code>let</code> подходит для значений, которые меняются, <code>const</code> — для тех, что остаются прежними.</p><p>Имена принято писать в стиле camelCase: <code>userName</code>, <code>totalPrice</code>.</p>`,
   `const name = "Korkem";\nlet age = 16;\nage = age + 1;\nconsole.log(name, age);`,
   'Какое ключевое слово объявляет переменную, которую нельзя переприсвоить?',['let','const','var','set'],1)]},
 {t:'Условия и циклы',ls:[
  L('js-3','Условия if / else',
   `<p>Условие позволяет программе выбирать путь. Если выражение в скобках истинно, выполняется первый блок, иначе — блок после <code>else</code>.</p><p>Сравнивайте значения через <code>===</code>, <code>&gt;</code>, <code>&lt;=</code>.</p>`,
   `const age = 17;\nif (age >= 18) {\n  console.log("Доступ разрешён");\n} else {\n  console.log("Нужно подрасти");\n}`,
   'Чему равно выражение 18 > 18?',['true','false','undefined','Ошибке'],1),
  L('js-4','Циклы for и while',
   `<p>Цикл повторяет блок кода. В <code>for</code> три части: старт, условие продолжения, шаг. Цикл остановится, когда условие станет ложным.</p><p>Следите за условием: цикл без выхода будет работать бесконечно.</p>`,
   `let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;\n}\nconsole.log(sum);`,
   'Сколько раз выполнится тело цикла for (let i = 0; i < 4; i++)?',['3','4','5','0'],1)]},
 {t:'Функции и массивы',ls:[
  L('js-5','Функции',
   `<p>Функция — именованный блок кода, который можно вызывать много раз. Она принимает параметры и возвращает результат через <code>return</code>.</p>`,
   `function square(x) {\n  return x * x;\n}\nconsole.log(square(4));`,
   'Что делает return?',['Печатает значение','Возвращает значение и завершает функцию','Объявляет переменную','Запускает цикл'],1),
  L('js-6','Массивы',
   `<p>Массив хранит упорядоченный список значений. Элементы нумеруются с нуля. Метод <code>push</code> добавляет элемент в конец, свойство <code>length</code> хранит длину.</p>`,
   `const langs = ["JS", "Python"];\nlangs.push("Java");\nconsole.log(langs.length);\nconsole.log(langs[0]);`,
   'Какой индекс у первого элемента массива?',['1','0','-1','first'],1)]}
]},
{id:'py',t:'Python Fundamentals',sub:'Python с нуля: переменные, условия, циклы и функции. Первые программы для анализа данных и автоматизации.',run:'none',level:'Beginner',hours:35,proj:5,group:'prog',author:'teacher',video:'https://www.youtube.com/watch?v=rfscVS0vtbw',mods:[
 {t:'Основы',ls:[
  L('py-1','print и переменные',
   `<p>В Python вывод делает функция <code>print()</code>. Переменные создаются присваиванием — объявлять тип не нужно.</p>`,
   `name = "Korkem"\nage = 16\nprint(name, age)`,
   'Как вывести текст в Python?',['echo "x"','print("x")','console.log("x")','System.out.println("x")'],1),
  L('py-2','Условия',
   `<p>Блоки кода в Python выделяются отступом, а не фигурными скобками. После условия ставится двоеточие.</p>`,
   `age = 17\nif age >= 18:\n    print("Доступ разрешён")\nelse:\n    print("Нужно подрасти")`,
   'Чем в Python обозначают блок кода внутри if?',['Фигурными скобками','Отступом','Точкой с запятой','Словом end'],1)]},
 {t:'Циклы и функции',ls:[
  L('py-3','Цикл for',
   `<p>Цикл <code>for</code> перебирает элементы последовательности. Функция <code>range(n)</code> создаёт числа от 0 до n-1.</p>`,
   `for i in range(3):\n    print(i)`,
   'Какие числа даёт range(3)?',['1, 2, 3','0, 1, 2','0, 1, 2, 3','3'],1),
  L('py-4','Функции def',
   `<p>Функцию объявляют словом <code>def</code>. Результат возвращает <code>return</code>.</p>`,
   `def square(x):\n    return x * x\n\nprint(square(4))`,
   'Какое слово объявляет функцию в Python?',['function','def','fn','func'],1)]}
]},
{id:'web',t:'HTML & CSS',sub:'Структура страниц и оформление: теги, селекторы, цвета и Flexbox. Результат видно сразу в предпросмотре.',run:'html',level:'Beginner',hours:20,proj:4,group:'web',author:'teacher',video:'https://www.youtube.com/watch?v=a_iQb1lnAEQ',mods:[
 {t:'HTML',ls:[
  L('web-1','Структура страницы',
   `<p>Любая страница состоит из <code>&lt;head&gt;</code> с служебной информацией и <code>&lt;body&gt;</code> с видимым содержимым. Заголовки задают теги <code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>.</p>`,
   `<!doctype html>\n<html>\n<head><title>Моя страница</title></head>\n<body>\n  <h1>Привет!</h1>\n  <p>Это моя первая страница.</p>\n</body>\n</html>`,
   'Где находится видимое содержимое страницы?',['<head>','<body>','<title>','<meta>'],1),
  L('web-2','Текст, ссылки, списки',
   `<p>Абзац — <code>&lt;p&gt;</code>, ссылка — <code>&lt;a href&gt;</code>, маркированный список — <code>&lt;ul&gt;</code> с элементами <code>&lt;li&gt;</code>.</p>`,
   `<h2>Мой стек</h2>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n<a href="https://example.com">Ссылка</a>`,
   'Какой тег создаёт ссылку?',['<link>','<a>','<href>','<url>'],1)]},
 {t:'CSS',ls:[
  L('web-3','Селекторы и цвета',
   `<p>CSS описывает, как выглядят элементы. Селектор выбирает элементы: <code>h1</code> — по тегу, <code>.note</code> — по классу, <code>#main</code> — по id.</p>`,
   `<style>\n  h1 { color: #5a3fd6; }\n  .note { background: #eee; padding: 8px; }\n</style>\n<h1>Заголовок</h1>\n<p class="note">Заметка</p>`,
   'Как выбрать элементы с классом note?',['#note','.note','note','*note'],1),
  L('web-4','Flexbox',
   `<p>Flexbox раскладывает элементы в ряд или колонку. Достаточно задать родителю <code>display: flex</code>, а расстояние между детьми — <code>gap</code>.</p>`,
   `<style>\n  .row { display: flex; gap: 12px; }\n  .box { padding: 16px; background: #ddd; }\n</style>\n<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>`,
   'Какое объявление включает flexbox?',['display: flex','position: flex','float: flex','flex: on'],0)]}
]},
{id:'java',t:'Java Fundamentals',sub:'Классы, типы данных, условия и циклы — база для бэкенда и Android-разработки.',run:'none',level:'Beginner',hours:40,proj:4,group:'prog',author:'teacher',video:'https://www.youtube.com/watch?v=A74TOX803D0',mods:[
 {t:'Первые шаги',ls:[
  L('java-1','Класс и метод main',
   `<p>Программа на Java состоит из классов. Выполнение начинается с метода <code>main</code>. Вывод делает <code>System.out.println</code>.</p>`,
   `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Привет!");\n    }\n}`,
   'С какого метода начинается выполнение программы на Java?',['main','start','init','run'],0),
  L('java-2','Типы данных',
   `<p>Java — язык со строгой типизацией: тип переменной указывают при объявлении. Основные типы: <code>int</code>, <code>double</code>, <code>boolean</code>, <code>String</code>.</p>`,
   `int age = 16;\ndouble price = 9.99;\nString name = "Korkem";\nboolean ok = true;`,
   'Какой тип хранит целые числа?',['String','int','boolean','double'],1),
  L('java-3','Условия и циклы',
   `<p>Синтаксис <code>if</code> и <code>for</code> в Java похож на JavaScript, но переменные в них обязательно имеют тип.</p>`,
   `for (int i = 0; i < 3; i++) {\n    System.out.println(i);\n}`,
   'Что делает i++?',['Уменьшает i','Увеличивает i на 1','Обнуляет i','Удваивает i'],1)]}
]},
{id:'sql',t:'SQL Basics',sub:'Язык запросов к базам данных: выбор, фильтрация и объединение таблиц.',run:'none',level:'Beginner',hours:15,proj:2,group:'data',author:'teacher',video:'https://www.youtube.com/watch?v=HXV3zeQKqGY',mods:[
 {t:'Запросы',ls:[
  L('sql-1','SELECT',
   `<p>Запрос <code>SELECT</code> выбирает столбцы из таблицы. Звёздочка <code>*</code> означает «все столбцы».</p>`,
   `SELECT name, age\nFROM students;`,
   'Какая команда выбирает данные?',['GET','SELECT','FIND','PICK'],1),
  L('sql-2','WHERE',
   `<p>Ключевое слово <code>WHERE</code> оставляет только строки, подходящие под условие.</p>`,
   `SELECT * FROM students\nWHERE age >= 16;`,
   'Какое слово фильтрует строки?',['FILTER','WHERE','HAVE','ONLY'],1),
  L('sql-3','JOIN',
   `<p><code>JOIN</code> объединяет строки двух таблиц по условию — например, студента и название его курса.</p>`,
   `SELECT s.name, c.title\nFROM students s\nJOIN courses c ON c.id = s.course_id;`,
   'Что делает JOIN?',['Удаляет таблицу','Объединяет строки двух таблиц по условию','Сортирует данные','Создаёт индекс'],1)]}
]}
];

const SOON=['C++','C#','PHP','React','Node.js','Git','Linux','Алгоритмы','Структуры данных'];

const TASKS=[
{id:'t1',t:'Сумма от 1 до n',diff:'Beginner',topic:'Циклы',fn:'sumTo',desc:'Напишите функцию <code>sumTo(n)</code>, которая возвращает сумму всех целых чисел от 1 до n включительно.',ex:['sumTo(5)','15'],lim:'1 ≤ n ≤ 10 000',starter:'function sumTo(n) {\n  // ваш код\n}',cases:[{a:[1],e:1},{a:[5],e:15},{a:[10],e:55},{a:[100],e:5050}]},
{id:'t2',t:'Развернуть строку',diff:'Beginner',topic:'Строки',fn:'reverseString',desc:'Верните строку, записанную задом наперёд. Метод <code>reverse()</code> у строк не существует — подумайте, как обойтись без него.',ex:['reverseString("abc")','"cba"'],lim:'Длина строки до 1000',starter:'function reverseString(s) {\n  // ваш код\n}',cases:[{a:['abc'],e:'cba'},{a:['Skill Up'],e:'htaPedoC'},{a:[''],e:''}]},
{id:'t3',t:'Подсчёт гласных',diff:'Beginner',topic:'Строки',fn:'countVowels',desc:'Посчитайте количество латинских гласных (a, e, i, o, u) в строке. Регистр не важен.',ex:['countVowels("hello")','2'],lim:'Только латинские буквы',starter:'function countVowels(s) {\n  // ваш код\n}',cases:[{a:['hello'],e:2},{a:['rhythm'],e:0},{a:['AEIOU'],e:5}]},
{id:'t4',t:'Максимум в массиве',diff:'Easy',topic:'Массивы',fn:'maxOfArray',desc:'Верните наибольшее число в непустом массиве. Не используйте <code>Math.max</code> — напишите цикл.',ex:['maxOfArray([3, 9, 2])','9'],lim:'1 ≤ длина ≤ 10 000',starter:'function maxOfArray(arr) {\n  // ваш код\n}',cases:[{a:[[3,9,2]],e:9},{a:[[-5,-1,-7]],e:-1},{a:[[42]],e:42}]},
{id:'t5',t:'Факториал',diff:'Easy',topic:'Рекурсия',fn:'factorial',desc:'Верните n! — произведение чисел от 1 до n. Факториал нуля равен 1.',ex:['factorial(5)','120'],lim:'0 ≤ n ≤ 15',starter:'function factorial(n) {\n  // ваш код\n}',cases:[{a:[0],e:1},{a:[1],e:1},{a:[5],e:120},{a:[10],e:3628800}]},
{id:'t6',t:'Палиндром',diff:'Easy',topic:'Строки',fn:'isPalindrome',desc:'Проверьте, читается ли строка одинаково в обе стороны. Регистр и пробелы игнорируются.',ex:['isPalindrome("level")','true'],lim:'Только латинские буквы и пробелы',starter:'function isPalindrome(s) {\n  // ваш код\n}',cases:[{a:['level'],e:true},{a:['hello'],e:false},{a:['A man a plan a canal Panama'],e:true},{a:[''],e:true}]},
{id:'t7',t:'FizzBuzz',diff:'Easy',topic:'Условия',fn:'fizzBuzz',desc:'Верните массив строк для чисел от 1 до n: «Fizz» для кратных 3, «Buzz» для кратных 5, «FizzBuzz» для кратных обоим, иначе — число в виде строки.',ex:['fizzBuzz(5)','["1","2","Fizz","4","Buzz"]'],lim:'1 ≤ n ≤ 100',starter:'function fizzBuzz(n) {\n  // ваш код\n}',cases:[{a:[5],e:['1','2','Fizz','4','Buzz']},{a:[15],e:['1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz']}]},
{id:'t8',t:'Two Sum',diff:'Medium',topic:'Массивы',fn:'twoSum',desc:'В массиве найдите два элемента с суммой target и верните их индексы по возрастанию. Решение гарантированно существует и единственно.',ex:['twoSum([2, 7, 11, 15], 9)','[0, 1]'],lim:'2 ≤ длина ≤ 10 000',starter:'function twoSum(nums, target) {\n  // ваш код\n}',cases:[{a:[[2,7,11,15],9],e:[0,1]},{a:[[3,2,4],6],e:[1,2]},{a:[[3,3],6],e:[0,1]}]},
{id:'t9',t:'Найти дубликаты',diff:'Medium',topic:'Массивы',fn:'findDuplicates',desc:'Верните отсортированный массив чисел, которые встречаются в исходном массиве больше одного раза. Каждое число — один раз.',ex:['findDuplicates([1, 2, 3, 2, 1])','[1, 2]'],lim:'Длина до 10 000',starter:'function findDuplicates(arr) {\n  // ваш код\n}',cases:[{a:[[1,2,3,2,1]],e:[1,2]},{a:[[1,2,3]],e:[]},{a:[[4,4,4]],e:[4]},{a:[[5,3,5,3,9]],e:[3,5]}]}
];

/* ================= EXPANDED PRACTICE BANK =================
   12 задач минимум на каждую тему: условия, циклы, строки, массивы,
   рекурсия и функции. Все задачи работают в текущем JavaScript sandbox. */
const P=(id,t,diff,topic,fn,desc,ex,lim,starter,cases)=>({id,t,diff,topic,fn,desc,ex,lim,starter,cases});
const EXTRA_TASKS=[
 P('t10','Совершеннолетие','Beginner','Условия','isAdult','Верните true, если возраст не меньше 18 лет.',['isAdult(18)','true'],'0 ≤ age ≤ 120',`function isAdult(age) {
  // ваш код
}`,[{a:[17],e:false},{a:[18],e:true},{a:[25],e:true}]),
 P('t11','Оценка по баллам','Beginner','Условия','grade','Верните оценку: A для 90+, B для 75–89, C для 60–74 и D для остальных результатов.',['grade(82)','"B"'],'0 ≤ score ≤ 100',`function grade(score) {
  // ваш код
}`,[{a:[95],e:'A'},{a:[82],e:'B'},{a:[60],e:'C'},{a:[41],e:'D'}]),
 P('t12','Знак числа','Beginner','Условия','sign','Верните -1 для отрицательного числа, 0 для нуля и 1 для положительного числа.',['sign(-8)','-1'],'Любые целые числа',`function sign(n) {
  // ваш код
}`,[{a:[-8],e:-1},{a:[0],e:0},{a:[12],e:1}]),
 P('t13','Право на голосование','Beginner','Условия','canVote','Проверьте, может ли человек голосовать: ему должно быть 18 лет или больше и у него должен быть документ.',['canVote(18, true)','true'],'age — целое число, hasId — boolean',`function canVote(age, hasId) {
  // ваш код
}`,[{a:[17,true],e:false},{a:[18,true],e:true},{a:[25,false],e:false}]),
 P('t14','Максимум из трёх','Easy','Условия','max3','Верните наибольшее из трёх чисел без использования Math.max.',['max3(3, 9, 2)','9'],'Любые числа',`function max3(a, b, c) {
  // ваш код
}`,[{a:[3,9,2],e:9},{a:[-5,-1,-7],e:-1},{a:[4,4,2],e:4}]),
 P('t15','Високосный год','Easy','Условия','isLeapYear','Верните true для високосного года: он делится на 400 или делится на 4, но не делится на 100.',['isLeapYear(2024)','true'],'1000 ≤ year ≤ 3000',`function isLeapYear(year) {
  // ваш код
}`,[{a:[2024],e:true},{a:[1900],e:false},{a:[2000],e:true}]),
 P('t16','Стоимость доставки','Easy','Условия','shippingCost','Доставка бесплатна при заказе от 10 000, иначе стоит 1 000. Верните стоимость доставки.',['shippingCost(12000)','0'],'total ≥ 0',`function shippingCost(total) {
  // ваш код
}`,[{a:[12000],e:0},{a:[10000],e:0},{a:[9999],e:1000}]),
 P('t17','Тип треугольника','Medium','Условия','triangleType','Верните invalid, если треугольник невозможен, equilateral для равностороннего, isosceles для равнобедренного и scalene для разностороннего.',['triangleType(3, 4, 5)','"scalene"'],'Стороны — положительные числа',`function triangleType(a, b, c) {
  // ваш код
}`,[{a:[3,4,5],e:'scalene'},{a:[3,3,3],e:'equilateral'},{a:[3,3,4],e:'isosceles'},{a:[1,2,3],e:'invalid'}]),
 P('t18','Скидка магазина','Easy','Условия','getDiscount','Верните размер скидки: 20% для суммы от 50 000, 10% для суммы от 20 000 и 0% для меньшей суммы.',['getDiscount(25000)','0.1'],'total ≥ 0',`function getDiscount(total) {
  // ваш код
}`,[{a:[55000],e:0.2},{a:[25000],e:0.1},{a:[19999],e:0}]),
 P('t19','Число в диапазоне','Beginner','Условия','inRange','Проверьте, находится ли x внутри диапазона от min до max включительно.',['inRange(5, 1, 5)','true'],'Любые числа, min ≤ max',`function inRange(x, min, max) {
  // ваш код
}`,[{a:[5,1,5],e:true},{a:[0,1,5],e:false},{a:[3,1,5],e:true}]),
 P('t20','Цена билета','Beginner','Условия','ticketPrice','Детский билет до 7 лет бесплатный, до 18 лет стоит 1 000, взрослый — 2 500.',['ticketPrice(12)','1000'],'age ≥ 0',`function ticketPrice(age) {
  // ваш код
}`,[{a:[5],e:0},{a:[12],e:1000},{a:[18],e:2500}]),

 P('t21','Сумма чётных чисел','Beginner','Циклы','sumEven','Посчитайте сумму всех чётных чисел от 1 до n включительно.',['sumEven(6)','12'],'1 ≤ n ≤ 100 000',`function sumEven(n) {
  // ваш код
}`,[{a:[1],e:0},{a:[6],e:12},{a:[10],e:30}]),
 P('t22','Количество цифр','Beginner','Циклы','countDigits','Верните количество цифр в целом числе. Для 0 ответ равен 1.',['countDigits(508)','3'],'-1 000 000 000 ≤ n ≤ 1 000 000 000',`function countDigits(n) {
  // ваш код
}`,[{a:[508],e:3},{a:[0],e:1},{a:[-42],e:2}]),
 P('t23','Степень циклом','Beginner','Циклы','powerLoop','Вычислите base в степени exp без Math.pow и оператора **.',['powerLoop(2, 5)','32'],'0 ≤ exp ≤ 20',`function powerLoop(base, exp) {
  // ваш код
}`,[{a:[2,5],e:32},{a:[7,0],e:1},{a:[3,3],e:27}]),
 P('t24','Наибольший общий делитель','Easy','Циклы','gcd','Найдите НОД двух положительных чисел алгоритмом Евклида.',['gcd(18, 24)','6'],'a, b > 0',`function gcd(a, b) {
  // ваш код
}`,[{a:[18,24],e:6},{a:[7,13],e:1},{a:[48,18],e:6}]),
 P('t25','Сколько раз встречается','Beginner','Циклы','countOccurrences','Посчитайте, сколько раз value встречается в массиве.',['countOccurrences([1, 2, 1], 1)','2'],'Длина массива до 10 000',`function countOccurrences(arr, value) {
  // ваш код
}`,[{a:[[1,2,1],1],e:2},{a:[['a','b','a'],'b'],e:1},{a:[[],5],e:0}]),
 P('t26','Первый больший элемент','Easy','Циклы','findFirstGreater','Верните индекс первого элемента массива, который строго больше x, или -1, если такого элемента нет.',['findFirstGreater([2, 5, 8], 4)','1'],'Длина массива до 10 000',`function findFirstGreater(arr, x) {
  // ваш код
}`,[{a:[[2,5,8],4],e:1},{a:[[1,2,3],5],e:-1},{a:[[9,1],8],e:0}]),
 P('t27','Сумма массива циклом','Beginner','Циклы','sumArrayLoop','Верните сумму всех чисел массива, используя цикл.',['sumArrayLoop([2, 4, 6])','12'],'Длина массива до 10 000',`function sumArrayLoop(arr) {
  // ваш код
}`,[{a:[[2,4,6]],e:12},{a:[[-2,5]],e:3},{a:[[]],e:0}]),
 P('t28','Среднее значение','Easy','Циклы','averageLoop','Найдите среднее арифметическое непустого массива чисел.',['averageLoop([2, 4, 6])','4'],'Массив непустой',`function averageLoop(arr) {
  // ваш код
}`,[{a:[[2,4,6]],e:4},{a:[[5]],e:5},{a:[[1,2,4]],e:2.3333333333333335}]),
 P('t29','Таблица умножения','Beginner','Циклы','multiplicationTable','Верните массив из 10 результатов умножения n на числа от 1 до 10.',['multiplicationTable(3)','[3,6,9,12,15,18,21,24,27,30]'],'n — любое число',`function multiplicationTable(n) {
  // ваш код
}`,[{a:[3],e:[3,6,9,12,15,18,21,24,27,30]},{a:[0],e:[0,0,0,0,0,0,0,0,0,0]}]),
 P('t30','Убрать отрицательные','Easy','Циклы','removeNegatives','Верните новый массив только с неотрицательными числами, не меняя исходный массив.',['removeNegatives([-2, 3, 0])','[3,0]'],'Длина массива до 10 000',`function removeNegatives(arr) {
  // ваш код
}`,[{a:[[-2,3,0]],e:[3,0]},{a:[[1,-1,-5,2]],e:[1,2]},{a:[[-1,-2]],e:[]}]),
 P('t31','Факториал циклом','Easy','Циклы','factorialLoop','Верните n! с помощью цикла. Факториал нуля равен 1.',['factorialLoop(5)','120'],'0 ≤ n ≤ 15',`function factorialLoop(n) {
  // ваш код
}`,[{a:[0],e:1},{a:[5],e:120},{a:[10],e:3628800}]),

 P('t32','Заглавная буква каждого слова','Beginner','Строки','capitalizeWords','Сделайте первую букву каждого слова заглавной, остальные символы оставьте как есть.',['capitalizeWords("hello world")','"Hello World"'],'Строка из слов через один пробел',`function capitalizeWords(s) {
  // ваш код
}`,[{a:['hello world'],e:'Hello World'},{a:['skill up'],e:'Skill Up'},{a:['java'],e:'Java'}]),
 P('t33','Удалить пробелы','Beginner','Строки','removeSpaces','Удалите из строки все пробельные символы.',['removeSpaces("a b  c")','"abc"'],'Длина строки до 10 000',`function removeSpaces(s) {
  // ваш код
}`,[{a:['a b  c'],e:'abc'},{a:[' Skill Up '],e:'SkillUp'},{a:[''],e:''}]),
 P('t34','Количество слов','Beginner','Строки','countWords','Посчитайте слова в строке. Несколько пробелов подряд не создают пустые слова.',['countWords("one two three")','3'],'Длина строки до 10 000',`function countWords(s) {
  // ваш код
}`,[{a:['one two three'],e:3},{a:['  hello   world '],e:2},{a:[''],e:0}]),
 P('t35','Первый уникальный символ','Medium','Строки','firstUniqueChar','Верните первый символ, который встречается в строке ровно один раз, или пустую строку.',['firstUniqueChar("swiss")','"w"'],'Регистр учитывается',`function firstUniqueChar(s) {
  // ваш код
}`,[{a:['swiss'],e:'w'},{a:['aabb'],e:''},{a:['skill'],e:'s'}]),
 P('t36','Обрезать строку','Beginner','Строки','truncate','Если строка длиннее n, оставьте первые n символов и добавьте многоточие. Иначе верните строку целиком.',['truncate("JavaScript", 4)','"Java..."'],'n ≥ 0',`function truncate(s, n) {
  // ваш код
}`,[{a:['JavaScript',4],e:'Java...'},{a:['Skill',10],e:'Skill'},{a:['Hello',0],e:'...'}]),
 P('t37','Повторить строку','Beginner','Строки','repeatString','Верните строку, повторённую n раз, без использования String.prototype.repeat.',['repeatString("ha", 3)','"hahaha"'],'0 ≤ n ≤ 100',`function repeatString(s, n) {
  // ваш код
}`,[{a:['ha',3],e:'hahaha'},{a:['x',0],e:''},{a:['ab',2],e:'abab'}]),
 P('t38','Анаграмма','Easy','Строки','isAnagram','Проверьте, состоят ли две строки из одинаковых букв. Регистр и пробелы игнорируйте.',['isAnagram("listen", "silent")','true'],'Латинские буквы и пробелы',`function isAnagram(a, b) {
  // ваш код
}`,[{a:['listen','silent'],e:true},{a:['Dormitory','dirty room'],e:true},{a:['hello','world'],e:false}]),
 P('t39','Замена гласных','Easy','Строки','maskVowels','Замените все латинские гласные a, e, i, o, u на символ *. Регистр не важен.',['maskVowels("Hello")','"H*ll*"'],'Только латинские буквы',`function maskVowels(s) {
  // ваш код
}`,[{a:['Hello'],e:'H*ll*'},{a:['AEIOU'],e:'*****'},{a:['rhythm'],e:'rhythm'}]),
 P('t40','Самое длинное слово','Easy','Строки','longestWord','Верните самое длинное слово из строки. Если длина одинаковая, оставьте первое.',['longestWord("I love JavaScript")','"JavaScript"'],'Слова разделены пробелами',`function longestWord(s) {
  // ваш код
}`,[{a:['I love JavaScript'],e:'JavaScript'},{a:['one two'],e:'one'},{a:['skill up'],e:'skill'}]),

 P('t41','Минимум в массиве','Beginner','Массивы','minOfArray','Верните наименьшее число в непустом массиве без Math.min.',['minOfArray([3, 9, 2])','2'],'Массив непустой',`function minOfArray(arr) {
  // ваш код
}`,[{a:[[3,9,2]],e:2},{a:[[-5,-1,-7]],e:-7},{a:[[42]],e:42}]),
 P('t42','Сумма положительных','Beginner','Массивы','sumPositive','Сложите только положительные числа массива. Ноль не добавляйте отдельно — результат тот же.',['sumPositive([-2, 3, 5])','8'],'Длина массива до 10 000',`function sumPositive(arr) {
  // ваш код
}`,[{a:[[-2,3,5]],e:8},{a:[[-1,0,-3]],e:0},{a:[[4]],e:4}]),
 P('t43','Сдвиг влево','Easy','Массивы','rotateLeft','Сдвиньте элементы массива влево на k позиций. Верните новый массив.',['rotateLeft([1,2,3,4], 1)','[2,3,4,1]'],'Массив непустой, k ≥ 0',`function rotateLeft(arr, k) {
  // ваш код
}`,[{a:[[1,2,3,4],1],e:[2,3,4,1]},{a:[[1,2,3],4],e:[2,3,1]},{a:[[5],10],e:[5]}]),
 P('t44','Слияние отсортированных массивов','Medium','Массивы','mergeSorted','Объедините два отсортированных по возрастанию массива в один отсортированный массив.',['mergeSorted([1,3], [2,4])','[1,2,3,4]'],'Длины массивов до 10 000',`function mergeSorted(a, b) {
  // ваш код
}`,[{a:[[1,3],[2,4]],e:[1,2,3,4]},{a:[[],[1,2]],e:[1,2]},{a:[[0,5],[1,3]],e:[0,1,3,5]}]),
 P('t45','Уникальные элементы','Easy','Массивы','uniqueArray','Удалите повторы, сохранив первое появление каждого значения и исходный порядок.',['uniqueArray([1,2,1,3,2])','[1,2,3]'],'Длина массива до 10 000',`function uniqueArray(arr) {
  // ваш код
}`,[{a:[[1,2,1,3,2]],e:[1,2,3]},{a:[['a','a','b']],e:['a','b']},{a:[[],],e:[]}]),
 P('t46','Разбить на группы','Easy','Массивы','chunkArray','Разбейте массив на группы размера size. Последняя группа может быть короче.',['chunkArray([1,2,3,4,5], 2)','[[1,2],[3,4],[5]]'],'size > 0',`function chunkArray(arr, size) {
  // ваш код
}`,[{a:[[1,2,3,4,5],2],e:[[1,2],[3,4],[5]]},{a:[[1,2,3],5],e:[[1,2,3]]},{a:[[],2],e:[]}]),
 P('t47','Развернуть на один уровень','Medium','Массивы','flattenOnce','Разверните вложенные массивы только на один уровень.',['flattenOnce([[1,2],[3],4])','[1,2,3,4]'],'Вложенность максимум один уровень',`function flattenOnce(arr) {
  // ваш код
}`,[{a:[[[1,2],[3],4]],e:[1,2,3,4]},{a:[[[1],[2,3]]],e:[1,2,3]},{a:[[1,2]],e:[1,2]}]),
 P('t48','Сортировка по длине','Easy','Массивы','sortByLength','Верните новый массив слов, отсортированный по длине от коротких к длинным.',['sortByLength(["hello", "a", "cat"])','["a","cat","hello"]'],'Длина массива до 1000',`function sortByLength(words) {
  // ваш код
}`,[{a:[['hello','a','cat']],e:['a','cat','hello']},{a:[['bb','a','cc']],e:['a','bb','cc']},{a:[[]],e:[]}]),
 P('t49','Пересечение массивов','Medium','Массивы','intersection','Верните уникальные элементы, которые есть в обоих массивах, в порядке первого массива.',['intersection([1,2,3], [2,3,4])','[2,3]'],'Числа, массивы до 10 000',`function intersection(a, b) {
  // ваш код
}`,[{a:[[1,2,3],[2,3,4]],e:[2,3]},{a:[[1,1,2],[1]],e:[1]},{a:[[5,6],[1,2]],e:[]}]),

 P('t50','Сумма цифр рекурсией','Easy','Рекурсия','sumDigitsRecursive','Рекурсивно найдите сумму цифр целого числа.',['sumDigitsRecursive(508)','13'],'-1 000 000 000 ≤ n ≤ 1 000 000 000',`function sumDigitsRecursive(n) {
  // ваш код
}`,[{a:[508],e:13},{a:[0],e:0},{a:[-42],e:6}]),
 P('t51','Развернуть строку рекурсией','Easy','Рекурсия','reverseRecursive','Разверните строку, используя рекурсивный вызов функции.',['reverseRecursive("abc")','"cba"'],'Длина строки до 1000',`function reverseRecursive(s) {
  // ваш код
}`,[{a:['abc'],e:'cba'},{a:['Skill'],e:'llikS'},{a:[''],e:''}]),
 P('t52','Число Фибоначчи','Medium','Рекурсия','fibonacciRecursive','Верните n-е число Фибоначчи: F(0)=0, F(1)=1. Решите задачу рекурсивно.',['fibonacciRecursive(7)','13'],'0 ≤ n ≤ 20',`function fibonacciRecursive(n) {
  // ваш код
}`,[{a:[0],e:0},{a:[1],e:1},{a:[7],e:13},{a:[10],e:55}]),
 P('t53','Степень рекурсией','Easy','Рекурсия','powerRecursive','Вычислите base в степени exp рекурсивно.',['powerRecursive(2, 4)','16'],'exp ≥ 0',`function powerRecursive(base, exp) {
  // ваш код
}`,[{a:[2,4],e:16},{a:[5,0],e:1},{a:[3,3],e:27}]),
 P('t54','Обратный отсчёт','Beginner','Рекурсия','countDown','Верните массив чисел от n до 1, построив его рекурсивно.',['countDown(4)','[4,3,2,1]'],'0 ≤ n ≤ 100',`function countDown(n) {
  // ваш код
}`,[{a:[4],e:[4,3,2,1]},{a:[1],e:[1]},{a:[0],e:[]}]),
 P('t55','Полное выравнивание массива','Medium','Рекурсия','flattenRecursive','Рекурсивно разверните массив любой вложенности в один плоский массив.',['flattenRecursive([1,[2,[3]]])','[1,2,3]'],'В массиве только числа и массивы',`function flattenRecursive(arr) {
  // ваш код
}`,[{a:[[1,[2,[3]]]],e:[1,2,3]},{a:[[[1,2],[],3]],e:[1,2,3]},{a:[[]],e:[]}]),
 P('t56','Бинарный поиск рекурсией','Medium','Рекурсия','binarySearchRecursive','В отсортированном массиве рекурсивно найдите индекс target или верните -1.',['binarySearchRecursive([1,3,5,7], 5)','2'],'Массив отсортирован по возрастанию',`function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  // ваш код
}`,[{a:[[1,3,5,7],5],e:2},{a:[[1,3,5,7],2],e:-1},{a:[[4],4],e:0}]),
 P('t57','Лестница из 1 и 2 шагов','Medium','Рекурсия','climbStairs','Сколько способов подняться на n ступеней, если можно делать шаг на 1 или 2 ступени?',['climbStairs(4)','5'],'0 ≤ n ≤ 20',`function climbStairs(n) {
  // ваш код
}`,[{a:[0],e:1},{a:[2],e:2},{a:[4],e:5},{a:[5],e:8}]),
 P('t58','Палиндром рекурсией','Easy','Рекурсия','isPalindromeRecursive','Рекурсивно проверьте, читается ли строка одинаково слева направо и справа налево.',['isPalindromeRecursive("level")','true'],'Регистр учитывается',`function isPalindromeRecursive(s) {
  // ваш код
}`,[{a:['level'],e:true},{a:['hello'],e:false},{a:[''],e:true}]),
 P('t59','Произведение массива','Beginner','Рекурсия','productRecursive','Рекурсивно перемножьте все элементы массива. Произведение пустого массива равно 1.',['productRecursive([2,3,4])','24'],'Числа, длина до 100',`function productRecursive(arr) {
  // ваш код
}`,[{a:[[2,3,4]],e:24},{a:[[5]],e:5},{a:[[]],e:1}]),
 P('t60','Сумма вложенных чисел','Medium','Рекурсия','nestedSum','Найдите сумму чисел в массиве любой вложенности рекурсивно.',['nestedSum([1,[2,[3]]])','6'],'В массиве только числа и массивы',`function nestedSum(arr) {
  // ваш код
}`,[{a:[[1,[2,[3]]]],e:6},{a:[[[1,2],3]],e:6},{a:[[]],e:0}]),

 P('t61','Приветствие','Beginner','Функции','greet','Создайте функцию, которая возвращает строку приветствия с именем пользователя.',['greet("Korkem")','"Привет, Korkem!"'],'Имя непустое',`function greet(name) {
  // ваш код
}`,[{a:['Korkem'],e:'Привет, Korkem!'},{a:['Alex'],e:'Привет, Alex!'}]),
 P('t62','Сложение двух чисел','Beginner','Функции','addNumbers','Верните сумму двух чисел.',['addNumbers(7, 5)','12'],'Любые числа',`function addNumbers(a, b) {
  // ваш код
}`,[{a:[7,5],e:12},{a:[-2,8],e:6},{a:[0,0],e:0}]),
 P('t63','Ограничение диапазона','Beginner','Функции','clamp','Верните x, ограниченный диапазоном min...max: если x меньше min, верните min, если больше max — max.',['clamp(12, 0, 10)','10'],'min ≤ max',`function clamp(x, min, max) {
  // ваш код
}`,[{a:[12,0,10],e:10},{a:[-2,0,10],e:0},{a:[5,0,10],e:5}]),
 P('t64','Фаренгейт в Цельсии','Beginner','Функции','toCelsius','Переведите температуру из Фаренгейта в Цельсии по формуле (F - 32) × 5 / 9.',['toCelsius(212)','100'],'Числа',`function toCelsius(f) {
  // ваш код
}`,[{a:[212],e:100},{a:[32],e:0},{a:[68],e:20}]),
 P('t65','Полное имя','Beginner','Функции','formatName','Соберите полное имя в формате Last, First.',['formatName("Ada", "Lovelace")','"Lovelace, Ada"'],'Непустые строки',`function formatName(first, last) {
  // ваш код
}`,[{a:['Ada','Lovelace'],e:'Lovelace, Ada'},{a:['Korkem','Sarsen'],e:'Sarsen, Korkem'}]),
 P('t66','Итоговая цена','Easy','Функции','calculateTotal','Посчитайте итоговую цену: price × quantity × (1 - discount), где discount задан дробью от 0 до 1.',['calculateTotal(1000, 2, 0.1)','1800'],'price ≥ 0, quantity ≥ 0',`function calculateTotal(price, quantity, discount) {
  // ваш код
}`,[{a:[1000,2,0.1],e:1800},{a:[500,3,0],e:1500},{a:[200,1,0.25],e:150}]),
 P('t67','Простое число','Easy','Функции','isPrime','Проверьте, является ли n простым числом. Числа меньше 2 простыми не считаются.',['isPrime(17)','true'],'0 ≤ n ≤ 100 000',`function isPrime(n) {
  // ваш код
}`,[{a:[1],e:false},{a:[2],e:true},{a:[17],e:true},{a:[18],e:false}]),
 P('t68','Инициалы','Beginner','Функции','getInitials','Верните инициалы из имени через точку: Ada Lovelace → A.L.',['getInitials("Ada Lovelace")','"A.L"'],'Имя и фамилия разделены пробелом',`function getInitials(name) {
  // ваш код
}`,[{a:['Ada Lovelace'],e:'A.L'},{a:['korkem'],e:'K'},{a:['Alan Mathison Turing'],e:'A.M.T'}]),
 P('t69','Среднее трёх чисел','Beginner','Функции','averageThree','Верните среднее арифметическое трёх чисел.',['averageThree(2, 4, 6)','4'],'Любые числа',`function averageThree(a, b, c) {
  // ваш код
}`,[{a:[2,4,6],e:4},{a:[1,2,3],e:2},{a:[10,0,5],e:5}]),
 P('t70','Подпись профиля','Easy','Функции','profileLabel','Для объекта пользователя верните строку name + " · " + role.',['profileLabel({"name":"Aida","role":"student"})','"Aida · student"'],'Объект содержит name и role',`function profileLabel(user) {
  // ваш код
}`,[{a:[{name:'Aida',role:'student'}],e:'Aida · student'},{a:[{name:'Alex',role:'teacher'}],e:'Alex · teacher'}]),
 P('t71','Диапазон чисел','Easy','Функции','makeRange','Верните массив целых чисел от 0 до n - 1. Для n = 0 верните пустой массив.',['makeRange(4)','[0,1,2,3]'],'0 ≤ n ≤ 1000',`function makeRange(n) {
  // ваш код
}`,[{a:[4],e:[0,1,2,3]},{a:[1],e:[0]},{a:[0],e:[]}]),
 P('t72','Формат времени','Easy','Функции','formatTime','Преобразуйте секунды в формат mm:ss. Секунды всегда показывайте двумя цифрами.',['formatTime(125)','"2:05"'],'0 ≤ seconds < 3600',`function formatTime(seconds) {
  // ваш код
}`,[{a:[125],e:'2:05'},{a:[60],e:'1:00'},{a:[9],e:'0:09'}])
];
TASKS.push(...EXTRA_TASKS);

const TEST=[
{topic:'Переменные',q:'Чему равно x после выполнения кода?',code:'let x = 5;\nx = x + 2;',o:['5','7','52','"x2"'],a:1},
{topic:'Операторы',q:'Что выведет этот код?',code:'console.log(10 % 3);',o:['3','1','0','3.33'],a:1},
{topic:'Условия',q:'Что будет выведено?',code:'const age = 18;\nif (age >= 18) {\n  console.log("adult");\n} else {\n  console.log("minor");\n}',o:['adult','minor','Ничего','Ошибка'],a:0},
{topic:'Циклы',q:'Чему равна sum после цикла?',code:'let sum = 0;\nfor (let i = 0; i < 3; i++) {\n  sum += i;\n}',o:['3','6','2','0'],a:0},
{topic:'Отладка',q:'Найдите ошибку в коде.',code:'for (let i = 0; i < 5; i++ {\n  console.log(i);\n}',o:['Пропущена закрывающая скобка после i++','Неверное имя переменной','Нельзя использовать let','Ошибок нет'],a:0},
{topic:'Функции',q:'Что вернёт вызов f(3, 4)?',code:'function f(a, b) {\n  return a * b;\n}',o:['7','12','34','undefined'],a:1},
{topic:'Массивы',q:'Чему равно значение выражения?',code:'[10, 20, 30][1]',o:['10','20','30','undefined'],a:1},
{topic:'Массивы',q:'Какая длина у массива после выполнения кода?',code:'const arr = [1, 2, 3];\narr.push(4);',o:['3','4','5','Ошибка'],a:1},
{topic:'Логика',q:'Сколько раз выполнится тело цикла?',code:'let n = 1;\nwhile (n < 100) {\n  n *= 2;\n}',o:['6','7','8','50'],a:1},
{topic:'Синтаксис',q:'Какой оператор сравнивает значение и тип без приведения?',o:['=','==','===','!='],a:2},
{topic:'Алгоритмы',q:'Какова сложность поиска элемента перебором в массиве из n элементов?',o:['O(1)','O(log n)','O(n)','O(n²)'],a:2},
{topic:'Рекурсия',q:'Чему равно f(4)?',code:'function f(n) {\n  return n <= 1 ? 1 : n * f(n - 1);\n}',o:['10','16','24','4'],a:2}
];

/* Practice catalog: add a language by adding its metadata and task entries here. */
TASKS.forEach(t=>{t.lang=t.lang||'js';});
const PRACTICE_LANGS=[
 {id:'js',name:'JavaScript',description:'Задания, которые можно сразу запускать в браузере',run:true},
 {id:'py',name:'Python',description:'Синтаксис, функции и работа с данными',run:false},
 {id:'java',name:'Java',description:'Типы, основы OOP и backend-логика',run:false}
];
const EXTRA_PRACTICE_TASKS=[
 {id:'py-p1',lang:'py',t:'Максимум в списке',diff:'Beginner',topic:'Списки',fn:'maxNumber',desc:'Напишите функцию Python, которая возвращает самое большое число в списке.',ex:['max_number([3, 8, 2])','8'],lim:'Список не пустой',starter:'def max_number(numbers):\n    # напишите код здесь\n    pass'},
 {id:'py-p2',lang:'py',t:'Подсчёт слов',diff:'Easy',topic:'Строки',fn:'countWords',desc:'Напишите функцию Python, которая считает количество слов в предложении.',ex:['count_words("Skill Up")','2'],lim:'Слова разделены пробелами',starter:'def count_words(text):\n    # напишите код здесь\n    pass'},
 {id:'java-p1',lang:'java',t:'Сумма чётных чисел',diff:'Beginner',topic:'Циклы',fn:'sumEven',desc:'Напишите на Java функцию, которая считает сумму чётных чисел от 1 до n.',ex:['sumEven(6)','12'],lim:'n — положительное целое число',starter:'static int sumEven(int n) {\n    // напишите код здесь\n    return 0;\n}'},
 {id:'java-p2',lang:'java',t:'Класс и объект',diff:'Easy',topic:'OOP',fn:'Student',desc:'Создайте класс Student с полями name и level и добавьте конструктор.',ex:['new Student("Aida", 2)','Aida · 2'],lim:'Используйте конструктор',starter:'class Student {\n    String name;\n    int level;\n\n    // напишите конструктор\n}'}
];
TASKS.push(...EXTRA_PRACTICE_TASKS);

const PATHS={js:['web','js'],py:['py','sql'],java:['java','sql'],web:['web','js'],data:['py','sql']};
const LANGS=[['js','JavaScript'],['py','Python'],['java','Java'],['web','Веб: HTML и CSS'],['data','Данные: Python и SQL']];
const CAREERS=[['fe','Frontend-разработчик',['web','js']],['py','Python-разработчик',['py','sql']],['jv','Java-разработчик',['java','sql']],['da','Аналитик данных',['py','sql']]];
const LEVELS=['Beginner','Elementary','Intermediate','Advanced'];
const GOALS=['Найти работу','Освоить программирование','Делать проекты','Подготовиться к университету','Прокачать текущие навыки'];
const INTERESTS=['Python','Java','Веб','Кибербезопасность','Данные','Мобильная разработка'];
const CATS=['Web','Mobile','Java','Python','JavaScript','AI','Cybersecurity','UI/UX'];
const ACHS=[
 {id:'first_code',t:'Первый код',d:'Запустите код в редакторе'},
 {id:'first_lesson',t:'Первый урок',d:'Завершите урок'},
 {id:'tasks5',t:'5 задач решено',d:'Решите пять практических задач'},
 {id:'streak7',t:'Серия 7 дней',d:'Занимайтесь 7 дней подряд'},
 {id:'first_project',t:'Первый проект',d:'Опубликуйте проект'},
 {id:'course_done',t:'Курс пройден',d:'Получите первый сертификат'}
];

/* Sample certificates shown on the Certificates page to demonstrate the
   design before a user has earned one of their own. Clearly marked as
   examples in the UI — not real, issued credentials. course links to a
   matching id in COURSES when one exists, so "Пройти курс" goes somewhere. */
const SAMPLE_CERTS=[
 {id:'html-css',title:'HTML & CSS Fundamentals',desc:'Семантическая вёрстка, CSS-селекторы, Flexbox и адаптивные макеты.',hours:20,course:'web'},
 {id:'js-fund',title:'JavaScript Fundamentals',desc:'Переменные, функции, циклы, массивы и работа с DOM в браузере.',hours:24,course:'js'},
 {id:'frontend',title:'Frontend Development',desc:'Сборка полноценных пользовательских интерфейсов на HTML, CSS и JavaScript.',hours:40,course:null},
 {id:'git-github',title:'Git & GitHub',desc:'Версионирование кода, ветки, коммиты, пул-реквесты и совместная работа.',hours:8,course:null},
 {id:'webdev-basics',title:'Web Development Basics',desc:'Как устроен веб: клиент и сервер, протоколы, домены и деплой.',hours:15,course:null},
 {id:'java-basics',title:'Java Programming Basics',desc:'Синтаксис Java, переменные, условия, циклы и основы ООП.',hours:30,course:'java'}
];

/* ================= CAREER: IT DIRECTION TEST & ROADMAPS ================= */
const DIR_AXES=['coding','design','math','networks','security','data'];
const DIR_Q=[
 {axis:'coding',q:'Насколько вам нравится писать код и решать задачи программированием?'},
 {axis:'design',q:'Насколько вам интересен дизайн интерфейсов и визуальная эстетика?'},
 {axis:'math',q:'Как вы оцениваете свои способности в математике и логике?'},
 {axis:'networks',q:'Насколько вам интересно, как устроены сети и передача данных между компьютерами?'},
 {axis:'security',q:'Насколько вам интересна кибербезопасность и защита систем?'},
 {axis:'data',q:'Насколько вам интересны данные, анализ и поиск закономерностей?'}
];
/* roadmap step: k=ключ, t=название, type: module|course|project|portfolio|custom|milestone
   module/course ссылаются на существующие курсы и считаются пройденными автоматически;
   project/portfolio считаются по опубликованным проектам; custom/milestone отмечаются вручную. */
const DIRECTIONS=[
 {id:'frontend',name:'Frontend',w:{coding:.9,design:.85,math:.25,networks:.1,security:.15,data:.2},roadmap:[
  {k:'html',t:'HTML',type:'module',course:'web',mod:'HTML'},
  {k:'css',t:'CSS',type:'module',course:'web',mod:'CSS'},
  {k:'js',t:'JavaScript',type:'course',course:'js'},
  {k:'git',t:'Git',type:'custom'},
  {k:'react',t:'React',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'backend',name:'Backend',w:{coding:.9,design:.2,math:.6,networks:.5,security:.35,data:.5},roadmap:[
  {k:'py',t:'Python',type:'course',course:'py'},
  {k:'sql',t:'SQL и базы данных',type:'course',course:'sql'},
  {k:'git',t:'Git',type:'custom'},
  {k:'api',t:'REST API и фреймворк',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'mobile',name:'Mobile',w:{coding:.85,design:.6,math:.3,networks:.25,security:.2,data:.2},roadmap:[
  {k:'java',t:'Java',type:'course',course:'java'},
  {k:'kotlin',t:'Kotlin / Android SDK',type:'custom'},
  {k:'ui',t:'Мобильный UI/UX',type:'custom'},
  {k:'git',t:'Git',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'security',name:'Cybersecurity',w:{coding:.55,design:.1,math:.5,networks:.85,security:.95,data:.3},roadmap:[
  {k:'networks',t:'Сети',type:'custom'},
  {k:'linux',t:'Linux',type:'custom'},
  {k:'py',t:'Python (скрипты)',type:'course',course:'py'},
  {k:'sec',t:'Инструменты и OWASP',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'data',name:'Data Science',w:{coding:.6,design:.2,math:.85,networks:.15,security:.2,data:.95},roadmap:[
  {k:'py',t:'Python',type:'course',course:'py'},
  {k:'sql',t:'SQL',type:'course',course:'sql'},
  {k:'stats',t:'Статистика и математика',type:'custom'},
  {k:'ml',t:'Pandas / ML-библиотеки',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'qa',name:'QA',w:{coding:.5,design:.25,math:.3,networks:.3,security:.35,data:.3},roadmap:[
  {k:'web',t:'HTML и CSS',type:'course',course:'web'},
  {k:'js',t:'JavaScript',type:'course',course:'js'},
  {k:'manual',t:'Ручное тестирование',type:'custom'},
  {k:'auto',t:'Автотесты (Selenium/Playwright)',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]},
 {id:'devops',name:'DevOps',w:{coding:.65,design:.1,math:.35,networks:.85,security:.55,data:.3},roadmap:[
  {k:'linux',t:'Linux',type:'custom'},
  {k:'git',t:'Git',type:'custom'},
  {k:'py',t:'Python (скрипты)',type:'course',course:'py'},
  {k:'docker',t:'Docker и CI/CD',type:'custom'},
  {k:'cloud',t:'Облачные платформы',type:'custom'},
  {k:'projects',t:'Проекты',type:'project'},
  {k:'portfolio',t:'Портфолио',type:'portfolio'},
  {k:'interview',t:'Собеседование',type:'custom'},
  {k:'junior',t:'Junior',type:'milestone'}]}
];
