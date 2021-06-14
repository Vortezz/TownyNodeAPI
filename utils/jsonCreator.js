function residentJSON(data) {
    if (!data || data.length == 0) {
        return { error: "No user found !" }
    }
    var friends = [];
    if (data[0].friends) {
        friends = data[0].friends.split("#")
    }
    return {
        name: data[0].name,
        town: data[0].town,
        townranks: data[0]['town-ranks'],
        nationrank: data[0]['nation-ranks'],
        lastonline: data[0].lastOnline,
        title: data[0].title,
        friends: friends
    }
}

function townJSON(townData, outsidersData) {
    if (!townData || townData.length == 0) {
        return { error: "No town found !" }
    }
    var outsiders = [];
    for (i = 0; i < outsidersData.length; i++) {
        outsiders.push(outsidersData[i].name)
    }
    return {
        name: townData[0].name,
        mayor: townData[0].mayor,
        board: townData[0].townBoard,
        nation: townData[0].nation,
        taxes: townData[0].taxes,
        registeredtime: townData[0].registered,
        neutral: townData[0].neutral,
        residents: outsiders
    }
}

function nationJSON(nationData, townsData) {
    if (!nationData || nationData.length == 0) {
        return { error: "No nation found !" }
    }
    var towns = [];
    for (i = 0; i < townsData.length; i++) {
        towns.push(townsData[i].name)
    }
    allies = []
    ennemies = []
    if (nationData[0].allies) {
        allies = nationData[0].allies.split('#')
    }
    if (nationData[0].ennemies) {
        ennemies = nationData[0].ennemies.split('#')
    }
    return {
        name: nationData[0].name,
        capital: nationData[0].capital,
        allies: allies,
        ennemies: nationData[0].ennemies,
        board: nationData[0].nationBoard,
        registeredtime: nationData[0].registered,
        neutral: nationData[0].neutral,
        color: nationData[0].mapColorHexCode,
        public: nationData[0].isPublic,
        towns: towns
    }
}

module.exports = {
    residentJSON,
    townJSON,
    nationJSON
}