# backend - run commands into api-tests folder on terminal
npm install
npm run customerAppApiTest --environment='http://localhost:3001'
# frontend - run commands into ui-tests folder on terminal
npm install
npm run customerAppUiTest --environment='http://localhost:3000' --browser='chrome'
