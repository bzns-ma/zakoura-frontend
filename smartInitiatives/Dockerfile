FROM node:latest AS frontend

### STAGE 1: Build ###
# set working directory in the container i'm calling it app
WORKDIR /app
# copying the local code (evrything you see in the left) into /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
####Stage 2
#FROM nginx
#WORKDIR /usr/share/nginx/html
#RUN rm -rf ./*
#COPY --from=frontend /app/dist .
#COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
