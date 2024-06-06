const questions = [
    {
        question: "1.在手機的社交活動：",
        options: [
            { text: "A. 喜歡與人們互動並分享經驗。", value: "E" },
            { text: "B. 喜歡獨自探索。", value: "I" },
        ]
    },
    {
        question: "2.發現新應用程式時：",
        options: [
            { text: "A. 你會馬上與朋友分享這個發現。", value: "E" },
            { text: "B. 你會自己先試用，再決定是否推薦給朋友。", value: "I" },
            { text: "C. 你會在網上查看其他人的評價再決定。", value: "S" },
            { text: "D. 你會憑直覺覺得好就直接使用。", value: "N" }
        ]
    },
    {
        question: "3.當需要導航到新的地點時：",
        options: [
            { text: "A. 你會使用GPS並仔細跟隨指示。", value: "S" },
            { text: "B. 你會邊走邊看，隨時調整方向。", value: "N" }
        ]
    },
    {
        question: "4.使用新應用程式時：",
        options: [
            { text: "A. 你仔細閱讀說明書和使用指南。", value: "S" },
            { text: "B. 你喜歡自己探索，根據感覺操作。", value: "N" },
        ]
    },
    {
        question: "5.當需要選擇一個管理工具時：",
        options: [
            { text: "A. 你更注重功能和效率。", value: "T" },
            { text: "B. 你更關心是否符合你的個人需求和感受。", value: "F" },
        ]
    },
    {
        question: "6.在與朋友討論手機應用時：",
        options: [
            { text: "A. 你更關注應用的實用性和技術細節。", value: "T" },
            { text: "B. 你會考慮朋友的喜好和感受。", value: "F" },
            { text: "C. 你會詳細分析應用的優缺點。", value: "T" },
            { text: "D. 你會更多關注應用是否能帶來快樂和滿足。", value: "F" }
        ]
    },
    {
        question: "7.設置手機通知時：",
        options: [
            { text: "A. 你有系統地分類和設置不同應用的通知。", value: "J" },
            { text: "B. 你隨心所欲，根據當時的需要來設置。", value: "P" },
            { text: "C. 你會根據應用的重要性來設置通知優先級。", value: "J" },
            { text: "D. 你喜歡保持通知自由，隨時調整。", value: "P" }
        ]
    },
    {
        question: "8.app的擺放位置：",
        options: [
            { text: "A. 分類好並按照規則排列。", value: "J" },
            { text: "B. 你喜歡隨遇而安，根據當時的情況做決定。", value: "P" },
            { text: "C. 你會做一個大致的計劃，留有彈性空間。", value: "J" },
            { text: "D. 依照下載順序不特別調整。", value: "P" }
        ]
    },
    {
        question: "9.當有新消息來臨時：",
        options: [
            { text: "A. 你會立即查看和回應。", value: "E" },
            { text: "B. 你會等有空的時候再查看。", value: "I" },
            { text: "C. 你會根據消息的類型決定是否立即查看。", value: "S" },
            { text: "D. 你會先處理手頭上的事情，再看消息。", value: "N" }
        ]
    },
    {
        question: "10.面對大量的手機訊息：",
        options: [
            { text: "A. 你會逐一整理和分類。", value: "S" },
            { text: "B. 你會根據重要程度先處理重要的，其他的隨後再看。", value: "N" },
            { text: "C. 你會設置自動分類規則來幫助整理。", value: "J" },
            { text: "D. 你會只看感興趣的，其他隨意瀏覽。", value: "P" }
        ]
    },

    {
        question: "11.使用手機記錄生活時：",
        options: [
            { text: "A. 你會定期整理和備份照片和資料。", value: "J" },
            { text: "B. 你會根據心情隨時記錄，不太在意整理。", value: "P" },
            { text: "C. 你會將重要的事件和資料按時間順序整理。", value: "S" },
            { text: "D. 你會建立不同的相簿來保存不同的記憶。", value: "N" }
        ]
    }
];

let currentQuestionIndex = 0;
const answers = [];

