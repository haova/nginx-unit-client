FROM nginx/unit:1.25.0-minimal

RUN apt update -y && \
  apt install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs \
  npm

WORKDIR /app
RUN npm install

# CMD [ "npm", "run", "test" ]