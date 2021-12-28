
const gridContainer_div = document.getElementById("grid-container");


function makeRows(rows, cols) {
    gridContainer_div.style.setProperty('--grid-rows', rows);
    gridContainer_div.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        gridContainer_div.appendChild(cell).className = "grid-item";
        cell.setAttribute('draggable', 'false');
        cell.style.backgroundColor = 'transperent';
        // cell.style.borderRadius = '';
        cell.addEventListener("mousemove", () => cell.style.backgroundColor = 'black');
    };
};

makeRows(24, 24);
