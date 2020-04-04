"use strict"

function onLoad() {
    const body = document.querySelector('.grid');
    for (let i = 0; i < 8; i++) {                   //строки
        for (let j = 0; j < 8; j++) {               //столбцы
            const divElem = document.createElement('div');
            divElem.classList.add('elem');
            divElem.innerHTML = (8 * i) + j + 1;
            body.appendChild(divElem);
            if (i % 2 == 0) {
                if (j % 2 != 0) {
                    divElem.classList.add('elem_black');
                }
            }else {
                if (j % 2 == 0) {
                    divElem.classList.add('elem_black');
                }
            }
        }
    }
}
document.addEventListener("DOMContentLoaded", onLoad);


