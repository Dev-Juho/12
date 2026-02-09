FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3000

RUN npm install

EXPOSE 5001

CMD ["npm", "run", "start"]