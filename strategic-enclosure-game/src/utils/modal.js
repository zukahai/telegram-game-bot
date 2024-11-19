// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var input_close = document.getElementById("input-close");
// When the page loads, show the modal
window.onload = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

span.onclick = function () {
    modal.style.display = "none";
}

input_close.onclick = function () {
    modal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Hàm lấy parameters từ URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// When the page loads, show the modal
window.addEventListener('load', function() {
    // Kiểm tra chat_id trong URL
    const chatId = getUrlParameter('chat_id');
    if (chatId) {
        localStorage.setItem("telegram_chat_id", chatId);
        console.log('Chat ID from URL:', chatId);
    } else {
        console.log('No chat ID found in URL.');
    }
});
