FROM node:lts as builder

WORKDIR /app

COPY . .

RUN npm install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN npm run build

RUN rm -rf node_modules && \
    NODE_ENV=production npm install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
ENV LOTIDE http://localhost:3333/api/unstable
ENV STATIC false
ENV PROXY true
EXPOSE 3000

CMD [ "npm", "run", "start" ]