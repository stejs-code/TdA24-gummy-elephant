# Tour de App - Generic boilerplate

Šablona pro vývoj aplikace pro Tour de App obsahující pouze GitHub Action s vytvořením a nahráním výstupu.
Je potřeba přidat Dockerfile, který na základě zdrojového kódu aplikace vytvoří docker image vaší aplikace. 
Aplikace může běžet na libovolném portu zpřístupněném pomocí příkazu `EXPOSE PORT_NUMBER` ve vaší Dockerfile.
