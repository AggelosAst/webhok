const {webhookClient} = require("../dist/index")
const webHookManager = new webhookClient.WebhookController({
    debug: false
})

webHookManager.executeWebhook("https://discord.com/api/webhooks/1155914222287474718/QsxdZsNOfY1uN0-NF2zbJ7tO0VqwXy0hRNuCDPEucdjzOcdzadpVlSs1Z19ZaMPvQpBdf", {
    //bomboclut
    content: "Hello webhook"
}).then(r => console.log(r)).catch(e => console.log(e))
