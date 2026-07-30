interface SysReqs {
  os: string; cpu: string; ram: string; gpu: string; storage: string
}
interface DlcItem {
  name: string; price: number; description: string
}

export const systemRequirements: Record<string, SysReqs> = {
  "gta-v": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3470 / AMD FX-8350", ram: "8 GB", gpu: "NVIDIA GTX 660 2GB / AMD HD 7870 2GB", storage: "72 GB" },
  "rdr2": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD FX-6300", ram: "8 GB", gpu: "NVIDIA GTX 770 2GB / AMD Radeon R9 280 3GB", storage: "150 GB" },
  "elden-ring": { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X", ram: "12 GB", gpu: "NVIDIA GTX 1060 3GB / AMD RX 580 4GB", storage: "60 GB" },
  "cyberpunk-2077": { os: "Windows 10 64-bit", cpu: "Intel Core i7-6700 / AMD Ryzen 5 1600", ram: "12 GB", gpu: "NVIDIA GTX 1060 6GB / AMD RX 580 8GB", storage: "70 GB" },
  "the-witcher-3": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD Phenom II X4 940", ram: "6 GB", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "35 GB" },
  "baldurs-gate-3": { os: "Windows 10 64-bit", cpu: "Intel Core i5-4690 / AMD Ryzen 3 3200G", ram: "8 GB", gpu: "NVIDIA GTX 970 / AMD RX 480", storage: "150 GB" },
  "skyrim": { os: "Windows 7 64-bit", cpu: "Intel Core i5-750 / AMD Phenom II X4 945", ram: "8 GB", gpu: "NVIDIA GTX 470 / AMD HD 7870", storage: "12 GB" },
  "god-of-war-ragnarok": { os: "Windows 10 64-bit", cpu: "Intel Core i5-4670K / AMD Ryzen 3 1200", ram: "8 GB", gpu: "NVIDIA GTX 1060 / AMD RX 5500 XT", storage: "70 GB" },
  "ghost-of-tsushima": { os: "Windows 10 64-bit", cpu: "Intel Core i3-8100 / AMD Ryzen 3 3100", ram: "8 GB", gpu: "NVIDIA GTX 960 / AMD RX 5500 XT", storage: "75 GB" },
  "sekiro": { os: "Windows 7 64-bit", cpu: "Intel Core i3-2100 / AMD FX-6300", ram: "4 GB", gpu: "NVIDIA GTX 760 / AMD HD 7950", storage: "25 GB" },
  "hades": { os: "Windows 10 64-bit", cpu: "Intel Core i5-4670K / AMD FX-8350", ram: "8 GB", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "15 GB" },
  "doom-eternal": { os: "Windows 10 64-bit", cpu: "Intel Core i5-6600K / AMD Ryzen 3 1300X", ram: "8 GB", gpu: "NVIDIA GTX 1060 / AMD RX 480", storage: "80 GB" },
  "portal-2": { os: "Windows 7 64-bit", cpu: "Intel Core 2 Duo E8400 / AMD Athlon 64 X2 6000+", ram: "2 GB", gpu: "NVIDIA GeForce 7600 GS / AMD HD 2400", storage: "8 GB" },
  "hollow-knight": { os: "Windows 10 64-bit", cpu: "Intel Core 2 Duo E5200", ram: "4 GB", gpu: "NVIDIA GeForce 9800 GT / AMD HD 5770", storage: "9 GB" },
  "stardew-valley": { os: "Windows 10", cpu: "Intel Core 2 Duo 2.0 GHz", ram: "2 GB", gpu: "128 MB video memory", storage: "500 MB" },
  "dark-souls-3": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD FX-6300", ram: "8 GB", gpu: "NVIDIA GTX 750 Ti / AMD HD 6870", storage: "25 GB" },
  "disco-elysium": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2500K / AMD FX-6300", ram: "8 GB", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "22 GB" },
  "control": { os: "Windows 10 64-bit", cpu: "Intel Core i5-4690 / AMD FX-8350", ram: "8 GB", gpu: "NVIDIA GTX 780 / AMD R9 280", storage: "42 GB" },
  "death-stranding": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3470 / AMD Ryzen 3 1200", ram: "8 GB", gpu: "NVIDIA GTX 1050 / AMD RX 560", storage: "80 GB" },
  "fallout-4": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2300 / AMD Phenom II X4 945", ram: "8 GB", gpu: "NVIDIA GTX 550 Ti / AMD HD 7870", storage: "30 GB" },
  "half-life-alyx": { os: "Windows 10 64-bit", cpu: "Intel Core i5-7500 / AMD Ryzen 5 1600", ram: "12 GB", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "67 GB" },
  "no-man-sky": { os: "Windows 10 64-bit", cpu: "Intel Core i3-6300 / AMD FX-4350", ram: "8 GB", gpu: "NVIDIA GTX 780 / AMD R9 280X", storage: "15 GB" },
  "valheim": { os: "Windows 10 64-bit", cpu: "Intel Core i5-6500 / AMD Ryzen 3 1200", ram: "8 GB", gpu: "NVIDIA GTX 960 / AMD R9 380", storage: "1 GB" },
  "subnautica": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2300 / AMD FX-4300", ram: "8 GB", gpu: "NVIDIA GTX 550 Ti / AMD HD 5770", storage: "20 GB" },
  "rimworld": { os: "Windows 10 64-bit", cpu: "Intel Core i3-6100 / AMD FX-6300", ram: "6 GB", gpu: "Intel HD 4000", storage: "2 GB" },
  "satisfactory": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3570 / AMD Ryzen 3 1300X", ram: "8 GB", gpu: "NVIDIA GTX 760 / AMD R9 270X", storage: "15 GB" },
  "factorio": { os: "Windows 10 64-bit", cpu: "Intel Core 2 Duo E4400", ram: "4 GB", gpu: "512 MB video memory", storage: "3 GB" },
  "cities-skylines": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3470 / AMD FX-6300", ram: "6 GB", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "4 GB" },
  "forza-horizon-5": { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 5 1500X", ram: "8 GB", gpu: "NVIDIA GTX 1070 / AMD RX 590", storage: "110 GB" },
  "street-fighter-6": { os: "Windows 10 64-bit", cpu: "Intel Core i5-7500 / AMD Ryzen 3 1200", ram: "8 GB", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "25 GB" },
  "hogwarts-legacy": { os: "Windows 10 64-bit", cpu: "Intel Core i5-6600 / AMD Ryzen 3 1300X", ram: "16 GB", gpu: "NVIDIA GTX 960 / AMD RX 470", storage: "85 GB" },
  "helldivers-2": { os: "Windows 10 64-bit", cpu: "Intel Core i7-4790K / AMD Ryzen 5 1500X", ram: "8 GB", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "60 GB" },
  "palworld": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3570 / AMD FX-6300", ram: "8 GB", gpu: "NVIDIA GTX 1050 / AMD R9 280", storage: "40 GB" },
  "dying-light-2": { os: "Windows 10 64-bit", cpu: "Intel Core i3-9100 / AMD Ryzen 3 2300X", ram: "8 GB", gpu: "NVIDIA GTX 1050 Ti / AMD RX 560", storage: "60 GB" },
  "returnal": { os: "Windows 10 64-bit", cpu: "Intel Core i5-6400 / AMD Ryzen 5 2600", ram: "12 GB", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "60 GB" },
  "lies-of-p": { os: "Windows 10 64-bit", cpu: "Intel Core i5-8400 / AMD Ryzen 3 3300X", ram: "12 GB", gpu: "NVIDIA GTX 1060 / AMD RX 580", storage: "50 GB" },
  "dead-space-remake": { os: "Windows 10 64-bit", cpu: "Intel Core i5-8600 / AMD Ryzen 5 2600", ram: "16 GB", gpu: "NVIDIA GTX 1070 / AMD RX 5700", storage: "50 GB" },
  "it-takes-two": { os: "Windows 10 64-bit", cpu: "Intel Core i5-3570K / AMD FX-8350", ram: "8 GB", gpu: "NVIDIA GTX 660 / AMD HD 7870", storage: "50 GB" },
  "stray": { os: "Windows 10 64-bit", cpu: "Intel Core i5-2300 / AMD FX-4300", ram: "8 GB", gpu: "NVIDIA GTX 650 / AMD HD 7750", storage: "10 GB" },
}

export const dlcData: Record<string, DlcItem[]> = {
  "gta-v": [
    { name: "GTA Online: Criminal Enterprise Starter Pack", price: 9.99, description: "Jumpstart your criminal empire with properties, vehicles, and weapons." },
    { name: "GTA V: Megalodon Shark Card", price: 99.99, description: "Get a massive cash bonus to spend in GTA Online." },
    { name: "GTA V: Great White Shark Card", price: 19.99, description: "A substantial cash deposit for GTA Online." },
  ],
  "rdr2": [
    { name: "Red Dead Online: 55 Gold Bars", price: 19.99, description: "Gold bars for Red Dead Online." },
    { name: "Red Dead Online: Outlaw Pass", price: 9.99, description: "Premium battle pass with exclusive items." },
  ],
  "cyberpunk-2077": [
    { name: "Phantom Liberty", price: 29.99, description: "The spy-thriller expansion for Cyberpunk 2077. New district, story, and characters." },
  ],
  "the-witcher-3": [
    { name: "Hearts of Stone", price: 9.99, description: "New adventures in the No Man's Land and Oxenfurt." },
    { name: "Blood and Wine", price: 19.99, description: "A brand new 30+ hour adventure in the land of Toussaint." },
  ],
  "skyrim": [
    { name: "Dawnguard", price: 19.99, description: "Join the Dawnguard or become a vampire lord." },
    { name: "Hearthfire", price: 4.99, description: "Build your own home and adopt children." },
    { name: "Dragonborn", price: 19.99, description: "Travel to Solstheim and confront the first Dragonborn." },
  ],
  "fallout-4": [
    { name: "Far Harbor", price: 24.99, description: "A mystery case takes you to a remote island." },
    { name: "Nuka-World", price: 19.99, description: "Take over a vast amusement park and become a raider." },
    { name: "Automatron", price: 9.99, description: "Mysterious robotic threats are appearing across the Commonwealth." },
  ],
  "doom-eternal": [
    { name: "The Ancient Gods Part One", price: 19.99, description: "Continue the Slayer's saga with new battles." },
    { name: "The Ancient Gods Part Two", price: 19.99, description: "The epic conclusion to the DOOM Slayer's story." },
  ],
  "borderlands-3": [
    { name: "Moxxi's Heist of the Handsome Jackpot", price: 14.99, description: "Rob the ultimate casino heist." },
    { name: "Guns, Love, and Tentacles", price: 14.99, description: "A wedding adventure on the planet Xylourgos." },
    { name: "Bounty of Blood", price: 14.99, description: "A wild west adventure on Gehenna." },
    { name: "Psycho Krieg and the Fantastic Fustercluck", price: 14.99, description: "Explore Krieg's mind in this DLC." },
  ],
  "control": [
    { name: "The Foundation", price: 14.99, description: "Explore the origins of the Federal Bureau of Control." },
    { name: "AWE", price: 14.99, description: "Cross over with Alan Wake in this horror-themed expansion." },
  ],
  "dead-cells": [
    { name: "The Bad Seed", price: 4.99, description: "New biomes and boss encounter." },
    { name: "Fatal Falls", price: 4.99, description: "New alternative levels and weapons." },
    { name: "The Queen and the Sea", price: 4.99, description: "The final DLC with new ending." },
  ],
  "cities-skylines": [
    { name: "Mass Transit", price: 12.99, description: "New public transit options." },
    { name: "Parklife", price: 12.99, description: "Build and manage parks and city attractions." },
    { name: "Industries", price: 12.99, description: "Create specialized industrial areas." },
    { name: "Campus", price: 12.99, description: "Build a university campus." },
  ],
  "euro-truck-sim-2": [
    { name: "Iberia", price: 17.99, description: "Explore the Iberian Peninsula." },
    { name: "Road to the Black Sea", price: 17.99, description: "Drive through Romania, Bulgaria, and Turkey." },
    { name: "Scandinavia", price: 17.99, description: "Explore Denmark, Norway, and Sweden." },
  ],
  "frostpunk": [
    { name: "The Rifts", price: 4.99, description: "New endless mode map with bridge building." },
    { name: "On The Edge", price: 9.99, description: "A new story set after the main campaign." },
  ],
}

export const relatedGames: Record<string, string[]> = {
  "gta-v": ["rdr2", "cyberpunk-2077", "mafia-definitive-edition", "sleeping-dogs", "just-cause-3"],
  "rdr2": ["gta-v", "the-witcher-3", "ghost-of-tsushima", "cyberpunk-2077", "fallout-4"],
  "elden-ring": ["dark-souls-3", "dark-souls", "sekiro", "lies-of-p", "the-witcher-3"],
  "cyberpunk-2077": ["deus-ex-mankind-divided", "bioshock-infinite", "gta-v", "death-stranding", "control"],
  "the-witcher-3": ["skyrim", "baldurs-gate-3", "elden-ring", "disco-elysium", "hogwarts-legacy"],
  "baldurs-gate-3": ["divinity-original-sin-2", "the-witcher-3", "disco-elysium", "skyrim", "elden-ring"],
  "skyrim": ["the-witcher-3", "fallout-4", "baldurs-gate-3", "elden-ring", "hogwarts-legacy"],
  "god-of-war-ragnarok": ["god-of-war-2018", "elden-ring", "sekiro", "ghost-of-tsushima", "control"],
  "ghost-of-tsushima": ["sekiro", "rdr2", "god-of-war-ragnarok", "assassins-creed-valhalla", "the-witcher-3"],
  "sekiro": ["ghost-of-tsushima", "elden-ring", "dark-souls-3", "lies-of-p", "nioh-2"],
}
