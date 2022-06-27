FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
  
RUN npm install -g nodemon

ENV PORT=8080
WORKDIR ./app
COPY . /app
COPY package.json .
RUN npm install
ENTRYPOINT ["node", "."]
