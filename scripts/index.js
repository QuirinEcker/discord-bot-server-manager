const BotMessageFilter = require('./BotMessageFilter');
const fs = require('fs');
const auth = require("../config/config")
const api = require("./ApiProvider");
const DiscordCommand = require("./Command")
const commandController = require("./CommandController").instance;

api.client.login(auth.token)
    .catch(console.log)

api.client.on("ready", () => {

});

api.client.on('message', (msg) => {
    BotMessageFilter.instance.filter(msg)

    try {
        let command = commandController.convertToCommand(msg, msg.content)
        commandController.validate(command);
        command.run()
    } catch (e) {
        console.log(e);
    }
});