# Fase de construcción del Backend
FROM node:21.6.2 AS backend-builder

WORKDIR /app

COPY ./Backend /app/Backend

RUN npm install --prefix Backend

# Fase de construcción del Frontend
FROM node:21.6.2 AS frontend-builder

WORKDIR /app

COPY ./proyectoBDD2 /app/proyectoBDD2

WORKDIR /app/proyectoBDD2

RUN npm install -g @angular/cli
RUN npm install

# Fase final: Combina el Backend y el Frontend
FROM node:21.6.2

WORKDIR /app

COPY --from=backend-builder /app/Backend /app/Backend
COPY --from=frontend-builder /app/proyectoBDD2 /app/proyectoBDD2

# Comando para iniciar el backend y el frontend
CMD sh -c "(cd Backend && npm run dev) & (cd proyectoBDD2 && ./node_modules/.bin/ng serve --host 0.0.0.0)"
