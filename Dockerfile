FROM node:14.0-alpine

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json .
#RUN npm i -g yarn pnpm
RUN npm install

COPY --chown=node:node . .

EXPOSE 8000

USER node

CMD ["npm","run","start"]
