

import CryptoJS from 'crypto-js' ;
export const EncryptionService = {
    
  encrypt: async(plainText) => {
    var key  = CryptoJS.enc.Latin1.parse("emgut@kL9RQ%L#tt");
    var iv   = CryptoJS.enc.Latin1.parse("emgut@kL9RQ%L#tt");  
    return btoa(CryptoJS.AES.encrypt(
      plainText,
      key,
      {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7
    }).toString());
  },

  decrypt: async(encryptedText) => {
    var key  = CryptoJS.enc.Latin1.parse("emgut@kL9RQ%L#tt");
    var iv   = CryptoJS.enc.Latin1.parse("emgut@kL9RQ%L#tt");  
    
    var decrypted = CryptoJS.AES.decrypt(atob(encryptedText),key,{iv:iv,padding:CryptoJS.pad.Pkcs7});
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
