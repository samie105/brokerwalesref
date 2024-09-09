const crypto = require("crypto");
const fs = require("fs");

// Generate a 32-byte (256-bit) encryption key
const encryptionKey = crypto.randomBytes(32);
const encryptionKeyBase64 = encryptionKey.toString("base64");

// Generate a 32-byte (256-bit) cookie secret
const cookieSecret = crypto.randomBytes(32);
const cookieSecretBase64 = cookieSecret.toString("base64");

// Create or append to .env file
const envContent = `
ENCRYPTION_KEY=${encryptionKeyBase64}
COOKIE_SECRET=${cookieSecretBase64}
`;

fs.writeFileSync(".env", envContent);
