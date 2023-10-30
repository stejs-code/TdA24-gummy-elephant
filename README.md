# Tour de App - Generic boilerplate

Šablona pro vývoj aplikace pro Tour de App obsahující pouze GitHub Action s vytvořením a nahráním výstupu.
Je potřeba přidat Dockerfile, který na základě zdrojového kódu aplikace vytvoří docker image vaší aplikace. 
Aplikace může běžet na libovolném portu zpřístupněném pomocí příkazu `EXPOSE PORT_NUMBER` ve vaší Dockerfile.

## Fastify Server

This app has a minimal [Fastify server](https://fastify.dev/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)
