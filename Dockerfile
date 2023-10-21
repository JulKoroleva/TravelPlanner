# Используем официальный образ Node.js для сборки
FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Отдельный этап для serve
FROM node:14-alpine

WORKDIR /usr/src/app

# Устанавливаем serve глобально
RUN npm install -g serve

# Копируем только необходимые файлы, включая собранное приложение
COPY --from=builder /usr/src/app/build ./build

EXPOSE 80

# Запускаем serve для предоставления собранного приложения
CMD ["serve", "-s", "build", "-l", "2999"]