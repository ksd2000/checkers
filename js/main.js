"use strict"

function matrixArray(rows,columns){       //создаем массив данных по шашкам
    let arr = new Array();
    for(let i=0; i<rows; i++){
        arr[i] = new Array();
        for(let j=0; j<columns; j++){
            arr[i][j] = 0;              //заполненяем начальные значения матрицы= 0
        }
    }                                   // 1 - белые, 2 - черные шашки
    return arr;                         // 3 - белые, 4 - черные дамки
}
let checkMatrix = matrixArray(8,8);



function onLoad() {             //формируем доску -начальная установка и шашки
    const body = document.querySelector('.grid');                   //задать родительский элемент по его классу
    for (let i = 0; i < 8; i++) {                                   //строки
        for (let j = 0; j < 8; j++) {                               //столбцы
            const divElem = document.createElement('div');          //создать элемент (клетка)
            divElem.className = 'elem';                             //присвоить элементу класс
            divElem.id = 'id'+i+j;                                  //присвоить каждой клетке id (значения ключей матрицы)
            // divElem.innerHTML = (8 * i) + j + 1;                  зададим порядковый номер клетки
            body.append(divElem);                                   //всавить новый элемент в конец родит. элемента
                                        //закрасим темные клетки, расставим шашки и внесем их координаты в матрицу
            if (i % 2 == 0) {           //нечетные строки (i=0,2...)
                if (j % 2 != 0) {
                    divElem.classList.add('elem_black');            //зададим цвет темных клеток
                                        //вставака шашек (невидимых) на все темные клетки 
                    let idElem = 'id'+i+j;                          //зададим значение id клетки
                    let str = '<div class="check"></div>';          //зададим описание div шашки
                    divElem.innerHTML = str;                        //вставим шашку (div) в темную клетку
                                        //расставляем шашки перед игрой
                    if(i == 0) {                                     //для первой строки - белые
                        document.getElementById(idElem).querySelector('.check').classList.add('check_white');
                        checkMatrix[i][j] = 1;                      //делаем запись в матрицу
                    }
                    if(i == 6) {                                     //для седьмой строки - черные
                        document.getElementById(idElem).querySelector('.check').classList.add('check_black');
                        checkMatrix[i][j] = 2;                      //делаем запись в матрицу
                    }

                }
            }else {
                if (j % 2 == 0) {        //четные строки (i=1,3...)
                    divElem.classList.add('elem_black');
                    let idElem = 'id'+i+j;
                    let str = '<div class="check"></div>';
                    divElem.innerHTML = str;
                    if(i == 1) {                                      //для второй строки - белые
                        document.getElementById(idElem).querySelector('.check').classList.add('check_white');
                    }
                    if(i == 7) {                                     //для восьмой строки - черные
                        document.getElementById(idElem).querySelector('.check').classList.add('check_black');
                        checkMatrix[i][j] = 2;                      //делаем запись в матрицу
                    }
                }
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", onLoad);

console.log(checkMatrix);

