# Web Programming HW#9

- HW6 web application: [link](https://scorecard-production.up.railway.app/)
- Please refer to hw6 description for features 
- Deployment step:
    - modify the base address of APIs to /api and set up api route in production environment
    - add the script of `build` command in `./package.json`: `"build": "cd frontend && yarn build",`
    - add the script of `deploy` command in `./package.json`: `"deploy": "cd backend && yarn deploy"`
    - add the script that runs the `deploy` command in `./backend/package.json`: `"deploy": "NODE_ENV=production babel-node src/server.js"`
    - server the output folder with backend
    - add a Dockerfile 
        ``` docker
        FROM node:16-alpine

        EXPOSE 4000

        COPY . /app
        WORKDIR /app

        RUN corepack enable
        RUN yarn install:prod
        RUN yarn build

        CMD ["yarn", "deploy"]
        ```
    - add a new project in Railway, and set the `MONGO_URL` in Variable
