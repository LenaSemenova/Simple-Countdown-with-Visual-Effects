//DOM Elements
const minutesInput = document.querySelector("#minutes");
const secondsInput =document.querySelector("#seconds");
let circularProgress = document.querySelector(".circular-progress");
let minutesInfo = document.querySelector(".minutesInfo");
let secondsInfo = document.querySelector(".secondsInfo");
let alertMinutes = document.querySelector("#alertMinutes");
let alertSeconds = document.querySelector("#alertSeconds");
let allBtns = document.querySelectorAll("button");
let btnStart = document.querySelector("#start");
let btnStop = document.querySelector("#stop");
let btnReset = document.querySelector("#reset");



//Functions

function amountOfSeconds () {
  let secondsValue = secondsInput.value;
  let secondsValueNmbr = Number(secondsValue);
  return secondsValueNmbr;
}
function amountOfMinutes () {
  let minutesValue = minutesInput.value;
  let minutesValueNmbr = Number(minutesValue);
  return minutesValueNmbr;
}
function inputFieldsControl () {
	let secondsControl = amountOfSeconds();
	let minutesControl = amountOfMinutes();
	let totalControl = ((minutesControl * 60) + secondsControl) / 60;
	if (secondsControl > 60) {
		alertSeconds.classList.remove("hidden");
		allBtns.forEach(button => {
			button.disabled = true;
			button.style.opacity="0.2";
		});
	} else if (minutesControl > 99) {
		alertMinutes.classList.remove("hidden");
		allBtns.forEach(button => {
			button.disabled = true;
			button.style.opacity="0.2";
		});
	} else if (totalControl > 99) {
		alertMinutes.classList.remove("hidden");
		allBtns.forEach(button => {
			button.disabled = true;
			button.style.opacity="0.2";
		});
	} else {
		allBtns.forEach(button => {
			button.disabled = false;
			button.style.opacity="1";
		});
		return true;
	}
}
let intervalID;
let intervalID_array = [];
let progressStartValue;

function settingAnInterval (valueSec, valueMin) {
intervalID = setInterval(() => {
	intervalID_array.push(intervalID);
	if(valueSec === 0 && valueMin !==0) {
		valueSec = 60;
		valueMin = valueMin - 1;
	}
 if(valueSec < 10) {
      secondsInfo.textContent = `0${valueSec}`;
    }
    else {
    secondsInfo.textContent = `${valueSec}`; 
    }
  if(valueMin < 10) {
      minutesInfo.textContent = `0${valueMin}`;
    }
    else {
    minutesInfo.textContent = `${valueMin}`; 
    }
	if(valueSec === 60) {
		secondsInfo.textContent = "00";
		if (valueMin + 1 < 10) {
			minutesInfo.textContent = `0${valueMin + 1}`;
		} else {
		minutesInfo.textContent = `${valueMin + 1}`;
	}
	}
  if (valueSec > 0 && valueMin !== undefined) {
  circularProgress.style.background = `conic-gradient(pink ${valueSec * 6}deg, #ededed 0deg)`;
  valueSec = valueSec - 1;
  
  if (valueSec === 0 && valueMin > 0) { 
  circularProgress.style.background = `conic-gradient(pink ${(valueSec + 1) * 6}deg, #ededed 0deg)`;
	valueMin = valueMin -1;
	valueSec = 60;
    
  }
} else {
clearInterval(intervalID);
intervalID = null;
circularProgress.style.background = `conic-gradient(pink 0deg, #ededed 0deg)`;
}
}, 1000)
}

function countDown(){
let valueSec = amountOfSeconds();
let valueMin = amountOfMinutes();
if (!intervalID) {
	settingAnInterval(valueSec, valueMin);
}
}

function stopContinue () {
  if (btnStop.innerHTML === `Stop\n\t<span class="glyphicon glyphicon-pause"></span>`) {
    btnStop.innerHTML = `Continue\n\t<span class="glyphicon glyphicon-pause"></span>`;
    for (let i = 0; i< intervalID_array.length; i++) {
      clearInterval(intervalID_array[i]);
    }
  } else if (btnStop.innerHTML === `Continue\n\t<span class="glyphicon glyphicon-pause"></span>`) {
  btnStop.innerHTML = `Stop\n\t<span class="glyphicon glyphicon-pause"></span>`;
  let valueSec = Number(secondsInfo.textContent);
  let valueMin = Number(minutesInfo.textContent);
  settingAnInterval(valueSec, valueMin);
}
}


function reset () {
  minutesInput.value = "";
  secondsInput.value = "";
  minutesInfo.textContent = "00";
  secondsInfo.textContent = "00";
  btnStop.innerHTML = `Stop\n\t<span class="glyphicon glyphicon-pause"></span>`;
  circularProgress.style.background = `conic-gradient(pink 0deg, #ededed 0deg)`;
  clearInterval(intervalID);
  intervalID = null;
}

function init() {
  btnStart.addEventListener("click", countDown);
  btnStop.addEventListener("click", stopContinue);
  btnReset.addEventListener("click", reset);
  minutesInput.addEventListener("blur", inputFieldsControl);
  secondsInput.addEventListener("blur", inputFieldsControl);
   setTimeout(() => {
	$('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
  }, 100);
  
}
window.addEventListener("DOMContentLoaded", init);