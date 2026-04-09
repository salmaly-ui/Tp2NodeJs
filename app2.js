const WebSocketServer = require("ws").Server;
const CSVToJSON = require("csvtojson");

/*
  Ce serveur :
  1) écoute sur le port 5002
  2) quand un client se connecte, lit temp.csv
  3) envoie une ligne JSON toutes les 3 secondes
*/

const wss = new WebSocketServer({ port: 5002 });

console.log("Serveur WebSocket actif : ws://localhost:5002");

wss.on("connection", async function (ws) {
  console.log("Client connecté");

  try {
    // Étape A : lire le CSV -> obtenir un tableau d'objets JSON
    const data = await CSVToJSON().fromFile("temp.csv");

    // Exemple de data[0] possible :
    // { mois: "Jan", tmax: "18", tmin: "8", pluie: "6" }

    let i = 0;

    // Étape B : envoyer une ligne toutes les 3 secondes
    const timer = setInterval(function () {
      if (i < data.length) {
        ws.send(JSON.stringify(data[i]));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 3000);

    // Étape C : arrêter le timer si le client ferme la connexion
    ws.on("close", function () {
      clearInterval(timer);
      console.log("Client déconnecté");
    });

  } catch (err) {
    console.log("Erreur serveur :", err);
  }
});