document.addEventListener("DOMContentLoaded", function () {
    // Crear botón flotante
    var chatButton = document.createElement("div");
    chatButton.id = "chat-float";
    chatButton.innerHTML = `
      <img src="https://global-files-nginx.builderall.com/b697fce1-080a-4ec6-85a5-d0a832503b07/1ab1571b59d4ae684ba6638f6157d8ad31b74bdcd28f99ecf6a3f075ab05b0c0.svg" alt="Chat" width="50" height="50">
    `;
    document.body.appendChild(chatButton);

    // Crear contenedor del chat
    var chatContainer = document.createElement("div");
    chatContainer.id = "chat-container";
    chatContainer.style.display = "none";
    chatContainer.innerHTML = `
      <div id="chat-header">Chat con Clicatools</div>
      <div id="chat-messages"></div>
      <div class="chat-input">
        <input type="text" id="user-input" placeholder="Escribe tu mensaje..." onkeypress="handleKeyPress(event)">
        <button onclick="sendMessage()">Enviar</button>
      </div>
    `;
    document.body.appendChild(chatContainer);

    // Crear estilos completos
    var styles = document.createElement("style");
    styles.innerHTML = `
      #chat-float {
        position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px;
        background-color: #0088cc; border-radius: 50%; box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
        display: flex; justify-content: center; align-items: center; z-index: 10000; cursor: pointer;
      }
      #chat-container {
        position: fixed; bottom: 90px; right: 20px; width: 350px; max-width: 90%; background: #f9f9f9;
        border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.3); display: none; flex-direction: column; z-index: 10001;
      }
    `;
    document.head.appendChild(styles);

    // Mostrar/Ocultar chat al hacer clic en botón
    chatButton.onclick = function() {
        chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
    };

    document.getElementById("chat-header").onclick = function() {
        chatContainer.style.display = "none";
    };

    // ID único por usuario
    if (!localStorage.getItem('userID')) {
        localStorage.setItem('userID', 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000));
    }
});

// Función para Enter
function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}

// Función enviar mensajes al webhook
async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const messageText = userInput.value.trim();
    if (!messageText) return;

    addMessage(messageText, "user-message");
    userInput.value = "";

    const userID = localStorage.getItem('userID');

    try {
        const response = await fetch("https://hook.us2.make.com/wnnftj140mu7yd4mvconfbl1jh1snan3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                message: messageText,
                user_id: userID
            })
        });

        const data = await response.json();
        addMessage(data.reply || "No entendí tu mensaje.", "bot-message");
    } catch (error) {
        addMessage("Error al conectar con el servidor.", "bot-message");
    }
}

// Función para agregar mensajes al chat visualmente
function addMessage(text, className) {
    const chatMessages = document.getElementById("chat-messages");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Definir sendMessage globalmente
window.sendMessage = sendMessage;
