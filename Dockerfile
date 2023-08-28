FROM node:20.5.0-alpine
WORKDIR /app
COPY . /app
RUN npm install
CMD [ "node", "server.js" ]
EXPOSE 3000
