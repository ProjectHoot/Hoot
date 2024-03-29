FROM node:14-alpine as builder

WORKDIR /app

COPY . .


RUN yarn install \
    --prefer-offline \
    --frozen-lockfile \
    --non-interactive \
    --production=false

RUN yarn build

RUN rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

FROM node:14-alpine

WORKDIR /app
COPY --from=builder /app  .
ENV LOTIDE=http://localhost:3333/api/unstable
ENV PROXY=true
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]
