const statusDisplay = document.getElementById("status")
const background = document.getElementById("body")
const intervalSelector = document.getElementById("testInterval")
const refreshButton = document.getElementById("main")
var interval = intervalSelector.value;


const checkOnlineStatus = async() =>{
    try
    {
        const online = await fetch("Images/TinyGif.gif", {cache: "no-store"})
        return online.status >= 200 && online.status < 300
    }
    catch (err)
    {
        return false;
    }
};

const getOnlineStatus = async() =>{
    statusDisplay.innerHTML = "Checking"
    background.style.backgroundColor = "#e0b124"
    const result = await checkOnlineStatus();
    statusDisplay.innerHTML = result ? "Online" : "Offline"
    background.style.backgroundColor = result ? "#20ab3a" : "#bf3a22"
};

function intervalChanged(){
    getOnlineStatus();
    clearInterval(currentInterval)
    currentInterval = setInterval(getOnlineStatus, interval);
};

refreshButton.addEventListener("click", intervalChanged);

intervalSelector.onchange = function(){
    interval = intervalSelector.value;
    console.log(interval)
    if (interval != 0){
        intervalChanged();
    }
    else{
        clearInterval(currentInterval);
    }
};

getOnlineStatus();
var currentInterval = setInterval(getOnlineStatus, interval);
