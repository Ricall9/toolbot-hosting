(function ensureChatLoaded() { 
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
    chatButton.innerHTML = `
      <img src="https://global-files-nginx.builderall.com/b697fce1-080a-4ec6-85a5-d0a832503b07/1ab1571b59d4ae684ba6638f6157d8ad31b74bdcd28f99ecf6a3f075ab05b0c0.svg" width="50" height="50">
    `;
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

// Reejecutar si la pestaña vuelve a ser visible
document.addEventListener("visibilitychange", function() {
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
