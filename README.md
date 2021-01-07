# project
# ajouter la dépendance de boostrap
# ajouter la dépendance de jw-vue-pagination
# ajouter la dépendance de axios
```
npm i jw-vue-pagination

```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Description du projet
Cette application utilise les données de la SNCF concernant l'accompagnement de personnes à mobilité réduite dans les gares. Elle a pour but de bien visualiser où se trouve les besoins pour les personnes à mobilité réduite et à quelle période de l'année. Cette application peut par exemple permettre d'évaluer le cout investi par la SNCF pour aider les personnes à mobilité réduite ou bien de mieux répartir le budget, les matériels, les employés pour ces personnes.

Données : https://data.sncf.com/explore/dataset/accompagnement-pmr-gares/table/?sort=datemensuel

### Partie Données
Dans cette partie sont proposés 2 types de tableaux, le premier permettant de visualiser le nombre d'aides aux personnes à mobilité réduite par gare et par période. Le deuxième type de tableau permet quant à lui de comparer le nombre d'aides par rapport au nombre total de voyageurs par gare et par année. L'utilisateur a la possibilité de réaliser une recherche en entrant le nom d'une gare ou d'une ville ainsi que d'appliquer différents filtres.

### Partie Carte
Cette partie permet de visualiser les villes qui apportent le plus d'aide aux personnes à mobilités réduites. En effet, la carte a été réalisée avec la bibliothèques Leaflet et l'API Adresse de https://geo.api.gouv.fr/adresse a été utilisée pour récupérer les données geojson des gares. Le nombre d'aides des gares d'une même ville ont été fusionnés pour ne pas surcharger la carte d'information. En effet, nous avons choisi d'afficher le nom des villes plutôt que des gares pour que la carte reste lisible.

### Partie Graphes
Pour la partie graphique, nous avons utilisé "VueApexCharts" pour l'affichage,
1- le premier graphique est une représentation du nombre moyen d'aides fournies par les stations par mois tout au long de l'année. Cela nous a permis d'analyser à quel moment de l'année le nombre d'aides est élevé ou faible. Cela a été jugé possible grâce à la méthode Avg que l'api nous a suggéré d'utiliser pour l'analyse.

2- Pour le deuxième graphique, nous avons voulu faire un pourcentage du nombre de personnes à mobilité réduite par rapport au nombre total de passages. Pour obtenir le nombre total de passages de chaque personne par an, nous avons utilisé l'ensemble de données #frequentation et avons ensuite fait une règle de trois entre le nombre de passages et le nombre d'assistance fournie.
Données : https://data.sncf.com/explore/dataset/frequence-gare/table/?sort=-annee
