"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

$("#sendButton").attr("disabled","disabled");

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
        $("#sendButton").removeAttr("disabled");
    })
    .catch(function (err) {
    return console.error(err.toString());
    })

$("#sendButton").click(function (event) {
    event.preventDefault();
    connection.invoke("SendMessage", $("#userInput").val(), $("#messageInput").val())
        .catch(function (err) { return console.error(err.toString()) });
})