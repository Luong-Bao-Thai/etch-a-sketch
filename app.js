const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 24;

let brushColor = DEFAULT_COLOR; //Default black color
let currentSize = DEFAULT_SIZE;

const gridContainer_div = document.getElementById("grid-container");

const rangeSlider_input = document.getElementById('range-slider');
const gridSize_div = document.querySelector('.grid-size');

rangeSlider_input.onmousemove = (e) => updateSizeValue(e.target.value);
rangeSlider_input.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
};
function setCurrentSize(newSize) {
  currentSize = newSize;
};
function updateSizeValue(value) {
  gridSize_div.innerHTML = `Grid size: ${value} x ${value}`;
};
function reloadGrid() {
  resetGrid()
  createGrid(currentSize, currentSize)
};
function resetGrid() {
  gridContainer_div.innerHTML = ''
};

function createGrid(rows, cols) {
    gridContainer_div.style.setProperty('--grid-rows', rows);
    gridContainer_div.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        gridContainer_div.appendChild(cell).className = "grid-item";
        cell.setAttribute('draggable', 'false');
        cell.style.backgroundColor = 'transperent';
        cell.style.borderRadius = '5%';
        cell.addEventListener("mouseover", () => cell.style.backgroundColor = brushColor);
        cell.addEventListener("touch", () => cell.style.backgroundColor = brushColor);
    };
};

createGrid(currentSize, currentSize);



let gridItems = document.querySelectorAll('.grid-item');

let fill = false; //Default unToggle color fill btn
const colorFill_btn = document.querySelector('#color-fill');

//brush color select
const colorSelect_input = document.querySelector('#color-select');
colorSelect_input.addEventListener('input', (e) => {
  brushColor = e.target.value;
  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  }
  // fill = false;
  // colorFillButton.classList.remove('btn-on');
});

const buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    buttons[i].classList.toggle('btn-on');
  });
}

// shading toggle
let shading = false;
const shader_btn = document.querySelector('#shader-btn');
shader_btn.addEventListener('click', () => {
  if (shading) {
    shading = false;
  } else {
    shading = true;
    rainbow = false;
    rainbow_btn.classList.remove('btn-on');
    lighten = false;
    lighten_btn.classList.remove('btn-on');
    eraser = false;
    eraser_btn.classList.remove('btn-on');
  }
  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  }
});

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(')')[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  b = (+rgb[2]).toString(16);

  if (r.length == 1) r = '0' + r;
  if (g.length == 1) g = '0' + g;
  if (b.length == 1) b = '0' + b;
  return '#' + r + g + b;
}

function adjust(RGBToHex, rgb, amount) {
  let color = RGBToHex(rgb);
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
      )
  );
}

// lighten toggle
let lighten = false;
const lighten_btn = document.querySelector('#lighten-btn');
lighten_btn.addEventListener('click', () => {
  if (lighten) {
    lighten = false;
  } else {
    lighten = true;
    shading = false;
    shader_btn.classList.remove('btn-on');
    rainbow = false;
    rainbow_btn.classList.remove('btn-on');
    eraser = false;
    eraser_btn.classList.remove('btn-on');
  }
  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  }
});

let pick = false; //Default unToggle color picker btn
const colorPicker_btn = document.querySelector('#color-picker');
colorPicker_btn.addEventListener('click', () => {
  // when pcik is true, all drawing is frozen until a color is selected
  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  } else {
    pick = true;
  }

  if (fill) {
    fill = false;
    colorFill_btn.classList.remove('btn-on');
  }
});

let eraser = false;
const eraser_btn = document.querySelector('#eraser-btn');
eraser_btn.addEventListener('click', () => {
  if (eraser) {
    eraser = false;
  } else {
    eraser = true;
    shading = false;
    shader_btn.classList.remove('btn-on');
    rainbow = false;
    rainbow_btn.classList.remove('btn-on');
    lighten = false;
    lighten_btn.classList.remove('btn-on');
  }

  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  }
});

// default rainbow ink to false and listen for toggle
let rainbow = false;
const rainbow_btn = document.querySelector('#rainbow-btn');
rainbow_btn.addEventListener('click', () => {
  if (rainbow) {
    rainbow = false;
  } else {
    rainbow = true;
    shading = false;
    shader_btn.classList.remove('btn-on');
    lighten = false;
    lighten_btn.classList.remove('btn-on');
    eraser = false;
    eraser_btn.classList.remove('btn-on');
  }

  if (pick) {
    pick = false;
    colorPicker_btn.classList.remove('btn-on');
  }
});

//create random colour generator
function randomColor() {
  // return "#" + Math.floor(Math.random()*16777215).toString(16);
  // this returns fewer colors but they are all nice and bright
  return `hsl(${Math.random() * 360}, 75%, 50%)`;
}

function fadeGrid (item) {
  if (item.style.backgroundColor == '' || item.style.backgroundColor == 'transperent') {
    item.style.backgroundColor == 'white';
  }
  let fadeSpeed = Math.random() * 10;
  if (fadeSpeed > 8) {
    item.classList.add('clear-fade');
  } else if (fadeSpeed > 6) {
    item.classList.add('clear-fade-2');
  } else if (fadeSpeed > 4) {
    item.classList.add('clear-fade-3');
  } else if (fadeSpeed > 2) {
    item.classList.add('clear-fade-4');
  } else {
    item.classList.add('clear-fade-5');
  }
}

let bgColor = '#ffffff';
gridContainer_div.style.backgroundColor = bgColor;
let root = document.documentElement;
const clear_btn = document.querySelector('#clear-grid');
function clearGrid() {
  root.style.setProperty('--bg-color', bgColor);
  gridItems = document.querySelectorAll('.grid-item');
  for (let i = 0; i < gridItems.length; i++) {
    fadeGrid(gridItems[i]);
  }
  setTimeout(function () {
    for (let i = 0; i < gridItems.length; i++) {
      gridItems[i].style.backgroundColor = '';
      gridItems[i].removeAttribute('data-inked');
      gridItems[i].removeAttribute('data-shade');
      gridItems[i].classList.remove('clear-fade');
      gridItems[i].classList.remove('clear-fade-2');
      gridItems[i].classList.remove('clear-fade-3');
      gridItems[i].classList.remove('clear-fade-4');
      gridItems[i].classList.remove('clear-fade-5');
    }
  }, 1500);
  gridContainer_div.style.backgroundColor = bgColor;

  // turn off the button after a very short delay
  setTimeout(function () {
    clear_btn.classList.remove('btn-on');
  }, 1400);
}
clear_btn.addEventListener('click', clearGrid);



