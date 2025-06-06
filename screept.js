// Установите дату окончания акции (например, через 5 дней)
const endTime = new Date();
endTime.setDate(endTime.getDate() + 5); // 5 дней от текущего момента

function formatTimeLeft(totalSeconds) {
    if (totalSeconds < 0) return "00д 00:00:00";
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return (
        String(days).padStart(2, '0') + " days " +
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0')
    );
}

function updateCountdown() {
    const now = new Date();
    const totalSeconds = Math.floor((endTime - now) / 1000);
    const countdownElem = document.getElementById('countdown');
    if (countdownElem) {
        if (totalSeconds < 0) {
            countdownElem.textContent = "00д 00:00:00";
        } else {
            countdownElem.textContent = formatTimeLeft(totalSeconds);
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();