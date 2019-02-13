var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: parseInt(Date.now)
    }
};

var generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longtitude}`,
        createdAt: parseInt(Date.now)
    }
};

module.exports = {
    generateMessage,
    generateLocationMessage
};