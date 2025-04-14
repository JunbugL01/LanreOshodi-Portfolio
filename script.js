document.addEventListener("DOMContentLoaded", function () {
  // Get references to elements in the chatbot container
  const chatList = document.getElementById("chat-list");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // Function to generate a response based on user input, similar to your Python logic
  function getResponse(userInput) {
    const text = userInput.toLowerCase();
    const faqAnswers = {
      skills:
        "I have robust programming skills in Python, JavaScript, and C++. I'm passionate about full-stack development, data analysis, and creating user-friendly applications.",
      experience:
        "I have over 5 years of experience in software development, working on projects ranging from web applications to automation scripts. I enjoy learning new technologies and collaborating with others.",
      projects:
        "I've developed several projects including a task manager app, data visualization dashboards, and some open-source libraries. You can see more details in my portfolio."
    };

    if (text.includes("skill")) {
      return faqAnswers.skills;
    } else if (text.includes("experience") || text.includes("background")) {
      return faqAnswers.experience;
    } else if (text.includes("project") || text.includes("work")) {
      return faqAnswers.projects;
    } else {
      return "I'm sorry, I don't have an answer to that. Try asking about my skills, experiences, or projects.";
    }
  }

  // Function to append a message to the chat list
  function addMessage(sender, message) {
    // Create a new list item for the message
    const listItem = document.createElement("li");
    // Add a class based on the sender for styling purposes
    listItem.classList.add(sender === "Bot" ? "bot-message" : "user-message");
    listItem.textContent = `${sender}: ${message}`;
    chatList.appendChild(listItem);

    // Auto-scroll to the bottom so the latest messages are visible
    chatList.scrollTop = chatList.scrollHeight;
  }

  // Function to simulate a typing delay with a "Typing..." indicator
  function simulateTyping(callback) {
    addMessage("Bot", "Typing...");
    // Delay for 1 second before showing the response
    setTimeout(() => {
      // Remove the "Typing..." message (assumed to be the last message)
      chatList.removeChild(chatList.lastChild);
      callback();
    }, 1000);
  }

  // Handler for when the user sends a message
  function handleMessage() {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    // Add the user's message to the chat
    addMessage("User", userText);
    // Clear the input field
    chatInput.value = "";

    // Simulate typing before showing the bot's response
    simulateTyping(function () {
      const response = getResponse(userText);
      addMessage("Bot", response);
    });
  }

  // Event listener for the send button
  sendBtn.addEventListener("click", handleMessage);

  // Also allow sending a message by pressing the Enter key
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessage();
    }
  });
});
