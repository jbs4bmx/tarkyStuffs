using Aki.Common;
using EFT.InventoryLogic;
using System;
using System.Reflection;

/* ::NOTES::
 * ...
 * Author: jbs4bmx
 * Tester(s): "@kiki", "@Phantom in Time"foo
 * Date: 29 Dec, 2021
 * Update: 8 Jan, 2022
 * ...
 * This bit is from the Assembly-CSharp.dll file...
    // Token: 0x040085F8 RID: 34296
    public static readonly EquipmentSlot[] ArmorSlots = new EquipmentSlot[]
    {
        EquipmentSlot.TacticalVest,
        EquipmentSlot.ArmorVest,
        EquipmentSlot.Headwear,
        EquipmentSlot.FaceCover,
        EquipmentSlot.Eyewear
    };
 * ...
 * Goal: To add "EquipmentSlot.ArmBand" after "EquipmentSlot.Eyewear".
 * ...
 * Field is 'Static' & 'Public'
 * Field = ArmorSlots
 * Enum = EquipmentSlot[]
 * ...
*/

namespace jbs4bmx.HoltzmanShield
{
    public class Shield
    {
        public static void Main(string[] args)
        {
            // ===== Apply the patch ======================================================================== \\
            Log.Info("jbs4bmx-HoltzmanShield: Applying armor patch...");
            AddArmBandArmorSlot();

            // ===== Report finish ========================================================================== \\
            Log.Info("jbs4bmx-HoltzmanShield: Patch successfully applied");
        }

        public static void AddArmBandArmorSlot()
        {
            // This is the patch.

            // ===== Establish a var with our BindingFlags ================================================== \\
            var bindingFlags = (BindingFlags.Instance | BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public);


            // ===== Get field 'ArmorSlots' for later manipulation ========================================== \\
            // This is where the magic begins...
            var field = typeof(GClass2017).GetField("ArmorSlots", bindingFlags);


            // ===== Make sure we didn't pull a null field or nothing at all ================================ \\
            // Referenced from Ereshkigal.TerragroupSpecialist
            if (field == null)
            {
                throw PatchingException.Create(nameof(AddArmBandArmorSlot), "Unable to locate 'ArmorSlots' field");
            }


            // ===== Set the new values of the field ======================================================== \\
            // Add "EquipmentSlot.ArmBand" to "EquipmentSlots[] ArmorSlots".
            field.SetValue(null, new EquipmentSlot[]
            {
                EquipmentSlot.TacticalVest,
                EquipmentSlot.ArmorVest,
                EquipmentSlot.Headwear,
                EquipmentSlot.FaceCover,
                EquipmentSlot.Eyewear,
                EquipmentSlot.ArmBand
            });


            // ===== Report finish ========================================================================== \\
            Log.Info($"jbs4bmx.HoltzmanShield: Applied static patch {nameof(AddArmBandArmorSlot)}");
        }
    }
    public class PatchingException : Exception
    {
        // ===== Report Exception if found ================================================================== \\
        // Referenced from Ereshkigal.TerragroupSpecialist
        private PatchingException(string message) : base(message)
        {
        }

        public static PatchingException Create(string patchName, string message)
        {
            var formattedMessage = $"{patchName}: {message}";
            // Due to BSG having catch-all exception handlers for some methods,
            // we need to additionally log our exceptions in case they are caught
            // and not re-thrown.
            Log.Error(formattedMessage);
            return new PatchingException(formattedMessage);
        }
    }
}
