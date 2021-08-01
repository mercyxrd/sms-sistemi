const Vonage = require('@vonage/server-sdk');
const conf = require("./config/settings")
const Discord = require('discord.js');
const Clientx = new Discord.Client({ fetchAllMembers: true });
const mercyApi = new Vonage({ 
  apiKey: conf.mercy.api_key, // projenin readme dosyasını okuyun 
  apiSecret: conf.mercy.api_secret // projenin readme dosyasını okuyun 
}); 

Clientx.on('roleDelete', async (mercxyrole) => {
  if(mercxyrole.guild.id !== conf.mercy.guildID) return;
  let logChannel = mercxyrole.guild.channels.cache.find(e => e.id === logs.guard1_log);
  let guilty = await mercxyrole.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(e => e.entries.first());
  let kullanıcı = mercxyrole.guild.member(guilty.executor.id);
  let mercyLogMsg = `Selamlar Mercy! ${message.guild.name} sunucusunda bir rol silindi. ${mercxyrole.name} (${mercxyrole.id}).` 
  mercyApi.message.sendSms(conf.mercy.phoneNumber, mercyLogMsg, { type: "unicode"}, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log("Mesaj başarıyla gönderildi.");
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }s
    }
  })
  if (logChannel) {
    logChannel.send(`İzinsiz Rol Oluşturuldu!\n\nRol Oluşturan Kullanıcı: ${guilty.executor}\n\nOluşturulan Rol Bilgileri: ${mercxyrole.name} (\`${mercxyrole.id}\`)\n\nRol oluşturan kullanıcı ${kullanıcı.manageable ? "başarıyla cezalandırıldı" : "cezalandırılamadı"}!`);
    } else {
      mercxyrole.guild.owner.id(`İzinsiz Rol Oluşturuldu!\n\nRol Oluşturan Kullanıcı: ${guilty.executor}\n\nOluşturulan Rol Bilgileri: ${mercxyrole.name} (\`${mercxyrole.id}\`)\n\nRol oluşturan kullanıcı ${kullanıcı.manageable ? "başarıyla cezalandırıldı" : "cezalandırılamadı"}!`);
    }

});

Clientx.on("roleCreate", async mercxyrole => {
  let guilty = await mercxyrole.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(e => e.entries.first());
  let logChannel = mercxyrole.guild.channels.cache.find(e => e.id === logs.guard1_log);
  let kullanıcı = mercxyrole.guild.member(guilty.executor.id);
  if (kullanıcı.manageable) kullanıcı.roles.cache.has(conf.roles.booster) ? kullanıcı.roles.set([conf.roles.booster, conf.roles.jail]) : kullanıcı.roles.set([conf.roles.jail])
  ytKapat(mercxyrole.guild.id);
  mercxyrole.delete({ reason: `Mêrcy. Rol Oluşturma Koruması` });
  let mercyLogMsg = `Selamlar Mercy! ${message.guild.name} sunucusunda bir rol oluşturuldu. ${mercxyrole.name} (${mercxyrole.id}).` 
  mercyApi.message.sendSms(conf.mercy.phoneNumber, mercyLogMsg, { type: "unicode"}, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log("Mesaj başarıyla gönderildi.");
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }
    }
  })
  if (logChannel) {
  logChannel.send(`İzinsiz Rol Oluşturuldu!\n\nRol Oluşturan Kullanıcı: ${guilty.executor}\n\nOluşturulan Rol Bilgileri: ${nomercy.name} (\`${nomercy.id}\`)\n\nRol oluşturan kullanıcı ${kullanıcı.manageable ? "başarıyla cezalandırıldı" : "cezalandırılamadı"}!`);
  } else {
    nomercy.guild.owner.id(`İzinsiz Rol Oluşturuldu!\n\nRol Oluşturan Kullanıcı: ${guilty.executor}\n\nOluşturulan Rol Bilgileri: ${nomercy.name} (\`${nomercy.id}\`)\n\nRol oluşturan kullanıcı ${kullanıcı.manageable ? "başarıyla cezalandırıldı" : "cezalandırılamadı"}!`);
  }
  });


  function ytKapat(sunucuID) {
    let sunucu = database.guilds.cache.get(sunucuID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(e => e.editable && (e.permissions.has("ADMINISTRATOR") || e.permissions.has("MANAGE_CHANNELS") || e.permissions.has("MANAGE_EMOJIS") || e.permissions.has("MANAGE_GUILD") || e.permissions.has("MANAGE_ROLES") || e.permissions.has("MANAGE_WEBHOOKS") || e.permissions.has("MENTION_EVERYONE") || e.permissions.has("BAN_MEMBERS") || e.permissions.has("KICK_MEMBERS"))).forEach(async r => {
    await r.setPermissions(0);
    });
    let logKanal = database.channels.cache.get(conf.logs.guard_log);
    let owner = database.users.cache.get(conf.mercy.botOwner);
    owner.send(`Sunucuda patlatma eylemleri tespit edildiği için yönetici izinleri kapatıldı.`)
    if (logKanal) {
    logKanal.send(`Sunucuda patlatma eylemleri tespit edildiği için yönetici izinleri kapatıldı. @everyone`);
    } else {
    sunucu.owner.send(`Sunucuda patlatma eylemleri tespit edildiği için yönetici izinleri kapatıldı. @everyone`)
    }
    };

   Clientx.login(conf.mercy.botToken).then(e => console.log(`[MERCY SMS] ${Clientx.user.username} başarıyla aktif edildi!`)).catch(err => console.error(`[MERCY SMS] Bir Hata Oluştu! Hata: ${err}`));


