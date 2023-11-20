import {AbortMessage} from "@builder.io/qwik-city/middleware/request-handler";

export class ApiError extends Error {
    constructor(
        public code: number,
        public message: string,
        public log: boolean = false
    ) {
        super(message)
    }

    sendResponse(json: (statusCode: number, data: any) => AbortMessage){
        json(this.code, {
            code: this.code,
            message: this.message
        })
    }
}