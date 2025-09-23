// commands/tools.js
const { encodeBase64, decodeBase64 } = require('../tools/base64Tool');
const { getCurrentTimestamp, timestampToDate } = require('../tools/timestampTool');
const { generateUUID } = require('../tools/uuidTool');
const { prettifyJSON, validateJSON } = require('../tools/jsonTool');
const { generateQRCode } = require('../tools/qrTool');

// QR Code Tool
const axios = require('axios');
async function generateQRCode(text) {
    try {
        const response = await axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`, {
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data);
    } catch (error) {
        throw new Error('Failed to generate QR code');
    }
}

// Password Generator
function generatePassword(length = 12) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

module.exports = async (bot, chatId, args) => {
    const subCommand = args[0]?.toLowerCase();
    const input = args.slice(1).join(' ');

    if (!subCommand) {
        const helpText = `🛠️ *Developer Tools*\n\nAvailable commands:\n\n• .tools base64 <encode/decode> <text>\n• .tools timestamp\n• .tools uuid\n• .tools json <json_string>\n• .tools password <length>\n• .tools qrcode <text>\n\n*Examples:*\n.tools base64 encode hello world\n.tools qrcode https://google.com`;
        return bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
    }

    try {
        let result = '';

        switch (subCommand) {
            case 'base64':
                const action = args[1]?.toLowerCase();
                const text = args.slice(2).join(' ');
                
                if (action === 'encode') {
                    result = `🔒 *Base64 Encoded:*\n\`${encodeBase64(text)}\``;
                } else if (action === 'decode') {
                    const decoded = decodeBase64(text);
                    result = decoded ? `🔓 *Base64 Decoded:*\n\`${decoded}\`` : '❌ Invalid Base64 string';
                } else {
                    result = '❌ Usage: .tools base64 <encode/decode> <text>';
                }
                break;

            case 'timestamp':
                const timestamp = getCurrentTimestamp();
                const date = timestampToDate(timestamp);
                result = `⏰ *Current Timestamp:*\n\`${timestamp}\`\n\n📅 *As Date:*\n${date}`;
                break;

            case 'uuid':
                const uuid = generateUUID();
                result = `🆔 *Generated UUID:*\n\`${uuid}\``;
                break;

            case 'json':
                if (!input) {
                    result = '❌ Please provide JSON to format';
                } else {
                    const pretty = prettifyJSON(input);
                    result = pretty ? `📋 *Formatted JSON:*\n\`\`\`json\n${pretty}\n\`\`\`` : '❌ Invalid JSON format';
                }
                break;

            case 'password':
                const length = parseInt(args[1]) || 12;
                if (length < 4 || length > 50) {
                    result = '❌ Password length must be between 4 and 50';
                } else {
                    const password = generatePassword(length);
                    result = `🔐 *Generated Password:*\n\`${password}\`\n\n📏 *Length:* ${length} characters`;
                }
                break;

            case 'qrcode':
                if (!input) {
                    result = '❌ Please provide text/URL for QR code. Example: .tools qrcode https://google.com';
                } else {
                    try {
                        const qrBuffer = await generateQRCode(input);
                        await bot.sendPhoto(chatId, qrBuffer, {
                            caption: `📱 QR Code for: ${input}`
                        });
                        return;
                    } catch (error) {
                        result = '❌ Failed to generate QR code. Try a shorter text.';
                    }
                }
                break;

            default:
                result = '❌ Unknown tool. Use .tools to see available options.';
        }

        bot.sendMessage(chatId, result, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Tools error:', error);
        bot.sendMessage(chatId, '❌ Error processing your request.');
    }
};
