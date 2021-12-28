# Test001
- New Mod Make
- Add to existing AKI Configuration.
- Successfully enter, survive gunfights, and extract from raid.
- Test...

Customs//High//Easy
- Recklessly running around with intent to get shot.
Armor Stat: 1500 >> 1500
- Successfully extracted from RAID

SUCCESS! >> ERROR: SUCCESS IS FALSE POSITIVE!
- RAID successful due to oversight.
    - Was also running Bandana of Protection mod at same time without realizing it.



# Test002
- Edit Mod
- Add to existing AKI Configuration.
- Test...

Customs//High//Easy
- Recklessly running around with intent to get shot.
Armor Stat: 1500 >> 1500
- Killed in Action

FAIL!
- Armor not work.



# Test003
- Study Assembly file. Find probable fix.
- Attempt creation of new Assembly file.
- Replace Assembly file in AKI files.
    - .\SPT_AKI\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll
- Test...

Customs//High//Easy
- Recklessly running around with intent to get shot.
Armor Stat: 1500 >> 1500
- Killed in Action

FAIL!
- Armor not work.



# Test004
- Study Assembly file more. Find probable fix using patch bpf.
- Study process to create patch bpf file.
- Create bpf.
- Replace bpf file in AKI files.
    - .\SPT_AKI\Aki_Data\Launcher\Patches\aki-core\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll.bpf
- Test...

...//...//...

FAIL!
- Server start, Launcher Start, EFT hang and/or crash.
- Incorrect build process and/or incorrect Assembly edit.



# Test005
- Start from Scratch. All new EFT and AKI files.
- Study process to create patch bpf file a bit more.
- Create new bpf.
- Replace bpf file in AKI files.
    - .\SPT_AKI\Aki_Data\Launcher\Patches\aki-core\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll.bpf
- Replace module files from new build.
    - .\SPT_AKI\Aki_Data\Modules\aki-core\module.dll
    - .\SPT_AKI\Aki_Data\Modules\aki-singleplayer\module.dll
- Replace Assembly files from new build.
    - .\SPT_AKI\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll
    - .\SPT_AKI\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll.bak
    - .\SPT_AKI\EscapeFromTarkov_Data\Managed\Assembly-CSharp-firstpass.dll
- Test...

Interchange//High//Medium
- Recklessly running around with intent to get shot.
Armor Stat: 1500 >> 1495.2

SUCCESS!
- Armor do work!



# Test007
- Start from Scratch. All new AKI files.
- Replace only bpf file in AKI files.
    - .\SPT_AKI\Aki_Data\Launcher\Patches\aki-core\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll.bpf
- Test...

Customs//Medium//Easy
- Recklessly running around with intent to get shot.
1495.2 >> 1476.1

SUCCESS!
- Armor do work!



# Test008
- Start from Scratch. All new EFT and AKI files.
- Clean BSG Temp Files
    - C:\Users\{username}\AppData\Local\Temp\BattleState Games\*
- Replace only bpf file in AKI files.
    - .\SPT_AKI\Aki_Data\Launcher\Patches\aki-core\EscapeFromTarkov_Data\Managed\Assembly-CSharp.dll.bpf
- Test...

Customs//High//Easy
- Recklessly running around with intent to get shot.
Armor Stat: 1500 >> 1487.5
- Successfully extracted from RAID

SUCCESS!
- Armor do work!





# File Information
Cleaning Token: 0x0600D032

ORIGINAL BPF
Name: Assembly-CSharp.dll.bpf
Size: 13,264,812 bytes

CUSTOM BPF:
Name: Assembly-CSharp.dll.bpf
Size: 13,745,292 bytes






# Class Information
ClassCleaned: GClass2017
ClassHEX: @0200198C
ClassOriginalName: /ue912
Token: 0x040085F6
RID: 34294

Code change from:
```CS
public static readonly EquipmentSlot[] ArmorSlots = new EquipmentSlot[]
{
    EquipmentSlot.TacticalVest,
    EquipmentSlot.ArmorVest,
    EquipmentSlot.Headwear,
    EquipmentSlot.FaceCover,
    EquipmentSlot.Eyewear
};
```

To:
```CS
public static readonly EquipmentSlot[] ArmorSlots = new EquipmentSlot[]
{
    EquipmentSlot.TacticalVest,
    EquipmentSlot.ArmorVest,
    EquipmentSlot.Headwear,
    EquipmentSlot.FaceCover,
    EquipmentSlot.Eyewear,
    EquipmentSlot.Armband
};
```
