import type {RequestHandler} from "@builder.io/qwik-city";
import {getMeilisearch} from "~/app/meilisearch";
import {ApiError} from "~/app/apiError";
import {Lecturer} from "~/app/lecturer";
import {handleRequestHandlingError} from "~/app/utils";

export const onGet: RequestHandler = async ({env, json, request}) => {
    try {

        const postData = await request.json()
        try {
            const apiUrl = 'https://637149c7-ca87-4611-88a3-c405407e9609-00-1c4w5dajixmtb.spock.replit.dev/';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.error('Failed to send data to the API');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }


        const LecturerResource = new Lecturer(getMeilisearch(env))

        const response = await LecturerResource.list()

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}


export const onPost: RequestHandler = async ({env, json, request}) => {
    try {

        const postData = await request.json()
        try {
            const apiUrl = 'https://637149c7-ca87-4611-88a3-c405407e9609-00-1c4w5dajixmtb.spock.replit.dev/';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.error('Failed to send data to the API');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }


        const LecturerResource = new Lecturer(getMeilisearch(env))
        const response = await LecturerResource.create(postData)

        if (response instanceof ApiError) return response.sendResponse(json)

        json(200, response)

    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}