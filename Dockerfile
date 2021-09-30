FROM node:14.0-alpine
ENV NODE_ENV=development

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json .
#RUN npm i -g yarn pnpm

COPY --chown=node:node . .
RUN npm install -g nodemon && npm install
EXPOSE 8000

USER node

CMD ["npm","run","start"]
