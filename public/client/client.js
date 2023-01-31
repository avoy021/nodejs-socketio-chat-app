// In case your front is not served from the same domain as your server, you have to pass the URL of your server.
const socket = io("http://localhost:3000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".message-container");



const append = (message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}; 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    socket.emit("send",message);
    messageInput.value = "";
})

const userName = prompt("Enter your name to Join the chat: ");
socket.emit("new-user-joined",userName);

socket.on("user-joined", data =>{
    append(`${data} joined the chat.`,"right");
});

socket.on("receive", data =>{
    append(`${data.name}: ${data.message}`,"left");
});
socket.on("left", name =>{
    append(`${name} left the chat`,"left");
});
