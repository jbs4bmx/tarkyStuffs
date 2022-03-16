/*
	FileName: package.js
	License: The Unlicense
	Copyright: jbs4bmx
	Website: https://discord.gg/sptaki
	Name: SuperIFAK
	Description: SuperIFAK mod by xKyle now ported to SPT-AKI with additional med features.
	Version: 2.3.0
    Aki Version: >=2.2.0
	Author(s): jbs4bmx
*/
const { ifak } = require("./src/ifak.js");
module.exports.ifak = new ifak();