FROM node:21-alpine
# make docker image from a base image (e.g for a node application we make an image from node docker image - we'll have node installed)

ENV PORT=5000
ENV MONGO_URI='mongodb://localhost:27017/FileFlow'
ENV APP_BASE_URL=http://localhost:5000
ENV SMTP_HOST=
ENV SMTP_PORT=
ENV MAIL_USER=
ENV MAIL_PASSWORD=

WORKDIR /home/backend_app
# making directory for app inside the container 
# RUN commands run inside the container 

COPY ./Backend/package*.json .
RUN npm install 
# Copy package.json and package-lock.json separately and install dependencies

COPY . .
# copy all files of current folder to /home/backend_app in container
# copy commands run in host 

EXPOSE $PORT

CMD ["node", "Backend/index.js"] 
# entry point command  