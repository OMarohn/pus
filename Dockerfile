FROM node:9.11.1-alpine

# install simple http server for serving static content
RUN npm install -g http-server

EXPOSE 8080
CMD [ "http-server", "dist" ]