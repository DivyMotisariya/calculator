const btn = document.getElementById("timerStartStop");
const txt = document.getElementById("timerTxt");

const timerInterval = () => {
    txt.innerText = Number(txt.innerText) + 1;
};

btn.addEventListener("click", () => {
    if (btn.value == 0) {
        btn.innerText = "Stop Timer";
        btn.value = "1";
        interval = setInterval(timerInterval, 1000);
    } else {
        btn.innerText = "Start Timer";
        btn.value = "0";
        clearInterval(interval);
    }
});