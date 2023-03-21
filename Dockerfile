FROM node:18
WORKDIR /usr/app
COPY . .
RUN npm config set @innodep:registry=https://npm-20-41-97-34.vurix.kr/
RUN npm install --force
RUN npm run build

FROM nginx:latest
COPY --from=0 /usr/app/nginx/default.conf /etc/nginx/conf.d/
COPY --from=0 /usr/app/build /usr/share/nginx/html/smart-search/app/
