FROM node:12-alpine
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM node:12-alpine
COPY --from=0 /app/dist /app/dist
COPY --from=0 /app/package.json /app/package.json
COPY --from=0 /app/package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install --only=prod
COPY credentials.json /app
ENV GOOGLE_APPLICATION_CREDENTIALS=credentials.json
CMD [ "npm", "run", "start:prod" ]
