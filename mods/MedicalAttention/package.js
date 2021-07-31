/* package.js
       license: The Unlicense
     copyright: jbs4bmx
       website: https://www.guilded.gg/senkospub
          name: MedicalAttention
   description: Configure Meds to do what you want them to do.
       version: 1.0.0
     author(s): jbs4bmx
*/
const {healMe} = require("./src/MedicalAttention.js");
module.exports.healer = new healMe();