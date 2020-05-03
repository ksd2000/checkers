"use strict"

function matrixArray(rows,columns){    //функция формирования массива игровой доски
    let arr = new Array();
    for(let i=0; i<rows; i++){
        arr[i] = new Array();
        for(let j=0; j<columns; j++){
            arr[i][j] = 0;                                          //начальные значения матрицы= 0
        }
    }                                   
    return arr;                         
}

function onLoad() {                     //функция начальной расстановки шашек
    let idElem = 0;                                                 //значение id клетки
    const body = document.querySelector('.grid');                   //задать родительский элемент по его классу
    for (let i = 0; i < 8; i++) {                                   //строки
        for (let j = 0; j < 8; j++) {                               //столбцы
            const divElem = document.createElement('div');          //задать элемент (клетка)
            divElem.className = 'elem';                             //присвоить элементу класс
            divElem.id = 'id'+i+j;                                  //присвоить каждой клетке id (значения ключей матрицы) (divElem.innerHTML = (8 * i) + j + 1;  -зададим порядковый номер клетки0
            body.append(divElem);                                   //всавить новый элемент в конец родит. элемента
            if (i % 2 == 0) {                                       //нечетные строки (i=0,2...)
                if (j % 2 != 0) {
                    divElem.classList.add('elem_black');            //зададим цвет темных клеток
                    idElem = 'id'+i+j;                              //зададим значение id клетки
                    let str = '<div class="check"></div>';          //зададим описание div шашки
                    divElem.innerHTML = str;                        //вставим div шашек (макет) во все темные клетки

                                                //расставим шашки перед игрой
                    if(i == 0 || i == 2) {                          //для 1-й и 3-й строк - белые
                        document.getElementById(idElem).querySelector('.check').classList.add('check_white');
                        checkMatrix[i][j] = 1;                      //делаем запись в матрицу
                    }
                    if(i == 6) {                                     //для седьмой строки - черные
                        document.getElementById(idElem).querySelector('.check').classList.add('check_black');
                        checkMatrix[i][j] = 2;                      //делаем запись в матрицу
                    }
                }
            } else {
                if (j % 2 == 0) {        //четные строки (i=1,3...)
                    divElem.classList.add('elem_black');
                    idElem = 'id'+i+j;
                    let str = '<div class="check"></div>';
                    divElem.innerHTML = str;
                    if(i == 1) {                                      //для 2-й строки - белые
                        document.getElementById(idElem).querySelector('.check').classList.add('check_white');
                        checkMatrix[i][j] = 1; 
                    }
                    if(i == 5 || i == 7) {                            //для 6-й и 8-й строк - черные
                        document.getElementById(idElem).querySelector('.check').classList.add('check_black');
                        checkMatrix[i][j] = 2;
                    }
                }
            }
        }
    }
};

function verifyStepCheckStrike(x, y) {    //функция определения возможных клеток перемещения для простой шашки при бое противника
    let ii = x;
    let jj = y;
    vectorI = 1;                                     //напрвление смещения по вертикали (1 - вниз -по возрастанию индекса, -1 - вверх -по убыванию)
    workMatrixStep = matrixArray(8,8);                  //обнулим матрицу разрешенных ходов
    enemy = 0;
    if (player == 1){                                   //задаем код противника
        playerEnemy = 2;
    } else {
        playerEnemy = 1;
    };
    for (let a = 0; a < 2; a++) {                       //ищем противника вокруг "рабочей" шашки
        vectorJ = 1;
        vectorI = -1*vectorI;
        if (x<2 & vectorI==-1 || x>5 & vectorI==1) continue;
        for (let b = 0; b < 2; b++) {
            vectorJ = -1*vectorJ;
            if (y<2 & vectorJ==-1 || y>5 & vectorJ==1) continue;
            ii = x + vectorI;
            jj = y + vectorJ;
            if (checkMatrix[ii][jj] == playerEnemy || checkMatrix[ii][jj] == playerEnemy+2) { //если есть противник и он раньше небыл бит
                ii = x + 2*vectorI;
                jj = y + 2*vectorJ;
                if (checkMatrix[ii][jj] == 0) {                                                 //проверим, что его можно бить
                    workMatrixStep[ii][jj] = 1;                 //записываем "разрешенные" клетки для хода
                    enemy = 1;                                  //фиксируем, что шашка предназаначена для боя
                }
            }
        }
    }
};

