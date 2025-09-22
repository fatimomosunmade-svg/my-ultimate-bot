// tools/timestampTool.js
function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function timestampToDate(timestamp) {
    return new Date(timestamp * 1000).toISOString();
}

module.exports = { getCurrentTimestamp, timestampToDate };