function showQuestion(index) {
    const questionContainer = document.getElementById("questionContainer");
    const question = questions[index];
    questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.options.map((option, i) => `
            <label>
                <input type="radio" name="q${index}" value="${option.value}" ${answers[index] === option.value ? 'checked' : ''}>
                ${option.text}
            </label>
        `).join('')}
    `;
    document.getElementById("prevButton").style.display = index === 0 ? 'none' : 'inline-block';
    document.getElementById("nextButton").textContent = index === questions.length - 1 ? '提交' : '下一步';
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        answers[currentQuestionIndex] = selectedOption.value;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        } else {
            calculateResult();
        }
    } else {
        alert("請選擇一個選項");
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function calculateResult() {
    const resultCount = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
    };

    answers.forEach(answer => {
        resultCount[answer]++;
    });

    const result = `${resultCount.E > resultCount.I ? 'E' : 'I'}${resultCount.S > resultCount.N ? 'S' : 'N'}${resultCount.T > resultCount.F ? 'T' : 'F'}${resultCount.J > resultCount.P ? 'J' : 'P'}`;

    const descriptions = {
        ISTJ: {
            title: "（檢查員） - 秩序方塊",
            scenario: "情境：系統化管理",
            description: "ISTJ用戶喜歡有條理地整理手機應用，設置自動備份功能確保數據安全。"
        },
        ISFJ: {
            title: "（守護者） - 關懷圓球",
            scenario: "情境：保存回憶",
            description: "經常使用相冊和社交應用來保存和分享與家人朋友的美好時光。他們重視與親密的人保持聯繫。"
        },
        INFJ: {
            title: "（提倡者） - 啟發星星",
            scenario: "情境：深度學習",
            description: "喜歡透過手機閱讀和學習獲取新知識。"
        },
        INTJ: {
            title: "（建築師） - 策略三角",
            scenario: "情境：高效規劃",
            description: "注重效率和計劃，保持對新技術的了解。"
        },
        ISTP: {
            title: "（工匠） - 靈活菱鑽",
            scenario: "情境：技術探索",
            description: "喜歡探索新技術和應用，尋找解決方案和分享經驗。"
        },
        ISFP: {
            title: "（探險家） - 創意心",
            scenario: "情境：創意表達",
            description: "喜歡用手機進行創作和表達。"
        },
        INFP: {
            title: "（調停者） - 理想雲",
            scenario: "情境：靈感記錄",
            description: "用手機反思，尋找新的靈感源泉。"
        },
        INTP: {
            title: "（思考者） - 邏輯蜂巢",
            scenario: "情境：問題分析",
            description: "喜歡分析和解決問題"
        },
        ESTP: {
            title: "（促進者） - 活力閃電",
            scenario: "情境：社交娛樂",
            description: "喜歡用手機來社交和娛樂，即時獲取資訊。"
        },
        ESFP: {
            title: "（表演者） - 快樂花",
            scenario: "情境：生活分享",
            description: "喜歡記錄和分享生活，喜歡參加社交活動發現新朋友。"
        },
        ENFP: {
            title: "（競選者） - 探索風箏",
            scenario: "情境：熱情連接",
            description: "喜歡探索新事物和建立聯繫，並保持社交和合作。"
        },
        ENTP: {
            title: "（辯論家） - 創新火焰",
            scenario: "情境：討論辯論",
            description: "喜歡挑戰和辯論，保持對新技術的興趣。"
        },
        ESTJ: {
            title: "（主管） - 效率矩形",
            scenario: "情境：任務管理",
            description: "重視效率和結構，組織團隊任務。"
        },
        ESFJ: {
            title: "（執政官） - 協調橢圓",
            scenario: "情境：社交協調",
            description: ""
        },
        ENFJ: {
            title: "（主人） - 領導皇冠",
            scenario: "情境：鼓勵引導",
            description: ""
        },
        ENTJ: {
            title: "（指揮官） - 決策箭頭",
            scenario: "情境：戰略決策",
            description: ""
        }
    };

    const resultType = descriptions[result];
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>${resultType.title}</h2>
        <p><strong>${resultType.scenario}</strong></p>
        <p>${resultType.description}</p>
        <button id="retryButton" onclick="retryQuiz()">重新測驗</button>
    `;

    document.getElementById("quizWindow").style.display = "none";
    resultDiv.style.display = "block";
}

function startQuiz() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizWindow").style.display = "block";
    showQuestion(currentQuestionIndex);
}

function retryQuiz() {
    currentQuestionIndex = 0;
    answers.length = 0;
    document.getElementById("quizWindow").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("quizWindow").style.display = "none";
    document.getElementById("result").style.display = "none";
    document.getElementById("startScreen").style.display = "block";
});
