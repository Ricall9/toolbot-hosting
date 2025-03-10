(function ensureChatLoaded() { 
    console.log("🔄 Ejecutando ensureChatLoaded()...");

    // Si el botón ya existe, no lo recreamos
    if (document.getElementById("chat-float")) {
        console.log("✅ El botón ya existe.");
        return;
    }

    console.log("⚠️ Botón no encontrado. Creando...");

    // Crear botón flotante de manera segura
    var chatButton = document.createElement("div");
    chatButton.id = "chat-float";

    var img = document.createElement("img");
    img.src = "https://global-files-nginx.builderall.com/b697fce1-080a-4ec6-85a5-d0a832503b07/1ab1571b59d4ae684ba6638f6157d8ad31b74bdcd28f99ecf6a3f075ab05b0c0.svg";
    img.width = 50;
    img.height = 50;

    chatButton.appendChild(img);
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
})();

// Revisar cada 3 segundos si el botón desaparece y recrearlo
setInterval(() => {
    let chatButton = document.getElementById("chat-float");

    if (!chatButton) {
        console.log("⚠️ El botón desapareció. Se está recreando...");
        ensureChatLoaded();
    } else {
        console.log("✅ El botón sigue en la página.");
    }
}, 3000);

// Asegurar que el script se ejecuta tras la recarga
document.addEventListener("DOMContentLoaded", ensureChatLoaded);
