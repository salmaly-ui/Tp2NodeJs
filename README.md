# 🌦️ Météo Realtime — Dashboard WebSocket

Petite application temps réel affichant des données météo via WebSocket + Chart.js.

---

## 📁 Structure du projet

```
meteo-realtime/
├── app2.js           # Serveur WebSocket (Node.js)
├── index_tab.html    # Client web (tableau + graphiques)
├── temp.csv          # Données météo (12 mois)
├── package.json
└── node_modules/
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) + npm
- Un navigateur web moderne (Chrome, Firefox, Edge…)

---

##  Installation

### 1. Cloner / créer le dossier

```bash
mkdir meteo-realtime
cd meteo-realtime
```

### 2. Initialiser npm

```bash
npm init -y
```

### 3. Installer les dépendances

```bash
npm install ws csvtojson
npm install --save-dev nodemon
```

---

## ▶️ Lancement

### Démarrer le serveur WebSocket

```bash
node app2.js
```

> Le terminal doit afficher :
> `Serveur WebSocket actif : ws://localhost:5002`

>  Laisse ce terminal **ouvert** pendant toute l'utilisation.

### Ouvrir le client web

Ouvre le fichier `index_tab.html` directement dans le navigateur :

- **Double-clic** sur le fichier, ou
- Dans la barre d'adresse du navigateur :

```
file:///C:/chemin/vers/meteo-realtime/index_tab.html
```

>  Ne pas entrer `ws://localhost:5002` dans le navigateur — ce n'est pas une URL HTTP.

---
## Demonstration video

##  Fonctionnement

| Composant | Rôle |
|---|---|
| `app2.js` | Lit `temp.csv`, envoie 1 ligne JSON toutes les **3 secondes** via WebSocket |
| `index_tab.html` | Reçoit les données et met à jour le tableau + 2 graphiques Chart.js |

### Flux de données

```
temp.csv → app2.js → WebSocket (port 5002) → index_tab.html → Tableau + Graphiques
```

---

## 📄 Format du fichier CSV

Le fichier `temp.csv` doit avoir **exactement** ces en-têtes :

```csv
mois,tmax,tmin,pluie
Jan,18,8,6
Fev,20,9,5
...
```

>  Si les en-têtes sont incorrects, la page affichera `undefined`.

---

##  Dépannage

| Problème | Cause | Solution |
|---|---|---|
| `'nodemon' is not recognized` | nodemon non installé globalement | Utiliser `npx nodemon app2.js` ou `node app2.js` |
| `Cannot find module 'index.js'` | `"main"` dans `package.json` pointe vers `index.js` | Changer `"main": "index.js"` → `"main": "app2.js"` |
| `ERR_UNKNOWN_URL_SCHEME` | URL `ws://` entrée dans le navigateur | Ouvrir `index_tab.html`, pas l'URL WebSocket |
| `Connexion WebSocket fermée` | Serveur stoppé | Relancer `node app2.js` |
| Valeurs `undefined` dans le tableau | En-têtes CSV incorrects | Vérifier la 1ère ligne du CSV : `mois,tmax,tmin,pluie` |
| Port 5002 déjà utilisé | Autre processus sur ce port | Tuer le processus ou changer le port dans `app2.js` |

---

## Dépendances

| Package | Usage |
|---|---|
| `ws` | Serveur WebSocket côté Node.js |
| `csvtojson` | Lecture et conversion du fichier CSV |
| `nodemon` *(dev)* | Redémarrage auto du serveur lors des modifications |
| `Chart.js 2.8.0` | Graphiques (chargé via CDN dans le HTML) |

---

## 🔧 Extensions possibles

- [ ] Bouton **Pause / Reprendre** (ignorer les messages sans fermer la socket)
- [ ] Bouton **Reset** (vider tableau et graphiques)
- [ ] Utiliser une variable d'environnement pour le port (`process.env.PORT`)
- [ ] Limiter l'historique affiché (ex. : 30 derniers points)
- [ ] Déployer le WebSocket derrière un serveur HTTPS (port 443, protocole `wss://`)
