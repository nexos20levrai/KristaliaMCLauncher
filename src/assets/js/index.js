/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

'use strict';
const { ipcRenderer } = require('electron');
import { config } from './utils.js';

let dev = process.env.NODE_ENV === 'dev';


class Splash {
    constructor() {
        this.splash = document.querySelector(".splash");
        this.splashMessage = document.querySelector(".splash-message");
        this.splashAuthor = document.querySelector(".splash-author");
        this.message = document.querySelector(".message");
        this.progress = document.querySelector("progress");
        document.addEventListener('DOMContentLoaded', () => this.startAnimation());
    }
    async startAnimation() {
        config.GetConfig().then(res => {
            let splashes = [
                      { "message": "Chargement en cours... Patience.", "author": "NeXoS_20" },
                      { "message": "L'attente en vaut la peine.", "author": "NeXoS_20" },
                      { "message": "#On aime les chargements", "author": "NeXoS_20" },
                      { "message": "Dans l'attente réside la promesse.", "author": "NeXoS_20" },
                      { "message": "Chargement... Le silence du numérique.", "author": "NeXoS_20" },
                      { "message": "Le temps d'attente révèle le caractère.", "author": "NeXoS_20" },
                      { "message": "La magie du chargement.", "author": "NeXoS_20" },
                      { "message": "Chargemeeeeeeeent", "author": "NeXoS_20" },
                      { "message": "KristaliaMC > Paladium", "author": "NeXoS_20" },
                      { "message": "Tu as les crampes ?", "author": "NeXoS_20" },
                      { "message": "Tu passes un bon moment ?", "author": "NeXoS_20" },
                      { "message": "Pssssss.....", "author": "NeXoS_20" },
                      { "message": "Si tu vois ce message, va MP scarmyck sur Discord !", "author": "NeXoS_20" },
                      { "message": "Si tu vois ce message, va MP nexos20levrai sur Discord !", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 ans", "author": "NeXoS_20" },
                      { "message": "Essaye de ne pas mourir.", "author": "Gab1.off" },
                      { "message": "Bonne partie à toi !", "author": "Gab1.off" },
                      { "message": ".", "author": "Gab1.off" },
                      { "message": "Temps d'attente estimé : 10 ans", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 an", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : longtemps", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 seconde", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 siècles", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 heure", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 24 heures", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 jour", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 jours", "author": "NeXoS_20" },
                      { "message": "Apprends à jouer", "author": "NeXoS_20" },
                      { "message": "Étudie Le Seigneur des Anneaux", "author": "NeXoS_20" },
                      { "message": "Va faire tes devoirs !", "author": "NeXoS_20" },
                      { "message": "Range ta chambre !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon stuff !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon stuff ?", "author": "NeXoS_20" },
                      { "message": "Comment ça mon reuf !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon reuf ?", "author": "NeXoS_20" },
                      { "message": "Tu passes un moment cocooning ?", "author": "NeXoS_20" },
                      { "message": "Zut de flûte !", "author": "NeXoS_20" },
                      { "message": "Box Box", "author": "NeXoS_20" },
                      { "message": "Second poteau Pavard !!!!", "author": "NeXoS_20" },
                      { "message": "Il est lent ce lait", "author": "NeXoS_20" },
                      { "message": "C'est quoi un classic burger ?", "author": "NeXoS_20" },
                      { "message": "C'est un burger mais classique", "author": "NeXoS_20" },
                      { "message": "On va bien renta le gâteau", "author": "NeXoS_20" },
                      { "message": "Fraise, framboise, myrtille", "author": "NeXoS_20" },
                      { "message": "De nos jours, les légumes sont hyper tendus", "author": "NeXoS_20" },
                      { "message": "Éduque des farfadets malicieux", "author": "NeXoS_20" },
                      { "message": "Prépare un farfadet fourbe de malices", "author": "NeXoS_20" },
                      { "message": "ONE ETERNITY LATER !", "author": "Gab1.off" },
                      { "message": "Gonflage des cochons volants", "author": "Gab1.off" },
                      { "message": "Génération des vaches en diamants", "author": "Gab1.off" },
                      { "message": "Affûtage des pioches en mousse", "author": "Gab1.off" },
                      { "message": "Test des portes secrètes... ou pas si secrètes", "author": "Gab1.off" },
                      { "message": "Renforcement des abris anti-Creepers", "author": "Gab1.off" },
                      { "message": "Apprivoisement des Creepers pour qu'ils soient moins explosifs", "author": "Gab1.off" },
                      { "message": "Entraînement des vaches à sauter par-dessus la lune", "author": "Gab1.off" },
                      { "message": "Réparation des bugs où les poules pondent des warden", "author": "Gab1.off" },
                      { "message": "Chasse aux trésors dans les donjons perdus", "author": "Gab1.off" },
                      { "message": "Exercice de yoga pour les zombies", "author": "Gab1.off" },
                      { "message": "Formation des golems de fer à la boxe", "author": "Gab1.off" },
                      { "message": "Réglage de la météo pour un soleil éternel... ou de la pluie, selon notre humeur.", "author": "Gab1.off" },
                      { "message": "Formation des zombies à danser la Macarena... échec total", "author": "Gab1.off" },
                      { "message": "Éducation des pingouins pour qu'ils nagent dans le désert", "author": "Gab1.off" },
                      { "message": "Chasse aux tortues ninjas du désert", "author": "Gab1.off" },
                      { "message": "Cours accéléré de nage synchronisée pour les poissons", "author": "Gab1.off" },
                      { "message": "Chargement en cours... Patience.", "author": "NeXoS_20" },
                      { "message": "L'attente en vaut la peine.", "author": "NeXoS_20" },
                      { "message": "#On aime les chargements", "author": "NeXoS_20" },
                      { "message": "Dans l'attente réside la promesse.", "author": "NeXoS_20" },
                      { "message": "Chargement... Le silence du numérique.", "author": "NeXoS_20" },
                      { "message": "Le temps d'attente révèle le caractère.", "author": "NeXoS_20" },
                      { "message": "La magie du chargement.", "author": "NeXoS_20" },
                      { "message": "Chargemeeeeeeeent", "author": "NeXoS_20" },
                      { "message": "KristaliaMC > Paladium", "author": "NeXoS_20" },
                      { "message": "Tu as les crampes ?", "author": "NeXoS_20" },
                      { "message": "Tu passes un bon moment ?", "author": "NeXoS_20" },
                      { "message": "Pssssss.....", "author": "NeXoS_20" },
                      { "message": "Si tu vois ce message, va MP scarmyck sur Discord !", "author": "NeXoS_20" },
                      { "message": "Si tu vois ce message, va MP nexos20levrai sur Discord !", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 ans", "author": "NeXoS_20" },
                      { "message": "Essaye de ne pas mourir.", "author": "Gab1.off" },
                      { "message": "Bonne partie à toi !", "author": "Gab1.off" },
                      { "message": ".", "author": "Gab1.off" },
                      { "message": "Temps d'attente estimé : 10 ans", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 an", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : longtemps", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 seconde", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 siècles", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 heure", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 24 heures", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 1 jour", "author": "NeXoS_20" },
                      { "message": "Temps d'attente estimé : 100 jours", "author": "NeXoS_20" },
                      { "message": "Apprends à jouer", "author": "NeXoS_20" },
                      { "message": "Étudie Le Seigneur des Anneaux", "author": "NeXoS_20" },
                      { "message": "Va faire tes devoirs !", "author": "NeXoS_20" },
                      { "message": "Range ta chambre !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon stuff !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon stuff ?", "author": "NeXoS_20" },
                      { "message": "Comment ça mon reuf !", "author": "NeXoS_20" },
                      { "message": "Comment ça mon reuf ?", "author": "NeXoS_20" },
                      { "message": "Tu passes un moment cocooning ?", "author": "NeXoS_20" },
                      { "message": "Zut de flûte !", "author": "NeXoS_20" },
                      { "message": "Box Box", "author": "NeXoS_20" },
                      { "message": "Second poteau Pavard !!!!", "author": "NeXoS_20" },
                      { "message": "Il est lent ce lait", "author": "NeXoS_20" },
                      { "message": "C'est quoi un classic burger ?", "author": "NeXoS_20" },
                      { "message": "C'est un burger mais classique", "author": "NeXoS_20" },
                      { "message": "On va bien renta le gâteau", "author": "NeXoS_20" },
                      { "message": "Fraise, framboise, myrtille", "author": "NeXoS_20" },
                      { "message": "De nos jours, les légumes sont hyper tendus", "author": "NeXoS_20" },
                      { "message": "Éduque des farfadets malicieux", "author": "NeXoS_20" },
                      { "message": "Prépare un farfadet fourbe de malices", "author": "NeXoS_20" },
                      { "message": "ONE ETERNITY LATER !", "author": "Gab1.off" },
                      { "message": "Gonflage des cochons volants", "author": "Gab1.off" },
                      { "message": "Génération des vaches en diamants", "author": "Gab1.off" },
                      { "message": "Affûtage des pioches en mousse", "author": "Gab1.off" },
                      { "message": "Test des portes secrètes... ou pas si secrètes", "author": "Gab1.off" },
                      { "message": "Renforcement des abris anti-Creepers", "author": "Gab1.off" },
                      { "message": "Apprivoisement des Creepers pour qu'ils soient moins explosifs", "author": "Gab1.off" },
                      { "message": "Entraînement des vaches à sauter par-dessus la lune", "author": "Gab1.off" },
                      { "message": "Réparation des bugs où les poules pondent des warden", "author": "Gab1.off" },
                      { "message": "Chasse aux trésors dans les donjons perdus", "author": "Gab1.off" },
                      { "message": "Exercice de yoga pour les zombies", "author": "Gab1.off" },
                      { "message": "Formation des golems de fer à la boxe", "author": "Gab1.off" },
                      { "message": "Réglage de la météo pour un soleil éternel... ou de la pluie, selon notre humeur.", "author": "Gab1.off" },
                      { "message": "Formation des zombies à danser la Macarena... échec total", "author": "Gab1.off" },
                      { "message": "Éducation des pingouins pour qu'ils nagent dans le désert", "author": "Gab1.off" },
                      { "message": "Chasse aux tortues ninjas du désert", "author": "Gab1.off" },
                      { "message": "Cours accéléré de nage synchronisée pour les poissons", "author": "Gab1.off" },
                      { "message": "Synchronisation des horloges internes...", "author": "Gab1.off" },
                      { "message": "Ajout de zombies danseurs de cha-cha-cha", "author": "Gab1.off" },
                      { "message": "Réglage des licornes pour qu'elles brillent plus", "author": "Gab1.off" },
                      { "message": "Préparation d'un thé virtuel pour la patience", "author": "Gab1.off" },
                      { "message": "Polissage des cristaux magiques", "author": "Gab1.off" },
                      { "message": "Test des tapis volants pour les bugs", "author": "Gab1.off" },
                      { "message": "Mise à jour des dragons cracheurs de feu", "author": "Gab1.off" }        

            ];
            let splash = splashes[Math.floor(Math.random() * splashes.length)];
        this.splashMessage.textContent = splash.message;
        this.splashAuthor.children[0].textContent = "@" + splash.author;
        })
        
        
        await sleep(100);
        document.querySelector("#splash").style.display = "block";
        await sleep(500);
        this.splash.classList.add("opacity");
        await sleep(500);
        this.splash.classList.add("translate");
        this.splashMessage.classList.add("opacity");
        this.splashAuthor.classList.add("opacity");
        this.message.classList.add("opacity");
        await sleep(2500);
        this.maintenanceCheck();
    }

    async maintenanceCheck() {
        if (dev) return this.startLauncher();
        config.GetConfig().then(res => {
            if (res.maintenance) return this.shutdown(res.maintenance_message);
            else this.checkUpdate();
        }).catch(e => {
            console.error(e);
            return this.shutdown("Pas d'accès Internet");
        })
    }

    async checkUpdate() {
        this.setStatus(`Recherche de mise à jour...`);
        ipcRenderer.send('update-app');

        ipcRenderer.on('updateAvailable', () => {
            this.setStatus(`Mise à jour disponible !`);
            this.toggleProgress();
            ipcRenderer.send('start-update');
        })

        ipcRenderer.on('download-progress', (event, progress) => {
            this.setProgress(progress.transferred, progress.total);
        })

        ipcRenderer.on('update-not-available', () => {
            this.startLauncher();
        })
    }


    startLauncher() {
        this.setStatus(`Démarrage du launcher`);
        ipcRenderer.send('main-window-open');
        ipcRenderer.send('update-window-close');
    }

    shutdown(text) {
        this.setStatus(`${text}<br>Arrêt dans 5s`);
        let i = 4;
        setInterval(() => {
            this.setStatus(`${text}<br>Arrêt dans ${i--}s`);
            if (i < 0) ipcRenderer.send('update-window-close');
        }, 1000);
    }

    setStatus(text) {
        this.message.innerHTML = text;
    }

    toggleProgress() {
        if (this.progress.classList.toggle("show")) this.setProgress(0, 1);
    }

    setProgress(value, max) {
        this.progress.value = value;
        this.progress.max = max;
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

new Splash();