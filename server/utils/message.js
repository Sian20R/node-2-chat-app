var generatedMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: parseInt(Date.now)
    }
};

module.exports = {
    generatedMessage
};