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
                { "message": "Tu a les cramptés ?", "author": "NeXoS_20" },
                { "message": "Tu passe un bon moment ?", "author": "NeXoS_20" },
                { "message": "Pssssss.....", "author": "NeXoS_20" },
                { "message": "Si tu vois ce message va mp scarmyck sur discord !", "author": "NeXoS_20" },
                { "message": "Si tu vois ce message va mp nexos20levrai sur discord !", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 100 ans", "author": "NeXoS_20" },
                { "message": "Essaye de pas mourrir .", "author": "Gab1.off" },
                { "message": "Bonne partie à toi ! .", "author": "Gab1.off" },
                { "message": ".", "author": "Gab1.off" },
                { "message": "Temps d'attente estimé :  10 ans", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 1 ans", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : longtemps", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 1 seconde", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 100 siècles", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 1 heure", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 24 heures", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 1 jour", "author": "NeXoS_20" },
                { "message": "Temps d'attente estimé : 100 jours", "author": "NeXoS_20" },
                { "message": "ONE ETERNITY LATER !", "author": "Gab1.off" },
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
        await sleep(1000);
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