const modal_container = document.getElementById("infoContainer")
let shown = false
document.getElementById("infoButton").onclick = function() {
    if (shown == false) {
        modal_container.classList.add('show')
        shown = true
        console.log("Container shown");
    } 
    else {
        modal_container.classList.remove('show')
        shown = false
        console.log("Container hidden");
    }
}