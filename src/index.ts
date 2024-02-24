import Axios, {AxiosResponse, AxiosError} from "axios"
import axios from "axios";
import {Options, webhookOptions, webhookExecution, webhookError} from "./types"
import {Helper} from "./helper";

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
                    if (response.status === 201){
                        resolve({
                            response : {
                                data: {
                                    message: "Successfully sent",
                                    payloadType: data.embeds == undefined || null ? "content" : "Embed",
                                    input: JSON.stringify(data)
                                }
                            } /* Soontm */
                        })
                    }
                }).catch((errorResponse: AxiosError) => {
                    const errorData : webhookError = errorResponse.response?.data as unknown as webhookError
                    /* Just to be safe */
                    if (errorData.retry_after && errorResponse.response?.headers?.["x-ratelimit-reset-after"] && errorResponse.status == 429){
                        /* We know the individual is ratelimited 50% */
                        reject({
                            error: {
                                data: {
                                    message: errorData.message,
                                    ratelimitType: !errorData.global ? "Local" : "Global",
                                    duration: Helper.formatTime(errorResponse.response?.headers?.["x-ratelimit-reset-after"])
                                }
                            }
                        })
                        /* We know the individual is ratelimited 100% */
                    } else if (errorData.code !== undefined && errorData.code === 0 && errorData.message.includes("blocked")){
                        reject({
                            error: {
                                data: {
                                    message: errorData.message,
                                    ratelimitType: "Global + Aggressive (IP Ban mode)",
                                    duration: "Unknown"
                                }
                            }
                        })
                    } else {
                        reject({
                            error: {
                                data: {
                                    message: errorData.message,
                                }
                            }
                        })
                    }
                })
            })
        }
    }
}