function verifyStepCheckSimple(x, y) {          //функция определения возможных клеток перемещения для простой шашки при ходе на 1 ход
    let ii = x;
    let jj = y;
    workMatrixStep = matrixArray(8,8);                  //обнулим матрицу разрешенных ходов
    enemy = 0;
        vectorJ = 1;
        if (player == 1) {                              //определяем строку перемещения (для каждого игрока)
            if (x<7) {
                ii = x+1;
            }
        } else {
            if (x>0) {
                ii = x-1;
            }
        }
        for (let b = 0; b < 2; b++) {
            vectorJ = -1*vectorJ;
            jj = y + vectorJ;
            if (jj<0 || ii>7 || checkMatrix[ii][jj] !=0) continue;
            workMatrixStep[ii][jj] = 2;
            enemy = 2;                                      //фиксируем, что эта шашка должна ходить только на 1 клетку
        }
};

function verifyStepQueen(x, y) {    //функция определения возможных клеток перемещения для дамки при бое противника
    vectorI = 1;                                     //напрвление смещения по вертикали (1 - вниз -по возрастанию индекса, -1 - вверх -по убыванию)
    vectorJ = 1;
    let ii = x;
    let jj = y;
    workMatrixStep = matrixArray(8,8);                  //обнулим матрицу разрешенных ходов
    enemy = 0;
    if (player == 1){                                   //задаем код противника
        playerEnemy = 2;
    } else {
        playerEnemy = 1;
    };
    for (let a = 0; a < 2; a++) {                   //цикл задает направление поиска (+ или -) по вертикали
        vectorI = -1*vectorI;
        if (ii==0 & vectorI==-1 || ii==7 & vectorI==1) continue;
        vectorJ = 1;
        for (let b = 0; b < 2; b++) {               //цикл задает направление поиска  (+ или -) по горизонтали
            vectorJ = -1*vectorJ;                       // и делаем проверку всех клеток в диагонали
            if (jj==0 & vectorJ==-1 || jj==7 & vectorJ==1) continue;
            ii = x + vectorI;
            jj = y + vectorJ;
            while (jj>=0 & jj<=7 & ii>=0 & ii<=7) {      //до тех пор, пока не появится шашка или граница доски
                if (checkMatrix[ii][jj] == 0) {
                    if (enemy != 1) {
                        enemy = 2;
                    };
                    workMatrixStep[ii][jj] = 2;
                    ii += vectorI;
                    jj += vectorJ;
                } else {
                    if (checkMatrix[ii][jj] == playerEnemy || checkMatrix[ii][jj] == playerEnemy+2) {
                        ii += vectorI;
                        jj += vectorJ;
                        while (jj>=0 & jj<=7 & ii>=0 & ii<=7) {
                            if (checkMatrix[ii][jj] == 0) {
                                enemy = 1;
                                workMatrixStep[ii][jj] = 1;
                                ii += vectorI;
                                jj += vectorJ;
                            } else break;
                        }
                    };
                    break;
                }
            }
        }
    }
};

