
// Hàm lấy parameters từ URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const keo = document.getElementById("keo");
const bao = document.getElementById("bao");
const bua = document.getElementById("bua");
const chatIdStatus = document.getElementById("chatIdStatus");

// Hàm cập nhật trạng thái Telegram
function updateTelegramStatus() {
    const chatId = localStorage.getItem("telegram_chat_id");
    if (chatId) {
        chatIdStatus.textContent = "✅ Đã kết nối với Telegram";
        chatIdStatus.style.color = "green";
    } else {
        chatIdStatus.textContent = "❌ Chưa kết nối với Telegram";
        chatIdStatus.style.color = "red";
    }
}

// When the page loads, show the modal
window.addEventListener('load', function() {
    // Kiểm tra chat_id trong URL
    const chatId = getUrlParameter('chat_id');
    if (chatId) {
        localStorage.setItem("telegram_chat_id", chatId);
        console.log('Chat ID from URL:', chatId);
    }
    
    modal.style.display = "block";
    localStorage.setItem("start", false);
    updateTelegramStatus();
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

keo.onclick = function () {
    modal.style.display = "none";
    localStorage.setItem("choice", "2");
    localStorage.setItem("start", true);
}

bao.onclick = function () {
    modal.style.display = "none";
    localStorage.setItem("choice", "3");
    localStorage.setItem("start", true);
}

bua.onclick = function () {
    modal.style.display = "none";
    localStorage.setItem("choice", "1");
    localStorage.setItem("start", true);
}

// hover bua
bua.onmouseover = function () {
    document.getElementById("choice").src = "./assets/images/1.png";
}

// hover keo
keo.onmouseover = function () {
    document.getElementById("choice").src = "./assets/images/2.png";
}

// hover bao
bao.onmouseover = function () {
    document.getElementById("choice").src = "./assets/images/3.png";
}

// Xử lý nút lấy Chat ID
const getChatIdButton = document.getElementById("getChatId");
const chatIdResult = document.getElementById("chatIdResult");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
