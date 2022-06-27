require('config')
const fs = require('fs')

exports.stcReply = async(m, prefix, command) => {
    await m.reply(`Send/reply pictures/videos with captions ${prefix + command}`)
}
exports.donation = async(m, wabot, quoted) => {
    text = `*Hallo ${m.pushName}*
    
This bot is free for groups/personal

Please donate to keep this bot alive :)

*Premium User*
0,67 Dollar 1 user 1 month 

For payment, you can use dana/pulse

For more detailed information, please contact the owner
https://wa.me/6275785445412
`
    await wabot.sendMessage(m.chat, { image: { url : 'https://telegra.ph/file/6c99f6873858fac9c7e79.jpg'}, caption: text }, { quoted: m })
}
exports.afkreason2 = async(m, user, clockString) => {
    text = `You quit AFK ${user.afkReason ? ' after ' + user.afkReason : ''}
During ${clockString(new Date - user.afkTime)}
`.trim()
    await m.reply(text)
}

exports.afkreason = async(m, reason, clockString, afkTime) => {
    text = `Don't tag him!
He's in AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'}
During ${clockString(new Date - afkTime)}
`.trim()
    await m.reply(text)
}

exports.afk = async(m, text) => {
    text = `${m.pushName} Already Afk
*Reason* ${text ? ': ' + text : ''}
    `
    await m.reply(text)
}

exports.help = async(m, wabot, btn, prefix) => {
    text = `*「 WHATSAPP BOT MULTI DEVICE 」*

┌❲ *MAIN MENU* ❳
├◩ ${prefix}ping
├◩ ${prefix}afk
├◩ ${prefix}donate
├◩ ${prefix}join
├◩ ${prefix}setlang
└──────◩

┌❲ *OWNER MENU* ❳
├◩ ${prefix}react
├◩ ${prefix}setppbot
└──────◩

┌❲ *CONVERTER MENU* ❳
├◩ ${prefix}sticker 
└──────◩

┌❲ *VOKAL MENU* ❳
├◩ ${prefix}halah
├◩ ${prefix}hilih
├◩ ${prefix}huluh
├◩ ${prefix}heleh
├◩ ${prefix}holoh
└──────◩

┌❲ *GROUP MENU* ❳
├◩ ${prefix}promote
├◩ ${prefix}demote
├◩ ${prefix}linkgroup
├◩ ${prefix}leave
├◩ ${prefix}group open
├◩ ${prefix}group close
├◩ ${prefix}setnamegc
├◩ ${prefix}setdesc
├◩ ${prefix}setppgc
├◩ ${prefix}tagall
├◩ ${prefix}hidetag
├◩ ${prefix}editinfo close
├◩ ${prefix}editinfo open
├◩ ${prefix}antilink on
├◩ ${prefix}antilink off
├◩ ${prefix}ephemeral enable
├◩ ${prefix}ephemeral disable
├◩ ${prefix}setbgwelcome
└──────◩
    `
    await wabot.send5ButImg(m.chat, text, wabot.user.name, global.thumb, btn)
}

exports.ping = async(m, used, os, cpus, latensi, oldd, neww, runtime, process, formatp) => {
    text = `*「 WHATSAPP BOT MULTI DEVICE 」*

Response speed ${latensi.toFixed(4)} _Second_
${oldd - neww} _miliseconds_

┌❲ *SERVER INFO* ❳
├◩ *Host* : ${os.hostname()}
├◩ *Ram* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
├◩ *Runtime* : ${runtime(process.uptime())}
└──────◩
`.trim()
    m.reply(text)
}

exports.messageError = async(m) => {
    await m.reply(`Error! Please report about this`)
}