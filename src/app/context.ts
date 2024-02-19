import type {EnvGetter, RequestEventBase} from "@builder.io/qwik-city/middleware/request-handler";
import {MeiliSearch} from "meilisearch";
import {redis} from "~/app/redis"
import type {RedisClientType} from "redis";
import {isBrowser} from "@builder.io/qwik/build";

if (isBrowser) console.log("!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!!!ATTENTION CITIZEN!!")

export class Context {
    public meili: MeiliSearch
    public redis: RedisClientType

    constructor(ev: Pick<RequestEventBase, "env">) {
        this.meili = Context.initMeilisearch(ev)
        this.redis = redis()
    }

    static initMeilisearch({env}: { env: EnvGetter }) {
        return new MeiliSearch({
        host: 'http://localhost:7700',
        apiKey: env.get("MEILISEARCH_MASTER_KEY")
    })

        // return undefined as unknown as Client
    }
}
