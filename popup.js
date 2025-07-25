document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggle").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleDarkMode
      });
    } catch (err) {
      console.error("Error toggling dark mode:", err);
    }
  });
});

function toggleDarkMode() {
  const styleId = "dark-mode-style";
  const existingStyle = document.getElementById(styleId);

  if (existingStyle) {
    existingStyle.remove();
  } else {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      html, body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
      }
      * {
        background-color: transparent !important;
        color: inherit !important;
      }
    `;
    document.head.appendChild(style);
  }
}
