## Lancer l'application sans Docker
Se placer à la racine du projet
### Côté front
```
npm install -g @angular/cli
cd front/
npm install
npm start
```

### Côté back
```
cd back/
npm install
npm start
```

## Lancer l'application avec Docker et Docker Compose
Se placer à la racine du projet
```
docker-compose build
docker-compose up
```

## Avec et sans Docker
Le serveur GraphQL est disponible sur le port 3000
L'application Angular est disponible sur le port 4200

Toutes les briques fonctionnent avec le live reload.
