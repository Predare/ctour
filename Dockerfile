#syntax=docker/dockerfile:1

FROM node:18-alpine
# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

ENV NODE_ENV=development

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

COPY package*.json ./

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install


# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

CMD ["npm", "run", "dev"]