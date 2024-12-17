const gameMachines = {
    "富遊電子-戰神賽特": 800,
    "富遊電子-忍": 200,
    "富遊電子-強棒HOMERUN": 100,
    "富遊電子-神鬼戰士": 40,
    "富遊電子-魔龍傳奇": 100,
    "富遊電子-祕寶探險": 40,
    "富遊電子-異星進化UpUp": 40
};

function getRandomAmount(selectedGame) {
    if (selectedGame.startsWith("RSG")) {
        const rsgAmounts = [2, 3, 6, 8, 10, 20, 40, 60, 100];
        const randomIndex = Math.floor(Math.random() * rsgAmounts.length);
        return rsgAmounts[randomIndex];
    } else {
        const amounts = [10, 30, 50, 60, 80, 100, 200, 500];
        const randomIndex = Math.floor(Math.random() * amounts.length);
        return amounts[randomIndex];
    }
}

function getRandomPercentage(min, max, amount, selectedGame) {
    let adjustedMin, adjustedMax;

    if (selectedGame.startsWith("RSG")) {
        adjustedMin = 70;
        adjustedMax = 95;
    } else {
        adjustedMin = 70;
        adjustedMax = 95;
    }

    const percentage = (Math.random() * (adjustedMax - adjustedMin) + adjustedMin).toFixed(1);
    return `${percentage}%`;
}

function isValidIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const isValid = regex.test(ip);
    const octets = ip.split('.');
    for (let i = 0; i < octets.length; i++) {
        if (parseInt(octets[i], 10) > 255) {
            return false;
        }
    }
    return isValid;
}

function startOptimization() {
    const optimizationMessage = document.getElementById("optimizationMessage");

    optimizationMessage.textContent = "此為RSG雷神之鎚、戰神呂布專用";
    optimizationMessage.style.display = "block";

    setTimeout(() => {
        optimizationMessage.textContent = "數據正在分析中...";
        const codeBox = document.getElementById("codeBox");
        codeBox.style.display = "block";
        codeBox.innerHTML = "正在優化數據中...";

        const startTime = Date.now();
        function generateRandomCode() {
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed < 5) {
                const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/~`abcdefghijklmnopqrstuvwxyz';
                let randomCode = '';
                for (let i = 0; i < 60; i++) {
                    randomCode += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                }
                codeBox.innerHTML += randomCode + '\n';
                codeBox.scrollTop = codeBox.scrollHeight;
                setTimeout(generateRandomCode, 100);
            } else {
                codeBox.style.display = "none";
                optimizationMessage.textContent = "數據優化成功";
                setTimeout(() => {
                    optimizationMessage.style.display = "none";
                }, 1000);
            }
        }

        generateRandomCode();
    }, 3000);
}

function confirmSelection() {
    const ip = ipInput.value;
    const selectedGame = document.getElementById("systemProvider").value;
    const accountInput = document.getElementById("accountInput").value;
    const roomNumber = document.getElementById("roomNumberInput").value;

    if (ip === "" || !isValidIP(ip)) {
        ipInput.placeholder = "請輸入正確的IP地址";
        alert("IP地址無效");
        return;
    }

    if (accountInput === "") {
        alert("尚未輸入會員帳號");
        return;
    }

    if (roomNumber === "") {
        document.getElementById("roomNumberDisplayText").textContent = "已設定房號: 未輸入房號";
    } else {
        document.getElementById("roomNumberDisplayText").textContent = `已設定房號: ${roomNumber}`;
    }

    ipInput.placeholder = "正在自動獲取 IP 中...";
    document.getElementById("ipContainer").style.display = "none";
    document.getElementById("resultContainer").style.display = "block";
    startInitialization(selectedGame);
}


function startInitialization(selectedGame) {
    let countdown = 5;
    let progress = 0;
    const countdownText = document.getElementById("countdownText");
    const initializingText = document.getElementById("initializingText");
    const loadingStatus = document.getElementById("loadingStatus");
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    const progressContainer = document.getElementById("progressContainer");
    const ip = ipInput.value;
    const codeBox = document.getElementById("codeBox");

    countdownText.textContent = countdown;

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownText.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            countdownText.textContent = "";
            initializingText.style.display = "none";
            loadingStatus.innerHTML = '數據資料讀取完成 <br><br>正在寫入爆分數據';

            progressContainer.style.display = "block";
            const progressInterval = setInterval(() => {
                progress += 1;
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `寫入進度: ${progress}%`;
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    progressText.textContent = "寫入完成";
                    progressContainer.style.display = "none";
                    loadingStatus.style.display = "none";

                    updateRateAndAmount(selectedGame);

                    codeBox.style.display = "none";
                }
            }, 100);

            codeBox.style.display = "block";
            codeBox.innerHTML = '遊戲數據寫入中..';

            const startTime = Date.now();
            function generateCode() {
                const elapsed = (Date.now() - startTime) / 1000;
                if (elapsed < 10) {
                    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/~`abcdefghijklmnopqrstuvwxyz';
                    let codeLine = '';
                    for (let i = 0; i < 60; i++) {
                        codeLine += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
                    }
                    codeBox.innerHTML += codeLine + '\n';
                    codeBox.scrollTop = codeBox.scrollHeight;
                    setTimeout(generateCode, 100);
                } else {
                    codeBox.style.display = "none";
                    loadingStatus.innerHTML += '<br>增加爆分機率寫入完成';
                    setTimeout(() => {
                        loadingStatus.innerHTML = "";
                        updateRateAndAmount(selectedGame);
                    }, 1000);
                }
            }
            generateCode();
        }
    }, 1000);
}

