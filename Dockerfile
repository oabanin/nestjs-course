FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --legacy-peer-deps
ADD . .
RUN npm run build
#RUN npm prune --omit=dev --legacy-peer-deps
CMD ["node", "./dist/src/main.js"]