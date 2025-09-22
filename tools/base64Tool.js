// tools/base64Tool.js
function encodeBase64(text) {
    return Buffer.from(text).toString('base64');
}

function decodeBase64(encodedText) {
    try {
        return Buffer.from(encodedText, 'base64').toString('utf8');
    } catch (error) {
        return null;
    }
}

module.exports = { encodeBase64, decodeBase64 };
