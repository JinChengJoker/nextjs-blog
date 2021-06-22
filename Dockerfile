FROM node:14.17.0 as build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]


FROM nginx:1.20.1

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf