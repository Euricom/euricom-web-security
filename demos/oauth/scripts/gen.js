import crypto from "crypto";

//
// generate verifier and challenge
//

function base64URLEncode(str) {
  return str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
const verifier = base64URLEncode(crypto.randomBytes(32));
console.log("verifier", verifier);

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest();
}
const challenge = base64URLEncode(sha256(verifier));
console.log("challenge", challenge);
