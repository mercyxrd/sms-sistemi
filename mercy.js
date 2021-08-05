const Vonage = require('@vonage/server-sdk');
const { Discord, Client } = require('discord.js');

const mercyclient = new Client({ fetchAllMembers: true });
mercxy.config = {
   token: "xx",
   GuildID: "xx",
   NEXMO_API_KEY: "xx", // https://dashboard.nexmo.com/sign-up
   NEXMO_API_SECRET: "xx", // https://dashboard.nexmo.com/sign-up
   erkekrolü: "871464016604704809", //
};
const MercyApi = new Vonage({ 
  apiKey: mercxy.config.NEXMO_API_KEY, 
  apiSecret: mercxy.config.NEXMO_API_SECRET
}); 
mercyclient.on('ready', () => {
mercyclient.user.setPresence({ activity: { name: "Mêrcy.#1953" }, type: 'PLAYING', status: 'dnd' }).then(console.log('Mercy - Discord API ile bağlantı kuruldu.'));
});
mercyclient.on('roleDelete', async (MercyRole) => {
if(MercyRole.guild.id !== mercxy.config.GuildID) return;
let MercyAudit = await MercyRole.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(mercxyyy => mercxyyy.entries.first())
let erkek = MercyRole.guild.roles.cache.get(mercxy.config.erkekrolü)
if(!erkek) {
const from = "Mercy SMS System"
const to = "telefon numaran"
const text = `${MercyAudit.executor.id} ID'li yönetici sunucudan bir rol sildi.`
let kullanıcı = MercyRole.guild.member(MercyAudit.executor.id)
if (kullanıcı.bannable) kullanıcı.ban({ reason: `Mercy Rol Silme Koruması` });
MercyApi.message.sendSms(from, to, text, (err, responseData) => {
if (err) { console.log(err);
} else {
if (responseData.messages[0]['status'] === "0") { console.log("Mercy - Mesaj başarıyla gönderildi.");
} else {
console.log(`Mercy - Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
}
}
})
}
});

mercyclient.login(mercxy.config.token);
