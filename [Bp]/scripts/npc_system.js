import { world, system } from "@minecraft/server";
import { openRankShop, openRankKitMenu } from "./ui_shop.js";

world.afterEvents.playerInteractWithEntity.subscribe((event) => {
    const { target: entity, player } = event;

    if (entity.typeId === "admud:rankshop") {
        system.run(() => openRankShop(player));
    } 
    else if (entity.typeId === "admud:rankkit") {
        system.run(() => openRankKitMenu(player));
    }
});