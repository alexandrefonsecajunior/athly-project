FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g sirv-cli
EXPOSE 5173
CMD ["sirv", "dist", "--port", "5173", "--host"]
