let isRunning = false;
let interval;
let lastPlayed = ""; // Biến để lưu trạng thái thông báo

function addHistory(message) {
    const historyDiv = document.getElementById('history');
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    historyDiv.innerHTML += `<br>• [${now}] ${message}`;
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function playTest(type) {
    if (type === '8h') { document.getElementById('sound8h').play(); addHistory("Đã thử: Ca 8h"); }
    else if (type === '10h') { document.getElementById('sound10h').play(); addHistory("Đã thử: Ca 10h"); }
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
    const timeKey = h + ":" + m; // Khóa theo giờ:phút

    // Kiểm tra vào phút 00 của các giờ
    if (m === 0 && s === 0 && lastPlayed !== timeKey) {
        lastPlayed = timeKey; // Đánh dấu đã báo giờ này

        if (h === 13) {
            document.getElementById('soundAn').play();
            addHistory("Thông báo: Đã đến giờ ăn trưa!");
        } 
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
