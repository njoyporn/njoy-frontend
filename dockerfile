FROM node:23.3.0-alpine3.20

ENV TZ="Europe/Berlin"

WORKDIR /njoy-frontend

COPY ["package.json", "./"]
EXPOSE 8080 

RUN npm install
COPY . .
RUN npm run build

CMD ["npm", "run", "prod"]