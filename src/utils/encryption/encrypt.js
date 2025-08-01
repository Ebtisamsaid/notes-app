import AES from "crypto-js/aes.js"
import CryptoJS from 'crypto-js';
import enc from 'crypto-js/enc-utf8.js';
export const ciphertext=({encryptText,secret_key=process.env.secret_key})=>{

 return   CryptoJS.AES.encrypt(encryptText,secret_key).toString()
}
export const decrypt=({ciphertext,secret_key=process.env.secret_key})=>{
    return CryptoJS.AES.decrypt(ciphertext,secret_key).toString(CryptoJS.enc.Utf8)
}