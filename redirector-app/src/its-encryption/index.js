import crypto from 'crypto-js';

const encrypt = (data, secret, salt) => {
  const passkey = crypto.PBKDF2(secret,
    crypto.enc.Hex.parse(salt),
    {
      keySize: 128,
      iterations: 1000,
    });

  const key = crypto.enc.Hex.parse(passkey.toString(crypto.enc.Hex).substr(0, 32));
  const cfg = {
    iv: crypto.enc.Hex.parse(passkey.toString(crypto.enc.Hex).substr(32, 32)),
  };

  const dt = crypto.AES.encrypt(data, key, cfg);

  return dt.ciphertext.toString(crypto.enc.Base64);
};

export default encrypt;
