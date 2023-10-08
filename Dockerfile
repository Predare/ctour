#syntax=docker/dockerfile:1

FROM node:18-alpine
# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

ENV NODE_ENV=development

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# install python
RUN apk add python3
RUN python -m ensurepip --upgrade

# install keygen for meilisearch
RUN python -m pip install requests
RUN python -m pip install https://github.com/Predare/meilisearch_api_key_gen/tarball/master --upgrade
RUN python -m pip install click
    
COPY package*.json ./

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm install


# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=3000

CMD ["npm", "run", "dev"]