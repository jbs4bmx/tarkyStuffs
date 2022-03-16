# Required Steps before Building
Run Server, Launcher, and then EFT at least once prior to referencing the dll files for this project.

# Requires following assemblies for reference:
1. Assembly-CSharp.dll
   - Find in "{SPT_Folder}\EscapeFromTarkov_Data\Managed".
2. Aki.Common.dll
   - Part of the SPT modules for the launcher. Find in "{SPT_Folder}\EscapeFromTarkov_Data\Managed".
3. BepInEx.dll
   - Part of the BepInEx Harmony Patcher. Find in "{SPT_Folder}\BepInEx\core"

Requires following files for SPT to load the module:
1. Key.snk
   - This is something that you must build on your own.