/*
    FileName: altTraderPics.js
    License: The Unlicense
    Copyright: jbs4bmx
    Website: https://discord.gg/sptaki
    Name: AlternativeTraderPics
    Description: Beautify your traders.
    Version: 2.2.2
    AkiVersion: 2.2.2
    Author(s): jbs4bmx, Revingly
*/

"use strict";

class TraderPics {
    constructor() {
        this.mod = "AlternativeTraderPics";
        Logger.info(`Loading: ${this.mod}`);
        this.funcptr = HttpServer.onRespond["IMAGE"];
        HttpServer.onRespond["IMAGE"] = this.getImage.bind(this);
    }

    //Adding Trader Images
    getImage(sessionID, req, resp, body) {
        const { extension, traders } = require('./config.json');
        const filepath = `${ModLoader.getModPath(this.mod)}res/`;

        // get the trader id from the request
        const traderId = req.url.split('/').pop().split('.').shift();

        // check if the trader id exist in the array
        if (traders.includes(traderId)) {
            HttpServer.sendFile(resp, `${filepath}${traderId}.${extension}`);
            return;
        }

        this.funcptr(sessionID, req, resp, body);
    }

}

module.exports.Mod = TraderPics;