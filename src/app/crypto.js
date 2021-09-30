const crypto = require("crypto");
const {secret} = require("./config");

const encrypt = (password) => {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
    let encrypted = cipher.update(password);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString("hex"),
        password: encrypted.toString("hex")
    };
};

const decrypt = (password) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secret), Buffer.from(password.iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(password.password, "hex")), decipher.final()]);

    return decrypted.toString();
};

module.exports = {
    encrypt, decrypt
};