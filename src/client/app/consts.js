var GLOBAL_SETTINGS = {
    fullApiPath: '/GiftShop/src/server/',
    apiPath: '/GiftShop/src/server/'
}


CONSTS = {};
CONSTS.propsToLower = function propsToLower(obj) {
    for (var prop in obj) {
        var newPropName = prop[0].toLocaleLowerCase() + prop.substr(1, prop.length);
        obj[newPropName] = obj[prop];
    }
}

CONSTS.userTypeEnum = {
    admin: 1,
    normal: 2
}

