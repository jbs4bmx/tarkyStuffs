/*
    FileName: package.js
    License: The Unlicense
    Copyright: jbs4bmx
    Website: https://discord.gg/sptaki
    Name: MedicalAttention
    Description: Configure Meds to do what you want them to do.
    Version: 2.3.0
    Aki Version: >=2.2.0
    Author(s): jbs4bmx
*/
const {healMe} = require("./src/MedicalAttention.js");
module.exports.healer = new healMe();