function updateRateAndAmount(selectedGame) {
    const suggestedAmount = getRandomAmount(selectedGame);
    const explosionRate = getRandomPercentage(3, 20, suggestedAmount, selectedGame); // 傳入遊戲類型

    const randomGameCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    document.getElementById("explosionRateText").textContent = `目前爆分當前率增加: ${explosionRate}`;
    document.getElementById("suggestedAmountText").textContent = `建議金額: ${suggestedAmount}`;
    document.getElementById("ipDisplayText").textContent = `已設定的IP: ${ipInput.value}`;
    document.getElementById("gameDisplayText").textContent = `已選擇的遊戲: ${selectedGame}`;
    document.getElementById("gameCodeText").textContent =
        `若出現遊戲編號末3碼為 "${randomGameCode}" 請購買免遊`;
    document.getElementById("warningText").innerHTML =
        "⚠️網頁請不要關閉或刷新⚠️<br>導致失效自行負責";

    setTimeout(() => {
        document.getElementById("warningText").innerHTML += "<br><br>💣增加爆分機率中💣";
    }, 1000);

    document.getElementById("resetButton").style.display = "block";
    document.getElementById("resultContainer").style.display = "block";
}

function resetRate() {
    const selectedGame = document.getElementById("systemProvider").value;
    const accountInput = document.getElementById("accountInput");

    if (selectedGame && accountInput.value !== "") {
        document.getElementById("resultContainer").style.display = "none";
        document.getElementById("ipContainer").style.display = "block";
        document.getElementById("accountInput").value = "";
        document.getElementById("ipInput").value = "正在自動獲取 IP 中..";
        document.getElementById("resetButton").style.display = "none";

        document.getElementById("explosionRateText").textContent = "";
        document.getElementById("suggestedAmountText").textContent = "";
        document.getElementById("ipDisplayText").textContent = "";
        document.getElementById("gameDisplayText").textContent = "";
        document.getElementById("gameCodeText").textContent = "";
        document.getElementById("warningText").innerHTML = "";

        document.getElementById("ipInput").placeholder = "正在自動獲取 IP 中..";
    }
}

function resetRate() {
    const selectedGame = document.getElementById("systemProvider").value;
    if (selectedGame) {
        updateRateAndAmount(selectedGame);
    }
}

function getIPAddress() {
    setTimeout(() => {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ipInput.value = data.ip;
                ipInput.placeholder = "請輸入IP";
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
                ipInput.placeholder = "無法獲取IP地址";
            });
    }, 1);
}

document.addEventListener("DOMContentLoaded", () => {
    getIPAddress();
});
