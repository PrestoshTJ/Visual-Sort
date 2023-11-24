let resetb = document.querySelector('#reset')
let sorting = document.querySelector('#sorting')
let submit = document.querySelector('.submit')
let container = document.querySelector('#container')
let sorted = false
let nslider = document.querySelector('#nslider')
let sslider = document.querySelector('#sslider')

let array = []
let num = 25
let color = "red"
let speed = 50

function reset () {
  array = []
  sorted = true
  for (let i = 0; i < num; i++) {
    array[i] = Math.random()
  }
  show()
}

resetb.addEventListener('click', function() {reset()})

function show(a,b) {
  container.innerHTML = ""
  for (let i = 0; i < num; i++) {
    let div = document.createElement('div')
    div.style.backgroundColor = color
    div.style.height = array[i] * 100 + "%"
    div.style.borderRadius = "25px"
    div.style.border = "1px solid black"
    if (array[i] == array[a] || array[i] == array[b]) {
      div.style.backgroundColor = "green"
    }
    div.style.width = "10px"
    container.appendChild(div)
  }
}


async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function bubble () {
  if (submit.className == "submit") {submit.classList.toggle("submit")}
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num - i - 1; j++) 
      if (array[j] > array[j + 1]) {
        let temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
        show(j, j+1)
      await sleep(speed)
    }
  }
  if (submit.className != "submit") {submit.classList.toggle("submit")}
}

async function insert() {
  if (submit.className == "submit") {submit.classList.toggle("submit")}
  for (let i = 1; i < num; i++) {
    let j = i
    while (j > 0 && array[j - 1] > array[j]) {
      let temp = array[j]
      array[j] = array[j - 1]
      array[j - 1] = temp
      show(j - 1, j)
      await sleep(speed)
      j--
    }
  }
  if (submit.className != "submit") {submit.classList.toggle("submit")}
}


async function bogo () {
  if (submit.className == "submit") {submit.classList.toggle("submit")}
  sorted = false
  while (!sorted) {
    let i = Math.floor(Math.random() * num)
    let j = Math.floor(Math.random() * num)
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
    show(i,j)
    await sleep(speed)
  }  
  if (submit.className != "submit") {submit.classList.toggle("submit")}
}

async function selecti() {
  for (let i = 0; i < num; i++) {
    let min = i
    for (let j = i + 1; j < num; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    let temp = array[i]
    array[i] = array[min]
    array[min] = temp
    show(i, min)
    await sleep(speed)
  }
}

nslider.addEventListener('mouseup', function() {
  num = nslider.value
  reset()
})

sslider.addEventListener('mouseup', function() {
  speed = 120 - sslider.value
})

submit.addEventListener('click', function() {
  let value = sorting.value
  if (submit.className == "submit") {
    switch(value) {
      case "0": bubble(); break;
      case "1": insert(); break;
      case "2": selecti(); break;
      case "-1": bogo(); break;
      default: console.log("What?");
    }
  } else {
    console.log("WAIT")
  }
})

reset()
