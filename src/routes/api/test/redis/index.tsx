import {component$} from "@builder.io/qwik";
import {routeLoader$} from "@builder.io/qwik-city";
import {initializeRedisIfItIsUndefined, redis} from "~/app/redis";

export default component$(() => {
    const redis = useRedis()
    return <h1>{redis.value}</h1>
})


export const useRedis = routeLoader$(async (ev) => {
    await initializeRedisIfItIsUndefined(ev.env)
    await redis().set("elephant", "gummy")
    return await redis().get("elephant")
})