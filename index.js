const fs = require("fs");
const { google } = require("googleapis");
const MailComposer = require("nodemailer/lib/mail-composer");

function getAuth(credentialsPath, tokenPath) {
  const credentials = fs.readFileSync(credentialsPath).toString();
  const { client_secret, client_id, redirect_uris } = JSON.parse(credentials).installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = fs.readFileSync(tokenPath).toString();
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
}

async function createEmailAdminRaw(settings, options) {
  const mail = new MailComposer({
    ...options,
    from: settings.defaultFrom,
    replyTo: settings.defaultReplyTo || settings.defaultFrom,
    textEncoding: "base64"
  });
  let encodedMessage = await mail.compile().build();
  encodedMessage = await Buffer.from(encodedMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return encodedMessage;
}

module.exports = {
  provider: "googleapis",
  name: "googleapis",
  init: (providerOptions = {}, settings = {}) => {
    return {
      send: async options => {
        const auth = getAuth(providerOptions.credentialsPath, providerOptions.tokenPath);
        const raw = await createEmailAdminRaw(settings, options);
        const gmail = google.gmail({ version: "v1", auth });
        return gmail.users.messages.send({
          auth,
          userId: "me",
          resource: {
            raw
          }
        });
      }
    };
  }
};
