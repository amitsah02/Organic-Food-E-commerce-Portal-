// Elements
 const chatIcon = document.getElementById('chat-icon');
 const chatPopup = document.getElementById('chat-popup');
 const sendButton = document.getElementById('send-btn');
 const userInput = document.getElementById('user-input');
 const chatBody = document.getElementById('chat-body');
 const micButton = document.getElementById('mic-btn');
 const minimizeButton = document.getElementById('minimize-btn');
 const refreshButton = document.getElementById('refresh-btn');
 const loadingIndicator = document.getElementById('loading-chatbot');
 const chatTime = document.getElementById('chat-time');

 // Predefined Responses
 const predefinedResponses = {

    "hello": [
        "Welcome to GreenBasket – your organic grocery assistant. How can I help you today?",
        "Hi there! Welcome to GreenBasket. Looking for fresh organic picks?",
        "Hello! This is GreenBasket – your guide to healthy organic shopping. How can I assist you?"
    ],

    "hi": [
        "Hi! How can I assist with your organic grocery needs today?",
        "Hello! Looking to explore organic products or place an order?",
        "Hey! I'm here to help you browse and buy the best organic goods."
    ],

    "bye": [
        "Goodbye! Stay healthy with GreenBasket!",
        "Take care! Visit again for your organic essentials.",
        "It was great assisting you. Bye for now!",
        "See you soon on your next organic shopping trip!",
        "Bye! Stay fresh, stay organic!"
    ],

    "how are you": [
        "I'm fresh and organic – just like our products! How can I help you today?",
        "Feeling great and ready to help you shop healthy!",
        "I'm all set to assist with your grocery list. What would you like today?",
        "I’m ready to deliver freshness to your cart. What can I do for you?"
    ],

    "thanks": [
        "You're welcome! Enjoy your healthy haul!",
        "No problem! Glad I could help with your shopping.",
        "Anytime! Have a wholesome day ahead!"
    ],

    "good morning": [
        "Good morning! Ready to shop fresh and organic?",
        "Morning! What organic goodies can I help you find today?",
        "Rise and shine! Need help picking today's fresh produce?",
        "Hello and good morning! What brings you to GreenBasket today?",
        "Good morning! Want to check today's best organic deals?"
    ],

    "good night": [
        "Good night! Rest well and shop fresh tomorrow!",
        "Sweet dreams! We’ll be here with fresh picks in the morning.",
        "Have a restful night! Your healthy basket awaits tomorrow.",
        "Sleep well! Don’t forget to refill your organic pantry.",
        "Good night! Your next organic order is just a click away."
    ],

    "what's your name": [
        "I’m GreenBot – your AI-powered organic shopping assistant!",
        "You can call me GreenBot – your healthy shopping buddy.",
        "I'm GreenBot, here to make your organic shopping easier.",
        "I’m your virtual grocery assistant – GreenBot at your service!"
    ],

    "ok": [
        "Great! What would you like to do next – browse categories, place an order, or track one?",
        "Awesome! Let me know how I can assist you further with your order.",
        "Understood! Ready when you are for the next healthy step.",
        "Okay! I’m here to help with anything you need.",
        "Perfect! Let’s continue building your healthy basket."
    ],

    "vegetables": [
        "Looking for fresh organic vegetables? I can help you find and add them to your basket.",
        "Need greens or seasonal veggies? Let me show you what's in stock.",
        "From spinach to carrots, we've got farm-fresh options. Ready to explore?",
        "Time to shop your greens! Want to see today’s fresh vegetable list?",
        "You’ll love our pesticide-free veggies! Shall I show you the selection?"
    ],

    "fruits": [
        "Sweet, juicy, and organic! Want to see today’s fruit collection?",
        "Need apples or bananas? Let’s check what’s fresh today.",
        "From berries to citrus – we've got all the healthy picks. Want to explore?",
        "Our fruits are fresh off the farm! Want to add some to your cart?",
        "Craving fruit? Let me show you what’s available right now."
    ],

    "who are you": [
        "I’m GreenBot – your personal assistant for organic grocery shopping!",
        "I'm GreenBot, designed to help you find and buy organic essentials quickly and easily.",
        "Your virtual organic shopping buddy – here to help with all your grocery needs!",
        "I’m an AI assistant created to bring fresh, healthy food to your cart!"
    ],

    "default": [
        "Hmm, I didn’t get that. Try asking something like 'show me vegetables' or 'track my order'.",
        "Oops, I didn’t understand that. Want to try rephrasing?",
        "Not sure about that. Maybe try asking about products, categories, or your order status?",
        "Sorry, I’m here for organic groceries. How can I help you with that?",
        "I didn’t catch that. Try asking about fresh produce, orders, or deals."
    ]
};



 // Open/Close Chat Popup
 chatIcon.addEventListener('click', () => {
     if (chatPopup.style.display === 'flex') {
         chatPopup.style.display = 'none';
         chatIcon.classList.remove('close');
     } else {
         chatPopup.style.display = 'flex';
         chatIcon.classList.add('close');
         updateCurrentTime();  // Update time when popup opens
     }
 });

 // Minimize Chat Popup
 minimizeButton.addEventListener('click', () => {
     chatPopup.style.display = 'none';
     chatIcon.classList.remove('close');
 });

 // Refresh Chat with Animation
 refreshButton.addEventListener('click', () => {
     refreshButton.classList.add('refresh-rotate');
     setTimeout(() => {
         refreshButton.classList.remove('refresh-rotate');
     }, 1000);

     setTimeout(() => {
         chatBody.innerHTML = `<div class="message bot-message">
             <span>Hi, how can I assist you today?</span>
             <small class="time" id="chat-time">${getCurrentTime()}</small>
         </div>`;
     }, 1000);
 });

 // Send Message
 sendButton.addEventListener('click', () => {
     const message = userInput.value.trim();
     if (message) {
         sendUserMessage(message);
     }
 });

 // Send User Message
 function sendUserMessage(message) {
     const userMessageDiv = document.createElement('div');
     userMessageDiv.classList.add('message', 'user-message');
     userMessageDiv.innerHTML = `<span>${message}</span><small class="time">${getCurrentTime()}</small>`;
     chatBody.appendChild(userMessageDiv);
     userInput.value = '';  // Clear input after sending

     // Show loading indicator
     loadingIndicator.style.display = 'block';

     // Simulate bot response after delay
     setTimeout(() => {
         const botMessage = getBotResponse(message);
         const botMessageDiv = document.createElement('div');
         botMessageDiv.classList.add('message', 'bot-message');
         botMessageDiv.innerHTML = `<span>${botMessage}</span><small class="time">${getCurrentTime()}</small>`;
         chatBody.appendChild(botMessageDiv);

         loadingIndicator.style.display = 'none'; // Hide loading indicator
         chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom

         // Speak Bot Response
         speakBotResponse(botMessage);
     }, 1500);
 }

 // Get Bot's Response
 function getBotResponse(message) {
    const msg = message.toLowerCase();
    for (let key in predefinedResponses) {
        // Check if any word in the message matches the key
        if (msg === key || msg.includes(key)) {
            const responses = predefinedResponses[key];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    return predefinedResponses["default"][Math.floor(Math.random() * predefinedResponses["default"].length)];
 }

 // Speak Bot Response (Text-to-Speech)
 function speakBotResponse(text) {
     const utterance = new SpeechSynthesisUtterance(text);
     utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
     speechSynthesis.speak(utterance);
 }

 // Handle Mic Input (Speech Recognition)
 micButton.addEventListener('click', () => {
     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
     recognition.lang = 'en-US';
     recognition.start();

     recognition.onresult = function (event) {
         const userSpeech = event.results[0][0].transcript;
         userInput.value = userSpeech;
         sendUserMessage(userSpeech);  // Automatically send the message after speech input
     };
 });

 // Get Current Time
 function getCurrentTime() {
     const now = new Date();
     return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
 }

 // Update Current Time in the Header
 function updateCurrentTime() {
     chatTime.textContent = getCurrentTime();
 }

 // Send Message (for Enter key press)
userInput.addEventListener('keypress', (event) => {
if (event.key === 'Enter' && userInput.value.trim()) {
 sendUserMessage(userInput.value.trim());
 event.preventDefault(); // Prevent default action (new line)
}
});

// Send Message (for Send button click)
sendButton.addEventListener('click', () => {
const message = userInput.value.trim();
if (message) {
 sendUserMessage(message);
}
});