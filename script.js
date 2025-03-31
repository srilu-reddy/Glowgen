const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".send-btn");
const chatbox = document.querySelector(".chatbox");
const chatbotContainer = document.querySelector(".chatbot-container");

let userMessage;

// valid API key
const API_KEY = "AIzaSyAYu8EpefMaE-j_hVE-4IXdt00huG3dG7c"; 
const toggleChatbot = () => {
    chatbotContainer.classList.toggle("hidden");
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add(className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

const generateResponse = () => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            contents: [{ parts: [{ text: userMessage }] }] 
        }),
    };

    fetch(API_URL, requestOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.candidates && data.candidates.length > 0) {
                const botMessage = data.candidates[0].content.parts[0].text;
                chatbox.appendChild(createChatLi(botMessage, "incoming"));
            } else {
                chatbox.appendChild(createChatLi("No response from AI", "incoming"));
            }
            chatbox.scrollTop = chatbox.scrollHeight;
        })
        .catch((error) => {
            console.error("API Error:", error);
            chatbox.appendChild(createChatLi(`Error: ${error.message}`, "incoming"));
        });
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));
        generateResponse();
    }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
