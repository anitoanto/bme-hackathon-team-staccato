// This will be driven by the data from the API (data analysis results)
// UK Artists
export const ukArtists = [
    {
        id: 'uk1',
        name: "Charli XCX",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us6", "us10"] // Olivia Rodrigo, Taylor Swift
    },
    {
        id: 'uk2',
        name: "Ed Sheeran",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us1", "us10"] // George Strait, Taylor Swift
    },
    {
        id: 'uk3',
        name: "The 1975",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us7", "us9"] // Doja Cat, Billie Eilish
    },
    {
        id: 'uk4',
        name: "Arctic Monkeys",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us2", "us3"] // Jelly Roll, Missy Elliott
    },
    {
        id: 'uk5',
        name: "Oasis",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us1", "us2"] // George Strait, Jelly Roll
    },
    {
        id: 'uk6',
        name: "Florence + The Machine",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us5", "us9"] // Beyoncé, Billie Eilish
    },
    {
        id: 'uk7',
        name: "RAYE",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us7", "us5"] // Doja Cat, Beyoncé
    },
    {
        id: 'uk8',
        name: "Stormzy",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us3", "us7"] // Missy Elliott, Doja Cat
    },
    {
        id: 'uk9',
        name: "beabadoobee",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us9", "us6"] // Billie Eilish, Olivia Rodrigo
    },
    {
        id: 'uk10',
        name: "Sam Fender",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["us1", "us10"] // George Strait, Taylor Swift
    }
];

// US Artists
export const usArtists = [
    {
        id: 'us1',
        name: "George Strait",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk5"] // Oasis
    },
    {
        id: 'us2',
        name: "Jelly Roll",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk4", "uk5"] // Arctic Monkeys, Oasis
    },
    {
        id: 'us3',
        name: "Missy Elliott",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk4"] // Arctic Monkeys
    },
    {
        id: 'us4',
        name: "Teddy Swims",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk2", "uk6"] // Ed Sheeran, Florence
    },
    {
        id: 'us5',
        name: "Beyoncé",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk6"] // Florence + The Machine
    },
    {
        id: 'us6',
        name: "Olivia Rodrigo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk1", "uk9"] // Charli XCX, beabadoobee
    },
    {
        id: 'us7',
        name: "Doja Cat",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk1", "uk7"] // Charli XCX, RAYE
    },
    {
        id: 'us8',
        name: "Post Malone",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk2", "uk4"] // Ed Sheeran, Arctic Monkeys
    },
    {
        id: 'us9',
        name: "Billie Eilish",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk6", "uk9"] // Florence + The Machine, beabadoobee
    },
    {
        id: 'us10',
        name: "Taylor Swift",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
        influencedBy: ["uk2", "uk6"] // Ed Sheeran, Florence
    }
];
