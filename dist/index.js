"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookClient = void 0;
const axios_1 = __importDefault(require("axios"));
var webhookClient;
(function (webhookClient) {
    class WebhookController {
        options;
        constructor(options) {
            this.options = options;
        }
        async executeWebhook(url, data) {
            return new Promise(async (resolve, reject) => {
                await axios_1.default.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "EasyWebhook_V1"
                    },
                    responseType: "json"
                }).then((response) => {
                    resolve({
                        response: "Testing"
                    });
                }).catch((errorResponse) => {
                    reject({
                        error: {
                            data: errorResponse.response?.data,
                            statusCode: errorResponse.code,
                            status: errorResponse.status
                        }
                    });
                });
            });
        }
    }
    webhookClient.WebhookController = WebhookController;
})(webhookClient || (exports.webhookClient = webhookClient = {}));
