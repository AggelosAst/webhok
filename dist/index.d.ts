import { Options, webhookOptions, webhookExecution } from "./types";
export declare namespace webhookClient {
    class WebhookController {
        private readonly options;
        constructor(options: Options);
        executeWebhook(url: string, data: webhookOptions): Promise<webhookExecution>;
    }
}
