"use strict";
// This file runs in the interior iframe
let current = 0;
const originalColors = ['black', 'red', 'green', 'yellow', 'orange', 'cyan', 'blue', 'white'];
const colors = [];
for (let index = originalColors.length - 1; index >= 0; index--) {
    colors.push(originalColors[index]);
}

setInterval(() => {
    const h1 = document.querySelector('h1');
    h1.style.color = colors[current % colors.length];
    current++;
}, 250);
