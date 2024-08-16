FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENV PDF_STORAGE_PATH=/ticket_files

CMD ["npm", "run", "start"]