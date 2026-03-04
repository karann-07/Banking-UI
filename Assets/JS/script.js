
  let slideIndex = 0;
  showSlides();

  function showSlides() {
      let i;
      const slides = document.getElementsByClassName("slides");
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 2000); 
  } 

const chatbotBtn = document.getElementById("chatbot-btn");
const chatbotBox = document.getElementById("chatbot-box");
const closeChat = document.getElementById("close-chat");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

chatbotBtn.onclick = () => {
  chatbotBox.style.display = "flex";

  if (!messages.innerHTML.trim()) {
    messages.innerHTML += `
      <div class="bot-msg">
        👋 Hello! I'm BankMate AI. How can I help you today?
      </div>
    `;
  }
  messages.scrollTop = messages.scrollHeight;
};
closeChat.onclick = () => chatbotBox.style.display = "none";

sendBtn.onclick = sendMessage;

function sendMessage() {
  const userMessage = input.value;
  if (!userMessage) return;

  messages.innerHTML += `
    <div class="user-msg">
      ${userMessage}
    </div>
  `;

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  // Typing animation
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-msg";
  typingDiv.id = "typing";
  typingDiv.innerHTML = `
  BankMate AI is typing<span class="dots"></span>
`;
  messages.appendChild(typingDiv);
  messages.scrollTop = messages.scrollHeight;

  fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("typing").remove();

    messages.innerHTML += `
      <div class="bot-msg">
        ${data.reply}
      </div>
    `;

    messages.scrollTop = messages.scrollHeight;
  });
}
