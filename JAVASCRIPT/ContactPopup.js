
// Get the modal
var modals = document.getElementById("contactModals");

// Get the button that opens the modal
var btns = document.getElementById("contactButtons");

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btns.onclick = function () {
    modals.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spans.onclick = function () {
    modals.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modals) {
        modals.style.display = "none";
    }
}

// Form submission from 
///document.getElementById("contactForms").addEventListener("submit", function (event) {
//    event.preventDefault();
    // You can add your form submission logic here, like sending the form data to a server
    // For now, let's just close the modal
  //  modals.style.display = "none";
// });
document.getElementById("mobile").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
  });
document.getElementById('closeButton2').addEventListener('click', function () {
        document.getElementById('contactModals').style.display = 'none';
    });
