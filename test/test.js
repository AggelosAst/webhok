const {webhookClient} = require("webhok")
const webHookManager = new webhookClient.WebhookController({
    debug: false
})
webHookManager.executeWebhook("https://discord.com/api/webhooks/id/token", {
    content: "Hello webhook"
}).then(r => console.log(r)).catch(e => console.log(e))
