using Aki.Common.Utils;
using EFT.InventoryLogic;
using System.Reflection;

/*
 * ...
 * Author   | jbs4bmx
 * Version  | 2.2.3
 * Date     | 31 Jan, 2022
 * Update   | 20 Feb, 2022
 * ...
 * Note     | For use with the following versions of SPT-AKI and EFT.
 * SPT-AKI  | 2.2.3
 * EFT      | 0.12.12.15.16909
 * ...
*/

namespace HoltzmanShield
{
    public class Shield
    {
        public static void Main()
        {
            Log.Info("HoltzmanShield (v2.2.3): Applying armor patch...");
            AddArmBandArmorSlot();

            Log.Info("HoltzmanShield (v2.2.3): Patch successfully applied");
        }

        public static void AddArmBandArmorSlot()
        {
            var bindingFlags = BindingFlags.Instance | BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public;

            var field = typeof(InventoryClass).GetField("ArmorSlots", bindingFlags);

            field.SetValue(null, new EquipmentSlot[]
            {
                EquipmentSlot.TacticalVest,
                EquipmentSlot.ArmorVest,
                EquipmentSlot.Headwear,
                EquipmentSlot.FaceCover,
                EquipmentSlot.Eyewear,
                EquipmentSlot.ArmBand
            });

            Log.Info($"HoltzmanShield: Applied static patch {nameof(AddArmBandArmorSlot)}");
        }
    }
}
