# Webhok

Webhok™️ is a TypeScript library that simplifies sending webhooks using Axios.

## Installation

You can install webhok™️ using npm:


## Usage

First, import the `WebhookController` class from the package:

```javascript
const { webhookClient } = require('webhok');
```

## Creating an instance of WebhookController

To use webhok™️, create an instance of the WebhookController class with your desired options:

```javascript
const options = {
    debug: boolean /* This is in the works, debug is not utilized neither functional. */
};

const webhook = new webhookClient.WebhookController(options);
```

## Executing a Webhook

You can send a webhook using the executeWebhook method of the WebhookController class:

```javascript
const url = 'https://discord.com/api/webhooks/id/token';
const data = {
    content: string, /* the text content */
    embeds: Embed, /* the discord embed */
    username : string /* the webhook name */
};

webhook.executeWebhook(url, data)
  .then((result) => {
    console.log('Webhook sent successfully:', result);
  })
  .catch((error) => {
    console.error('Error sending webhook:', error);
  });

```