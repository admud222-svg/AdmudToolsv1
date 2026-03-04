// scripts/library/utils/EntityUtils.ts
import { DimensionTypes, world } from "@minecraft/server";
var EntityUtils = class {
  static getAllEntities(options) {
    return DimensionTypes.getAll().map((dimensionType) => world.getDimension(dimensionType.typeId)).filter(Boolean).flatMap((dimension) => dimension.getEntities(options));
  }
  static *getAllEntitiesIterator(options) {
    for (const dimensionType of DimensionTypes.getAll()) {
      const dimension = world.getDimension(dimensionType.typeId);
      if (!dimension) {
        continue;
      }
      for (const entity of dimension.getEntities(options)) {
        yield entity;
      }
    }
  }
};

// scripts/core/ClearRemovableEntitiesScript.ts
import { EntityInitializationCause, system, world as world2 } from "@minecraft/server";
system.beforeEvents.startup.subscribe(() => {
  system.run(() => {
    EntityUtils.getAllEntities({ tags: ["melonbp_brp.removable"] }).forEach(
      (entity) => entity.remove()
    );
  });
});
world2.afterEvents.worldLoad.subscribe(() => {
  world2.afterEvents.entitySpawn.subscribe(({ entity, cause }) => {
    if (cause === EntityInitializationCause.Loaded && entity.hasTag("melonbp_brp.removable")) {
      entity.remove();
    }
  });
  world2.afterEvents.entityLoad.subscribe(({ entity }) => {
    if (entity.hasTag("melonbp_brp.removable")) {
      entity.remove();
    }
  });
});

// scripts/library/components/items/BrainrotEvolveStickItemComponent.ts
var BrainrotEvolveStickItemComponent = class {
  constructor(tier = 0) {
    this.tier = tier;
  }
  onUse() {
  }
  static {
    this.componentId = "melonbp_brp:brainrot_evolve_stick";
  }
};

// scripts/library/components/items/BucketOfOrangeItemComponent.ts
import {
  EntityEquippableComponent,
  EquipmentSlot,
  ItemStack
} from "@minecraft/server";

// node_modules/@minecraft/vanilla-data/lib/index.js
var MinecraftBiomeTypes = ((MinecraftBiomeTypes2) => {
  MinecraftBiomeTypes2["BambooJungle"] = "minecraft:bamboo_jungle";
  MinecraftBiomeTypes2["BambooJungleHills"] = "minecraft:bamboo_jungle_hills";
  MinecraftBiomeTypes2["BasaltDeltas"] = "minecraft:basalt_deltas";
  MinecraftBiomeTypes2["Beach"] = "minecraft:beach";
  MinecraftBiomeTypes2["BirchForest"] = "minecraft:birch_forest";
  MinecraftBiomeTypes2["BirchForestHills"] = "minecraft:birch_forest_hills";
  MinecraftBiomeTypes2["BirchForestHillsMutated"] = "minecraft:birch_forest_hills_mutated";
  MinecraftBiomeTypes2["BirchForestMutated"] = "minecraft:birch_forest_mutated";
  MinecraftBiomeTypes2["CherryGrove"] = "minecraft:cherry_grove";
  MinecraftBiomeTypes2["ColdBeach"] = "minecraft:cold_beach";
  MinecraftBiomeTypes2["ColdOcean"] = "minecraft:cold_ocean";
  MinecraftBiomeTypes2["ColdTaiga"] = "minecraft:cold_taiga";
  MinecraftBiomeTypes2["ColdTaigaHills"] = "minecraft:cold_taiga_hills";
  MinecraftBiomeTypes2["ColdTaigaMutated"] = "minecraft:cold_taiga_mutated";
  MinecraftBiomeTypes2["CrimsonForest"] = "minecraft:crimson_forest";
  MinecraftBiomeTypes2["DeepColdOcean"] = "minecraft:deep_cold_ocean";
  MinecraftBiomeTypes2["DeepDark"] = "minecraft:deep_dark";
  MinecraftBiomeTypes2["DeepFrozenOcean"] = "minecraft:deep_frozen_ocean";
  MinecraftBiomeTypes2["DeepLukewarmOcean"] = "minecraft:deep_lukewarm_ocean";
  MinecraftBiomeTypes2["DeepOcean"] = "minecraft:deep_ocean";
  MinecraftBiomeTypes2["DeepWarmOcean"] = "minecraft:deep_warm_ocean";
  MinecraftBiomeTypes2["Desert"] = "minecraft:desert";
  MinecraftBiomeTypes2["DesertHills"] = "minecraft:desert_hills";
  MinecraftBiomeTypes2["DesertMutated"] = "minecraft:desert_mutated";
  MinecraftBiomeTypes2["DripstoneCaves"] = "minecraft:dripstone_caves";
  MinecraftBiomeTypes2["ExtremeHills"] = "minecraft:extreme_hills";
  MinecraftBiomeTypes2["ExtremeHillsEdge"] = "minecraft:extreme_hills_edge";
  MinecraftBiomeTypes2["ExtremeHillsMutated"] = "minecraft:extreme_hills_mutated";
  MinecraftBiomeTypes2["ExtremeHillsPlusTrees"] = "minecraft:extreme_hills_plus_trees";
  MinecraftBiomeTypes2["ExtremeHillsPlusTreesMutated"] = "minecraft:extreme_hills_plus_trees_mutated";
  MinecraftBiomeTypes2["FlowerForest"] = "minecraft:flower_forest";
  MinecraftBiomeTypes2["Forest"] = "minecraft:forest";
  MinecraftBiomeTypes2["ForestHills"] = "minecraft:forest_hills";
  MinecraftBiomeTypes2["FrozenOcean"] = "minecraft:frozen_ocean";
  MinecraftBiomeTypes2["FrozenPeaks"] = "minecraft:frozen_peaks";
  MinecraftBiomeTypes2["FrozenRiver"] = "minecraft:frozen_river";
  MinecraftBiomeTypes2["Grove"] = "minecraft:grove";
  MinecraftBiomeTypes2["Hell"] = "minecraft:hell";
  MinecraftBiomeTypes2["IceMountains"] = "minecraft:ice_mountains";
  MinecraftBiomeTypes2["IcePlains"] = "minecraft:ice_plains";
  MinecraftBiomeTypes2["IcePlainsSpikes"] = "minecraft:ice_plains_spikes";
  MinecraftBiomeTypes2["JaggedPeaks"] = "minecraft:jagged_peaks";
  MinecraftBiomeTypes2["Jungle"] = "minecraft:jungle";
  MinecraftBiomeTypes2["JungleEdge"] = "minecraft:jungle_edge";
  MinecraftBiomeTypes2["JungleEdgeMutated"] = "minecraft:jungle_edge_mutated";
  MinecraftBiomeTypes2["JungleHills"] = "minecraft:jungle_hills";
  MinecraftBiomeTypes2["JungleMutated"] = "minecraft:jungle_mutated";
  MinecraftBiomeTypes2["LegacyFrozenOcean"] = "minecraft:legacy_frozen_ocean";
  MinecraftBiomeTypes2["LukewarmOcean"] = "minecraft:lukewarm_ocean";
  MinecraftBiomeTypes2["LushCaves"] = "minecraft:lush_caves";
  MinecraftBiomeTypes2["MangroveSwamp"] = "minecraft:mangrove_swamp";
  MinecraftBiomeTypes2["Meadow"] = "minecraft:meadow";
  MinecraftBiomeTypes2["MegaTaiga"] = "minecraft:mega_taiga";
  MinecraftBiomeTypes2["MegaTaigaHills"] = "minecraft:mega_taiga_hills";
  MinecraftBiomeTypes2["Mesa"] = "minecraft:mesa";
  MinecraftBiomeTypes2["MesaBryce"] = "minecraft:mesa_bryce";
  MinecraftBiomeTypes2["MesaPlateau"] = "minecraft:mesa_plateau";
  MinecraftBiomeTypes2["MesaPlateauMutated"] = "minecraft:mesa_plateau_mutated";
  MinecraftBiomeTypes2["MesaPlateauStone"] = "minecraft:mesa_plateau_stone";
  MinecraftBiomeTypes2["MesaPlateauStoneMutated"] = "minecraft:mesa_plateau_stone_mutated";
  MinecraftBiomeTypes2["MushroomIsland"] = "minecraft:mushroom_island";
  MinecraftBiomeTypes2["MushroomIslandShore"] = "minecraft:mushroom_island_shore";
  MinecraftBiomeTypes2["Ocean"] = "minecraft:ocean";
  MinecraftBiomeTypes2["PaleGarden"] = "minecraft:pale_garden";
  MinecraftBiomeTypes2["Plains"] = "minecraft:plains";
  MinecraftBiomeTypes2["RedwoodTaigaHillsMutated"] = "minecraft:redwood_taiga_hills_mutated";
  MinecraftBiomeTypes2["RedwoodTaigaMutated"] = "minecraft:redwood_taiga_mutated";
  MinecraftBiomeTypes2["River"] = "minecraft:river";
  MinecraftBiomeTypes2["RoofedForest"] = "minecraft:roofed_forest";
  MinecraftBiomeTypes2["RoofedForestMutated"] = "minecraft:roofed_forest_mutated";
  MinecraftBiomeTypes2["Savanna"] = "minecraft:savanna";
  MinecraftBiomeTypes2["SavannaMutated"] = "minecraft:savanna_mutated";
  MinecraftBiomeTypes2["SavannaPlateau"] = "minecraft:savanna_plateau";
  MinecraftBiomeTypes2["SavannaPlateauMutated"] = "minecraft:savanna_plateau_mutated";
  MinecraftBiomeTypes2["SnowySlopes"] = "minecraft:snowy_slopes";
  MinecraftBiomeTypes2["SoulsandValley"] = "minecraft:soulsand_valley";
  MinecraftBiomeTypes2["StoneBeach"] = "minecraft:stone_beach";
  MinecraftBiomeTypes2["StonyPeaks"] = "minecraft:stony_peaks";
  MinecraftBiomeTypes2["SunflowerPlains"] = "minecraft:sunflower_plains";
  MinecraftBiomeTypes2["Swampland"] = "minecraft:swampland";
  MinecraftBiomeTypes2["SwamplandMutated"] = "minecraft:swampland_mutated";
  MinecraftBiomeTypes2["Taiga"] = "minecraft:taiga";
  MinecraftBiomeTypes2["TaigaHills"] = "minecraft:taiga_hills";
  MinecraftBiomeTypes2["TaigaMutated"] = "minecraft:taiga_mutated";
  MinecraftBiomeTypes2["TheEnd"] = "minecraft:the_end";
  MinecraftBiomeTypes2["WarmOcean"] = "minecraft:warm_ocean";
  MinecraftBiomeTypes2["WarpedForest"] = "minecraft:warped_forest";
  return MinecraftBiomeTypes2;
})(MinecraftBiomeTypes || {});
var MinecraftBlockTypes = ((MinecraftBlockTypes2) => {
  MinecraftBlockTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftBlockTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftBlockTypes2["AcaciaDoubleSlab"] = "minecraft:acacia_double_slab";
  MinecraftBlockTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftBlockTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftBlockTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftBlockTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftBlockTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftBlockTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftBlockTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftBlockTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftBlockTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftBlockTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftBlockTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftBlockTypes2["AcaciaStandingSign"] = "minecraft:acacia_standing_sign";
  MinecraftBlockTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftBlockTypes2["AcaciaWallSign"] = "minecraft:acacia_wall_sign";
  MinecraftBlockTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftBlockTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftBlockTypes2["Air"] = "minecraft:air";
  MinecraftBlockTypes2["Allium"] = "minecraft:allium";
  MinecraftBlockTypes2["Allow"] = "minecraft:allow";
  MinecraftBlockTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftBlockTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftBlockTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftBlockTypes2["Andesite"] = "minecraft:andesite";
  MinecraftBlockTypes2["AndesiteDoubleSlab"] = "minecraft:andesite_double_slab";
  MinecraftBlockTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftBlockTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftBlockTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftBlockTypes2["Anvil"] = "minecraft:anvil";
  MinecraftBlockTypes2["Azalea"] = "minecraft:azalea";
  MinecraftBlockTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftBlockTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftBlockTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftBlockTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftBlockTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftBlockTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftBlockTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftBlockTypes2["BambooDoubleSlab"] = "minecraft:bamboo_double_slab";
  MinecraftBlockTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftBlockTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftBlockTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftBlockTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftBlockTypes2["BambooMosaicDoubleSlab"] = "minecraft:bamboo_mosaic_double_slab";
  MinecraftBlockTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftBlockTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftBlockTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftBlockTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftBlockTypes2["BambooSapling"] = "minecraft:bamboo_sapling";
  MinecraftBlockTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftBlockTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftBlockTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftBlockTypes2["BambooStandingSign"] = "minecraft:bamboo_standing_sign";
  MinecraftBlockTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftBlockTypes2["BambooWallSign"] = "minecraft:bamboo_wall_sign";
  MinecraftBlockTypes2["Barrel"] = "minecraft:barrel";
  MinecraftBlockTypes2["Barrier"] = "minecraft:barrier";
  MinecraftBlockTypes2["Basalt"] = "minecraft:basalt";
  MinecraftBlockTypes2["Beacon"] = "minecraft:beacon";
  MinecraftBlockTypes2["Bed"] = "minecraft:bed";
  MinecraftBlockTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftBlockTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftBlockTypes2["Beehive"] = "minecraft:beehive";
  MinecraftBlockTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftBlockTypes2["Bell"] = "minecraft:bell";
  MinecraftBlockTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftBlockTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftBlockTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftBlockTypes2["BirchDoubleSlab"] = "minecraft:birch_double_slab";
  MinecraftBlockTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftBlockTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftBlockTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftBlockTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftBlockTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftBlockTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftBlockTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftBlockTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftBlockTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftBlockTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftBlockTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftBlockTypes2["BirchStandingSign"] = "minecraft:birch_standing_sign";
  MinecraftBlockTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftBlockTypes2["BirchWallSign"] = "minecraft:birch_wall_sign";
  MinecraftBlockTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftBlockTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftBlockTypes2["BlackCandleCake"] = "minecraft:black_candle_cake";
  MinecraftBlockTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftBlockTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftBlockTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftBlockTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftBlockTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftBlockTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftBlockTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftBlockTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftBlockTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftBlockTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftBlockTypes2["BlackstoneDoubleSlab"] = "minecraft:blackstone_double_slab";
  MinecraftBlockTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftBlockTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftBlockTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftBlockTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftBlockTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftBlockTypes2["BlueCandleCake"] = "minecraft:blue_candle_cake";
  MinecraftBlockTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftBlockTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftBlockTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftBlockTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftBlockTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftBlockTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftBlockTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftBlockTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftBlockTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftBlockTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftBlockTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftBlockTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftBlockTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftBlockTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftBlockTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftBlockTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftBlockTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftBlockTypes2["BrainCoralWallFan"] = "minecraft:brain_coral_wall_fan";
  MinecraftBlockTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftBlockTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftBlockTypes2["BrickDoubleSlab"] = "minecraft:brick_double_slab";
  MinecraftBlockTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftBlockTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftBlockTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftBlockTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftBlockTypes2["BrownCandleCake"] = "minecraft:brown_candle_cake";
  MinecraftBlockTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftBlockTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftBlockTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftBlockTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftBlockTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftBlockTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftBlockTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftBlockTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftBlockTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftBlockTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftBlockTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftBlockTypes2["BubbleColumn"] = "minecraft:bubble_column";
  MinecraftBlockTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftBlockTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftBlockTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftBlockTypes2["BubbleCoralWallFan"] = "minecraft:bubble_coral_wall_fan";
  MinecraftBlockTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftBlockTypes2["Bush"] = "minecraft:bush";
  MinecraftBlockTypes2["Cactus"] = "minecraft:cactus";
  MinecraftBlockTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftBlockTypes2["Cake"] = "minecraft:cake";
  MinecraftBlockTypes2["Calcite"] = "minecraft:calcite";
  MinecraftBlockTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftBlockTypes2["Camera"] = "minecraft:camera";
  MinecraftBlockTypes2["Campfire"] = "minecraft:campfire";
  MinecraftBlockTypes2["Candle"] = "minecraft:candle";
  MinecraftBlockTypes2["CandleCake"] = "minecraft:candle_cake";
  MinecraftBlockTypes2["Carrots"] = "minecraft:carrots";
  MinecraftBlockTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftBlockTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftBlockTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftBlockTypes2["CaveVines"] = "minecraft:cave_vines";
  MinecraftBlockTypes2["CaveVinesBodyWithBerries"] = "minecraft:cave_vines_body_with_berries";
  MinecraftBlockTypes2["CaveVinesHeadWithBerries"] = "minecraft:cave_vines_head_with_berries";
  MinecraftBlockTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftBlockTypes2["ChemicalHeat"] = "minecraft:chemical_heat";
  MinecraftBlockTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftBlockTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftBlockTypes2["CherryDoubleSlab"] = "minecraft:cherry_double_slab";
  MinecraftBlockTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftBlockTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftBlockTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftBlockTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftBlockTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftBlockTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftBlockTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftBlockTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftBlockTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftBlockTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftBlockTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftBlockTypes2["CherryStandingSign"] = "minecraft:cherry_standing_sign";
  MinecraftBlockTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftBlockTypes2["CherryWallSign"] = "minecraft:cherry_wall_sign";
  MinecraftBlockTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftBlockTypes2["Chest"] = "minecraft:chest";
  MinecraftBlockTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftBlockTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftBlockTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftBlockTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftBlockTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftBlockTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftBlockTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftBlockTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftBlockTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftBlockTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftBlockTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftBlockTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftBlockTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftBlockTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftBlockTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftBlockTypes2["Clay"] = "minecraft:clay";
  MinecraftBlockTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftBlockTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftBlockTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftBlockTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftBlockTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftBlockTypes2["CobbledDeepslateDoubleSlab"] = "minecraft:cobbled_deepslate_double_slab";
  MinecraftBlockTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftBlockTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftBlockTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftBlockTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftBlockTypes2["CobblestoneDoubleSlab"] = "minecraft:cobblestone_double_slab";
  MinecraftBlockTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftBlockTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftBlockTypes2["Cocoa"] = "minecraft:cocoa";
  MinecraftBlockTypes2["ColoredTorchBlue"] = "minecraft:colored_torch_blue";
  MinecraftBlockTypes2["ColoredTorchGreen"] = "minecraft:colored_torch_green";
  MinecraftBlockTypes2["ColoredTorchPurple"] = "minecraft:colored_torch_purple";
  MinecraftBlockTypes2["ColoredTorchRed"] = "minecraft:colored_torch_red";
  MinecraftBlockTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftBlockTypes2["Composter"] = "minecraft:composter";
  MinecraftBlockTypes2["CompoundCreator"] = "minecraft:compound_creator";
  MinecraftBlockTypes2["Conduit"] = "minecraft:conduit";
  MinecraftBlockTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftBlockTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftBlockTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftBlockTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftBlockTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftBlockTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftBlockTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftBlockTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftBlockTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftBlockTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftBlockTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftBlockTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftBlockTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftBlockTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftBlockTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftBlockTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftBlockTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftBlockTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftBlockTypes2["Crafter"] = "minecraft:crafter";
  MinecraftBlockTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftBlockTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftBlockTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftBlockTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftBlockTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftBlockTypes2["CrimsonDoubleSlab"] = "minecraft:crimson_double_slab";
  MinecraftBlockTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftBlockTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftBlockTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftBlockTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftBlockTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftBlockTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftBlockTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftBlockTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftBlockTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftBlockTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftBlockTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftBlockTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftBlockTypes2["CrimsonStandingSign"] = "minecraft:crimson_standing_sign";
  MinecraftBlockTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftBlockTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftBlockTypes2["CrimsonWallSign"] = "minecraft:crimson_wall_sign";
  MinecraftBlockTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftBlockTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftBlockTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftBlockTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftBlockTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftBlockTypes2["CutRedSandstoneDoubleSlab"] = "minecraft:cut_red_sandstone_double_slab";
  MinecraftBlockTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftBlockTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftBlockTypes2["CutSandstoneDoubleSlab"] = "minecraft:cut_sandstone_double_slab";
  MinecraftBlockTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftBlockTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftBlockTypes2["CyanCandleCake"] = "minecraft:cyan_candle_cake";
  MinecraftBlockTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftBlockTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftBlockTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftBlockTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftBlockTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftBlockTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftBlockTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftBlockTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftBlockTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftBlockTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftBlockTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftBlockTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftBlockTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftBlockTypes2["DarkOakDoubleSlab"] = "minecraft:dark_oak_double_slab";
  MinecraftBlockTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftBlockTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftBlockTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftBlockTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftBlockTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftBlockTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftBlockTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftBlockTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftBlockTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftBlockTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftBlockTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftBlockTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftBlockTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftBlockTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftBlockTypes2["DarkPrismarineDoubleSlab"] = "minecraft:dark_prismarine_double_slab";
  MinecraftBlockTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftBlockTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftBlockTypes2["DarkoakStandingSign"] = "minecraft:darkoak_standing_sign";
  MinecraftBlockTypes2["DarkoakWallSign"] = "minecraft:darkoak_wall_sign";
  MinecraftBlockTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftBlockTypes2["DaylightDetectorInverted"] = "minecraft:daylight_detector_inverted";
  MinecraftBlockTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftBlockTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftBlockTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftBlockTypes2["DeadBrainCoralWallFan"] = "minecraft:dead_brain_coral_wall_fan";
  MinecraftBlockTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftBlockTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftBlockTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftBlockTypes2["DeadBubbleCoralWallFan"] = "minecraft:dead_bubble_coral_wall_fan";
  MinecraftBlockTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftBlockTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftBlockTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftBlockTypes2["DeadFireCoralWallFan"] = "minecraft:dead_fire_coral_wall_fan";
  MinecraftBlockTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftBlockTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftBlockTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftBlockTypes2["DeadHornCoralWallFan"] = "minecraft:dead_horn_coral_wall_fan";
  MinecraftBlockTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftBlockTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftBlockTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftBlockTypes2["DeadTubeCoralWallFan"] = "minecraft:dead_tube_coral_wall_fan";
  MinecraftBlockTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftBlockTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftBlockTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftBlockTypes2["DeepslateBrickDoubleSlab"] = "minecraft:deepslate_brick_double_slab";
  MinecraftBlockTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftBlockTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftBlockTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftBlockTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftBlockTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftBlockTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftBlockTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftBlockTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftBlockTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftBlockTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftBlockTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftBlockTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftBlockTypes2["DeepslateTileDoubleSlab"] = "minecraft:deepslate_tile_double_slab";
  MinecraftBlockTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftBlockTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftBlockTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftBlockTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftBlockTypes2["Deny"] = "minecraft:deny";
  MinecraftBlockTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftBlockTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftBlockTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftBlockTypes2["Diorite"] = "minecraft:diorite";
  MinecraftBlockTypes2["DioriteDoubleSlab"] = "minecraft:diorite_double_slab";
  MinecraftBlockTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftBlockTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftBlockTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftBlockTypes2["Dirt"] = "minecraft:dirt";
  MinecraftBlockTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftBlockTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftBlockTypes2["DoubleCutCopperSlab"] = "minecraft:double_cut_copper_slab";
  MinecraftBlockTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftBlockTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftBlockTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftBlockTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftBlockTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftBlockTypes2["Dropper"] = "minecraft:dropper";
  MinecraftBlockTypes2["Element0"] = "minecraft:element_0";
  MinecraftBlockTypes2["Element1"] = "minecraft:element_1";
  MinecraftBlockTypes2["Element10"] = "minecraft:element_10";
  MinecraftBlockTypes2["Element100"] = "minecraft:element_100";
  MinecraftBlockTypes2["Element101"] = "minecraft:element_101";
  MinecraftBlockTypes2["Element102"] = "minecraft:element_102";
  MinecraftBlockTypes2["Element103"] = "minecraft:element_103";
  MinecraftBlockTypes2["Element104"] = "minecraft:element_104";
  MinecraftBlockTypes2["Element105"] = "minecraft:element_105";
  MinecraftBlockTypes2["Element106"] = "minecraft:element_106";
  MinecraftBlockTypes2["Element107"] = "minecraft:element_107";
  MinecraftBlockTypes2["Element108"] = "minecraft:element_108";
  MinecraftBlockTypes2["Element109"] = "minecraft:element_109";
  MinecraftBlockTypes2["Element11"] = "minecraft:element_11";
  MinecraftBlockTypes2["Element110"] = "minecraft:element_110";
  MinecraftBlockTypes2["Element111"] = "minecraft:element_111";
  MinecraftBlockTypes2["Element112"] = "minecraft:element_112";
  MinecraftBlockTypes2["Element113"] = "minecraft:element_113";
  MinecraftBlockTypes2["Element114"] = "minecraft:element_114";
  MinecraftBlockTypes2["Element115"] = "minecraft:element_115";
  MinecraftBlockTypes2["Element116"] = "minecraft:element_116";
  MinecraftBlockTypes2["Element117"] = "minecraft:element_117";
  MinecraftBlockTypes2["Element118"] = "minecraft:element_118";
  MinecraftBlockTypes2["Element12"] = "minecraft:element_12";
  MinecraftBlockTypes2["Element13"] = "minecraft:element_13";
  MinecraftBlockTypes2["Element14"] = "minecraft:element_14";
  MinecraftBlockTypes2["Element15"] = "minecraft:element_15";
  MinecraftBlockTypes2["Element16"] = "minecraft:element_16";
  MinecraftBlockTypes2["Element17"] = "minecraft:element_17";
  MinecraftBlockTypes2["Element18"] = "minecraft:element_18";
  MinecraftBlockTypes2["Element19"] = "minecraft:element_19";
  MinecraftBlockTypes2["Element2"] = "minecraft:element_2";
  MinecraftBlockTypes2["Element20"] = "minecraft:element_20";
  MinecraftBlockTypes2["Element21"] = "minecraft:element_21";
  MinecraftBlockTypes2["Element22"] = "minecraft:element_22";
  MinecraftBlockTypes2["Element23"] = "minecraft:element_23";
  MinecraftBlockTypes2["Element24"] = "minecraft:element_24";
  MinecraftBlockTypes2["Element25"] = "minecraft:element_25";
  MinecraftBlockTypes2["Element26"] = "minecraft:element_26";
  MinecraftBlockTypes2["Element27"] = "minecraft:element_27";
  MinecraftBlockTypes2["Element28"] = "minecraft:element_28";
  MinecraftBlockTypes2["Element29"] = "minecraft:element_29";
  MinecraftBlockTypes2["Element3"] = "minecraft:element_3";
  MinecraftBlockTypes2["Element30"] = "minecraft:element_30";
  MinecraftBlockTypes2["Element31"] = "minecraft:element_31";
  MinecraftBlockTypes2["Element32"] = "minecraft:element_32";
  MinecraftBlockTypes2["Element33"] = "minecraft:element_33";
  MinecraftBlockTypes2["Element34"] = "minecraft:element_34";
  MinecraftBlockTypes2["Element35"] = "minecraft:element_35";
  MinecraftBlockTypes2["Element36"] = "minecraft:element_36";
  MinecraftBlockTypes2["Element37"] = "minecraft:element_37";
  MinecraftBlockTypes2["Element38"] = "minecraft:element_38";
  MinecraftBlockTypes2["Element39"] = "minecraft:element_39";
  MinecraftBlockTypes2["Element4"] = "minecraft:element_4";
  MinecraftBlockTypes2["Element40"] = "minecraft:element_40";
  MinecraftBlockTypes2["Element41"] = "minecraft:element_41";
  MinecraftBlockTypes2["Element42"] = "minecraft:element_42";
  MinecraftBlockTypes2["Element43"] = "minecraft:element_43";
  MinecraftBlockTypes2["Element44"] = "minecraft:element_44";
  MinecraftBlockTypes2["Element45"] = "minecraft:element_45";
  MinecraftBlockTypes2["Element46"] = "minecraft:element_46";
  MinecraftBlockTypes2["Element47"] = "minecraft:element_47";
  MinecraftBlockTypes2["Element48"] = "minecraft:element_48";
  MinecraftBlockTypes2["Element49"] = "minecraft:element_49";
  MinecraftBlockTypes2["Element5"] = "minecraft:element_5";
  MinecraftBlockTypes2["Element50"] = "minecraft:element_50";
  MinecraftBlockTypes2["Element51"] = "minecraft:element_51";
  MinecraftBlockTypes2["Element52"] = "minecraft:element_52";
  MinecraftBlockTypes2["Element53"] = "minecraft:element_53";
  MinecraftBlockTypes2["Element54"] = "minecraft:element_54";
  MinecraftBlockTypes2["Element55"] = "minecraft:element_55";
  MinecraftBlockTypes2["Element56"] = "minecraft:element_56";
  MinecraftBlockTypes2["Element57"] = "minecraft:element_57";
  MinecraftBlockTypes2["Element58"] = "minecraft:element_58";
  MinecraftBlockTypes2["Element59"] = "minecraft:element_59";
  MinecraftBlockTypes2["Element6"] = "minecraft:element_6";
  MinecraftBlockTypes2["Element60"] = "minecraft:element_60";
  MinecraftBlockTypes2["Element61"] = "minecraft:element_61";
  MinecraftBlockTypes2["Element62"] = "minecraft:element_62";
  MinecraftBlockTypes2["Element63"] = "minecraft:element_63";
  MinecraftBlockTypes2["Element64"] = "minecraft:element_64";
  MinecraftBlockTypes2["Element65"] = "minecraft:element_65";
  MinecraftBlockTypes2["Element66"] = "minecraft:element_66";
  MinecraftBlockTypes2["Element67"] = "minecraft:element_67";
  MinecraftBlockTypes2["Element68"] = "minecraft:element_68";
  MinecraftBlockTypes2["Element69"] = "minecraft:element_69";
  MinecraftBlockTypes2["Element7"] = "minecraft:element_7";
  MinecraftBlockTypes2["Element70"] = "minecraft:element_70";
  MinecraftBlockTypes2["Element71"] = "minecraft:element_71";
  MinecraftBlockTypes2["Element72"] = "minecraft:element_72";
  MinecraftBlockTypes2["Element73"] = "minecraft:element_73";
  MinecraftBlockTypes2["Element74"] = "minecraft:element_74";
  MinecraftBlockTypes2["Element75"] = "minecraft:element_75";
  MinecraftBlockTypes2["Element76"] = "minecraft:element_76";
  MinecraftBlockTypes2["Element77"] = "minecraft:element_77";
  MinecraftBlockTypes2["Element78"] = "minecraft:element_78";
  MinecraftBlockTypes2["Element79"] = "minecraft:element_79";
  MinecraftBlockTypes2["Element8"] = "minecraft:element_8";
  MinecraftBlockTypes2["Element80"] = "minecraft:element_80";
  MinecraftBlockTypes2["Element81"] = "minecraft:element_81";
  MinecraftBlockTypes2["Element82"] = "minecraft:element_82";
  MinecraftBlockTypes2["Element83"] = "minecraft:element_83";
  MinecraftBlockTypes2["Element84"] = "minecraft:element_84";
  MinecraftBlockTypes2["Element85"] = "minecraft:element_85";
  MinecraftBlockTypes2["Element86"] = "minecraft:element_86";
  MinecraftBlockTypes2["Element87"] = "minecraft:element_87";
  MinecraftBlockTypes2["Element88"] = "minecraft:element_88";
  MinecraftBlockTypes2["Element89"] = "minecraft:element_89";
  MinecraftBlockTypes2["Element9"] = "minecraft:element_9";
  MinecraftBlockTypes2["Element90"] = "minecraft:element_90";
  MinecraftBlockTypes2["Element91"] = "minecraft:element_91";
  MinecraftBlockTypes2["Element92"] = "minecraft:element_92";
  MinecraftBlockTypes2["Element93"] = "minecraft:element_93";
  MinecraftBlockTypes2["Element94"] = "minecraft:element_94";
  MinecraftBlockTypes2["Element95"] = "minecraft:element_95";
  MinecraftBlockTypes2["Element96"] = "minecraft:element_96";
  MinecraftBlockTypes2["Element97"] = "minecraft:element_97";
  MinecraftBlockTypes2["Element98"] = "minecraft:element_98";
  MinecraftBlockTypes2["Element99"] = "minecraft:element_99";
  MinecraftBlockTypes2["ElementConstructor"] = "minecraft:element_constructor";
  MinecraftBlockTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftBlockTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftBlockTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftBlockTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftBlockTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftBlockTypes2["EndPortal"] = "minecraft:end_portal";
  MinecraftBlockTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftBlockTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftBlockTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftBlockTypes2["EndStoneBrickDoubleSlab"] = "minecraft:end_stone_brick_double_slab";
  MinecraftBlockTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftBlockTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftBlockTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftBlockTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftBlockTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftBlockTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftBlockTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftBlockTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftBlockTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftBlockTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftBlockTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftBlockTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftBlockTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftBlockTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftBlockTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftBlockTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftBlockTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftBlockTypes2["ExposedDoubleCutCopperSlab"] = "minecraft:exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftBlockTypes2["Farmland"] = "minecraft:farmland";
  MinecraftBlockTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftBlockTypes2["Fern"] = "minecraft:fern";
  MinecraftBlockTypes2["Fire"] = "minecraft:fire";
  MinecraftBlockTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftBlockTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftBlockTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftBlockTypes2["FireCoralWallFan"] = "minecraft:fire_coral_wall_fan";
  MinecraftBlockTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftBlockTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftBlockTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftBlockTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftBlockTypes2["FlowingLava"] = "minecraft:flowing_lava";
  MinecraftBlockTypes2["FlowingWater"] = "minecraft:flowing_water";
  MinecraftBlockTypes2["Frame"] = "minecraft:frame";
  MinecraftBlockTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftBlockTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftBlockTypes2["Furnace"] = "minecraft:furnace";
  MinecraftBlockTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftBlockTypes2["Glass"] = "minecraft:glass";
  MinecraftBlockTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftBlockTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftBlockTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftBlockTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftBlockTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftBlockTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftBlockTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftBlockTypes2["Granite"] = "minecraft:granite";
  MinecraftBlockTypes2["GraniteDoubleSlab"] = "minecraft:granite_double_slab";
  MinecraftBlockTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftBlockTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftBlockTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftBlockTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftBlockTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftBlockTypes2["Gravel"] = "minecraft:gravel";
  MinecraftBlockTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftBlockTypes2["GrayCandleCake"] = "minecraft:gray_candle_cake";
  MinecraftBlockTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftBlockTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftBlockTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftBlockTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftBlockTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftBlockTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftBlockTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftBlockTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftBlockTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftBlockTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftBlockTypes2["GreenCandleCake"] = "minecraft:green_candle_cake";
  MinecraftBlockTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftBlockTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftBlockTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftBlockTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftBlockTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftBlockTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftBlockTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftBlockTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftBlockTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftBlockTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftBlockTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftBlockTypes2["HardBlackStainedGlass"] = "minecraft:hard_black_stained_glass";
  MinecraftBlockTypes2["HardBlackStainedGlassPane"] = "minecraft:hard_black_stained_glass_pane";
  MinecraftBlockTypes2["HardBlueStainedGlass"] = "minecraft:hard_blue_stained_glass";
  MinecraftBlockTypes2["HardBlueStainedGlassPane"] = "minecraft:hard_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardBrownStainedGlass"] = "minecraft:hard_brown_stained_glass";
  MinecraftBlockTypes2["HardBrownStainedGlassPane"] = "minecraft:hard_brown_stained_glass_pane";
  MinecraftBlockTypes2["HardCyanStainedGlass"] = "minecraft:hard_cyan_stained_glass";
  MinecraftBlockTypes2["HardCyanStainedGlassPane"] = "minecraft:hard_cyan_stained_glass_pane";
  MinecraftBlockTypes2["HardGlass"] = "minecraft:hard_glass";
  MinecraftBlockTypes2["HardGlassPane"] = "minecraft:hard_glass_pane";
  MinecraftBlockTypes2["HardGrayStainedGlass"] = "minecraft:hard_gray_stained_glass";
  MinecraftBlockTypes2["HardGrayStainedGlassPane"] = "minecraft:hard_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardGreenStainedGlass"] = "minecraft:hard_green_stained_glass";
  MinecraftBlockTypes2["HardGreenStainedGlassPane"] = "minecraft:hard_green_stained_glass_pane";
  MinecraftBlockTypes2["HardLightBlueStainedGlass"] = "minecraft:hard_light_blue_stained_glass";
  MinecraftBlockTypes2["HardLightBlueStainedGlassPane"] = "minecraft:hard_light_blue_stained_glass_pane";
  MinecraftBlockTypes2["HardLightGrayStainedGlass"] = "minecraft:hard_light_gray_stained_glass";
  MinecraftBlockTypes2["HardLightGrayStainedGlassPane"] = "minecraft:hard_light_gray_stained_glass_pane";
  MinecraftBlockTypes2["HardLimeStainedGlass"] = "minecraft:hard_lime_stained_glass";
  MinecraftBlockTypes2["HardLimeStainedGlassPane"] = "minecraft:hard_lime_stained_glass_pane";
  MinecraftBlockTypes2["HardMagentaStainedGlass"] = "minecraft:hard_magenta_stained_glass";
  MinecraftBlockTypes2["HardMagentaStainedGlassPane"] = "minecraft:hard_magenta_stained_glass_pane";
  MinecraftBlockTypes2["HardOrangeStainedGlass"] = "minecraft:hard_orange_stained_glass";
  MinecraftBlockTypes2["HardOrangeStainedGlassPane"] = "minecraft:hard_orange_stained_glass_pane";
  MinecraftBlockTypes2["HardPinkStainedGlass"] = "minecraft:hard_pink_stained_glass";
  MinecraftBlockTypes2["HardPinkStainedGlassPane"] = "minecraft:hard_pink_stained_glass_pane";
  MinecraftBlockTypes2["HardPurpleStainedGlass"] = "minecraft:hard_purple_stained_glass";
  MinecraftBlockTypes2["HardPurpleStainedGlassPane"] = "minecraft:hard_purple_stained_glass_pane";
  MinecraftBlockTypes2["HardRedStainedGlass"] = "minecraft:hard_red_stained_glass";
  MinecraftBlockTypes2["HardRedStainedGlassPane"] = "minecraft:hard_red_stained_glass_pane";
  MinecraftBlockTypes2["HardWhiteStainedGlass"] = "minecraft:hard_white_stained_glass";
  MinecraftBlockTypes2["HardWhiteStainedGlassPane"] = "minecraft:hard_white_stained_glass_pane";
  MinecraftBlockTypes2["HardYellowStainedGlass"] = "minecraft:hard_yellow_stained_glass";
  MinecraftBlockTypes2["HardYellowStainedGlassPane"] = "minecraft:hard_yellow_stained_glass_pane";
  MinecraftBlockTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftBlockTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftBlockTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftBlockTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftBlockTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftBlockTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftBlockTypes2["Hopper"] = "minecraft:hopper";
  MinecraftBlockTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftBlockTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftBlockTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftBlockTypes2["HornCoralWallFan"] = "minecraft:horn_coral_wall_fan";
  MinecraftBlockTypes2["Ice"] = "minecraft:ice";
  MinecraftBlockTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftBlockTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftBlockTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftBlockTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftBlockTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftBlockTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftBlockTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftBlockTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftBlockTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftBlockTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftBlockTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftBlockTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftBlockTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftBlockTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftBlockTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftBlockTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftBlockTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftBlockTypes2["JungleDoubleSlab"] = "minecraft:jungle_double_slab";
  MinecraftBlockTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftBlockTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftBlockTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftBlockTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftBlockTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftBlockTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftBlockTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftBlockTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftBlockTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftBlockTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftBlockTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftBlockTypes2["JungleStandingSign"] = "minecraft:jungle_standing_sign";
  MinecraftBlockTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftBlockTypes2["JungleWallSign"] = "minecraft:jungle_wall_sign";
  MinecraftBlockTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftBlockTypes2["Kelp"] = "minecraft:kelp";
  MinecraftBlockTypes2["LabTable"] = "minecraft:lab_table";
  MinecraftBlockTypes2["Ladder"] = "minecraft:ladder";
  MinecraftBlockTypes2["Lantern"] = "minecraft:lantern";
  MinecraftBlockTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftBlockTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftBlockTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftBlockTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftBlockTypes2["Lava"] = "minecraft:lava";
  MinecraftBlockTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftBlockTypes2["Lectern"] = "minecraft:lectern";
  MinecraftBlockTypes2["Lever"] = "minecraft:lever";
  MinecraftBlockTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftBlockTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftBlockTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftBlockTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftBlockTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftBlockTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftBlockTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftBlockTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftBlockTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftBlockTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftBlockTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftBlockTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftBlockTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftBlockTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftBlockTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftBlockTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftBlockTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftBlockTypes2["LightBlueCandleCake"] = "minecraft:light_blue_candle_cake";
  MinecraftBlockTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftBlockTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftBlockTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftBlockTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftBlockTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftBlockTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftBlockTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftBlockTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftBlockTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftBlockTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftBlockTypes2["LightGrayCandleCake"] = "minecraft:light_gray_candle_cake";
  MinecraftBlockTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftBlockTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftBlockTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftBlockTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftBlockTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftBlockTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftBlockTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftBlockTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftBlockTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftBlockTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftBlockTypes2["Lilac"] = "minecraft:lilac";
  MinecraftBlockTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftBlockTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftBlockTypes2["LimeCandleCake"] = "minecraft:lime_candle_cake";
  MinecraftBlockTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftBlockTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftBlockTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftBlockTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftBlockTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftBlockTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftBlockTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftBlockTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftBlockTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftBlockTypes2["LitBlastFurnace"] = "minecraft:lit_blast_furnace";
  MinecraftBlockTypes2["LitDeepslateRedstoneOre"] = "minecraft:lit_deepslate_redstone_ore";
  MinecraftBlockTypes2["LitFurnace"] = "minecraft:lit_furnace";
  MinecraftBlockTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftBlockTypes2["LitRedstoneLamp"] = "minecraft:lit_redstone_lamp";
  MinecraftBlockTypes2["LitRedstoneOre"] = "minecraft:lit_redstone_ore";
  MinecraftBlockTypes2["LitSmoker"] = "minecraft:lit_smoker";
  MinecraftBlockTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftBlockTypes2["Loom"] = "minecraft:loom";
  MinecraftBlockTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftBlockTypes2["MagentaCandleCake"] = "minecraft:magenta_candle_cake";
  MinecraftBlockTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftBlockTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftBlockTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftBlockTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftBlockTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftBlockTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftBlockTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftBlockTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftBlockTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftBlockTypes2["Magma"] = "minecraft:magma";
  MinecraftBlockTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftBlockTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftBlockTypes2["MangroveDoubleSlab"] = "minecraft:mangrove_double_slab";
  MinecraftBlockTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftBlockTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftBlockTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftBlockTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftBlockTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftBlockTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftBlockTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftBlockTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftBlockTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftBlockTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftBlockTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftBlockTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftBlockTypes2["MangroveStandingSign"] = "minecraft:mangrove_standing_sign";
  MinecraftBlockTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftBlockTypes2["MangroveWallSign"] = "minecraft:mangrove_wall_sign";
  MinecraftBlockTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftBlockTypes2["MaterialReducer"] = "minecraft:material_reducer";
  MinecraftBlockTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftBlockTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftBlockTypes2["MelonStem"] = "minecraft:melon_stem";
  MinecraftBlockTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftBlockTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftBlockTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftBlockTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftBlockTypes2["MossyCobblestoneDoubleSlab"] = "minecraft:mossy_cobblestone_double_slab";
  MinecraftBlockTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftBlockTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftBlockTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftBlockTypes2["MossyStoneBrickDoubleSlab"] = "minecraft:mossy_stone_brick_double_slab";
  MinecraftBlockTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftBlockTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftBlockTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftBlockTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftBlockTypes2["Mud"] = "minecraft:mud";
  MinecraftBlockTypes2["MudBrickDoubleSlab"] = "minecraft:mud_brick_double_slab";
  MinecraftBlockTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftBlockTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftBlockTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftBlockTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftBlockTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftBlockTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftBlockTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftBlockTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftBlockTypes2["NetherBrickDoubleSlab"] = "minecraft:nether_brick_double_slab";
  MinecraftBlockTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftBlockTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftBlockTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftBlockTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftBlockTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftBlockTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftBlockTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftBlockTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftBlockTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftBlockTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftBlockTypes2["NormalStoneDoubleSlab"] = "minecraft:normal_stone_double_slab";
  MinecraftBlockTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftBlockTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftBlockTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftBlockTypes2["OakDoubleSlab"] = "minecraft:oak_double_slab";
  MinecraftBlockTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftBlockTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftBlockTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftBlockTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftBlockTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftBlockTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftBlockTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftBlockTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftBlockTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftBlockTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftBlockTypes2["Observer"] = "minecraft:observer";
  MinecraftBlockTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftBlockTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftBlockTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftBlockTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftBlockTypes2["OrangeCandleCake"] = "minecraft:orange_candle_cake";
  MinecraftBlockTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftBlockTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftBlockTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftBlockTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftBlockTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftBlockTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftBlockTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftBlockTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftBlockTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftBlockTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftBlockTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftBlockTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftBlockTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftBlockTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftBlockTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftBlockTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftBlockTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftBlockTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftBlockTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftBlockTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftBlockTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftBlockTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftBlockTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftBlockTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["OxidizedDoubleCutCopperSlab"] = "minecraft:oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftBlockTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftBlockTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftBlockTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftBlockTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftBlockTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftBlockTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftBlockTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftBlockTypes2["PaleOakDoubleSlab"] = "minecraft:pale_oak_double_slab";
  MinecraftBlockTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftBlockTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftBlockTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftBlockTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftBlockTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftBlockTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftBlockTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftBlockTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftBlockTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftBlockTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftBlockTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftBlockTypes2["PaleOakStandingSign"] = "minecraft:pale_oak_standing_sign";
  MinecraftBlockTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftBlockTypes2["PaleOakWallSign"] = "minecraft:pale_oak_wall_sign";
  MinecraftBlockTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftBlockTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftBlockTypes2["Peony"] = "minecraft:peony";
  MinecraftBlockTypes2["PetrifiedOakDoubleSlab"] = "minecraft:petrified_oak_double_slab";
  MinecraftBlockTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftBlockTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftBlockTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftBlockTypes2["PinkCandleCake"] = "minecraft:pink_candle_cake";
  MinecraftBlockTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftBlockTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftBlockTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftBlockTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftBlockTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftBlockTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftBlockTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftBlockTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftBlockTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftBlockTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftBlockTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftBlockTypes2["Piston"] = "minecraft:piston";
  MinecraftBlockTypes2["PistonArmCollision"] = "minecraft:piston_arm_collision";
  MinecraftBlockTypes2["PitcherCrop"] = "minecraft:pitcher_crop";
  MinecraftBlockTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftBlockTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftBlockTypes2["Podzol"] = "minecraft:podzol";
  MinecraftBlockTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftBlockTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftBlockTypes2["PolishedAndesiteDoubleSlab"] = "minecraft:polished_andesite_double_slab";
  MinecraftBlockTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftBlockTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftBlockTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftBlockTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftBlockTypes2["PolishedBlackstoneBrickDoubleSlab"] = "minecraft:polished_blackstone_brick_double_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftBlockTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftBlockTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftBlockTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftBlockTypes2["PolishedBlackstoneDoubleSlab"] = "minecraft:polished_blackstone_double_slab";
  MinecraftBlockTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftBlockTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftBlockTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftBlockTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftBlockTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftBlockTypes2["PolishedDeepslateDoubleSlab"] = "minecraft:polished_deepslate_double_slab";
  MinecraftBlockTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftBlockTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftBlockTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftBlockTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftBlockTypes2["PolishedDioriteDoubleSlab"] = "minecraft:polished_diorite_double_slab";
  MinecraftBlockTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftBlockTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftBlockTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftBlockTypes2["PolishedGraniteDoubleSlab"] = "minecraft:polished_granite_double_slab";
  MinecraftBlockTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftBlockTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftBlockTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftBlockTypes2["PolishedTuffDoubleSlab"] = "minecraft:polished_tuff_double_slab";
  MinecraftBlockTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftBlockTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftBlockTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftBlockTypes2["Poppy"] = "minecraft:poppy";
  MinecraftBlockTypes2["Portal"] = "minecraft:portal";
  MinecraftBlockTypes2["Potatoes"] = "minecraft:potatoes";
  MinecraftBlockTypes2["PowderSnow"] = "minecraft:powder_snow";
  MinecraftBlockTypes2["PoweredComparator"] = "minecraft:powered_comparator";
  MinecraftBlockTypes2["PoweredRepeater"] = "minecraft:powered_repeater";
  MinecraftBlockTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftBlockTypes2["PrismarineBrickDoubleSlab"] = "minecraft:prismarine_brick_double_slab";
  MinecraftBlockTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftBlockTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftBlockTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftBlockTypes2["PrismarineDoubleSlab"] = "minecraft:prismarine_double_slab";
  MinecraftBlockTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftBlockTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftBlockTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftBlockTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftBlockTypes2["PumpkinStem"] = "minecraft:pumpkin_stem";
  MinecraftBlockTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftBlockTypes2["PurpleCandleCake"] = "minecraft:purple_candle_cake";
  MinecraftBlockTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftBlockTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftBlockTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftBlockTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftBlockTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftBlockTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftBlockTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftBlockTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftBlockTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftBlockTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftBlockTypes2["PurpurDoubleSlab"] = "minecraft:purpur_double_slab";
  MinecraftBlockTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftBlockTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftBlockTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftBlockTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftBlockTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftBlockTypes2["QuartzDoubleSlab"] = "minecraft:quartz_double_slab";
  MinecraftBlockTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftBlockTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftBlockTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftBlockTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftBlockTypes2["Rail"] = "minecraft:rail";
  MinecraftBlockTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftBlockTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftBlockTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftBlockTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftBlockTypes2["RedCandleCake"] = "minecraft:red_candle_cake";
  MinecraftBlockTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftBlockTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftBlockTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftBlockTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftBlockTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftBlockTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftBlockTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftBlockTypes2["RedNetherBrickDoubleSlab"] = "minecraft:red_nether_brick_double_slab";
  MinecraftBlockTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftBlockTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftBlockTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftBlockTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftBlockTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftBlockTypes2["RedSandstoneDoubleSlab"] = "minecraft:red_sandstone_double_slab";
  MinecraftBlockTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftBlockTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftBlockTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftBlockTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftBlockTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftBlockTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftBlockTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftBlockTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftBlockTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftBlockTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftBlockTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftBlockTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftBlockTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftBlockTypes2["RedstoneWire"] = "minecraft:redstone_wire";
  MinecraftBlockTypes2["Reeds"] = "minecraft:reeds";
  MinecraftBlockTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftBlockTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftBlockTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftBlockTypes2["ResinBrickDoubleSlab"] = "minecraft:resin_brick_double_slab";
  MinecraftBlockTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftBlockTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftBlockTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftBlockTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftBlockTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftBlockTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftBlockTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftBlockTypes2["Sand"] = "minecraft:sand";
  MinecraftBlockTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftBlockTypes2["SandstoneDoubleSlab"] = "minecraft:sandstone_double_slab";
  MinecraftBlockTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftBlockTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftBlockTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftBlockTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftBlockTypes2["Sculk"] = "minecraft:sculk";
  MinecraftBlockTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftBlockTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftBlockTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftBlockTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftBlockTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftBlockTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftBlockTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftBlockTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftBlockTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftBlockTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftBlockTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftBlockTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftBlockTypes2["Slime"] = "minecraft:slime";
  MinecraftBlockTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftBlockTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftBlockTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftBlockTypes2["Smoker"] = "minecraft:smoker";
  MinecraftBlockTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftBlockTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftBlockTypes2["SmoothQuartzDoubleSlab"] = "minecraft:smooth_quartz_double_slab";
  MinecraftBlockTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftBlockTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftBlockTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftBlockTypes2["SmoothRedSandstoneDoubleSlab"] = "minecraft:smooth_red_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftBlockTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftBlockTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftBlockTypes2["SmoothSandstoneDoubleSlab"] = "minecraft:smooth_sandstone_double_slab";
  MinecraftBlockTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftBlockTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftBlockTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftBlockTypes2["SmoothStoneDoubleSlab"] = "minecraft:smooth_stone_double_slab";
  MinecraftBlockTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftBlockTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftBlockTypes2["Snow"] = "minecraft:snow";
  MinecraftBlockTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftBlockTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftBlockTypes2["SoulFire"] = "minecraft:soul_fire";
  MinecraftBlockTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftBlockTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftBlockTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftBlockTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftBlockTypes2["Sponge"] = "minecraft:sponge";
  MinecraftBlockTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftBlockTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftBlockTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftBlockTypes2["SpruceDoubleSlab"] = "minecraft:spruce_double_slab";
  MinecraftBlockTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftBlockTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftBlockTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftBlockTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftBlockTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftBlockTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftBlockTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftBlockTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftBlockTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftBlockTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftBlockTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftBlockTypes2["SpruceStandingSign"] = "minecraft:spruce_standing_sign";
  MinecraftBlockTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftBlockTypes2["SpruceWallSign"] = "minecraft:spruce_wall_sign";
  MinecraftBlockTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftBlockTypes2["StandingBanner"] = "minecraft:standing_banner";
  MinecraftBlockTypes2["StandingSign"] = "minecraft:standing_sign";
  MinecraftBlockTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftBlockTypes2["StickyPistonArmCollision"] = "minecraft:sticky_piston_arm_collision";
  MinecraftBlockTypes2["Stone"] = "minecraft:stone";
  MinecraftBlockTypes2["StoneBrickDoubleSlab"] = "minecraft:stone_brick_double_slab";
  MinecraftBlockTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftBlockTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftBlockTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftBlockTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftBlockTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftBlockTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftBlockTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftBlockTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftBlockTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftBlockTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftBlockTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftBlockTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftBlockTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftBlockTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftBlockTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftBlockTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftBlockTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftBlockTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftBlockTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftBlockTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftBlockTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftBlockTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftBlockTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftBlockTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftBlockTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftBlockTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftBlockTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftBlockTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftBlockTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftBlockTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftBlockTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftBlockTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftBlockTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftBlockTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftBlockTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftBlockTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftBlockTypes2["SweetBerryBush"] = "minecraft:sweet_berry_bush";
  MinecraftBlockTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftBlockTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftBlockTypes2["Target"] = "minecraft:target";
  MinecraftBlockTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftBlockTypes2["Tnt"] = "minecraft:tnt";
  MinecraftBlockTypes2["Torch"] = "minecraft:torch";
  MinecraftBlockTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftBlockTypes2["TorchflowerCrop"] = "minecraft:torchflower_crop";
  MinecraftBlockTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftBlockTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftBlockTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftBlockTypes2["TripWire"] = "minecraft:trip_wire";
  MinecraftBlockTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftBlockTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftBlockTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftBlockTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftBlockTypes2["TubeCoralWallFan"] = "minecraft:tube_coral_wall_fan";
  MinecraftBlockTypes2["Tuff"] = "minecraft:tuff";
  MinecraftBlockTypes2["TuffBrickDoubleSlab"] = "minecraft:tuff_brick_double_slab";
  MinecraftBlockTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftBlockTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftBlockTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftBlockTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftBlockTypes2["TuffDoubleSlab"] = "minecraft:tuff_double_slab";
  MinecraftBlockTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftBlockTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftBlockTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftBlockTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftBlockTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftBlockTypes2["UnderwaterTnt"] = "minecraft:underwater_tnt";
  MinecraftBlockTypes2["UnderwaterTorch"] = "minecraft:underwater_torch";
  MinecraftBlockTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftBlockTypes2["Unknown"] = "minecraft:unknown";
  MinecraftBlockTypes2["UnlitRedstoneTorch"] = "minecraft:unlit_redstone_torch";
  MinecraftBlockTypes2["UnpoweredComparator"] = "minecraft:unpowered_comparator";
  MinecraftBlockTypes2["UnpoweredRepeater"] = "minecraft:unpowered_repeater";
  MinecraftBlockTypes2["Vault"] = "minecraft:vault";
  MinecraftBlockTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftBlockTypes2["Vine"] = "minecraft:vine";
  MinecraftBlockTypes2["WallBanner"] = "minecraft:wall_banner";
  MinecraftBlockTypes2["WallSign"] = "minecraft:wall_sign";
  MinecraftBlockTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftBlockTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftBlockTypes2["WarpedDoubleSlab"] = "minecraft:warped_double_slab";
  MinecraftBlockTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftBlockTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftBlockTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftBlockTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftBlockTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftBlockTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftBlockTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftBlockTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftBlockTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftBlockTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftBlockTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftBlockTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftBlockTypes2["WarpedStandingSign"] = "minecraft:warped_standing_sign";
  MinecraftBlockTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftBlockTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftBlockTypes2["WarpedWallSign"] = "minecraft:warped_wall_sign";
  MinecraftBlockTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftBlockTypes2["Water"] = "minecraft:water";
  MinecraftBlockTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftBlockTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftBlockTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftBlockTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftBlockTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftBlockTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftBlockTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftBlockTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftBlockTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftBlockTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftBlockTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftBlockTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedDoubleCutCopperSlab"] = "minecraft:waxed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftBlockTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftBlockTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftBlockTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftBlockTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftBlockTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftBlockTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftBlockTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftBlockTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftBlockTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftBlockTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftBlockTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftBlockTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedExposedDoubleCutCopperSlab"] = "minecraft:waxed_exposed_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftBlockTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftBlockTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftBlockTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftBlockTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftBlockTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftBlockTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftBlockTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftBlockTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftBlockTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftBlockTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftBlockTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftBlockTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedOxidizedDoubleCutCopperSlab"] = "minecraft:waxed_oxidized_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftBlockTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftBlockTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftBlockTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftBlockTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftBlockTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftBlockTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftBlockTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftBlockTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftBlockTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftBlockTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftBlockTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WaxedWeatheredDoubleCutCopperSlab"] = "minecraft:waxed_weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftBlockTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftBlockTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftBlockTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftBlockTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftBlockTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftBlockTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftBlockTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftBlockTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftBlockTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftBlockTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftBlockTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftBlockTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftBlockTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftBlockTypes2["WeatheredDoubleCutCopperSlab"] = "minecraft:weathered_double_cut_copper_slab";
  MinecraftBlockTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftBlockTypes2["Web"] = "minecraft:web";
  MinecraftBlockTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftBlockTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftBlockTypes2["Wheat"] = "minecraft:wheat";
  MinecraftBlockTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftBlockTypes2["WhiteCandleCake"] = "minecraft:white_candle_cake";
  MinecraftBlockTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftBlockTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftBlockTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftBlockTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftBlockTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftBlockTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftBlockTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftBlockTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftBlockTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftBlockTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftBlockTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftBlockTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftBlockTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftBlockTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftBlockTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftBlockTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftBlockTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftBlockTypes2["YellowCandleCake"] = "minecraft:yellow_candle_cake";
  MinecraftBlockTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftBlockTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftBlockTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftBlockTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftBlockTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftBlockTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftBlockTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftBlockTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftBlockTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftBlockTypes2["ZombieHead"] = "minecraft:zombie_head";
  return MinecraftBlockTypes2;
})(MinecraftBlockTypes || {});
var MinecraftCameraPresetsTypes = ((MinecraftCameraPresetsTypes2) => {
  MinecraftCameraPresetsTypes2["ControlSchemeCamera"] = "minecraft:control_scheme_camera";
  MinecraftCameraPresetsTypes2["FirstPerson"] = "minecraft:first_person";
  MinecraftCameraPresetsTypes2["FixedBoom"] = "minecraft:fixed_boom";
  MinecraftCameraPresetsTypes2["FollowOrbit"] = "minecraft:follow_orbit";
  MinecraftCameraPresetsTypes2["Free"] = "minecraft:free";
  MinecraftCameraPresetsTypes2["ThirdPerson"] = "minecraft:third_person";
  MinecraftCameraPresetsTypes2["ThirdPersonFront"] = "minecraft:third_person_front";
  return MinecraftCameraPresetsTypes2;
})(MinecraftCameraPresetsTypes || {});
var MinecraftCooldownCategoryTypes = ((MinecraftCooldownCategoryTypes2) => {
  MinecraftCooldownCategoryTypes2["Chorusfruit"] = "minecraft:chorusfruit";
  MinecraftCooldownCategoryTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftCooldownCategoryTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftCooldownCategoryTypes2["Shield"] = "minecraft:shield";
  MinecraftCooldownCategoryTypes2["WindCharge"] = "minecraft:wind_charge";
  return MinecraftCooldownCategoryTypes2;
})(MinecraftCooldownCategoryTypes || {});
var MinecraftDimensionTypes = ((MinecraftDimensionTypes2) => {
  MinecraftDimensionTypes2["Nether"] = "minecraft:nether";
  MinecraftDimensionTypes2["Overworld"] = "minecraft:overworld";
  MinecraftDimensionTypes2["TheEnd"] = "minecraft:the_end";
  return MinecraftDimensionTypes2;
})(MinecraftDimensionTypes || {});
var MinecraftEffectTypes = ((MinecraftEffectTypes22) => {
  MinecraftEffectTypes22["Absorption"] = "minecraft:absorption";
  MinecraftEffectTypes22["BadOmen"] = "minecraft:bad_omen";
  MinecraftEffectTypes22["Blindness"] = "minecraft:blindness";
  MinecraftEffectTypes22["ConduitPower"] = "minecraft:conduit_power";
  MinecraftEffectTypes22["Darkness"] = "minecraft:darkness";
  MinecraftEffectTypes22["FatalPoison"] = "minecraft:fatal_poison";
  MinecraftEffectTypes22["FireResistance"] = "minecraft:fire_resistance";
  MinecraftEffectTypes22["Haste"] = "minecraft:haste";
  MinecraftEffectTypes22["HealthBoost"] = "minecraft:health_boost";
  MinecraftEffectTypes22["Hunger"] = "minecraft:hunger";
  MinecraftEffectTypes22["Infested"] = "minecraft:infested";
  MinecraftEffectTypes22["InstantDamage"] = "minecraft:instant_damage";
  MinecraftEffectTypes22["InstantHealth"] = "minecraft:instant_health";
  MinecraftEffectTypes22["Invisibility"] = "minecraft:invisibility";
  MinecraftEffectTypes22["JumpBoost"] = "minecraft:jump_boost";
  MinecraftEffectTypes22["Levitation"] = "minecraft:levitation";
  MinecraftEffectTypes22["MiningFatigue"] = "minecraft:mining_fatigue";
  MinecraftEffectTypes22["Nausea"] = "minecraft:nausea";
  MinecraftEffectTypes22["NightVision"] = "minecraft:night_vision";
  MinecraftEffectTypes22["Oozing"] = "minecraft:oozing";
  MinecraftEffectTypes22["Poison"] = "minecraft:poison";
  MinecraftEffectTypes22["RaidOmen"] = "minecraft:raid_omen";
  MinecraftEffectTypes22["Regeneration"] = "minecraft:regeneration";
  MinecraftEffectTypes22["Resistance"] = "minecraft:resistance";
  MinecraftEffectTypes22["Saturation"] = "minecraft:saturation";
  MinecraftEffectTypes22["SlowFalling"] = "minecraft:slow_falling";
  MinecraftEffectTypes22["Slowness"] = "minecraft:slowness";
  MinecraftEffectTypes22["Speed"] = "minecraft:speed";
  MinecraftEffectTypes22["Strength"] = "minecraft:strength";
  MinecraftEffectTypes22["TrialOmen"] = "minecraft:trial_omen";
  MinecraftEffectTypes22["VillageHero"] = "minecraft:village_hero";
  MinecraftEffectTypes22["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftEffectTypes22["Weakness"] = "minecraft:weakness";
  MinecraftEffectTypes22["Weaving"] = "minecraft:weaving";
  MinecraftEffectTypes22["WindCharged"] = "minecraft:wind_charged";
  MinecraftEffectTypes22["Wither"] = "minecraft:wither";
  return MinecraftEffectTypes22;
})(MinecraftEffectTypes || {});
var MinecraftEnchantmentTypes = ((MinecraftEnchantmentTypes2) => {
  MinecraftEnchantmentTypes2["AquaAffinity"] = "minecraft:aqua_affinity";
  MinecraftEnchantmentTypes2["BaneOfArthropods"] = "minecraft:bane_of_arthropods";
  MinecraftEnchantmentTypes2["Binding"] = "minecraft:binding";
  MinecraftEnchantmentTypes2["BlastProtection"] = "minecraft:blast_protection";
  MinecraftEnchantmentTypes2["BowInfinity"] = "minecraft:infinity";
  MinecraftEnchantmentTypes2["Breach"] = "minecraft:breach";
  MinecraftEnchantmentTypes2["Channeling"] = "minecraft:channeling";
  MinecraftEnchantmentTypes2["Density"] = "minecraft:density";
  MinecraftEnchantmentTypes2["DepthStrider"] = "minecraft:depth_strider";
  MinecraftEnchantmentTypes2["Efficiency"] = "minecraft:efficiency";
  MinecraftEnchantmentTypes2["FeatherFalling"] = "minecraft:feather_falling";
  MinecraftEnchantmentTypes2["FireAspect"] = "minecraft:fire_aspect";
  MinecraftEnchantmentTypes2["FireProtection"] = "minecraft:fire_protection";
  MinecraftEnchantmentTypes2["Flame"] = "minecraft:flame";
  MinecraftEnchantmentTypes2["Fortune"] = "minecraft:fortune";
  MinecraftEnchantmentTypes2["FrostWalker"] = "minecraft:frost_walker";
  MinecraftEnchantmentTypes2["Impaling"] = "minecraft:impaling";
  MinecraftEnchantmentTypes2["Knockback"] = "minecraft:knockback";
  MinecraftEnchantmentTypes2["Looting"] = "minecraft:looting";
  MinecraftEnchantmentTypes2["Loyalty"] = "minecraft:loyalty";
  MinecraftEnchantmentTypes2["LuckOfTheSea"] = "minecraft:luck_of_the_sea";
  MinecraftEnchantmentTypes2["Lure"] = "minecraft:lure";
  MinecraftEnchantmentTypes2["Mending"] = "minecraft:mending";
  MinecraftEnchantmentTypes2["Multishot"] = "minecraft:multishot";
  MinecraftEnchantmentTypes2["Piercing"] = "minecraft:piercing";
  MinecraftEnchantmentTypes2["Power"] = "minecraft:power";
  MinecraftEnchantmentTypes2["ProjectileProtection"] = "minecraft:projectile_protection";
  MinecraftEnchantmentTypes2["Protection"] = "minecraft:protection";
  MinecraftEnchantmentTypes2["Punch"] = "minecraft:punch";
  MinecraftEnchantmentTypes2["QuickCharge"] = "minecraft:quick_charge";
  MinecraftEnchantmentTypes2["Respiration"] = "minecraft:respiration";
  MinecraftEnchantmentTypes2["Riptide"] = "minecraft:riptide";
  MinecraftEnchantmentTypes2["Sharpness"] = "minecraft:sharpness";
  MinecraftEnchantmentTypes2["SilkTouch"] = "minecraft:silk_touch";
  MinecraftEnchantmentTypes2["Smite"] = "minecraft:smite";
  MinecraftEnchantmentTypes2["SoulSpeed"] = "minecraft:soul_speed";
  MinecraftEnchantmentTypes2["SwiftSneak"] = "minecraft:swift_sneak";
  MinecraftEnchantmentTypes2["Thorns"] = "minecraft:thorns";
  MinecraftEnchantmentTypes2["Unbreaking"] = "minecraft:unbreaking";
  MinecraftEnchantmentTypes2["Vanishing"] = "minecraft:vanishing";
  MinecraftEnchantmentTypes2["WindBurst"] = "minecraft:wind_burst";
  return MinecraftEnchantmentTypes2;
})(MinecraftEnchantmentTypes || {});
var MinecraftEntityTypes = ((MinecraftEntityTypes2) => {
  MinecraftEntityTypes2["Agent"] = "minecraft:agent";
  MinecraftEntityTypes2["Allay"] = "minecraft:allay";
  MinecraftEntityTypes2["AreaEffectCloud"] = "minecraft:area_effect_cloud";
  MinecraftEntityTypes2["Armadillo"] = "minecraft:armadillo";
  MinecraftEntityTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftEntityTypes2["Arrow"] = "minecraft:arrow";
  MinecraftEntityTypes2["Axolotl"] = "minecraft:axolotl";
  MinecraftEntityTypes2["Bat"] = "minecraft:bat";
  MinecraftEntityTypes2["Bee"] = "minecraft:bee";
  MinecraftEntityTypes2["Blaze"] = "minecraft:blaze";
  MinecraftEntityTypes2["Boat"] = "minecraft:boat";
  MinecraftEntityTypes2["Bogged"] = "minecraft:bogged";
  MinecraftEntityTypes2["Breeze"] = "minecraft:breeze";
  MinecraftEntityTypes2["BreezeWindChargeProjectile"] = "minecraft:breeze_wind_charge_projectile";
  MinecraftEntityTypes2["Camel"] = "minecraft:camel";
  MinecraftEntityTypes2["Cat"] = "minecraft:cat";
  MinecraftEntityTypes2["CaveSpider"] = "minecraft:cave_spider";
  MinecraftEntityTypes2["ChestBoat"] = "minecraft:chest_boat";
  MinecraftEntityTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftEntityTypes2["Chicken"] = "minecraft:chicken";
  MinecraftEntityTypes2["Cod"] = "minecraft:cod";
  MinecraftEntityTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftEntityTypes2["CopperGolem"] = "minecraft:copper_golem";
  MinecraftEntityTypes2["Cow"] = "minecraft:cow";
  MinecraftEntityTypes2["Creaking"] = "minecraft:creaking";
  MinecraftEntityTypes2["Creeper"] = "minecraft:creeper";
  MinecraftEntityTypes2["Dolphin"] = "minecraft:dolphin";
  MinecraftEntityTypes2["Donkey"] = "minecraft:donkey";
  MinecraftEntityTypes2["DragonFireball"] = "minecraft:dragon_fireball";
  MinecraftEntityTypes2["Drowned"] = "minecraft:drowned";
  MinecraftEntityTypes2["Egg"] = "minecraft:egg";
  MinecraftEntityTypes2["ElderGuardian"] = "minecraft:elder_guardian";
  MinecraftEntityTypes2["EnderCrystal"] = "minecraft:ender_crystal";
  MinecraftEntityTypes2["EnderDragon"] = "minecraft:ender_dragon";
  MinecraftEntityTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftEntityTypes2["Enderman"] = "minecraft:enderman";
  MinecraftEntityTypes2["Endermite"] = "minecraft:endermite";
  MinecraftEntityTypes2["EvocationIllager"] = "minecraft:evocation_illager";
  MinecraftEntityTypes2["EyeOfEnderSignal"] = "minecraft:eye_of_ender_signal";
  MinecraftEntityTypes2["Fireball"] = "minecraft:fireball";
  MinecraftEntityTypes2["FireworksRocket"] = "minecraft:fireworks_rocket";
  MinecraftEntityTypes2["FishingHook"] = "minecraft:fishing_hook";
  MinecraftEntityTypes2["Fox"] = "minecraft:fox";
  MinecraftEntityTypes2["Frog"] = "minecraft:frog";
  MinecraftEntityTypes2["Ghast"] = "minecraft:ghast";
  MinecraftEntityTypes2["GlowSquid"] = "minecraft:glow_squid";
  MinecraftEntityTypes2["Goat"] = "minecraft:goat";
  MinecraftEntityTypes2["Guardian"] = "minecraft:guardian";
  MinecraftEntityTypes2["HappyGhast"] = "minecraft:happy_ghast";
  MinecraftEntityTypes2["Hoglin"] = "minecraft:hoglin";
  MinecraftEntityTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftEntityTypes2["Horse"] = "minecraft:horse";
  MinecraftEntityTypes2["Husk"] = "minecraft:husk";
  MinecraftEntityTypes2["IronGolem"] = "minecraft:iron_golem";
  MinecraftEntityTypes2["LightningBolt"] = "minecraft:lightning_bolt";
  MinecraftEntityTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftEntityTypes2["Llama"] = "minecraft:llama";
  MinecraftEntityTypes2["LlamaSpit"] = "minecraft:llama_spit";
  MinecraftEntityTypes2["MagmaCube"] = "minecraft:magma_cube";
  MinecraftEntityTypes2["Minecart"] = "minecraft:minecart";
  MinecraftEntityTypes2["Mooshroom"] = "minecraft:mooshroom";
  MinecraftEntityTypes2["Mule"] = "minecraft:mule";
  MinecraftEntityTypes2["Npc"] = "minecraft:npc";
  MinecraftEntityTypes2["Ocelot"] = "minecraft:ocelot";
  MinecraftEntityTypes2["OminousItemSpawner"] = "minecraft:ominous_item_spawner";
  MinecraftEntityTypes2["Panda"] = "minecraft:panda";
  MinecraftEntityTypes2["Parrot"] = "minecraft:parrot";
  MinecraftEntityTypes2["Phantom"] = "minecraft:phantom";
  MinecraftEntityTypes2["Pig"] = "minecraft:pig";
  MinecraftEntityTypes2["Piglin"] = "minecraft:piglin";
  MinecraftEntityTypes2["PiglinBrute"] = "minecraft:piglin_brute";
  MinecraftEntityTypes2["Pillager"] = "minecraft:pillager";
  MinecraftEntityTypes2["Player"] = "minecraft:player";
  MinecraftEntityTypes2["PolarBear"] = "minecraft:polar_bear";
  MinecraftEntityTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftEntityTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftEntityTypes2["Ravager"] = "minecraft:ravager";
  MinecraftEntityTypes2["Salmon"] = "minecraft:salmon";
  MinecraftEntityTypes2["Sheep"] = "minecraft:sheep";
  MinecraftEntityTypes2["Shulker"] = "minecraft:shulker";
  MinecraftEntityTypes2["ShulkerBullet"] = "minecraft:shulker_bullet";
  MinecraftEntityTypes2["Silverfish"] = "minecraft:silverfish";
  MinecraftEntityTypes2["Skeleton"] = "minecraft:skeleton";
  MinecraftEntityTypes2["SkeletonHorse"] = "minecraft:skeleton_horse";
  MinecraftEntityTypes2["Slime"] = "minecraft:slime";
  MinecraftEntityTypes2["SmallFireball"] = "minecraft:small_fireball";
  MinecraftEntityTypes2["Sniffer"] = "minecraft:sniffer";
  MinecraftEntityTypes2["SnowGolem"] = "minecraft:snow_golem";
  MinecraftEntityTypes2["Snowball"] = "minecraft:snowball";
  MinecraftEntityTypes2["Spider"] = "minecraft:spider";
  MinecraftEntityTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftEntityTypes2["Squid"] = "minecraft:squid";
  MinecraftEntityTypes2["Stray"] = "minecraft:stray";
  MinecraftEntityTypes2["Strider"] = "minecraft:strider";
  MinecraftEntityTypes2["Tadpole"] = "minecraft:tadpole";
  MinecraftEntityTypes2["ThrownTrident"] = "minecraft:thrown_trident";
  MinecraftEntityTypes2["Tnt"] = "minecraft:tnt";
  MinecraftEntityTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftEntityTypes2["TraderLlama"] = "minecraft:trader_llama";
  MinecraftEntityTypes2["TripodCamera"] = "minecraft:tripod_camera";
  MinecraftEntityTypes2["Tropicalfish"] = "minecraft:tropicalfish";
  MinecraftEntityTypes2["Turtle"] = "minecraft:turtle";
  MinecraftEntityTypes2["Vex"] = "minecraft:vex";
  MinecraftEntityTypes2["Villager"] = "minecraft:villager";
  MinecraftEntityTypes2["VillagerV2"] = "minecraft:villager_v2";
  MinecraftEntityTypes2["Vindicator"] = "minecraft:vindicator";
  MinecraftEntityTypes2["WanderingTrader"] = "minecraft:wandering_trader";
  MinecraftEntityTypes2["Warden"] = "minecraft:warden";
  MinecraftEntityTypes2["WindChargeProjectile"] = "minecraft:wind_charge_projectile";
  MinecraftEntityTypes2["Witch"] = "minecraft:witch";
  MinecraftEntityTypes2["Wither"] = "minecraft:wither";
  MinecraftEntityTypes2["WitherSkeleton"] = "minecraft:wither_skeleton";
  MinecraftEntityTypes2["WitherSkull"] = "minecraft:wither_skull";
  MinecraftEntityTypes2["WitherSkullDangerous"] = "minecraft:wither_skull_dangerous";
  MinecraftEntityTypes2["Wolf"] = "minecraft:wolf";
  MinecraftEntityTypes2["XpBottle"] = "minecraft:xp_bottle";
  MinecraftEntityTypes2["XpOrb"] = "minecraft:xp_orb";
  MinecraftEntityTypes2["Zoglin"] = "minecraft:zoglin";
  MinecraftEntityTypes2["Zombie"] = "minecraft:zombie";
  MinecraftEntityTypes2["ZombieHorse"] = "minecraft:zombie_horse";
  MinecraftEntityTypes2["ZombiePigman"] = "minecraft:zombie_pigman";
  MinecraftEntityTypes2["ZombieVillager"] = "minecraft:zombie_villager";
  MinecraftEntityTypes2["ZombieVillagerV2"] = "minecraft:zombie_villager_v2";
  return MinecraftEntityTypes2;
})(MinecraftEntityTypes || {});
var MinecraftFeatureTypes = ((MinecraftFeatureTypes2) => {
  MinecraftFeatureTypes2["AncientCity"] = "minecraft:ancient_city";
  MinecraftFeatureTypes2["BastionRemnant"] = "minecraft:bastion_remnant";
  MinecraftFeatureTypes2["BuriedTreasure"] = "minecraft:buried_treasure";
  MinecraftFeatureTypes2["EndCity"] = "minecraft:end_city";
  MinecraftFeatureTypes2["Fortress"] = "minecraft:fortress";
  MinecraftFeatureTypes2["Mansion"] = "minecraft:mansion";
  MinecraftFeatureTypes2["Mineshaft"] = "minecraft:mineshaft";
  MinecraftFeatureTypes2["Monument"] = "minecraft:monument";
  MinecraftFeatureTypes2["PillagerOutpost"] = "minecraft:pillager_outpost";
  MinecraftFeatureTypes2["RuinedPortal"] = "minecraft:ruined_portal";
  MinecraftFeatureTypes2["Ruins"] = "minecraft:ruins";
  MinecraftFeatureTypes2["Shipwreck"] = "minecraft:shipwreck";
  MinecraftFeatureTypes2["Stronghold"] = "minecraft:stronghold";
  MinecraftFeatureTypes2["Temple"] = "minecraft:temple";
  MinecraftFeatureTypes2["TrailRuins"] = "minecraft:trail_ruins";
  MinecraftFeatureTypes2["TrialChambers"] = "minecraft:trial_chambers";
  MinecraftFeatureTypes2["Village"] = "minecraft:village";
  return MinecraftFeatureTypes2;
})(MinecraftFeatureTypes || {});
var MinecraftItemTypes = ((MinecraftItemTypes2) => {
  MinecraftItemTypes2["AcaciaBoat"] = "minecraft:acacia_boat";
  MinecraftItemTypes2["AcaciaButton"] = "minecraft:acacia_button";
  MinecraftItemTypes2["AcaciaChestBoat"] = "minecraft:acacia_chest_boat";
  MinecraftItemTypes2["AcaciaDoor"] = "minecraft:acacia_door";
  MinecraftItemTypes2["AcaciaFence"] = "minecraft:acacia_fence";
  MinecraftItemTypes2["AcaciaFenceGate"] = "minecraft:acacia_fence_gate";
  MinecraftItemTypes2["AcaciaHangingSign"] = "minecraft:acacia_hanging_sign";
  MinecraftItemTypes2["AcaciaLeaves"] = "minecraft:acacia_leaves";
  MinecraftItemTypes2["AcaciaLog"] = "minecraft:acacia_log";
  MinecraftItemTypes2["AcaciaPlanks"] = "minecraft:acacia_planks";
  MinecraftItemTypes2["AcaciaPressurePlate"] = "minecraft:acacia_pressure_plate";
  MinecraftItemTypes2["AcaciaSapling"] = "minecraft:acacia_sapling";
  MinecraftItemTypes2["AcaciaShelf"] = "minecraft:acacia_shelf";
  MinecraftItemTypes2["AcaciaSign"] = "minecraft:acacia_sign";
  MinecraftItemTypes2["AcaciaSlab"] = "minecraft:acacia_slab";
  MinecraftItemTypes2["AcaciaStairs"] = "minecraft:acacia_stairs";
  MinecraftItemTypes2["AcaciaTrapdoor"] = "minecraft:acacia_trapdoor";
  MinecraftItemTypes2["AcaciaWood"] = "minecraft:acacia_wood";
  MinecraftItemTypes2["ActivatorRail"] = "minecraft:activator_rail";
  MinecraftItemTypes2["AllaySpawnEgg"] = "minecraft:allay_spawn_egg";
  MinecraftItemTypes2["Allium"] = "minecraft:allium";
  MinecraftItemTypes2["Allow"] = "minecraft:allow";
  MinecraftItemTypes2["AmethystBlock"] = "minecraft:amethyst_block";
  MinecraftItemTypes2["AmethystCluster"] = "minecraft:amethyst_cluster";
  MinecraftItemTypes2["AmethystShard"] = "minecraft:amethyst_shard";
  MinecraftItemTypes2["AncientDebris"] = "minecraft:ancient_debris";
  MinecraftItemTypes2["Andesite"] = "minecraft:andesite";
  MinecraftItemTypes2["AndesiteSlab"] = "minecraft:andesite_slab";
  MinecraftItemTypes2["AndesiteStairs"] = "minecraft:andesite_stairs";
  MinecraftItemTypes2["AndesiteWall"] = "minecraft:andesite_wall";
  MinecraftItemTypes2["AnglerPotterySherd"] = "minecraft:angler_pottery_sherd";
  MinecraftItemTypes2["Anvil"] = "minecraft:anvil";
  MinecraftItemTypes2["Apple"] = "minecraft:apple";
  MinecraftItemTypes2["ArcherPotterySherd"] = "minecraft:archer_pottery_sherd";
  MinecraftItemTypes2["ArmadilloScute"] = "minecraft:armadillo_scute";
  MinecraftItemTypes2["ArmadilloSpawnEgg"] = "minecraft:armadillo_spawn_egg";
  MinecraftItemTypes2["ArmorStand"] = "minecraft:armor_stand";
  MinecraftItemTypes2["ArmsUpPotterySherd"] = "minecraft:arms_up_pottery_sherd";
  MinecraftItemTypes2["Arrow"] = "minecraft:arrow";
  MinecraftItemTypes2["AxolotlBucket"] = "minecraft:axolotl_bucket";
  MinecraftItemTypes2["AxolotlSpawnEgg"] = "minecraft:axolotl_spawn_egg";
  MinecraftItemTypes2["Azalea"] = "minecraft:azalea";
  MinecraftItemTypes2["AzaleaLeaves"] = "minecraft:azalea_leaves";
  MinecraftItemTypes2["AzaleaLeavesFlowered"] = "minecraft:azalea_leaves_flowered";
  MinecraftItemTypes2["AzureBluet"] = "minecraft:azure_bluet";
  MinecraftItemTypes2["BakedPotato"] = "minecraft:baked_potato";
  MinecraftItemTypes2["Bamboo"] = "minecraft:bamboo";
  MinecraftItemTypes2["BambooBlock"] = "minecraft:bamboo_block";
  MinecraftItemTypes2["BambooButton"] = "minecraft:bamboo_button";
  MinecraftItemTypes2["BambooChestRaft"] = "minecraft:bamboo_chest_raft";
  MinecraftItemTypes2["BambooDoor"] = "minecraft:bamboo_door";
  MinecraftItemTypes2["BambooFence"] = "minecraft:bamboo_fence";
  MinecraftItemTypes2["BambooFenceGate"] = "minecraft:bamboo_fence_gate";
  MinecraftItemTypes2["BambooHangingSign"] = "minecraft:bamboo_hanging_sign";
  MinecraftItemTypes2["BambooMosaic"] = "minecraft:bamboo_mosaic";
  MinecraftItemTypes2["BambooMosaicSlab"] = "minecraft:bamboo_mosaic_slab";
  MinecraftItemTypes2["BambooMosaicStairs"] = "minecraft:bamboo_mosaic_stairs";
  MinecraftItemTypes2["BambooPlanks"] = "minecraft:bamboo_planks";
  MinecraftItemTypes2["BambooPressurePlate"] = "minecraft:bamboo_pressure_plate";
  MinecraftItemTypes2["BambooRaft"] = "minecraft:bamboo_raft";
  MinecraftItemTypes2["BambooShelf"] = "minecraft:bamboo_shelf";
  MinecraftItemTypes2["BambooSign"] = "minecraft:bamboo_sign";
  MinecraftItemTypes2["BambooSlab"] = "minecraft:bamboo_slab";
  MinecraftItemTypes2["BambooStairs"] = "minecraft:bamboo_stairs";
  MinecraftItemTypes2["BambooTrapdoor"] = "minecraft:bamboo_trapdoor";
  MinecraftItemTypes2["Banner"] = "minecraft:banner";
  MinecraftItemTypes2["Barrel"] = "minecraft:barrel";
  MinecraftItemTypes2["Barrier"] = "minecraft:barrier";
  MinecraftItemTypes2["Basalt"] = "minecraft:basalt";
  MinecraftItemTypes2["BatSpawnEgg"] = "minecraft:bat_spawn_egg";
  MinecraftItemTypes2["Beacon"] = "minecraft:beacon";
  MinecraftItemTypes2["Bed"] = "minecraft:bed";
  MinecraftItemTypes2["Bedrock"] = "minecraft:bedrock";
  MinecraftItemTypes2["BeeNest"] = "minecraft:bee_nest";
  MinecraftItemTypes2["BeeSpawnEgg"] = "minecraft:bee_spawn_egg";
  MinecraftItemTypes2["Beef"] = "minecraft:beef";
  MinecraftItemTypes2["Beehive"] = "minecraft:beehive";
  MinecraftItemTypes2["Beetroot"] = "minecraft:beetroot";
  MinecraftItemTypes2["BeetrootSeeds"] = "minecraft:beetroot_seeds";
  MinecraftItemTypes2["BeetrootSoup"] = "minecraft:beetroot_soup";
  MinecraftItemTypes2["Bell"] = "minecraft:bell";
  MinecraftItemTypes2["BigDripleaf"] = "minecraft:big_dripleaf";
  MinecraftItemTypes2["BirchBoat"] = "minecraft:birch_boat";
  MinecraftItemTypes2["BirchButton"] = "minecraft:birch_button";
  MinecraftItemTypes2["BirchChestBoat"] = "minecraft:birch_chest_boat";
  MinecraftItemTypes2["BirchDoor"] = "minecraft:birch_door";
  MinecraftItemTypes2["BirchFence"] = "minecraft:birch_fence";
  MinecraftItemTypes2["BirchFenceGate"] = "minecraft:birch_fence_gate";
  MinecraftItemTypes2["BirchHangingSign"] = "minecraft:birch_hanging_sign";
  MinecraftItemTypes2["BirchLeaves"] = "minecraft:birch_leaves";
  MinecraftItemTypes2["BirchLog"] = "minecraft:birch_log";
  MinecraftItemTypes2["BirchPlanks"] = "minecraft:birch_planks";
  MinecraftItemTypes2["BirchPressurePlate"] = "minecraft:birch_pressure_plate";
  MinecraftItemTypes2["BirchSapling"] = "minecraft:birch_sapling";
  MinecraftItemTypes2["BirchShelf"] = "minecraft:birch_shelf";
  MinecraftItemTypes2["BirchSign"] = "minecraft:birch_sign";
  MinecraftItemTypes2["BirchSlab"] = "minecraft:birch_slab";
  MinecraftItemTypes2["BirchStairs"] = "minecraft:birch_stairs";
  MinecraftItemTypes2["BirchTrapdoor"] = "minecraft:birch_trapdoor";
  MinecraftItemTypes2["BirchWood"] = "minecraft:birch_wood";
  MinecraftItemTypes2["BlackBundle"] = "minecraft:black_bundle";
  MinecraftItemTypes2["BlackCandle"] = "minecraft:black_candle";
  MinecraftItemTypes2["BlackCarpet"] = "minecraft:black_carpet";
  MinecraftItemTypes2["BlackConcrete"] = "minecraft:black_concrete";
  MinecraftItemTypes2["BlackConcretePowder"] = "minecraft:black_concrete_powder";
  MinecraftItemTypes2["BlackDye"] = "minecraft:black_dye";
  MinecraftItemTypes2["BlackGlazedTerracotta"] = "minecraft:black_glazed_terracotta";
  MinecraftItemTypes2["BlackHarness"] = "minecraft:black_harness";
  MinecraftItemTypes2["BlackShulkerBox"] = "minecraft:black_shulker_box";
  MinecraftItemTypes2["BlackStainedGlass"] = "minecraft:black_stained_glass";
  MinecraftItemTypes2["BlackStainedGlassPane"] = "minecraft:black_stained_glass_pane";
  MinecraftItemTypes2["BlackTerracotta"] = "minecraft:black_terracotta";
  MinecraftItemTypes2["BlackWool"] = "minecraft:black_wool";
  MinecraftItemTypes2["Blackstone"] = "minecraft:blackstone";
  MinecraftItemTypes2["BlackstoneSlab"] = "minecraft:blackstone_slab";
  MinecraftItemTypes2["BlackstoneStairs"] = "minecraft:blackstone_stairs";
  MinecraftItemTypes2["BlackstoneWall"] = "minecraft:blackstone_wall";
  MinecraftItemTypes2["BladePotterySherd"] = "minecraft:blade_pottery_sherd";
  MinecraftItemTypes2["BlastFurnace"] = "minecraft:blast_furnace";
  MinecraftItemTypes2["BlazePowder"] = "minecraft:blaze_powder";
  MinecraftItemTypes2["BlazeRod"] = "minecraft:blaze_rod";
  MinecraftItemTypes2["BlazeSpawnEgg"] = "minecraft:blaze_spawn_egg";
  MinecraftItemTypes2["BlueBundle"] = "minecraft:blue_bundle";
  MinecraftItemTypes2["BlueCandle"] = "minecraft:blue_candle";
  MinecraftItemTypes2["BlueCarpet"] = "minecraft:blue_carpet";
  MinecraftItemTypes2["BlueConcrete"] = "minecraft:blue_concrete";
  MinecraftItemTypes2["BlueConcretePowder"] = "minecraft:blue_concrete_powder";
  MinecraftItemTypes2["BlueDye"] = "minecraft:blue_dye";
  MinecraftItemTypes2["BlueEgg"] = "minecraft:blue_egg";
  MinecraftItemTypes2["BlueGlazedTerracotta"] = "minecraft:blue_glazed_terracotta";
  MinecraftItemTypes2["BlueHarness"] = "minecraft:blue_harness";
  MinecraftItemTypes2["BlueIce"] = "minecraft:blue_ice";
  MinecraftItemTypes2["BlueOrchid"] = "minecraft:blue_orchid";
  MinecraftItemTypes2["BlueShulkerBox"] = "minecraft:blue_shulker_box";
  MinecraftItemTypes2["BlueStainedGlass"] = "minecraft:blue_stained_glass";
  MinecraftItemTypes2["BlueStainedGlassPane"] = "minecraft:blue_stained_glass_pane";
  MinecraftItemTypes2["BlueTerracotta"] = "minecraft:blue_terracotta";
  MinecraftItemTypes2["BlueWool"] = "minecraft:blue_wool";
  MinecraftItemTypes2["BoggedSpawnEgg"] = "minecraft:bogged_spawn_egg";
  MinecraftItemTypes2["BoltArmorTrimSmithingTemplate"] = "minecraft:bolt_armor_trim_smithing_template";
  MinecraftItemTypes2["Bone"] = "minecraft:bone";
  MinecraftItemTypes2["BoneBlock"] = "minecraft:bone_block";
  MinecraftItemTypes2["BoneMeal"] = "minecraft:bone_meal";
  MinecraftItemTypes2["Book"] = "minecraft:book";
  MinecraftItemTypes2["Bookshelf"] = "minecraft:bookshelf";
  MinecraftItemTypes2["BorderBlock"] = "minecraft:border_block";
  MinecraftItemTypes2["BordureIndentedBannerPattern"] = "minecraft:bordure_indented_banner_pattern";
  MinecraftItemTypes2["Bow"] = "minecraft:bow";
  MinecraftItemTypes2["Bowl"] = "minecraft:bowl";
  MinecraftItemTypes2["BrainCoral"] = "minecraft:brain_coral";
  MinecraftItemTypes2["BrainCoralBlock"] = "minecraft:brain_coral_block";
  MinecraftItemTypes2["BrainCoralFan"] = "minecraft:brain_coral_fan";
  MinecraftItemTypes2["Bread"] = "minecraft:bread";
  MinecraftItemTypes2["BreezeRod"] = "minecraft:breeze_rod";
  MinecraftItemTypes2["BreezeSpawnEgg"] = "minecraft:breeze_spawn_egg";
  MinecraftItemTypes2["BrewerPotterySherd"] = "minecraft:brewer_pottery_sherd";
  MinecraftItemTypes2["BrewingStand"] = "minecraft:brewing_stand";
  MinecraftItemTypes2["Brick"] = "minecraft:brick";
  MinecraftItemTypes2["BrickBlock"] = "minecraft:brick_block";
  MinecraftItemTypes2["BrickSlab"] = "minecraft:brick_slab";
  MinecraftItemTypes2["BrickStairs"] = "minecraft:brick_stairs";
  MinecraftItemTypes2["BrickWall"] = "minecraft:brick_wall";
  MinecraftItemTypes2["BrownBundle"] = "minecraft:brown_bundle";
  MinecraftItemTypes2["BrownCandle"] = "minecraft:brown_candle";
  MinecraftItemTypes2["BrownCarpet"] = "minecraft:brown_carpet";
  MinecraftItemTypes2["BrownConcrete"] = "minecraft:brown_concrete";
  MinecraftItemTypes2["BrownConcretePowder"] = "minecraft:brown_concrete_powder";
  MinecraftItemTypes2["BrownDye"] = "minecraft:brown_dye";
  MinecraftItemTypes2["BrownEgg"] = "minecraft:brown_egg";
  MinecraftItemTypes2["BrownGlazedTerracotta"] = "minecraft:brown_glazed_terracotta";
  MinecraftItemTypes2["BrownHarness"] = "minecraft:brown_harness";
  MinecraftItemTypes2["BrownMushroom"] = "minecraft:brown_mushroom";
  MinecraftItemTypes2["BrownMushroomBlock"] = "minecraft:brown_mushroom_block";
  MinecraftItemTypes2["BrownShulkerBox"] = "minecraft:brown_shulker_box";
  MinecraftItemTypes2["BrownStainedGlass"] = "minecraft:brown_stained_glass";
  MinecraftItemTypes2["BrownStainedGlassPane"] = "minecraft:brown_stained_glass_pane";
  MinecraftItemTypes2["BrownTerracotta"] = "minecraft:brown_terracotta";
  MinecraftItemTypes2["BrownWool"] = "minecraft:brown_wool";
  MinecraftItemTypes2["Brush"] = "minecraft:brush";
  MinecraftItemTypes2["BubbleCoral"] = "minecraft:bubble_coral";
  MinecraftItemTypes2["BubbleCoralBlock"] = "minecraft:bubble_coral_block";
  MinecraftItemTypes2["BubbleCoralFan"] = "minecraft:bubble_coral_fan";
  MinecraftItemTypes2["Bucket"] = "minecraft:bucket";
  MinecraftItemTypes2["BuddingAmethyst"] = "minecraft:budding_amethyst";
  MinecraftItemTypes2["Bundle"] = "minecraft:bundle";
  MinecraftItemTypes2["BurnPotterySherd"] = "minecraft:burn_pottery_sherd";
  MinecraftItemTypes2["Bush"] = "minecraft:bush";
  MinecraftItemTypes2["Cactus"] = "minecraft:cactus";
  MinecraftItemTypes2["CactusFlower"] = "minecraft:cactus_flower";
  MinecraftItemTypes2["Cake"] = "minecraft:cake";
  MinecraftItemTypes2["Calcite"] = "minecraft:calcite";
  MinecraftItemTypes2["CalibratedSculkSensor"] = "minecraft:calibrated_sculk_sensor";
  MinecraftItemTypes2["CamelSpawnEgg"] = "minecraft:camel_spawn_egg";
  MinecraftItemTypes2["Campfire"] = "minecraft:campfire";
  MinecraftItemTypes2["Candle"] = "minecraft:candle";
  MinecraftItemTypes2["Carrot"] = "minecraft:carrot";
  MinecraftItemTypes2["CarrotOnAStick"] = "minecraft:carrot_on_a_stick";
  MinecraftItemTypes2["CartographyTable"] = "minecraft:cartography_table";
  MinecraftItemTypes2["CarvedPumpkin"] = "minecraft:carved_pumpkin";
  MinecraftItemTypes2["CatSpawnEgg"] = "minecraft:cat_spawn_egg";
  MinecraftItemTypes2["Cauldron"] = "minecraft:cauldron";
  MinecraftItemTypes2["CaveSpiderSpawnEgg"] = "minecraft:cave_spider_spawn_egg";
  MinecraftItemTypes2["ChainCommandBlock"] = "minecraft:chain_command_block";
  MinecraftItemTypes2["ChainmailBoots"] = "minecraft:chainmail_boots";
  MinecraftItemTypes2["ChainmailChestplate"] = "minecraft:chainmail_chestplate";
  MinecraftItemTypes2["ChainmailHelmet"] = "minecraft:chainmail_helmet";
  MinecraftItemTypes2["ChainmailLeggings"] = "minecraft:chainmail_leggings";
  MinecraftItemTypes2["Charcoal"] = "minecraft:charcoal";
  MinecraftItemTypes2["CherryBoat"] = "minecraft:cherry_boat";
  MinecraftItemTypes2["CherryButton"] = "minecraft:cherry_button";
  MinecraftItemTypes2["CherryChestBoat"] = "minecraft:cherry_chest_boat";
  MinecraftItemTypes2["CherryDoor"] = "minecraft:cherry_door";
  MinecraftItemTypes2["CherryFence"] = "minecraft:cherry_fence";
  MinecraftItemTypes2["CherryFenceGate"] = "minecraft:cherry_fence_gate";
  MinecraftItemTypes2["CherryHangingSign"] = "minecraft:cherry_hanging_sign";
  MinecraftItemTypes2["CherryLeaves"] = "minecraft:cherry_leaves";
  MinecraftItemTypes2["CherryLog"] = "minecraft:cherry_log";
  MinecraftItemTypes2["CherryPlanks"] = "minecraft:cherry_planks";
  MinecraftItemTypes2["CherryPressurePlate"] = "minecraft:cherry_pressure_plate";
  MinecraftItemTypes2["CherrySapling"] = "minecraft:cherry_sapling";
  MinecraftItemTypes2["CherryShelf"] = "minecraft:cherry_shelf";
  MinecraftItemTypes2["CherrySign"] = "minecraft:cherry_sign";
  MinecraftItemTypes2["CherrySlab"] = "minecraft:cherry_slab";
  MinecraftItemTypes2["CherryStairs"] = "minecraft:cherry_stairs";
  MinecraftItemTypes2["CherryTrapdoor"] = "minecraft:cherry_trapdoor";
  MinecraftItemTypes2["CherryWood"] = "minecraft:cherry_wood";
  MinecraftItemTypes2["Chest"] = "minecraft:chest";
  MinecraftItemTypes2["ChestMinecart"] = "minecraft:chest_minecart";
  MinecraftItemTypes2["Chicken"] = "minecraft:chicken";
  MinecraftItemTypes2["ChickenSpawnEgg"] = "minecraft:chicken_spawn_egg";
  MinecraftItemTypes2["ChippedAnvil"] = "minecraft:chipped_anvil";
  MinecraftItemTypes2["ChiseledBookshelf"] = "minecraft:chiseled_bookshelf";
  MinecraftItemTypes2["ChiseledCopper"] = "minecraft:chiseled_copper";
  MinecraftItemTypes2["ChiseledDeepslate"] = "minecraft:chiseled_deepslate";
  MinecraftItemTypes2["ChiseledNetherBricks"] = "minecraft:chiseled_nether_bricks";
  MinecraftItemTypes2["ChiseledPolishedBlackstone"] = "minecraft:chiseled_polished_blackstone";
  MinecraftItemTypes2["ChiseledQuartzBlock"] = "minecraft:chiseled_quartz_block";
  MinecraftItemTypes2["ChiseledRedSandstone"] = "minecraft:chiseled_red_sandstone";
  MinecraftItemTypes2["ChiseledResinBricks"] = "minecraft:chiseled_resin_bricks";
  MinecraftItemTypes2["ChiseledSandstone"] = "minecraft:chiseled_sandstone";
  MinecraftItemTypes2["ChiseledStoneBricks"] = "minecraft:chiseled_stone_bricks";
  MinecraftItemTypes2["ChiseledTuff"] = "minecraft:chiseled_tuff";
  MinecraftItemTypes2["ChiseledTuffBricks"] = "minecraft:chiseled_tuff_bricks";
  MinecraftItemTypes2["ChorusFlower"] = "minecraft:chorus_flower";
  MinecraftItemTypes2["ChorusFruit"] = "minecraft:chorus_fruit";
  MinecraftItemTypes2["ChorusPlant"] = "minecraft:chorus_plant";
  MinecraftItemTypes2["Clay"] = "minecraft:clay";
  MinecraftItemTypes2["ClayBall"] = "minecraft:clay_ball";
  MinecraftItemTypes2["Clock"] = "minecraft:clock";
  MinecraftItemTypes2["ClosedEyeblossom"] = "minecraft:closed_eyeblossom";
  MinecraftItemTypes2["Coal"] = "minecraft:coal";
  MinecraftItemTypes2["CoalBlock"] = "minecraft:coal_block";
  MinecraftItemTypes2["CoalOre"] = "minecraft:coal_ore";
  MinecraftItemTypes2["CoarseDirt"] = "minecraft:coarse_dirt";
  MinecraftItemTypes2["CoastArmorTrimSmithingTemplate"] = "minecraft:coast_armor_trim_smithing_template";
  MinecraftItemTypes2["CobbledDeepslate"] = "minecraft:cobbled_deepslate";
  MinecraftItemTypes2["CobbledDeepslateSlab"] = "minecraft:cobbled_deepslate_slab";
  MinecraftItemTypes2["CobbledDeepslateStairs"] = "minecraft:cobbled_deepslate_stairs";
  MinecraftItemTypes2["CobbledDeepslateWall"] = "minecraft:cobbled_deepslate_wall";
  MinecraftItemTypes2["Cobblestone"] = "minecraft:cobblestone";
  MinecraftItemTypes2["CobblestoneSlab"] = "minecraft:cobblestone_slab";
  MinecraftItemTypes2["CobblestoneWall"] = "minecraft:cobblestone_wall";
  MinecraftItemTypes2["CocoaBeans"] = "minecraft:cocoa_beans";
  MinecraftItemTypes2["Cod"] = "minecraft:cod";
  MinecraftItemTypes2["CodBucket"] = "minecraft:cod_bucket";
  MinecraftItemTypes2["CodSpawnEgg"] = "minecraft:cod_spawn_egg";
  MinecraftItemTypes2["CommandBlock"] = "minecraft:command_block";
  MinecraftItemTypes2["CommandBlockMinecart"] = "minecraft:command_block_minecart";
  MinecraftItemTypes2["Comparator"] = "minecraft:comparator";
  MinecraftItemTypes2["Compass"] = "minecraft:compass";
  MinecraftItemTypes2["Composter"] = "minecraft:composter";
  MinecraftItemTypes2["Conduit"] = "minecraft:conduit";
  MinecraftItemTypes2["CookedBeef"] = "minecraft:cooked_beef";
  MinecraftItemTypes2["CookedChicken"] = "minecraft:cooked_chicken";
  MinecraftItemTypes2["CookedCod"] = "minecraft:cooked_cod";
  MinecraftItemTypes2["CookedMutton"] = "minecraft:cooked_mutton";
  MinecraftItemTypes2["CookedPorkchop"] = "minecraft:cooked_porkchop";
  MinecraftItemTypes2["CookedRabbit"] = "minecraft:cooked_rabbit";
  MinecraftItemTypes2["CookedSalmon"] = "minecraft:cooked_salmon";
  MinecraftItemTypes2["Cookie"] = "minecraft:cookie";
  MinecraftItemTypes2["CopperAxe"] = "minecraft:copper_axe";
  MinecraftItemTypes2["CopperBars"] = "minecraft:copper_bars";
  MinecraftItemTypes2["CopperBlock"] = "minecraft:copper_block";
  MinecraftItemTypes2["CopperBoots"] = "minecraft:copper_boots";
  MinecraftItemTypes2["CopperBulb"] = "minecraft:copper_bulb";
  MinecraftItemTypes2["CopperChain"] = "minecraft:copper_chain";
  MinecraftItemTypes2["CopperChest"] = "minecraft:copper_chest";
  MinecraftItemTypes2["CopperChestplate"] = "minecraft:copper_chestplate";
  MinecraftItemTypes2["CopperDoor"] = "minecraft:copper_door";
  MinecraftItemTypes2["CopperGolemSpawnEgg"] = "minecraft:copper_golem_spawn_egg";
  MinecraftItemTypes2["CopperGolemStatue"] = "minecraft:copper_golem_statue";
  MinecraftItemTypes2["CopperGrate"] = "minecraft:copper_grate";
  MinecraftItemTypes2["CopperHelmet"] = "minecraft:copper_helmet";
  MinecraftItemTypes2["CopperHoe"] = "minecraft:copper_hoe";
  MinecraftItemTypes2["CopperHorseArmor"] = "minecraft:copper_horse_armor";
  MinecraftItemTypes2["CopperIngot"] = "minecraft:copper_ingot";
  MinecraftItemTypes2["CopperLantern"] = "minecraft:copper_lantern";
  MinecraftItemTypes2["CopperLeggings"] = "minecraft:copper_leggings";
  MinecraftItemTypes2["CopperNugget"] = "minecraft:copper_nugget";
  MinecraftItemTypes2["CopperOre"] = "minecraft:copper_ore";
  MinecraftItemTypes2["CopperPickaxe"] = "minecraft:copper_pickaxe";
  MinecraftItemTypes2["CopperShovel"] = "minecraft:copper_shovel";
  MinecraftItemTypes2["CopperSword"] = "minecraft:copper_sword";
  MinecraftItemTypes2["CopperTorch"] = "minecraft:copper_torch";
  MinecraftItemTypes2["CopperTrapdoor"] = "minecraft:copper_trapdoor";
  MinecraftItemTypes2["Cornflower"] = "minecraft:cornflower";
  MinecraftItemTypes2["CowSpawnEgg"] = "minecraft:cow_spawn_egg";
  MinecraftItemTypes2["CrackedDeepslateBricks"] = "minecraft:cracked_deepslate_bricks";
  MinecraftItemTypes2["CrackedDeepslateTiles"] = "minecraft:cracked_deepslate_tiles";
  MinecraftItemTypes2["CrackedNetherBricks"] = "minecraft:cracked_nether_bricks";
  MinecraftItemTypes2["CrackedPolishedBlackstoneBricks"] = "minecraft:cracked_polished_blackstone_bricks";
  MinecraftItemTypes2["CrackedStoneBricks"] = "minecraft:cracked_stone_bricks";
  MinecraftItemTypes2["Crafter"] = "minecraft:crafter";
  MinecraftItemTypes2["CraftingTable"] = "minecraft:crafting_table";
  MinecraftItemTypes2["CreakingHeart"] = "minecraft:creaking_heart";
  MinecraftItemTypes2["CreakingSpawnEgg"] = "minecraft:creaking_spawn_egg";
  MinecraftItemTypes2["CreeperBannerPattern"] = "minecraft:creeper_banner_pattern";
  MinecraftItemTypes2["CreeperHead"] = "minecraft:creeper_head";
  MinecraftItemTypes2["CreeperSpawnEgg"] = "minecraft:creeper_spawn_egg";
  MinecraftItemTypes2["CrimsonButton"] = "minecraft:crimson_button";
  MinecraftItemTypes2["CrimsonDoor"] = "minecraft:crimson_door";
  MinecraftItemTypes2["CrimsonFence"] = "minecraft:crimson_fence";
  MinecraftItemTypes2["CrimsonFenceGate"] = "minecraft:crimson_fence_gate";
  MinecraftItemTypes2["CrimsonFungus"] = "minecraft:crimson_fungus";
  MinecraftItemTypes2["CrimsonHangingSign"] = "minecraft:crimson_hanging_sign";
  MinecraftItemTypes2["CrimsonHyphae"] = "minecraft:crimson_hyphae";
  MinecraftItemTypes2["CrimsonNylium"] = "minecraft:crimson_nylium";
  MinecraftItemTypes2["CrimsonPlanks"] = "minecraft:crimson_planks";
  MinecraftItemTypes2["CrimsonPressurePlate"] = "minecraft:crimson_pressure_plate";
  MinecraftItemTypes2["CrimsonRoots"] = "minecraft:crimson_roots";
  MinecraftItemTypes2["CrimsonShelf"] = "minecraft:crimson_shelf";
  MinecraftItemTypes2["CrimsonSign"] = "minecraft:crimson_sign";
  MinecraftItemTypes2["CrimsonSlab"] = "minecraft:crimson_slab";
  MinecraftItemTypes2["CrimsonStairs"] = "minecraft:crimson_stairs";
  MinecraftItemTypes2["CrimsonStem"] = "minecraft:crimson_stem";
  MinecraftItemTypes2["CrimsonTrapdoor"] = "minecraft:crimson_trapdoor";
  MinecraftItemTypes2["Crossbow"] = "minecraft:crossbow";
  MinecraftItemTypes2["CryingObsidian"] = "minecraft:crying_obsidian";
  MinecraftItemTypes2["CutCopper"] = "minecraft:cut_copper";
  MinecraftItemTypes2["CutCopperSlab"] = "minecraft:cut_copper_slab";
  MinecraftItemTypes2["CutCopperStairs"] = "minecraft:cut_copper_stairs";
  MinecraftItemTypes2["CutRedSandstone"] = "minecraft:cut_red_sandstone";
  MinecraftItemTypes2["CutRedSandstoneSlab"] = "minecraft:cut_red_sandstone_slab";
  MinecraftItemTypes2["CutSandstone"] = "minecraft:cut_sandstone";
  MinecraftItemTypes2["CutSandstoneSlab"] = "minecraft:cut_sandstone_slab";
  MinecraftItemTypes2["CyanBundle"] = "minecraft:cyan_bundle";
  MinecraftItemTypes2["CyanCandle"] = "minecraft:cyan_candle";
  MinecraftItemTypes2["CyanCarpet"] = "minecraft:cyan_carpet";
  MinecraftItemTypes2["CyanConcrete"] = "minecraft:cyan_concrete";
  MinecraftItemTypes2["CyanConcretePowder"] = "minecraft:cyan_concrete_powder";
  MinecraftItemTypes2["CyanDye"] = "minecraft:cyan_dye";
  MinecraftItemTypes2["CyanGlazedTerracotta"] = "minecraft:cyan_glazed_terracotta";
  MinecraftItemTypes2["CyanHarness"] = "minecraft:cyan_harness";
  MinecraftItemTypes2["CyanShulkerBox"] = "minecraft:cyan_shulker_box";
  MinecraftItemTypes2["CyanStainedGlass"] = "minecraft:cyan_stained_glass";
  MinecraftItemTypes2["CyanStainedGlassPane"] = "minecraft:cyan_stained_glass_pane";
  MinecraftItemTypes2["CyanTerracotta"] = "minecraft:cyan_terracotta";
  MinecraftItemTypes2["CyanWool"] = "minecraft:cyan_wool";
  MinecraftItemTypes2["DamagedAnvil"] = "minecraft:damaged_anvil";
  MinecraftItemTypes2["Dandelion"] = "minecraft:dandelion";
  MinecraftItemTypes2["DangerPotterySherd"] = "minecraft:danger_pottery_sherd";
  MinecraftItemTypes2["DarkOakBoat"] = "minecraft:dark_oak_boat";
  MinecraftItemTypes2["DarkOakButton"] = "minecraft:dark_oak_button";
  MinecraftItemTypes2["DarkOakChestBoat"] = "minecraft:dark_oak_chest_boat";
  MinecraftItemTypes2["DarkOakDoor"] = "minecraft:dark_oak_door";
  MinecraftItemTypes2["DarkOakFence"] = "minecraft:dark_oak_fence";
  MinecraftItemTypes2["DarkOakFenceGate"] = "minecraft:dark_oak_fence_gate";
  MinecraftItemTypes2["DarkOakHangingSign"] = "minecraft:dark_oak_hanging_sign";
  MinecraftItemTypes2["DarkOakLeaves"] = "minecraft:dark_oak_leaves";
  MinecraftItemTypes2["DarkOakLog"] = "minecraft:dark_oak_log";
  MinecraftItemTypes2["DarkOakPlanks"] = "minecraft:dark_oak_planks";
  MinecraftItemTypes2["DarkOakPressurePlate"] = "minecraft:dark_oak_pressure_plate";
  MinecraftItemTypes2["DarkOakSapling"] = "minecraft:dark_oak_sapling";
  MinecraftItemTypes2["DarkOakShelf"] = "minecraft:dark_oak_shelf";
  MinecraftItemTypes2["DarkOakSign"] = "minecraft:dark_oak_sign";
  MinecraftItemTypes2["DarkOakSlab"] = "minecraft:dark_oak_slab";
  MinecraftItemTypes2["DarkOakStairs"] = "minecraft:dark_oak_stairs";
  MinecraftItemTypes2["DarkOakTrapdoor"] = "minecraft:dark_oak_trapdoor";
  MinecraftItemTypes2["DarkOakWood"] = "minecraft:dark_oak_wood";
  MinecraftItemTypes2["DarkPrismarine"] = "minecraft:dark_prismarine";
  MinecraftItemTypes2["DarkPrismarineSlab"] = "minecraft:dark_prismarine_slab";
  MinecraftItemTypes2["DarkPrismarineStairs"] = "minecraft:dark_prismarine_stairs";
  MinecraftItemTypes2["DaylightDetector"] = "minecraft:daylight_detector";
  MinecraftItemTypes2["DeadBrainCoral"] = "minecraft:dead_brain_coral";
  MinecraftItemTypes2["DeadBrainCoralBlock"] = "minecraft:dead_brain_coral_block";
  MinecraftItemTypes2["DeadBrainCoralFan"] = "minecraft:dead_brain_coral_fan";
  MinecraftItemTypes2["DeadBubbleCoral"] = "minecraft:dead_bubble_coral";
  MinecraftItemTypes2["DeadBubbleCoralBlock"] = "minecraft:dead_bubble_coral_block";
  MinecraftItemTypes2["DeadBubbleCoralFan"] = "minecraft:dead_bubble_coral_fan";
  MinecraftItemTypes2["DeadFireCoral"] = "minecraft:dead_fire_coral";
  MinecraftItemTypes2["DeadFireCoralBlock"] = "minecraft:dead_fire_coral_block";
  MinecraftItemTypes2["DeadFireCoralFan"] = "minecraft:dead_fire_coral_fan";
  MinecraftItemTypes2["DeadHornCoral"] = "minecraft:dead_horn_coral";
  MinecraftItemTypes2["DeadHornCoralBlock"] = "minecraft:dead_horn_coral_block";
  MinecraftItemTypes2["DeadHornCoralFan"] = "minecraft:dead_horn_coral_fan";
  MinecraftItemTypes2["DeadTubeCoral"] = "minecraft:dead_tube_coral";
  MinecraftItemTypes2["DeadTubeCoralBlock"] = "minecraft:dead_tube_coral_block";
  MinecraftItemTypes2["DeadTubeCoralFan"] = "minecraft:dead_tube_coral_fan";
  MinecraftItemTypes2["Deadbush"] = "minecraft:deadbush";
  MinecraftItemTypes2["DecoratedPot"] = "minecraft:decorated_pot";
  MinecraftItemTypes2["Deepslate"] = "minecraft:deepslate";
  MinecraftItemTypes2["DeepslateBrickSlab"] = "minecraft:deepslate_brick_slab";
  MinecraftItemTypes2["DeepslateBrickStairs"] = "minecraft:deepslate_brick_stairs";
  MinecraftItemTypes2["DeepslateBrickWall"] = "minecraft:deepslate_brick_wall";
  MinecraftItemTypes2["DeepslateBricks"] = "minecraft:deepslate_bricks";
  MinecraftItemTypes2["DeepslateCoalOre"] = "minecraft:deepslate_coal_ore";
  MinecraftItemTypes2["DeepslateCopperOre"] = "minecraft:deepslate_copper_ore";
  MinecraftItemTypes2["DeepslateDiamondOre"] = "minecraft:deepslate_diamond_ore";
  MinecraftItemTypes2["DeepslateEmeraldOre"] = "minecraft:deepslate_emerald_ore";
  MinecraftItemTypes2["DeepslateGoldOre"] = "minecraft:deepslate_gold_ore";
  MinecraftItemTypes2["DeepslateIronOre"] = "minecraft:deepslate_iron_ore";
  MinecraftItemTypes2["DeepslateLapisOre"] = "minecraft:deepslate_lapis_ore";
  MinecraftItemTypes2["DeepslateRedstoneOre"] = "minecraft:deepslate_redstone_ore";
  MinecraftItemTypes2["DeepslateTileSlab"] = "minecraft:deepslate_tile_slab";
  MinecraftItemTypes2["DeepslateTileStairs"] = "minecraft:deepslate_tile_stairs";
  MinecraftItemTypes2["DeepslateTileWall"] = "minecraft:deepslate_tile_wall";
  MinecraftItemTypes2["DeepslateTiles"] = "minecraft:deepslate_tiles";
  MinecraftItemTypes2["Deny"] = "minecraft:deny";
  MinecraftItemTypes2["DetectorRail"] = "minecraft:detector_rail";
  MinecraftItemTypes2["Diamond"] = "minecraft:diamond";
  MinecraftItemTypes2["DiamondAxe"] = "minecraft:diamond_axe";
  MinecraftItemTypes2["DiamondBlock"] = "minecraft:diamond_block";
  MinecraftItemTypes2["DiamondBoots"] = "minecraft:diamond_boots";
  MinecraftItemTypes2["DiamondChestplate"] = "minecraft:diamond_chestplate";
  MinecraftItemTypes2["DiamondHelmet"] = "minecraft:diamond_helmet";
  MinecraftItemTypes2["DiamondHoe"] = "minecraft:diamond_hoe";
  MinecraftItemTypes2["DiamondHorseArmor"] = "minecraft:diamond_horse_armor";
  MinecraftItemTypes2["DiamondLeggings"] = "minecraft:diamond_leggings";
  MinecraftItemTypes2["DiamondOre"] = "minecraft:diamond_ore";
  MinecraftItemTypes2["DiamondPickaxe"] = "minecraft:diamond_pickaxe";
  MinecraftItemTypes2["DiamondShovel"] = "minecraft:diamond_shovel";
  MinecraftItemTypes2["DiamondSword"] = "minecraft:diamond_sword";
  MinecraftItemTypes2["Diorite"] = "minecraft:diorite";
  MinecraftItemTypes2["DioriteSlab"] = "minecraft:diorite_slab";
  MinecraftItemTypes2["DioriteStairs"] = "minecraft:diorite_stairs";
  MinecraftItemTypes2["DioriteWall"] = "minecraft:diorite_wall";
  MinecraftItemTypes2["Dirt"] = "minecraft:dirt";
  MinecraftItemTypes2["DirtWithRoots"] = "minecraft:dirt_with_roots";
  MinecraftItemTypes2["DiscFragment5"] = "minecraft:disc_fragment_5";
  MinecraftItemTypes2["Dispenser"] = "minecraft:dispenser";
  MinecraftItemTypes2["DolphinSpawnEgg"] = "minecraft:dolphin_spawn_egg";
  MinecraftItemTypes2["DonkeySpawnEgg"] = "minecraft:donkey_spawn_egg";
  MinecraftItemTypes2["DragonBreath"] = "minecraft:dragon_breath";
  MinecraftItemTypes2["DragonEgg"] = "minecraft:dragon_egg";
  MinecraftItemTypes2["DragonHead"] = "minecraft:dragon_head";
  MinecraftItemTypes2["DriedGhast"] = "minecraft:dried_ghast";
  MinecraftItemTypes2["DriedKelp"] = "minecraft:dried_kelp";
  MinecraftItemTypes2["DriedKelpBlock"] = "minecraft:dried_kelp_block";
  MinecraftItemTypes2["DripstoneBlock"] = "minecraft:dripstone_block";
  MinecraftItemTypes2["Dropper"] = "minecraft:dropper";
  MinecraftItemTypes2["DrownedSpawnEgg"] = "minecraft:drowned_spawn_egg";
  MinecraftItemTypes2["DuneArmorTrimSmithingTemplate"] = "minecraft:dune_armor_trim_smithing_template";
  MinecraftItemTypes2["EchoShard"] = "minecraft:echo_shard";
  MinecraftItemTypes2["Egg"] = "minecraft:egg";
  MinecraftItemTypes2["ElderGuardianSpawnEgg"] = "minecraft:elder_guardian_spawn_egg";
  MinecraftItemTypes2["Elytra"] = "minecraft:elytra";
  MinecraftItemTypes2["Emerald"] = "minecraft:emerald";
  MinecraftItemTypes2["EmeraldBlock"] = "minecraft:emerald_block";
  MinecraftItemTypes2["EmeraldOre"] = "minecraft:emerald_ore";
  MinecraftItemTypes2["EmptyMap"] = "minecraft:empty_map";
  MinecraftItemTypes2["EnchantedBook"] = "minecraft:enchanted_book";
  MinecraftItemTypes2["EnchantedGoldenApple"] = "minecraft:enchanted_golden_apple";
  MinecraftItemTypes2["EnchantingTable"] = "minecraft:enchanting_table";
  MinecraftItemTypes2["EndBrickStairs"] = "minecraft:end_brick_stairs";
  MinecraftItemTypes2["EndBricks"] = "minecraft:end_bricks";
  MinecraftItemTypes2["EndCrystal"] = "minecraft:end_crystal";
  MinecraftItemTypes2["EndPortalFrame"] = "minecraft:end_portal_frame";
  MinecraftItemTypes2["EndRod"] = "minecraft:end_rod";
  MinecraftItemTypes2["EndStone"] = "minecraft:end_stone";
  MinecraftItemTypes2["EndStoneBrickSlab"] = "minecraft:end_stone_brick_slab";
  MinecraftItemTypes2["EndStoneBrickWall"] = "minecraft:end_stone_brick_wall";
  MinecraftItemTypes2["EnderChest"] = "minecraft:ender_chest";
  MinecraftItemTypes2["EnderDragonSpawnEgg"] = "minecraft:ender_dragon_spawn_egg";
  MinecraftItemTypes2["EnderEye"] = "minecraft:ender_eye";
  MinecraftItemTypes2["EnderPearl"] = "minecraft:ender_pearl";
  MinecraftItemTypes2["EndermanSpawnEgg"] = "minecraft:enderman_spawn_egg";
  MinecraftItemTypes2["EndermiteSpawnEgg"] = "minecraft:endermite_spawn_egg";
  MinecraftItemTypes2["EvokerSpawnEgg"] = "minecraft:evoker_spawn_egg";
  MinecraftItemTypes2["ExperienceBottle"] = "minecraft:experience_bottle";
  MinecraftItemTypes2["ExplorerPotterySherd"] = "minecraft:explorer_pottery_sherd";
  MinecraftItemTypes2["ExposedChiseledCopper"] = "minecraft:exposed_chiseled_copper";
  MinecraftItemTypes2["ExposedCopper"] = "minecraft:exposed_copper";
  MinecraftItemTypes2["ExposedCopperBars"] = "minecraft:exposed_copper_bars";
  MinecraftItemTypes2["ExposedCopperBulb"] = "minecraft:exposed_copper_bulb";
  MinecraftItemTypes2["ExposedCopperChain"] = "minecraft:exposed_copper_chain";
  MinecraftItemTypes2["ExposedCopperChest"] = "minecraft:exposed_copper_chest";
  MinecraftItemTypes2["ExposedCopperDoor"] = "minecraft:exposed_copper_door";
  MinecraftItemTypes2["ExposedCopperGolemStatue"] = "minecraft:exposed_copper_golem_statue";
  MinecraftItemTypes2["ExposedCopperGrate"] = "minecraft:exposed_copper_grate";
  MinecraftItemTypes2["ExposedCopperLantern"] = "minecraft:exposed_copper_lantern";
  MinecraftItemTypes2["ExposedCopperTrapdoor"] = "minecraft:exposed_copper_trapdoor";
  MinecraftItemTypes2["ExposedCutCopper"] = "minecraft:exposed_cut_copper";
  MinecraftItemTypes2["ExposedCutCopperSlab"] = "minecraft:exposed_cut_copper_slab";
  MinecraftItemTypes2["ExposedCutCopperStairs"] = "minecraft:exposed_cut_copper_stairs";
  MinecraftItemTypes2["ExposedLightningRod"] = "minecraft:exposed_lightning_rod";
  MinecraftItemTypes2["EyeArmorTrimSmithingTemplate"] = "minecraft:eye_armor_trim_smithing_template";
  MinecraftItemTypes2["Farmland"] = "minecraft:farmland";
  MinecraftItemTypes2["Feather"] = "minecraft:feather";
  MinecraftItemTypes2["FenceGate"] = "minecraft:fence_gate";
  MinecraftItemTypes2["FermentedSpiderEye"] = "minecraft:fermented_spider_eye";
  MinecraftItemTypes2["Fern"] = "minecraft:fern";
  MinecraftItemTypes2["FieldMasonedBannerPattern"] = "minecraft:field_masoned_banner_pattern";
  MinecraftItemTypes2["FilledMap"] = "minecraft:filled_map";
  MinecraftItemTypes2["FireCharge"] = "minecraft:fire_charge";
  MinecraftItemTypes2["FireCoral"] = "minecraft:fire_coral";
  MinecraftItemTypes2["FireCoralBlock"] = "minecraft:fire_coral_block";
  MinecraftItemTypes2["FireCoralFan"] = "minecraft:fire_coral_fan";
  MinecraftItemTypes2["FireflyBush"] = "minecraft:firefly_bush";
  MinecraftItemTypes2["FireworkRocket"] = "minecraft:firework_rocket";
  MinecraftItemTypes2["FireworkStar"] = "minecraft:firework_star";
  MinecraftItemTypes2["FishingRod"] = "minecraft:fishing_rod";
  MinecraftItemTypes2["FletchingTable"] = "minecraft:fletching_table";
  MinecraftItemTypes2["Flint"] = "minecraft:flint";
  MinecraftItemTypes2["FlintAndSteel"] = "minecraft:flint_and_steel";
  MinecraftItemTypes2["FlowArmorTrimSmithingTemplate"] = "minecraft:flow_armor_trim_smithing_template";
  MinecraftItemTypes2["FlowBannerPattern"] = "minecraft:flow_banner_pattern";
  MinecraftItemTypes2["FlowPotterySherd"] = "minecraft:flow_pottery_sherd";
  MinecraftItemTypes2["FlowerBannerPattern"] = "minecraft:flower_banner_pattern";
  MinecraftItemTypes2["FlowerPot"] = "minecraft:flower_pot";
  MinecraftItemTypes2["FloweringAzalea"] = "minecraft:flowering_azalea";
  MinecraftItemTypes2["FoxSpawnEgg"] = "minecraft:fox_spawn_egg";
  MinecraftItemTypes2["Frame"] = "minecraft:frame";
  MinecraftItemTypes2["FriendPotterySherd"] = "minecraft:friend_pottery_sherd";
  MinecraftItemTypes2["FrogSpawn"] = "minecraft:frog_spawn";
  MinecraftItemTypes2["FrogSpawnEgg"] = "minecraft:frog_spawn_egg";
  MinecraftItemTypes2["FrostedIce"] = "minecraft:frosted_ice";
  MinecraftItemTypes2["Furnace"] = "minecraft:furnace";
  MinecraftItemTypes2["GhastSpawnEgg"] = "minecraft:ghast_spawn_egg";
  MinecraftItemTypes2["GhastTear"] = "minecraft:ghast_tear";
  MinecraftItemTypes2["GildedBlackstone"] = "minecraft:gilded_blackstone";
  MinecraftItemTypes2["Glass"] = "minecraft:glass";
  MinecraftItemTypes2["GlassBottle"] = "minecraft:glass_bottle";
  MinecraftItemTypes2["GlassPane"] = "minecraft:glass_pane";
  MinecraftItemTypes2["GlisteringMelonSlice"] = "minecraft:glistering_melon_slice";
  MinecraftItemTypes2["GlobeBannerPattern"] = "minecraft:globe_banner_pattern";
  MinecraftItemTypes2["GlowBerries"] = "minecraft:glow_berries";
  MinecraftItemTypes2["GlowFrame"] = "minecraft:glow_frame";
  MinecraftItemTypes2["GlowInkSac"] = "minecraft:glow_ink_sac";
  MinecraftItemTypes2["GlowLichen"] = "minecraft:glow_lichen";
  MinecraftItemTypes2["GlowSquidSpawnEgg"] = "minecraft:glow_squid_spawn_egg";
  MinecraftItemTypes2["Glowstone"] = "minecraft:glowstone";
  MinecraftItemTypes2["GlowstoneDust"] = "minecraft:glowstone_dust";
  MinecraftItemTypes2["GoatHorn"] = "minecraft:goat_horn";
  MinecraftItemTypes2["GoatSpawnEgg"] = "minecraft:goat_spawn_egg";
  MinecraftItemTypes2["GoldBlock"] = "minecraft:gold_block";
  MinecraftItemTypes2["GoldIngot"] = "minecraft:gold_ingot";
  MinecraftItemTypes2["GoldNugget"] = "minecraft:gold_nugget";
  MinecraftItemTypes2["GoldOre"] = "minecraft:gold_ore";
  MinecraftItemTypes2["GoldenApple"] = "minecraft:golden_apple";
  MinecraftItemTypes2["GoldenAxe"] = "minecraft:golden_axe";
  MinecraftItemTypes2["GoldenBoots"] = "minecraft:golden_boots";
  MinecraftItemTypes2["GoldenCarrot"] = "minecraft:golden_carrot";
  MinecraftItemTypes2["GoldenChestplate"] = "minecraft:golden_chestplate";
  MinecraftItemTypes2["GoldenHelmet"] = "minecraft:golden_helmet";
  MinecraftItemTypes2["GoldenHoe"] = "minecraft:golden_hoe";
  MinecraftItemTypes2["GoldenHorseArmor"] = "minecraft:golden_horse_armor";
  MinecraftItemTypes2["GoldenLeggings"] = "minecraft:golden_leggings";
  MinecraftItemTypes2["GoldenPickaxe"] = "minecraft:golden_pickaxe";
  MinecraftItemTypes2["GoldenRail"] = "minecraft:golden_rail";
  MinecraftItemTypes2["GoldenShovel"] = "minecraft:golden_shovel";
  MinecraftItemTypes2["GoldenSword"] = "minecraft:golden_sword";
  MinecraftItemTypes2["Granite"] = "minecraft:granite";
  MinecraftItemTypes2["GraniteSlab"] = "minecraft:granite_slab";
  MinecraftItemTypes2["GraniteStairs"] = "minecraft:granite_stairs";
  MinecraftItemTypes2["GraniteWall"] = "minecraft:granite_wall";
  MinecraftItemTypes2["GrassBlock"] = "minecraft:grass_block";
  MinecraftItemTypes2["GrassPath"] = "minecraft:grass_path";
  MinecraftItemTypes2["Gravel"] = "minecraft:gravel";
  MinecraftItemTypes2["GrayBundle"] = "minecraft:gray_bundle";
  MinecraftItemTypes2["GrayCandle"] = "minecraft:gray_candle";
  MinecraftItemTypes2["GrayCarpet"] = "minecraft:gray_carpet";
  MinecraftItemTypes2["GrayConcrete"] = "minecraft:gray_concrete";
  MinecraftItemTypes2["GrayConcretePowder"] = "minecraft:gray_concrete_powder";
  MinecraftItemTypes2["GrayDye"] = "minecraft:gray_dye";
  MinecraftItemTypes2["GrayGlazedTerracotta"] = "minecraft:gray_glazed_terracotta";
  MinecraftItemTypes2["GrayHarness"] = "minecraft:gray_harness";
  MinecraftItemTypes2["GrayShulkerBox"] = "minecraft:gray_shulker_box";
  MinecraftItemTypes2["GrayStainedGlass"] = "minecraft:gray_stained_glass";
  MinecraftItemTypes2["GrayStainedGlassPane"] = "minecraft:gray_stained_glass_pane";
  MinecraftItemTypes2["GrayTerracotta"] = "minecraft:gray_terracotta";
  MinecraftItemTypes2["GrayWool"] = "minecraft:gray_wool";
  MinecraftItemTypes2["GreenBundle"] = "minecraft:green_bundle";
  MinecraftItemTypes2["GreenCandle"] = "minecraft:green_candle";
  MinecraftItemTypes2["GreenCarpet"] = "minecraft:green_carpet";
  MinecraftItemTypes2["GreenConcrete"] = "minecraft:green_concrete";
  MinecraftItemTypes2["GreenConcretePowder"] = "minecraft:green_concrete_powder";
  MinecraftItemTypes2["GreenDye"] = "minecraft:green_dye";
  MinecraftItemTypes2["GreenGlazedTerracotta"] = "minecraft:green_glazed_terracotta";
  MinecraftItemTypes2["GreenHarness"] = "minecraft:green_harness";
  MinecraftItemTypes2["GreenShulkerBox"] = "minecraft:green_shulker_box";
  MinecraftItemTypes2["GreenStainedGlass"] = "minecraft:green_stained_glass";
  MinecraftItemTypes2["GreenStainedGlassPane"] = "minecraft:green_stained_glass_pane";
  MinecraftItemTypes2["GreenTerracotta"] = "minecraft:green_terracotta";
  MinecraftItemTypes2["GreenWool"] = "minecraft:green_wool";
  MinecraftItemTypes2["Grindstone"] = "minecraft:grindstone";
  MinecraftItemTypes2["GuardianSpawnEgg"] = "minecraft:guardian_spawn_egg";
  MinecraftItemTypes2["Gunpowder"] = "minecraft:gunpowder";
  MinecraftItemTypes2["GusterBannerPattern"] = "minecraft:guster_banner_pattern";
  MinecraftItemTypes2["GusterPotterySherd"] = "minecraft:guster_pottery_sherd";
  MinecraftItemTypes2["HangingRoots"] = "minecraft:hanging_roots";
  MinecraftItemTypes2["HappyGhastSpawnEgg"] = "minecraft:happy_ghast_spawn_egg";
  MinecraftItemTypes2["HardenedClay"] = "minecraft:hardened_clay";
  MinecraftItemTypes2["HayBlock"] = "minecraft:hay_block";
  MinecraftItemTypes2["HeartOfTheSea"] = "minecraft:heart_of_the_sea";
  MinecraftItemTypes2["HeartPotterySherd"] = "minecraft:heart_pottery_sherd";
  MinecraftItemTypes2["HeartbreakPotterySherd"] = "minecraft:heartbreak_pottery_sherd";
  MinecraftItemTypes2["HeavyCore"] = "minecraft:heavy_core";
  MinecraftItemTypes2["HeavyWeightedPressurePlate"] = "minecraft:heavy_weighted_pressure_plate";
  MinecraftItemTypes2["HoglinSpawnEgg"] = "minecraft:hoglin_spawn_egg";
  MinecraftItemTypes2["HoneyBlock"] = "minecraft:honey_block";
  MinecraftItemTypes2["HoneyBottle"] = "minecraft:honey_bottle";
  MinecraftItemTypes2["Honeycomb"] = "minecraft:honeycomb";
  MinecraftItemTypes2["HoneycombBlock"] = "minecraft:honeycomb_block";
  MinecraftItemTypes2["Hopper"] = "minecraft:hopper";
  MinecraftItemTypes2["HopperMinecart"] = "minecraft:hopper_minecart";
  MinecraftItemTypes2["HornCoral"] = "minecraft:horn_coral";
  MinecraftItemTypes2["HornCoralBlock"] = "minecraft:horn_coral_block";
  MinecraftItemTypes2["HornCoralFan"] = "minecraft:horn_coral_fan";
  MinecraftItemTypes2["HorseSpawnEgg"] = "minecraft:horse_spawn_egg";
  MinecraftItemTypes2["HostArmorTrimSmithingTemplate"] = "minecraft:host_armor_trim_smithing_template";
  MinecraftItemTypes2["HowlPotterySherd"] = "minecraft:howl_pottery_sherd";
  MinecraftItemTypes2["HuskSpawnEgg"] = "minecraft:husk_spawn_egg";
  MinecraftItemTypes2["Ice"] = "minecraft:ice";
  MinecraftItemTypes2["InfestedChiseledStoneBricks"] = "minecraft:infested_chiseled_stone_bricks";
  MinecraftItemTypes2["InfestedCobblestone"] = "minecraft:infested_cobblestone";
  MinecraftItemTypes2["InfestedCrackedStoneBricks"] = "minecraft:infested_cracked_stone_bricks";
  MinecraftItemTypes2["InfestedDeepslate"] = "minecraft:infested_deepslate";
  MinecraftItemTypes2["InfestedMossyStoneBricks"] = "minecraft:infested_mossy_stone_bricks";
  MinecraftItemTypes2["InfestedStone"] = "minecraft:infested_stone";
  MinecraftItemTypes2["InfestedStoneBricks"] = "minecraft:infested_stone_bricks";
  MinecraftItemTypes2["InkSac"] = "minecraft:ink_sac";
  MinecraftItemTypes2["IronAxe"] = "minecraft:iron_axe";
  MinecraftItemTypes2["IronBars"] = "minecraft:iron_bars";
  MinecraftItemTypes2["IronBlock"] = "minecraft:iron_block";
  MinecraftItemTypes2["IronBoots"] = "minecraft:iron_boots";
  MinecraftItemTypes2["IronChain"] = "minecraft:iron_chain";
  MinecraftItemTypes2["IronChestplate"] = "minecraft:iron_chestplate";
  MinecraftItemTypes2["IronDoor"] = "minecraft:iron_door";
  MinecraftItemTypes2["IronGolemSpawnEgg"] = "minecraft:iron_golem_spawn_egg";
  MinecraftItemTypes2["IronHelmet"] = "minecraft:iron_helmet";
  MinecraftItemTypes2["IronHoe"] = "minecraft:iron_hoe";
  MinecraftItemTypes2["IronHorseArmor"] = "minecraft:iron_horse_armor";
  MinecraftItemTypes2["IronIngot"] = "minecraft:iron_ingot";
  MinecraftItemTypes2["IronLeggings"] = "minecraft:iron_leggings";
  MinecraftItemTypes2["IronNugget"] = "minecraft:iron_nugget";
  MinecraftItemTypes2["IronOre"] = "minecraft:iron_ore";
  MinecraftItemTypes2["IronPickaxe"] = "minecraft:iron_pickaxe";
  MinecraftItemTypes2["IronShovel"] = "minecraft:iron_shovel";
  MinecraftItemTypes2["IronSword"] = "minecraft:iron_sword";
  MinecraftItemTypes2["IronTrapdoor"] = "minecraft:iron_trapdoor";
  MinecraftItemTypes2["Jigsaw"] = "minecraft:jigsaw";
  MinecraftItemTypes2["Jukebox"] = "minecraft:jukebox";
  MinecraftItemTypes2["JungleBoat"] = "minecraft:jungle_boat";
  MinecraftItemTypes2["JungleButton"] = "minecraft:jungle_button";
  MinecraftItemTypes2["JungleChestBoat"] = "minecraft:jungle_chest_boat";
  MinecraftItemTypes2["JungleDoor"] = "minecraft:jungle_door";
  MinecraftItemTypes2["JungleFence"] = "minecraft:jungle_fence";
  MinecraftItemTypes2["JungleFenceGate"] = "minecraft:jungle_fence_gate";
  MinecraftItemTypes2["JungleHangingSign"] = "minecraft:jungle_hanging_sign";
  MinecraftItemTypes2["JungleLeaves"] = "minecraft:jungle_leaves";
  MinecraftItemTypes2["JungleLog"] = "minecraft:jungle_log";
  MinecraftItemTypes2["JunglePlanks"] = "minecraft:jungle_planks";
  MinecraftItemTypes2["JunglePressurePlate"] = "minecraft:jungle_pressure_plate";
  MinecraftItemTypes2["JungleSapling"] = "minecraft:jungle_sapling";
  MinecraftItemTypes2["JungleShelf"] = "minecraft:jungle_shelf";
  MinecraftItemTypes2["JungleSign"] = "minecraft:jungle_sign";
  MinecraftItemTypes2["JungleSlab"] = "minecraft:jungle_slab";
  MinecraftItemTypes2["JungleStairs"] = "minecraft:jungle_stairs";
  MinecraftItemTypes2["JungleTrapdoor"] = "minecraft:jungle_trapdoor";
  MinecraftItemTypes2["JungleWood"] = "minecraft:jungle_wood";
  MinecraftItemTypes2["Kelp"] = "minecraft:kelp";
  MinecraftItemTypes2["Ladder"] = "minecraft:ladder";
  MinecraftItemTypes2["Lantern"] = "minecraft:lantern";
  MinecraftItemTypes2["LapisBlock"] = "minecraft:lapis_block";
  MinecraftItemTypes2["LapisLazuli"] = "minecraft:lapis_lazuli";
  MinecraftItemTypes2["LapisOre"] = "minecraft:lapis_ore";
  MinecraftItemTypes2["LargeAmethystBud"] = "minecraft:large_amethyst_bud";
  MinecraftItemTypes2["LargeFern"] = "minecraft:large_fern";
  MinecraftItemTypes2["LavaBucket"] = "minecraft:lava_bucket";
  MinecraftItemTypes2["Lead"] = "minecraft:lead";
  MinecraftItemTypes2["LeafLitter"] = "minecraft:leaf_litter";
  MinecraftItemTypes2["Leather"] = "minecraft:leather";
  MinecraftItemTypes2["LeatherBoots"] = "minecraft:leather_boots";
  MinecraftItemTypes2["LeatherChestplate"] = "minecraft:leather_chestplate";
  MinecraftItemTypes2["LeatherHelmet"] = "minecraft:leather_helmet";
  MinecraftItemTypes2["LeatherHorseArmor"] = "minecraft:leather_horse_armor";
  MinecraftItemTypes2["LeatherLeggings"] = "minecraft:leather_leggings";
  MinecraftItemTypes2["Lectern"] = "minecraft:lectern";
  MinecraftItemTypes2["Lever"] = "minecraft:lever";
  MinecraftItemTypes2["LightBlock0"] = "minecraft:light_block_0";
  MinecraftItemTypes2["LightBlock1"] = "minecraft:light_block_1";
  MinecraftItemTypes2["LightBlock10"] = "minecraft:light_block_10";
  MinecraftItemTypes2["LightBlock11"] = "minecraft:light_block_11";
  MinecraftItemTypes2["LightBlock12"] = "minecraft:light_block_12";
  MinecraftItemTypes2["LightBlock13"] = "minecraft:light_block_13";
  MinecraftItemTypes2["LightBlock14"] = "minecraft:light_block_14";
  MinecraftItemTypes2["LightBlock15"] = "minecraft:light_block_15";
  MinecraftItemTypes2["LightBlock2"] = "minecraft:light_block_2";
  MinecraftItemTypes2["LightBlock3"] = "minecraft:light_block_3";
  MinecraftItemTypes2["LightBlock4"] = "minecraft:light_block_4";
  MinecraftItemTypes2["LightBlock5"] = "minecraft:light_block_5";
  MinecraftItemTypes2["LightBlock6"] = "minecraft:light_block_6";
  MinecraftItemTypes2["LightBlock7"] = "minecraft:light_block_7";
  MinecraftItemTypes2["LightBlock8"] = "minecraft:light_block_8";
  MinecraftItemTypes2["LightBlock9"] = "minecraft:light_block_9";
  MinecraftItemTypes2["LightBlueBundle"] = "minecraft:light_blue_bundle";
  MinecraftItemTypes2["LightBlueCandle"] = "minecraft:light_blue_candle";
  MinecraftItemTypes2["LightBlueCarpet"] = "minecraft:light_blue_carpet";
  MinecraftItemTypes2["LightBlueConcrete"] = "minecraft:light_blue_concrete";
  MinecraftItemTypes2["LightBlueConcretePowder"] = "minecraft:light_blue_concrete_powder";
  MinecraftItemTypes2["LightBlueDye"] = "minecraft:light_blue_dye";
  MinecraftItemTypes2["LightBlueGlazedTerracotta"] = "minecraft:light_blue_glazed_terracotta";
  MinecraftItemTypes2["LightBlueHarness"] = "minecraft:light_blue_harness";
  MinecraftItemTypes2["LightBlueShulkerBox"] = "minecraft:light_blue_shulker_box";
  MinecraftItemTypes2["LightBlueStainedGlass"] = "minecraft:light_blue_stained_glass";
  MinecraftItemTypes2["LightBlueStainedGlassPane"] = "minecraft:light_blue_stained_glass_pane";
  MinecraftItemTypes2["LightBlueTerracotta"] = "minecraft:light_blue_terracotta";
  MinecraftItemTypes2["LightBlueWool"] = "minecraft:light_blue_wool";
  MinecraftItemTypes2["LightGrayBundle"] = "minecraft:light_gray_bundle";
  MinecraftItemTypes2["LightGrayCandle"] = "minecraft:light_gray_candle";
  MinecraftItemTypes2["LightGrayCarpet"] = "minecraft:light_gray_carpet";
  MinecraftItemTypes2["LightGrayConcrete"] = "minecraft:light_gray_concrete";
  MinecraftItemTypes2["LightGrayConcretePowder"] = "minecraft:light_gray_concrete_powder";
  MinecraftItemTypes2["LightGrayDye"] = "minecraft:light_gray_dye";
  MinecraftItemTypes2["LightGrayHarness"] = "minecraft:light_gray_harness";
  MinecraftItemTypes2["LightGrayShulkerBox"] = "minecraft:light_gray_shulker_box";
  MinecraftItemTypes2["LightGrayStainedGlass"] = "minecraft:light_gray_stained_glass";
  MinecraftItemTypes2["LightGrayStainedGlassPane"] = "minecraft:light_gray_stained_glass_pane";
  MinecraftItemTypes2["LightGrayTerracotta"] = "minecraft:light_gray_terracotta";
  MinecraftItemTypes2["LightGrayWool"] = "minecraft:light_gray_wool";
  MinecraftItemTypes2["LightWeightedPressurePlate"] = "minecraft:light_weighted_pressure_plate";
  MinecraftItemTypes2["LightningRod"] = "minecraft:lightning_rod";
  MinecraftItemTypes2["Lilac"] = "minecraft:lilac";
  MinecraftItemTypes2["LilyOfTheValley"] = "minecraft:lily_of_the_valley";
  MinecraftItemTypes2["LimeBundle"] = "minecraft:lime_bundle";
  MinecraftItemTypes2["LimeCandle"] = "minecraft:lime_candle";
  MinecraftItemTypes2["LimeCarpet"] = "minecraft:lime_carpet";
  MinecraftItemTypes2["LimeConcrete"] = "minecraft:lime_concrete";
  MinecraftItemTypes2["LimeConcretePowder"] = "minecraft:lime_concrete_powder";
  MinecraftItemTypes2["LimeDye"] = "minecraft:lime_dye";
  MinecraftItemTypes2["LimeGlazedTerracotta"] = "minecraft:lime_glazed_terracotta";
  MinecraftItemTypes2["LimeHarness"] = "minecraft:lime_harness";
  MinecraftItemTypes2["LimeShulkerBox"] = "minecraft:lime_shulker_box";
  MinecraftItemTypes2["LimeStainedGlass"] = "minecraft:lime_stained_glass";
  MinecraftItemTypes2["LimeStainedGlassPane"] = "minecraft:lime_stained_glass_pane";
  MinecraftItemTypes2["LimeTerracotta"] = "minecraft:lime_terracotta";
  MinecraftItemTypes2["LimeWool"] = "minecraft:lime_wool";
  MinecraftItemTypes2["LingeringPotion"] = "minecraft:lingering_potion";
  MinecraftItemTypes2["LitPumpkin"] = "minecraft:lit_pumpkin";
  MinecraftItemTypes2["LlamaSpawnEgg"] = "minecraft:llama_spawn_egg";
  MinecraftItemTypes2["Lodestone"] = "minecraft:lodestone";
  MinecraftItemTypes2["LodestoneCompass"] = "minecraft:lodestone_compass";
  MinecraftItemTypes2["Loom"] = "minecraft:loom";
  MinecraftItemTypes2["Mace"] = "minecraft:mace";
  MinecraftItemTypes2["MagentaBundle"] = "minecraft:magenta_bundle";
  MinecraftItemTypes2["MagentaCandle"] = "minecraft:magenta_candle";
  MinecraftItemTypes2["MagentaCarpet"] = "minecraft:magenta_carpet";
  MinecraftItemTypes2["MagentaConcrete"] = "minecraft:magenta_concrete";
  MinecraftItemTypes2["MagentaConcretePowder"] = "minecraft:magenta_concrete_powder";
  MinecraftItemTypes2["MagentaDye"] = "minecraft:magenta_dye";
  MinecraftItemTypes2["MagentaGlazedTerracotta"] = "minecraft:magenta_glazed_terracotta";
  MinecraftItemTypes2["MagentaHarness"] = "minecraft:magenta_harness";
  MinecraftItemTypes2["MagentaShulkerBox"] = "minecraft:magenta_shulker_box";
  MinecraftItemTypes2["MagentaStainedGlass"] = "minecraft:magenta_stained_glass";
  MinecraftItemTypes2["MagentaStainedGlassPane"] = "minecraft:magenta_stained_glass_pane";
  MinecraftItemTypes2["MagentaTerracotta"] = "minecraft:magenta_terracotta";
  MinecraftItemTypes2["MagentaWool"] = "minecraft:magenta_wool";
  MinecraftItemTypes2["Magma"] = "minecraft:magma";
  MinecraftItemTypes2["MagmaCream"] = "minecraft:magma_cream";
  MinecraftItemTypes2["MagmaCubeSpawnEgg"] = "minecraft:magma_cube_spawn_egg";
  MinecraftItemTypes2["MangroveBoat"] = "minecraft:mangrove_boat";
  MinecraftItemTypes2["MangroveButton"] = "minecraft:mangrove_button";
  MinecraftItemTypes2["MangroveChestBoat"] = "minecraft:mangrove_chest_boat";
  MinecraftItemTypes2["MangroveDoor"] = "minecraft:mangrove_door";
  MinecraftItemTypes2["MangroveFence"] = "minecraft:mangrove_fence";
  MinecraftItemTypes2["MangroveFenceGate"] = "minecraft:mangrove_fence_gate";
  MinecraftItemTypes2["MangroveHangingSign"] = "minecraft:mangrove_hanging_sign";
  MinecraftItemTypes2["MangroveLeaves"] = "minecraft:mangrove_leaves";
  MinecraftItemTypes2["MangroveLog"] = "minecraft:mangrove_log";
  MinecraftItemTypes2["MangrovePlanks"] = "minecraft:mangrove_planks";
  MinecraftItemTypes2["MangrovePressurePlate"] = "minecraft:mangrove_pressure_plate";
  MinecraftItemTypes2["MangrovePropagule"] = "minecraft:mangrove_propagule";
  MinecraftItemTypes2["MangroveRoots"] = "minecraft:mangrove_roots";
  MinecraftItemTypes2["MangroveShelf"] = "minecraft:mangrove_shelf";
  MinecraftItemTypes2["MangroveSign"] = "minecraft:mangrove_sign";
  MinecraftItemTypes2["MangroveSlab"] = "minecraft:mangrove_slab";
  MinecraftItemTypes2["MangroveStairs"] = "minecraft:mangrove_stairs";
  MinecraftItemTypes2["MangroveTrapdoor"] = "minecraft:mangrove_trapdoor";
  MinecraftItemTypes2["MangroveWood"] = "minecraft:mangrove_wood";
  MinecraftItemTypes2["MediumAmethystBud"] = "minecraft:medium_amethyst_bud";
  MinecraftItemTypes2["MelonBlock"] = "minecraft:melon_block";
  MinecraftItemTypes2["MelonSeeds"] = "minecraft:melon_seeds";
  MinecraftItemTypes2["MelonSlice"] = "minecraft:melon_slice";
  MinecraftItemTypes2["MilkBucket"] = "minecraft:milk_bucket";
  MinecraftItemTypes2["Minecart"] = "minecraft:minecart";
  MinecraftItemTypes2["MinerPotterySherd"] = "minecraft:miner_pottery_sherd";
  MinecraftItemTypes2["MobSpawner"] = "minecraft:mob_spawner";
  MinecraftItemTypes2["MojangBannerPattern"] = "minecraft:mojang_banner_pattern";
  MinecraftItemTypes2["MooshroomSpawnEgg"] = "minecraft:mooshroom_spawn_egg";
  MinecraftItemTypes2["MossBlock"] = "minecraft:moss_block";
  MinecraftItemTypes2["MossCarpet"] = "minecraft:moss_carpet";
  MinecraftItemTypes2["MossyCobblestone"] = "minecraft:mossy_cobblestone";
  MinecraftItemTypes2["MossyCobblestoneSlab"] = "minecraft:mossy_cobblestone_slab";
  MinecraftItemTypes2["MossyCobblestoneStairs"] = "minecraft:mossy_cobblestone_stairs";
  MinecraftItemTypes2["MossyCobblestoneWall"] = "minecraft:mossy_cobblestone_wall";
  MinecraftItemTypes2["MossyStoneBrickSlab"] = "minecraft:mossy_stone_brick_slab";
  MinecraftItemTypes2["MossyStoneBrickStairs"] = "minecraft:mossy_stone_brick_stairs";
  MinecraftItemTypes2["MossyStoneBrickWall"] = "minecraft:mossy_stone_brick_wall";
  MinecraftItemTypes2["MossyStoneBricks"] = "minecraft:mossy_stone_bricks";
  MinecraftItemTypes2["MournerPotterySherd"] = "minecraft:mourner_pottery_sherd";
  MinecraftItemTypes2["Mud"] = "minecraft:mud";
  MinecraftItemTypes2["MudBrickSlab"] = "minecraft:mud_brick_slab";
  MinecraftItemTypes2["MudBrickStairs"] = "minecraft:mud_brick_stairs";
  MinecraftItemTypes2["MudBrickWall"] = "minecraft:mud_brick_wall";
  MinecraftItemTypes2["MudBricks"] = "minecraft:mud_bricks";
  MinecraftItemTypes2["MuddyMangroveRoots"] = "minecraft:muddy_mangrove_roots";
  MinecraftItemTypes2["MuleSpawnEgg"] = "minecraft:mule_spawn_egg";
  MinecraftItemTypes2["MushroomStem"] = "minecraft:mushroom_stem";
  MinecraftItemTypes2["MushroomStew"] = "minecraft:mushroom_stew";
  MinecraftItemTypes2["MusicDisc11"] = "minecraft:music_disc_11";
  MinecraftItemTypes2["MusicDisc13"] = "minecraft:music_disc_13";
  MinecraftItemTypes2["MusicDisc5"] = "minecraft:music_disc_5";
  MinecraftItemTypes2["MusicDiscBlocks"] = "minecraft:music_disc_blocks";
  MinecraftItemTypes2["MusicDiscCat"] = "minecraft:music_disc_cat";
  MinecraftItemTypes2["MusicDiscChirp"] = "minecraft:music_disc_chirp";
  MinecraftItemTypes2["MusicDiscCreator"] = "minecraft:music_disc_creator";
  MinecraftItemTypes2["MusicDiscCreatorMusicBox"] = "minecraft:music_disc_creator_music_box";
  MinecraftItemTypes2["MusicDiscFar"] = "minecraft:music_disc_far";
  MinecraftItemTypes2["MusicDiscLavaChicken"] = "minecraft:music_disc_lava_chicken";
  MinecraftItemTypes2["MusicDiscMall"] = "minecraft:music_disc_mall";
  MinecraftItemTypes2["MusicDiscMellohi"] = "minecraft:music_disc_mellohi";
  MinecraftItemTypes2["MusicDiscOtherside"] = "minecraft:music_disc_otherside";
  MinecraftItemTypes2["MusicDiscPigstep"] = "minecraft:music_disc_pigstep";
  MinecraftItemTypes2["MusicDiscPrecipice"] = "minecraft:music_disc_precipice";
  MinecraftItemTypes2["MusicDiscRelic"] = "minecraft:music_disc_relic";
  MinecraftItemTypes2["MusicDiscStal"] = "minecraft:music_disc_stal";
  MinecraftItemTypes2["MusicDiscStrad"] = "minecraft:music_disc_strad";
  MinecraftItemTypes2["MusicDiscTears"] = "minecraft:music_disc_tears";
  MinecraftItemTypes2["MusicDiscWait"] = "minecraft:music_disc_wait";
  MinecraftItemTypes2["MusicDiscWard"] = "minecraft:music_disc_ward";
  MinecraftItemTypes2["Mutton"] = "minecraft:mutton";
  MinecraftItemTypes2["Mycelium"] = "minecraft:mycelium";
  MinecraftItemTypes2["NameTag"] = "minecraft:name_tag";
  MinecraftItemTypes2["NautilusShell"] = "minecraft:nautilus_shell";
  MinecraftItemTypes2["NetherBrick"] = "minecraft:nether_brick";
  MinecraftItemTypes2["NetherBrickFence"] = "minecraft:nether_brick_fence";
  MinecraftItemTypes2["NetherBrickSlab"] = "minecraft:nether_brick_slab";
  MinecraftItemTypes2["NetherBrickStairs"] = "minecraft:nether_brick_stairs";
  MinecraftItemTypes2["NetherBrickWall"] = "minecraft:nether_brick_wall";
  MinecraftItemTypes2["NetherGoldOre"] = "minecraft:nether_gold_ore";
  MinecraftItemTypes2["NetherSprouts"] = "minecraft:nether_sprouts";
  MinecraftItemTypes2["NetherStar"] = "minecraft:nether_star";
  MinecraftItemTypes2["NetherWart"] = "minecraft:nether_wart";
  MinecraftItemTypes2["NetherWartBlock"] = "minecraft:nether_wart_block";
  MinecraftItemTypes2["Netherbrick"] = "minecraft:netherbrick";
  MinecraftItemTypes2["NetheriteAxe"] = "minecraft:netherite_axe";
  MinecraftItemTypes2["NetheriteBlock"] = "minecraft:netherite_block";
  MinecraftItemTypes2["NetheriteBoots"] = "minecraft:netherite_boots";
  MinecraftItemTypes2["NetheriteChestplate"] = "minecraft:netherite_chestplate";
  MinecraftItemTypes2["NetheriteHelmet"] = "minecraft:netherite_helmet";
  MinecraftItemTypes2["NetheriteHoe"] = "minecraft:netherite_hoe";
  MinecraftItemTypes2["NetheriteIngot"] = "minecraft:netherite_ingot";
  MinecraftItemTypes2["NetheriteLeggings"] = "minecraft:netherite_leggings";
  MinecraftItemTypes2["NetheritePickaxe"] = "minecraft:netherite_pickaxe";
  MinecraftItemTypes2["NetheriteScrap"] = "minecraft:netherite_scrap";
  MinecraftItemTypes2["NetheriteShovel"] = "minecraft:netherite_shovel";
  MinecraftItemTypes2["NetheriteSword"] = "minecraft:netherite_sword";
  MinecraftItemTypes2["NetheriteUpgradeSmithingTemplate"] = "minecraft:netherite_upgrade_smithing_template";
  MinecraftItemTypes2["Netherrack"] = "minecraft:netherrack";
  MinecraftItemTypes2["NormalStoneSlab"] = "minecraft:normal_stone_slab";
  MinecraftItemTypes2["NormalStoneStairs"] = "minecraft:normal_stone_stairs";
  MinecraftItemTypes2["Noteblock"] = "minecraft:noteblock";
  MinecraftItemTypes2["OakBoat"] = "minecraft:oak_boat";
  MinecraftItemTypes2["OakChestBoat"] = "minecraft:oak_chest_boat";
  MinecraftItemTypes2["OakFence"] = "minecraft:oak_fence";
  MinecraftItemTypes2["OakHangingSign"] = "minecraft:oak_hanging_sign";
  MinecraftItemTypes2["OakLeaves"] = "minecraft:oak_leaves";
  MinecraftItemTypes2["OakLog"] = "minecraft:oak_log";
  MinecraftItemTypes2["OakPlanks"] = "minecraft:oak_planks";
  MinecraftItemTypes2["OakSapling"] = "minecraft:oak_sapling";
  MinecraftItemTypes2["OakShelf"] = "minecraft:oak_shelf";
  MinecraftItemTypes2["OakSign"] = "minecraft:oak_sign";
  MinecraftItemTypes2["OakSlab"] = "minecraft:oak_slab";
  MinecraftItemTypes2["OakStairs"] = "minecraft:oak_stairs";
  MinecraftItemTypes2["OakWood"] = "minecraft:oak_wood";
  MinecraftItemTypes2["Observer"] = "minecraft:observer";
  MinecraftItemTypes2["Obsidian"] = "minecraft:obsidian";
  MinecraftItemTypes2["OcelotSpawnEgg"] = "minecraft:ocelot_spawn_egg";
  MinecraftItemTypes2["OchreFroglight"] = "minecraft:ochre_froglight";
  MinecraftItemTypes2["OminousBottle"] = "minecraft:ominous_bottle";
  MinecraftItemTypes2["OminousTrialKey"] = "minecraft:ominous_trial_key";
  MinecraftItemTypes2["OpenEyeblossom"] = "minecraft:open_eyeblossom";
  MinecraftItemTypes2["OrangeBundle"] = "minecraft:orange_bundle";
  MinecraftItemTypes2["OrangeCandle"] = "minecraft:orange_candle";
  MinecraftItemTypes2["OrangeCarpet"] = "minecraft:orange_carpet";
  MinecraftItemTypes2["OrangeConcrete"] = "minecraft:orange_concrete";
  MinecraftItemTypes2["OrangeConcretePowder"] = "minecraft:orange_concrete_powder";
  MinecraftItemTypes2["OrangeDye"] = "minecraft:orange_dye";
  MinecraftItemTypes2["OrangeGlazedTerracotta"] = "minecraft:orange_glazed_terracotta";
  MinecraftItemTypes2["OrangeHarness"] = "minecraft:orange_harness";
  MinecraftItemTypes2["OrangeShulkerBox"] = "minecraft:orange_shulker_box";
  MinecraftItemTypes2["OrangeStainedGlass"] = "minecraft:orange_stained_glass";
  MinecraftItemTypes2["OrangeStainedGlassPane"] = "minecraft:orange_stained_glass_pane";
  MinecraftItemTypes2["OrangeTerracotta"] = "minecraft:orange_terracotta";
  MinecraftItemTypes2["OrangeTulip"] = "minecraft:orange_tulip";
  MinecraftItemTypes2["OrangeWool"] = "minecraft:orange_wool";
  MinecraftItemTypes2["OxeyeDaisy"] = "minecraft:oxeye_daisy";
  MinecraftItemTypes2["OxidizedChiseledCopper"] = "minecraft:oxidized_chiseled_copper";
  MinecraftItemTypes2["OxidizedCopper"] = "minecraft:oxidized_copper";
  MinecraftItemTypes2["OxidizedCopperBars"] = "minecraft:oxidized_copper_bars";
  MinecraftItemTypes2["OxidizedCopperBulb"] = "minecraft:oxidized_copper_bulb";
  MinecraftItemTypes2["OxidizedCopperChain"] = "minecraft:oxidized_copper_chain";
  MinecraftItemTypes2["OxidizedCopperChest"] = "minecraft:oxidized_copper_chest";
  MinecraftItemTypes2["OxidizedCopperDoor"] = "minecraft:oxidized_copper_door";
  MinecraftItemTypes2["OxidizedCopperGolemStatue"] = "minecraft:oxidized_copper_golem_statue";
  MinecraftItemTypes2["OxidizedCopperGrate"] = "minecraft:oxidized_copper_grate";
  MinecraftItemTypes2["OxidizedCopperLantern"] = "minecraft:oxidized_copper_lantern";
  MinecraftItemTypes2["OxidizedCopperTrapdoor"] = "minecraft:oxidized_copper_trapdoor";
  MinecraftItemTypes2["OxidizedCutCopper"] = "minecraft:oxidized_cut_copper";
  MinecraftItemTypes2["OxidizedCutCopperSlab"] = "minecraft:oxidized_cut_copper_slab";
  MinecraftItemTypes2["OxidizedCutCopperStairs"] = "minecraft:oxidized_cut_copper_stairs";
  MinecraftItemTypes2["OxidizedLightningRod"] = "minecraft:oxidized_lightning_rod";
  MinecraftItemTypes2["PackedIce"] = "minecraft:packed_ice";
  MinecraftItemTypes2["PackedMud"] = "minecraft:packed_mud";
  MinecraftItemTypes2["Painting"] = "minecraft:painting";
  MinecraftItemTypes2["PaleHangingMoss"] = "minecraft:pale_hanging_moss";
  MinecraftItemTypes2["PaleMossBlock"] = "minecraft:pale_moss_block";
  MinecraftItemTypes2["PaleMossCarpet"] = "minecraft:pale_moss_carpet";
  MinecraftItemTypes2["PaleOakBoat"] = "minecraft:pale_oak_boat";
  MinecraftItemTypes2["PaleOakButton"] = "minecraft:pale_oak_button";
  MinecraftItemTypes2["PaleOakChestBoat"] = "minecraft:pale_oak_chest_boat";
  MinecraftItemTypes2["PaleOakDoor"] = "minecraft:pale_oak_door";
  MinecraftItemTypes2["PaleOakFence"] = "minecraft:pale_oak_fence";
  MinecraftItemTypes2["PaleOakFenceGate"] = "minecraft:pale_oak_fence_gate";
  MinecraftItemTypes2["PaleOakHangingSign"] = "minecraft:pale_oak_hanging_sign";
  MinecraftItemTypes2["PaleOakLeaves"] = "minecraft:pale_oak_leaves";
  MinecraftItemTypes2["PaleOakLog"] = "minecraft:pale_oak_log";
  MinecraftItemTypes2["PaleOakPlanks"] = "minecraft:pale_oak_planks";
  MinecraftItemTypes2["PaleOakPressurePlate"] = "minecraft:pale_oak_pressure_plate";
  MinecraftItemTypes2["PaleOakSapling"] = "minecraft:pale_oak_sapling";
  MinecraftItemTypes2["PaleOakShelf"] = "minecraft:pale_oak_shelf";
  MinecraftItemTypes2["PaleOakSign"] = "minecraft:pale_oak_sign";
  MinecraftItemTypes2["PaleOakSlab"] = "minecraft:pale_oak_slab";
  MinecraftItemTypes2["PaleOakStairs"] = "minecraft:pale_oak_stairs";
  MinecraftItemTypes2["PaleOakTrapdoor"] = "minecraft:pale_oak_trapdoor";
  MinecraftItemTypes2["PaleOakWood"] = "minecraft:pale_oak_wood";
  MinecraftItemTypes2["PandaSpawnEgg"] = "minecraft:panda_spawn_egg";
  MinecraftItemTypes2["Paper"] = "minecraft:paper";
  MinecraftItemTypes2["ParrotSpawnEgg"] = "minecraft:parrot_spawn_egg";
  MinecraftItemTypes2["PearlescentFroglight"] = "minecraft:pearlescent_froglight";
  MinecraftItemTypes2["Peony"] = "minecraft:peony";
  MinecraftItemTypes2["PetrifiedOakSlab"] = "minecraft:petrified_oak_slab";
  MinecraftItemTypes2["PhantomMembrane"] = "minecraft:phantom_membrane";
  MinecraftItemTypes2["PhantomSpawnEgg"] = "minecraft:phantom_spawn_egg";
  MinecraftItemTypes2["PigSpawnEgg"] = "minecraft:pig_spawn_egg";
  MinecraftItemTypes2["PiglinBannerPattern"] = "minecraft:piglin_banner_pattern";
  MinecraftItemTypes2["PiglinBruteSpawnEgg"] = "minecraft:piglin_brute_spawn_egg";
  MinecraftItemTypes2["PiglinHead"] = "minecraft:piglin_head";
  MinecraftItemTypes2["PiglinSpawnEgg"] = "minecraft:piglin_spawn_egg";
  MinecraftItemTypes2["PillagerSpawnEgg"] = "minecraft:pillager_spawn_egg";
  MinecraftItemTypes2["PinkBundle"] = "minecraft:pink_bundle";
  MinecraftItemTypes2["PinkCandle"] = "minecraft:pink_candle";
  MinecraftItemTypes2["PinkCarpet"] = "minecraft:pink_carpet";
  MinecraftItemTypes2["PinkConcrete"] = "minecraft:pink_concrete";
  MinecraftItemTypes2["PinkConcretePowder"] = "minecraft:pink_concrete_powder";
  MinecraftItemTypes2["PinkDye"] = "minecraft:pink_dye";
  MinecraftItemTypes2["PinkGlazedTerracotta"] = "minecraft:pink_glazed_terracotta";
  MinecraftItemTypes2["PinkHarness"] = "minecraft:pink_harness";
  MinecraftItemTypes2["PinkPetals"] = "minecraft:pink_petals";
  MinecraftItemTypes2["PinkShulkerBox"] = "minecraft:pink_shulker_box";
  MinecraftItemTypes2["PinkStainedGlass"] = "minecraft:pink_stained_glass";
  MinecraftItemTypes2["PinkStainedGlassPane"] = "minecraft:pink_stained_glass_pane";
  MinecraftItemTypes2["PinkTerracotta"] = "minecraft:pink_terracotta";
  MinecraftItemTypes2["PinkTulip"] = "minecraft:pink_tulip";
  MinecraftItemTypes2["PinkWool"] = "minecraft:pink_wool";
  MinecraftItemTypes2["Piston"] = "minecraft:piston";
  MinecraftItemTypes2["PitcherPlant"] = "minecraft:pitcher_plant";
  MinecraftItemTypes2["PitcherPod"] = "minecraft:pitcher_pod";
  MinecraftItemTypes2["PlayerHead"] = "minecraft:player_head";
  MinecraftItemTypes2["PlentyPotterySherd"] = "minecraft:plenty_pottery_sherd";
  MinecraftItemTypes2["Podzol"] = "minecraft:podzol";
  MinecraftItemTypes2["PointedDripstone"] = "minecraft:pointed_dripstone";
  MinecraftItemTypes2["PoisonousPotato"] = "minecraft:poisonous_potato";
  MinecraftItemTypes2["PolarBearSpawnEgg"] = "minecraft:polar_bear_spawn_egg";
  MinecraftItemTypes2["PolishedAndesite"] = "minecraft:polished_andesite";
  MinecraftItemTypes2["PolishedAndesiteSlab"] = "minecraft:polished_andesite_slab";
  MinecraftItemTypes2["PolishedAndesiteStairs"] = "minecraft:polished_andesite_stairs";
  MinecraftItemTypes2["PolishedBasalt"] = "minecraft:polished_basalt";
  MinecraftItemTypes2["PolishedBlackstone"] = "minecraft:polished_blackstone";
  MinecraftItemTypes2["PolishedBlackstoneBrickSlab"] = "minecraft:polished_blackstone_brick_slab";
  MinecraftItemTypes2["PolishedBlackstoneBrickStairs"] = "minecraft:polished_blackstone_brick_stairs";
  MinecraftItemTypes2["PolishedBlackstoneBrickWall"] = "minecraft:polished_blackstone_brick_wall";
  MinecraftItemTypes2["PolishedBlackstoneBricks"] = "minecraft:polished_blackstone_bricks";
  MinecraftItemTypes2["PolishedBlackstoneButton"] = "minecraft:polished_blackstone_button";
  MinecraftItemTypes2["PolishedBlackstonePressurePlate"] = "minecraft:polished_blackstone_pressure_plate";
  MinecraftItemTypes2["PolishedBlackstoneSlab"] = "minecraft:polished_blackstone_slab";
  MinecraftItemTypes2["PolishedBlackstoneStairs"] = "minecraft:polished_blackstone_stairs";
  MinecraftItemTypes2["PolishedBlackstoneWall"] = "minecraft:polished_blackstone_wall";
  MinecraftItemTypes2["PolishedDeepslate"] = "minecraft:polished_deepslate";
  MinecraftItemTypes2["PolishedDeepslateSlab"] = "minecraft:polished_deepslate_slab";
  MinecraftItemTypes2["PolishedDeepslateStairs"] = "minecraft:polished_deepslate_stairs";
  MinecraftItemTypes2["PolishedDeepslateWall"] = "minecraft:polished_deepslate_wall";
  MinecraftItemTypes2["PolishedDiorite"] = "minecraft:polished_diorite";
  MinecraftItemTypes2["PolishedDioriteSlab"] = "minecraft:polished_diorite_slab";
  MinecraftItemTypes2["PolishedDioriteStairs"] = "minecraft:polished_diorite_stairs";
  MinecraftItemTypes2["PolishedGranite"] = "minecraft:polished_granite";
  MinecraftItemTypes2["PolishedGraniteSlab"] = "minecraft:polished_granite_slab";
  MinecraftItemTypes2["PolishedGraniteStairs"] = "minecraft:polished_granite_stairs";
  MinecraftItemTypes2["PolishedTuff"] = "minecraft:polished_tuff";
  MinecraftItemTypes2["PolishedTuffSlab"] = "minecraft:polished_tuff_slab";
  MinecraftItemTypes2["PolishedTuffStairs"] = "minecraft:polished_tuff_stairs";
  MinecraftItemTypes2["PolishedTuffWall"] = "minecraft:polished_tuff_wall";
  MinecraftItemTypes2["PoppedChorusFruit"] = "minecraft:popped_chorus_fruit";
  MinecraftItemTypes2["Poppy"] = "minecraft:poppy";
  MinecraftItemTypes2["Porkchop"] = "minecraft:porkchop";
  MinecraftItemTypes2["Potato"] = "minecraft:potato";
  MinecraftItemTypes2["Potion"] = "minecraft:potion";
  MinecraftItemTypes2["PowderSnowBucket"] = "minecraft:powder_snow_bucket";
  MinecraftItemTypes2["Prismarine"] = "minecraft:prismarine";
  MinecraftItemTypes2["PrismarineBrickSlab"] = "minecraft:prismarine_brick_slab";
  MinecraftItemTypes2["PrismarineBricks"] = "minecraft:prismarine_bricks";
  MinecraftItemTypes2["PrismarineBricksStairs"] = "minecraft:prismarine_bricks_stairs";
  MinecraftItemTypes2["PrismarineCrystals"] = "minecraft:prismarine_crystals";
  MinecraftItemTypes2["PrismarineShard"] = "minecraft:prismarine_shard";
  MinecraftItemTypes2["PrismarineSlab"] = "minecraft:prismarine_slab";
  MinecraftItemTypes2["PrismarineStairs"] = "minecraft:prismarine_stairs";
  MinecraftItemTypes2["PrismarineWall"] = "minecraft:prismarine_wall";
  MinecraftItemTypes2["PrizePotterySherd"] = "minecraft:prize_pottery_sherd";
  MinecraftItemTypes2["Pufferfish"] = "minecraft:pufferfish";
  MinecraftItemTypes2["PufferfishBucket"] = "minecraft:pufferfish_bucket";
  MinecraftItemTypes2["PufferfishSpawnEgg"] = "minecraft:pufferfish_spawn_egg";
  MinecraftItemTypes2["Pumpkin"] = "minecraft:pumpkin";
  MinecraftItemTypes2["PumpkinPie"] = "minecraft:pumpkin_pie";
  MinecraftItemTypes2["PumpkinSeeds"] = "minecraft:pumpkin_seeds";
  MinecraftItemTypes2["PurpleBundle"] = "minecraft:purple_bundle";
  MinecraftItemTypes2["PurpleCandle"] = "minecraft:purple_candle";
  MinecraftItemTypes2["PurpleCarpet"] = "minecraft:purple_carpet";
  MinecraftItemTypes2["PurpleConcrete"] = "minecraft:purple_concrete";
  MinecraftItemTypes2["PurpleConcretePowder"] = "minecraft:purple_concrete_powder";
  MinecraftItemTypes2["PurpleDye"] = "minecraft:purple_dye";
  MinecraftItemTypes2["PurpleGlazedTerracotta"] = "minecraft:purple_glazed_terracotta";
  MinecraftItemTypes2["PurpleHarness"] = "minecraft:purple_harness";
  MinecraftItemTypes2["PurpleShulkerBox"] = "minecraft:purple_shulker_box";
  MinecraftItemTypes2["PurpleStainedGlass"] = "minecraft:purple_stained_glass";
  MinecraftItemTypes2["PurpleStainedGlassPane"] = "minecraft:purple_stained_glass_pane";
  MinecraftItemTypes2["PurpleTerracotta"] = "minecraft:purple_terracotta";
  MinecraftItemTypes2["PurpleWool"] = "minecraft:purple_wool";
  MinecraftItemTypes2["PurpurBlock"] = "minecraft:purpur_block";
  MinecraftItemTypes2["PurpurPillar"] = "minecraft:purpur_pillar";
  MinecraftItemTypes2["PurpurSlab"] = "minecraft:purpur_slab";
  MinecraftItemTypes2["PurpurStairs"] = "minecraft:purpur_stairs";
  MinecraftItemTypes2["Quartz"] = "minecraft:quartz";
  MinecraftItemTypes2["QuartzBlock"] = "minecraft:quartz_block";
  MinecraftItemTypes2["QuartzBricks"] = "minecraft:quartz_bricks";
  MinecraftItemTypes2["QuartzOre"] = "minecraft:quartz_ore";
  MinecraftItemTypes2["QuartzPillar"] = "minecraft:quartz_pillar";
  MinecraftItemTypes2["QuartzSlab"] = "minecraft:quartz_slab";
  MinecraftItemTypes2["QuartzStairs"] = "minecraft:quartz_stairs";
  MinecraftItemTypes2["Rabbit"] = "minecraft:rabbit";
  MinecraftItemTypes2["RabbitFoot"] = "minecraft:rabbit_foot";
  MinecraftItemTypes2["RabbitHide"] = "minecraft:rabbit_hide";
  MinecraftItemTypes2["RabbitSpawnEgg"] = "minecraft:rabbit_spawn_egg";
  MinecraftItemTypes2["RabbitStew"] = "minecraft:rabbit_stew";
  MinecraftItemTypes2["Rail"] = "minecraft:rail";
  MinecraftItemTypes2["RaiserArmorTrimSmithingTemplate"] = "minecraft:raiser_armor_trim_smithing_template";
  MinecraftItemTypes2["RavagerSpawnEgg"] = "minecraft:ravager_spawn_egg";
  MinecraftItemTypes2["RawCopper"] = "minecraft:raw_copper";
  MinecraftItemTypes2["RawCopperBlock"] = "minecraft:raw_copper_block";
  MinecraftItemTypes2["RawGold"] = "minecraft:raw_gold";
  MinecraftItemTypes2["RawGoldBlock"] = "minecraft:raw_gold_block";
  MinecraftItemTypes2["RawIron"] = "minecraft:raw_iron";
  MinecraftItemTypes2["RawIronBlock"] = "minecraft:raw_iron_block";
  MinecraftItemTypes2["RecoveryCompass"] = "minecraft:recovery_compass";
  MinecraftItemTypes2["RedBundle"] = "minecraft:red_bundle";
  MinecraftItemTypes2["RedCandle"] = "minecraft:red_candle";
  MinecraftItemTypes2["RedCarpet"] = "minecraft:red_carpet";
  MinecraftItemTypes2["RedConcrete"] = "minecraft:red_concrete";
  MinecraftItemTypes2["RedConcretePowder"] = "minecraft:red_concrete_powder";
  MinecraftItemTypes2["RedDye"] = "minecraft:red_dye";
  MinecraftItemTypes2["RedGlazedTerracotta"] = "minecraft:red_glazed_terracotta";
  MinecraftItemTypes2["RedHarness"] = "minecraft:red_harness";
  MinecraftItemTypes2["RedMushroom"] = "minecraft:red_mushroom";
  MinecraftItemTypes2["RedMushroomBlock"] = "minecraft:red_mushroom_block";
  MinecraftItemTypes2["RedNetherBrick"] = "minecraft:red_nether_brick";
  MinecraftItemTypes2["RedNetherBrickSlab"] = "minecraft:red_nether_brick_slab";
  MinecraftItemTypes2["RedNetherBrickStairs"] = "minecraft:red_nether_brick_stairs";
  MinecraftItemTypes2["RedNetherBrickWall"] = "minecraft:red_nether_brick_wall";
  MinecraftItemTypes2["RedSand"] = "minecraft:red_sand";
  MinecraftItemTypes2["RedSandstone"] = "minecraft:red_sandstone";
  MinecraftItemTypes2["RedSandstoneSlab"] = "minecraft:red_sandstone_slab";
  MinecraftItemTypes2["RedSandstoneStairs"] = "minecraft:red_sandstone_stairs";
  MinecraftItemTypes2["RedSandstoneWall"] = "minecraft:red_sandstone_wall";
  MinecraftItemTypes2["RedShulkerBox"] = "minecraft:red_shulker_box";
  MinecraftItemTypes2["RedStainedGlass"] = "minecraft:red_stained_glass";
  MinecraftItemTypes2["RedStainedGlassPane"] = "minecraft:red_stained_glass_pane";
  MinecraftItemTypes2["RedTerracotta"] = "minecraft:red_terracotta";
  MinecraftItemTypes2["RedTulip"] = "minecraft:red_tulip";
  MinecraftItemTypes2["RedWool"] = "minecraft:red_wool";
  MinecraftItemTypes2["Redstone"] = "minecraft:redstone";
  MinecraftItemTypes2["RedstoneBlock"] = "minecraft:redstone_block";
  MinecraftItemTypes2["RedstoneLamp"] = "minecraft:redstone_lamp";
  MinecraftItemTypes2["RedstoneOre"] = "minecraft:redstone_ore";
  MinecraftItemTypes2["RedstoneTorch"] = "minecraft:redstone_torch";
  MinecraftItemTypes2["ReinforcedDeepslate"] = "minecraft:reinforced_deepslate";
  MinecraftItemTypes2["Repeater"] = "minecraft:repeater";
  MinecraftItemTypes2["RepeatingCommandBlock"] = "minecraft:repeating_command_block";
  MinecraftItemTypes2["ResinBlock"] = "minecraft:resin_block";
  MinecraftItemTypes2["ResinBrick"] = "minecraft:resin_brick";
  MinecraftItemTypes2["ResinBrickSlab"] = "minecraft:resin_brick_slab";
  MinecraftItemTypes2["ResinBrickStairs"] = "minecraft:resin_brick_stairs";
  MinecraftItemTypes2["ResinBrickWall"] = "minecraft:resin_brick_wall";
  MinecraftItemTypes2["ResinBricks"] = "minecraft:resin_bricks";
  MinecraftItemTypes2["ResinClump"] = "minecraft:resin_clump";
  MinecraftItemTypes2["RespawnAnchor"] = "minecraft:respawn_anchor";
  MinecraftItemTypes2["RibArmorTrimSmithingTemplate"] = "minecraft:rib_armor_trim_smithing_template";
  MinecraftItemTypes2["RoseBush"] = "minecraft:rose_bush";
  MinecraftItemTypes2["RottenFlesh"] = "minecraft:rotten_flesh";
  MinecraftItemTypes2["Saddle"] = "minecraft:saddle";
  MinecraftItemTypes2["Salmon"] = "minecraft:salmon";
  MinecraftItemTypes2["SalmonBucket"] = "minecraft:salmon_bucket";
  MinecraftItemTypes2["SalmonSpawnEgg"] = "minecraft:salmon_spawn_egg";
  MinecraftItemTypes2["Sand"] = "minecraft:sand";
  MinecraftItemTypes2["Sandstone"] = "minecraft:sandstone";
  MinecraftItemTypes2["SandstoneSlab"] = "minecraft:sandstone_slab";
  MinecraftItemTypes2["SandstoneStairs"] = "minecraft:sandstone_stairs";
  MinecraftItemTypes2["SandstoneWall"] = "minecraft:sandstone_wall";
  MinecraftItemTypes2["Scaffolding"] = "minecraft:scaffolding";
  MinecraftItemTypes2["ScrapePotterySherd"] = "minecraft:scrape_pottery_sherd";
  MinecraftItemTypes2["Sculk"] = "minecraft:sculk";
  MinecraftItemTypes2["SculkCatalyst"] = "minecraft:sculk_catalyst";
  MinecraftItemTypes2["SculkSensor"] = "minecraft:sculk_sensor";
  MinecraftItemTypes2["SculkShrieker"] = "minecraft:sculk_shrieker";
  MinecraftItemTypes2["SculkVein"] = "minecraft:sculk_vein";
  MinecraftItemTypes2["SeaLantern"] = "minecraft:sea_lantern";
  MinecraftItemTypes2["SeaPickle"] = "minecraft:sea_pickle";
  MinecraftItemTypes2["Seagrass"] = "minecraft:seagrass";
  MinecraftItemTypes2["SentryArmorTrimSmithingTemplate"] = "minecraft:sentry_armor_trim_smithing_template";
  MinecraftItemTypes2["ShaperArmorTrimSmithingTemplate"] = "minecraft:shaper_armor_trim_smithing_template";
  MinecraftItemTypes2["SheafPotterySherd"] = "minecraft:sheaf_pottery_sherd";
  MinecraftItemTypes2["Shears"] = "minecraft:shears";
  MinecraftItemTypes2["SheepSpawnEgg"] = "minecraft:sheep_spawn_egg";
  MinecraftItemTypes2["ShelterPotterySherd"] = "minecraft:shelter_pottery_sherd";
  MinecraftItemTypes2["Shield"] = "minecraft:shield";
  MinecraftItemTypes2["ShortDryGrass"] = "minecraft:short_dry_grass";
  MinecraftItemTypes2["ShortGrass"] = "minecraft:short_grass";
  MinecraftItemTypes2["Shroomlight"] = "minecraft:shroomlight";
  MinecraftItemTypes2["ShulkerShell"] = "minecraft:shulker_shell";
  MinecraftItemTypes2["ShulkerSpawnEgg"] = "minecraft:shulker_spawn_egg";
  MinecraftItemTypes2["SilenceArmorTrimSmithingTemplate"] = "minecraft:silence_armor_trim_smithing_template";
  MinecraftItemTypes2["SilverGlazedTerracotta"] = "minecraft:silver_glazed_terracotta";
  MinecraftItemTypes2["SilverfishSpawnEgg"] = "minecraft:silverfish_spawn_egg";
  MinecraftItemTypes2["SkeletonHorseSpawnEgg"] = "minecraft:skeleton_horse_spawn_egg";
  MinecraftItemTypes2["SkeletonSkull"] = "minecraft:skeleton_skull";
  MinecraftItemTypes2["SkeletonSpawnEgg"] = "minecraft:skeleton_spawn_egg";
  MinecraftItemTypes2["SkullBannerPattern"] = "minecraft:skull_banner_pattern";
  MinecraftItemTypes2["SkullPotterySherd"] = "minecraft:skull_pottery_sherd";
  MinecraftItemTypes2["Slime"] = "minecraft:slime";
  MinecraftItemTypes2["SlimeBall"] = "minecraft:slime_ball";
  MinecraftItemTypes2["SlimeSpawnEgg"] = "minecraft:slime_spawn_egg";
  MinecraftItemTypes2["SmallAmethystBud"] = "minecraft:small_amethyst_bud";
  MinecraftItemTypes2["SmallDripleafBlock"] = "minecraft:small_dripleaf_block";
  MinecraftItemTypes2["SmithingTable"] = "minecraft:smithing_table";
  MinecraftItemTypes2["Smoker"] = "minecraft:smoker";
  MinecraftItemTypes2["SmoothBasalt"] = "minecraft:smooth_basalt";
  MinecraftItemTypes2["SmoothQuartz"] = "minecraft:smooth_quartz";
  MinecraftItemTypes2["SmoothQuartzSlab"] = "minecraft:smooth_quartz_slab";
  MinecraftItemTypes2["SmoothQuartzStairs"] = "minecraft:smooth_quartz_stairs";
  MinecraftItemTypes2["SmoothRedSandstone"] = "minecraft:smooth_red_sandstone";
  MinecraftItemTypes2["SmoothRedSandstoneSlab"] = "minecraft:smooth_red_sandstone_slab";
  MinecraftItemTypes2["SmoothRedSandstoneStairs"] = "minecraft:smooth_red_sandstone_stairs";
  MinecraftItemTypes2["SmoothSandstone"] = "minecraft:smooth_sandstone";
  MinecraftItemTypes2["SmoothSandstoneSlab"] = "minecraft:smooth_sandstone_slab";
  MinecraftItemTypes2["SmoothSandstoneStairs"] = "minecraft:smooth_sandstone_stairs";
  MinecraftItemTypes2["SmoothStone"] = "minecraft:smooth_stone";
  MinecraftItemTypes2["SmoothStoneSlab"] = "minecraft:smooth_stone_slab";
  MinecraftItemTypes2["SnifferEgg"] = "minecraft:sniffer_egg";
  MinecraftItemTypes2["SnifferSpawnEgg"] = "minecraft:sniffer_spawn_egg";
  MinecraftItemTypes2["SnortPotterySherd"] = "minecraft:snort_pottery_sherd";
  MinecraftItemTypes2["SnoutArmorTrimSmithingTemplate"] = "minecraft:snout_armor_trim_smithing_template";
  MinecraftItemTypes2["Snow"] = "minecraft:snow";
  MinecraftItemTypes2["SnowGolemSpawnEgg"] = "minecraft:snow_golem_spawn_egg";
  MinecraftItemTypes2["SnowLayer"] = "minecraft:snow_layer";
  MinecraftItemTypes2["Snowball"] = "minecraft:snowball";
  MinecraftItemTypes2["SoulCampfire"] = "minecraft:soul_campfire";
  MinecraftItemTypes2["SoulLantern"] = "minecraft:soul_lantern";
  MinecraftItemTypes2["SoulSand"] = "minecraft:soul_sand";
  MinecraftItemTypes2["SoulSoil"] = "minecraft:soul_soil";
  MinecraftItemTypes2["SoulTorch"] = "minecraft:soul_torch";
  MinecraftItemTypes2["SpiderEye"] = "minecraft:spider_eye";
  MinecraftItemTypes2["SpiderSpawnEgg"] = "minecraft:spider_spawn_egg";
  MinecraftItemTypes2["SpireArmorTrimSmithingTemplate"] = "minecraft:spire_armor_trim_smithing_template";
  MinecraftItemTypes2["SplashPotion"] = "minecraft:splash_potion";
  MinecraftItemTypes2["Sponge"] = "minecraft:sponge";
  MinecraftItemTypes2["SporeBlossom"] = "minecraft:spore_blossom";
  MinecraftItemTypes2["SpruceBoat"] = "minecraft:spruce_boat";
  MinecraftItemTypes2["SpruceButton"] = "minecraft:spruce_button";
  MinecraftItemTypes2["SpruceChestBoat"] = "minecraft:spruce_chest_boat";
  MinecraftItemTypes2["SpruceDoor"] = "minecraft:spruce_door";
  MinecraftItemTypes2["SpruceFence"] = "minecraft:spruce_fence";
  MinecraftItemTypes2["SpruceFenceGate"] = "minecraft:spruce_fence_gate";
  MinecraftItemTypes2["SpruceHangingSign"] = "minecraft:spruce_hanging_sign";
  MinecraftItemTypes2["SpruceLeaves"] = "minecraft:spruce_leaves";
  MinecraftItemTypes2["SpruceLog"] = "minecraft:spruce_log";
  MinecraftItemTypes2["SprucePlanks"] = "minecraft:spruce_planks";
  MinecraftItemTypes2["SprucePressurePlate"] = "minecraft:spruce_pressure_plate";
  MinecraftItemTypes2["SpruceSapling"] = "minecraft:spruce_sapling";
  MinecraftItemTypes2["SpruceShelf"] = "minecraft:spruce_shelf";
  MinecraftItemTypes2["SpruceSign"] = "minecraft:spruce_sign";
  MinecraftItemTypes2["SpruceSlab"] = "minecraft:spruce_slab";
  MinecraftItemTypes2["SpruceStairs"] = "minecraft:spruce_stairs";
  MinecraftItemTypes2["SpruceTrapdoor"] = "minecraft:spruce_trapdoor";
  MinecraftItemTypes2["SpruceWood"] = "minecraft:spruce_wood";
  MinecraftItemTypes2["Spyglass"] = "minecraft:spyglass";
  MinecraftItemTypes2["SquidSpawnEgg"] = "minecraft:squid_spawn_egg";
  MinecraftItemTypes2["Stick"] = "minecraft:stick";
  MinecraftItemTypes2["StickyPiston"] = "minecraft:sticky_piston";
  MinecraftItemTypes2["Stone"] = "minecraft:stone";
  MinecraftItemTypes2["StoneAxe"] = "minecraft:stone_axe";
  MinecraftItemTypes2["StoneBrickSlab"] = "minecraft:stone_brick_slab";
  MinecraftItemTypes2["StoneBrickStairs"] = "minecraft:stone_brick_stairs";
  MinecraftItemTypes2["StoneBrickWall"] = "minecraft:stone_brick_wall";
  MinecraftItemTypes2["StoneBricks"] = "minecraft:stone_bricks";
  MinecraftItemTypes2["StoneButton"] = "minecraft:stone_button";
  MinecraftItemTypes2["StoneHoe"] = "minecraft:stone_hoe";
  MinecraftItemTypes2["StonePickaxe"] = "minecraft:stone_pickaxe";
  MinecraftItemTypes2["StonePressurePlate"] = "minecraft:stone_pressure_plate";
  MinecraftItemTypes2["StoneShovel"] = "minecraft:stone_shovel";
  MinecraftItemTypes2["StoneStairs"] = "minecraft:stone_stairs";
  MinecraftItemTypes2["StoneSword"] = "minecraft:stone_sword";
  MinecraftItemTypes2["StonecutterBlock"] = "minecraft:stonecutter_block";
  MinecraftItemTypes2["StraySpawnEgg"] = "minecraft:stray_spawn_egg";
  MinecraftItemTypes2["StriderSpawnEgg"] = "minecraft:strider_spawn_egg";
  MinecraftItemTypes2["String"] = "minecraft:string";
  MinecraftItemTypes2["StrippedAcaciaLog"] = "minecraft:stripped_acacia_log";
  MinecraftItemTypes2["StrippedAcaciaWood"] = "minecraft:stripped_acacia_wood";
  MinecraftItemTypes2["StrippedBambooBlock"] = "minecraft:stripped_bamboo_block";
  MinecraftItemTypes2["StrippedBirchLog"] = "minecraft:stripped_birch_log";
  MinecraftItemTypes2["StrippedBirchWood"] = "minecraft:stripped_birch_wood";
  MinecraftItemTypes2["StrippedCherryLog"] = "minecraft:stripped_cherry_log";
  MinecraftItemTypes2["StrippedCherryWood"] = "minecraft:stripped_cherry_wood";
  MinecraftItemTypes2["StrippedCrimsonHyphae"] = "minecraft:stripped_crimson_hyphae";
  MinecraftItemTypes2["StrippedCrimsonStem"] = "minecraft:stripped_crimson_stem";
  MinecraftItemTypes2["StrippedDarkOakLog"] = "minecraft:stripped_dark_oak_log";
  MinecraftItemTypes2["StrippedDarkOakWood"] = "minecraft:stripped_dark_oak_wood";
  MinecraftItemTypes2["StrippedJungleLog"] = "minecraft:stripped_jungle_log";
  MinecraftItemTypes2["StrippedJungleWood"] = "minecraft:stripped_jungle_wood";
  MinecraftItemTypes2["StrippedMangroveLog"] = "minecraft:stripped_mangrove_log";
  MinecraftItemTypes2["StrippedMangroveWood"] = "minecraft:stripped_mangrove_wood";
  MinecraftItemTypes2["StrippedOakLog"] = "minecraft:stripped_oak_log";
  MinecraftItemTypes2["StrippedOakWood"] = "minecraft:stripped_oak_wood";
  MinecraftItemTypes2["StrippedPaleOakLog"] = "minecraft:stripped_pale_oak_log";
  MinecraftItemTypes2["StrippedPaleOakWood"] = "minecraft:stripped_pale_oak_wood";
  MinecraftItemTypes2["StrippedSpruceLog"] = "minecraft:stripped_spruce_log";
  MinecraftItemTypes2["StrippedSpruceWood"] = "minecraft:stripped_spruce_wood";
  MinecraftItemTypes2["StrippedWarpedHyphae"] = "minecraft:stripped_warped_hyphae";
  MinecraftItemTypes2["StrippedWarpedStem"] = "minecraft:stripped_warped_stem";
  MinecraftItemTypes2["StructureBlock"] = "minecraft:structure_block";
  MinecraftItemTypes2["StructureVoid"] = "minecraft:structure_void";
  MinecraftItemTypes2["Sugar"] = "minecraft:sugar";
  MinecraftItemTypes2["SugarCane"] = "minecraft:sugar_cane";
  MinecraftItemTypes2["Sunflower"] = "minecraft:sunflower";
  MinecraftItemTypes2["SuspiciousGravel"] = "minecraft:suspicious_gravel";
  MinecraftItemTypes2["SuspiciousSand"] = "minecraft:suspicious_sand";
  MinecraftItemTypes2["SuspiciousStew"] = "minecraft:suspicious_stew";
  MinecraftItemTypes2["SweetBerries"] = "minecraft:sweet_berries";
  MinecraftItemTypes2["TadpoleBucket"] = "minecraft:tadpole_bucket";
  MinecraftItemTypes2["TadpoleSpawnEgg"] = "minecraft:tadpole_spawn_egg";
  MinecraftItemTypes2["TallDryGrass"] = "minecraft:tall_dry_grass";
  MinecraftItemTypes2["TallGrass"] = "minecraft:tall_grass";
  MinecraftItemTypes2["Target"] = "minecraft:target";
  MinecraftItemTypes2["TideArmorTrimSmithingTemplate"] = "minecraft:tide_armor_trim_smithing_template";
  MinecraftItemTypes2["TintedGlass"] = "minecraft:tinted_glass";
  MinecraftItemTypes2["Tnt"] = "minecraft:tnt";
  MinecraftItemTypes2["TntMinecart"] = "minecraft:tnt_minecart";
  MinecraftItemTypes2["Torch"] = "minecraft:torch";
  MinecraftItemTypes2["Torchflower"] = "minecraft:torchflower";
  MinecraftItemTypes2["TorchflowerSeeds"] = "minecraft:torchflower_seeds";
  MinecraftItemTypes2["TotemOfUndying"] = "minecraft:totem_of_undying";
  MinecraftItemTypes2["TraderLlamaSpawnEgg"] = "minecraft:trader_llama_spawn_egg";
  MinecraftItemTypes2["Trapdoor"] = "minecraft:trapdoor";
  MinecraftItemTypes2["TrappedChest"] = "minecraft:trapped_chest";
  MinecraftItemTypes2["TrialKey"] = "minecraft:trial_key";
  MinecraftItemTypes2["TrialSpawner"] = "minecraft:trial_spawner";
  MinecraftItemTypes2["Trident"] = "minecraft:trident";
  MinecraftItemTypes2["TripwireHook"] = "minecraft:tripwire_hook";
  MinecraftItemTypes2["TropicalFish"] = "minecraft:tropical_fish";
  MinecraftItemTypes2["TropicalFishBucket"] = "minecraft:tropical_fish_bucket";
  MinecraftItemTypes2["TropicalFishSpawnEgg"] = "minecraft:tropical_fish_spawn_egg";
  MinecraftItemTypes2["TubeCoral"] = "minecraft:tube_coral";
  MinecraftItemTypes2["TubeCoralBlock"] = "minecraft:tube_coral_block";
  MinecraftItemTypes2["TubeCoralFan"] = "minecraft:tube_coral_fan";
  MinecraftItemTypes2["Tuff"] = "minecraft:tuff";
  MinecraftItemTypes2["TuffBrickSlab"] = "minecraft:tuff_brick_slab";
  MinecraftItemTypes2["TuffBrickStairs"] = "minecraft:tuff_brick_stairs";
  MinecraftItemTypes2["TuffBrickWall"] = "minecraft:tuff_brick_wall";
  MinecraftItemTypes2["TuffBricks"] = "minecraft:tuff_bricks";
  MinecraftItemTypes2["TuffSlab"] = "minecraft:tuff_slab";
  MinecraftItemTypes2["TuffStairs"] = "minecraft:tuff_stairs";
  MinecraftItemTypes2["TuffWall"] = "minecraft:tuff_wall";
  MinecraftItemTypes2["TurtleEgg"] = "minecraft:turtle_egg";
  MinecraftItemTypes2["TurtleHelmet"] = "minecraft:turtle_helmet";
  MinecraftItemTypes2["TurtleScute"] = "minecraft:turtle_scute";
  MinecraftItemTypes2["TurtleSpawnEgg"] = "minecraft:turtle_spawn_egg";
  MinecraftItemTypes2["TwistingVines"] = "minecraft:twisting_vines";
  MinecraftItemTypes2["UndyedShulkerBox"] = "minecraft:undyed_shulker_box";
  MinecraftItemTypes2["Vault"] = "minecraft:vault";
  MinecraftItemTypes2["VerdantFroglight"] = "minecraft:verdant_froglight";
  MinecraftItemTypes2["VexArmorTrimSmithingTemplate"] = "minecraft:vex_armor_trim_smithing_template";
  MinecraftItemTypes2["VexSpawnEgg"] = "minecraft:vex_spawn_egg";
  MinecraftItemTypes2["VillagerSpawnEgg"] = "minecraft:villager_spawn_egg";
  MinecraftItemTypes2["VindicatorSpawnEgg"] = "minecraft:vindicator_spawn_egg";
  MinecraftItemTypes2["Vine"] = "minecraft:vine";
  MinecraftItemTypes2["WanderingTraderSpawnEgg"] = "minecraft:wandering_trader_spawn_egg";
  MinecraftItemTypes2["WardArmorTrimSmithingTemplate"] = "minecraft:ward_armor_trim_smithing_template";
  MinecraftItemTypes2["WardenSpawnEgg"] = "minecraft:warden_spawn_egg";
  MinecraftItemTypes2["WarpedButton"] = "minecraft:warped_button";
  MinecraftItemTypes2["WarpedDoor"] = "minecraft:warped_door";
  MinecraftItemTypes2["WarpedFence"] = "minecraft:warped_fence";
  MinecraftItemTypes2["WarpedFenceGate"] = "minecraft:warped_fence_gate";
  MinecraftItemTypes2["WarpedFungus"] = "minecraft:warped_fungus";
  MinecraftItemTypes2["WarpedFungusOnAStick"] = "minecraft:warped_fungus_on_a_stick";
  MinecraftItemTypes2["WarpedHangingSign"] = "minecraft:warped_hanging_sign";
  MinecraftItemTypes2["WarpedHyphae"] = "minecraft:warped_hyphae";
  MinecraftItemTypes2["WarpedNylium"] = "minecraft:warped_nylium";
  MinecraftItemTypes2["WarpedPlanks"] = "minecraft:warped_planks";
  MinecraftItemTypes2["WarpedPressurePlate"] = "minecraft:warped_pressure_plate";
  MinecraftItemTypes2["WarpedRoots"] = "minecraft:warped_roots";
  MinecraftItemTypes2["WarpedShelf"] = "minecraft:warped_shelf";
  MinecraftItemTypes2["WarpedSign"] = "minecraft:warped_sign";
  MinecraftItemTypes2["WarpedSlab"] = "minecraft:warped_slab";
  MinecraftItemTypes2["WarpedStairs"] = "minecraft:warped_stairs";
  MinecraftItemTypes2["WarpedStem"] = "minecraft:warped_stem";
  MinecraftItemTypes2["WarpedTrapdoor"] = "minecraft:warped_trapdoor";
  MinecraftItemTypes2["WarpedWartBlock"] = "minecraft:warped_wart_block";
  MinecraftItemTypes2["WaterBucket"] = "minecraft:water_bucket";
  MinecraftItemTypes2["Waterlily"] = "minecraft:waterlily";
  MinecraftItemTypes2["WaxedChiseledCopper"] = "minecraft:waxed_chiseled_copper";
  MinecraftItemTypes2["WaxedCopper"] = "minecraft:waxed_copper";
  MinecraftItemTypes2["WaxedCopperBars"] = "minecraft:waxed_copper_bars";
  MinecraftItemTypes2["WaxedCopperBulb"] = "minecraft:waxed_copper_bulb";
  MinecraftItemTypes2["WaxedCopperChain"] = "minecraft:waxed_copper_chain";
  MinecraftItemTypes2["WaxedCopperChest"] = "minecraft:waxed_copper_chest";
  MinecraftItemTypes2["WaxedCopperDoor"] = "minecraft:waxed_copper_door";
  MinecraftItemTypes2["WaxedCopperGolemStatue"] = "minecraft:waxed_copper_golem_statue";
  MinecraftItemTypes2["WaxedCopperGrate"] = "minecraft:waxed_copper_grate";
  MinecraftItemTypes2["WaxedCopperLantern"] = "minecraft:waxed_copper_lantern";
  MinecraftItemTypes2["WaxedCopperTrapdoor"] = "minecraft:waxed_copper_trapdoor";
  MinecraftItemTypes2["WaxedCutCopper"] = "minecraft:waxed_cut_copper";
  MinecraftItemTypes2["WaxedCutCopperSlab"] = "minecraft:waxed_cut_copper_slab";
  MinecraftItemTypes2["WaxedCutCopperStairs"] = "minecraft:waxed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedChiseledCopper"] = "minecraft:waxed_exposed_chiseled_copper";
  MinecraftItemTypes2["WaxedExposedCopper"] = "minecraft:waxed_exposed_copper";
  MinecraftItemTypes2["WaxedExposedCopperBars"] = "minecraft:waxed_exposed_copper_bars";
  MinecraftItemTypes2["WaxedExposedCopperBulb"] = "minecraft:waxed_exposed_copper_bulb";
  MinecraftItemTypes2["WaxedExposedCopperChain"] = "minecraft:waxed_exposed_copper_chain";
  MinecraftItemTypes2["WaxedExposedCopperChest"] = "minecraft:waxed_exposed_copper_chest";
  MinecraftItemTypes2["WaxedExposedCopperDoor"] = "minecraft:waxed_exposed_copper_door";
  MinecraftItemTypes2["WaxedExposedCopperGolemStatue"] = "minecraft:waxed_exposed_copper_golem_statue";
  MinecraftItemTypes2["WaxedExposedCopperGrate"] = "minecraft:waxed_exposed_copper_grate";
  MinecraftItemTypes2["WaxedExposedCopperLantern"] = "minecraft:waxed_exposed_copper_lantern";
  MinecraftItemTypes2["WaxedExposedCopperTrapdoor"] = "minecraft:waxed_exposed_copper_trapdoor";
  MinecraftItemTypes2["WaxedExposedCutCopper"] = "minecraft:waxed_exposed_cut_copper";
  MinecraftItemTypes2["WaxedExposedCutCopperSlab"] = "minecraft:waxed_exposed_cut_copper_slab";
  MinecraftItemTypes2["WaxedExposedCutCopperStairs"] = "minecraft:waxed_exposed_cut_copper_stairs";
  MinecraftItemTypes2["WaxedExposedLightningRod"] = "minecraft:waxed_exposed_lightning_rod";
  MinecraftItemTypes2["WaxedLightningRod"] = "minecraft:waxed_lightning_rod";
  MinecraftItemTypes2["WaxedOxidizedChiseledCopper"] = "minecraft:waxed_oxidized_chiseled_copper";
  MinecraftItemTypes2["WaxedOxidizedCopper"] = "minecraft:waxed_oxidized_copper";
  MinecraftItemTypes2["WaxedOxidizedCopperBars"] = "minecraft:waxed_oxidized_copper_bars";
  MinecraftItemTypes2["WaxedOxidizedCopperBulb"] = "minecraft:waxed_oxidized_copper_bulb";
  MinecraftItemTypes2["WaxedOxidizedCopperChain"] = "minecraft:waxed_oxidized_copper_chain";
  MinecraftItemTypes2["WaxedOxidizedCopperChest"] = "minecraft:waxed_oxidized_copper_chest";
  MinecraftItemTypes2["WaxedOxidizedCopperDoor"] = "minecraft:waxed_oxidized_copper_door";
  MinecraftItemTypes2["WaxedOxidizedCopperGolemStatue"] = "minecraft:waxed_oxidized_copper_golem_statue";
  MinecraftItemTypes2["WaxedOxidizedCopperGrate"] = "minecraft:waxed_oxidized_copper_grate";
  MinecraftItemTypes2["WaxedOxidizedCopperLantern"] = "minecraft:waxed_oxidized_copper_lantern";
  MinecraftItemTypes2["WaxedOxidizedCopperTrapdoor"] = "minecraft:waxed_oxidized_copper_trapdoor";
  MinecraftItemTypes2["WaxedOxidizedCutCopper"] = "minecraft:waxed_oxidized_cut_copper";
  MinecraftItemTypes2["WaxedOxidizedCutCopperSlab"] = "minecraft:waxed_oxidized_cut_copper_slab";
  MinecraftItemTypes2["WaxedOxidizedCutCopperStairs"] = "minecraft:waxed_oxidized_cut_copper_stairs";
  MinecraftItemTypes2["WaxedOxidizedLightningRod"] = "minecraft:waxed_oxidized_lightning_rod";
  MinecraftItemTypes2["WaxedWeatheredChiseledCopper"] = "minecraft:waxed_weathered_chiseled_copper";
  MinecraftItemTypes2["WaxedWeatheredCopper"] = "minecraft:waxed_weathered_copper";
  MinecraftItemTypes2["WaxedWeatheredCopperBars"] = "minecraft:waxed_weathered_copper_bars";
  MinecraftItemTypes2["WaxedWeatheredCopperBulb"] = "minecraft:waxed_weathered_copper_bulb";
  MinecraftItemTypes2["WaxedWeatheredCopperChain"] = "minecraft:waxed_weathered_copper_chain";
  MinecraftItemTypes2["WaxedWeatheredCopperChest"] = "minecraft:waxed_weathered_copper_chest";
  MinecraftItemTypes2["WaxedWeatheredCopperDoor"] = "minecraft:waxed_weathered_copper_door";
  MinecraftItemTypes2["WaxedWeatheredCopperGolemStatue"] = "minecraft:waxed_weathered_copper_golem_statue";
  MinecraftItemTypes2["WaxedWeatheredCopperGrate"] = "minecraft:waxed_weathered_copper_grate";
  MinecraftItemTypes2["WaxedWeatheredCopperLantern"] = "minecraft:waxed_weathered_copper_lantern";
  MinecraftItemTypes2["WaxedWeatheredCopperTrapdoor"] = "minecraft:waxed_weathered_copper_trapdoor";
  MinecraftItemTypes2["WaxedWeatheredCutCopper"] = "minecraft:waxed_weathered_cut_copper";
  MinecraftItemTypes2["WaxedWeatheredCutCopperSlab"] = "minecraft:waxed_weathered_cut_copper_slab";
  MinecraftItemTypes2["WaxedWeatheredCutCopperStairs"] = "minecraft:waxed_weathered_cut_copper_stairs";
  MinecraftItemTypes2["WaxedWeatheredLightningRod"] = "minecraft:waxed_weathered_lightning_rod";
  MinecraftItemTypes2["WayfinderArmorTrimSmithingTemplate"] = "minecraft:wayfinder_armor_trim_smithing_template";
  MinecraftItemTypes2["WeatheredChiseledCopper"] = "minecraft:weathered_chiseled_copper";
  MinecraftItemTypes2["WeatheredCopper"] = "minecraft:weathered_copper";
  MinecraftItemTypes2["WeatheredCopperBars"] = "minecraft:weathered_copper_bars";
  MinecraftItemTypes2["WeatheredCopperBulb"] = "minecraft:weathered_copper_bulb";
  MinecraftItemTypes2["WeatheredCopperChain"] = "minecraft:weathered_copper_chain";
  MinecraftItemTypes2["WeatheredCopperChest"] = "minecraft:weathered_copper_chest";
  MinecraftItemTypes2["WeatheredCopperDoor"] = "minecraft:weathered_copper_door";
  MinecraftItemTypes2["WeatheredCopperGolemStatue"] = "minecraft:weathered_copper_golem_statue";
  MinecraftItemTypes2["WeatheredCopperGrate"] = "minecraft:weathered_copper_grate";
  MinecraftItemTypes2["WeatheredCopperLantern"] = "minecraft:weathered_copper_lantern";
  MinecraftItemTypes2["WeatheredCopperTrapdoor"] = "minecraft:weathered_copper_trapdoor";
  MinecraftItemTypes2["WeatheredCutCopper"] = "minecraft:weathered_cut_copper";
  MinecraftItemTypes2["WeatheredCutCopperSlab"] = "minecraft:weathered_cut_copper_slab";
  MinecraftItemTypes2["WeatheredCutCopperStairs"] = "minecraft:weathered_cut_copper_stairs";
  MinecraftItemTypes2["WeatheredLightningRod"] = "minecraft:weathered_lightning_rod";
  MinecraftItemTypes2["Web"] = "minecraft:web";
  MinecraftItemTypes2["WeepingVines"] = "minecraft:weeping_vines";
  MinecraftItemTypes2["WetSponge"] = "minecraft:wet_sponge";
  MinecraftItemTypes2["Wheat"] = "minecraft:wheat";
  MinecraftItemTypes2["WheatSeeds"] = "minecraft:wheat_seeds";
  MinecraftItemTypes2["WhiteBundle"] = "minecraft:white_bundle";
  MinecraftItemTypes2["WhiteCandle"] = "minecraft:white_candle";
  MinecraftItemTypes2["WhiteCarpet"] = "minecraft:white_carpet";
  MinecraftItemTypes2["WhiteConcrete"] = "minecraft:white_concrete";
  MinecraftItemTypes2["WhiteConcretePowder"] = "minecraft:white_concrete_powder";
  MinecraftItemTypes2["WhiteDye"] = "minecraft:white_dye";
  MinecraftItemTypes2["WhiteGlazedTerracotta"] = "minecraft:white_glazed_terracotta";
  MinecraftItemTypes2["WhiteHarness"] = "minecraft:white_harness";
  MinecraftItemTypes2["WhiteShulkerBox"] = "minecraft:white_shulker_box";
  MinecraftItemTypes2["WhiteStainedGlass"] = "minecraft:white_stained_glass";
  MinecraftItemTypes2["WhiteStainedGlassPane"] = "minecraft:white_stained_glass_pane";
  MinecraftItemTypes2["WhiteTerracotta"] = "minecraft:white_terracotta";
  MinecraftItemTypes2["WhiteTulip"] = "minecraft:white_tulip";
  MinecraftItemTypes2["WhiteWool"] = "minecraft:white_wool";
  MinecraftItemTypes2["WildArmorTrimSmithingTemplate"] = "minecraft:wild_armor_trim_smithing_template";
  MinecraftItemTypes2["Wildflowers"] = "minecraft:wildflowers";
  MinecraftItemTypes2["WindCharge"] = "minecraft:wind_charge";
  MinecraftItemTypes2["WitchSpawnEgg"] = "minecraft:witch_spawn_egg";
  MinecraftItemTypes2["WitherRose"] = "minecraft:wither_rose";
  MinecraftItemTypes2["WitherSkeletonSkull"] = "minecraft:wither_skeleton_skull";
  MinecraftItemTypes2["WitherSkeletonSpawnEgg"] = "minecraft:wither_skeleton_spawn_egg";
  MinecraftItemTypes2["WitherSpawnEgg"] = "minecraft:wither_spawn_egg";
  MinecraftItemTypes2["WolfArmor"] = "minecraft:wolf_armor";
  MinecraftItemTypes2["WolfSpawnEgg"] = "minecraft:wolf_spawn_egg";
  MinecraftItemTypes2["WoodenAxe"] = "minecraft:wooden_axe";
  MinecraftItemTypes2["WoodenButton"] = "minecraft:wooden_button";
  MinecraftItemTypes2["WoodenDoor"] = "minecraft:wooden_door";
  MinecraftItemTypes2["WoodenHoe"] = "minecraft:wooden_hoe";
  MinecraftItemTypes2["WoodenPickaxe"] = "minecraft:wooden_pickaxe";
  MinecraftItemTypes2["WoodenPressurePlate"] = "minecraft:wooden_pressure_plate";
  MinecraftItemTypes2["WoodenShovel"] = "minecraft:wooden_shovel";
  MinecraftItemTypes2["WoodenSword"] = "minecraft:wooden_sword";
  MinecraftItemTypes2["WritableBook"] = "minecraft:writable_book";
  MinecraftItemTypes2["YellowBundle"] = "minecraft:yellow_bundle";
  MinecraftItemTypes2["YellowCandle"] = "minecraft:yellow_candle";
  MinecraftItemTypes2["YellowCarpet"] = "minecraft:yellow_carpet";
  MinecraftItemTypes2["YellowConcrete"] = "minecraft:yellow_concrete";
  MinecraftItemTypes2["YellowConcretePowder"] = "minecraft:yellow_concrete_powder";
  MinecraftItemTypes2["YellowDye"] = "minecraft:yellow_dye";
  MinecraftItemTypes2["YellowGlazedTerracotta"] = "minecraft:yellow_glazed_terracotta";
  MinecraftItemTypes2["YellowHarness"] = "minecraft:yellow_harness";
  MinecraftItemTypes2["YellowShulkerBox"] = "minecraft:yellow_shulker_box";
  MinecraftItemTypes2["YellowStainedGlass"] = "minecraft:yellow_stained_glass";
  MinecraftItemTypes2["YellowStainedGlassPane"] = "minecraft:yellow_stained_glass_pane";
  MinecraftItemTypes2["YellowTerracotta"] = "minecraft:yellow_terracotta";
  MinecraftItemTypes2["YellowWool"] = "minecraft:yellow_wool";
  MinecraftItemTypes2["ZoglinSpawnEgg"] = "minecraft:zoglin_spawn_egg";
  MinecraftItemTypes2["ZombieHead"] = "minecraft:zombie_head";
  MinecraftItemTypes2["ZombieHorseSpawnEgg"] = "minecraft:zombie_horse_spawn_egg";
  MinecraftItemTypes2["ZombiePigmanSpawnEgg"] = "minecraft:zombie_pigman_spawn_egg";
  MinecraftItemTypes2["ZombieSpawnEgg"] = "minecraft:zombie_spawn_egg";
  MinecraftItemTypes2["ZombieVillagerSpawnEgg"] = "minecraft:zombie_villager_spawn_egg";
  return MinecraftItemTypes2;
})(MinecraftItemTypes || {});
var MinecraftPotionDeliveryTypes = ((MinecraftPotionDeliveryTypes2) => {
  MinecraftPotionDeliveryTypes2["Consume"] = "Consume";
  MinecraftPotionDeliveryTypes2["ThrownLingering"] = "ThrownLingering";
  MinecraftPotionDeliveryTypes2["ThrownSplash"] = "ThrownSplash";
  return MinecraftPotionDeliveryTypes2;
})(MinecraftPotionDeliveryTypes || {});
var MinecraftPotionEffectTypes = ((MinecraftPotionEffectTypes2) => {
  MinecraftPotionEffectTypes2["Awkward"] = "minecraft:awkward";
  MinecraftPotionEffectTypes2["FireResistance"] = "minecraft:fire_resistance";
  MinecraftPotionEffectTypes2["Harming"] = "minecraft:harming";
  MinecraftPotionEffectTypes2["Healing"] = "minecraft:healing";
  MinecraftPotionEffectTypes2["Infested"] = "minecraft:infested";
  MinecraftPotionEffectTypes2["Invisibility"] = "minecraft:invisibility";
  MinecraftPotionEffectTypes2["Leaping"] = "minecraft:leaping";
  MinecraftPotionEffectTypes2["LongFireResistance"] = "minecraft:long_fire_resistance";
  MinecraftPotionEffectTypes2["LongInvisibility"] = "minecraft:long_invisibility";
  MinecraftPotionEffectTypes2["LongLeaping"] = "minecraft:long_leaping";
  MinecraftPotionEffectTypes2["LongMundane"] = "minecraft:long_mundane";
  MinecraftPotionEffectTypes2["LongNightvision"] = "minecraft:long_nightvision";
  MinecraftPotionEffectTypes2["LongPoison"] = "minecraft:long_poison";
  MinecraftPotionEffectTypes2["LongRegeneration"] = "minecraft:long_regeneration";
  MinecraftPotionEffectTypes2["LongSlowFalling"] = "minecraft:long_slow_falling";
  MinecraftPotionEffectTypes2["LongSlowness"] = "minecraft:long_slowness";
  MinecraftPotionEffectTypes2["LongStrength"] = "minecraft:long_strength";
  MinecraftPotionEffectTypes2["LongSwiftness"] = "minecraft:long_swiftness";
  MinecraftPotionEffectTypes2["LongTurtleMaster"] = "minecraft:long_turtle_master";
  MinecraftPotionEffectTypes2["LongWaterBreathing"] = "minecraft:long_water_breathing";
  MinecraftPotionEffectTypes2["LongWeakness"] = "minecraft:long_weakness";
  MinecraftPotionEffectTypes2["Mundane"] = "minecraft:mundane";
  MinecraftPotionEffectTypes2["Nightvision"] = "minecraft:nightvision";
  MinecraftPotionEffectTypes2["Oozing"] = "minecraft:oozing";
  MinecraftPotionEffectTypes2["Poison"] = "minecraft:poison";
  MinecraftPotionEffectTypes2["Regeneration"] = "minecraft:regeneration";
  MinecraftPotionEffectTypes2["SlowFalling"] = "minecraft:slow_falling";
  MinecraftPotionEffectTypes2["Slowness"] = "minecraft:slowness";
  MinecraftPotionEffectTypes2["Strength"] = "minecraft:strength";
  MinecraftPotionEffectTypes2["StrongHarming"] = "minecraft:strong_harming";
  MinecraftPotionEffectTypes2["StrongHealing"] = "minecraft:strong_healing";
  MinecraftPotionEffectTypes2["StrongLeaping"] = "minecraft:strong_leaping";
  MinecraftPotionEffectTypes2["StrongPoison"] = "minecraft:strong_poison";
  MinecraftPotionEffectTypes2["StrongRegeneration"] = "minecraft:strong_regeneration";
  MinecraftPotionEffectTypes2["StrongSlowness"] = "minecraft:strong_slowness";
  MinecraftPotionEffectTypes2["StrongStrength"] = "minecraft:strong_strength";
  MinecraftPotionEffectTypes2["StrongSwiftness"] = "minecraft:strong_swiftness";
  MinecraftPotionEffectTypes2["StrongTurtleMaster"] = "minecraft:strong_turtle_master";
  MinecraftPotionEffectTypes2["Swiftness"] = "minecraft:swiftness";
  MinecraftPotionEffectTypes2["Thick"] = "minecraft:thick";
  MinecraftPotionEffectTypes2["TurtleMaster"] = "minecraft:turtle_master";
  MinecraftPotionEffectTypes2["Water"] = "minecraft:water";
  MinecraftPotionEffectTypes2["WaterBreathing"] = "minecraft:water_breathing";
  MinecraftPotionEffectTypes2["Weakness"] = "minecraft:weakness";
  MinecraftPotionEffectTypes2["Weaving"] = "minecraft:weaving";
  MinecraftPotionEffectTypes2["WindCharged"] = "minecraft:wind_charged";
  MinecraftPotionEffectTypes2["Wither"] = "minecraft:wither";
  return MinecraftPotionEffectTypes2;
})(MinecraftPotionEffectTypes || {});

// scripts/library/components/items/BucketOfOrangeItemComponent.ts
var BucketOfOrangeItemComponent = class {
  static {
    this.componentId = "melonbp_brp:bucket_of_orange";
  }
  onConsume({ source }) {
    source.removeEffect(MinecraftEffectTypes.Poison);
    source.removeEffect(MinecraftEffectTypes.FatalPoison);
    source.removeEffect(MinecraftEffectTypes.Hunger);
    source.removeEffect(MinecraftEffectTypes.Nausea);
    source.removeEffect(MinecraftEffectTypes.Wither);
    source.addEffect(MinecraftEffectTypes.Speed, 20 * 10);
    source.dimension.playSound("mob.wanderingtrader.drink_milk", source.location, { pitch: 1.8 });
    const bucket = new ItemStack(MinecraftItemTypes.Bucket);
    const equipment = source.getComponent(EntityEquippableComponent.componentId);
    equipment.setEquipment(EquipmentSlot.Mainhand, bucket);
  }
};

// scripts/library/components/items/FoodEffectsItemComponent.ts
var FoodEffectsItemComponent_default = class {
  static {
    this.componentId = "melonbp_brp:food_effects";
  }
  onConsume({ source }, { params }) {
    for (const { name, duration, amplifier } of params) {
      source.addEffect(name, duration, { amplifier });
    }
  }
};

// scripts/library/BrainrotPetTypes.ts
var BrainrotPetTypes = /* @__PURE__ */ ((BrainrotPetTypes2) => {
  BrainrotPetTypes2["BabyBallerinaCapuccina"] = "melonbp_brp:baby_ballerinacapuchina";
  BrainrotPetTypes2["BabyBallerinoLololo"] = "melonbp_brp:baby_ballerinolololo";
  BrainrotPetTypes2["BabyBlueberrinniOctopus"] = "melonbp_brp:baby_blueberrinnioctopus";
  BrainrotPetTypes2["BabyBobrittoBandito"] = "melonbp_brp:baby_bobritobandito";
  BrainrotPetTypes2["BabyBonecaAmbalabu"] = "melonbp_brp:baby_bonecaambalabu";
  BrainrotPetTypes2["BabyBrrBaloniLuliloli"] = "melonbp_brp:baby_burbaloniluliloli";
  BrainrotPetTypes2["BabyBriBriBicusDicusDeBicusDeDicus"] = "melonbp_brp:baby_bribribicusdicusdebicusdedicus";
  BrainrotPetTypes2["BabyBrrBrrPatapim"] = "melonbp_brp:baby_brrbrrpatapin";
  BrainrotPetTypes2["BabyBrrEsTehPatipum"] = "melonbp_brp:baby_berrrestehpatipum";
  BrainrotPetTypes2["BabyNinjaCapuccino"] = "melonbp_brp:baby_ninjacapuccino";
  BrainrotPetTypes2["BabyChimpanziniBananini"] = "melonbp_brp:baby_chimpanzinibananini";
  BrainrotPetTypes2["BabyChimpanziniBananiniBananaPeel"] = "melonbp_brp:baby_chimpanzinibananini_banana_peel";
  BrainrotPetTypes2["BabyCocofantoElefanto"] = "melonbp_brp:baby_cocofantoelefanto";
  BrainrotPetTypes2["BabyEccoCavalloVirtuoso"] = "melonbp_brp:baby_eccocavallovirtuoso";
  BrainrotPetTypes2["BabyFrigoCamello"] = "melonbp_brp:baby_frigocammello";
  BrainrotPetTypes2["BabyFruliFrula"] = "melonbp_brp:baby_frulifrula";
  BrainrotPetTypes2["BabyCoolKidFootera"] = "melonbp_brp:baby_coolkidfootera";
  BrainrotPetTypes2["BabySirOrangeGiraffe"] = "melonbp_brp:baby_sirorangegiraffe";
  BrainrotPetTypes2["BabyGaramMadu"] = "melonbp_brp:baby_garammararam";
  BrainrotPetTypes2["BabyGiraffaCeleste"] = "melonbp_brp:baby_giraffaceleste";
  BrainrotPetTypes2["BabyGloboFruttodrillo"] = "melonbp_brp:baby_glorbofruttodillo";
  BrainrotPetTypes2["BabyilCactoHipopotamo"] = "melonbp_brp:baby_ilcactohipopotamo";
  BrainrotPetTypes2["BabyKarkerkarKurkur"] = "melonbp_brp:baby_karkerkarkurkur";
  BrainrotPetTypes2["BabyKetupatKepatPrekupat"] = "melonbp_brp:baby_ketupatkepat";
  BrainrotPetTypes2["BabyLaEsokSikola"] = "melonbp_brp:baby_laesoksekolah";
  BrainrotPetTypes2["BabyLaVacaSaturnoSaturnita"] = "melonbp_brp:baby_vacasaturnosaturnita";
  BrainrotPetTypes2["BabyLiriliLarila"] = "melonbp_brp:baby_lirililarila";
  BrainrotPetTypes2["BabyMatteooo"] = "melonbp_brp:baby_mateooo";
  BrainrotPetTypes2["BabyOrangutiniAnanasini"] = "melonbp_brp:baby_orangutiniananasini";
  BrainrotPetTypes2["BabyOrcaleroOrcala"] = "melonbp_brp:baby_ocaleroorcala";
  BrainrotPetTypes2["BabyPakrahmatmamat"] = "melonbp_brp:baby_pakrahmatmamat";
  BrainrotPetTypes2["BabyPotHotSpot"] = "melonbp_brp:baby_pothotspot";
  BrainrotPetTypes2["BabyRhinoToasterino"] = "melonbp_brp:baby_rhinotoasterino";
  BrainrotPetTypes2["BabySigmaBoy"] = "melonbp_brp:baby_sigmaboy";
  BrainrotPetTypes2["BabySvininoTNT"] = "melonbp_brp:baby_svininotnt";
  BrainrotPetTypes2["BabyTaTaTaSahur"] = "melonbp_brp:baby_tatatatasahur";
  BrainrotPetTypes2["BabyTiTuTiTuTiTaBuu"] = "melonbp_brp:baby_titutitutitabuu";
  BrainrotPetTypes2["BabySneakerShark"] = "melonbp_brp:baby_sneakershark";
  BrainrotPetTypes2["BabyTrenostruzzoTurbo3000"] = "melonbp_brp:baby_trenostruzzoturbo3000";
  BrainrotPetTypes2["BabyTricTracBarabum"] = "melonbp_brp:baby_trictracbarabum";
  BrainrotPetTypes2["BabyTripiTropiTropaTripa"] = "melonbp_brp:baby_tripitropitropatripa";
  BrainrotPetTypes2["BabyTrulimeroTrulichina"] = "melonbp_brp:baby_trulimerotrulichina";
  BrainrotPetTypes2["BabyCopyrightSahur"] = "melonbp_brp:baby_copyrightsahur";
  BrainrotPetTypes2["BabyUdinDinDinDunMadin"] = "melonbp_brp:baby_udindindindunmadindindindun";
  BrainrotPetTypes2["BallerinaCapuccina"] = "melonbp_brp:ballerinacapuchina";
  BrainrotPetTypes2["BallerinoLololo"] = "melonbp_brp:ballerinolololo";
  BrainrotPetTypes2["BlueberrinniOctopus"] = "melonbp_brp:blueberrinnioctopus";
  BrainrotPetTypes2["BobrittoBandito"] = "melonbp_brp:bobritobandito";
  BrainrotPetTypes2["BonecaAmbalabu"] = "melonbp_brp:bonecaambalabu";
  BrainrotPetTypes2["BrrBaloniLuliloli"] = "melonbp_brp:burbaloniluliloli";
  BrainrotPetTypes2["BriBriBicusDicusDeBicusDeDicus"] = "melonbp_brp:bribribicusdicusdebicusdedicus";
  BrainrotPetTypes2["BrrBrrPatapim"] = "melonbp_brp:brrbrrpatapin";
  BrainrotPetTypes2["BrrEsTehPatipum"] = "melonbp_brp:berrrestehpatipum";
  BrainrotPetTypes2["NinjaCappuccino"] = "melonbp_brp:ninjacapuccino";
  BrainrotPetTypes2["NinjaCappuccinoDecoy"] = "melonbp_brp:ninjacapuccino_decoy";
  BrainrotPetTypes2["ChimpanziniBananini"] = "melonbp_brp:chimpanzinibananini";
  BrainrotPetTypes2["ChimpanziniBananiniBananaPeel"] = "melonbp_brp:chimpanzinibananini_banana_peel";
  BrainrotPetTypes2["CocofantoElefanto"] = "melonbp_brp:cocofantoelefanto";
  BrainrotPetTypes2["EccoCavalloVirtuoso"] = "melonbp_brp:eccocavallovirtuoso";
  BrainrotPetTypes2["FrigoCamello"] = "melonbp_brp:frigocammello";
  BrainrotPetTypes2["FruliFrula"] = "melonbp_brp:frulifrula";
  BrainrotPetTypes2["CoolKidFootera"] = "melonbp_brp:coolkidfootera";
  BrainrotPetTypes2["SirOrangeGiraffe"] = "melonbp_brp:sirorangegiraffe";
  BrainrotPetTypes2["GaramMadu"] = "melonbp_brp:garammararam";
  BrainrotPetTypes2["GiraffaCeleste"] = "melonbp_brp:giraffaceleste";
  BrainrotPetTypes2["GloboFruttodrillo"] = "melonbp_brp:glorbofruttodillo";
  BrainrotPetTypes2["ilCactoHipopotamo"] = "melonbp_brp:ilcactohipopotamo";
  BrainrotPetTypes2["KarkerkarKurkur"] = "melonbp_brp:karkerkarkurkur";
  BrainrotPetTypes2["KetupatKepatPrekupat"] = "melonbp_brp:ketupatkepat";
  BrainrotPetTypes2["LaEsokSikola"] = "melonbp_brp:laesoksekolah";
  BrainrotPetTypes2["LaVacaSaturnoSaturnita"] = "melonbp_brp:vacasaturnosaturnita";
  BrainrotPetTypes2["LiriliLarila"] = "melonbp_brp:lirililarila";
  BrainrotPetTypes2["Matteooo"] = "melonbp_brp:mateooo";
  BrainrotPetTypes2["OrangutiniAnanasini"] = "melonbp_brp:orangutiniananasini";
  BrainrotPetTypes2["OrcaleroOrcala"] = "melonbp_brp:ocaleroorcala";
  BrainrotPetTypes2["Pakrahmatmamat"] = "melonbp_brp:pakrahmatmamat";
  BrainrotPetTypes2["PotHotSpot"] = "melonbp_brp:pothotspot";
  BrainrotPetTypes2["RhinoToasterino"] = "melonbp_brp:rhinotoasterino";
  BrainrotPetTypes2["SigmaBoy"] = "melonbp_brp:sigmaboy";
  BrainrotPetTypes2["SvininoTNT"] = "melonbp_brp:svininotnt";
  BrainrotPetTypes2["TaTaTaSahur"] = "melonbp_brp:tatatatasahur";
  BrainrotPetTypes2["TiTuTiTuTiTaBuu"] = "melonbp_brp:titutitutitabuu";
  BrainrotPetTypes2["SneakerShark"] = "melonbp_brp:sneakershark";
  BrainrotPetTypes2["TrenostruzzoTurbo3000"] = "melonbp_brp:trenostruzzoturbo3000";
  BrainrotPetTypes2["TricTracBarabum"] = "melonbp_brp:trictracbarabum";
  BrainrotPetTypes2["TripiTropiTropaTripa"] = "melonbp_brp:tripitropitropatripa";
  BrainrotPetTypes2["TrulimeroTrulichina"] = "melonbp_brp:trulimerotrulichina";
  BrainrotPetTypes2["TrulimeroTrulichinaMinion"] = "melonbp_brp:trulimerotrulichina_minion";
  BrainrotPetTypes2["CopyrightSahur"] = "melonbp_brp:copyrightsahur";
  BrainrotPetTypes2["UdinDinDinDunMadin"] = "melonbp_brp:udindindindunmadindindindun";
  return BrainrotPetTypes2;
})(BrainrotPetTypes || {});

// scripts/library/CC.ts
var CC = class _CC {
  /**
   * Class CC Constructor.
   * @param code - The color code as a string.
   * @param color - The color code as a hexadecimal number. Can be undefined.
   */
  constructor(code, color) {
    this.code = code;
    this.color = color;
    if (color) {
      this.r = color >> 16 & 255;
      this.g = color >> 8 & 255;
      this.b = color & 255;
    }
  }
  static {
    /**
     * Black color code. (0)
     */
    this.BLACK = new _CC("0", 0);
  }
  static {
    /**
     * Dark blue color code. (1)
     */
    this.DARK_BLUE = new _CC("1", 170);
  }
  static {
    /**
     * Dark green color code. (2)
     */
    this.DARK_GREEN = new _CC("2", 43520);
  }
  static {
    /**
     * Dark aqua color code. (3)
     */
    this.DARK_AQUA = new _CC("3", 43690);
  }
  static {
    /**
     * Dark red color code. (4)
     */
    this.DARK_RED = new _CC("4", 11141120);
  }
  static {
    /**
     * Dark purple color code. (5)
     */
    this.DARK_PURPLE = new _CC("5", 11141290);
  }
  static {
    /**
     * Gold color code. (6)
     */
    this.GOLD = new _CC("6", 16755200);
  }
  static {
    /**
     * Gray color code. (7)
     */
    this.GRAY = new _CC("7", 11184810);
  }
  static {
    /**
     * Dark gray color code. (8)
     */
    this.DARK_GRAY = new _CC("8", 5592405);
  }
  static {
    /**
     * Blue color code. (9)
     */
    this.BLUE = new _CC("9", 5592575);
  }
  static {
    /**
     * Green color code. (a)
     */
    this.GREEN = new _CC("a", 5635925);
  }
  static {
    /**
     * Aqua color code. (b)
     */
    this.AQUA = new _CC("b", 5636095);
  }
  static {
    /**
     * Red color code. (c)
     */
    this.RED = new _CC("c", 16733525);
  }
  static {
    /**
     * Light purple color code. (d)
     */
    this.LIGHT_PURPLE = new _CC("d", 16733695);
  }
  static {
    /**
     * Yellow color code. (e)
     */
    this.YELLOW = new _CC("e", 16777045);
  }
  static {
    /**
     * White color code. (f)
     */
    this.WHITE = new _CC("f", 16777215);
  }
  static {
    /**
     * MineCoin gold color code. (g)
     */
    this.MINECOIN_GOLD = new _CC("g", 14603781);
  }
  static {
    /**
     * Material quartz color code. (h)
     */
    this.MATERIAL_QUARTZ = new _CC("h", 14931153);
  }
  static {
    /**
     * Material iron color code. (i)
     */
    this.MATERIAL_IRON = new _CC("i", 13552330);
  }
  static {
    /**
     * Material netherite color code. (j)
     */
    this.MATERIAL_NETHERITE = new _CC("j", 4471355);
  }
  static {
    /**
     * Material redstone color code. (m)
     */
    this.MATERIAL_REDSTONE = new _CC("m", 9901575);
  }
  static {
    /**
     * Material copper color code. (n)
     */
    this.MATERIAL_COPPER = new _CC("n", 11823181);
  }
  static {
    /**
     * Material gold color code. (p)
     */
    this.MATERIAL_GOLD = new _CC("p", 14594349);
  }
  static {
    /**
     * Material emerald color code. (q)
     */
    this.MATERIAL_EMERALD = new _CC("q", 1155126);
  }
  static {
    /**
     * Material diamond color code. (s)
     */
    this.MATERIAL_DIAMOND = new _CC("s", 2931368);
  }
  static {
    /**
     * Material lapis color code. (t)
     */
    this.MATERIAL_LAPIS = new _CC("t", 2181499);
  }
  static {
    /**
     * Material amethyst color code. (u)
     */
    this.MATERIAL_AMETHYST = new _CC("u", 10116294);
  }
  static {
    /**
     * Obfuscated color code. (k)
     */
    this.OBFUSCATED = new _CC("k");
  }
  static {
    /**
     * Bold color code. (l)
     */
    this.BOLD = new _CC("l");
  }
  static {
    /**
     * Italic color code. (o)
     */
    this.ITALIC = new _CC("o");
  }
  static {
    /**
     * Reset color code. (r)
     */
    this.RESET = new _CC("r");
  }
  static {
    /**
     * All available color codes.
     */
    this.VALUES = [
      _CC.BLACK,
      _CC.DARK_BLUE,
      _CC.DARK_GREEN,
      _CC.DARK_AQUA,
      _CC.DARK_RED,
      _CC.DARK_PURPLE,
      _CC.GOLD,
      _CC.GRAY,
      _CC.DARK_GRAY,
      _CC.BLUE,
      _CC.GREEN,
      _CC.AQUA,
      _CC.RED,
      _CC.LIGHT_PURPLE,
      _CC.YELLOW,
      _CC.WHITE,
      _CC.MINECOIN_GOLD,
      _CC.MATERIAL_QUARTZ,
      _CC.MATERIAL_IRON,
      _CC.MATERIAL_NETHERITE,
      _CC.MATERIAL_REDSTONE,
      _CC.MATERIAL_COPPER,
      _CC.MATERIAL_GOLD,
      _CC.MATERIAL_EMERALD,
      _CC.MATERIAL_DIAMOND,
      _CC.MATERIAL_LAPIS,
      _CC.MATERIAL_AMETHYST,
      _CC.OBFUSCATED,
      _CC.BOLD,
      _CC.ITALIC,
      _CC.RESET
    ];
  }
  static {
    /**
     * All available color codes excluding the formatting codes.
     */
    this.ALL_COLORS = [
      _CC.BLACK,
      _CC.DARK_BLUE,
      _CC.DARK_GREEN,
      _CC.DARK_AQUA,
      _CC.DARK_RED,
      _CC.DARK_PURPLE,
      _CC.GOLD,
      _CC.GRAY,
      _CC.DARK_GRAY,
      _CC.BLUE,
      _CC.GREEN,
      _CC.AQUA,
      _CC.RED,
      _CC.LIGHT_PURPLE,
      _CC.YELLOW,
      _CC.WHITE,
      _CC.MINECOIN_GOLD,
      _CC.MATERIAL_QUARTZ,
      _CC.MATERIAL_IRON,
      _CC.MATERIAL_NETHERITE,
      _CC.MATERIAL_REDSTONE,
      _CC.MATERIAL_COPPER,
      _CC.MATERIAL_GOLD,
      _CC.MATERIAL_EMERALD,
      _CC.MATERIAL_DIAMOND,
      _CC.MATERIAL_LAPIS,
      _CC.MATERIAL_AMETHYST
    ];
  }
  static {
    /**
     * PREFIX is the section sign (§) used in Minecraft color codes.
     */
    this.PREFIX = "\xA7";
  }
  /**
   * Returns the string representation of the CC instance,
   * which includes the PREFIX followed by the color code.
   * @returns A string representing the CC instance
   */
  toString() {
    return _CC.PREFIX + this.code;
  }
  /**
   * Returns the color code of the CC instance.
   * @returns The color code of this CC instance.
   */
  toRGB() {
    return this.color;
  }
  /**
   * Returns the hexadecimal string representation of the color code
   * @returns {string | undefined} The hexadecimal representation of the color.
   */
  toHex() {
    return this.color?.toString(16);
  }
  /**
   * Retrieve the value of the red component.
   *
   * @returns {number | undefined} The value of the red component, or undefined if it is not set.
   */
  getRed() {
    return this.r;
  }
  /**
   * Retrieves the green value of the current color.
   *
   * @returns {number | undefined} The green value of the color, or undefined if it is not set.
   */
  getGreen() {
    return this.g;
  }
  /**
   * Retrieves the blue value of a color.
   *
   * @returns The blue value of the color.
   * @type {number | undefined}
   */
  getBlue() {
    return this.b;
  }
  /**
   * Retrieves the format code associated with the chat color.
   *
   * @returns {string} The format code of the chat color.
   */
  getCode() {
    return this.code;
  }
  toColorRGB() {
    return {
      red: (this.getRed() ?? 0) / 255,
      green: (this.getGreen() ?? 0) / 255,
      blue: (this.getBlue() ?? 0) / 255
    };
  }
  /**
   * Removes color codes from the specified string
   * @param str - The string from which color codes will be removed.
   * @returns The string cleared from color codes.
   */
  static stripColor(str) {
    return str.replace(/§[0-9a-u]/g, "");
  }
  /**
   * Finds the closest CC code for the given RGB values
   * @param r - Red part of the color.
   * @param g - Green part of the color.
   * @param b - Blue part of the color.
   * @returns The closest CC for the given RGB values.
   */
  static findClosestColor(r, g, b) {
    let minDistance = Number.MAX_VALUE;
    let closestColor = _CC.WHITE;
    for (const color of _CC.ALL_COLORS) {
      if (color.r && color.g && color.b) {
        const distance = Math.sqrt(
          Math.pow(color.r - r, 2) + Math.pow(color.g - g, 2) + Math.pow(color.b - b, 2)
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = color;
        }
      }
    }
    return closestColor;
  }
};

// scripts/library/functions/EntityDebounce.ts
import { system as system2 } from "@minecraft/server";
function EntityDebounce(cooldownTicks) {
  const entityDebounceTickDict = /* @__PURE__ */ Object.create(null);
  function isCooldownOver(lastTick) {
    return lastTick === void 0 || lastTick <= system2.currentTick;
  }
  return function(entity, fn) {
    for (const id2 in entityDebounceTickDict) {
      if (entityDebounceTickDict[id2] <= system2.currentTick) {
        delete entityDebounceTickDict[id2];
      }
    }
    const id = String(entity.id);
    if (isCooldownOver(entityDebounceTickDict[id])) {
      if (fn()) {
        entityDebounceTickDict[id] = system2.currentTick + cooldownTicks;
        return { success: true, time: cooldownTicks };
      }
    }
    return { success: false, time: entityDebounceTickDict[id] - system2.currentTick };
  };
}

// scripts/library/actions/BallerinaCapuchinaSurvivalEffectAction.ts
var debounce = EntityDebounce(20 * 25);
async function BallerinaCapuchinaSurvivalEffectAction_default({ target, player }) {
  return debounce(target, () => {
    let appliedAnyEffect = false;
    if (!player.getEffect(MinecraftEffectTypes.NightVision)) {
      player.addEffect(MinecraftEffectTypes.NightVision, 200);
      appliedAnyEffect = true;
    }
    if (!player.getEffect(MinecraftEffectTypes.Speed)) {
      player.addEffect(MinecraftEffectTypes.Speed, 200);
      appliedAnyEffect = true;
    }
    if (appliedAnyEffect) {
      player.playSound("mob.breeze.inhale", { pitch: 2 });
    }
    return appliedAnyEffect;
  });
}

// scripts/library/actions/RidePetAction.ts
import { EntityRideableComponent } from "@minecraft/server";
async function RidePetAction_default({ player, target }) {
  const entityRideableComponent = target.getComponent(EntityRideableComponent.componentId);
  if (!entityRideableComponent) {
    return false;
  }
  entityRideableComponent.addRider(player);
  return true;
}

// scripts/library/actions/SitPetAction.ts
import {
  EntityRideableComponent as EntityRideableComponent2,
  EntityRidingComponent
} from "@minecraft/server";
async function SitPetAction_default({ player, target }) {
  const ridingComponent = target.getComponent(EntityRidingComponent.componentId);
  if (ridingComponent && ridingComponent.entityRidingOn && ridingComponent.entityRidingOn.isValid && ridingComponent.entityRidingOn.typeId === "melonbp_brp:seat_entity") {
    ridingComponent.entityRidingOn.remove();
    return true;
  }
  const seatEntity = player.dimension.spawnEntity("melonbp_brp:seat_entity", target.location);
  const rideableComponent = seatEntity.getComponent(EntityRideableComponent2.componentId);
  rideableComponent.addRider(target);
  return true;
}

// scripts/__DIRECTORY/pets/BallerinaCapuccina.ts
import { EntityIsBabyComponent, EntityRideableComponent as EntityRideableComponent3 } from "@minecraft/server";
var BallerinaCapuccina_default = {
  babyIdentifier: "melonbp_brp:baby_ballerinacapuchina" /* BabyBallerinaCapuccina */,
  evolveTier: 1,
  identifier: "melonbp_brp:ballerinacapuchina" /* BallerinaCapuccina */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ballerinacapuchina.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ballerinacapuchina.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent.componentId) === void 0,
      callback: BallerinaCapuchinaSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent3.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/BallerinolololoSurvivalEffectAction.ts
var debounce2 = EntityDebounce(20 * 30);
async function BallerinolololoSurvivalEffectAction_default({ target, player }) {
  return debounce2(target, () => {
    let appliedAnyEffect = false;
    if (!player.getEffect(MinecraftEffectTypes.SlowFalling)) {
      player.addEffect(MinecraftEffectTypes.SlowFalling, 300);
      appliedAnyEffect = true;
    }
    if (!player.getEffect(MinecraftEffectTypes.Levitation)) {
      player.addEffect(MinecraftEffectTypes.Levitation, 300);
      appliedAnyEffect = true;
    }
    return appliedAnyEffect;
  });
}

// scripts/__DIRECTORY/pets/BallerinoLololo.ts
import { EntityIsBabyComponent as EntityIsBabyComponent2, EntityRideableComponent as EntityRideableComponent4 } from "@minecraft/server";
var BallerinoLololo_default = {
  babyIdentifier: "melonbp_brp:baby_ballerinolololo" /* BabyBallerinoLololo */,
  evolveTier: 2,
  identifier: "melonbp_brp:ballerinolololo" /* BallerinoLololo */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ballerinolololo.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ballerinolololo.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent2.componentId) === void 0,
      callback: BallerinolololoSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent4.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/BlueberrinniOctopus.ts
import { EntityRideableComponent as EntityRideableComponent5 } from "@minecraft/server";
var BlueberrinniOctopus_default = {
  babyIdentifier: "melonbp_brp:baby_blueberrinnioctopus" /* BabyBlueberrinniOctopus */,
  evolveTier: 0,
  identifier: "melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */,
  health: 20,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:blueberrinnioctopus.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:blueberrinnioctopus.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent5.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/BobrittoBandito.ts
import { EntityIsBabyComponent as EntityIsBabyComponent3, EntityRideableComponent as EntityRideableComponent6 } from "@minecraft/server";

// scripts/library/utils/OrientationUtils.ts
var OrientationUtils = class _OrientationUtils {
  static {
    this.DEG_TO_RAD = Math.PI / 180;
  }
  static {
    this.RAD_TO_DEG = 180 / Math.PI;
  }
  static ToOrientation(v) {
    return {
      x: Math.asin(-v.y) * _OrientationUtils.RAD_TO_DEG,
      y: -Math.atan2(v.x, v.z) * _OrientationUtils.RAD_TO_DEG
    };
  }
  static FromOrientation(orientation) {
    const xRot = orientation.x * _OrientationUtils.DEG_TO_RAD;
    const yRot = orientation.y * _OrientationUtils.DEG_TO_RAD;
    return {
      x: -Math.cos(xRot) * Math.sin(yRot),
      y: -Math.sin(xRot),
      z: Math.cos(yRot) * Math.cos(xRot)
    };
  }
};

// scripts/library/utils/PetUtils.ts
import { EntityTameableComponent } from "@minecraft/server";
var PetUtils = class {
  static isTamedToPlayer(entity, player) {
    const tameableComponent = entity.getComponent(EntityTameableComponent.componentId);
    return tameableComponent?.tamedToPlayer === player;
  }
  static hasNearbyPetEntity(owner, query) {
    return owner.dimension.getEntities({
      ...query,
      location: owner.location
    }).some((entity) => {
      const tameable = entity.getComponent(EntityTameableComponent.componentId);
      return tameable?.tamedToPlayerId === owner.id;
    });
  }
  static executeAttackFunctionOrIncrement(damagingEntity, amount, fn) {
    const propertyName = "melonbp_brp:attack_counter";
    const currentValue = damagingEntity.getProperty(propertyName) ?? 0;
    if (currentValue === Math.max(amount - 1, 0)) {
      damagingEntity.setProperty(propertyName, 0);
      fn();
    } else {
      damagingEntity.setProperty(propertyName, currentValue + 1);
    }
  }
  static getBabyBrainrotPetEvolveTier(typeId) {
    const dataType = BrianrotPetDataType.get(typeId);
    return dataType ? dataType.evolveTier : void 0;
  }
};

// node_modules/@minecraft/math/lib/general/clamp.js
function clampNumber(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// node_modules/@minecraft/math/lib/vector3/coreHelpers.js
var Vector3Utils = class _Vector3Utils {
  /**
   * equals
   *
   * Check the equality of two vectors
   */
  static equals(v1, v2) {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
  }
  /**
   * add
   *
   * Add two vectors to produce a new vector
   */
  static add(v1, v2) {
    return { x: v1.x + (v2.x ?? 0), y: v1.y + (v2.y ?? 0), z: v1.z + (v2.z ?? 0) };
  }
  /**
   * subtract
   *
   * Subtract two vectors to produce a new vector (v1-v2)
   */
  static subtract(v1, v2) {
    return { x: v1.x - (v2.x ?? 0), y: v1.y - (v2.y ?? 0), z: v1.z - (v2.z ?? 0) };
  }
  /** scale
   *
   * Multiple all entries in a vector by a single scalar value producing a new vector
   */
  static scale(v1, scale) {
    return { x: v1.x * scale, y: v1.y * scale, z: v1.z * scale };
  }
  /**
   * dot
   *
   * Calculate the dot product of two vectors
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /**
   * cross
   *
   * Calculate the cross product of two vectors. Returns a new vector.
   */
  static cross(a, b) {
    return { x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x };
  }
  /**
   * magnitude
   *
   * The magnitude of a vector
   */
  static magnitude(v) {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  }
  /**
   * distance
   *
   * Calculate the distance between two vectors
   */
  static distance(a, b) {
    return _Vector3Utils.magnitude(_Vector3Utils.subtract(a, b));
  }
  /**
   * normalize
   *
   * Takes a vector 3 and normalizes it to a unit vector
   */
  static normalize(v) {
    const mag = _Vector3Utils.magnitude(v);
    return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
  }
  /**
   * floor
   *
   * Floor the components of a vector to produce a new vector
   */
  static floor(v) {
    return { x: Math.floor(v.x), y: Math.floor(v.y), z: Math.floor(v.z) };
  }
  /**
   * toString
   *
   * Create a string representation of a vector3
   */
  static toString(v, options) {
    const decimals = options?.decimals ?? 2;
    const str = [v.x.toFixed(decimals), v.y.toFixed(decimals), v.z.toFixed(decimals)];
    return str.join(options?.delimiter ?? ", ");
  }
  /**
   * fromString
   *
   * Gets a Vector3 from the string representation produced by {@link Vector3Utils.toString}. If any numeric value is not a number
   * or the format is invalid, undefined is returned.
   * @param str - The string to parse
   * @param delimiter - The delimiter used to separate the components. Defaults to the same as the default for {@link Vector3Utils.toString}
   */
  static fromString(str, delimiter = ",") {
    const parts = str.split(delimiter);
    if (parts.length !== 3) {
      return void 0;
    }
    const output = parts.map((part) => parseFloat(part));
    if (output.some((part) => isNaN(part))) {
      return void 0;
    }
    return { x: output[0], y: output[1], z: output[2] };
  }
  /**
   * clamp
   *
   * Clamps the components of a vector to limits to produce a new vector
   */
  static clamp(v, limits) {
    return {
      x: clampNumber(v.x, limits?.min?.x ?? Number.MIN_SAFE_INTEGER, limits?.max?.x ?? Number.MAX_SAFE_INTEGER),
      y: clampNumber(v.y, limits?.min?.y ?? Number.MIN_SAFE_INTEGER, limits?.max?.y ?? Number.MAX_SAFE_INTEGER),
      z: clampNumber(v.z, limits?.min?.z ?? Number.MIN_SAFE_INTEGER, limits?.max?.z ?? Number.MAX_SAFE_INTEGER)
    };
  }
  /**
   * lerp
   *
   * Constructs a new vector using linear interpolation on each component from two vectors.
   */
  static lerp(a, b, t) {
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t };
  }
  /**
   * slerp
   *
   * Constructs a new vector using spherical linear interpolation on each component from two vectors.
   */
  static slerp(a, b, t) {
    const theta = Math.acos(_Vector3Utils.dot(a, b));
    const sinTheta = Math.sin(theta);
    const ta = Math.sin((1 - t) * theta) / sinTheta;
    const tb = Math.sin(t * theta) / sinTheta;
    return _Vector3Utils.add(_Vector3Utils.scale(a, ta), _Vector3Utils.scale(b, tb));
  }
  /**
   * multiply
   *
   * Element-wise multiplication of two vectors together.
   * Not to be confused with {@link Vector3Utils.dot} product or {@link Vector3Utils.cross} product
   */
  static multiply(a, b) {
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z };
  }
  /**
   * rotateX
   *
   * Rotates the vector around the x axis counterclockwise (left hand rule)
   * @param a - Angle in radians
   */
  static rotateX(v, a) {
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return { x: v.x, y: v.y * cos - v.z * sin, z: v.z * cos + v.y * sin };
  }
  /**
   * rotateY
   *
   * Rotates the vector around the y axis counterclockwise (left hand rule)
   * @param a - Angle in radians
   */
  static rotateY(v, a) {
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return { x: v.x * cos + v.z * sin, y: v.y, z: v.z * cos - v.x * sin };
  }
  /**
   * rotateZ
   *
   * Rotates the vector around the z axis counterclockwise (left hand rule)
   * @param a - Angle in radians
   */
  static rotateZ(v, a) {
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return { x: v.x * cos - v.y * sin, y: v.y * cos + v.x * sin, z: v.z };
  }
};
var VECTOR3_UP = { x: 0, y: 1, z: 0 };
var VECTOR3_ONE = { x: 1, y: 1, z: 1 };

// scripts/library/actions/BobrittoBanditoSurvivalEffectAction.ts
import {
  EntityProjectileComponent,
  EntityTameableComponent as EntityTameableComponent2,
  Player as Player2,
  system as system3,
  world as world3
} from "@minecraft/server";
var AttackDebounceFn = EntityDebounce(30);
var AlertDebounceFn = EntityDebounce(100);
function isOnStakeoutMode(entity) {
  return entity.getProperty("melonbp_brp:stakeout_mode") !== "none";
}
function getEntityQuery(mode) {
  const families = [];
  switch (mode) {
    case "all":
      families.push("mob");
      break;
    case "hostile":
      families.push("monster");
      break;
    case "player":
      families.push("player");
      break;
  }
  return {
    families,
    maxDistance: 24
  };
}
function stakeoutChangeRawtextMessage(target) {
  return {
    rawtext: [
      { text: CC.GREEN + "" },
      {
        translate: "pet.bobritto_bandito.survival_effect.stakeout_mode_changed",
        with: {
          rawtext: [
            { translate: target.localizationKey },
            {
              translate: "pet.bobritto_bandito.survival_effect.stakeout_mode." + target.getProperty("melonbp_brp:stakeout_mode")
            }
          ]
        }
      }
    ]
  };
}
function fireProjectile(entity, direction) {
  const arrow = entity.dimension.spawnEntity(
    MinecraftEntityTypes.Arrow,
    Vector3Utils.add(entity.getHeadLocation(), entity.getViewDirection())
  );
  arrow.setRotation(OrientationUtils.ToOrientation(direction));
  let impulseForce = { ...direction };
  impulseForce = Vector3Utils.scale(impulseForce, 3);
  arrow.applyImpulse(impulseForce);
  const arrowProjectileComponent = arrow.getComponent(EntityProjectileComponent.componentId);
  arrowProjectileComponent.owner = entity;
}
system3.beforeEvents.startup.subscribe(() => {
  system3.runInterval(() => {
    for (const entity of EntityUtils.getAllEntitiesIterator({
      type: "melonbp_brp:bobritobandito" /* BobrittoBandito */
    })) {
      const stakeoutMode = entity.getProperty("melonbp_brp:stakeout_mode");
      if (stakeoutMode === "none") {
        continue;
      }
      const targets = [
        ...entity.dimension.getEntities({
          ...getEntityQuery(stakeoutMode),
          location: entity.location
        }),
        ...entity.dimension.getEntities({
          type: MinecraftEntityTypes.Player,
          maxDistance: 24,
          location: entity.location
        })
      ];
      for (const target of targets) {
        if (target.id === entity.id) {
          continue;
        }
        if (target instanceof Player2 && PetUtils.isTamedToPlayer(entity, target)) {
          continue;
        }
        let direction = Vector3Utils.subtract(target.location, entity.location);
        direction = Vector3Utils.normalize(direction);
        const results = entity.dimension.getEntitiesFromRay(entity.getHeadLocation(), direction);
        if (results.length < 2) {
          continue;
        }
        AlertDebounceFn(entity, () => {
          const tameableComponent = entity.getComponent(EntityTameableComponent2.componentId);
          if (tameableComponent.tamedToPlayer) {
            if (target instanceof Player2) {
              tameableComponent.tamedToPlayer.sendMessage({
                rawtext: [
                  { text: CC.RED + "" },
                  {
                    translate: "pet.bobritto_bandito.survival_effect.stackout_alert",
                    with: {
                      rawtext: [{ translate: entity.localizationKey }, { text: target.nameTag }]
                    }
                  }
                ]
              });
            } else {
              tameableComponent.tamedToPlayer.sendMessage({
                rawtext: [
                  { text: CC.RED + "" },
                  {
                    translate: "pet.bobritto_bandito.survival_effect.stackout_alert",
                    with: {
                      rawtext: [
                        { translate: entity.localizationKey },
                        { translate: target.localizationKey }
                      ]
                    }
                  }
                ]
              });
            }
          }
          return true;
        });
        AttackDebounceFn(entity, () => {
          entity.setRotation(OrientationUtils.ToOrientation(direction));
          fireProjectile(entity, direction);
          return true;
        });
        break;
      }
    }
  });
  world3.afterEvents.playerInteractWithEntity.subscribe(({ player, target }) => {
    if (target.typeId === "melonbp_brp:bobritobandito" /* BobrittoBandito */ && PetUtils.isTamedToPlayer(target, player) && isOnStakeoutMode(target)) {
      switch (target.getProperty("melonbp_brp:stakeout_mode")) {
        case "all":
          target.setProperty("melonbp_brp:stakeout_mode", "hostile");
          target.dimension.playSound("note.skeleton", target.location, { pitch: 0.6 });
          break;
        case "hostile":
          target.setProperty("melonbp_brp:stakeout_mode", "player");
          target.dimension.playSound("note.skeleton", target.location, { pitch: 0.5 });
          break;
        case "player":
          target.setProperty("melonbp_brp:stakeout_mode", "all");
          target.dimension.playSound("note.skeleton", target.location, { pitch: 0.7 });
          break;
      }
      system3.runTimeout(() => {
        player.sendMessage(stakeoutChangeRawtextMessage(target));
      }, 2);
    }
  });
});
async function BobrittoBanditoSurvivalEffectAction_default({ player, target }) {
  if (PetUtils.isTamedToPlayer(target, player)) {
    if (isOnStakeoutMode(target)) {
      target.removeEffect(MinecraftEffectTypes.Slowness);
      target.setProperty("melonbp_brp:stakeout_mode", "none");
      target.dimension.playSound("note.skeleton", target.location, { pitch: 0.8 });
    } else {
      target.addEffect(MinecraftEffectTypes.Slowness, 1e6, { amplifier: 200, showParticles: false });
      target.setProperty("melonbp_brp:stakeout_mode", "all");
      target.dimension.playSound("note.skeleton", target.location, { pitch: 0.7 });
    }
    system3.runTimeout(() => {
      player.sendMessage(stakeoutChangeRawtextMessage(target));
    }, 2);
  }
  return true;
}

// scripts/__DIRECTORY/pets/BobrittoBandito.ts
var BobrittoBandito_default = {
  babyIdentifier: "melonbp_brp:baby_bobritobandito" /* BabyBobrittoBandito */,
  evolveTier: 1,
  identifier: "melonbp_brp:bobritobandito" /* BobrittoBandito */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bobritobandito.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bobritobandito.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent3.componentId) === void 0,
      callback: BobrittoBanditoSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent6.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/BonecaAmbalabu.ts
import { EntityRideableComponent as EntityRideableComponent7 } from "@minecraft/server";
var BonecaAmbalabu_default = {
  babyIdentifier: "melonbp_brp:baby_bonecaambalabu" /* BabyBonecaAmbalabu */,
  evolveTier: 2,
  identifier: "melonbp_brp:bonecaambalabu" /* BonecaAmbalabu */,
  health: 80,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bonecaambalabu.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bonecaambalabu.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent7.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/BriBriBicusDicusDeBicusDicusSurvivalEffectAction.ts
import { system as system4 } from "@minecraft/server";
var debounce3 = EntityDebounce(20 * 60);
async function BriBriBicusDicusDeBicusDicusSurvivalEffectAction_default({ target, player }) {
  if (target.typeId !== "melonbp_brp:bribribicusdicusdebicusdedicus" /* BriBriBicusDicusDeBicusDeDicus */ || !PetUtils.isTamedToPlayer(target, player)) {
    return;
  }
  return debounce3(player, () => {
    system4.run(async () => {
      target.playAnimation("animation.melonbp_brp.bribribicusdicusdebicusdedicus.attack");
      await system4.waitTicks(20);
      for (let i = 0; i < 3; i++) {
        const armorStandEntity = player.dimension.spawnEntity(
          MinecraftEntityTypes.ArmorStand,
          player.location
        );
        armorStandEntity.addEffect(MinecraftEffectTypes.Invisibility, 2e6, { showParticles: false });
        armorStandEntity.addTag("melonbp_brp:removable");
        armorStandEntity.setDynamicProperty("melonbp_brp:shield_owner", player.id);
        armorStandEntity.addTag("melonbp_brp:shield");
        armorStandEntity.addTag("melonbp_brp:shield_" + i);
        armorStandEntity.runCommand(
          "/replaceitem entity @s slot.weapon.mainhand 0 minecraft:shield 1"
        );
        system4.runTimeout(() => {
          armorStandEntity.playAnimation("animation.armor_stand.riposte_pose", {
            blendOutTime: 9e3
          });
        }, 2);
        system4.runTimeout(() => {
          if (armorStandEntity.isValid) {
            armorStandEntity.remove();
          }
        }, 20 * 10);
      }
    });
    return true;
  });
}

// scripts/__DIRECTORY/pets/BriBriBicusDicusDeBicusDeDicus.ts
import { EntityIsBabyComponent as EntityIsBabyComponent5, EntityRideableComponent as EntityRideableComponent8 } from "@minecraft/server";
var BriBriBicusDicusDeBicusDeDicus_default = {
  babyIdentifier: "melonbp_brp:baby_bribribicusdicusdebicusdedicus" /* BabyBriBriBicusDicusDeBicusDeDicus */,
  evolveTier: 0,
  identifier: "melonbp_brp:bribribicusdicusdebicusdedicus" /* BriBriBicusDicusDeBicusDeDicus */,
  health: 20,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bribribicusdicusdebicusdedicus.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:bribribicusdicusdebicusdedicus.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent5.componentId) === void 0,
      callback: BriBriBicusDicusDeBicusDicusSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent8.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/BrrBaloniLuliloliSurvivalEffectAction.ts
import {
  EntityEquippableComponent as EntityEquippableComponent2,
  EquipmentSlot as EquipmentSlot2,
  ItemStack as ItemStack2
} from "@minecraft/server";
var Config = {
  ValidConsumableItemTypeIds: [
    // Seeds
    MinecraftItemTypes.WheatSeeds,
    MinecraftItemTypes.PumpkinSeeds,
    MinecraftItemTypes.MelonSeeds,
    MinecraftItemTypes.BeetrootSeeds,
    MinecraftItemTypes.TorchflowerSeeds,
    MinecraftItemTypes.PitcherPod,
    // Ground Cover
    MinecraftItemTypes.Fern,
    MinecraftItemTypes.LargeFern,
    MinecraftItemTypes.ShortGrass,
    MinecraftItemTypes.TallGrass,
    MinecraftItemTypes.ShortDryGrass,
    MinecraftItemTypes.TallDryGrass,
    MinecraftItemTypes.Bush,
    MinecraftItemTypes.NetherSprouts,
    // Flowers
    MinecraftItemTypes.CrimsonRoots,
    MinecraftItemTypes.WarpedRoots,
    MinecraftItemTypes.Dandelion,
    MinecraftItemTypes.Poppy,
    MinecraftItemTypes.BlueOrchid,
    MinecraftItemTypes.Allium,
    MinecraftItemTypes.AzureBluet,
    MinecraftItemTypes.RedTulip,
    MinecraftItemTypes.OrangeTulip,
    MinecraftItemTypes.WhiteTulip,
    MinecraftItemTypes.PinkTulip,
    MinecraftItemTypes.OxeyeDaisy,
    MinecraftItemTypes.Cornflower,
    MinecraftItemTypes.LilyOfTheValley,
    MinecraftItemTypes.Sunflower,
    MinecraftItemTypes.Lilac,
    MinecraftItemTypes.RoseBush,
    MinecraftItemTypes.Peony,
    MinecraftItemTypes.PitcherPlant,
    MinecraftItemTypes.PinkPetals,
    MinecraftItemTypes.Wildflowers,
    MinecraftItemTypes.WitherRose,
    MinecraftItemTypes.Torchflower,
    MinecraftItemTypes.CactusFlower,
    MinecraftItemTypes.ChorusPlant,
    MinecraftItemTypes.ClosedEyeblossom,
    MinecraftItemTypes.OpenEyeblossom,
    // OTHERS
    MinecraftItemTypes.OakSapling,
    MinecraftItemTypes.BirchSapling,
    MinecraftItemTypes.SpruceSapling,
    MinecraftItemTypes.AcaciaSapling,
    MinecraftItemTypes.CherrySapling,
    MinecraftItemTypes.JungleSapling,
    MinecraftItemTypes.DarkOakSapling,
    MinecraftItemTypes.PaleOakSapling,
    MinecraftItemTypes.Kelp,
    MinecraftItemTypes.OakLeaves,
    MinecraftItemTypes.BirchLeaves,
    MinecraftItemTypes.AcaciaLeaves,
    MinecraftItemTypes.AzaleaLeaves,
    MinecraftItemTypes.AzaleaLeavesFlowered,
    MinecraftItemTypes.CherryLeaves,
    MinecraftItemTypes.JungleLeaves,
    MinecraftItemTypes.SpruceLeaves,
    MinecraftItemTypes.DarkOakLeaves,
    MinecraftItemTypes.PaleOakLeaves,
    MinecraftItemTypes.MangroveLeaves
  ]
};
async function BrrBaloniLuliloliSurvivalEffectAction_default({ target, itemStack, player }) {
  if (target.typeId !== "melonbp_brp:burbaloniluliloli" /* BrrBaloniLuliloli */ || !PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  if (!itemStack || !Config.ValidConsumableItemTypeIds.includes(itemStack.typeId) || itemStack.amount < 8) {
    return false;
  }
  const equippableComponent = player.getComponent(EntityEquippableComponent2.componentId);
  if (itemStack.amount === 8) {
    equippableComponent.setEquipment(EquipmentSlot2.Mainhand, void 0);
  } else {
    itemStack.amount -= 8;
    equippableComponent.setEquipment(EquipmentSlot2.Mainhand, itemStack);
  }
  const rewardItemEntity = target.dimension.spawnItem(
    new ItemStack2(MinecraftItemTypes.BoneMeal),
    target.getHeadLocation()
  );
  rewardItemEntity.clearVelocity();
  rewardItemEntity.applyImpulse(Vector3Utils.scale(target.getViewDirection(), 0.2));
  target.dimension.playSound("random.burp", target.getHeadLocation(), {
    pitch: 0.9 + (Math.random() + 0.3)
  });
  return true;
}

// scripts/__DIRECTORY/pets/BrrBaloniLuliloli.ts
import { EntityIsBabyComponent as EntityIsBabyComponent6, EntityRideableComponent as EntityRideableComponent9 } from "@minecraft/server";
var BrrBaloniLuliloli_default = {
  babyIdentifier: "melonbp_brp:baby_burbaloniluliloli" /* BabyBrrBaloniLuliloli */,
  evolveTier: 0,
  identifier: "melonbp_brp:burbaloniluliloli" /* BrrBaloniLuliloli */,
  health: 20,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:burbaloniluliloli.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:burbaloniluliloli.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent6.componentId) === void 0,
      callback: BrrBaloniLuliloliSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent9.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/BrrBrrPatapimSurvivalEffectAction.ts
var debounce4 = EntityDebounce(20 * 30);
async function BrrBrrPatapimSurvivalEffectAction_default({ target, player }) {
  if (target.typeId !== "melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */ || !PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  return debounce4(target, () => {
    if (!player.getEffect(MinecraftEffectTypes.Speed)) {
      player.addEffect(MinecraftEffectTypes.Speed, 20 * 10, { amplifier: 1 });
      return true;
    }
    return false;
  });
}

// scripts/__DIRECTORY/pets/BrrBrrPatapim.ts
import { EntityIsBabyComponent as EntityIsBabyComponent7, EntityRideableComponent as EntityRideableComponent10 } from "@minecraft/server";
var BrrBrrPatapim_default = {
  babyIdentifier: "melonbp_brp:baby_brrbrrpatapin" /* BabyBrrBrrPatapim */,
  evolveTier: 1,
  identifier: "melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:brrbrrpatapin.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:brrbrrpatapin.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent7.componentId) === void 0,
      callback: BrrBrrPatapimSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent10.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/BrrEsTehPatipum.ts
import { EntityRideableComponent as EntityRideableComponent11 } from "@minecraft/server";
var BrrEsTehPatipum_default = {
  babyIdentifier: "melonbp_brp:baby_berrrestehpatipum" /* BabyBrrEsTehPatipum */,
  evolveTier: 3,
  identifier: "melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */,
  health: 100,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:berrrestehpatipum.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:berrrestehpatipum.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent11.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/NinjaCappuccino.ts
import { EntityIsBabyComponent as EntityIsBabyComponent9, EntityRideableComponent as EntityRideableComponent12 } from "@minecraft/server";

// scripts/library/actions/NinjaCappuccinoSurvivalEffectAction.ts
var debounce5 = EntityDebounce(20 * 60);
async function NinjaCappuccinoSurvivalEffectAction_default({ player }) {
  return debounce5(player, () => {
    if (!player.getEffect(MinecraftEffectTypes.Invisibility)) {
      player.addEffect(MinecraftEffectTypes.Invisibility, 20 * 15);
      return true;
    }
    return false;
  });
}

// scripts/__DIRECTORY/pets/NinjaCappuccino.ts
var NinjaCappuccino_default = {
  babyIdentifier: "melonbp_brp:baby_ninjacapuccino" /* BabyNinjaCapuccino */,
  evolveTier: 2,
  identifier: "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ninjacapuccino.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ninjacapuccino.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent9.componentId) === void 0,
      callback: NinjaCappuccinoSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent12.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/ChimpanziniBananini.ts
import { EntityRideableComponent as EntityRideableComponent13 } from "@minecraft/server";
var ChimpanziniBananini_default = {
  babyIdentifier: "melonbp_brp:baby_chimpanzinibananini" /* BabyChimpanziniBananini */,
  evolveTier: 0,
  identifier: "melonbp_brp:chimpanzinibananini" /* ChimpanziniBananini */,
  health: 20,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:chimpanzinibananini.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:chimpanzinibananini.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent13.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/CocofantoElefantoSurvivalEffectAction.ts
import {
  EntityEquippableComponent as EntityEquippableComponent3,
  EntityInventoryComponent,
  EquipmentSlot as EquipmentSlot3,
  ItemStack as ItemStack3
} from "@minecraft/server";
var CocofantoElefantoSurvivalEffectAction_default = class {
  static async WaterBucketSurvivalEffectAction({
    player,
    target,
    itemStack
  }) {
    if (!itemStack || !PetUtils.isTamedToPlayer(target, player)) {
      return false;
    }
    if (itemStack.typeId === MinecraftItemTypes.WaterBucket) {
      player.dimension.playSound("bucket.empty_water", target.location);
      const equippableComponent = player.getComponent(EntityEquippableComponent3.componentId);
      equippableComponent.setEquipment(
        EquipmentSlot3.Mainhand,
        new ItemStack3(MinecraftItemTypes.Bucket)
      );
      return true;
    }
    return false;
  }
  static async EmptyBucketSurvivalEffectAction({
    player,
    target,
    itemStack
  }) {
    if (!itemStack || !PetUtils.isTamedToPlayer(target, player)) {
      return false;
    }
    if (itemStack.typeId === MinecraftItemTypes.Bucket) {
      player.dimension.playSound("bucket.fill_water", target.location);
      if (itemStack.amount === 1) {
        const equippableComponent2 = player.getComponent(EntityEquippableComponent3.componentId);
        equippableComponent2.setEquipment(
          EquipmentSlot3.Mainhand,
          new ItemStack3(MinecraftItemTypes.WaterBucket)
        );
        return true;
      }
      itemStack.amount -= 1;
      const equippableComponent = player.getComponent(EntityEquippableComponent3.componentId);
      equippableComponent.setEquipment(EquipmentSlot3.Mainhand, itemStack);
      const inventoryComponent = player.getComponent(EntityInventoryComponent.componentId);
      if (inventoryComponent.container.emptySlotsCount === 0) {
        player.dimension.spawnItem(
          new ItemStack3(MinecraftItemTypes.WaterBucket),
          target.getHeadLocation()
        );
      } else {
        inventoryComponent.container.addItem(new ItemStack3(MinecraftItemTypes.WaterBucket));
      }
      return true;
    }
    return false;
  }
};

// scripts/__DIRECTORY/pets/CocofantoElefanto.ts
import { EntityIsBabyComponent as EntityIsBabyComponent11, EntityRideableComponent as EntityRideableComponent14 } from "@minecraft/server";
var CocofantoElefanto_default = {
  babyIdentifier: "melonbp_brp:baby_cocofantoelefanto" /* BabyCocofantoElefanto */,
  evolveTier: 1,
  identifier: "melonbp_brp:cocofantoelefanto" /* CocofantoElefanto */,
  health: 40,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:cocofantoelefanto.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:cocofantoelefanto.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Empty Bucket",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent11.componentId) === void 0,
      callback: CocofantoElefantoSurvivalEffectAction_default.WaterBucketSurvivalEffectAction
    },
    {
      text: "Fill Bucket",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent11.componentId) === void 0,
      callback: CocofantoElefantoSurvivalEffectAction_default.EmptyBucketSurvivalEffectAction
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent14.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/CopyrightSahurSurvivalEffectAction.ts
async function CopyrightSahurSurvivalEffectAction_default({ player, target }) {
  if (!PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  const isEmittingLight = !Boolean(target.getProperty("melonbp_brp:emit_light"));
  player.playSound("random.lever_click", { pitch: isEmittingLight ? 1.2 : 0.8 });
  target.setProperty("melonbp_brp:emit_light", isEmittingLight);
  return true;
}

// scripts/__DIRECTORY/pets/CopyrightSahur.ts
import { EntityIsBabyComponent as EntityIsBabyComponent12, EntityRideableComponent as EntityRideableComponent15 } from "@minecraft/server";
var CopyrightSahur_default = {
  babyIdentifier: "melonbp_brp:baby_copyrightsahur" /* BabyCopyrightSahur */,
  evolveTier: 0,
  identifier: "melonbp_brp:copyrightsahur" /* CopyrightSahur */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:copyrightsahur.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:copyrightsahur.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent12.componentId) === void 0,
      callback: CopyrightSahurSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent15.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/EccoCavalloVirtuoso.ts
import { EntityIsBabyComponent as EntityIsBabyComponent13, EntityRideableComponent as EntityRideableComponent16 } from "@minecraft/server";

// scripts/library/actions/EccoCavalloVirtuosoSurvivalEffectAction.ts
import { system as system5, world as world4 } from "@minecraft/server";

// scripts/library/forms/EccoCavalloVirtuosoMusicForm.ts
import { ActionFormData } from "@minecraft/server-ui";
var EccoCavalloVirtuosoMusicForm = class extends ActionFormData {
  constructor() {
    super();
    this.title("Ecco Cavallo Virtuoso");
    this.header("Music Player");
    this.button("Music Disc 5", "textures/items/record_5.png");
    this.button("Music Disc 11", "textures/items/record_11.png");
    this.button("Music Disc 13", "textures/items/record_13.png");
    this.button("Music Disc Blocks", "textures/items/record_blocks.png");
    this.button("Music Disc Cat", "textures/items/record_cat.png");
    this.button("Music Disc Chirp", "textures/items/record_chirp.png");
    this.button("Music Disc Creator", "textures/items/music_disc_creator.png");
    this.button("Music Disc Creator Music Box", "textures/items/music_disc_creator_music_box.png");
    this.button("Music Disc Far", "textures/items/record_far.png");
    this.button("Music Disc Lava Chicken", "textures/items/music_disc_lava_chicken.png");
    this.button("Music Disc Mall", "textures/items/record_mall.png");
    this.button("Music Disc Mellohi", "textures/items/record_mellohi.png");
    this.button("Music Disc Otherside", "textures/items/record_otherside.png");
    this.button("Music Disc Pigstep", "textures/items/record_pigstep.png");
    this.button("Music Disc Precipice", "textures/items/music_disc_precipice.png");
    this.button("Music Disc Relic", "textures/items/music_disc_relic.png");
    this.button("Music Disc Stal", "textures/items/record_stal.png");
    this.button("Music Disc Strad", "textures/items/record_strad.png");
    this.button("Music Disc Tears", "textures/items/music_disc_tears.png");
    this.button("Music Disc Wait", "textures/items/record_wait.png");
    this.button("Music Disc Ward", "textures/items/record_ward.png");
  }
};

// scripts/library/actions/EccoCavalloVirtuosoSurvivalEffectAction.ts
var Config2 = {
  MusicRecordSoundIds: [
    "record.5",
    "record.11",
    "record.13",
    "record.blocks",
    "record.cat",
    "record.chirp",
    "record.creator",
    "record.creator_music_box",
    "record.far",
    "record.lava_chicken",
    "record.mall",
    "record.mellohi",
    "record.otherside",
    "record.pigstep",
    "record.precipice",
    "record.relic",
    "record.stal",
    "record.strad",
    "record.tears",
    "record.wait",
    "record.ward"
  ]
};
async function EccoCavalloVirtuosoSurvivalEffectAction_default({ player, target }) {
  if (PetUtils.isTamedToPlayer(target, player)) {
    const form = new EccoCavalloVirtuosoMusicForm();
    const { canceled, selection } = await form.show(player);
    if (!canceled && selection) {
      for (const musicId of Config2.MusicRecordSoundIds) {
        player.runCommand(`stopsound @a ${musicId}`);
      }
      system5.runTimeout(() => {
        for (const other of world4.getAllPlayers()) {
          other.playSound(Config2.MusicRecordSoundIds[Number(selection)]);
        }
      }, 12);
      return true;
    }
  }
  return false;
}

// scripts/__DIRECTORY/pets/EccoCavalloVirtuoso.ts
var EccoCavalloVirtuoso_default = {
  babyIdentifier: "melonbp_brp:baby_eccocavallovirtuoso" /* BabyEccoCavalloVirtuoso */,
  evolveTier: 1,
  identifier: "melonbp_brp:eccocavallovirtuoso" /* EccoCavalloVirtuoso */,
  health: 40,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:eccocavallovirtuoso.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:eccocavallovirtuoso.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent13.componentId) === void 0,
      callback: EccoCavalloVirtuosoSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent16.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/FrigoCamello.ts
import { EntityRideableComponent as EntityRideableComponent17 } from "@minecraft/server";
var FrigoCamello_default = {
  babyIdentifier: "melonbp_brp:baby_frigocammello" /* BabyFrigoCamello */,
  evolveTier: 2,
  identifier: "melonbp_brp:frigocammello" /* FrigoCamello */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:frigocammello.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:frigocammello.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent17.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/FormatUtils.ts
var FormatUtils = class {
  static formatClockTime(tick) {
    let hours24 = (tick / 1e3 + 6) % 24;
    const totalMinutes = hours24 * 60;
    const hours = Math.floor(hours24);
    const minutes = Math.floor(totalMinutes % 60);
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    const ampm = hours >= 12 ? "PM" : "AM";
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${paddedMinutes} ${ampm}`;
  }
};

// scripts/library/WeatherUtils.ts
import { WeatherType, world as world5 } from "@minecraft/server";
var WeatherUtils = class {
  static getWeather(dimension) {
    dimension;
    return world5.getDynamicProperty(`melonbp_brp:weather_status.${dimension.id}`) ?? WeatherType.Clear;
  }
};

// scripts/library/actions/FruliFrulaSurvivalEffectAction.ts
import { world as world6 } from "@minecraft/server";
async function FruliFrulaSurvivalEffectAction_default({ player, target }) {
  player.sendMessage({
    rawtext: [
      { text: CC.GOLD + "" },
      {
        translate: "pet.fruli_frula.survival_effect.time_of_day",
        with: [CC.RED + FormatUtils.formatClockTime(world6.getTimeOfDay())]
      }
    ]
  });
  player.sendMessage({
    rawtext: [
      { text: CC.GOLD + "" },
      {
        translate: "pet.fruli_frula.survival_effect.weather",
        with: [CC.RED + WeatherUtils.getWeather(target.dimension)]
      }
    ]
  });
  player.playSound("note.iron_xylophone", { pitch: 1.2 });
  return true;
}

// scripts/__DIRECTORY/pets/FruliFrula.ts
import { EntityIsBabyComponent as EntityIsBabyComponent15, EntityRideableComponent as EntityRideableComponent18 } from "@minecraft/server";
var FruliFrula_default = {
  babyIdentifier: "melonbp_brp:baby_frulifrula" /* BabyFruliFrula */,
  evolveTier: 1,
  identifier: "melonbp_brp:frulifrula" /* FruliFrula */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:frulifrula.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:frulifrula.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent15.componentId) === void 0,
      callback: FruliFrulaSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent18.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/SirOrangeGiraffeSurvivalEffectAction.ts
import {
  EntityEquippableComponent as EntityEquippableComponent4,
  EntityInventoryComponent as EntityInventoryComponent2,
  EquipmentSlot as EquipmentSlot4,
  ItemStack as ItemStack4
} from "@minecraft/server";
async function SirOrangeGiraffeSurvivalEffectAction_default({ player, itemStack, target }) {
  if (!PetUtils.isTamedToPlayer(target, player) || !itemStack || itemStack.typeId !== MinecraftItemTypes.Bucket) {
    return false;
  }
  const equippableComponent = player.getComponent(EntityEquippableComponent4.componentId);
  const inventoryComponent = player.getComponent(EntityInventoryComponent2.componentId);
  const newItemStack = new ItemStack4("melonbp_brp:bucket_of_orange" /* OrangeJuiceBucket */);
  const dimension = player.dimension;
  dimension.playSound("bucket.fill_water", target.location);
  if (itemStack.amount === 1) {
    equippableComponent.setEquipment(EquipmentSlot4.Mainhand, newItemStack);
  } else {
    itemStack.amount -= 1;
    equippableComponent.setEquipment(EquipmentSlot4.Mainhand, itemStack);
    if (inventoryComponent.container.emptySlotsCount === 0) {
      dimension.spawnItem(newItemStack, target.getHeadLocation());
    } else {
      inventoryComponent.container.addItem(newItemStack);
    }
  }
  return true;
}

// scripts/__DIRECTORY/pets/SirOrangeGiraffe.ts
import { EntityIsBabyComponent as EntityIsBabyComponent16, EntityRideableComponent as EntityRideableComponent19 } from "@minecraft/server";
var SirOrangeGiraffe_default = {
  babyIdentifier: "melonbp_brp:baby_sirorangegiraffe" /* BabySirOrangeGiraffe */,
  evolveTier: 3,
  identifier: "melonbp_brp:sirorangegiraffe" /* SirOrangeGiraffe */,
  health: 100,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sirorangegiraffe.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sirorangegiraffe.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent16.componentId) === void 0,
      callback: SirOrangeGiraffeSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent19.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/CoolKidFootera.ts
import { EntityRideableComponent as EntityRideableComponent20 } from "@minecraft/server";
var CoolKidFootera_default = {
  babyIdentifier: "melonbp_brp:baby_coolkidfootera" /* BabyCoolKidFootera */,
  evolveTier: 2,
  identifier: "melonbp_brp:coolkidfootera" /* CoolKidFootera */,
  health: 80,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:coolkidfootera.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:coolkidfootera.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent20.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/utils/RandomUtils.ts
var RandomUtils = class {
  static chance(probability) {
    return Math.random() < probability;
  }
  static randomDirection() {
    return { x: 1 - Math.random() * 2, y: 1 - Math.random() * 2, z: 1 - Math.random() * 2 };
  }
};

// scripts/library/actions/GaramMaduSurvivalEffectAction.ts
import {
  BlockVolume,
  system as system6
} from "@minecraft/server";
var Config3 = {
  GrowBlockTypeIds: [
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.Air,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.ShortGrass,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftBlockTypes.Fern,
    MinecraftItemTypes.RedTulip,
    MinecraftItemTypes.PinkTulip,
    MinecraftItemTypes.WhiteTulip,
    MinecraftItemTypes.OrangeTulip,
    // MinecraftItemTypes.CrimsonRoots,
    // MinecraftItemTypes.WarpedRoots,
    MinecraftItemTypes.Dandelion,
    MinecraftItemTypes.Poppy,
    MinecraftItemTypes.BlueOrchid,
    MinecraftItemTypes.Allium,
    MinecraftItemTypes.AzureBluet,
    MinecraftItemTypes.OxeyeDaisy,
    MinecraftItemTypes.Cornflower,
    MinecraftItemTypes.LilyOfTheValley,
    MinecraftItemTypes.Lilac,
    MinecraftItemTypes.Peony
  ]
};
function* processFarmBlockJob(location) {
  const volume = new BlockVolume(
    Vector3Utils.subtract(location, Vector3Utils.scale(VECTOR3_ONE, 5)),
    Vector3Utils.add(location, Vector3Utils.scale(VECTOR3_ONE, 5))
  );
  for (const blockLocation of volume.getBlockLocationIterator()) {
    const block = location.dimension.getBlock(blockLocation);
    if (block && block.isValid) {
      if (block.hasTag("minecraft:crop")) {
        let blockPermutation = block.permutation;
        const currentGrowth = Number(blockPermutation.getState("growth"));
        if (currentGrowth < 7) {
          blockPermutation = blockPermutation.withState("growth", currentGrowth + 1);
          block.setPermutation(blockPermutation);
        }
      } else if (block.typeId === MinecraftBlockTypes.GrassBlock) {
        const blockAbove = block.above();
        if (blockAbove && blockAbove.isValid) {
          if (blockAbove.isAir) {
            const newBlockTypeId = Config3.GrowBlockTypeIds[Math.floor(Math.random() * Config3.GrowBlockTypeIds.length)];
            blockAbove.setType(newBlockTypeId);
            location.dimension.playSound("item.bone_meal.use", location);
          } else if (blockAbove.typeId === MinecraftBlockTypes.ShortGrass) {
            if (RandomUtils.chance(0.1)) {
              blockAbove.setType(MinecraftBlockTypes.TallGrass);
              location.dimension.playSound("item.bone_meal.use", location);
            }
          } else if (blockAbove.typeId === MinecraftBlockTypes.Fern) {
            if (RandomUtils.chance(0.1)) {
              blockAbove.setType(MinecraftBlockTypes.LargeFern);
              location.dimension.playSound("item.bone_meal.use", location);
            }
          }
        }
      }
    }
    yield;
  }
  location.dimension.spawnParticle(
    "minecraft:crop_growth_area_emitter",
    Vector3Utils.add(location, { y: 1 })
  );
  location.dimension.playSound("item.bone_meal.use", location);
}
async function GaramMaduSurvivalEffectAction_default({ player, target }) {
  if (PetUtils.isTamedToPlayer(target, player)) {
    system6.runJob(processFarmBlockJob({ ...target.location, dimension: target.dimension }));
    return true;
  }
  return false;
}

// scripts/__DIRECTORY/pets/GaramMadu.ts
import { EntityIsBabyComponent as EntityIsBabyComponent18, EntityRideableComponent as EntityRideableComponent21 } from "@minecraft/server";
var GaramMadu_default = {
  babyIdentifier: "melonbp_brp:baby_garammararam" /* BabyGaramMadu */,
  evolveTier: 3,
  identifier: "melonbp_brp:garammararam" /* GaramMadu */,
  health: 100,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:garammararam.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:garammararam.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent18.componentId) === void 0,
      callback: GaramMaduSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent21.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/GiraffaCelesteSurvivalEffectAction.ts
import { WeatherType as WeatherType2 } from "@minecraft/server";
var debounce6 = EntityDebounce(8e3);
async function GiraffaCelesteSurvivalEffectAction_default({ player, target }) {
  if (PetUtils.isTamedToPlayer(target, player)) {
    return debounce6(player, () => {
      const dimension = player.dimension;
      if (WeatherUtils.getWeather(dimension) === WeatherType2.Clear) {
        dimension.setWeather(WeatherType2.Rain, 20 * 120);
      } else {
        dimension.setWeather(WeatherType2.Clear);
      }
      dimension.playSound("note.chime", target.location);
      return true;
    });
  }
  return false;
}

// scripts/__DIRECTORY/pets/GiraffaCeleste.ts
import { EntityIsBabyComponent as EntityIsBabyComponent19, EntityRideableComponent as EntityRideableComponent22 } from "@minecraft/server";
var GiraffaCeleste_default = {
  babyIdentifier: "melonbp_brp:baby_giraffaceleste" /* BabyGiraffaCeleste */,
  evolveTier: 2,
  identifier: "melonbp_brp:giraffaceleste" /* GiraffaCeleste */,
  health: 80,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:giraffaceleste.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:giraffaceleste.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent19.componentId) === void 0,
      callback: GiraffaCelesteSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent22.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/GloboFruttodrilloSurvivalEffectAction.ts
import { BlockVolume as BlockVolume2 } from "@minecraft/server";
var debounce7 = EntityDebounce(20 * 30);
function createAreaVolume(center) {
  return new BlockVolume2(
    Vector3Utils.subtract(center, { x: 2.5, y: 2.5, z: 2.5 }),
    Vector3Utils.add(center, { x: 2.5, y: 2.5, z: 2.5 })
  );
}
async function GloboFruttodrilloSurvivalEffectAction_default({ player, target }) {
  if (!PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  return debounce7(target, () => {
    const areaVolume = createAreaVolume(target.location);
    let farmlandBlocks = [];
    let farmableBlocks = [];
    for (const blockLocation of areaVolume.getBlockLocationIterator()) {
      const block = target.dimension.getBlock(blockLocation);
      if (!block || !block.isValid || block.isAir) {
        continue;
      }
      const blockAbove = target.dimension.getBlock(Vector3Utils.add(blockLocation, { y: 1 }));
      if (!blockAbove || !blockAbove.isValid || !blockAbove.isAir) {
        continue;
      }
      if (block.typeId === MinecraftBlockTypes.Farmland) {
        farmlandBlocks.push(block);
      } else if (block.typeId === MinecraftBlockTypes.Dirt || block.typeId === MinecraftBlockTypes.GrassBlock) {
        farmableBlocks.push(block);
      }
    }
    if (farmlandBlocks.length > 0) {
      const farmlandBlock = farmlandBlocks[Math.floor(farmlandBlocks.length * Math.random())];
      const topBlock = target.dimension.getBlock(Vector3Utils.add(farmlandBlock, { y: 1 }));
      if (!topBlock || !topBlock.isValid) {
        return false;
      }
      const melonBlockLocation = { ...topBlock.location };
      const axis = RandomUtils.chance(0.5) ? "x" : "z";
      const direction = RandomUtils.chance(0.5) ? 1 : -1;
      let facingDirection = 0;
      if (axis === "x") {
        if (direction === 1) {
          facingDirection = 5;
        } else {
          facingDirection = 4;
        }
      } else {
        if (direction === 1) {
          facingDirection = 1;
        } else {
          facingDirection = 2;
        }
      }
      topBlock.setType(MinecraftBlockTypes.MelonStem);
      melonBlockLocation[axis] += direction;
      const melonBlock = target.dimension.getBlock(melonBlockLocation);
      if (melonBlock && melonBlock.isValid) {
        melonBlock.setType(MinecraftBlockTypes.MelonBlock);
        melonBlock.dimension.playSound("dig.grass", melonBlock);
      }
      topBlock.setPermutation(
        topBlock.permutation.withState("growth", 7).withState("facing_direction", facingDirection)
      );
      topBlock.dimension.playSound("liquid.lavapop", topBlock);
    } else {
      for (const grassBlock of farmableBlocks) {
        grassBlock.setType(MinecraftBlockTypes.Farmland);
        grassBlock.dimension.playSound("dig.grass", grassBlock);
      }
    }
    return true;
  });
}

// scripts/__DIRECTORY/pets/GloboFruttodrillo.ts
import { EntityIsBabyComponent as EntityIsBabyComponent20, EntityRideableComponent as EntityRideableComponent23 } from "@minecraft/server";
var GloboFruttodrillo_default = {
  babyIdentifier: "melonbp_brp:baby_glorbofruttodillo" /* BabyGloboFruttodrillo */,
  evolveTier: 1,
  identifier: "melonbp_brp:glorbofruttodillo" /* GloboFruttodrillo */,
  health: 40,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:glorbofruttodillo.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:glorbofruttodillo.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent20.componentId) === void 0,
      callback: GloboFruttodrilloSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent23.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/ilCactoHipopotamo.ts
import { EntityRideableComponent as EntityRideableComponent24 } from "@minecraft/server";
var ilCactoHipopotamo_default = {
  babyIdentifier: "melonbp_brp:baby_ilcactohipopotamo" /* BabyilCactoHipopotamo */,
  evolveTier: 0,
  identifier: "melonbp_brp:ilcactohipopotamo" /* ilCactoHipopotamo */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ilcactohipopotamo.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ilcactohipopotamo.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent24.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/KarkerkarKurkur.ts
import { EntityRideableComponent as EntityRideableComponent25 } from "@minecraft/server";
var KarkerkarKurkur_default = {
  babyIdentifier: "melonbp_brp:baby_karkerkarkurkur" /* BabyKarkerkarKurkur */,
  evolveTier: 3,
  identifier: "melonbp_brp:karkerkarkurkur" /* KarkerkarKurkur */,
  health: 100,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:karkerkarkurkur.combat_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent25.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/KetupatKepatPrekupatSurvivalEffectAction.ts
import {
  EntityEquippableComponent as EntityEquippableComponent5,
  EntityInventoryComponent as EntityInventoryComponent3,
  EquipmentSlot as EquipmentSlot5,
  ItemStack as ItemStack5
} from "@minecraft/server";
var Config4 = {
  RawFoodItemTypes: {
    [MinecraftItemTypes.Beef]: MinecraftItemTypes.CookedBeef,
    [MinecraftItemTypes.Chicken]: MinecraftItemTypes.CookedChicken,
    [MinecraftItemTypes.Cod]: MinecraftItemTypes.CookedCod,
    [MinecraftItemTypes.Mutton]: MinecraftItemTypes.CookedMutton,
    [MinecraftItemTypes.Porkchop]: MinecraftItemTypes.CookedPorkchop,
    [MinecraftItemTypes.Rabbit]: MinecraftItemTypes.CookedRabbit,
    [MinecraftItemTypes.Salmon]: MinecraftItemTypes.CookedSalmon
  },
  SeedItemTypes: [
    MinecraftItemTypes.MelonSeeds,
    MinecraftItemTypes.WheatSeeds,
    MinecraftItemTypes.PumpkinSeeds,
    MinecraftItemTypes.BeetrootSeeds,
    MinecraftItemTypes.TorchflowerSeeds
  ]
};
async function KetupatKepatPrekupatSurvivalEffectAction_default({ player, itemStack, target }) {
  if (!itemStack || target.typeId !== "melonbp_brp:ketupatkepat" /* KetupatKepatPrekupat */ || !PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  if (Config4.RawFoodItemTypes[itemStack.typeId]) {
    const equipableComponent = player.getComponent(EntityEquippableComponent5.componentId);
    equipableComponent.setEquipment(
      EquipmentSlot5.Mainhand,
      new ItemStack5(Config4.RawFoodItemTypes[itemStack.typeId], itemStack.amount)
    );
    player.playSound("random.fizz", { pitch: 1.4 });
  } else if (Config4.SeedItemTypes.includes(itemStack.typeId)) {
    const equipableComponent = player.getComponent(EntityEquippableComponent5.componentId);
    const inventoryComponent = player.getComponent(EntityInventoryComponent3.componentId);
    if (itemStack.amount === 1) {
      equipableComponent.setEquipment(EquipmentSlot5.Mainhand, void 0);
    } else {
      itemStack.amount -= 1;
      equipableComponent.setEquipment(EquipmentSlot5.Mainhand, itemStack);
    }
    if (inventoryComponent.container.emptySlotsCount === 0) {
      player.dimension.spawnItem(
        new ItemStack5("melonbp_brp:sticky_rice" /* SitckyRice */),
        target.getHeadLocation()
      );
      player.playSound("random.fizz", { pitch: 1.4 });
    } else {
      inventoryComponent.container.addItem(new ItemStack5("melonbp_brp:sticky_rice" /* SitckyRice */));
      player.playSound("random.fizz", { pitch: 1.4 });
    }
  }
  return true;
}

// scripts/__DIRECTORY/pets/KetupatKepatPrekupat.ts
import { EntityIsBabyComponent as EntityIsBabyComponent23, EntityRideableComponent as EntityRideableComponent26 } from "@minecraft/server";
var KetupatKepatPrekupat_default = {
  babyIdentifier: "melonbp_brp:baby_ketupatkepat" /* BabyKetupatKepatPrekupat */,
  evolveTier: 2,
  identifier: "melonbp_brp:ketupatkepat" /* KetupatKepatPrekupat */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ketupatkepat.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ketupatkepat.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent23.componentId) === void 0,
      callback: KetupatKepatPrekupatSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent26.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/LaEsokSikolaSurvivalEffectAction.ts
import { world as world7 } from "@minecraft/server";
var debounce8 = EntityDebounce(20 * 60 * 5);
async function LaEsokSikolaSurvivalEffectAction_default({ player, target }) {
  if (target.typeId === "melonbp_brp:laesoksekolah" /* LaEsokSikola */ && PetUtils.isTamedToPlayer(target, player)) {
    return debounce8(player, () => {
      const hutStructure = world7.structureManager.get("melonbp_brp:Hut");
      if (!hutStructure) {
        return false;
      }
      world7.structureManager.place(
        hutStructure,
        target.dimension,
        Vector3Utils.add(player.location, { x: -3, y: -1, z: -2 })
      );
      target.dimension.playSound("melonbp.brp.hammering_wood", player.location);
      return true;
    });
  }
  return false;
}

// scripts/__DIRECTORY/pets/LaEsokSikola.ts
import { EntityIsBabyComponent as EntityIsBabyComponent24, EntityRideableComponent as EntityRideableComponent27 } from "@minecraft/server";
var LaEsokSikola_default = {
  babyIdentifier: "melonbp_brp:baby_laesoksekolah" /* BabyLaEsokSikola */,
  evolveTier: 3,
  identifier: "melonbp_brp:laesoksekolah" /* LaEsokSikola */,
  health: 100,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:laesoksekolah.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:laesoksekolah.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent24.componentId) === void 0,
      callback: LaEsokSikolaSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent27.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/LaVacaSaturnoSaturnitaSurvivalEffectAction.ts
import {
  EntityTameableComponent as EntityTameableComponent4,
  Player as Player3
} from "@minecraft/server";
var Config5 = {
  HostileEntityQueryOptions: {
    families: ["monster"],
    maxDistance: 16
  }
};
var debounce9 = EntityDebounce(20 * 20);
async function LaVacaSaturnoSaturnitaSurvivalEffectAction_default({ player, target }) {
  const tameableComponent = target.getComponent(EntityTameableComponent4.componentId);
  if (!tameableComponent || tameableComponent.tamedToPlayer !== player) {
    return false;
  }
  return debounce9(target, () => {
    target.dimension.playSound("melonbp.brp.vaca_saturno_saturnita", target.location);
    for (const entity of target.dimension.getEntities({
      ...Config5.HostileEntityQueryOptions,
      location: target.location
    })) {
      if (entity instanceof Player3 && tameableComponent.tamedToPlayer === entity) {
        continue;
      }
      entity.addEffect(MinecraftEffectTypes.Levitation, 20 * 10, { amplifier: 0 });
    }
    for (const entity of target.dimension.getPlayers({
      location: target.location,
      maxDistance: 16
    })) {
      entity.addEffect(MinecraftEffectTypes.SlowFalling, 20 * 10, { amplifier: 1 });
    }
    return true;
  });
}

// scripts/__DIRECTORY/pets/LaVacaSaturnoSaturnita.ts
import { EntityIsBabyComponent as EntityIsBabyComponent25, EntityRideableComponent as EntityRideableComponent28 } from "@minecraft/server";
var LaVacaSaturnoSaturnita_default = {
  babyIdentifier: "melonbp_brp:baby_vacasaturnosaturnita" /* BabyLaVacaSaturnoSaturnita */,
  evolveTier: 3,
  identifier: "melonbp_brp:vacasaturnosaturnita" /* LaVacaSaturnoSaturnita */,
  health: 100,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:vacasaturnosaturnita.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:vacasaturnosaturnita.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent25.componentId) === void 0,
      callback: LaVacaSaturnoSaturnitaSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent28.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/LiriliLarila.ts
import { EntityRideableComponent as EntityRideableComponent29 } from "@minecraft/server";
var LiriliLarila_default = {
  babyIdentifier: "melonbp_brp:baby_lirililarila" /* BabyLiriliLarila */,
  evolveTier: 0,
  identifier: "melonbp_brp:lirililarila" /* LiriliLarila */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:lirililarila.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:lirililarila.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent29.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/MatteoooSurvivalEffectAction.ts
import { system as system8 } from "@minecraft/server";
var debounce10 = EntityDebounce(20 * 60 * 5);
async function MatteoooSurvivalEffectAction_default({ player, target }) {
  if (target.typeId !== "melonbp_brp:mateooo" /* Matteooo */ || !PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  return debounce10(player, () => {
    if (target.hasTag("melonbp_brp:xp_double_effect")) {
      return false;
    }
    target.addTag("melonbp_brp:xp_double_effect");
    system8.runTimeout(() => target.removeTag("melonbp_brp:xp_double_effect"), 20 * 60);
    return true;
  });
}

// scripts/__DIRECTORY/pets/Matteooo.ts
import { EntityIsBabyComponent as EntityIsBabyComponent27, EntityRideableComponent as EntityRideableComponent30 } from "@minecraft/server";
var Matteooo_default = {
  babyIdentifier: "melonbp_brp:baby_mateooo" /* BabyMatteooo */,
  evolveTier: 1,
  identifier: "melonbp_brp:mateooo" /* Matteooo */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:mateooo.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:mateooo.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent27.componentId) === void 0,
      callback: MatteoooSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent30.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/OrangutiniAnanasini.ts
import { EntityIsBabyComponent as EntityIsBabyComponent28, EntityRideableComponent as EntityRideableComponent31 } from "@minecraft/server";

// scripts/library/actions/OrangutiniAnanasiniSurvivalEffectAction.ts
import {
  BlockVolume as BlockVolume3,
  EntityTameableComponent as EntityTameableComponent5,
  system as system9
} from "@minecraft/server";
async function OrangutiniAnanasiniSurvivalEffectAction_default({ player, target }) {
  const tameableComponent = target.getComponent(EntityTameableComponent5.componentId);
  if (!tameableComponent || tameableComponent.tamedToPlayer !== player) {
    return false;
  }
  function* work() {
    const searchVolume = new BlockVolume3(
      Vector3Utils.subtract(target.location, { x: 8, y: 8, z: 8 }),
      Vector3Utils.add(target.location, { x: 8, y: 8, z: 8 })
    );
    let targetLocation;
    let distance = 1e9;
    for (const blockLocation of searchVolume.getBlockLocationIterator()) {
      yield;
      if (Vector3Utils.distance(target.location, blockLocation) > distance) {
        continue;
      }
      const block = target.dimension.getBlock(blockLocation);
      if (!block || !block.isValid || block.hasTag("wood")) {
        targetLocation = blockLocation;
        distance = Vector3Utils.distance(target.location, blockLocation);
      }
    }
    if (!targetLocation) {
      return;
    }
    for (const blockLocation of new BlockVolume3(
      Vector3Utils.subtract(targetLocation, { x: 3, y: 1, z: 3 }),
      Vector3Utils.add(targetLocation, { x: 3, y: 6, z: 3 })
    ).getBlockLocationIterator()) {
      const block = target.dimension.getBlock(blockLocation);
      if (block && block.isValid && block.typeId.includes("leaves")) {
        target.dimension.runCommand(
          `/execute positioned ${block.x} ${block.y} ${block.z} run fill ~~~ ~~~ minecraft:air destroy`
        );
      }
      yield;
    }
    target.playAnimation("animation.melonbp_brp.orangutiniananasini.attack");
  }
  player.runCommand("camerashake add @s");
  system9.runJob(work());
  return true;
}

// scripts/__DIRECTORY/pets/OrangutiniAnanasini.ts
var OrangutiniAnanasini_default = {
  babyIdentifier: "melonbp_brp:baby_orangutiniananasini" /* BabyOrangutiniAnanasini */,
  evolveTier: 2,
  identifier: "melonbp_brp:orangutiniananasini" /* OrangutiniAnanasini */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:orangutiniananasini.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:orangutiniananasini.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent28.componentId) === void 0,
      callback: OrangutiniAnanasiniSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent31.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/OrcaleroOrcala.ts
import { EntityRideableComponent as EntityRideableComponent32 } from "@minecraft/server";
var OrcaleroOrcala_default = {
  babyIdentifier: "melonbp_brp:baby_ocaleroorcala" /* BabyOrcaleroOrcala */,
  evolveTier: 2,
  identifier: "melonbp_brp:ocaleroorcala" /* OrcaleroOrcala */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ocaleroorcala.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:ocaleroorcala.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent32.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/Pakrahmatmamat.ts
import { EntityRideableComponent as EntityRideableComponent33 } from "@minecraft/server";
var Pakrahmatmamat_default = {
  babyIdentifier: "melonbp_brp:baby_pakrahmatmamat" /* BabyPakrahmatmamat */,
  evolveTier: 3,
  identifier: "melonbp_brp:pakrahmatmamat" /* Pakrahmatmamat */,
  health: 100,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:pakrahmatmamat.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:pakrahmatmamat.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent33.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/PotHotSpotSurvivalEffectAction.ts
import {
  BlockVolume as BlockVolume4,
  system as system10
} from "@minecraft/server";
async function PotHotSpotSurvivalEffectAction_default({ player, target }) {
  if (!PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  const offset = { x: 5, y: 5, z: 5 };
  function* processArea(location) {
    const volume = new BlockVolume4(
      Vector3Utils.subtract(location, offset),
      Vector3Utils.add(location, offset)
    );
    let redstoneBlocks = {};
    let weakestStrength = 0;
    for (const blockLocation of volume.getBlockLocationIterator()) {
      const block = player.dimension.getBlock(blockLocation);
      yield;
      if (!block || block.typeId !== MinecraftBlockTypes.RedstoneWire) {
        continue;
      }
      const signalStrength = Number(block.permutation.getState("redstone_signal"));
      if (signalStrength > 0) {
        continue;
      }
      redstoneBlocks[Vector3Utils.toString(block)] = signalStrength;
      if (signalStrength < weakestStrength) {
        weakestStrength = signalStrength;
      }
    }
    for (const encodedLocation in redstoneBlocks) {
      const sourceBlock = player.dimension.getBlock(Vector3Utils.fromString(encodedLocation));
      const signalStrength = redstoneBlocks[encodedLocation];
      if (signalStrength > weakestStrength) {
        continue;
      }
      let placeTorchBlock;
      for (const otherLocation of [
        Vector3Utils.add(sourceBlock, { x: 1 }),
        Vector3Utils.add(sourceBlock, { x: -1 }),
        Vector3Utils.add(sourceBlock, { z: 1 }),
        Vector3Utils.add(sourceBlock, { z: -1 })
      ]) {
        const otherBlock = player.dimension.getBlock(otherLocation);
        if (otherBlock && otherBlock.isValid && otherBlock.isAir && otherBlock.below() && otherBlock.below()?.isValid && !otherBlock.below()?.isAir) {
          placeTorchBlock = otherBlock;
          break;
        }
      }
      if (placeTorchBlock) {
        placeTorchBlock.setType(MinecraftBlockTypes.RedstoneTorch);
        const { dimension, location: location2 } = placeTorchBlock;
        dimension.playSound("tile.piston.out", location2, { pitch: 1.4 });
        dimension.playSound("place.amethyst_block", location2, { pitch: 1.1 });
        return;
      }
    }
  }
  system10.runJob(processArea(Vector3Utils.add(player.location, { x: 5, z: 5 })));
  system10.runJob(processArea(Vector3Utils.add(player.location, { x: -5, z: 5 })));
  system10.runJob(processArea(Vector3Utils.add(player.location, { x: 5, z: -5 })));
  system10.runJob(processArea(Vector3Utils.add(player.location, { x: -5, z: -5 })));
  return true;
}

// scripts/__DIRECTORY/pets/PotHotSpot.ts
import { EntityIsBabyComponent as EntityIsBabyComponent31, EntityRideableComponent as EntityRideableComponent34 } from "@minecraft/server";
var PotHotSpot_default = {
  babyIdentifier: "melonbp_brp:baby_pothotspot" /* BabyPotHotSpot */,
  evolveTier: 2,
  identifier: "melonbp_brp:pothotspot" /* PotHotSpot */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:pothotspot.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:pothotspot.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent31.componentId) === void 0,
      callback: PotHotSpotSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent34.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/RhinoToasterinoSurvivalEffectAction.ts
import {
  EntityInventoryComponent as EntityInventoryComponent4,
  ItemStack as ItemStack6
} from "@minecraft/server";
async function RhinoToasterinoSurvivalEffectAction_default({ itemStack, player, target }) {
  if (!itemStack || itemStack.typeId !== MinecraftItemTypes.Bread) {
    return false;
  }
  const inventoryComponent = player.getComponent(EntityInventoryComponent4.componentId);
  if (!inventoryComponent || !inventoryComponent.container) {
    return false;
  }
  if (player.runCommand("/clear @s minecraft:bread 0 1").successCount === 0) {
    return false;
  }
  const rewardItemStack = new ItemStack6("melonbp_brp:power_toast");
  inventoryComponent.container.addItem(rewardItemStack);
  player.playSound("vault.reject_rewarded_player", { pitch: 1.8 });
  return true;
}

// scripts/__DIRECTORY/pets/RhinoToasterino.ts
import { EntityIsBabyComponent as EntityIsBabyComponent32, EntityRideableComponent as EntityRideableComponent35 } from "@minecraft/server";
var RhinoToasterino_default = {
  babyIdentifier: "melonbp_brp:baby_rhinotoasterino" /* BabyRhinoToasterino */,
  evolveTier: 2,
  identifier: "melonbp_brp:rhinotoasterino" /* RhinoToasterino */,
  health: 80,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:rhinotoasterino.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:rhinotoasterino.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent32.componentId) === void 0,
      callback: RhinoToasterinoSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent35.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/SigmaBoy.ts
import { EntityRideableComponent as EntityRideableComponent36 } from "@minecraft/server";
var SigmaBoy_default = {
  babyIdentifier: "melonbp_brp:baby_sigmaboy" /* BabySigmaBoy */,
  evolveTier: 1,
  identifier: "melonbp_brp:sigmaboy" /* SigmaBoy */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sigmaboy.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sigmaboy.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent36.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/SneakerShark.ts
import { EntityRideableComponent as EntityRideableComponent37 } from "@minecraft/server";
var SneakerShark_default = {
  babyIdentifier: "melonbp_brp:baby_sneakershark" /* BabySneakerShark */,
  evolveTier: 0,
  identifier: "melonbp_brp:sneakershark" /* SneakerShark */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sneakershark.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:sneakershark.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent37.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/SvininoTNT.ts
import { EntityRideableComponent as EntityRideableComponent38 } from "@minecraft/server";
var SvininoTNT_default = {
  babyIdentifier: "melonbp_brp:baby_svininotnt" /* BabySvininoTNT */,
  evolveTier: 0,
  identifier: "melonbp_brp:svininotnt" /* SvininoTNT */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:svininotnt.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:svininotnt.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent38.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/TaTaTaSahur.ts
import { EntityIsBabyComponent as EntityIsBabyComponent35, EntityRideableComponent as EntityRideableComponent39 } from "@minecraft/server";
var TaTaTaSahur_default = {
  babyIdentifier: "melonbp_brp:baby_tatatatasahur" /* BabyTaTaTaSahur */,
  evolveTier: 1,
  identifier: "melonbp_brp:tatatatasahur" /* TaTaTaSahur */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:tatatatasahur.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:tatatatasahur.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent35.componentId) === void 0,
      callback: CopyrightSahurSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent39.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/TiTuTiTuTiTaBuu.ts
import { EntityRideableComponent as EntityRideableComponent40 } from "@minecraft/server";
var TiTuTiTuTiTaBuu_default = {
  babyIdentifier: "melonbp_brp:baby_titutitutitabuu" /* BabyTiTuTiTuTiTaBuu */,
  evolveTier: 1,
  identifier: "melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:titutitutitabuu.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:titutitutitabuu.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent40.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/TrenostruzzoTurbo3000.ts
import { EntityRideableComponent as EntityRideableComponent41 } from "@minecraft/server";
var TrenostruzzoTurbo3000_default = {
  babyIdentifier: "melonbp_brp:baby_trenostruzzoturbo3000" /* BabyTrenostruzzoTurbo3000 */,
  evolveTier: 3,
  identifier: "melonbp_brp:trenostruzzoturbo3000" /* TrenostruzzoTurbo3000 */,
  health: 100,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:trenostruzzoturbo3000.combat_effect",
        with: ["\n"]
      }
    ]
  },
  // survivalEffectText: {
  //   rawtext: [
  //     {
  //       translate: "pet.entity.melonbp_brp:trenostruzzoturbo3000.survival_effect",
  //       with: ["\n"],
  //     },
  //   ],
  // },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent41.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/TricTracBarabum.ts
import { EntityRideableComponent as EntityRideableComponent42 } from "@minecraft/server";
var TricTracBarabum_default = {
  babyIdentifier: "melonbp_brp:baby_trictracbarabum" /* BabyTricTracBarabum */,
  evolveTier: 0,
  identifier: "melonbp_brp:trictracbarabum" /* TricTracBarabum */,
  health: 20,
  isRideable: true,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:trictracbarabum.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:trictracbarabum.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent42.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/TripiTropiTropaTripaSurvivalEffectAction.ts
import {
  EntityDamageCause,
  EntityItemComponent,
  ItemStack as ItemStack7,
  system as system11
} from "@minecraft/server";
var DebounceFn = EntityDebounce(20 * 30);
function cookSurroundingFishItems(location) {
  const { dimension } = location;
  for (const item of dimension.getEntities({
    type: "minecraft:item",
    location,
    maxDistance: 4
  })) {
    const itemComponent = item.getComponent(EntityItemComponent.componentId);
    if (!itemComponent || !itemComponent.isValid) {
      continue;
    }
    const { typeId, amount } = itemComponent.itemStack;
    switch (typeId) {
      case MinecraftItemTypes.Cod:
        dimension.spawnItem(new ItemStack7(MinecraftItemTypes.CookedCod, amount), item.location);
        item.remove();
        break;
      case MinecraftItemTypes.Salmon:
        dimension.spawnItem(new ItemStack7(MinecraftItemTypes.CookedSalmon, amount), item.location);
        item.remove();
        break;
    }
  }
}
async function TripiTropiTropaTripaSurvivalEffectAction_default({ player, target }) {
  if (!PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  return DebounceFn(target, () => {
    let killedAnyFish = false;
    target.playAnimation("animation.melonbp_brp.tripitropitropatripa.attack");
    target.dimension.playSound("melonbp.brp.tripitropitropatripa", target.location);
    const { dimension, location } = target;
    for (const fish of dimension.getEntities({
      families: ["fish"],
      location,
      maxDistance: 10
    })) {
      killedAnyFish = true;
      fish.applyDamage(1e4, { cause: EntityDamageCause.entityAttack, damagingEntity: target });
      dimension.playSound("extinguish.candle", location);
      system11.runTimeout(() => cookSurroundingFishItems({ ...location, dimension }), 12);
    }
    return true;
  });
}

// scripts/__DIRECTORY/pets/TripiTropiTropaTripa.ts
import { EntityIsBabyComponent as EntityIsBabyComponent39, EntityRideableComponent as EntityRideableComponent43 } from "@minecraft/server";
var TripiTropiTropaTripa_default = {
  babyIdentifier: "melonbp_brp:baby_tripitropitropatripa" /* BabyTripiTropiTropaTripa */,
  evolveTier: 1,
  identifier: "melonbp_brp:tripitropitropatripa" /* TripiTropiTropaTripa */,
  health: 40,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:tripitropitropatripa.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:tripitropitropatripa.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent39.componentId) === void 0,
      callback: TripiTropiTropaTripaSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent43.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/__DIRECTORY/pets/TrulimeroTrulichina.ts
import { EntityRideableComponent as EntityRideableComponent44 } from "@minecraft/server";
var TrulimeroTrulichina_default = {
  babyIdentifier: "melonbp_brp:baby_trulimerotrulichina" /* BabyTrulimeroTrulichina */,
  evolveTier: 2,
  identifier: "melonbp_brp:trulimerotrulichina" /* TrulimeroTrulichina */,
  health: 80,
  isRideable: false,
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:trulimerotrulichina.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent44.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/actions/UdinDinDinDunMadinSurvivalEffectAction.ts
import {
  BlockVolume as BlockVolume5,
  StructureAnimationMode,
  system as system12,
  world as world8
} from "@minecraft/server";
var Config6 = {
  DefenseStructureOffset: { x: -3, z: -3 },
  DefenseStructureOptions: {
    animationMode: StructureAnimationMode.Blocks,
    animationSeconds: 1
  }
};
var DebounceFn2 = EntityDebounce(20 * 20);
function spawnDefenseStructure(entity) {
  const dimension = entity.dimension;
  const defenseStructure = world8.structureManager.get("melonbp_brp:UdinDinDinDunMadinDefense");
  if (!defenseStructure) {
    return false;
  }
  const spawnLocation = Vector3Utils.add(entity.location, Config6.DefenseStructureOffset);
  world8.structureManager.place(
    defenseStructure,
    dimension,
    spawnLocation,
    Config6.DefenseStructureOptions
  );
  dimension.playSound("melonbp.brp.hammering_wood", spawnLocation);
  const structureVolume = new BlockVolume5(
    spawnLocation,
    Vector3Utils.add(spawnLocation, defenseStructure.size)
  );
  system12.runTimeout(() => {
    for (const blockLoc of structureVolume.getBlockLocationIterator()) {
      const block = dimension.getBlock(blockLoc);
      if (!block || !block.isValid || block.typeId !== MinecraftBlockTypes.StoneStairs) {
        continue;
      }
      dimension.runCommand(
        `execute positioned ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} run fill ~~~ ~~~ minecraft:air replace`
      );
    }
  }, 20 * 12);
  return true;
}
async function UdinDinDinDunMadinSurvivalEffectAction_default({ player, target }) {
  if (!PetUtils.isTamedToPlayer(target, player)) {
    return false;
  }
  return DebounceFn2(target, () => spawnDefenseStructure(target));
}

// scripts/__DIRECTORY/pets/UdinDinDinDunMadin.ts
import { EntityIsBabyComponent as EntityIsBabyComponent41, EntityRideableComponent as EntityRideableComponent45 } from "@minecraft/server";
var UdinDinDinDunMadin_default = {
  babyIdentifier: "melonbp_brp:baby_udindindindunmadindindindun" /* BabyUdinDinDinDunMadin */,
  evolveTier: 3,
  identifier: "melonbp_brp:udindindindunmadindindindun" /* UdinDinDinDunMadin */,
  health: 100,
  isRideable: false,
  combatEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:udindindindunmadindindindun.combat_effect",
        with: ["\n"]
      }
    ]
  },
  survivalEffectText: {
    rawtext: [
      {
        translate: "pet.entity.melonbp_brp:udindindindunmadindindindun.survival_effect",
        with: ["\n"]
      }
    ]
  },
  interactActions: [
    {
      text: "Survival Effect",
      requires: (entity) => entity.getComponent(EntityIsBabyComponent41.componentId) === void 0,
      callback: UdinDinDinDunMadinSurvivalEffectAction_default
    },
    {
      text: "Ride Pet",
      requires: (entity) => entity.getComponent(EntityRideableComponent45.componentId) !== void 0,
      callback: RidePetAction_default
    },
    {
      text: "Toggle Standing",
      callback: SitPetAction_default
    }
  ]
};

// scripts/library/types/BrainrotPetDataType.ts
var BrainrotPetDataTypes = [
  BallerinaCapuccina_default,
  BallerinoLololo_default,
  BlueberrinniOctopus_default,
  BobrittoBandito_default,
  BonecaAmbalabu_default,
  BriBriBicusDicusDeBicusDeDicus_default,
  BrrBaloniLuliloli_default,
  BrrBrrPatapim_default,
  BrrEsTehPatipum_default,
  NinjaCappuccino_default,
  ChimpanziniBananini_default,
  CocofantoElefanto_default,
  EccoCavalloVirtuoso_default,
  FrigoCamello_default,
  FruliFrula_default,
  SirOrangeGiraffe_default,
  CoolKidFootera_default,
  GaramMadu_default,
  GiraffaCeleste_default,
  GloboFruttodrillo_default,
  ilCactoHipopotamo_default,
  KarkerkarKurkur_default,
  KetupatKepatPrekupat_default,
  LaEsokSikola_default,
  LaVacaSaturnoSaturnita_default,
  LiriliLarila_default,
  Matteooo_default,
  OrangutiniAnanasini_default,
  OrcaleroOrcala_default,
  Pakrahmatmamat_default,
  PotHotSpot_default,
  RhinoToasterino_default,
  SigmaBoy_default,
  SvininoTNT_default,
  TaTaTaSahur_default,
  TiTuTiTuTiTaBuu_default,
  SneakerShark_default,
  TrenostruzzoTurbo3000_default,
  TricTracBarabum_default,
  TripiTropiTropaTripa_default,
  TrulimeroTrulichina_default,
  CopyrightSahur_default,
  UdinDinDinDunMadin_default
];
var BrianrotPetDataType = class {
  static get(typeId) {
    for (const dataType of BrainrotPetDataTypes) {
      if (dataType.identifier === typeId || dataType.babyIdentifier === typeId) {
        return dataType;
      }
    }
    return void 0;
  }
  static getAll() {
    return BrainrotPetDataTypes;
  }
};

// scripts/library/forms/GuidePetIndexFormData.ts
import { PlayerPermissionLevel, system as system20 } from "@minecraft/server";
import { ActionFormData as ActionFormData7 } from "@minecraft/server-ui";

// scripts/library/forms/GuidePetIndexPageFormData.ts
import {
  EntityTameableComponent as EntityTameableComponent6,
  GameMode,
  system as system14
} from "@minecraft/server";
import { ActionFormData as ActionFormData3 } from "@minecraft/server-ui";

// scripts/library/forms/GuidePetDescriptionFormData.ts
import { system as system13 } from "@minecraft/server";
import { ActionFormData as ActionFormData2 } from "@minecraft/server-ui";
var GuidePetDescriptionFormData_default = class extends ActionFormData2 {
  constructor({ typeId, name }, combatEffectText, survivalEffectText, previousPage) {
    super();
    this.previousPage = previousPage;
    this.petData = BrianrotPetDataType.get(typeId);
    this.title(name);
    const body = {
      rawtext: []
    };
    if (combatEffectText) {
      if (this.petData.combatEffectText) {
        body.rawtext.push(this.petData.combatEffectText);
      }
    }
    if (survivalEffectText && this.petData.survivalEffectText) {
      body.rawtext.push(this.petData.survivalEffectText);
    }
    this.body(body);
    this.divider();
    this.button("Go Back");
  }
  showForm(player) {
    system13.run(async () => {
      const response = await this.show(player);
      if (!response.canceled && response.selection !== void 0) {
        this.previousPage.showForm(player);
      }
    });
  }
};

// scripts/library/utils/IndexUtils.ts
var IndexUtils_default = class {
  static {
    this.PROPERTY_KEY = "melonbp_brp:index";
  }
  static isIndexed(player, typeId) {
    const index = this.getIndex(player);
    return index[typeId] === true;
  }
  static setIndexed(player, typeId, wasRead) {
    const index = this.getIndex(player);
    if (index[typeId] !== wasRead) {
      index[typeId] = wasRead;
      this.saveIndex(player, index);
    }
  }
  static getIndex(player) {
    const data = player.getDynamicProperty(this.PROPERTY_KEY);
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return typeof parsed === "object" && parsed !== null ? parsed : {};
      } catch {
        return {};
      }
    }
    return {};
  }
  static saveIndex(player, index) {
    const hasEntries = Object.keys(index).length > 0;
    player.setDynamicProperty(this.PROPERTY_KEY, hasEntries ? JSON.stringify(index) : void 0);
  }
};

// scripts/library/forms/GuidePetIndexPageFormData.ts
var GuidePetStatsFormData = class extends ActionFormData3 {
  constructor({ typeId, name, player }) {
    super();
    const petData = BrianrotPetDataType.get(typeId);
    if (!petData) throw new Error(`Pet data not found for typeId: ${typeId}`);
    this.petData = petData;
    this.name = name;
    this.title(name);
    this.setupButtons(player);
  }
  setupButtons(player) {
    this.button(`Health: ${this.petData.health}`, "textures/ui/heart");
    this.button(`Rideable: ${this.petData.isRideable ? "YES" : "NO"}`, "textures/items/saddle");
    if (this.petData.combatEffectText) {
      this.button("[?] Special Attack", "textures/items/diamond_sword");
    }
    if (this.petData.survivalEffectText) {
      this.button("[?] Interact Ability", "textures/items/diamond");
    }
    if (player.getGameMode() === GameMode.Creative) {
      let texturePath = `textures/melonbp/brp/items/egg_`;
      texturePath += this.petData.identifier.replace("melonbp_brp:", "").replace("_", "");
      this.button("Spawn Pet", texturePath);
    }
    this.divider();
    this.button("Go Back");
  }
  showForm(player, callbackfn) {
    system14.run(async () => {
      IndexUtils_default.setIndexed(player, this.petData.identifier, true);
      const response = await this.show(player);
      if (response.canceled || response.selection === void 0) {
        return;
      }
      const selection = response.selection;
      const hasCombat = !!this.petData.combatEffectText;
      const hasSurvival = !!this.petData.survivalEffectText;
      const specialAttackIndex = 2;
      const interactAbilityIndex = hasCombat ? 3 : 2;
      const spawnIndex = (hasCombat ? 1 : 0) + (hasSurvival ? 1 : 0) + 2;
      const goBackIndex = spawnIndex + (player.getGameMode() === GameMode.Creative ? 1 : 0);
      if (hasCombat && selection === specialAttackIndex) {
        new GuidePetDescriptionFormData_default(
          { typeId: this.petData.identifier, name: this.name },
          true,
          false,
          this
        ).showForm(player);
        return;
      }
      if (hasSurvival && selection === interactAbilityIndex) {
        new GuidePetDescriptionFormData_default(
          { typeId: this.petData.identifier, name: this.name },
          false,
          true,
          this
        ).showForm(player);
        return;
      }
      if (player.getGameMode() === GameMode.Creative && selection === spawnIndex) {
        const entity = player.dimension.spawnEntity(this.petData.identifier, player.location);
        const tameableComponent = entity.getComponent(EntityTameableComponent6.componentId);
        tameableComponent.tame(player);
        return;
      }
      if (selection === goBackIndex) {
        if (callbackfn) {
          callbackfn();
        } else {
          new GuidePetIndexFormData_default(player).showForm(player);
        }
        return;
      }
      this.showForm(player);
    });
  }
};

// scripts/library/AddonSettings.ts
import { world as world10 } from "@minecraft/server";
var AddonSettings_default = class {
  static getAmbientSFXFreqency() {
    return world10.getDynamicProperty("melonbp_brp:asfxf") ?? 2;
  }
  static setAmbientSFXFreqency(value) {
    world10.setDynamicProperty("melonbp_brp:asfxf", value);
  }
};

// scripts/library/forms/SettingsActionFormData.ts
import { system as system15 } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";

// node_modules/@zambiethebully/signals/dist/index.mjs
var SignalConnection = class {
  #disconnectCallback;
  connected = true;
  constructor(disconnectCallback) {
    this.#disconnectCallback = disconnectCallback;
  }
  disconnect() {
    if (!this.connected)
      return;
    try {
      this.#disconnectCallback();
      this.connected = false;
    } catch (err) {
      console.warn(err);
    }
  }
};
var Signal = class _Signal {
  static #global = new _Signal();
  #callbacks = {};
  fire(event, ...args) {
    const callbackArray = this.#callbacks[event];
    if (!callbackArray)
      return;
    for (const callback of callbackArray) {
      if (callback === void 0)
        continue;
      try {
        callback(...args);
      } catch (err) {
        console.warn(err);
      }
    }
  }
  connect(event, callback) {
    let callbackArray = this.#callbacks[event];
    if (!callbackArray)
      callbackArray = [];
    const disconnectFn = () => {
      const index = this.#callbacks[event].indexOf(callback);
      delete this.#callbacks[event][index];
    };
    callbackArray.push(callback);
    this.#callbacks[event] = callbackArray;
    return new SignalConnection(disconnectFn);
  }
  once(event, callback) {
    const connection = this.connect(event, function(...args) {
      try {
        callback(args);
      } catch (err) {
        console.warn(err);
      }
      connection.disconnect();
    });
    return connection;
  }
  async wait(event) {
    const self = this;
    return await new Promise((resolve, reject) => {
      self.once(event, resolve);
    });
  }
  static fire(event, ...args) {
    this.#global.fire(event, ...args);
  }
  static connect(event, callback) {
    return this.#global.connect(event, callback);
  }
  static once(event, callback) {
    return this.#global.once(event, callback);
  }
  static async wait(event) {
    return this.#global.wait(event);
  }
};

// scripts/library/forms/SettingsActionFormData.ts
var SettingsActionFormData_default = class extends ModalFormData {
  constructor() {
    super();
    this.title("Add-On Settings");
    this.slider("Pet Ambience SFX", 0, 2, {
      defaultValue: AddonSettings_default.getAmbientSFXFreqency(),
      tooltip: "0 No Sounds\n1 Less Sounds\n2 More Sounds"
    });
  }
  showForm(player) {
    system15.run(async () => {
      const response = await this.show(player);
      if (response && !response.canceled && response.formValues) {
        const values = response.formValues;
        const petAmbienceFrequency = values[0];
        AddonSettings_default.setAmbientSFXFreqency(petAmbienceFrequency);
        Signal.fire("ambient_sfx_changed");
      }
    });
  }
};

// scripts/library/forms/GuideIntroAdultPetsData.ts
import { system as system16 } from "@minecraft/server";
import { ActionFormData as ActionFormData4 } from "@minecraft/server-ui";
var GuideIntroAdultPetsData_default = class extends ActionFormData4 {
  constructor() {
    super();
    this.title({ rawtext: [{ translate: "guide.pets_tutorial.title" }] });
    this.body({ rawtext: [{ translate: "guide.pets_tutorial.body", with: ["\n"] }] });
    this.divider();
    this.button({ rawtext: [{ translate: "guide.random.back.button" }] });
  }
  showForm(player) {
    system16.run(async () => {
      const response = await this.show(player);
      if (!response.canceled && response.selection !== void 0) {
        switch (response.selection) {
          case 0:
            const indexForm = new GuidePetIndexFormData_default(player);
            indexForm.showForm(player);
            break;
        }
      }
    });
  }
};

// scripts/library/forms/GuideIntroBabyPetsData.ts
import { system as system17 } from "@minecraft/server";
import { ActionFormData as ActionFormData5 } from "@minecraft/server-ui";
var GuideIntroBabyPetsData_default = class extends ActionFormData5 {
  constructor() {
    super();
    this.title({ rawtext: [{ translate: "guide.baby_tutorial.title" }] });
    this.body({ rawtext: [{ translate: "guide.baby_tutorial.body", with: ["\n"] }] });
    this.divider();
    this.button({ rawtext: [{ translate: "guide.random.back.button" }] });
  }
  showForm(player) {
    system17.run(async () => {
      const response = await this.show(player);
      if (!response.canceled && response.selection !== void 0) {
        switch (response.selection) {
          case 0:
            const indexForm = new GuidePetIndexFormData_default(player);
            indexForm.showForm(player);
            break;
        }
      }
    });
  }
};

// scripts/library/forms/GuideEggIndexPageFormData.ts
import { system as system18 } from "@minecraft/server";
import { ActionFormData as ActionFormData6 } from "@minecraft/server-ui";
var GuideEggIndexPageFormData = class extends ActionFormData6 {
  constructor({ typeId, name, player }) {
    super();
    this.eggName = typeId.replace("egg_", "");
    this.name = name;
    this.title(name);
    this.setupButtons(player);
  }
  setupButtons(player) {
    this.button("Egg Recipe", "textures/melonbp/brp/ui/recipes/" + this.eggName + "_brainrot_egg");
    this.button(
      "Evolve Stick Recipe",
      "textures/melonbp/brp/ui/recipes/" + this.eggName + "_brainrot_evolve"
    );
    this.body({ rawtext: [{ translate: "guide.egg." + this.eggName + ".body" }] });
    this.divider();
    this.button("Go Back");
  }
  showForm(player) {
    IndexUtils_default.setIndexed(player, this.eggName, true);
    system18.run(async () => {
      const response = await this.show(player);
      if (response.canceled || response.selection === void 0) {
        return;
      }
      const { selection } = response;
      if (selection === 2) {
        new GuidePetIndexFormData_default(player).showForm(player);
        return;
      }
      this.showForm(player);
    });
  }
};

// scripts/library/forms/ToggleHostileModeFormData.ts
import { system as system19, world as world12 } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";
var ToggleHostileModeFormData_default = class extends MessageFormData {
  constructor() {
    super();
    this.title("Toggle Hostile Mode");
    this.body({ rawtext: [{ translate: "book.toggle_hostile_mode_form.body" }] });
    this.button1({ rawtext: [{ translate: "book.toggle_hostile_mode_form.button1" }] });
    this.button2({ rawtext: [{ translate: "book.toggle_hostile_mode_form.button2" }] });
  }
  showForm(player) {
    system19.run(async () => {
      const response = await this.show(player);
      const { canceled, selection } = response;
      if (response && !canceled && selection !== void 0) {
        if (selection === 1) {
          world12.setDynamicProperty("melonbp_brp:hostile_mode", "all");
          world12.sendMessage({
            rawtext: [{ translate: "book.toggle_hostile_mode_form.activate.button2" }]
          });
        } else {
          world12.setDynamicProperty("melonbp_brp:hostile_mode", "normal");
          world12.sendMessage({
            rawtext: [{ translate: "book.toggle_hostile_mode_form.activate.button1" }]
          });
        }
      }
    });
  }
};

// scripts/library/forms/GuidePetIndexFormData.ts
var Config7 = {
  Blacklist: [
    "melonbp_brp:ninjacapuccino_decoy" /* NinjaCappuccinoDecoy */,
    "melonbp_brp:baby_chimpanzinibananini_banana_peel" /* BabyChimpanziniBananiniBananaPeel */,
    "melonbp_brp:trulimerotrulichina_minion" /* TrulimeroTrulichinaMinion */
  ],
  Headers: ["Common Pets", "Rare Pets", "Epic Pets", "Legendary Pets"],
  Tiers: ["common", "rare", "epic", "legendary"],
  Colors: [
    "" + CC.DARK_GRAY,
    "" + CC.DARK_AQUA,
    "" + CC.DARK_PURPLE,
    "" + CC.MATERIAL_REDSTONE
  ]
};
var GuidePetIndexFormData_default = class extends ActionFormData7 {
  constructor(player) {
    super();
    this.petSelection = [];
    this.title("Pets Guide");
    const headerPetType = BrianrotPetDataType.get("melonbp_brp:ballerinacapuchina" /* BallerinaCapuccina */);
    let texturePath = `textures/melonbp/brp/items/egg_`;
    texturePath += headerPetType?.identifier.replace("melonbp_brp:", "").replace("_", "");
    this.button("[?] Pets", texturePath);
    texturePath = `textures/melonbp/brp/items/egg_baby_`;
    texturePath += headerPetType?.identifier.replace("melonbp_brp:", "").replace("_", "");
    this.button("[?] Baby Pets", texturePath);
    if (player.playerPermissionLevel >= PlayerPermissionLevel.Operator) {
      this.button("Toggle Hostile Mode", "textures/items/diamond_sword");
    }
    this.button("Settings", "textures/ui/gear");
    this.divider();
    for (let evolveTier = 0; evolveTier < 4; evolveTier++) {
      this.header({ rawtext: [{ translate: "guide.pet_index.header." + evolveTier.toString() }] });
      const evolveTierName = Config7.Tiers[evolveTier];
      texturePath = "textures/melonbp/brp/items/" + evolveTierName + "_brainrot_egg_item";
      if (!IndexUtils_default.isIndexed(player, evolveTierName)) {
        texturePath = "textures/melonbp/brp/ui/unopened/" + evolveTierName + "_brainrot_egg_item";
      }
      this.button(
        {
          rawtext: [
            { text: Config7.Colors[evolveTier] },
            { translate: "ui.guide." + evolveTierName + "_egg.button" }
          ]
        },
        texturePath
      );
      this.petSelection.push({
        typeId: "egg_" + evolveTierName,
        name: {
          rawtext: [
            { text: Config7.Colors[evolveTier] },
            { translate: "ui.guide." + evolveTierName + "_egg.button" }
          ]
        }
      });
      for (const [_, value] of Object.entries(BrainrotPetTypes)) {
        if (value.includes("baby")) {
          continue;
        }
        const data = BrianrotPetDataType.get(value);
        if (!data || data.evolveTier !== evolveTier) {
          continue;
        }
        texturePath = `textures/melonbp/brp/items/egg_`;
        texturePath += value.replace("melonbp_brp:", "").replace("_", "");
        if (!IndexUtils_default.isIndexed(player, data.identifier)) {
          texturePath = `textures/melonbp/brp/ui/unopened/`;
          texturePath += value.replace("melonbp_brp:", "").replace("_", "");
        }
        this.button(
          {
            rawtext: [
              { text: Config7.Colors[evolveTier] },
              { translate: "entity." + value + ".name" }
              // { text: "\n" + "Tier " + (1 + evolveTier).toString() + " Brainrot Pet" },
            ]
          },
          texturePath
        );
        this.petSelection.push({
          typeId: value,
          name: {
            rawtext: [
              { text: Config7.Colors[evolveTier] },
              { translate: "entity." + value + ".name" }
            ]
          }
        });
      }
    }
  }
  showForm(player) {
    system20.run(async () => {
      let offset = 3;
      if (player.playerPermissionLevel >= PlayerPermissionLevel.Operator) {
        offset = 4;
      }
      const response = await this.show(player);
      if (!response.canceled && response.selection !== void 0) {
        if (response.selection === 0) {
          const formData2 = new GuideIntroAdultPetsData_default();
          formData2.showForm(player);
          return;
        } else if (response.selection === 1) {
          const formData2 = new GuideIntroBabyPetsData_default();
          formData2.showForm(player);
          return;
        } else if (response.selection === 2) {
          if (player.playerPermissionLevel >= PlayerPermissionLevel.Operator) {
            const formData2 = new ToggleHostileModeFormData_default();
            formData2.showForm(player);
          } else {
            const formData2 = new SettingsActionFormData_default();
            formData2.showForm(player);
          }
          return;
        } else if (response.selection === 3 && player.playerPermissionLevel >= PlayerPermissionLevel.Operator) {
          const formData2 = new SettingsActionFormData_default();
          formData2.showForm(player);
          return;
        }
        if (this.petSelection[response.selection - offset].typeId.includes("egg")) {
          const formData2 = new GuideEggIndexPageFormData({
            ...this.petSelection[response.selection - offset],
            player
          });
          formData2.showForm(player);
          return;
        }
        const formData = new GuidePetStatsFormData({
          ...this.petSelection[response.selection - offset],
          player
        });
        formData.showForm(player);
      }
    });
  }
};

// scripts/library/components/items/GuideBookItemComponent.ts
var GuideBookItemComponent_default = class {
  static {
    this.componentId = "melonbp_brp:guide_book";
  }
  onUse({ source }) {
    const formData = new GuidePetIndexFormData_default(source);
    formData.showForm(source);
  }
};

// scripts/library/components/items/LightRemoverItemComponent.ts
import {
  BlockVolume as BlockVolume6,
  system as system21
} from "@minecraft/server";
var Config8 = {
  LightBlockTypeIds: [
    MinecraftBlockTypes.LightBlock0,
    MinecraftBlockTypes.LightBlock1,
    MinecraftBlockTypes.LightBlock2,
    MinecraftBlockTypes.LightBlock3,
    MinecraftBlockTypes.LightBlock4,
    MinecraftBlockTypes.LightBlock5,
    MinecraftBlockTypes.LightBlock6,
    MinecraftBlockTypes.LightBlock7,
    MinecraftBlockTypes.LightBlock8,
    MinecraftBlockTypes.LightBlock9,
    MinecraftBlockTypes.LightBlock10,
    MinecraftBlockTypes.LightBlock11,
    MinecraftBlockTypes.LightBlock12,
    MinecraftBlockTypes.LightBlock13,
    MinecraftBlockTypes.LightBlock14,
    MinecraftBlockTypes.LightBlock15
  ]
};
function* removeLightBlocks(location, cb) {
  const volume = new BlockVolume6(
    Vector3Utils.subtract(location, Vector3Utils.scale(VECTOR3_ONE, 5)),
    Vector3Utils.add(location, Vector3Utils.scale(VECTOR3_ONE, 5))
  );
  let removeCounter = 0;
  for (const blockLocation of volume.getBlockLocationIterator()) {
    const block = location.dimension.getBlock(blockLocation);
    if (block && block.isValid && Config8.LightBlockTypeIds.includes(block.typeId)) {
      block.setType(MinecraftBlockTypes.Air);
      removeCounter += 1;
    }
    yield;
  }
  if (removeCounter > 0) {
    cb(removeCounter);
  }
}
var LightRemoverItemComponent = class {
  static {
    this.componentId = "melonbp_brp:light_remover";
  }
  onUse({ source }) {
    system21.runJob(
      removeLightBlocks({ ...source.location, dimension: source.dimension }, (removeCount) => {
        source.sendMessage({
          rawtext: [
            { text: CC.GOLD + "" },
            { translate: "pet.util.light_remover_item.notify", with: [removeCount.toString()] }
          ]
        });
      })
    );
  }
};

// scripts/library/components/items/PowerToastItemComponent.ts
var PowerToastItemComponent = class {
  static {
    this.componentId = "melonbp_brp:power_toast";
  }
  onConsume({ source, itemStack }, { params }) {
    source.addEffect(MinecraftEffectTypes.Regeneration, 100);
  }
};

// scripts/core/CustomItemComponentRegistryScript.ts
import { system as system22 } from "@minecraft/server";
system22.beforeEvents.startup.subscribe(({ itemComponentRegistry }) => {
  itemComponentRegistry.registerCustomComponent(
    PowerToastItemComponent.componentId,
    new PowerToastItemComponent()
  );
  itemComponentRegistry.registerCustomComponent(
    BucketOfOrangeItemComponent.componentId,
    new BucketOfOrangeItemComponent()
  );
  itemComponentRegistry.registerCustomComponent(
    LightRemoverItemComponent.componentId,
    new LightRemoverItemComponent()
  );
  itemComponentRegistry.registerCustomComponent(
    FoodEffectsItemComponent_default.componentId,
    new FoodEffectsItemComponent_default()
  );
  itemComponentRegistry.registerCustomComponent(
    BrainrotEvolveStickItemComponent.componentId,
    new BrainrotEvolveStickItemComponent()
  );
  itemComponentRegistry.registerCustomComponent(
    GuideBookItemComponent_default.componentId,
    new GuideBookItemComponent_default()
  );
});

// scripts/core/RideableEntityClimbHandlerScript.ts
import {
  EntityRideableComponent as EntityRideableComponent46,
  EntityRidingComponent as EntityRidingComponent2,
  EntityTypeFamilyComponent,
  system as system23,
  world as world14
} from "@minecraft/server";
var Config9 = {
  Intervals: 1,
  StuckThreshold: 0.09,
  ImpulseStrength: 0.45
};
system23.runInterval(() => {
  for (const player of world14.getAllPlayers()) {
    const ridingComponent = player.getComponent(EntityRidingComponent2.componentId);
    const ridingEntity = ridingComponent?.entityRidingOn;
    const inputVector = player.inputInfo.getMovementVector();
    if (ridingEntity && ridingEntity.isOnGround && inputVector.y == 1) {
      const familyComponent = ridingEntity.getComponent(EntityTypeFamilyComponent.componentId);
      if (!familyComponent?.hasTypeFamily("melonbp_brp.pet")) {
        continue;
      }
      const magnitude = Vector3Utils.magnitude(ridingEntity.getVelocity());
      if (magnitude <= Config9.StuckThreshold) {
        ridingEntity.applyImpulse(Vector3Utils.scale(VECTOR3_UP, Config9.ImpulseStrength));
      }
    }
  }
}, Config9.Intervals);
system23.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({ families: ["melonbp_brp.pet"] })) {
    if (entity.typeId.includes("baby")) {
      continue;
    }
    const rideableComponent = entity.getComponent(EntityRideableComponent46.componentId);
    if (!rideableComponent) {
      continue;
    }
    if (rideableComponent.getRiders().length === 0) {
      entity.triggerEvent("melonbp:start_riding_behavior");
    } else {
      entity.triggerEvent("melonbp:stop_riding_behavior");
    }
  }
}, 24);

// scripts/core/WeatherUtilityScript.ts
import { system as system24, world as world15 } from "@minecraft/server";
system24.beforeEvents.startup.subscribe(() => {
  world15.afterEvents.weatherChange.subscribe(({ dimension, newWeather }) => {
    world15.setDynamicProperty(`melonbp_brp:weather_status.minecraft:${dimension}`, newWeather);
  });
});

// scripts/game/AmbientSFXHandlerScript.ts
import { EntityIsBabyComponent as EntityIsBabyComponent42, system as system25, world as world16 } from "@minecraft/server";
var Config10 = {
  entity_sounds: {
    ["melonbp_brp:ballerinacapuchina" /* BallerinaCapuccina */]: "melonbp.brp.ballerinacapuchina",
    ["melonbp_brp:ballerinolololo" /* BallerinoLololo */]: "melonbp.brp.ballerinolololo",
    ["melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */]: "melonbp.brp.berrrestehpatipum",
    ["melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */]: "melonbp.brp.blueberrinnioctopus",
    ["melonbp_brp:coolkidfootera" /* CoolKidFootera */]: "melonbp.brp.coolkidfootera",
    ["melonbp_brp:vacasaturnosaturnita" /* LaVacaSaturnoSaturnita */]: "melonbp.brp.vaca_saturno_saturnita",
    ["melonbp_brp:udindindindunmadindindindun" /* UdinDinDinDunMadin */]: "melonbp.brp.udindindindun",
    ["melonbp_brp:copyrightsahur" /* CopyrightSahur */]: "melonbp.brp.copyrightsahur",
    ["melonbp_brp:trulimerotrulichina" /* TrulimeroTrulichina */]: "melonbp.brp.trulimerotrulichina",
    ["melonbp_brp:tripitropitropatripa" /* TripiTropiTropaTripa */]: "melonbp.brp.tripitropitropatripa",
    ["melonbp_brp:trictracbarabum" /* TricTracBarabum */]: "melonbp.brp.trictracbarabum",
    ["melonbp_brp:trenostruzzoturbo3000" /* TrenostruzzoTurbo3000 */]: "melonbp.brp.trenostruzzoturbo3000",
    ["melonbp_brp:sneakershark" /* SneakerShark */]: "melonbp.brp.sneakershark",
    ["melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */]: "melonbp.brp.titutitutitabuu",
    ["melonbp_brp:tatatatasahur" /* TaTaTaSahur */]: "melonbp.brp.tatatatasahur",
    ["melonbp_brp:svininotnt" /* SvininoTNT */]: "melonbp.brp.svininotnt",
    ["melonbp_brp:sigmaboy" /* SigmaBoy */]: "melonbp.brp.sigmaboy",
    ["melonbp_brp:rhinotoasterino" /* RhinoToasterino */]: "melonbp.brp.rhinotoasterino",
    ["melonbp_brp:pothotspot" /* PotHotSpot */]: "melonbp.brp.pothotspot",
    ["melonbp_brp:pakrahmatmamat" /* Pakrahmatmamat */]: "melonbp.brp.pakrahmatmamat",
    ["melonbp_brp:ocaleroorcala" /* OrcaleroOrcala */]: "melonbp.brp.orcaleroorcala",
    ["melonbp_brp:orangutiniananasini" /* OrangutiniAnanasini */]: "melonbp.brp.orangutiniananasini",
    ["melonbp_brp:mateooo" /* Matteooo */]: "melonbp.brp.mateooo",
    ["melonbp_brp:lirililarila" /* LiriliLarila */]: "melonbp.brp.lirililarila",
    ["melonbp_brp:laesoksekolah" /* LaEsokSikola */]: "melonbp.brp.laesoksekolah",
    ["melonbp_brp:ketupatkepat" /* KetupatKepatPrekupat */]: "melonbp.brp.ketupatkepat",
    ["melonbp_brp:karkerkarkurkur" /* KarkerkarKurkur */]: "melonbp.brp.karkerkarkurkur",
    ["melonbp_brp:ilcactohipopotamo" /* ilCactoHipopotamo */]: "melonbp.brp.ilcactohipopotamo",
    ["melonbp_brp:glorbofruttodillo" /* GloboFruttodrillo */]: "melonbp.brp.glorbo",
    ["melonbp_brp:giraffaceleste" /* GiraffaCeleste */]: "melonbp.brp.giraffaceleste",
    ["melonbp_brp:garammararam" /* GaramMadu */]: "melonbp.brp.garanmaranam",
    ["melonbp_brp:sirorangegiraffe" /* SirOrangeGiraffe */]: "melonbp.brp.sirorangegiraffe",
    ["melonbp_brp:frulifrula" /* FruliFrula */]: "melonbp.brp.frulifrula",
    ["melonbp_brp:frigocammello" /* FrigoCamello */]: "melonbp.brp.frigocamelo",
    ["melonbp_brp:eccocavallovirtuoso" /* EccoCavalloVirtuoso */]: "melonbp.brp.ecocavalovirtuoso",
    ["melonbp_brp:cocofantoelefanto" /* CocofantoElefanto */]: "melonbp.brp.cocofantoelefanto",
    ["melonbp_brp:chimpanzinibananini" /* ChimpanziniBananini */]: "melonbp.brp.shimpanzinibananini",
    ["melonbp_brp:ninjacapuccino" /* NinjaCappuccino */]: "melonbp.brp.ninjacapuccino",
    ["melonbp_brp:burbaloniluliloli" /* BrrBaloniLuliloli */]: "melonbp.brp.burbaloni_luliloli",
    ["melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */]: "melonbp.brp.brbrpatapin",
    ["melonbp_brp:bribribicusdicusdebicusdedicus" /* BriBriBicusDicusDeBicusDeDicus */]: "melonbp.brp.bribribricusdicusdedicus",
    ["melonbp_brp:bonecaambalabu" /* BonecaAmbalabu */]: "melonbp.brp.bonecaambalabu",
    ["melonbp_brp:bobritobandito" /* BobrittoBandito */]: "melonbp.brp.bobritobondito"
  }
};
function getRandomAmbientTime(ambientSFX) {
  let max = 32;
  let min = 14;
  if (ambientSFX === 1) {
    max = 120;
    min = 60;
  } else if (ambientSFX === 0) {
    return -1;
  }
  return Math.ceil(Math.random() * (max - min) + min);
}
Signal.connect("ambient_sfx_changed", () => {
  const ambientSFXFreqency = AddonSettings_default.getAmbientSFXFreqency();
  for (const entity of EntityUtils.getAllEntitiesIterator({
    families: ["melonbp_brp.pet"]
  })) {
    let currentTime = getRandomAmbientTime(ambientSFXFreqency);
    currentTime = Math.ceil(currentTime * Math.random());
    entity.setDynamicProperty("melonbp_brp:ambient_sound", currentTime);
  }
});
system25.beforeEvents.startup.subscribe(() => {
  world16.afterEvents.entityHurt.subscribe(({ hurtEntity: entity }) => {
    const ambientSFXFreqency = AddonSettings_default.getAmbientSFXFreqency();
    if (ambientSFXFreqency === 0) {
      return;
    }
    let pitch = Math.random() * (1.2 - 1) + 1;
    if (entity.hasComponent(EntityIsBabyComponent42.componentId)) {
      pitch = Math.random() * (2.2 - 1.8) + 1.8;
    }
    const petData = BrianrotPetDataType.get(entity.typeId);
    if (petData === void 0) {
      return;
    }
    const soundId = Config10.entity_sounds[petData.identifier];
    if (soundId === void 0) {
      return;
    }
    entity.dimension.playSound(soundId, entity.location, {
      pitch
    });
  });
  world16.afterEvents.entityDie.subscribe(({ deadEntity: entity }) => {
    const ambientSFXFreqency = AddonSettings_default.getAmbientSFXFreqency();
    if (ambientSFXFreqency === 0) {
      return;
    }
    let pitch = 0.9;
    if (entity.hasComponent(EntityIsBabyComponent42.componentId)) {
      pitch = 1.45;
    }
    const petData = BrianrotPetDataType.get(entity.typeId);
    if (petData === void 0) {
      return;
    }
    const soundId = Config10.entity_sounds[petData.identifier];
    if (soundId === void 0) {
      return;
    }
    entity.dimension.playSound(soundId, entity.location, {
      pitch
    });
  });
});
system25.runInterval(() => {
  const ambientSFXFreqency = AddonSettings_default.getAmbientSFXFreqency();
  if (ambientSFXFreqency === 0) {
    return;
  }
  for (const entity of EntityUtils.getAllEntitiesIterator({
    families: ["melonbp_brp.pet"]
  })) {
    let currentTime = entity.getDynamicProperty("melonbp_brp:ambient_sound");
    if (currentTime === 0 || currentTime === void 0 || typeof currentTime !== "number") {
      let pitch = Math.random() * (1.2 - 1) + 1;
      if (entity.hasComponent(EntityIsBabyComponent42.componentId)) {
        pitch = Math.random() * (2.2 - 1.8) + 1.8;
      }
      const petData = BrianrotPetDataType.get(entity.typeId);
      if (petData === void 0) {
        continue;
      }
      const soundId = Config10.entity_sounds[petData.identifier];
      if (soundId === void 0) {
        continue;
      }
      entity.dimension.playSound(soundId, entity.location, {
        pitch
      });
      currentTime = getRandomAmbientTime(ambientSFXFreqency);
      entity.setDynamicProperty("melonbp_brp:ambient_sound", currentTime);
      continue;
    }
    if (currentTime > 0) {
      currentTime -= 1;
      entity.setDynamicProperty("melonbp_brp:ambient_sound", currentTime);
    }
  }
}, 20);

// scripts/library/PetNametagTable.ts
var PetNametagTable = {
  ["melonbp_brp:baby_ballerinacapuchina" /* BabyBallerinaCapuccina */]: "Baby Ballerina Capuccina",
  ["melonbp_brp:baby_ballerinolololo" /* BabyBallerinoLololo */]: "Baby Ballerino Lololo",
  ["melonbp_brp:baby_blueberrinnioctopus" /* BabyBlueberrinniOctopus */]: "Baby Blueberrinni Octopus",
  ["melonbp_brp:baby_bobritobandito" /* BabyBobrittoBandito */]: "Baby Bobritto Bandito",
  ["melonbp_brp:baby_bonecaambalabu" /* BabyBonecaAmbalabu */]: "Baby Boneca Ambalabu",
  ["melonbp_brp:baby_burbaloniluliloli" /* BabyBrrBaloniLuliloli */]: "Baby BrrBaloni Luliloli",
  ["melonbp_brp:baby_bribribicusdicusdebicusdedicus" /* BabyBriBriBicusDicusDeBicusDeDicus */]: "Baby Bri bri bicus dicus de bicus de dicus",
  ["melonbp_brp:baby_brrbrrpatapin" /* BabyBrrBrrPatapim */]: "Baby Brr Brr Patapim",
  ["melonbp_brp:baby_berrrestehpatipum" /* BabyBrrEsTehPatipum */]: "Baby Brr Es Teh Patipum",
  ["melonbp_brp:baby_ninjacapuccino" /* BabyNinjaCapuccino */]: "Baby Ninja Cappuccino ",
  ["melonbp_brp:baby_chimpanzinibananini" /* BabyChimpanziniBananini */]: "Baby Chimpanzini Bananini",
  ["melonbp_brp:baby_cocofantoelefanto" /* BabyCocofantoElefanto */]: "Baby Cocofanto Elefanto",
  ["melonbp_brp:baby_eccocavallovirtuoso" /* BabyEccoCavalloVirtuoso */]: "Baby Ecco Cavallo Virtuoso",
  ["melonbp_brp:baby_frigocammello" /* BabyFrigoCamello */]: "Baby Frigo Camello",
  ["melonbp_brp:baby_frulifrula" /* BabyFruliFrula */]: "Baby Fruli Frula",
  ["melonbp_brp:baby_coolkidfootera" /* BabyCoolKidFootera */]: "Baby Cool Kid Footera",
  ["melonbp_brp:baby_sirorangegiraffe" /* BabySirOrangeGiraffe */]: "Baby Sir Orange Giraffe",
  ["melonbp_brp:baby_garammararam" /* BabyGaramMadu */]: "Baby Garam Madu",
  ["melonbp_brp:baby_giraffaceleste" /* BabyGiraffaCeleste */]: "Baby Giraffa Celeste",
  ["melonbp_brp:baby_glorbofruttodillo" /* BabyGloboFruttodrillo */]: "Baby Globo Fruttodrillo",
  ["melonbp_brp:baby_ilcactohipopotamo" /* BabyilCactoHipopotamo */]: "Baby il Cacto Hipopotamo",
  ["melonbp_brp:baby_karkerkarkurkur" /* BabyKarkerkarKurkur */]: "Baby Karkerkar Kurkur",
  ["melonbp_brp:baby_ketupatkepat" /* BabyKetupatKepatPrekupat */]: "Baby Ketupat Kepat Prekupat",
  ["melonbp_brp:baby_laesoksekolah" /* BabyLaEsokSikola */]: "Baby La Esok Sikola",
  ["melonbp_brp:baby_vacasaturnosaturnita" /* BabyLaVacaSaturnoSaturnita */]: "Baby La Vaca Saturno Saturnita",
  ["melonbp_brp:baby_lirililarila" /* BabyLiriliLarila */]: "Baby Lirili Larila",
  ["melonbp_brp:baby_mateooo" /* BabyMatteooo */]: "Baby Matteooo",
  ["melonbp_brp:baby_orangutiniananasini" /* BabyOrangutiniAnanasini */]: "Baby Orangutini Ananasini",
  ["melonbp_brp:baby_ocaleroorcala" /* BabyOrcaleroOrcala */]: "Baby Orcalero Orcala",
  ["melonbp_brp:baby_pakrahmatmamat" /* BabyPakrahmatmamat */]: "Baby Pakrahmatmamat",
  ["melonbp_brp:baby_pothotspot" /* BabyPotHotSpot */]: "Baby Pot Hot Spot",
  ["melonbp_brp:baby_rhinotoasterino" /* BabyRhinoToasterino */]: "Baby Rhino Toasterino",
  ["melonbp_brp:baby_sigmaboy" /* BabySigmaBoy */]: "Baby Sigma Boy",
  ["melonbp_brp:baby_svininotnt" /* BabySvininoTNT */]: "Baby Svinino TNT",
  ["melonbp_brp:baby_tatatatasahur" /* BabyTaTaTaSahur */]: "Baby Ta Ta Ta Sahur",
  ["melonbp_brp:baby_titutitutitabuu" /* BabyTiTuTiTuTiTaBuu */]: "Baby Ti Tu Ti Tu Ti Ta Buu",
  ["melonbp_brp:baby_sneakershark" /* BabySneakerShark */]: "Baby Sneaker Shark",
  ["melonbp_brp:baby_trenostruzzoturbo3000" /* BabyTrenostruzzoTurbo3000 */]: "Baby Trenostruzzo Turbo 3000",
  ["melonbp_brp:baby_trictracbarabum" /* BabyTricTracBarabum */]: "Baby Tric Trac Barabum",
  ["melonbp_brp:baby_tripitropitropatripa" /* BabyTripiTropiTropaTripa */]: "Baby Tripi Tropi Tropa Tripa",
  ["melonbp_brp:baby_trulimerotrulichina" /* BabyTrulimeroTrulichina */]: "Baby Trulimero Trulichina",
  ["melonbp_brp:baby_copyrightsahur" /* BabyCopyrightSahur */]: "Baby Copyright Sahur",
  ["melonbp_brp:baby_udindindindunmadindindindun" /* BabyUdinDinDinDunMadin */]: "Baby Udin Din Din Dun Madin",
  ["melonbp_brp:ballerinacapuchina" /* BallerinaCapuccina */]: "Ballerina Capuccina",
  ["melonbp_brp:ballerinolololo" /* BallerinoLololo */]: "Ballerino Lololo",
  ["melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */]: "Blueberrinni Octopus",
  ["melonbp_brp:bobritobandito" /* BobrittoBandito */]: "Bobritto Bandito",
  ["melonbp_brp:bonecaambalabu" /* BonecaAmbalabu */]: "Boneca Ambalabu",
  ["melonbp_brp:burbaloniluliloli" /* BrrBaloniLuliloli */]: "BrrBaloni Luliloli",
  ["melonbp_brp:bribribicusdicusdebicusdedicus" /* BriBriBicusDicusDeBicusDeDicus */]: "Bri bri bicus dicus de bicus de dicus",
  ["melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */]: "Brr Brr Patapim",
  ["melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */]: "Brr Es Teh Patipum",
  ["melonbp_brp:ninjacapuccino" /* NinjaCappuccino */]: "Ninja Cappuccino ",
  ["melonbp_brp:ninjacapuccino_decoy" /* NinjaCappuccinoDecoy */]: "Ninja Cappuccino ",
  ["melonbp_brp:chimpanzinibananini" /* ChimpanziniBananini */]: "Chimpanzini Bananini",
  ["melonbp_brp:cocofantoelefanto" /* CocofantoElefanto */]: "Cocofanto Elefanto",
  ["melonbp_brp:eccocavallovirtuoso" /* EccoCavalloVirtuoso */]: "Ecco Cavallo Virtuoso",
  ["melonbp_brp:frigocammello" /* FrigoCamello */]: "Frigo Camello",
  ["melonbp_brp:frulifrula" /* FruliFrula */]: "Fruli Frula",
  ["melonbp_brp:coolkidfootera" /* CoolKidFootera */]: "Cool Kid Footera",
  ["melonbp_brp:sirorangegiraffe" /* SirOrangeGiraffe */]: "Sir Orange Giraffe",
  ["melonbp_brp:garammararam" /* GaramMadu */]: "Garam Madu",
  ["melonbp_brp:giraffaceleste" /* GiraffaCeleste */]: "Giraffa Celeste",
  ["melonbp_brp:glorbofruttodillo" /* GloboFruttodrillo */]: "Globo Fruttodrillo",
  ["melonbp_brp:ilcactohipopotamo" /* ilCactoHipopotamo */]: "il Cacto Hipopotamo",
  ["melonbp_brp:karkerkarkurkur" /* KarkerkarKurkur */]: "Karkerkar Kurkur",
  ["melonbp_brp:ketupatkepat" /* KetupatKepatPrekupat */]: "Ketupat Kepat Prekupat",
  ["melonbp_brp:laesoksekolah" /* LaEsokSikola */]: "La Esok Sikola",
  ["melonbp_brp:vacasaturnosaturnita" /* LaVacaSaturnoSaturnita */]: "La Vaca Saturno Saturnita",
  ["melonbp_brp:lirililarila" /* LiriliLarila */]: "Lirili Larila",
  ["melonbp_brp:mateooo" /* Matteooo */]: "Matteooo",
  ["melonbp_brp:orangutiniananasini" /* OrangutiniAnanasini */]: "Orangutini Ananasini",
  ["melonbp_brp:ocaleroorcala" /* OrcaleroOrcala */]: "Orcalero Orcala",
  ["melonbp_brp:pakrahmatmamat" /* Pakrahmatmamat */]: "Pakrahmatmamat",
  ["melonbp_brp:pothotspot" /* PotHotSpot */]: "Pot Hot Spot",
  ["melonbp_brp:rhinotoasterino" /* RhinoToasterino */]: "Rhino Toasterino",
  ["melonbp_brp:sigmaboy" /* SigmaBoy */]: "Sigma Boy",
  ["melonbp_brp:svininotnt" /* SvininoTNT */]: "Svinino TNT",
  ["melonbp_brp:tatatatasahur" /* TaTaTaSahur */]: "Ta Ta Ta Sahur",
  ["melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */]: "Ti Tu Ti Tu Ti Ta Buu",
  ["melonbp_brp:sneakershark" /* SneakerShark */]: "Sneaker Shark",
  ["melonbp_brp:trenostruzzoturbo3000" /* TrenostruzzoTurbo3000 */]: "Trenostruzzo Turbo 3000",
  ["melonbp_brp:trictracbarabum" /* TricTracBarabum */]: "Tric Trac Barabum",
  ["melonbp_brp:tripitropitropatripa" /* TripiTropiTropaTripa */]: "Tripi Tropi Tropa Tripa",
  ["melonbp_brp:trulimerotrulichina" /* TrulimeroTrulichina */]: "Trulimero Trulichina",
  ["melonbp_brp:copyrightsahur" /* CopyrightSahur */]: "Copyright Sahur",
  ["melonbp_brp:udindindindunmadindindindun" /* UdinDinDinDunMadin */]: "Udin Din Din Dun Madin"
};

// scripts/game/AutoTamePetScript.ts
import {
  EntityInitializationCause as EntityInitializationCause2,
  EntityTameableComponent as EntityTameableComponent7,
  EntityTypeFamilyComponent as EntityTypeFamilyComponent2,
  world as world17
} from "@minecraft/server";
world17.afterEvents.worldLoad.subscribe(() => {
  world17.afterEvents.entitySpawn.subscribe(({ entity, cause }) => {
    if (!entity || !entity.isValid || cause !== EntityInitializationCause2.Spawned) {
      return;
    }
    const familyComponent = entity.getComponent(EntityTypeFamilyComponent2.componentId);
    if (!familyComponent || !familyComponent.hasTypeFamily("melonbp_brp.pet")) {
      return;
    }
    const tameableComponent = entity.getComponent(EntityTameableComponent7.componentId);
    if (!tameableComponent) {
      return;
    }
    const player = entity.dimension.getPlayers({ location: entity.location, closest: 1 })[0];
    if (!player || !player.isValid) {
      return;
    }
    tameableComponent.tame(player);
    const customName = PetNametagTable[entity.typeId];
    if (customName) {
      entity.nameTag = customName;
    }
  });
});

// scripts/game/BabyToAdultScript.ts
import { system as system26 } from "@minecraft/server";
system26.beforeEvents.startup.subscribe(() => {
  system26.afterEvents.scriptEventReceive.subscribe(({ sourceEntity, id }) => {
    if (!sourceEntity || id !== "melonbp_brp:grow_up") {
      return;
    }
    sourceEntity.nameTag = sourceEntity.nameTag.replace("Baby ", "");
    sourceEntity.triggerEvent("melonbp_brp:grow_up");
  });
});

// scripts/game/EggHatchingScript.ts
import {
  EntityTameableComponent as EntityTameableComponent8,
  EntityTypeFamilyComponent as EntityTypeFamilyComponent3,
  MolangVariableMap,
  Player as Player12,
  system as system27,
  world as world19
} from "@minecraft/server";
var Config11 = {
  EggTypeIds: [
    "melonbp_brp:common_egg",
    "melonbp_brp:rare_egg",
    "melonbp_brp:epic_egg",
    "melonbp_brp:legendary_egg"
  ],
  Nametags: {
    ["melonbp_brp:common_egg"]: CC.GREEN + "Common Egg",
    ["melonbp_brp:rare_egg"]: CC.AQUA + "Rare Egg",
    ["melonbp_brp:epic_egg"]: CC.LIGHT_PURPLE + "Epic Egg",
    ["melonbp_brp:legendary_egg"]: CC.RED + "Legendary Egg"
  }
};
var _lock = {};
function randomPetDataType(targetTier = 0) {
  const weightedTable = {};
  let totalWeight = 0;
  for (const petData of BrianrotPetDataType.getAll()) {
    if (petData.evolveTier !== targetTier) {
      continue;
    }
    const weight = 1 / (petData.evolveTier + 1) ** 2;
    weightedTable[petData.babyIdentifier] = weight;
    totalWeight += weight;
  }
  const randomValue = Math.random();
  let cumulativeWeight = 0;
  for (const [key, weight] of Object.entries(weightedTable)) {
    cumulativeWeight += weight / totalWeight;
    if (cumulativeWeight > randomValue) {
      return key;
    }
  }
  return "melonbp_brp:baby_ballerinacapuchina" /* BabyBallerinaCapuccina */;
}
function spawnRandomPet(typeId, location, owner) {
  const { dimension } = location;
  const entity = dimension.spawnEntity(
    randomPetDataType(Config11.EggTypeIds.indexOf(typeId) ?? 0),
    location
  );
  const tameableComponent = entity.getComponent(EntityTameableComponent8.componentId);
  tameableComponent.tame(owner);
  return entity;
}
function hatchEgg(entity, player) {
  if (_lock[entity.id]) {
    return;
  }
  _lock[entity.id] = true;
  entity.dimension.playSound("fall.egg", entity.location, { pitch: 1.2 });
  entity.nameTag = "";
  system27.runTimeout(async () => {
    if (!entity.isValid) {
      return;
    }
    entity.dimension.playSound("block.sniffer_egg.hatch", entity.location);
    entity.setProperty("melonbp_brp:hatched", true);
    const petEntity = spawnRandomPet(
      entity.typeId,
      { ...entity.location, dimension: entity.dimension },
      player
    );
    const petData = BrianrotPetDataType.get(petEntity.typeId);
    const molang = new MolangVariableMap();
    switch (petData.evolveTier) {
      case 0: {
        molang.setFloat("size", 2);
        molang.setColorRGB("color", CC.GRAY.toColorRGB());
        entity.dimension.playSound("note.pling", entity.location, { pitch: 1 });
        break;
      }
      case 1: {
        molang.setFloat("size", 3);
        molang.setColorRGB("color", CC.AQUA.toColorRGB());
        entity.dimension.playSound("note.pling", entity.location, { pitch: 1.25 });
        break;
      }
      case 2: {
        molang.setFloat("size", 4);
        molang.setColorRGB("color", CC.LIGHT_PURPLE.toColorRGB());
        entity.dimension.playSound("note.pling", entity.location, { pitch: 1.5 });
        break;
      }
      case 3: {
        molang.setFloat("size", 5);
        molang.setColorRGB("color", CC.GOLD.toColorRGB());
        entity.dimension.playSound("note.pling", entity.location, { pitch: 2 });
        break;
      }
    }
    entity.dimension.spawnParticle("melonbp_brp:flash", entity.location, molang);
    await system27.waitTicks(40);
    if (!entity.isValid) {
      return;
    }
    entity.playAnimation("animation.melonbp_brp.egg.vanish", { blendOutTime: 3600 });
    await system27.waitTicks(20);
    if (!entity.isValid) {
      return;
    }
    entity.remove();
  }, 1);
}
system27.beforeEvents.startup.subscribe(() => {
  system27.runTimeout(() => {
    for (const entity of EntityUtils.getAllEntitiesIterator({ families: ["melonbp_brp.egg"] })) {
      entity.remove();
    }
  }, 7);
  world19.afterEvents.entitySpawn.subscribe(({ entity }) => {
    if (!entity.isValid) {
      return;
    }
    const familyComponent = entity.getComponent(EntityTypeFamilyComponent3.componentId);
    if (familyComponent && familyComponent.hasTypeFamily("melonbp_brp.egg")) {
      entity.nameTag = (Config11.Nametags[entity.typeId] ?? "Unknown Egg") + CC.GRAY + "\nPunch to Open";
    }
  });
  world19.afterEvents.entityHitEntity.subscribe(({ hitEntity, damagingEntity }) => {
    if (Config11.EggTypeIds.includes(hitEntity.typeId) && damagingEntity instanceof Player12) {
      system27.run(() => hatchEgg(hitEntity, damagingEntity));
    }
  });
});

// scripts/game/EvolveStickInteractScript.ts
import {
  EntityEquippableComponent as EntityEquippableComponent6,
  EntityIsBabyComponent as EntityIsBabyComponent43,
  EntityTypeFamilyComponent as EntityTypeFamilyComponent4,
  EquipmentSlot as EquipmentSlot6,
  ItemDurabilityComponent,
  world as world20
} from "@minecraft/server";
world20.afterEvents.playerInteractWithEntity.subscribe(({ player, target, itemStack }) => {
  if (!target || !itemStack) {
    return;
  }
  const familyComponent = target.getComponent(EntityTypeFamilyComponent4.componentId);
  if (!familyComponent || !familyComponent.hasTypeFamily("melonbp_brp.pet") || !target.hasComponent(EntityIsBabyComponent43.componentId)) {
    return;
  }
  const requiredTier = PetUtils.getBabyBrainrotPetEvolveTier(target.typeId);
  if (requiredTier === void 0) {
    return;
  }
  const evolveStickComponent = itemStack.getComponent(BrainrotEvolveStickItemComponent.componentId);
  if (!evolveStickComponent) {
    return;
  }
  const { tier } = evolveStickComponent.customComponentParameters.params;
  if (tier < requiredTier) {
    player.sendMessage({
      rawtext: [
        { text: CC.RED + "" },
        {
          translate: "error.evolve_stick.required",
          with: { rawtext: [{ translate: "evolve_tier." + requiredTier }] }
        }
      ]
    });
    return;
  }
  const durabilityComponent = itemStack.getComponent(ItemDurabilityComponent.componentId);
  if (!durabilityComponent) {
    return;
  }
  const equippableComponent = player.getComponent(EntityEquippableComponent6.componentId);
  durabilityComponent.damage += 1;
  if (durabilityComponent.damage >= durabilityComponent.maxDurability) {
    equippableComponent.setEquipment(EquipmentSlot6.Mainhand, void 0);
  } else {
    equippableComponent.setEquipment(EquipmentSlot6.Mainhand, itemStack);
  }
  target.triggerEvent("melonbp_brp:request_grow_up");
});

// scripts/game/GuideBookOnJoinScript.ts
import { EntityInventoryComponent as EntityInventoryComponent5, ItemStack as ItemStack8, system as system28, world as world21 } from "@minecraft/server";
system28.beforeEvents.startup.subscribe(() => {
  world21.afterEvents.playerSpawn.subscribe(({ player }) => {
    if (!player.hasTag("melonbp_brp:guide_given")) {
      const itemStack = new ItemStack8("melonbp_brp:guide_book");
      const inventoryComponent = player.getComponent(EntityInventoryComponent5.componentId);
      inventoryComponent.container.addItem(itemStack);
      if (inventoryComponent.container.find(itemStack) !== void 0) {
        player.addTag("melonbp_brp:guide_given");
      }
    }
  });
});

// scripts/game/HealthRegenScript.ts
import { EntityHealthComponent, system as system29, world as world22 } from "@minecraft/server";
var combatEncounterTracker = {};
system29.beforeEvents.startup.subscribe(() => {
  world22.afterEvents.entityHitEntity.subscribe(({ hitEntity }) => {
    if (combatEncounterTracker[hitEntity.id] === void 0) {
      return;
    }
    combatEncounterTracker[hitEntity.id] = system29.currentTick;
  });
});
system29.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({ families: ["melonbp_brp.pet"] })) {
    combatEncounterTracker[entity.id] = combatEncounterTracker[entity.id] ?? 0;
    const timeSince = system29.currentTick - combatEncounterTracker[entity.id];
    if (timeSince < 200) {
      continue;
    }
    const entityHealthComponent = entity.getComponent(EntityHealthComponent.componentId);
    if (!entityHealthComponent || entityHealthComponent.currentValue >= entityHealthComponent.effectiveMax) {
      continue;
    }
    entityHealthComponent.setCurrentValue(entityHealthComponent.currentValue + 1);
  }
}, 60);

// scripts/game/NametagHandlerScript.ts
import { EntityTameableComponent as EntityTameableComponent9, system as system30, world as world23 } from "@minecraft/server";
var Config12 = {
  ActivationDistance: 5,
  InteractText: "\xA77[SNEAK + INTERACT] to interact",
  Colors: ["" + CC.GREEN, "" + CC.AQUA, "" + CC.LIGHT_PURPLE, "" + CC.RED]
};
system30.beforeEvents.startup.subscribe(() => {
  world23.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
    const petType = BrianrotPetDataType.get(hurtEntity.typeId);
    if (!petType) {
      return;
    }
    const displayName = PetNametagTable[hurtEntity.typeId] ?? "unknown";
    const prefix = Config12.Colors[petType.evolveTier];
    hurtEntity.nameTag = prefix + displayName + CC.RESET;
  });
});
system30.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    families: ["melonbp_brp.pet"]
  })) {
    const petType = BrianrotPetDataType.get(entity.typeId);
    if (!petType) {
      continue;
    }
    const tameableComponent = entity.getComponent(EntityTameableComponent9.componentId);
    const owner = tameableComponent?.tamedToPlayer;
    const displayName = PetNametagTable[entity.typeId] ?? "unknown";
    const prefix = Config12.Colors[petType.evolveTier];
    if (owner && owner.dimension === entity.dimension) {
      const distanceFromOwner = Vector3Utils.distance(entity.location, owner.location);
      if (distanceFromOwner < Config12.ActivationDistance) {
        //entity.nameTag = prefix + displayName + "\n\xA7r" + Config12.InteractText + "\xA7r";
      } else {
      //  entity.nameTag = prefix + displayName;
      }
    } else {
     // entity.nameTag = prefix + displayName;
    }
  }
}, 24);

// scripts/game/PetHostileModeHandlerScript.ts
import { EntityIsBabyComponent as EntityIsBabyComponent44, system as system31, world as world24 } from "@minecraft/server";
system31.runInterval(() => {
  const mode = world24.getDynamicProperty("melonbp_brp:hostile_mode") ?? "normal";
  for (const entity of EntityUtils.getAllEntitiesIterator({ families: ["melonbp_brp.pet"] })) {
    if (entity.hasComponent(EntityIsBabyComponent44.componentId)) {
      continue;
    }
    entity.setProperty("melonbp_brp:hostile_mode", mode);
  }
}, 20);

// scripts/library/forms/BrainrotPetInteractFormData.ts
import { system as system32 } from "@minecraft/server";
import { ActionFormData as ActionFormData8 } from "@minecraft/server-ui";
var Config13 = {
  Headers: ["Common Pets", "Rare Pets", "Epic Pets", "Legendary Pets"],
  Tiers: ["common", "rare", "epic", "legendary"],
  Colors: [
    "" + CC.DARK_GRAY,
    "" + CC.DARK_AQUA,
    "" + CC.DARK_PURPLE,
    "" + CC.MATERIAL_REDSTONE
  ]
};
var BrainrotPetInteractFormData = class _BrainrotPetInteractFormData extends ActionFormData8 {
  constructor(entity, event) {
    super();
    this.callbacks = [];
    const typeId = entity.typeId;
    this.title({ rawtext: [{ translate: `entity.${typeId}.name` }] });
    const petDataType = BrianrotPetDataType.get(typeId);
    if (petDataType) {
      for (const action of petDataType.interactActions) {
        if (action.requires && !action.requires(entity)) {
          continue;
        }
        this.button(action.text, action.iconPath);
        this.callbacks.push(action.callback);
      }
      let texturePath = `textures/melonbp/brp/items/egg_`;
      texturePath += petDataType.identifier.replace("melonbp_brp:", "").replace("_", "");
      this.divider();
      this.button("[?] Info", texturePath);
      this.callbacks.push(async ({ player }) => {
        const formData = new GuidePetStatsFormData({
          typeId: petDataType.identifier,
          name: {
            rawtext: [
              { text: Config13.Colors[petDataType.evolveTier] },
              { translate: "entity." + petDataType.identifier + ".name" }
            ]
          },
          player
        });
        formData.showForm(player, () => {
          system32.run(async () => {
            const formData2 = new _BrainrotPetInteractFormData(entity, event);
            const response = await formData2.show(player);
            if (!response.canceled && response.selection !== void 0) {
              const callback = formData2.getButtonCallback(response.selection);
              if (callback) {
                const results = await callback(event);
                if (results === void 0) {
                  return;
                }
                if (typeof results === "boolean") {
                  if (results === false) {
                    player.sendMessage(CC.RED + "You cannot do that right now!");
                  }
                } else if (Array.isArray(results)) {
                  const [success, message] = results;
                  if (success === false) {
                    if (message !== null) {
                      player.sendMessage(CC.RED + message);
                    } else {
                      player.sendMessage(CC.RED + "You cannot do that right now!");
                    }
                  }
                } else {
                  const { success, time } = results;
                  if (success == false) {
                    player.sendMessage(
                      CC.RED + "This ability is under cooldown for " + Math.ceil(time / 20) + " seconds!"
                    );
                  }
                }
              }
            }
          });
        });
        return true;
      });
    }
  }
  getButtonCallback(selection) {
    return this.callbacks[selection];
  }
};

// scripts/game/PetInteractFormScript.ts
import { EntityTypeFamilyComponent as EntityTypeFamilyComponent5, system as system33, world as world25 } from "@minecraft/server";
world25.beforeEvents.playerInteractWithEntity.subscribe((event) => {
  const { player, target } = event;
  const familyComponent = target.getComponent(EntityTypeFamilyComponent5.componentId);
  if (!familyComponent || !familyComponent.hasTypeFamily("melonbp_brp.pet")) {
    return;
  }
  if (player.isSneaking) {
    event.cancel = true;
    system33.run(async () => {
      const formData = new BrainrotPetInteractFormData(target, event);
      const response = await formData.show(player);
      if (!response.canceled && response.selection !== void 0) {
        const callback = formData.getButtonCallback(response.selection);
        if (callback) {
          const results = await callback(event);
          if (results === void 0) {
            return;
          }
          if (typeof results === "boolean") {
            if (results === false) {
              player.sendMessage(CC.RED + "You cannot do that right now!");
            }
          } else if (Array.isArray(results)) {
            const [success, message] = results;
            if (success === false) {
              if (message !== null) {
                player.sendMessage(CC.RED + message);
              } else {
                player.sendMessage(CC.RED + "You cannot do that right now!");
              }
            }
          } else {
            const { success, time } = results;
            if (success == false) {
              player.sendMessage(
                CC.RED + "This ability is under cooldown for " + Math.ceil(time / 20) + " seconds!"
              );
            }
          }
        }
      }
    });
  }
});

// scripts/library/PetLightEmitter.ts
var PetLightEmitter = class {
  static {
    this.TempLightBlocks = /* @__PURE__ */ new Set();
  }
};

// scripts/game/PetLightEmitterScript.ts
import { system as system34 } from "@minecraft/server";
system34.runInterval(() => {
  const lightEmittingEntities = [];
  for (const entity of EntityUtils.getAllEntitiesIterator({
    families: ["melonbp_brp.pet"]
  })) {
    const isEmittingLight = Boolean(entity.getProperty("melonbp_brp:emit_light"));
    if (!isEmittingLight) {
      continue;
    }
    const lightLocation = Vector3Utils.add(entity.location, { y: 1 });
    const currentBlock = entity.dimension.getBlock(lightLocation);
    if (!currentBlock || !currentBlock.isValid) {
      return;
    }
    if (currentBlock.isAir) {
      currentBlock.setType(MinecraftBlockTypes.LightBlock11);
      PetLightEmitter.TempLightBlocks.add(currentBlock);
    }
    lightEmittingEntities.push(entity);
  }
  for (const block of PetLightEmitter.TempLightBlocks) {
    let shouldRemove = true;
    for (const entity of lightEmittingEntities) {
      if (Vector3Utils.distance(block, entity.location) < 2) {
        shouldRemove = false;
        break;
      }
    }
    if (shouldRemove) {
      block.setType(MinecraftBlockTypes.Air);
      PetLightEmitter.TempLightBlocks.delete(block);
    }
  }
}, 12);

// scripts/game/pets/BallerinaCapuchinaScript.ts
import { EntityDamageCause as EntityDamageCause2, world as world26 } from "@minecraft/server";
function activateVaultAttack(attacker) {
  let attackerImpulse = attacker.getViewDirection();
  attackerImpulse = Vector3Utils.add(attackerImpulse, { y: 1.5 });
  attackerImpulse = Vector3Utils.normalize(attackerImpulse);
  attacker.applyImpulse(attackerImpulse);
  for (const other of attacker.dimension.getEntities({
    location: attacker.location,
    maxDistance: 6,
    families: ["monster"]
  })) {
    other.applyDamage(2, { cause: EntityDamageCause2.entityAttack, damagingEntity: attacker });
    other.applyImpulse(
      Vector3Utils.normalize(Vector3Utils.subtract(other.location, attacker.location))
    );
  }
}
world26.afterEvents.worldLoad.subscribe(() => {
  world26.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:ballerinacapuchina" /* BallerinaCapuccina */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 4) {
      activateVaultAttack(damagingEntity);
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
});

// scripts/game/pets/BallerinolololoScript.ts
import {
  EntityDamageCause as EntityDamageCause3,
  system as system35,
  world as world27
} from "@minecraft/server";
async function activateLaserAttack(entity) {
  const dimension = entity.dimension;
  const attackQuery = {
    families: ["monster"],
    location: Vector3Utils.add(
      entity.getHeadLocation(),
      Vector3Utils.scale(entity.getViewDirection(), 3)
    ),
    maxDistance: 6
  };
  const applyDamageOptions = {
    cause: EntityDamageCause3.entityAttack,
    damagingEntity: entity
  };
  await system35.waitTicks(20);
  dimension.getEntities(attackQuery).forEach((hitEntity) => {
    hitEntity.applyDamage(0.1, applyDamageOptions);
    let impulseForce = Vector3Utils.subtract(hitEntity.location, entity.location);
    impulseForce = Vector3Utils.normalize(impulseForce);
    impulseForce = Vector3Utils.scale(impulseForce, 3);
    hitEntity.applyImpulse(impulseForce);
  });
  await system35.waitTicks(19);
  entity.setProperty("melonbp_brp:laser_attack", false);
}
world27.afterEvents.worldLoad.subscribe(() => {
  world27.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:ballerinolololo" /* BallerinoLololo */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 4) {
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      damagingEntity.setProperty("melonbp_brp:laser_attack", true);
      activateLaserAttack(damagingEntity);
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
  world27.afterEvents.entityLoad.subscribe(({ entity }) => {
    if (entity.typeId !== "melonbp_brp:ballerinolololo" /* BallerinoLololo */) {
      return;
    }
    entity.setProperty("melonbp_brp:attack_counter", 0);
    entity.setProperty("melonbp_brp:laser_attack", false);
  });
});

// scripts/game/pets/BlueberrinniOctopusScript.ts
import {
  DimensionTypes as DimensionTypes2,
  EntityRideableComponent as EntityRideableComponent47,
  EntityTameableComponent as EntityTameableComponent11,
  Player as Player13,
  system as system36,
  world as world28
} from "@minecraft/server";
var Config14 = {
  AttackerEffectDuration: 20 * 3,
  BoatImpulseScale: 2,
  FeatureCooldown: 20 * 8,
  PlayerEffectDuration: 20 * 3,
  PetEntityQueryOptions: {
    maxDistance: 24,
    type: "melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */
  }
};
var PlayerEffectFunction = EntityDebounce(Config14.FeatureCooldown);
world28.afterEvents.worldLoad.subscribe(() => {
  world28.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== MinecraftEntityTypes.Player || !damagingEntity.isInWater) {
      return;
    }
    PlayerEffectFunction(damagingEntity, () => {
      if (!damagingEntity.getEffect(MinecraftEffectTypes.NightVision)) {
        damagingEntity.addEffect(MinecraftEffectTypes.NightVision, Config14.PlayerEffectDuration);
        damagingEntity.dimension.playSound("mob.drowned.swim", damagingEntity.location, {
          pitch: 1.6
        });
        return true;
      }
      return false;
    });
  });
  world28.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== MinecraftEntityTypes.Player || hitEntity.typeId !== "melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */) {
      return;
    }
    const tameableComponent = hitEntity.getComponent(EntityTameableComponent11.componentId);
    if (!tameableComponent || tameableComponent.tamedToPlayerId === damagingEntity.id) {
      return;
    }
    damagingEntity.addEffect(MinecraftEffectTypes.Blindness, Config14.AttackerEffectDuration);
  });
  world28.afterEvents.playerInteractWithEntity.subscribe(({ player, target }) => {
    if (target.typeId !== MinecraftEntityTypes.Boat) {
      return;
    }
    let playerPet;
    for (const entity of player.dimension.getEntities({
      location: player.location,
      maxDistance: 24,
      type: "melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */
    })) {
      const tameableComponent = entity.getComponent(EntityTameableComponent11.componentId);
      if (tameableComponent.tamedToPlayer === player) {
        playerPet = entity;
        break;
      }
    }
    const rideableComponent = target.getComponent(EntityRideableComponent47.componentId);
    if (playerPet) {
      system36.runTimeout(() => rideableComponent.addRider(playerPet), 2);
    }
  });
});
system36.runInterval(() => {
  for (const dimensionType of DimensionTypes2.getAll()) {
    const dimension = world28.getDimension(dimensionType.typeId);
    if (!dimension) {
      continue;
    }
    for (const boatEntity of dimension.getEntities({ families: ["boat"] })) {
      const rideableComponent = boatEntity.getComponent(EntityRideableComponent47.componentId);
      let speedBoost = false;
      let petName = "";
      let direction = boatEntity.getViewDirection();
      if (!rideableComponent) {
        continue;
      }
      for (const entity of rideableComponent.getRiders()) {
        if (!(entity instanceof Player13)) {
          continue;
        }
        if (PetUtils.hasNearbyPetEntity(entity, {
          type: "melonbp_brp:blueberrinnioctopus" /* BlueberrinniOctopus */,
          maxDistance: 24
        })) {
          direction = entity.getViewDirection();
          speedBoost = true;
          petName = entity.nameTag;
          break;
        }
      }
      if (speedBoost) {
        let impulseForce = { ...direction, y: 0.2 };
        impulseForce = Vector3Utils.scale(impulseForce, Config14.BoatImpulseScale);
        boatEntity.applyImpulse(impulseForce);
        world28.sendMessage({
          rawtext: [
            { text: CC.YELLOW + "" },
            { translate: "pet.blueberrinni_octopus.boost", with: [petName] }
          ]
        });
        for (const entity of rideableComponent.getRiders()) {
          if (entity instanceof Player13) {
            entity.playSound("mob.axolotl.splash", { pitch: 1, volume: 600 });
            entity.playSound("mob.bat.takeoff", { pitch: 2, volume: 600 });
          }
        }
      }
    }
  }
}, 20 * 6);

// scripts/library/functions/BobrittoBanditoMultiArrowShot.ts
import { EntityProjectileComponent as EntityProjectileComponent2 } from "@minecraft/server";
function BobrittoBanditoMultiArrowShot_default(damagingEntity) {
  PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 4, () => {
    const orientation = OrientationUtils.ToOrientation(damagingEntity.getViewDirection());
    orientation.y -= 5;
    for (let i = 0; i < 3; i++) {
      const arrow = damagingEntity.dimension.spawnEntity(
        MinecraftEntityTypes.Arrow,
        Vector3Utils.add(damagingEntity.getHeadLocation(), damagingEntity.getViewDirection())
      );
      arrow.addTag("melonbp_brp:harming_arrow");
      let impulseForce = OrientationUtils.FromOrientation(orientation);
      impulseForce = Vector3Utils.scale(impulseForce, 3);
      arrow.applyImpulse(impulseForce);
      orientation.y += 5;
      const arrowProjectileComponent = arrow.getComponent(EntityProjectileComponent2.componentId);
      if (arrowProjectileComponent) {
        arrowProjectileComponent.owner = damagingEntity;
      }
    }
  });
}

// scripts/game/pets/BobrittoBanditoScript.ts
import { EntityProjectileComponent as EntityProjectileComponent3, world as world29 } from "@minecraft/server";
function trackProjectile(projectile) {
  if (!projectile.isValid) {
    return;
  }
  const projectileComponent = projectile.getComponent(EntityProjectileComponent3.componentId);
  if (!projectileComponent || !projectileComponent.owner || projectileComponent.owner.typeId !== "melonbp_brp:bobritobandito" /* BobrittoBandito */) {
    return;
  }
  if (projectile.hasTag("melonbp_brp:harming_arrow")) {
    return;
  }
  const damagingEntity = projectileComponent.owner;
  BobrittoBanditoMultiArrowShot_default(damagingEntity);
}
world29.afterEvents.worldLoad.subscribe(() => {
  world29.afterEvents.entitySpawn.subscribe(({ entity }) => {
    trackProjectile(entity);
  });
  world29.afterEvents.projectileHitEntity.subscribe(({ projectile, getEntityHit }) => {
    if (!projectile.isValid || !projectile.hasTag("melonbp_brp:harming_arrow")) {
      return;
    }
    const hitEntity = getEntityHit().entity;
    if (!hitEntity || !hitEntity.isValid) {
      return;
    }
    hitEntity.addEffect(MinecraftEffectTypes.InstantDamage, 1);
  });
});

// scripts/game/pets/BonecaAmbalabuScript.ts
import { EntityDamageCause as EntityDamageCause4, EntityTameableComponent as EntityTameableComponent12, Player as Player14, world as world30 } from "@minecraft/server";
var Config15 = {
  AttackKnockbackChance: 0.5,
  AttackKnockbackCounterScale: 0.75,
  // Counter scale for the damaging entity
  AttackKnockbackScale: 1.2,
  AttackKnockbackYScalar: 0.3
};
function shouldNegateFallDamage(player) {
  for (const entity of player.dimension.getEntities({
    location: player.location,
    type: "melonbp_brp:bonecaambalabu" /* BonecaAmbalabu */,
    maxDistance: 30
  })) {
    const tameableComponent = entity.getComponent(EntityTameableComponent12.componentId);
    if (tameableComponent && tameableComponent.tamedToPlayerId === player.id) {
      return true;
    }
  }
  return false;
}
world30.afterEvents.worldLoad.subscribe(() => {
  world30.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:bonecaambalabu" /* BonecaAmbalabu */) {
      return;
    }
    if (RandomUtils.chance(Config15.AttackKnockbackChance)) {
      let impulseForce = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.add(impulseForce, { y: Config15.AttackKnockbackYScalar });
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.scale(impulseForce, Config15.AttackKnockbackScale);
      hitEntity.applyImpulse(impulseForce);
      impulseForce = Vector3Utils.multiply(impulseForce, { x: -1, y: 1, z: -1 });
      impulseForce = Vector3Utils.scale(impulseForce, Config15.AttackKnockbackCounterScale);
      damagingEntity.applyImpulse(impulseForce);
    }
  });
  world30.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    if (!(hurtEntity instanceof Player14)) {
      return;
    }
    if (damageSource.cause !== EntityDamageCause4.fall) {
      return;
    }
    if (!shouldNegateFallDamage(hurtEntity)) {
      return;
    }
    hurtEntity.addEffect(MinecraftEffectTypes.InstantHealth, 1, { amplifier: 2 });
  });
});

// scripts/game/pets/BriBriBicusDicusDeBicusDeDicusScript.ts
import { system as system37, world as world31 } from "@minecraft/server";
system37.runInterval(() => {
  for (const shieldEntity of EntityUtils.getAllEntities({
    type: MinecraftEntityTypes.ArmorStand,
    tags: ["melonbp_brp:shield"]
  })) {
    const playerId = shieldEntity.getDynamicProperty("melonbp_brp:shield_owner");
    if (!playerId) {
      shieldEntity.remove();
      continue;
    }
    const player = world31.getEntity(playerId);
    if (!player) {
      shieldEntity.remove();
      continue;
    }
    let orientationYOffset = 0;
    if (shieldEntity.hasTag("melonbp_brp:shield_1")) {
      orientationYOffset = 30;
    } else if (shieldEntity.hasTag("melonbp_brp:shield_2")) {
      orientationYOffset = -30;
    }
    let orientation = OrientationUtils.ToOrientation(player.getViewDirection());
    orientation.y += orientationYOffset;
    let targetLocation = Vector3Utils.add(
      player.getHeadLocation(),
      Vector3Utils.scale(OrientationUtils.FromOrientation(orientation), 3)
    );
    targetLocation = Vector3Utils.subtract(targetLocation, { y: 1.5 });
    shieldEntity.teleport(Vector3Utils.lerp(shieldEntity.location, targetLocation, 0.7), {
      rotation: { x: player.getRotation().x, y: player.getRotation().y - 50 }
    });
    for (const monster of shieldEntity.dimension.getEntities({
      families: ["monster"],
      location: shieldEntity.location,
      maxDistance: 2
    })) {
      shieldEntity.dimension.playSound("item.shield.block", monster.location);
      monster.applyImpulse(Vector3Utils.scale({ ...shieldEntity.getViewDirection(), y: 0.3 }, 2));
    }
  }
});

// scripts/game/pets/BrrBaloniLuliloliScript.ts
import { EntityDamageCause as EntityDamageCause5, system as system38, world as world32 } from "@minecraft/server";
world32.afterEvents.worldLoad.subscribe(() => {
  world32.afterEvents.entityHitEntity.subscribe(async ({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:burbaloniluliloli" /* BrrBaloniLuliloli */) {
      return;
    }
    let impulse = damagingEntity.getViewDirection();
    impulse = Vector3Utils.scale(impulse, 3);
    damagingEntity.applyImpulse(impulse);
    for (let i = 0; i < 3; i++) {
      await system38.waitTicks(3);
      if (!damagingEntity.isValid) {
        break;
      }
      for (const other of damagingEntity.dimension.getEntities({
        families: ["monster"],
        location: damagingEntity.location,
        maxDistance: 5
      })) {
        other.applyDamage(1, { cause: EntityDamageCause5.entityAttack, damagingEntity });
        other.addEffect(MinecraftEffectTypes.Slowness, 20);
      }
    }
  });
});

// scripts/game/pets/BrrBrrPatapimScript.ts
import { EntityTameableComponent as EntityTameableComponent13, Player as Player16, world as world33 } from "@minecraft/server";
var CombatEffectFunction = EntityDebounce(20 * 15);
var SurvivalEffectFunction = EntityDebounce(20 * 30);
world33.afterEvents.worldLoad.subscribe(() => {
  world33.afterEvents.playerInteractWithEntity.subscribe(({ player, target }) => {
  });
  world33.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (!(damagingEntity instanceof Player16)) {
      return;
    }
    CombatEffectFunction(damagingEntity, () => {
      const { dimension, location } = damagingEntity;
      const pets = dimension.getEntities({
        type: "melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */,
        location,
        maxDistance: 24
      }).filter((entity) => {
        const tameableComponent = entity.getComponent(EntityTameableComponent13.componentId);
        return tameableComponent && tameableComponent.tamedToPlayer === damagingEntity;
      });
      if (pets.length === 0) {
        return false;
      }
      damagingEntity.addEffect(MinecraftEffectTypes.Speed, 20 * 3, { amplifier: 1 });
      for (const petEntity of pets) {
        petEntity.playAnimation("animation.melonbp_brp.brrbrrpatapin.attack");
      }
      damagingEntity.playAnimation("animation.melonbp_brp.brrbrrpatapin.thump", {
        blendOutTime: 0.4
      });
      dimension.playSound("mob.warden.attack", location, {
        volume: 600,
        pitch: 2
      });
      return true;
    });
  });
  world33.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:brrbrrpatapin" /* BrrBrrPatapim */) {
      return;
    }
    let impulseForce = { ...damagingEntity.getViewDirection(), y: 2 };
    impulseForce = Vector3Utils.normalize(impulseForce);
    hitEntity.applyImpulse(impulseForce);
  });
});

// scripts/game/pets/BrrEsTehPatipumScript.ts
import {
  EntityDamageCause as EntityDamageCause6,
  Player as Player17,
  system as system39,
  world as world34
} from "@minecraft/server";
var ExtinguisheEffectFunction = EntityDebounce(20 * 30);
async function activateBurstAttack(entity) {
  const dimension = entity.dimension;
  const attackQuery = {
    families: ["monster"],
    location: entity.location,
    maxDistance: 12
  };
  const applyDamageOptions = {
    cause: EntityDamageCause6.entityAttack,
    damagingEntity: entity
  };
  for (let i = 0; i < 3; i++) {
    dimension.getEntities(attackQuery).forEach((hitEntity) => {
      if (!hitEntity.isValid) {
        return;
      }
      hitEntity.applyDamage(0.1, applyDamageOptions);
      let impulseForce = Vector3Utils.subtract(hitEntity.location, entity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      hitEntity.applyImpulse(impulseForce);
    });
    await system39.waitTicks(19);
  }
  entity.setProperty("melonbp_brp:burst_attack", false);
}
world34.afterEvents.worldLoad.subscribe(() => {
  world34.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 4) {
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      damagingEntity.setProperty("melonbp_brp:burst_attack", true);
      activateBurstAttack(damagingEntity);
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
  world34.afterEvents.entityLoad.subscribe(({ entity }) => {
    if (entity.typeId !== "melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */) {
      return;
    }
    entity.setProperty("melonbp_brp:attack_counter", 0);
    entity.setProperty("melonbp_brp:burst_attack", false);
  });
  world34.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    const { dimension, location } = hurtEntity;
    if (hurtEntity instanceof Player17 && damageSource.cause === EntityDamageCause6.fireTick) {
      for (const entity of dimension.getEntities({
        type: "melonbp_brp:berrrestehpatipum" /* BrrEsTehPatipum */,
        location,
        maxDistance: 11
      })) {
        if (PetUtils.isTamedToPlayer(entity, hurtEntity)) {
          ExtinguisheEffectFunction(entity, () => {
            hurtEntity.extinguishFire();
            hurtEntity.addEffect(MinecraftEffectTypes.Regeneration, 20 * 6);
            dimension.playSound("random.fizz", location, { pitch: 1.2 });
            dimension.playSound("melonbp.brp.berrrestehpatipum", entity.location, { pitch: 1 });
            dimension.spawnParticle("melonbp_brp:orange_juice_splash", location);
            entity.playAnimation("animation.melonbp_brp.berrrestehpatipum.attack");
            return true;
          });
        }
      }
    }
  });
});

// scripts/game/pets/ChimpanziniBananiniScript.ts
import {
  EntityDamageCause as EntityDamageCause7,
  EntityHungerComponent,
  EntityInventoryComponent as EntityInventoryComponent6,
  ItemStack as ItemStack9,
  system as system40,
  world as world35
} from "@minecraft/server";
world35.afterEvents.worldLoad.subscribe(() => {
  world35.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:chimpanzinibananini" /* ChimpanziniBananini */) {
      return;
    }
    PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 3, () => {
      const bananaPeelEntity = damagingEntity.dimension.spawnEntity(
        "melonbp_brp:chimpanzinibananini_banana_peel" /* ChimpanziniBananiniBananaPeel */,
        damagingEntity.getHeadLocation()
      );
      bananaPeelEntity.applyImpulse({ ...RandomUtils.randomDirection(), y: 1 });
    });
  });
});
system40.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:chimpanzinibananini_banana_peel" /* ChimpanziniBananiniBananaPeel */
  })) {
    let activated = false;
    for (const target of entity.dimension.getEntities({
      families: ["monster"],
      maxDistance: 2,
      location: entity.location
    })) {
      activated = true;
      target.addEffect(MinecraftEffectTypes.Slowness, 200);
      target.applyImpulse(Vector3Utils.scale(VECTOR3_UP, 4));
      target.applyDamage(1, { cause: EntityDamageCause7.entityAttack, damagingEntity: entity });
    }
    if (activated) {
      entity.triggerEvent("melonbp_brp:despawn");
    }
  }
}, 12);
system40.runInterval(() => {
  for (const player of world35.getAllPlayers()) {
    if (!PetUtils.hasNearbyPetEntity(player, {
      type: "melonbp_brp:chimpanzinibananini" /* ChimpanziniBananini */,
      maxDistance: 32
    })) {
      continue;
    }
    const hungerComponent = player.getComponent(EntityHungerComponent.componentId);
    if (hungerComponent && hungerComponent.currentValue < hungerComponent.effectiveMax) {
      const inventoryComponent = player.getComponent(EntityInventoryComponent6.componentId);
      inventoryComponent.container.addItem(new ItemStack9("melonbp_brp:banana" /* Banana */));
    }
  }
}, 20 * 60);

// scripts/game/pets/CocofantoElefantoScript.ts
import { world as world36 } from "@minecraft/server";
world36.afterEvents.worldLoad.subscribe(() => {
  world36.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:cocofantoelefanto" /* CocofantoElefanto */) {
      return;
    }
    const ultraStrength = RandomUtils.chance(0.05);
    const knockbackDistance = ultraStrength ? 3.5 : 2;
    const knockbackStrength = ultraStrength ? 5 : 1;
    for (const entity of damagingEntity.dimension.getEntities({
      families: ["monster"],
      location: damagingEntity.location,
      maxDistance: knockbackDistance
    })) {
      let impulse = Vector3Utils.subtract(entity.location, damagingEntity.location);
      impulse = Vector3Utils.normalize(impulse);
      impulse = Vector3Utils.add(impulse, { y: 1 });
      impulse = Vector3Utils.normalize(impulse);
      impulse = Vector3Utils.scale(impulse, knockbackStrength);
      entity.applyImpulse(impulse);
    }
  });
});

// scripts/game/pets/CoolKidFooteraScript.ts
import { Player as Player18, world as world37 } from "@minecraft/server";
world37.afterEvents.worldLoad.subscribe(() => {
  world37.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:coolkidfootera" /* CoolKidFootera */) {
      let impulseForce = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.add(impulseForce, { y: 1 });
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.scale(impulseForce, 2);
      hitEntity.applyImpulse(impulseForce);
    } else if (hitEntity.typeId === "melonbp_brp:coolkidfootera" /* CoolKidFootera */ && damagingEntity instanceof Player18) {
      if (PetUtils.isTamedToPlayer(hitEntity, damagingEntity)) {
        return;
      }
      damagingEntity.addEffect(MinecraftEffectTypes.Blindness, 20 * 5);
    }
  });
});

// scripts/game/pets/CopyrightSahurScript.ts
import { EntityDamageCause as EntityDamageCause8, world as world38 } from "@minecraft/server";
function activateKnockbackAttack(damagingEntity) {
  const { dimension, location } = damagingEntity;
  for (const other of dimension.getEntities({
    location,
    maxDistance: 6,
    families: ["monster"]
  })) {
    other.applyDamage(2, { cause: EntityDamageCause8.entityAttack, damagingEntity });
    other.applyImpulse(
      Vector3Utils.scale(
        Vector3Utils.normalize(Vector3Utils.subtract(other.location, location)),
        0.5
      )
    );
  }
  dimension.playSound("mob.creaking.attack", location, {
    volume: 600,
    pitch: 2
  });
}
world38.afterEvents.worldLoad.subscribe(() => {
  world38.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:copyrightsahur" /* CopyrightSahur */) {
      return;
    }
    PetUtils.executeAttackFunctionOrIncrement(
      damagingEntity,
      3,
      () => activateKnockbackAttack(damagingEntity)
    );
  });
});

// scripts/game/pets/EccoCavalloVirtuosoScript.ts
import { world as world39 } from "@minecraft/server";
world39.afterEvents.worldLoad.subscribe(() => {
  world39.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:eccocavallovirtuoso" /* EccoCavalloVirtuoso */ && RandomUtils.chance(0.5)) {
      hitEntity.applyImpulse({ ...damagingEntity.getViewDirection(), y: 1 });
    }
  });
});

// scripts/game/pets/FrigoCamelloScript.ts
import { EntityInventoryComponent as EntityInventoryComponent7, system as system41, world as world40 } from "@minecraft/server";
var Config16 = {
  FoodItemTypeIds: [
    MinecraftItemTypes.CookedChicken,
    MinecraftItemTypes.CookedPorkchop,
    MinecraftItemTypes.CookedBeef,
    MinecraftItemTypes.CookedMutton,
    MinecraftItemTypes.CookedRabbit,
    MinecraftItemTypes.CookedCod,
    MinecraftItemTypes.CookedSalmon,
    MinecraftItemTypes.Bread,
    MinecraftItemTypes.MushroomStew,
    MinecraftItemTypes.BeetrootSoup,
    MinecraftItemTypes.RabbitStew,
    MinecraftItemTypes.BakedPotato,
    MinecraftItemTypes.Cookie,
    MinecraftItemTypes.PumpkinPie,
    MinecraftItemTypes.Cake,
    MinecraftItemTypes.DriedKelp,
    MinecraftItemTypes.Wheat,
    MinecraftItemTypes.Beetroot,
    MinecraftItemTypes.Potato,
    MinecraftItemTypes.PoisonousPotato,
    MinecraftItemTypes.Carrot,
    MinecraftItemTypes.GoldenCarrot,
    MinecraftItemTypes.Apple,
    MinecraftItemTypes.GoldenApple,
    MinecraftItemTypes.EnchantedGoldenApple,
    MinecraftItemTypes.MelonSlice,
    MinecraftItemTypes.GlisteringMelonSlice,
    MinecraftItemTypes.SweetBerries,
    MinecraftItemTypes.GlowBerries,
    MinecraftItemTypes.Chicken,
    MinecraftItemTypes.Porkchop,
    MinecraftItemTypes.Beef,
    MinecraftItemTypes.Mutton,
    MinecraftItemTypes.Rabbit,
    MinecraftItemTypes.Cod,
    MinecraftItemTypes.Salmon,
    MinecraftItemTypes.TropicalFish,
    MinecraftItemTypes.Pufferfish,
    MinecraftItemTypes.Egg,
    "melonbp_brp:banana" /* Banana */,
    "melonbp_brp:golden_cod" /* GoldenCod */,
    "melonbp_brp:golden_salmon" /* GoldenSalmon */,
    "melonbp_brp:power_toast" /* PowerToast */,
    "melonbp_brp:sticky_rice" /* SitckyRice */
  ]
};
world40.afterEvents.worldLoad.subscribe(() => {
  world40.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:frigocammello" /* FrigoCamello */) {
      let impulseForce = damagingEntity.getViewDirection();
      impulseForce = Vector3Utils.add(impulseForce, { y: 0.5 });
      impulseForce = Vector3Utils.scale(impulseForce, 1.5);
      damagingEntity.applyImpulse(impulseForce);
      hitEntity.addEffect(MinecraftEffectTypes.Slowness, 20);
    }
  });
});
system41.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:frigocammello" /* FrigoCamello */
  })) {
    const inventoryComponent = entity.getComponent(EntityInventoryComponent7.componentId);
    if (!inventoryComponent) {
      continue;
    }
    for (let slotId = 0; slotId < inventoryComponent.container.size; slotId++) {
      const itemStack = inventoryComponent.container.getItem(slotId);
      if (!itemStack || !Config16.FoodItemTypeIds.includes(itemStack.typeId) || itemStack.amount === itemStack.maxAmount) {
        continue;
      }
      itemStack.amount = Math.min(itemStack.amount + 1, itemStack.maxAmount);
      inventoryComponent.container.setItem(slotId, itemStack);
    }
  }
}, 20 * 10);
system41.runInterval(() => {
  for (const player of world40.getAllPlayers()) {
    if (!PetUtils.hasNearbyPetEntity(player, { type: "melonbp_brp:frigocammello" /* FrigoCamello */, maxDistance: 20 })) {
      continue;
    }
    const currentBlock = player.dimension.getBlock(player.location);
    if (currentBlock && currentBlock.typeId === MinecraftBlockTypes.PowderSnow) {
      system41.runTimeout(() => {
        if (!player.isValid) {
          return;
        }
        const currentBlock2 = player.dimension.getBlock(player.location);
        if (!currentBlock2 || currentBlock2.typeId !== MinecraftBlockTypes.PowderSnow) {
          return;
        }
        let pet;
        for (const entity of player.dimension.getEntities({
          type: "melonbp_brp:frigocammello" /* FrigoCamello */,
          location: player.location,
          maxDistance: 20
        })) {
          if (PetUtils.isTamedToPlayer(entity, player)) {
            pet = entity;
            break;
          }
        }
        if (pet) {
          player.teleport(pet.location);
          world40.sendMessage({
            rawtext: [
              { text: CC.YELLOW + "" },
              {
                translate: "pet.frigo_camello.snow_saved",
                with: [pet.nameTag + CC.RESET + CC.YELLOW]
              }
            ]
          });
        }
      }, 20 * 5);
    }
  }
}, 20);

// scripts/game/pets/FruliFrulaScript.ts
import { EntityDamageCause as EntityDamageCause9, world as world41 } from "@minecraft/server";
var Config17 = {
  SetOnFireChance: 0.05,
  SetOnFireDuration: 20 * 4,
  CritChance: 0.25,
  CritDamageAmount: 6
};
world41.afterEvents.worldLoad.subscribe(() => {
  world41.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:frulifrula" /* FruliFrula */) {
      if (RandomUtils.chance(Config17.SetOnFireChance)) {
        hitEntity.setOnFire(Config17.SetOnFireDuration);
      }
      if (RandomUtils.chance(Config17.CritChance)) {
        hitEntity.applyDamage(Config17.CritDamageAmount, {
          cause: EntityDamageCause9.entityAttack,
          damagingEntity
        });
        hitEntity.dimension.spawnParticle(
          "minecraft:critical_hit_emitter",
          Vector3Utils.add(hitEntity.getHeadLocation(), { y: 1 })
        );
      }
    }
  });
});

// scripts/game/pets/GaramMaduScript.ts
import {
  EntityItemComponent as EntityItemComponent2,
  EntityTameableComponent as EntityTameableComponent14,
  ItemStack as ItemStack10,
  system as system42,
  world as world42
} from "@minecraft/server";
var LaserAttackFunction = EntityDebounce(20 * 10);
var Config18 = {
  RawFoodItemTypes: {
    [MinecraftItemTypes.Beef]: MinecraftItemTypes.CookedBeef,
    [MinecraftItemTypes.Chicken]: MinecraftItemTypes.CookedChicken,
    [MinecraftItemTypes.Cod]: MinecraftItemTypes.CookedCod,
    [MinecraftItemTypes.Mutton]: MinecraftItemTypes.CookedMutton,
    [MinecraftItemTypes.Porkchop]: MinecraftItemTypes.CookedPorkchop,
    [MinecraftItemTypes.Rabbit]: MinecraftItemTypes.CookedRabbit,
    [MinecraftItemTypes.Salmon]: MinecraftItemTypes.CookedSalmon
  }
};
world42.afterEvents.worldLoad.subscribe(() => {
  world42.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:garammararam" /* GaramMadu */) {
      LaserAttackFunction(damagingEntity, () => {
        hitEntity.applyImpulse({ ...RandomUtils.randomDirection(), y: 1 });
        hitEntity.setOnFire(5);
        damagingEntity.setProperty("melonbp_brp:salt_laser", true);
        system42.runTimeout(() => damagingEntity.setProperty("melonbp_brp:salt_laser", false), 20);
        return true;
      });
      const { dimension, location } = damagingEntity;
      system42.runTimeout(() => {
        for (const itemEntity of dimension.getEntities({
          type: "minecraft:item",
          location,
          maxDistance: 4
        })) {
          const itemComponent = itemEntity.getComponent(EntityItemComponent2.componentId);
          const result = Config18.RawFoodItemTypes[itemComponent.itemStack.typeId];
          if (result) {
            dimension.spawnItem(
              new ItemStack10(result, itemComponent.itemStack.amount),
              itemEntity.location
            );
            dimension.playSound("extinguish.candle", itemEntity.location);
            dimension.spawnParticle("minecraft:basic_smoke_particle", itemEntity.location);
            itemEntity.remove();
            break;
          }
        }
      }, 20);
    }
    const parentTameableComponent = hitEntity.getComponent(EntityTameableComponent14.componentId);
    if (hitEntity.typeId === "melonbp_brp:garammararam" /* GaramMadu */ && RandomUtils.chance(0.25)) {
      const beeEntity = damagingEntity.dimension.spawnEntity(
        "melonbp_brp:angry_bee",
        damagingEntity.getHeadLocation()
      );
      beeEntity.addTag("melonbp_brp:removable");
      system42.runTimeout(() => {
        if (beeEntity.isValid) {
          beeEntity.remove();
        }
      }, 20 * 10);
      const tameableComponent = beeEntity.getComponent(EntityTameableComponent14.componentId);
      if (tameableComponent && parentTameableComponent.tamedToPlayer) {
        tameableComponent.tame(parentTameableComponent.tamedToPlayer);
      }
    }
  });
});

// scripts/game/pets/GiraffaCelesteScript.ts
import { world as world43 } from "@minecraft/server";
var Config19 = {
  SlowFallingDuration: 20 * 10
};
world43.afterEvents.worldLoad.subscribe(() => {
  world43.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:giraffaceleste" /* GiraffaCeleste */) {
      let impulseForce = Vector3Utils.subtract(damagingEntity.location, hitEntity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = { ...impulseForce, y: 5 };
      impulseForce = Vector3Utils.normalize(impulseForce);
      hitEntity.applyImpulse(impulseForce);
      hitEntity.addEffect(MinecraftEffectTypes.SlowFalling, Config19.SlowFallingDuration);
    }
  });
});

// scripts/game/pets/GloboFruttodrilloScript.ts
import { EntityDamageCause as EntityDamageCause10, world as world44 } from "@minecraft/server";
world44.afterEvents.worldLoad.subscribe(() => {
  world44.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:glorbofruttodillo" /* GloboFruttodrillo */) {
      return;
    }
    for (const other of damagingEntity.dimension.getEntities({
      location: damagingEntity.location,
      maxDistance: 6,
      families: ["monster"]
    })) {
      other.applyDamage(1, { cause: EntityDamageCause10.entityAttack, damagingEntity });
      other.applyImpulse(
        Vector3Utils.normalize(Vector3Utils.subtract(other.location, damagingEntity.location))
      );
    }
    damagingEntity.dimension.playSound("mob.evocation_fangs.attack", damagingEntity.location);
  });
});

// scripts/game/pets/ilCactoHipopotamoScript.ts
import {
  BlockVolume as BlockVolume7,
  DimensionTypes as DimensionTypes3,
  EntityDamageCause as EntityDamageCause11,
  system as system43,
  world as world45
} from "@minecraft/server";
function* enahnceNearbyCrops(dimension, location) {
  const from = Vector3Utils.add(location, { x: -3, y: -3, z: -3 });
  const to = Vector3Utils.add(location, { x: 3, y: 3, z: 3 });
  for (const blockLocation of new BlockVolume7(from, to).getBlockLocationIterator()) {
    const block = dimension.getBlock(blockLocation);
    if (block && block.isValid && block.hasTag("minecraft:crop")) {
      let blockPermutation = block.permutation;
      const currentGrowth = Number(blockPermutation.getState("growth"));
      if (currentGrowth < 7) {
        blockPermutation = blockPermutation.withState("growth", currentGrowth + 1);
        block.setPermutation(blockPermutation);
        dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
        dimension.playSound("item.bone_meal.use", block.center());
      }
    }
    yield;
  }
}
world45.afterEvents.worldLoad.subscribe(() => {
  world45.afterEvents.entityHitEntity.subscribe(({ hitEntity, damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:ilcactohipopotamo" /* ilCactoHipopotamo */ || RandomUtils.chance(0.5)) {
      return;
    }
    hitEntity.applyDamage(2, { cause: EntityDamageCause11.thorns, damagingEntity });
    hitEntity.dimension.spawnParticle(
      "minecraft:critical_hit_emitter",
      Vector3Utils.add(hitEntity.getHeadLocation(), { y: 1 })
    );
  });
});
system43.runInterval(() => {
  for (const dimensionType of DimensionTypes3.getAll()) {
    const dimension = world45.getDimension(dimensionType.typeId);
    if (!dimension) {
      continue;
    }
    for (const entity of dimension.getEntities({ type: "melonbp_brp:ilcactohipopotamo" /* ilCactoHipopotamo */ })) {
      system43.runJob(enahnceNearbyCrops(dimension, entity.location));
    }
  }
}, 20 * 5);

// scripts/game/pets/KarkerkarKurkurScript.ts
import {
  EntityDamageCause as EntityDamageCause12,
  EntityHealthComponent as EntityHealthComponent2,
  EntityRideableComponent as EntityRideableComponent48,
  Player as Player19,
  system as system44,
  world as world46
} from "@minecraft/server";
world46.afterEvents.worldLoad.subscribe(() => {
  world46.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:karkerkarkurkur" /* KarkerkarKurkur */) {
      const rideableComeponent = damagingEntity.getComponent(EntityRideableComponent48.componentId);
      if (!rideableComeponent) {
        return;
      }
      const healthComponent = hitEntity.getComponent(EntityHealthComponent2.componentId);
      if (healthComponent && healthComponent.currentValue / healthComponent.effectiveMax < 0.3) {
        rideableComeponent.addRider(hitEntity);
      }
    }
  });
});
system44.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:karkerkarkurkur" /* KarkerkarKurkur */
  })) {
    const rideableComeponent = entity.getComponent(EntityRideableComponent48.componentId);
    let yeetSFX = false;
    if (rideableComeponent) {
      for (const other of rideableComeponent.getRiders()) {
        if (other instanceof Player19 && PetUtils.isTamedToPlayer(entity, other)) {
          continue;
        }
        rideableComeponent.ejectRider(other);
        other.applyImpulse(Vector3Utils.scale({ ...RandomUtils.randomDirection(), y: 4 }, 2));
        other.applyDamage(12, { cause: EntityDamageCause12.entityAttack, damagingEntity: entity });
        yeetSFX = true;
      }
    }
    if (yeetSFX) {
      entity.dimension.playSound("melonbp.brp.yeet", entity.location);
    }
  }
}, 20 * 5);

// scripts/game/pets/KetupatKepatPrekupatScript.ts
import { EntityDamageCause as EntityDamageCause13, system as system45, world as world47 } from "@minecraft/server";
world47.afterEvents.worldLoad.subscribe(() => {
  world47.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:ketupatkepat" /* KetupatKepatPrekupat */) {
      PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 5, () => {
        system45.run(async () => {
          for (let i = 0; i < 3; i++) {
            damagingEntity.playAnimation("animation.melonbp_brp.ketupatkepat.attack");
            await system45.waitTicks(15);
          }
        });
        for (const hitEntity of damagingEntity.dimension.getEntities({
          families: ["monster"],
          location: damagingEntity.location,
          maxDistance: 6
        })) {
          let impulseForce = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
          impulseForce = Vector3Utils.normalize(impulseForce);
          impulseForce = Vector3Utils.add(impulseForce, { y: 3 });
          impulseForce = Vector3Utils.scale(impulseForce, 2);
          hitEntity.clearVelocity();
          hitEntity.applyImpulse(impulseForce);
          hitEntity.applyDamage(4, { cause: EntityDamageCause13.entityAttack, damagingEntity });
          hitEntity.addEffect(MinecraftEffectTypes.Wither, 20 * 10);
        }
      });
    }
  });
});

// scripts/game/pets/LaEsokSikolaScript.ts
import { world as world48 } from "@minecraft/server";
world48.afterEvents.worldLoad.subscribe(() => {
  world48.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:laesoksekolah" /* LaEsokSikola */) {
      hitEntity.addEffect(MinecraftEffectTypes.Weakness, 20 * 7);
    }
  });
});

// scripts/game/pets/LaVacaSaturnoSaturnitaScript.ts
import { system as system46, world as world49 } from "@minecraft/server";
function planetaryRotationAttack(sourceEntity) {
  system46.run(() => {
    const enemies = {};
    for (const enemy of EntityUtils.getAllEntitiesIterator({
      families: ["monster"],
      location: sourceEntity.location,
      maxDistance: 16
    })) {
      const distance = Vector3Utils.distance(enemy.location, sourceEntity.location);
      const direction = Vector3Utils.subtract(enemy.location, sourceEntity.location);
      const orientation = OrientationUtils.ToOrientation(direction);
      enemies[enemy.id] = {
        rotation: orientation.y,
        direction: Math.random() > 0.5 ? 1 : -1,
        distance
      };
    }
    const startTick = system46.currentTick;
    const update = () => {
      const t = system46.currentTick - startTick;
      for (const enemyId in enemies) {
        const entity = world49.getEntity(enemyId);
        if (!entity || !entity.isValid) {
          continue;
        }
        const enemyData = enemies[enemyId];
        enemyData.rotation = enemyData.rotation + Math.min(Math.max(t, 10), 40);
        const direction = OrientationUtils.FromOrientation({
          x: 0,
          y: enemyData.rotation
        });
        entity.teleport(
          Vector3Utils.add(
            sourceEntity.location,
            Vector3Utils.scale(direction, enemyData.distance * enemyData.direction)
          )
        );
        if (t >= 80) {
          entity.applyImpulse({ x: Math.random() - 0.5, y: 3, z: Math.random() - 0.5 });
        }
      }
      if (t < 80) {
        system46.run(update);
      }
    };
    system46.run(update);
  });
}
world49.afterEvents.worldLoad.subscribe(() => {
  world49.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:vacasaturnosaturnita" /* LaVacaSaturnoSaturnita */) {
      return;
    }
    PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 5, () => {
      planetaryRotationAttack(damagingEntity);
    });
  });
});

// scripts/game/pets/LiriliLarilaScript.ts
import {
  EntityDamageCause as EntityDamageCause14,
  Player as Player20,
  system as system47,
  world as world50
} from "@minecraft/server";
var Config20 = {
  StompAttackUpdateIntervals: 20 * 5,
  StompDamageAmount: 1,
  StompKnockbackYScalar: 1,
  StompKnockbackScale: 1,
  StompEntityQueryOptions: {
    families: ["monster"],
    maxDistance: 6
  }
};
var LastEntityAttackTS = {};
async function executeStompAttack(damagingEntity) {
  for (let i = 0; i < 3; i++) {
    damagingEntity.playAnimation("animation.melonbp_brp.lirililarila.attack");
    await system47.waitTicks(10);
  }
  for (const hitEntity of damagingEntity.dimension.getEntities({
    ...Config20.StompEntityQueryOptions,
    location: damagingEntity.location
  })) {
    let impulse = Vector3Utils.subtract(damagingEntity.location, hitEntity.location);
    impulse = Vector3Utils.normalize(impulse);
    impulse = Vector3Utils.add(impulse, { y: Config20.StompKnockbackYScalar });
    impulse = Vector3Utils.normalize(impulse);
    impulse = Vector3Utils.scale(impulse, Config20.StompKnockbackScale);
    hitEntity.applyDamage(Config20.StompDamageAmount, {
      cause: EntityDamageCause14.entityAttack,
      damagingEntity
    });
    hitEntity.applyImpulse(impulse);
    hitEntity.dimension.playSound("random.explode", hitEntity.location, { pitch: 0.5 });
  }
}
world50.afterEvents.worldLoad.subscribe(() => {
  world50.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    if (!(hurtEntity instanceof Player20) || damageSource.cause !== EntityDamageCause14.fall) {
      return;
    }
    const block = hurtEntity.dimension.getBlockBelow(hurtEntity.location);
    if (!block || !block.getTags().includes("sand") || !PetUtils.hasNearbyPetEntity(hurtEntity, { type: "melonbp_brp:lirililarila" /* LiriliLarila */ })) {
      return;
    }
    hurtEntity.addEffect(MinecraftEffectTypes.Speed, 20 * 5, { amplifier: 0 });
  });
  world50.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:lirililarila" /* LiriliLarila */) {
      return;
    }
    LastEntityAttackTS[damagingEntity.id] = system47.currentTick;
    if (RandomUtils.chance(0.5)) {
      return;
    }
    hitEntity.applyDamage(6, { cause: EntityDamageCause14.thorns, damagingEntity });
    hitEntity.dimension.spawnParticle(
      "minecraft:critical_hit_emitter",
      Vector3Utils.add(hitEntity.getHeadLocation(), { y: 1 })
    );
  });
});
system47.runInterval(() => {
  for (const damagingEntityId in LastEntityAttackTS) {
    const lastAttackTick = LastEntityAttackTS[damagingEntityId];
    const damagingEntity = world50.getEntity(damagingEntityId);
    if (!damagingEntity || !damagingEntity.isValid || system47.currentTick - lastAttackTick > Config20.StompAttackUpdateIntervals) {
      delete LastEntityAttackTS[damagingEntityId];
      continue;
    }
    executeStompAttack(damagingEntity);
  }
}, Config20.StompAttackUpdateIntervals);
system47.runInterval(() => {
  for (const player of world50.getAllPlayers()) {
    if (PetUtils.hasNearbyPetEntity(player, { type: "melonbp_brp:lirililarila" /* LiriliLarila */, maxDistance: 20 })) {
      const block = player.dimension.getBlockBelow(player.location);
      if (!block || !block.getTags().includes("sand")) {
        continue;
      }
      player.addEffect(MinecraftEffectTypes.JumpBoost, 20 * 5);
    }
  }
}, 20);

// scripts/game/pets/MatteoooScript.ts
import {
  EntityTameableComponent as EntityTameableComponent15,
  Player as Player21,
  system as system48,
  world as world51
} from "@minecraft/server";
function applyPassiveEffect(entity) {
  if (entity instanceof Player21) {
  }
  entity.addEffect(MinecraftEffectTypes.Absorption, 20 * 6);
}
world51.afterEvents.worldLoad.subscribe(() => {
  world51.afterEvents.entityLoad.subscribe(({ entity }) => {
    if (entity.hasTag("melonbp_brp:xp_double_effect")) {
      entity.removeTag("melonbp_brp:xp_double_effect");
    }
  });
});
system48.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({ type: "melonbp_brp:mateooo" /* Matteooo */ })) {
    if (!entity.hasTag("melonbp_brp:xp_double_effect")) {
      continue;
    }
    for (const xpOrb of entity.dimension.getEntities({
      type: MinecraftEntityTypes.XpOrb,
      location: entity.location,
      maxDistance: 20,
      excludeTags: ["melonbp_brp:xp_double_effect"]
    })) {
      const otherOrb = entity.dimension.spawnEntity(MinecraftEntityTypes.XpOrb, xpOrb.location);
      otherOrb.applyImpulse(Vector3Utils.scale({ ...RandomUtils.randomDirection(), y: 1 }, 0.3));
      otherOrb.addTag("melonbp_brp:xp_double_effect");
      xpOrb.addTag("melonbp_brp:xp_double_effect");
    }
  }
}, 12);
system48.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({ type: "melonbp_brp:mateooo" /* Matteooo */ })) {
    const tameableComponent = entity.getComponent(EntityTameableComponent15.componentId);
    if (tameableComponent.tamedToPlayer === void 0) {
      continue;
    }
    for (const other of entity.dimension.getEntities({
      location: entity.location,
      maxDistance: 24
    })) {
      if (other instanceof Player21) {
        if (tameableComponent.tamedToPlayer === other) {
          applyPassiveEffect(other);
        }
      } else {
        const otherTameableComponent = other.getComponent(EntityTameableComponent15.componentId);
        if (otherTameableComponent && otherTameableComponent.tamedToPlayer === tameableComponent.tamedToPlayer) {
          applyPassiveEffect(other);
        }
      }
    }
  }
}, 20 * 15);

// scripts/game/pets/NinjaCappuccinoScript.ts
import { system as system49, world as world52 } from "@minecraft/server";
var SurvivalEffectFunction2 = EntityDebounce(20 * 60);
var DecoyEntitiesMap = {};
function clearInvisibleEffect(entity) {
  if (!entity.hasTag("melonbp_brp:hidden")) {
    return;
  }
  entity.removeTag("melonbp_brp:hidden");
  entity.removeEffect(MinecraftEffectTypes.Invisibility);
  entity.triggerEvent("melonbp_brp:shown_behavior");
  const decoyEntity = DecoyEntitiesMap[entity.id];
  if (decoyEntity && decoyEntity.isValid) {
    decoyEntity.remove();
    delete DecoyEntitiesMap[entity.id];
  }
}
world52.afterEvents.worldLoad.subscribe(() => {
  world52.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */) {
      return;
    }
    const isLeft = RandomUtils.chance(0.5);
    let direction = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
    direction.y = 0;
    direction = Vector3Utils.normalize(direction);
    const rotated = isLeft ? { x: -direction.z, y: 0, z: direction.x } : { x: direction.z, y: 0, z: -direction.x };
    const finalKnockback = {
      x: rotated.x,
      y: 0.5,
      // Customize vertical lift
      z: rotated.z
    };
    const impulse = Vector3Utils.scale(Vector3Utils.normalize(finalKnockback), 1);
    hitEntity.applyImpulse(impulse);
  });
  world52.afterEvents.entityHurt.subscribe(({ hurtEntity }) => {
    if (hurtEntity.typeId === "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */ && hurtEntity.getEffect(MinecraftEffectTypes.Invisibility)) {
      clearInvisibleEffect(hurtEntity);
    } else if (hurtEntity.typeId === "melonbp_brp:ninjacapuccino_decoy" /* NinjaCappuccinoDecoy */) {
      for (const otherEntityId in DecoyEntitiesMap) {
        const other = world52.getEntity(otherEntityId);
        if (DecoyEntitiesMap[otherEntityId].id === hurtEntity.id && other && other.isValid) {
          clearInvisibleEffect(other);
        }
      }
    }
  });
});
system49.run(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */,
    tags: ["melonbp_brp:hidden"]
  })) {
    clearInvisibleEffect(entity);
  }
});
system49.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */,
    tags: ["melonbp_brp:hidden"]
  })) {
    if (entity.getEffect(MinecraftEffectTypes.Invisibility)) {
      continue;
    }
    clearInvisibleEffect(entity);
  }
}, 19);
system49.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:ninjacapuccino" /* NinjaCappuccino */,
    excludeTags: ["melonbp_brp:hidden"]
  })) {
    const { dimension, location } = entity;
    SurvivalEffectFunction2(entity, () => {
      if (entity.hasTag("melonbp_brp:hidden")) {
        return false;
      }
      entity.addTag("melonbp_brp:hidden");
      entity.addEffect(MinecraftEffectTypes.Invisibility, 20 * 10);
      entity.triggerEvent("melonbp_brp:hidden_behavior");
      const decoyEntity = entity.dimension.spawnEntity(
        "melonbp_brp:ninjacapuccino_decoy" /* NinjaCappuccinoDecoy */,
        location
      );
      decoyEntity.addTag("melonbp_brp.removable");
      DecoyEntitiesMap[entity.id] = decoyEntity;
      dimension.playSound("mob.breeze.shoot", location, { volume: 6e3, pitch: 0.8 });
      return true;
    });
  }
}, 21);
system49.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:ninjacapuccino_decoy" /* NinjaCappuccinoDecoy */
  })) {
    entity.tryTeleport(
      Vector3Utils.add(entity.location, Vector3Utils.scale(RandomUtils.randomDirection(), 8))
    );
  }
}, 20 * 3);

// scripts/game/pets/OrangutiniAnanasiniScript.ts
import { world as world53 } from "@minecraft/server";
var Config21 = {
  KnockbackScale: 3,
  SlownessEffectDuration: 20 * 3,
  SlownessEffectOptions: { amplifier: 9 }
};
world53.afterEvents.worldLoad.subscribe(() => {
  world53.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:orangutiniananasini" /* OrangutiniAnanasini */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 4) {
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      let impulseForce = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.scale(impulseForce, Config21.KnockbackScale);
      hitEntity.applyImpulse(impulseForce);
      hitEntity.addEffect(
        MinecraftEffectTypes.Slowness,
        Config21.SlownessEffectDuration,
        Config21.SlownessEffectOptions
      );
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
});

// scripts/game/pets/OrcaleroOrcalaScript.ts
import {
  EntityDamageCause as EntityDamageCause15,
  EntityTameableComponent as EntityTameableComponent16,
  Player as Player22,
  system as system50,
  world as world54
} from "@minecraft/server";
var OrcaleroPlayerSwimmingEffectFunction = EntityDebounce(20 * 30);
var OrcaleroPlayerAttackEffectFunction = EntityDebounce(20 * 10);
function hasPetNearby(player, options) {
  for (const entity of player.dimension.getEntities({
    ...options,
    type: "melonbp_brp:ocaleroorcala" /* OrcaleroOrcala */,
    location: player.location
  })) {
    const tameableComponent = entity.getComponent(EntityTameableComponent16.componentId);
    if (tameableComponent && tameableComponent.tamedToPlayer === player) {
      return true;
    }
  }
  return false;
}
async function activateBurstAttack2(entity) {
  const dimension = entity.dimension;
  const attackQuery = {
    families: ["monster"],
    location: entity.location,
    maxDistance: 12
  };
  const applyDamageOptions = {
    cause: EntityDamageCause15.entityAttack,
    damagingEntity: entity
  };
  for (let i = 0; i < 3; i++) {
    dimension.getEntities(attackQuery).forEach((hitEntity) => {
      if (!hitEntity.isValid) {
        return;
      }
      hitEntity.applyDamage(0.1, applyDamageOptions);
      let impulseForce = Vector3Utils.subtract(hitEntity.location, entity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      hitEntity.applyImpulse(impulseForce);
    });
    await system50.waitTicks(19);
  }
}
world54.afterEvents.worldLoad.subscribe(() => {
  world54.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:ocaleroorcala" /* OrcaleroOrcala */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 2) {
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      let impulseForce = damagingEntity.getViewDirection();
      impulseForce = Vector3Utils.add(impulseForce, { y: 1 });
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.scale(impulseForce, 1);
      damagingEntity.applyImpulse(impulseForce);
      system50.runTimeout(() => {
        damagingEntity.dimension.playSound("dig.grass", damagingEntity.location, {
          volume: 6e3,
          pitch: 0.6
        });
      }, 20);
      activateBurstAttack2(damagingEntity);
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
  world54.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (!(damagingEntity instanceof Player22)) {
      return;
    }
    if (!hasPetNearby(damagingEntity, { maxDistance: 24 })) {
      return;
    }
    OrcaleroPlayerAttackEffectFunction(damagingEntity, () => {
      let appliedAnyEffect = false;
      if (!damagingEntity.getEffect(MinecraftEffectTypes.Speed)) {
        damagingEntity.addEffect(MinecraftEffectTypes.Speed, 20 * 5, { amplifier: 2 });
        appliedAnyEffect = true;
      }
      if (!damagingEntity.getEffect(MinecraftEffectTypes.Strength)) {
        damagingEntity.addEffect(MinecraftEffectTypes.Strength, 20 * 5, { amplifier: 2 });
        appliedAnyEffect = true;
      }
      return appliedAnyEffect;
    });
  });
});
system50.runInterval(async () => {
  for (const player of world54.getAllPlayers()) {
    if (!player.isInWater) {
      continue;
    }
    if (hasPetNearby(player, { maxDistance: 32 })) {
      OrcaleroPlayerSwimmingEffectFunction(player, () => {
        let appliedAnyEffect = false;
        if (!player.getEffect(MinecraftEffectTypes.Speed)) {
          player.addEffect(MinecraftEffectTypes.Speed, 20 * 15);
          appliedAnyEffect = true;
        }
        if (!player.getEffect(MinecraftEffectTypes.Strength)) {
          player.addEffect(MinecraftEffectTypes.Strength, 20 * 15);
          appliedAnyEffect = true;
        }
        if (appliedAnyEffect) {
          player.playSound("vault.activate", { pitch: 1.7 });
        }
        return appliedAnyEffect;
      });
    }
    await system50.waitTicks(2);
  }
}, 20 * 3);

// scripts/game/pets/PakrahmatmamatScript.ts
import { EntityDamageCause as EntityDamageCause16, EntityInventoryComponent as EntityInventoryComponent8, system as system51, world as world55 } from "@minecraft/server";
var entityTargetList = {};
world55.afterEvents.worldLoad.subscribe(() => {
  world55.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:pakrahmatmamat" /* Pakrahmatmamat */) {
      entityTargetList[damagingEntity.id] = entityTargetList[damagingEntity.id] ?? [];
      if (!entityTargetList[damagingEntity.id].includes(hitEntity.id)) {
        entityTargetList[damagingEntity.id].push(hitEntity.id);
      }
    }
  });
});
system51.runInterval(() => {
  for (const attackerId in entityTargetList) {
    for (const entityId of entityTargetList[attackerId]) {
      const entity = world55.getEntity(entityId);
      if (entity && entity.isValid) {
        entity.dimension.spawnParticle(
          "melonbp_brp:exclamation_mark",
          Vector3Utils.add(entity.getHeadLocation(), { y: 1 })
        );
      }
    }
  }
}, 12);
system51.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:pakrahmatmamat" /* Pakrahmatmamat */
  })) {
    const inventoryComponent = entity.getComponent(EntityInventoryComponent8.componentId);
    if (inventoryComponent) {
      for (let slot = 0; slot < inventoryComponent.container.size; slot++) {
        const itemStack = inventoryComponent.container.getItem(slot);
        if (itemStack && itemStack.amount === 64) {
          for (const player of world55.getAllPlayers()) {
            if (PetUtils.isTamedToPlayer(entity, player)) {
              player.addEffect(MinecraftEffectTypes.InstantHealth, 1);
              inventoryComponent.container.setItem(slot, void 0);
              player.playSound("note.pling", { pitch: 1.8 });
            }
          }
          break;
        }
      }
    }
  }
}, 20 * 2);
system51.runInterval(() => {
  for (const attackerId in entityTargetList) {
    const damagingEntity = world55.getEntity(attackerId);
    if (damagingEntity && damagingEntity.isValid) {
      damagingEntity.playAnimation("animation.melonbp_brp.pakrahmatmamat.attack2");
      for (const entityId of entityTargetList[attackerId]) {
        const entity = world55.getEntity(entityId);
        if (entity && entity.isValid) {
          let impulse = Vector3Utils.subtract(damagingEntity.location, entity.location);
          impulse = Vector3Utils.normalize(impulse);
          impulse = Vector3Utils.add(impulse, { y: 1 });
          impulse = Vector3Utils.normalize(impulse);
          impulse = Vector3Utils.scale(impulse, 3);
          entity.applyImpulse(impulse);
          system51.runTimeout(() => {
            if (entity.isValid && damagingEntity.isValid) {
              entity.applyDamage(10, { cause: EntityDamageCause16.entityAttack, damagingEntity });
            }
          }, 10);
        }
      }
    }
    delete entityTargetList[attackerId];
  }
}, 20 * 6);

// scripts/game/pets/PotHotSpotScript.ts
import { world as world56 } from "@minecraft/server";
world56.afterEvents.worldLoad.subscribe(() => {
  world56.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:pothotspot" /* PotHotSpot */) {
      hitEntity.addEffect(MinecraftEffectTypes.Weakness, 20 * 5);
    }
  });
});

// scripts/game/pets/RhinoToasterinoScript.ts
import { world as world57 } from "@minecraft/server";
var Config22 = {
  FireTimeInSeconds: 5,
  FlingChance: 0.2,
  FlingImpulseScale: 1.5,
  FlingImpulseYScalar: 0.45
};
world57.afterEvents.worldLoad.subscribe(() => {
  world57.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:rhinotoasterino" /* RhinoToasterino */) {
      return;
    }
    if (RandomUtils.chance(Config22.FlingChance)) {
      let impulseForce = Vector3Utils.subtract(damagingEntity.location, hitEntity.location);
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.add(impulseForce, { y: Config22.FlingImpulseYScalar });
      impulseForce = Vector3Utils.normalize(impulseForce);
      impulseForce = Vector3Utils.scale(impulseForce, Config22.FlingImpulseScale);
      hitEntity.applyImpulse(impulseForce);
    }
    hitEntity.setOnFire(Config22.FireTimeInSeconds);
  });
});

// scripts/game/pets/SigmaBoyScript.ts
import { EntityDamageCause as EntityDamageCause17, EntityItemComponent as EntityItemComponent3, ItemStack as ItemStack11, system as system52, world as world58 } from "@minecraft/server";
var Config23 = {
  CookItemDict: {
    [MinecraftItemTypes.Beef]: MinecraftItemTypes.CookedBeef,
    [MinecraftItemTypes.Chicken]: MinecraftItemTypes.CookedChicken,
    [MinecraftItemTypes.Cod]: MinecraftItemTypes.CookedCod,
    [MinecraftItemTypes.Mutton]: MinecraftItemTypes.CookedMutton,
    [MinecraftItemTypes.Porkchop]: MinecraftItemTypes.CookedPorkchop,
    [MinecraftItemTypes.Rabbit]: MinecraftItemTypes.CookedRabbit,
    [MinecraftItemTypes.Salmon]: MinecraftItemTypes.CookedSalmon
  }
};
world58.afterEvents.worldLoad.subscribe(() => {
  world58.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (hitEntity.typeId === "melonbp_brp:sigmaboy" /* SigmaBoy */ && RandomUtils.chance(0.15)) {
      hitEntity.addEffect(MinecraftEffectTypes.InstantHealth, 1, { amplifier: 1 });
      damagingEntity.applyDamage(4, {
        cause: EntityDamageCause17.entityAttack,
        damagingEntity: hitEntity
      });
    }
    if (damagingEntity.typeId === "melonbp_brp:sigmaboy" /* SigmaBoy */) {
      damagingEntity.teleport(
        Vector3Utils.subtract(hitEntity.location, hitEntity.getViewDirection())
      );
    }
  });
});
system52.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({ type: "melonbp_brp:sigmaboy" /* SigmaBoy */ })) {
    for (const itemEntity of entity.dimension.getEntities({
      type: "minecraft:item",
      location: entity.location,
      maxDistance: 4
    })) {
      const itemComponent = itemEntity.getComponent(EntityItemComponent3.componentId);
      if (!itemComponent) {
        continue;
      }
      const result = Config23.CookItemDict[itemComponent.itemStack.typeId];
      if (result) {
        entity.dimension.spawnItem(
          new ItemStack11(result, itemComponent.itemStack.amount),
          itemEntity.location
        );
        entity.dimension.playSound("extinguish.candle", itemEntity.location);
        entity.dimension.spawnParticle("minecraft:basic_smoke_particle", itemEntity.location);
        itemEntity.remove();
        break;
      }
    }
  }
}, 30);

// scripts/game/pets/SirOrangeGiraffeScript.ts
import { Player as Player23, system as system53, world as world59 } from "@minecraft/server";
var SnowballAttackFunction = EntityDebounce(20 * 10);
world59.afterEvents.worldLoad.subscribe(() => {
  world59.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (hitEntity.typeId === "melonbp_brp:sirorangegiraffe" /* SirOrangeGiraffe */ && damagingEntity instanceof Player23) {
      damagingEntity.addEffect(MinecraftEffectTypes.Nausea, 20 * 3);
    }
    if (damagingEntity.typeId === "melonbp_brp:sirorangegiraffe" /* SirOrangeGiraffe */) {
      SnowballAttackFunction(damagingEntity, () => {
        system53.run(async () => {
          for (let i = 0; i < 4; i++) {
            if (!damagingEntity.isValid) {
              break;
            }
            const location = Vector3Utils.add(
              damagingEntity.getHeadLocation(),
              Vector3Utils.scale(damagingEntity.getViewDirection(), 1.2)
            );
            const snowball = damagingEntity.dimension.spawnEntity(
              MinecraftEntityTypes.Snowball,
              location
            );
            hitEntity.dimension.playSound("mob.snowgolem.shoot", location, { pitch: 1.1 });
            snowball.applyImpulse(Vector3Utils.scale(damagingEntity.getViewDirection(), 2));
            await system53.waitTicks(10);
          }
        });
        return true;
      });
    }
  });
});

// scripts/game/pets/SneakerSharkScript.ts
import { EntityDamageCause as EntityDamageCause18, Player as Player24, system as system54, world as world60 } from "@minecraft/server";
var PlayerSwimmingEffectFunction = EntityDebounce(20 * 30);
function activateLeapAttack(damagingEntity) {
  let impulseForce = { ...damagingEntity.getViewDirection(), y: 1 };
  impulseForce = Vector3Utils.normalize(impulseForce);
  damagingEntity.applyImpulse(impulseForce);
  const { dimension, location } = damagingEntity;
  for (const other of dimension.getEntities({
    location,
    maxDistance: 6,
    families: ["monster"]
  })) {
    other.applyDamage(2, { cause: EntityDamageCause18.entityAttack, damagingEntity });
    other.applyImpulse(
      Vector3Utils.normalize(Vector3Utils.subtract(other.location, damagingEntity.location))
    );
    dimension.playSound("armor.crack_wolf", other.location, { pitch: 0.7 });
  }
  dimension.playSound("mob.camel.dash", location, { pitch: 2 });
}
world60.afterEvents.worldLoad.subscribe(() => {
  world60.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity instanceof Player24 && PetUtils.hasNearbyPetEntity(damagingEntity, {
      type: "melonbp_brp:sneakershark" /* SneakerShark */,
      maxDistance: 32
    })) {
      damagingEntity.addEffect(MinecraftEffectTypes.Speed, 20 * 3);
      damagingEntity.addEffect(MinecraftEffectTypes.JumpBoost, 20 * 3);
    }
  });
  world60.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:sneakershark" /* SneakerShark */) {
      return;
    }
    PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 5, () => {
      activateLeapAttack(damagingEntity);
    });
  });
});
system54.runInterval(async () => {
  for (const player of world60.getAllPlayers()) {
    if (!player.isInWater) {
      continue;
    }
    if (PetUtils.hasNearbyPetEntity(player, {
      type: "melonbp_brp:sneakershark" /* SneakerShark */,
      maxDistance: 32
    })) {
      PlayerSwimmingEffectFunction(player, () => {
        let appliedAnyEffect = false;
        if (!player.getEffect(MinecraftEffectTypes.Speed)) {
          player.addEffect(MinecraftEffectTypes.Speed, 20 * 15);
          appliedAnyEffect = true;
        }
        if (!player.getEffect(MinecraftEffectTypes.Strength)) {
          player.addEffect(MinecraftEffectTypes.Strength, 20 * 15);
          appliedAnyEffect = true;
        }
        return appliedAnyEffect;
      });
    }
    await system54.waitTicks(2);
  }
}, 20 * 3);

// scripts/game/pets/SvininoTNTScript.ts
import { DimensionTypes as DimensionTypes4, EntityTameableComponent as EntityTameableComponent17, system as system55, world as world61 } from "@minecraft/server";
var ExplosiveAttackFunction = EntityDebounce(20 * 10);
world61.afterEvents.worldLoad.subscribe(() => {
  world61.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:svininotnt" /* SvininoTNT */) {
      return;
    }
    ExplosiveAttackFunction(damagingEntity, () => {
      system55.runTimeout(
        () => damagingEntity.dimension.createExplosion(damagingEntity.location, 2, {
          source: damagingEntity
        }),
        23
      );
      return true;
    });
  });
  world61.afterEvents.playerInteractWithEntity.subscribe(({ player, target }) => {
    if (target.typeId !== "melonbp_brp:svininotnt" /* SvininoTNT */) {
      return;
    }
    const tameableComponent = target.getComponent(EntityTameableComponent17.componentId);
    if (!tameableComponent || tameableComponent.tamedToPlayer !== player) {
      return;
    }
    const expInStorage = Number(target.getProperty("melonbp_brp:exp_storange"));
    if (expInStorage === 0) {
      return;
    }
    player.playSound("random.orb");
    player.addExperience(expInStorage);
    target.setProperty("melonbp_brp:exp_storange", 0);
  });
});
system55.runInterval(() => {
  for (const dimensionType of DimensionTypes4.getAll()) {
    const dimenion = world61.getDimension(dimensionType.typeId);
    if (!dimenion) {
      continue;
    }
    for (const entity of dimenion.getEntities({ type: "melonbp_brp:svininotnt" /* SvininoTNT */ })) {
      for (const orbEntity of dimenion.getEntities({
        location: entity.location,
        minDistance: 1,
        maxDistance: 15,
        type: MinecraftEntityTypes.XpOrb
      })) {
        let direction = Vector3Utils.subtract(entity.location, orbEntity.location);
        direction = Vector3Utils.normalize(direction);
        direction = Vector3Utils.add(direction, { y: 0.1 });
        direction = Vector3Utils.normalize(direction);
        direction = Vector3Utils.scale(direction, 0.6);
        orbEntity.applyImpulse(direction);
      }
      for (const orbEntity of dimenion.getEntities({
        location: entity.location,
        maxDistance: 2,
        type: MinecraftEntityTypes.XpOrb
      })) {
        orbEntity.remove();
        const expInStorage = Number(entity.getProperty("melonbp_brp:exp_storange"));
        entity.setProperty("melonbp_brp:exp_storange", expInStorage + 1);
      }
    }
  }
}, 12);

// scripts/game/pets/TaTaTaSahurScript.ts
import { world as world62 } from "@minecraft/server";
var Config24 = {
  SlownessEffectChance: 0.5,
  SlownessEffectDuration: 20 * 20
};
world62.afterEvents.worldLoad.subscribe(() => {
  world62.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:tatatatasahur" /* TaTaTaSahur */) {
      return;
    }
    if (RandomUtils.chance(Config24.SlownessEffectChance)) {
      hitEntity.addEffect(MinecraftEffectTypes.Slowness, Config24.SlownessEffectDuration);
    }
  });
});

// scripts/game/pets/TiTuTiTuTiTaBuuScript.ts
import { BlockVolume as BlockVolume8, EntityTameableComponent as EntityTameableComponent18, Player as Player25, system as system56, world as world63 } from "@minecraft/server";
var PlayerAttackFeatureFunction = EntityDebounce(20 * 20);
var PetAttackFeatureFunction = EntityDebounce(20 * 20);
world63.afterEvents.worldLoad.subscribe(() => {
  world63.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity instanceof Player25 && PetUtils.hasNearbyPetEntity(damagingEntity, {
      type: "melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */,
      maxDistance: 32
    })) {
      PlayerAttackFeatureFunction(damagingEntity, () => {
        if (!damagingEntity.getEffect(MinecraftEffectTypes.Resistance)) {
          damagingEntity.addEffect(MinecraftEffectTypes.Resistance, 20 * 3);
          return true;
        }
        return false;
      });
      for (const entity of damagingEntity.dimension.getEntities({
        type: "melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */,
        location: damagingEntity.location,
        maxDistance: 32
      })) {
        const parentTameableComponent = entity.getComponent(EntityTameableComponent18.componentId);
        if (PetUtils.isTamedToPlayer(entity, damagingEntity)) {
          PetAttackFeatureFunction(entity, () => {
            for (let i = 0; i < 2; i++) {
              const beeEntity = damagingEntity.dimension.spawnEntity(
                "melonbp_brp:angry_bee",
                entity.getHeadLocation()
              );
              beeEntity.addTag("melonbp_brp:removable");
              system56.runTimeout(() => {
                if (beeEntity.isValid) {
                  beeEntity.remove();
                }
              }, 20 * 10);
              const tameableComponent = beeEntity.getComponent(EntityTameableComponent18.componentId);
              if (tameableComponent && parentTameableComponent.tamedToPlayer) {
                tameableComponent.tame(parentTameableComponent.tamedToPlayer);
              }
            }
            return true;
          });
        }
      }
    }
  });
  world63.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:titutitutitabuu" /* TiTuTiTuTiTaBuu */ && RandomUtils.chance(0.05)) {
      for (const blockLocation of new BlockVolume8(
        Vector3Utils.subtract(damagingEntity.location, { x: 1, y: 1, z: 1 }),
        Vector3Utils.add(damagingEntity.location, { x: 1, y: 1, z: 1 })
      ).getBlockLocationIterator()) {
        const block = damagingEntity.dimension.getBlock(blockLocation);
        if (block && block.isValid && block.hasTag("minecraft:is_shovel_item_destructible")) {
          damagingEntity.runCommand(
            `execute positioned ${block.x} ${block.y} ${block.z} run fill ~~~ ~~~ minecraft:air destroy`
          );
        }
      }
    }
  });
});

// scripts/game/pets/TrenostruzzoTurbo3000Script.ts
import {
  BlockVolume as BlockVolume9,
  EntityDamageCause as EntityDamageCause19,
  system as system57,
  world as world64
} from "@minecraft/server";
system57.beforeEvents.startup.subscribe(() => {
  world64.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId === "melonbp_brp:trenostruzzoturbo3000" /* TrenostruzzoTurbo3000 */) {
      PetUtils.executeAttackFunctionOrIncrement(damagingEntity, 5, async () => {
        damagingEntity.applyImpulse(Vector3Utils.scale(damagingEntity.getViewDirection(), 5));
        for (let i = 0; i < 5; i++) {
          for (const hitEntity of damagingEntity.dimension.getEntities({
            families: ["monster"],
            location: damagingEntity.location,
            maxDistance: 3
          })) {
            hitEntity.applyDamage(2, { cause: EntityDamageCause19.entityAttack, damagingEntity });
          }
          await system57.waitTicks(4);
        }
      });
    }
  });
});

// scripts/game/pets/TricTracBarabumScript.ts
import {
  EntityTameableComponent as EntityTameableComponent19,
  system as system58,
  world as world65
} from "@minecraft/server";
var Config25 = {
  HostileEntityQueryOptions: {
    maxDistance: 8,
    families: ["creeper"]
  }
};
var SendHostileSirenSFXFunction = EntityDebounce(20 * 8);
var SendHostileSirenParticleFunction = EntityDebounce(20 * 2);
function activateSepcialAttack(attacker) {
  for (const other of attacker.dimension.getEntities({
    location: attacker.location,
    maxDistance: 6,
    families: ["monster"]
  })) {
    other.applyImpulse(
      Vector3Utils.normalize(Vector3Utils.subtract(other.location, attacker.location))
    );
  }
}
function getNearbyPet(player) {
  for (const entity of player.dimension.getEntities({
    type: "melonbp_brp:trictracbarabum" /* TricTracBarabum */,
    location: player.location,
    maxDistance: 24
  })) {
    const tameableComponent = entity.getComponent(EntityTameableComponent19.componentId);
    if (tameableComponent && tameableComponent.tamedToPlayer === player) {
      return entity;
    }
  }
  return void 0;
}
function isHostileEntityNearby(player) {
  return player.dimension.getEntities({ ...Config25.HostileEntityQueryOptions, location: player.location }).length > 0;
}
world65.afterEvents.worldLoad.subscribe(() => {
  world65.afterEvents.entityHitEntity.subscribe(({ damagingEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:trictracbarabum" /* TricTracBarabum */) {
      return;
    }
    const attackCount = damagingEntity.getProperty("melonbp_brp:attack_counter") ?? 0;
    if (attackCount === 2) {
      activateSepcialAttack(damagingEntity);
      damagingEntity.setProperty("melonbp_brp:attack_counter", 0);
      return;
    }
    damagingEntity.setProperty("melonbp_brp:attack_counter", attackCount + 1);
  });
});
system58.runInterval(() => {
  for (const player of world65.getAllPlayers()) {
    if (!isHostileEntityNearby(player)) {
      continue;
    }
    const myPetEntity = getNearbyPet(player);
    if (!myPetEntity) {
      continue;
    }
    SendHostileSirenSFXFunction(player, () => {
      player.dimension.playSound("melonbp.brp.siren", player.location);
      return true;
    });
    SendHostileSirenParticleFunction(myPetEntity, () => {
      const location = {
        ...myPetEntity.location,
        dimension: myPetEntity.dimension
      };
      system58.run(async () => {
        for (let i = 0; i < 5; i++) {
          location.dimension.spawnParticle("minecraft:campfire_tall_smoke_particle", location);
          location.dimension.playSound("note.iron_xylophone", location, { volume: 600, pitch: 0.2 });
          await system58.waitTicks(4);
        }
      });
      return true;
    });
  }
}, 20);

// scripts/game/pets/TripiTropiTropaTripaScript.ts
import { world as world66 } from "@minecraft/server";
var Config26 = {
  PoisonEffectChance: 0.5,
  PoisonEffectDuration: 20 * 5
};
world66.afterEvents.worldLoad.subscribe(() => {
  world66.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:tripitropitropatripa" /* TripiTropiTropaTripa */) {
      return;
    }
    if (RandomUtils.chance(Config26.PoisonEffectChance)) {
      hitEntity.addEffect(MinecraftEffectTypes.FatalPoison, Config26.PoisonEffectDuration);
    }
  });
});

// scripts/game/pets/TrulimeroTrulichinaScript.ts
import { system as system59, EntityItemComponent as EntityItemComponent4, ItemStack as ItemStack12, world as world67 } from "@minecraft/server";
var Config27 = {
  CookItemDict: {
    [MinecraftItemTypes.Cod]: "melonbp_brp:golden_cod" /* GoldenCod */,
    [MinecraftItemTypes.Salmon]: "melonbp_brp:golden_salmon" /* GoldenSalmon */
  }
};
var DebounceFn3 = EntityDebounce(20 * 30);
system59.beforeEvents.startup.subscribe(() => {
  world67.afterEvents.entityHurt.subscribe(({ hurtEntity, damageSource }) => {
    if (hurtEntity.typeId === "melonbp_brp:trulimerotrulichina" /* TrulimeroTrulichina */ && damageSource !== void 0) {
      DebounceFn3(hurtEntity, () => {
        for (let i = 0; i < 1 + Math.ceil(2 * Math.random()); i++) {
          const minion = hurtEntity.dimension.spawnEntity(
            "melonbp_brp:trulimerotrulichina_minion" /* TrulimeroTrulichinaMinion */,
            hurtEntity.location
          );
          minion.addTag("melonbp_brp.removable");
          system59.runTimeout(() => {
            if (minion && minion.isValid) {
              minion.remove();
            }
          }, 20 * 10);
        }
        return true;
      });
    }
  });
});
system59.runInterval(() => {
  for (const entity of EntityUtils.getAllEntitiesIterator({
    type: "melonbp_brp:trulimerotrulichina" /* TrulimeroTrulichina */
  })) {
    for (const itemEntity of entity.dimension.getEntities({
      type: "minecraft:item",
      location: entity.location,
      maxDistance: 4
    })) {
      const itemComponent = itemEntity.getComponent(EntityItemComponent4.componentId);
      if (!itemComponent) {
        continue;
      }
      const result = Config27.CookItemDict[itemComponent.itemStack.typeId];
      if (result) {
        entity.dimension.spawnItem(
          new ItemStack12(result, itemComponent.itemStack.amount),
          itemEntity.location
        );
        entity.dimension.playSound("extinguish.candle", itemEntity.location);
        entity.dimension.spawnParticle("minecraft:basic_smoke_particle", itemEntity.location);
        itemEntity.remove();
        break;
      }
    }
  }
}, 30);

// scripts/game/pets/UdinDinDinDunMadinScript.ts
import { world as world68 } from "@minecraft/server";
world68.afterEvents.worldLoad.subscribe(() => {
  world68.afterEvents.entityHitEntity.subscribe(({ damagingEntity, hitEntity }) => {
    if (damagingEntity.typeId !== "melonbp_brp:udindindindunmadindindindun" /* UdinDinDinDunMadin */) {
      return;
    }
    const isLeft = RandomUtils.chance(0.5);
    let direction = Vector3Utils.subtract(hitEntity.location, damagingEntity.location);
    direction.y = 0;
    direction = Vector3Utils.normalize(direction);
    const rotated = isLeft ? { x: -direction.z, y: 0, z: direction.x } : { x: direction.z, y: 0, z: -direction.x };
    const finalKnockback = {
      x: rotated.x,
      y: 0.5,
      // Customize vertical lift
      z: rotated.z
    };
    const impulse = Vector3Utils.scale(Vector3Utils.normalize(finalKnockback), 2);
    hitEntity.applyImpulse(impulse);
  });
});

//# sourceMappingURL=../debug/main.js.map
