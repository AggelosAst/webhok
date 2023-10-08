# Webhok

Webhok™️ is a TypeScript library that simplifies sending webhooks using Axios.

## Installation

You can install webhok™️ using npm:


## Usage

First, import the `WebhookController` class from the package:

```typescript
const { webhookClient } = require('webhok');
```

## Creating an instance of WebhookController

To use webhok™️, create an instance of the WebhookController class with your desired options:

```typescript
const options = {
    debug: boolean /* This is in the works, debug is not utilized neither functional. */
};

const webhook = new webhookClient.WebhookController(options);
```

## Executing a Webhook

You can send a webhook using the executeWebhook method of the WebhookController class:

```typescript
const url = 'https://discord.com/api/webhooks/id/token';
const data = {
    content: string, /* the text content */
    embeds: Embed, /* the discord embed */
    username: string /* the webhook name */
};

webhook.executeWebhook(url, data)
    .then((result) => {
        console.log('Webhook sent successfully:', result);
    })
    .catch((error) => {/*
        message: "Human Readable Error", 
        ratelimitType?: "Local" | "Global",
        duration?: "Human Readable Time"
     */
    });
```
## Handling Ratelimits And Errors

Discord by default, ratelimits you if you circumvent their limits but their handling is a bit baffling. For the sake of this, webhok™️ has a way easier way of handling them:

```typescript

let url /* . . . */
let data /* . . . */
webhook.executeWebhook(url, data)
    .then((result) => {
        console.log('Webhook sent successfully:', result);
    })
    .catch((error) => {/*
        message: "Human Readable Error", 
        ratelimitType?: "Local" | "Global",
        duration?: "Human Readable Time"
     */
    });
```
If `ratelimitType` and `duration` are absent, this indicates that the error received is a error outside of ratelimiting errors and it should be handled differently.