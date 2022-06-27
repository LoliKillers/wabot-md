require('rootpath')()
require('config')
const { MessageType, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType, chatModify } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('lib/myfunc')
const lang = require('languages')

module.exports = wabot = async (wabot, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        const prefix = /^[.#$!z]/.test(body) ? body.match(/^[.#$!z]/gi) : '-'
        const isCmd = body && body.startsWith(prefix) ? true : false
        const command = body && body.startsWith(prefix) ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : ""
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "Unknown"
        const botNumber = await wabot.decodeJid(wabot.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
        
        const groupMetadata = m.isGroup ? await wabot.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
        let chats = global.db.data.chats[m.chat]
        if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
        if (chats) {
            if (!('mute' in chats)) chats.mute = false
            if (!('antilink' in chats)) chats.antilink = false
            if (!('languagess' in chats)) chats.languagess = 'id'
        } else global.db.data.chats[m.chat] = {
            mute: false,
            antilink: false,
            languagess: 'id',
            welcomeMes: {
            }
        }
        const languagess = global.db.data.chats[m.chat].languagess
        const listt = lang[languagess]
        const meseg = mess[languagess]
        try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
                if (!isNumber(user.afkTime)) user.afkTime = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!isNumber(user.limit)) user.limit = limitUser
            } else global.db.data.users[m.sender] = {
                afkTime: -1,
                afkReason: '',
                limit: limitUser,
            }
            
            let custom_welcome = global.db.data.chats[m.chat].custom_welcome
            if (typeof custom_welcome !== 'object') global.db.data.chats[m.chat].custom_welcome = {}
            if (custom_welcome) {
                if (!('bg_canvas' in custom_welcome)) custom_welcome.bg_canvas = 'https://c0.wallpaperflare.com/preview/524/860/912/screen-code-coding-programming.jpg'
            } else global.db.data.chats[m.chat].custom_welcome = {
                bg_canvas: 'https://c0.wallpaperflare.com/preview/524/860/912/screen-code-coding-programming.jpg'
            }
            
            
            let setting = global.db.data.settings[botNumber]
            if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
            if (setting) {
                if (!isNumber(setting.status)) setting.status = 0
                if (!('autobio' in setting)) setting.autobio = false
                if (!('templateImage' in setting)) setting.templateImage = true
                if (!('templateVideo' in setting)) setting.templateVideo = false
                if (!('templateGif' in setting)) setting.templateGif = false
                if (!('templateMsg' in setting)) setting.templateMsg = false	
            } else global.db.data.settings[botNumber] = {
                status: 0,
                autobio: false,
                templateImage: true,
                templateVideo: false,
                templateGif: false,
                templateMsg: false,
            }
            
        } catch (err) {
            console.error(err)
        }
        
        if (!wabot.public) {
            if (!m.key.fromMe) return
        }
        
        if (isCmd && m.isGroup) {
            wabot.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgGreen(new Date)) + '\nCommand : ' + chalk.green(command) + '\nFrom : ' + chalk.green(pushname)+ '\nId : ' + chalk.yellow(m.sender) + '\nIn : ' + chalk.green(groupMetadata.subject))
        }
        if (isCmd && !m.isGroup) {
            wabot.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgGreen(new Date)) + '\nCommand : ' + chalk.green(command) + '\nFrom : ' + chalk.green(pushname)+ '\nId : ' + chalk.yellow(m.sender) + '\nIn : ' + chalk.green('Private'))
        }
        if (!isCmd && !m.isGroup) {
            wabot.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgMagenta(new Date)) + '\nType : ' + chalk.green(isMedia && (m.mtype) ? m.mtype.slice(0, m.mtype.match("Message").index) : body.length > 35 ? body.slice(0,35)+"..." : body)+ '\nFrom : ' + chalk.green(pushname)+ '\nId : ' + chalk.yellow(m.sender) + '\nId : ' + chalk.green('Private'))
        }
        if (!isCmd && m.isGroup) {
            wabot.sendReadReceipt(m.chat, m.sender, [m.key.id])
            console.log(chalk.black(chalk.bgMagenta(new Date)) + '\nType : ' + chalk.green(isMedia && (m.mtype) ? m.mtype.slice(0, m.mtype.match("Message").index) : body.length > 35 ? body.slice(0,35)+"..." : body)+ '\nFrom : ' + chalk.green(pushname)+ '\nId : ' + chalk.yellow(m.sender) + '\nId : ' + chalk.green(groupMetadata.subject))
        }
        
        let cron = require('node-cron')
        cron.schedule('00 12 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium ? global.limitawal.premium : global.limitawal.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            console.log('Reseted Limit')
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
        
        if (db.data.settings[botNumber].autobio) {
            let setting = global.db.data.settings[botNumber]
            if (new Date() * 1 - setting.status > 1000) {
                let uptime = await runtime(process.uptime())
                await wabot.setStatus(`${wabot.user.name} >> Runtime : ${runtime(uptime)}`)
                setting.status = new Date() * 1
            }
        }
        if (db.data.chats[m.chat].antilink) {
            if (budy.match(`chat.whatsapp.com`)) {
                m.reply(`• ANTI LINK •\n\nKamu terdeteksi mengirim link group, maaf kamu akan di kick dari group ${groupMetadata.subyek} !`)
                if (!isBotAdmins) return m.reply(`Sayangnya bot bukan admin...`)
                let gclink = (`https://chat.whatsapp.com/`+await wabot.groupInviteCode(m.chat))
                let isLinkThisGc = new RegExp(gclink, 'i')
                let isgclink = isLinkThisGc.test(m.text)
                if (isgclink) return m.reply(`Pfffffttt`)
                if (isAdmins) return m.reply(`Hai ${pushName}`)
                if (isCreator) return m.reply(`Hai owner >_<`)
                wabot.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }
        
        if (db.data.chats[m.chat].mute && !isAdmins && !isCreator) {
            return
        }
        
        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.sticker)) {
            let hash = global.db.data.sticker[m.msg.fileSha256.toString('base64')]
            let { text, mentionedJid } = hash
            let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
                userJid: wabot.user.id,
                quoted: m.quoted && m.quoted.fakeObj
            })
            messages.key.fromMe = areJidsSameUser(m.sender, wabot.user.id)
            messages.key.id = m.key.id
            messages.pushName = m.pushName
            if (m.isGroup) messages.participant = m.sender
            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: 'append'
            }
            wabot.ev.emit('messages.upsert', msg)
        }
        
        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
        for (let jid of mentionUser) {
            let user = global.db.data.users[jid]
            if (!user) continue
            let afkTime = user.afkTime
            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''
            await listt.afkreason(m, reason, clockString, afkTime)
        }
        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            await listt.afkreason2(m, user, clockString)
            user.afkTime = -1
            user.afkReason = ''
        }
        switch(command) {
            case 'setwelcomebg': case 'setbgwelcome': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (!quoted) return m.reply(`${meseg.bgWelcome.reply} ${prefix + command}`)
                if (!/image/.test(mime)) return m.reply(`${meseg.bgWelcome.reply} ${prefix + command}`)
                let { UploadFileUgu, webp2mp4File, TelegraPh } = require('lib/uploader')
                let media = await wabot.downloadAndSaveMediaMessage(quoted)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    db.data.chats[m.chat].custom_welcome.bg_canvas = anu
                    m.reply(`${meseg.bgWelcome.ok}`)
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    db.data.chats[m.chat].custom_welcome.bg_canvas = anu
                    m.reply(`${meseg.bgWelcome.ok}`)
                }
                await fs.unlinkSync(media)
            }
            break
            case 'owner': {
                wabot.sendContact(m.chat, global.owner, m)
            }
            break
            case 'setlang': case 'setbahasa': case 'lang': {
                let textl = `*WABOT MD*\n\nPengaturan bahasa :\nBahasa yang tersedia saat ini`
                let lhasil = await fetchJson(api('popcat', '/translate/', { to: languagess, text: textl }))
                if (args[0] === "id") {
                    db.data.chats[m.chat].languagess = 'id'
                    m.reply(`${meseg.lang} Indonesia!`)
                } else if (args[0] === "en") {
                    db.data.chats[m.chat].languagess = 'en'
                    m.reply(`${meseg.lang} English!`)
                } else {
                    console.log(lhasil)
                    let buttons = [
                        { buttonId: 'setlang id', buttonText: { displayText: 'ID' }, type: 1 },
                        { buttonId: 'setlang en', buttonText: { displayText: 'EN' }, type: 1 }
                        ]
                        await wabot.sendButtonText(m.chat, buttons, `${lhasil.translated}`, wabot.user.name, m)
                }
            }
            break
            case 'sticker': case 's': case 'stickergif': case 'sgif': {
                if (!quoted) return listt.stcReply(m, prefix, command)
                m.reply(`${meseg.wait}`)
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await wabot.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return m.reply('Durasi video maksimal 10 detik!')
                    let media = await quoted.download()
                    let encmedia = await wabot.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else {
                    listt.stcReply(m, prefix, command)
                }
            }
            break
            case 'antilink': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilink) return m.reply(`${meseg.antilink.isOn}`)
                    db.data.chats[m.chat].antilink = true
                    m.reply(`${meseg.antilink.on}`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].antilink) return m.reply(`${meseg.antilink.isOff}`)
                    db.data.chats[m.chat].antilink = false
                    m.reply(`${meseg.antilink.off}`)
                } else {
                    let buttons = [
                        { buttonId: 'antilink on', buttonText: { displayText: 'On' }, type: 1 },
                        { buttonId: 'antilink off', buttonText: { displayText: 'Off' }, type: 1 }
                        ]
                        await wabot.sendButtonText(m.chat, buttons, `${meseg.antilink.mode}\n\n_${groupMetadata.subject}_`, wabot.user.name, m)
                }
            }
            break
            case 'editinfo': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (args[0] === 'open'){
                    if (groupMetadata.restrict == false) {
                        m.reply(`${meseg.gcInfo.isFalse}`)
                    } else if(groupMetadata.restrict == true) {
                        await wabot.groupSettingUpdate(m.chat, 'unlocked')
                        m.reply(`${meseg.gcInfo.fal}`)
                    }
                } else if (args[0] === 'close'){
                    if (groupMetadata.restrict == true) {
                        m.reply(`${meseg.gcInfo.isTrue}`)
                    } else if(groupMetadata.restrict == false) {
                        await wabot.groupSettingUpdate(m.chat, 'locked')
                        m.reply(`${meseg.gcInfo.tru}`)
                    }
                } else {
                    let buttons = [
                        { buttonId: 'editinfo open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'editinfo close', buttonText: { displayText: 'Close' }, type: 1 }
                        ]
                        await wabot.sendButtonText(m.chat, buttons, `${meseg.gcInfo.mode}\n\n_${groupMetadata.subject}_`, wabot.user.name, m)
                        
                }
            }
            break
            case 'hidetag': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                wabot.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)})
            }
            break
            case 'tagall': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                let teks = `*「 TAG ALL 」*\n\n`
                teks += `◩  *Note* : ${q ? q : ''}\n\n`
                for (let mem of participants) {
                    teks += `⇝ @${mem.id.split('@')[0]}\n`
                }
                wabot.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
            }
            break
            case 'setgrouppp': case 'setppgc': case 'setppgroup': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (!quoted) return m.reply(`${meseg.ppGc.reply} ${prefix + command}`)
                if (!/image/.test(mime)) return m.reply(`${meseg.ppGc.reply} ${prefix + command}`)
                if (/webp/.test(mime)) return m.reply(`${meseg.ppGc.reply} ${prefix + command}`)
                m.reply(`${meseg.wait}`)
                let media = await wabot.downloadAndSaveMediaMessage(quoted)
                try {
                    await wabot.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
                    m.reply(`${meseg.ppGc.ok}`)
                } catch (e) {
                    console.log(e)
                    m.reply(`${meseg.error}`)
                }
            }
            break
            case 'setbotpp': case 'setppbot': {
                if (!isCreator) return m.reply(`${meseg.owner}`)
                if (!quoted) return m.reply(`${meseg.ppbot.reply} ${prefix + command}`)
                if (!/image/.test(mime)) return m.reply(`${meseg.ppBot.reply} ${prefix + command}`)
                if (/webp/.test(mime)) return m.reply(`${meseg.ppBot.reply} ${prefix + command}`)
                m.reply(`${meseg.wait}`)
                let media = await wabot.downloadAndSaveMediaMessage(quoted)
                try {
                    await wabot.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
                    m.reply(`${meseg.ppBot.ok}`)
                } catch (e) {
                    m.reply(`${meseg.error}`)
                }
            }
            break
            case 'setdesc': case 'setdescgroup': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (!text) return m.reply(`${meseg.descGc.text} ${prefix + command} ${groupMetadata.subject} New`)
                try {
                    await wabot.groupUpdateDescription(m.chat, text)
                    m.reply(`${meseg.descGc.newDesc} \n${text}`)
                } catch (e) {
                    m.reply(`${meseg.error}`)
                    console.log(e)
                }
            }
            break
            case 'setgcname': case 'setnamegc': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (!text) return m.reply(`${meseg.nameGc.text} ${prefix + command} ${groupMetadata.subject} New`)
                try {
                    await wabot.groupUpdateSubject(m.chat, text)
                    m.reply(`${meseg.nameGc.newName} \n${text}`)
                } catch (e) {
                    m.reply(`${meseg.error}`)
                    console.log(e)
                }
            }
            break
            case 'group': case 'grup': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                if (args[0] === 'close'){
                    if (groupMetadata.announce == true) {
                        m.reply(`${meseg.group.isClose}`)
                    } else if (groupMetadata.announce == false) {
                        await wabot.groupSettingUpdate(m.chat, 'announcement')
                        m.reply(`${meseg.group.close}`)
                    }
                } else if (args[0] === 'open'){
                    if (groupMetadata.announce == false) {
                        m.reply(`${meseg.group.isOpen}`)
                    } else if (groupMetadata.announce == true){
                        await wabot.groupSettingUpdate(m.chat, 'not_announcement')
                        m.reply(`${meseg.group.open}`)
                    }
                } else {
                    let buttons = [
                        { buttonId: 'group open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'group close', buttonText: { displayText: 'Close' }, type: 1 }
                        ]
                        await wabot.sendButtonText(m.chat, buttons, `${meseg.group.mode}\n\n_${groupMetadata.subject}_`, wabot.user.name, m)
                }
            }
            break
            case 'leave': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isCreator && isAdmins) return m.reply(`${meseg.admin}`)
                await wabot.sendMessage(m.chat, { text :`Sayonara ${groupMetadata.subject} 👋` , mentions: participants.map(a => a.id)}, { quoted: m })
                await wabot.groupLeave(m.chat)
            }
            break
            case 'linkgroup': case 'linkgc': case 'gclink': case 'grouplink': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                let response = await wabot.groupInviteCode(m.chat)
                wabot.sendText(m.chat, `*${groupMetadata.subject}*\n\n*Link* : https://chat.whatsapp.com/${response}`, m, { detectLink: true })
            }
            break
            case 'demote': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                if (!m.quoted) return m.reply(`${meseg.pd.userDm}`)
                if (groupAdmins.includes(users) == true) {
                    await wabot.groupParticipantsUpdate(m.chat, [users], 'demote')
                    m.reply(`${meseg.pd.demote}`)
                } else if (groupAdmins.includes(users) == false) {
                    m.reply(`${meseg.pd.demote2}`)
                }
            }
            break
            case 'promote': {
                if (!m.isGroup) return m.reply(`${meseg.group}`)
                if (!isBotAdmins) return m.reply(`${meseg.botAdmin}`)
                if (!isAdmins && !isCreator) return m.reply(`${meseg.admin}`)
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                if (!m.quoted) return m.reply(`${meseg.pd.userPm}`)
                if (groupAdmins.includes(users) == false) {
                    await wabot.groupParticipantsUpdate(m.chat, [users], 'promote')
                    m.reply(`${meseg.pd.promote}`)
                } else if (groupAdmins.includes(users) == true) {
                    m.reply(`${meseg.pd.promote2}`)
                }
            }
            break
            case 'join': case 'gabung': {
                if (!text) return m.reply(`${meseg.enterLink}`)
                if (!args[0].includes('https://chat.whatsapp.com')) return m.reply(`${meseg.enterLink}`)
                let code = args[0].split('https://chat.whatsapp.com/')[1]
                let info = await wabot.groupGetInviteInfo(code)
                try {
                    if (info.size > 256) return m.reply(`${meseg.join.gcFull}`)
                    let response = await wabot.groupAcceptInvite(code)
                    await m.reply(`${meseg.join.success}\n\n*ID Group* : ${info.id}`)
                    console.log("joined to: " + response)
                } catch (e) {
                    console.log(e)
                }
            }
            break
            case 'react': {
                if (!isCreator && !itsMe) return m.reply(`${meseg.owner}`)
                reactionMessage = {
                    react: {
                        text: args[0],
                        key: { remoteJid: m.chat, fromMe: true, id: quoted.id }
                    }
                }
                wabot.sendMessage(m.chat, reactionMessage)
            }
            break  
            case 'halah': case 'hilih': case 'huluh': case 'heleh': case 'holoh': {
                if (!m.quoted && !text) return m.reply(`${meseg.vokalM} ${prefix + command}`)
                ter = command[1].toLowerCase()
                tex = m.quoted ? m.quoted.text ? m.quoted.text : q ? q : m.text : q ? q : m.text
                m.reply(tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase()))
            }
            break
            case 'help': case 'menu': {
                var btn = [{
                    urlButton: {
                        displayText: 'Source Code',
                        url: 'https://github.com/LoliKillers/wabot-md'
                    }
                }, {
                    callButton: {
                        displayText: 'Owner Number',
                        phoneNumber: '+62 857-8544-5412'
                    }
                }, {
                    quickReplyButton: {
                        displayText: 'Status Bot',
                        id: 'ping'
                    }
                }, {
                    quickReplyButton: {
                        displayText: 'Contact Owner',
                        id: 'owner'
                    }  
                }]
                await listt.help(m, wabot, btn, prefix)
            }
            break
            case 'donasi': case 'buypremium': case 'belipremium': case 'donate': {
                await listt.donation(m, wabot, quoted)
            }
            break
            case 'afk': {
                let user = global.db.data.users[m.sender]
                user.afkTime = + new Date
                user.afkReason = text
                await listt.afk(m, text)
            }
            break
            case 'ping': case 'botstatus': case 'statusbot': {
                let used = process.memoryUsage()
                let cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                    return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
                        user: 0,
                        nice: 0,
                        sys: 0,
                        idle: 0,
                        irq: 0
                    }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                await listt.ping(m, used, os, cpus, latensi, oldd, neww, runtime, process, formatp)
            }
            break
            default:
            if (budy.startsWith('=>')) {
                if (!isCreator) return m.reply(`${meseg.owner}`)
                function Return(sul) {
                    sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                    if (sat == undefined) {
                        bang = util.format(sul)
                    }
                    return m.reply(bang)
                }
                try {
                    m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                } catch (e) {
                    m.reply(String(e))
                }
            }
            
            if (budy.startsWith('>')) {
                if (!isCreator) return m.reply(`${meseg.owner}`)
                try {
                    let evaled = await eval(budy.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await m.reply(evaled)
                } catch (err) {
                    await m.reply(String(err))
                }
            }
            
            if (budy.startsWith('$')) {
                if (!isCreator) return m.reply(`${meseg.owner}`)
                exec(budy.slice(2), (err, stdout) => {
                    if(err) return m.reply(err)
                    if (stdout) return m.reply(stdout)
                })
            }
            
            if (m.chat.endsWith('@s.whatsapp.net') && isCmd) {
                this.anonymous = this.anonymous ? this.anonymous : {}
                let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
                if (room) {
                    if (/^.*(next|leave|start)/.test(m.text)) return
                    if (['.next', '.leave', '.stop', '.start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(m.text)) return
                    let other = [room.a, room.b].find(user => user !== m.sender)
                    m.copyNForward(other, true, m.quoted && m.quoted.fromMe ? {
                        contextInfo: {
                            ...m.msg.contextInfo,
                            forwardingScore: 0,
                            isForwarded: true,
                            participant: other
                        }
                    } : {})
                }
                return !0
            }
            
            if (isCmd && budy.toLowerCase() != undefined) {
                if (m.chat.endsWith('broadcast')) return
                if (m.isBaileys) return
                let msgs = global.db.data.database
                if (!(budy.toLowerCase() in msgs)) return
                wabot.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
            }
        }
        
        
    } catch (err) {
        let gcId = "6285785445412@s.whatsapp.net"
        wabot.sendText(gcId, util.format(err))
        console.log(err)
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
