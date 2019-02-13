var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: parseInt(Date.now)
    }
};

module.exports = {
    generateMessage
};