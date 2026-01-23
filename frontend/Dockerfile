FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

RUN printf '#!/bin/sh\n\
echo "\n\
   Frontend Ready! Access it at: http://localhost:5173 \n\
"\n' > /docker-entrypoint.d/99-print-url.sh \
 && chmod +x /docker-entrypoint.d/99-print-url.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]