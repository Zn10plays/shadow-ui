function toBase64(str: string): string {
    return Buffer.from(str).toString('base64');
}

function fromBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf-8');
}
function encrypt(text: string): string {
    // Placeholder for encryption logic
    return toBase64(text);
}

function decrypt(encrypted: string): string {
    // Placeholder for decryption logic
    return fromBase64(encrypted);
}

export { toBase64, fromBase64, encrypt, decrypt };