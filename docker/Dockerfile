FROM node:18

WORKDIR /var/www/

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/HEEPOKE/Express-Prisma.git .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]