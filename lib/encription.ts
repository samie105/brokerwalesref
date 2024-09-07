// lib/encryption.ts
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32-byte key
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY!),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string): string {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY!),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// lib/cookieSigning.ts
import { createHmac } from "crypto";

const SECRET = process.env.COOKIE_SECRET;

export function sign(value: string): string {
  const signature = createHmac("sha256", SECRET!)
    .update(value)
    .digest("base64")
    .replace(/\=+$/, "");

  return `${value}.${signature}`;
}

export function unsign(signedValue: string): string | false {
  const value = signedValue.slice(0, signedValue.lastIndexOf("."));
  const signature = signedValue.slice(signedValue.lastIndexOf(".") + 1);

  const expectedSignature = createHmac("sha256", SECRET!)
    .update(value)
    .digest("base64")
    .replace(/\=+$/, "");

  return signature === expectedSignature ? value : false;
}