function verifyCheckGo() {    //функция для определения шашек, которые должны ходить в первую очередь (обязаны бить)
    vectorI = 1;                                     //напрвление смещения по вертикали (1 - вниз -по возрастанию индекса, -1 - вверх -по убыванию)
    vectorJ = 1;
    let ii = 0;
    let jj = 0;
    workMatrixStep = matrixArray(8,8);                  //обнулим матрицу разрешенных ходов
    enemy = 0;
    if (player == 1){                                   //задаем код противника
        playerEnemy = 2;
    } else {
        playerEnemy = 1;
    };
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            if (checkMatrix[i][j] == player || checkMatrix[i][j] == player+2) {           //ищем противника вокруг всех шашек игрока
                for (let a = 0; a < 2; a++) {
                    vectorJ = 1;
                    vectorI = -1*vectorI;
                    if (i<2 & vectorI==-1 || i>5 & vectorI==1) continue;
                    for (let b = 0; b < 2; b++) {
                        vectorJ = -1*vectorJ;
                        if (j<2 & vectorJ==-1 || j>5 & vectorJ==1) continue;
                        ii = i + vectorI;
                        jj = j + vectorJ;
                        while (jj>=0 & jj<=7 & ii>=0 & ii<=7) {      //до тех пор, пока не появится шашка или граница доски
                            if (checkMatrix[ii][jj] == 0) {
                                if (checkMatrix[i][j] == player+2) {
                                    ii += vectorI;
                                    jj += vectorJ;
                                } else break;
                            } else {
                                if (checkMatrix[ii][jj] == playerEnemy || checkMatrix[ii][jj] == playerEnemy+2) {
                                    ii += vectorI;
                                    jj += vectorJ;
                                    if (checkMatrix[ii][jj] == 0) {
                                        enemy = 1;
                                        workMatrixStep[i][j] = checkMatrix[i][j];
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
    }   
};

function information(z) {
    document.getElementById('inf').innerHTML = z;
}

                //Игра
let checkMatrix = matrixArray(8,8);                             //массив игровой доски для фиксации расположения шашек
                                                                    // 1 - белые шашки, 2 - черные шашки
                                                                    // 3 - белые дамки, 4 - черные дамки (queen)
let workMatrix = matrixArray(8,8);                                   //рабочий массив фиксации промежуточных данных (возможных многоходовок) до подтверждения окончания хода
let workMatrixStep = checkMatrix;                               //массив допустимых ходов "рабочей" шашки
                                                                    // 0 - клетка закрыта для перемещения
                                                                    // 1 - клетка доступна для боя противника
                                                                    // 2 - клетка доступна для простого хода
let i = 0;                                                          //начальные координаты шашки (клетки)
let j = 0;
let vectorI = 1;                                                    //напрвление смещения по вертикали (1 - вниз -по возрастанию индекса, -1 - вверх -по убыванию)
let vectorJ = 1;
let startId = 0;                                                    //этапы хода: 0 - начало хода - выбор ходящей шашки
                                                                                //1 - выбор клетки для перемещения шашки 
let nextId = 0;                                                     //id последующего (предполагаемого) положения шашки
let player = 1;                                                     // 1 - ходят белые (1-й игрок), 2 - ходят черные (2-й игрок)
let enemy = 0;                                                  //перемещение =0 -хода нет
                                                                    //=1 рядом есть шашки противника, которые можно(нужно) забрать
                                                                    //=2 шашка может сделать только 1 ход (на соседнюю клетку)
let idElem;                                                     // id клик клетки ходящей шашки
let checkBlack = 0;                                                   // количество черных битых шашек
let checkWhite = 0;                                                   // количество белых битых шашек
let playerEnemy = 2;                                            //код противника
let text = {
    start: "выберите шашку",
    error0: "выберите другую шашку",
    step1: "сделайте ход",
    error1: "это чужая шашка",
    start1: "можно изменить выбор шашки",
    stepN: "сделайте следующий шаг",
    white: "ход белых",
    black: "ход черных",
    error2: "ход невозможен - выберите другую клетку",
    stop: "игра окончена"
};
document.addEventListener("DOMContentLoaded", onLoad);  //формируем доску + начальная расстановка шашек
information(text.start);
document.querySelector('.grid').onclick = function(event) {//ф-ция обработки клика - определяем id клетки по клику на шашку или темную клетку
    let ii = 0;                                                  //координаты клетки (по клику)
    let jj = 0;
    let idElemNext = 0;                                          // id следующего клика клетки
    let targ = event.target;                                     // где был клик? (event)
    let logCheck = targ.classList.contains('check');             //определим true или false для клика по шашке
    let logElem = targ.classList.contains('elem_black');         //определим true или false для клика по темной клетке
    information('');
    if (logCheck) {                                              //если клик по шашке
        idElemNext = targ.parentNode.getAttribute('id');                //получим id клетки (родит элем шашки)
    } else {
        idElemNext = event.target.id;                                   //получим id клетки, по которой кликнули
    }
    ii = parseInt(idElemNext.charAt(2), 10);                      //координаты клетки (для матрицы)
    jj = parseInt(idElemNext.charAt(3), 10);
    if (logElem || logCheck) {         //проверяем правильность выбора клетки: клетка (по клику) темная

                            //1. выбор шашки, которой будет ходить игрок - 1-й этап хода
        if (startId == 0) {
            if (checkMatrix[ii][jj] == player || checkMatrix[ii][jj] == player+2) {        //проверка, что это шашка и она принадлежит игроку
                verifyCheckGo();                                //проверим - есть ли шашки, которые обязаны бить противника
                if (enemy == 1) {                   //вариант1 - если выбранная шашка входит в список "обязательных"
                    if(checkMatrix[ii][jj] == workMatrixStep[ii][jj]) {
                        if (checkMatrix[ii][jj] == player) {
                            verifyStepCheckStrike(ii, jj);                      //определим, куда можно ходить обычной шашке
                        } else verifyStepQueen(ii, jj);                        //или дамке
                    } else {
                        information(text.error0);
                        return;
                    };
                } else {                            //вариант2 - бить ничего не нужно
                    if (checkMatrix[ii][jj] == player) {
                        verifyStepCheckSimple(ii, jj);                      //определим, куда можно ходить обычной шашке
                    } else verifyStepQueen(ii, jj);
                }
                if (enemy != 0) {                                           //если шашка (дамка) разрешено ходить
                    startId = startId + 1;                                      //то следующим этапом хода будет выбор клетки для перемещения (хода) шашки
                    i = ii;                                                 //запомним координаты начального положения шашки
                    j = jj;
                    idElem = idElemNext;
                    document.getElementById(idElemNext).classList.add('elem_black_blue');
                    information(text.step1);
                } else {
                    information(text.error0);
                }
            } else {
                information(text.error1);
            } 
        } else {                    //2. непосредственно ход шашки  - 2-й этап хода
            if (startId == 1 & (checkMatrix[ii][jj] == player || checkMatrix[ii][jj] == player+2) & (i!=ii || j!=jj)) {  //если нажать др шашку (до начала хода), то можно изменить выбор шашки
                startId = 0;
                information(text.start1);
                document.getElementById(idElem).classList.remove('elem_black_blue');
                return;
            }
            if (enemy == 1) {                   //вариант1 - для боя шашек противника
                if (workMatrixStep[ii][jj] == 1) {                  //проверка: это разрешенная клетка для хода
                    document.getElementById(idElem).querySelector('.check').classList.remove('check_white', 'check_black', 'check_white_queen', 'check_black_queen');    //отбражаем изменение положения шашки игрока
                    if (player == 1) {  
                        if (checkMatrix[i][j] == player) {
                            if (ii==7) {
                                checkMatrix[i][j] = player + 2;            //шашка становится дамкой
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_white_queen');
                            } else document.getElementById(idElemNext).querySelector('.check').classList.add('check_white');
                        } else {
                            document.getElementById(idElemNext).querySelector('.check').classList.add('check_white_queen');
                        }
                        checkBlack += 1;
                        document.getElementById('countW').innerHTML = checkBlack;
                    } else {
                        if (checkMatrix[i][j] == player) {
                            if (ii==0) {
                                checkMatrix[i][j] = player + 2;
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_black_queen');
                            } else document.getElementById(idElemNext).querySelector('.check').classList.add('check_black');
                        } else {
                            document.getElementById(idElemNext).querySelector('.check').classList.add('check_black_queen');
                        }
                        checkWhite += 1;
                        document.getElementById('countB').innerHTML = checkWhite;
                    }
                    checkMatrix[ii][jj] = checkMatrix[i][j];               //в матрице прописываем новое положение ходящей шашки
                    checkMatrix[i][j] = 0;                                  //удаляем ходящую шашку в начальной координте
                    workMatrix[i][j] = 2;                                   //отмечаем в рабочей матрице все ходы бьющей шашки
                    if (ii-i>0) {                                           //определим координаты битой шашки противника (с учетом вектора направления движения)
                        vectorI = 1;
                    } else vectorI = -1;
                    if (jj-j>0) {
                        vectorJ = 1;
                    } else vectorJ = -1;
                    while (checkMatrix[i][j] == 0) {
                        i += vectorI;
                        j += vectorJ;
                    }
                    workMatrix[i][j] = 1;                                   //отмечаем в рабочей матрице все битые шашки (чтобы потом их все скрыть одновременно)
                    checkMatrix[i][j] = 0;                                  //удаляем битую шашку противника в основной матрице
                    if (checkMatrix[ii][jj] == player) {                    //определим возможные следующие шаги для шашки
                        verifyStepCheckStrike(ii, jj);                      
                    } else verifyStepQueen(ii, jj);
                    if (enemy == 1) {
                        i = ii;
                        j = jj;
                        idElem = idElemNext;
                        document.getElementById(idElemNext).classList.add('elem_black_blue');
                        information(text.stepN);
                    } else {                                                //в противном случае удаляем битые шашки с доски                                        
                        for(let i=0; i<8; i++){
                            for(let j=0; j<8; j++){
                                if (workMatrix[i][j] != 0) {
                                    idElem= 'id'+i+j;
                                    document.getElementById(idElem).querySelector('.check').classList.remove('check_white', 'check_black', 'check_white_queen', 'check_black_queen');
                                    document.getElementById(idElem).classList.remove('elem_black_blue');
                                    workMatrix[i][j] = 0;
                                }
                            }
                        }
                        if (player == 1) {
                            player = 2;
                            information(text.black);
                        } else {
                            player = 1;
                            information(text.white);
                        }
                        startId = 0;
                        enemy = 0;
                    }
                }else {
                    information(text.error2);
                }
            } else {                            //вариант2 - если шашка должна сделать простой ход (без боя)
                if (workMatrixStep[ii][jj] == 2) {                  //при условии, что клетка разрешена для хода
                    if ((ii==0 || ii==7) & checkMatrix[i][j] == player) {
                        checkMatrix[ii][jj] = checkMatrix[i][j] + 2;  //шашка становится дамкой
                        document.getElementById(idElem).querySelector('.check').classList.remove('check_white', 'check_black');
                        if (player == 1) {
                        document.getElementById(idElemNext).querySelector('.check').classList.add('check_white_queen');
                        player = 2;
                        information(text.black);
                        } else {
                            document.getElementById(idElemNext).querySelector('.check').classList.add('check_black_queen');
                            player = 1;
                            information(text.white);
                        }
                    } else {
                        checkMatrix[ii][jj] = checkMatrix[i][j];
                        document.getElementById(idElem).querySelector('.check').classList.remove('check_white', 'check_black', 'check_white_queen', 'check_black_queen');
                        if (player == 1) {
                            if (checkMatrix[i][j] == player) {
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_white');
                            } else {
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_white_queen');
                            }
                            player = 2;
                            information(text.black);
                        } else {
                            if (checkMatrix[i][j] == player) {
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_black');
                            } else {
                                document.getElementById(idElemNext).querySelector('.check').classList.add('check_black_queen');
                            }
                            player = 1;
                            information(text.white);
                        }
                    }
                    checkMatrix[i][j] = 0;
                    startId = 0;
                    enemy = 0;
                    document.getElementById(idElem).classList.remove('elem_black_blue');
                } else {
                    information(text.error2);
                }
            }
        }
        if (checkWhite == 12 || checkBlack == 12) {
            information(text.stop);
            return;
        }
    } else {
        information(text.error0);
    } 
};



