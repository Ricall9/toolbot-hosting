(function () {
    console.log("✅ Iniciando script del chatbot...");

    // Previene múltiples ejecuciones
    if (window.chatbotInitialized) {
        console.warn("⚠️ El chatbot ya estaba inicializado. Abortando...");
        return;
    }
    window.chatbotInitialized = true;

    // Crear botón flotante
    function ensureChatLoaded() {
        console.log("🔄 Ejecutando ensureChatLoaded()...");

        // Si el botón ya existe, no lo recreamos
        if (document.getElementById("chat-float")) {
            console.log("✅ El botón ya existe.");
            return;
        }

        console.log("⚠️ Botón no encontrado. Creando...");

        // Crear botón flotante
        var chatButton = document.createElement("div");
        chatButton.id = "chat-float";
        chatButton.innerHTML = `<img src="https://global-files-nginx.builderall.com/b697fce1-080a-4ec6-85a5-d0a832503b07/1ab1571b59d4ae684ba6638f6157d8ad31b74bdcd28f99ecf6a3f075ab05b0c0.svg" width="50" height="50">`;
        chatButton.style.position = "fixed";
        chatButton.style.bottom = "20px";
        chatButton.style.right = "20px";
        chatButton.style.width = "60px";
        chatButton.style.height = "60px";
        chatButton.style.background = "#007bff";
        chatButton.style.borderRadius = "50%";
        chatButton.style.display = "flex";
        chatButton.style.alignItems = "center";
        chatButton.style.justifyContent = "center";
        chatButton.style.zIndex = "10000";
        chatButton.style.cursor = "pointer";

        document.body.appendChild(chatButton);
        console.log("✅ Botón del chat flotante creado.");
    }

    // Reejecutar si la pestaña vuelve a ser visible
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "visible") {
            ensureChatLoaded();
        }
    });

    // Revisar cada 5 segundos si el botón desaparece y recrearlo
    setInterval(() => {
        if (!document.getElementById("chat-float")) {
            console.log("⚠️ El botón desapareció. Se está recreando...");
            ensureChatLoaded();
        }
    }, 5000);

    // Asegurar que el script se ejecuta tras la recarga
    document.addEventListener("DOMContentLoaded", ensureChatLoaded);

    // Detectar si el botón es eliminado por otros scripts
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.removedNodes.forEach(node => {
                if (node.id === "chat-float") {
                    console.warn("⚠️ Alguien eliminó #chat-float", mutation);
                    console.log("🔍 Revisando qué script lo eliminó...");
                    ensureChatLoaded(); // Recrea el botón si es eliminado
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Función para detectar "Enter" y enviar mensaje
    function handleKeyPress(event) {
        if (event.key === "Enter") sendMessage();
    }

    // Función enviar mensajes al webhook (optimizado para reducir tokens)
    async function sendMessage() {
        const userInput = document.getElementById("user-input");
        const messageText = userInput.value.trim();
        if (!messageText) return;

        addMessage(messageText, "user-message");
        userInput.value = "";

        const userID = localStorage.getItem('userID');

        try {
            console.log("📤 Enviando mensaje:", messageText);
            const response = await fetch("https://hook.us2.make.com/wnnftj140mu7yd4mvconfbl1jh1snan3", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: messageText, // SOLO TEXTO, SIN FORMATO EXTRA
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
        if (!chatMessages) {
            console.warn("⚠️ No se encontró el contenedor del chat.");
            return;
        }
        const messageElement = document.createElement("div");
        messageElement.className = className;
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Asegurar que las funciones sean accesibles globalmente
    window.ensureChatLoaded = ensureChatLoaded;
    window.sendMessage = sendMessage;
    window.handleKeyPress = handleKeyPress;

})();
