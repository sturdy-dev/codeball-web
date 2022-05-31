# syntax=docker/dockerfile:1

FROM node:18-bullseye AS web-builder
WORKDIR /web
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build --mode production


FROM node:18-bullseye AS web-runner
WORKDIR /web
COPY --from=web-builder /web/package.json /web/package.json
COPY --from=web-builder /web/node_modules /web/node_modules
COPY --from=web-builder /web/build /web/build
CMD ["node", "/web/build/index.js"]
