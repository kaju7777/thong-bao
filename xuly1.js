let isRunning = false;
let interval;

function addHistory(message) {
    const historyDiv = document.getElementById('history');
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    historyDiv.innerHTML += `<br>• [${now}] ${message}`;
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function playTest(type) {
    if (type === '8h') { document.getElementById('sound8h').play(); addHistory("Đã thử: Ca 8h (Nghỉ ngắn)"); }
    else if (type === '10h') { document.getElementById('sound10h').play(); addHistory("Đã thử: Ca 10h (Nghỉ ngắn)"); }
    else if (type === 'an') { document.getElementById('soundAn').play(); addHistory("Đã thử: Giờ Ăn"); }
}

function toggleSystem() {
    const btn = document.getElementById('toggleBtn');
    const status = document.getElementById('status');
    
    isRunning = !isRunning;
    if (isRunning) {
        btn.innerText = "Tắt Chương Trình";
        btn.classList.add('active');
        status.innerText = "Hệ thống đang chạy...";
        addHistory("Hệ thống đã bật");
        interval = setInterval(checkTime, 1000);
    } else {
        btn.innerText = "Bật Chương Trình";
        btn.classList.remove('active');
        status.innerText = "Hệ thống đang dừng";
        addHistory("Hệ thống đã tắt");
        clearInterval(interval);
    }
}

function checkTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    if (m === 0 && s === 0) {
        // Thông báo giờ ăn lúc 13h
        if (h === 13) {
            document.getElementById('soundAn').play();
            addHistory("Thông báo: Đã đến giờ ăn trưa!");
        } 
        // Nhắc nghỉ ngắn 5p mỗi 2 giờ, loại trừ khung 13h và 14h
        else if (h % 2 === 0 && h !== 14) {
            if (h >= 8 && h < 17) {
                document.getElementById('sound8h').play();
                addHistory("Thông báo: Ca 8h nghỉ ngắn 5p");
            }
            if (h >= 10 && h < 19) {
                document.getElementById('sound10h').play();
                addHistory("Thông báo: Ca 10h nghỉ ngắn 5p");
            }
        }
    }
}