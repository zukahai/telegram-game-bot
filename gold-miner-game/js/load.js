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