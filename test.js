
/*
SID=wyaociddhj2tsth5smvmwjpk
Lan=en
App=ITSOnelogin
API=3.0
Token=igB59Mlsdh25NwzaFEy9AU8BTZGHOV3ofyPLIzoIBLk=
DT=zKzW2y6XW4MRAO5Vxe9n+U8sEEaeCayJO0itylxbgrNH0CMGaufQdd6v5kz1jjmZJWZ+hrb1TvwGGTCtIPcvp7JyEjDsho9pCjvASTk4qgowXCGm3f8PXSRN5vjFLI9fxF9Q6jlZtH9fYkZFWEp8mOi4Qr2AF8ULyn4mDMZ7MDoPm6IA7qTpQ0wDj8Co9ASOlyvN4Tgx5tYMUoe15qGksg==
OneLogin=FMBDETROIT
ReturnUrl=https://fmb.detroitdawoodibohras.com:443/Home/ITSOneLogin

AKybmP4Dr2fJ
*/

const crypt = require('crypto-js');

const data = '30468910,Mohammed bhai Shaikh Mustafa bhai Hussain,M,29,Detroit_Jamaat,USA,21';
//const edata = 'zKzW2y6XW4MRAO5Vxe9n+U8sEEaeCayJO0itylxbgrNH0CMGaufQdd6v5kz1jjmZJWZ+hrb1TvwGGTCtIPcvp7JyEjDsho9pCjvASTk4qgowXCGm3f8PXSRN5vjFLI9fxF9Q6jlZtH9fYkZFWEp8mOi4Qr2AF8ULyn4mDMZ7MDoPm6IA7qTpQ0wDj8Co9ASOlyvN4Tgx5tYMUoe15qGksg==';
const edata = 'AUEc/gp1CuKPkX7ZdyELS+sA3OARUrHiNZLIiykrQ5jDEQdVoFphwZuP203BRJGsd109/TE9NK63YqzNJnV9/g';
//const edata = 'AUEc/gp1CuKPkX7ZdyELS+sA3OARUrHiNZLIiykrQ5jDEQdVoFphwZuP203BRJGsQIFs777yVY4yl+KzlWv2NOLMdQhupWIk7RUXrJpgH5M=';

const secretPassword = 'AKybmP4Dr2fJ';
const salt = crypt.enc.Hex.parse('562a47485e7c395e544f236354');

const randomKey = crypt.PBKDF2(secretPassword, salt, {
  keySize: 128,
  iterations: 1000,
});

const key = crypt.enc.Hex.parse(randomKey.toString(crypt.enc.Hex).substr(0, 32));
const iv = crypt.enc.Hex.parse(randomKey.toString(crypt.enc.Hex).substr(32, 32));

const encryptedData = crypt.AES.encrypt(data, key, { iv: iv });

const cp = {
  ciphertext: crypt.enc.Base64.parse(edata),
  key: key,
  iv: iv,
  salt: salt,
  blockSize: 128,
  mode: crypt.mode.CBC,
  padding: crypt.pad.Pkcs7,
}
const decryptedData = crypt.AES.decrypt(cp, key, { iv: iv });

console.dir(encryptedData.ciphertext.toString(crypt.enc.Base64));

console.log(decryptedData.toString(crypt.enc.Utf8));

