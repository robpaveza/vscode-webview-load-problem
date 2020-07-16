// This file runs in the main WebView frame

let current = 0;
const colors = ['black', 'red', 'green', 'yellow', 'orange', 'cyan', 'blue', 'white'];
setInterval(() => {
    const h1 = document.querySelector('h1');
    h1!.style.color = colors[current % colors.length];
    current++;
}, 1000);
