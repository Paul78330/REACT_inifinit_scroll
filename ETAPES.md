### Etapes & instructions

##### Création du Hook personnalisé

1- 	Installer vite > npm install -g create-vite

2-	Créer un projet avec vite > npx create-vite mon-projet

* **Performance et temps de démarrage** : Vite a un temps de démarrage beaucoup plus rapide que `create-react-app` grâce à son utilisation de l'ESM (ES Modules) pour le développement. Il ne recompile que le code qui a changé plutôt que de recompiler tout le projet, ce qui rend le rechargement à chaud beaucoup plus rapide.
* **Configuration** : `create-react-app` est livré avec une configuration préétablie qui est cachée par défaut (mais peut être éjectée si nécessaire). D'un autre côté, Vite offre une plus grande flexibilité en termes de configuration. Il est plus facile de personnaliser la configuration de build et de développement avec Vite.
* **Prise en charge des fonctionnalités modernes** : Vite prend en charge les fonctionnalités modernes comme les modules ES natifs, l'importation de fichiers de type non-JS (comme les fichiers .vue), et le Hot Module Replacement (HMR) out-of-the-box.
* **Compatibilité avec les anciens navigateurs** : `create-react-app` utilise Babel pour la transpilation, ce qui le rend plus compatible avec les anciens navigateurs. Vite, en revanche, s'appuie sur les modules ES natifs pour le développement, ce qui signifie qu'il ne fonctionnera pas sur les anciens navigateurs qui ne prennent pas en charge les modules ES.
* **Taille du bundle** : Vite utilise Rollup pour le bundling en production, qui produit généralement des bundles plus petits que Webpack, utilisé par `create-react-app`.

En résumé, si vous voulez un démarrage rapide et une configuration facile, `create-react-app` est un bon choix. Si vous voulez une plus grande flexibilité, une meilleure performance de développement et que vous êtes prêt à gérer plus de configuration, alors Vite pourrait être un meilleur choix.

-3- 	Créer un compte sur Unsplash : https://api.unsplash.com

4-	Placer la clé dans une constate dans le fichier .env

5-	Créer notre hook personnalisé usePhotos qui va nous permettre à appeler l'API afin de récupérer les photos > /hooks/usePhotos.js

##### Affichage des photos et du loader

6-	Editer /components/List.js

7-	Mettre en place l'observer dans /components/List.js

8-	Gérer la recherche dans /components/List.js et ajouter un useEffect dans /hooks/usePhoto

9-	Gerer les erreur possibles dans /hooks/usePhoto et /components/List.js
