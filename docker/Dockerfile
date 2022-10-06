FROM node:12.18.4

# Install Basic Dev Machine
RUN apt-get update && DEBIAN_FRONTEND="noninteractive" 
RUN apt-get install -y \
    build-essential \
    apt-utils \
    git \
    curl

################################################################################

WORKDIR /home
COPY . .

################################################################################

# Configure Running App
EXPOSE 3000/tcp
ENV PUBLIC_PATH_HOST=localhost

################################################################################

# Build app
RUN cd /home/unity-core && yarn
RUN cd /home && npm install
ENTRYPOINT yarn start
