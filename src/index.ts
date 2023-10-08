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
                    if (response.status === 204){
                        resolve({
                            response : {
                                data: {
                                    message: "Successfully sent",
                                    payloadType: data.embeds == undefined || null ? "content" : "Embeds<Embed>"
                                }
                            } /* Soontm */
                        })
                    }
                }).catch((errorResponse: AxiosError) => {
                    const errorData : webhookError = errorResponse.response?.data as unknown as webhookError
                    console.log(errorData)
                    /* Just to be safe */
                    if (errorData.retry_after && errorResponse.response?.headers?.["x-ratelimit-reset-after"] && errorResponse.status == 429){
                        /* We know the individual is ratelimited 100% */
                        reject({
                            error: {
                                data: {
                                    message: errorData.message,
                                    ratelimitType: !errorData.global ? "Local" : "Global",
                                    duration: Helper.formatTime(errorResponse.response?.headers?.["x-ratelimit-reset-after"])
                                }
                            }
                        })
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
                        console.log("Please contact aggelos at this point")
                    }
                    // reject({
                    //     error: {
                    //         data: errorResponse.response?.data,
                    //         statusCode: errorResponse.code,
                    //     }
                    // })
                })
            })
        }
    }
}