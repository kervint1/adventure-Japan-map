# ベースイメージの指定
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npx", "ts-node", "src/index.ts"]