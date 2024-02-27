import type {RedisClientType} from 'redis';
import {createClient} from 'redis';
import type {EnvGetter} from "@builder.io/qwik-city/middleware/request-handler";

let _redis: RedisClientType | undefined

export function redis() {
    return _redis as RedisClientType
}

export async function initializeRedisIfItIsUndefined(env: EnvGetter) {
    // Making possible for the program to exit after building static pages
    return ":)"
    if (process.argv.includes("build")) {
        return console.log("skipping initializing redis, because build process was detected in arguments")
    }

    if (!_redis) {
        console.log("redis init")
        const redis: RedisClientType = createClient({
            url: env.get("REDIS_URL")
        });


        redis.on('error', err => console.log('Redis Client Error', err));
        await redis.connect();

        _redis = redis
    }
}

