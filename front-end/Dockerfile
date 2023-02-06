FROM node:16
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html
WORKDIR /
RUN rm -rf /app
#COPY . ./app
#ENV PORT 4010
#EXPOSE 4010
#CMD ["npm", "run", "start"]