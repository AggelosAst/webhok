import Axios, {AxiosResponse, AxiosError} from "axios"
import axios from "axios";
import {Options, webhookOptions, webhookExecution} from "./types"
interface webhookController {
    readonly options : Options
    executeWebhook: (url: string, data: webhookOptions) => Promise<webhookExecution>
}
export namespace webhookClient {
    export class WebhookController implements webhookController {
        readonly options: Options

        public constructor(options: Options) {
            this.options = options
        }

        public async executeWebhook(url: string, data: webhookOptions): Promise<webhookExecution> {
            return new Promise<webhookExecution>(async(resolve, reject) => {
                await axios.post(url, data, {
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "EasyWebhook_V1"
                    },
                    responseType: "json"
                }).then((response: AxiosResponse) => {
                    resolve({
                        response : "Testing" /* Soontm */
                    })
                }).catch((errorResponse: AxiosError) => {
                    reject({
                        error: {
                            data: errorResponse.response?.data,
                            statusCode: errorResponse.code,
                            status: errorResponse.status
                        }
                    })
                })
            })
        }
    }
}