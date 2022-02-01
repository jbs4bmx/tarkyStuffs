using Aki.Common.Utils;
using EFT.InventoryLogic;
using System.Reflection;

/* ::NOTES::
 * ...
 * Author: jbs4bmx
 * Tester(s): "@kiki", "@Phantom in Time"
 * Date: 31 Jan, 2022
 * Update: 1 Feb, 2022
 * ...
*/

namespace HoltzmanShield
{
    public class Shield
    {
        public static void Main(string[] args)
        {
            Log.Info("HoltzmanShield: Applying armor patch...");
            AddArmBandArmorSlot();

            Log.Info("HoltzmanShield: Patch successfully applied");
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
