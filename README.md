# PruebasGinih
QA Engineer - Ejercicios prácticos

------- Instalacion Dependencias-------
- Node.js 18 o superior
- npm 8+ o el que ya tengas en tu node.
Puedes verificar si tienes cypress con npx cypress verify o instala con npm install cypress --save-dev https://www.cypress.io/

------- dependecias del prouecto -------
```bash
npm install
## Ejecucion 
Para ejecurtarlo directamente EL ejercicio 1 puede usar : npx cypress run --spec "cypress/e2e/api/getUsers.cy.js"
Ejecucion de todos los test npm run test
Ejecucion de los de api npm run test:api 
o en caso de que prefiera probarlo por navegarodes(solo cambia el navegador) puede utilizar  npx cypress run --headed --browser chrome --spec "cypress/e2e/api/getUsers.cy.js"


