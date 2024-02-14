import type {RequestHandler} from "@builder.io/qwik-city";
import {initializeRedisIfItIsUndefined} from "~/app/redis";

export const onRequest: RequestHandler = async ({env}) => {
    await initializeRedisIfItIsUndefined(env);
};