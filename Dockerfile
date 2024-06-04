#Dockerfile

# Use this image as the platform to build the app
FROM node:18-alpine AS external-website

# A small line inside the image to show who made it
LABEL Developers="Radek Roza"

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

COPY prisma ./prisma/
COPY .env ./

# Copy all local files into the image
COPY . .

# RUN chmod +wa /app/prisma/dev.db
# Clean install all node modules
RUN npm ci

# RUN npx prisma migrate dev --name init
# RUN npx prisma db seed
# Build SvelteKit app
RUN npm run build
RUN chown -R node:node ./prisma
RUN chmod -R 770 ./prisma

# Initialize a SQLlite database
# RUN npx prisma db seed
# Delete source code files that were used to build the app that are no longer needed
RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

# This is the command that will be run inside the image when you tell Docker to start the container
CMD ["node","build/index.js"]