# Alternative Trader Pictures

Updates Trader icons to a much better looking alternative.

>Author  : jbs4bmx, revaxl

>Version : 3.0.0 (Supports SPT-AKI 1.2.0)



## Customizing
You can customize it too!

You can replace the traders with whatever pictures you like.

Follow these guidelines to make sure the new pictures fit the item frames within the game.
* Recommend square pictures but round can also be used
* Transparency is ok
* Recommended photo size = between 128x and 256x inclusive for best compatibility.
  * Pictures can be larger (512x, 1024x, etc.), but it requires more memory to store the larger file sizes while the game is running.
  * It can take longer for the game to load the images if there are a lot of large file sizes.
* Recommended filetype = jpg or png



### Example: Prapor --> ./res/59b91ca086f77469a81232e4.jpg (256x256)
* If you would like to replace this picture, rename the picture of your choosing to include the same string "59b91ca086f77469a81232e4" and copy it to the mod/res folder.
* If a file of the same name exists, click on "Yes" or "OK" to overwrite it.
* To change to png from jpg, and vice versa, you will need to edit the ./src/config.js file.

>For this example (Prapor), you would need to change the filetype of the picture in the line
```json
"extension": "jpg",
```
>to
```json
"extension": "png",
```