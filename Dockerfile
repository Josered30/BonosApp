FROM node:14.1-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19-alpine as production-stage
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
CMD /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'