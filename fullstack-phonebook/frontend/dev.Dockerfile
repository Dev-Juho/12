FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:5001

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]