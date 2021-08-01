const Vonage = require('@vonage/server-sdk');
const conf = require("./config/settings")
const mercxy = new mercxy();
const mercyApi = new Vonage({ 
  apiKey: conf.mercy.api_key, // projenin readme dosyasını okuyun 
  apiSecret: conf.mercy.api_secret // projenin readme dosyasını okuyun 
}); 

mercxy.on('ready', () => {
  mercxy.user.setActivity({ activity: { name: "Mêrcy.#0249" }, type: 'PLAYING', status: 'idle' }).then(console.log('Discord API ile bağlantı kuruldu.'));
});

mercxy.on('roleDelete', async (mercxyrole) => {
  if(mercxyrole.guild.id !== conf.mercy.guildID) return;
  let mercyAudit = await mercxyrole.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(mercxy => mercxy.entries.first())
  let mercyLogMsg = `Selamlar Mercy! ${message.guild.name} sunucusunda bir rol silindi. ${mercxyrole.name} (${mercxyrole.id}).` 
  mercyApi.message.sendSms(VirtualNumber, conf.mercy.phoneNumber, mercyLogMsg, { type: "unicode"}, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log("Mesaj başarıyla gönderildi.");
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }
    }
  })

});

client.login(conf.mercy.botToken);


