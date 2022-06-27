require('rootpath')()
const fs = require('fs')
global.APIs = {
    popcat: 'https://api.popcat.xyz',
}
const chalk = require('chalk')
global.owner = ['6285785445412']
global.premium = ['6285785445412']
global.packname = 'ariasuxyz'
global.author = '085785445412'
global.sessionName = 'wabotmd'
global.languages = 'en'
global.sp = '>'
global.mess = {
    id: {
        callBlock: 'Jangan menelpon bot!!\nSekarang nomor kamu sudah di block otomatis oleh system bot!\nUntuk membuka blockir silahkan hubungi owner\nwa.me/6285785445412 (owner)',
        lang: 'Bahasa yang di gunakan di obrolan ini sekarang menggunakan bahasa ',
        error: 'Error!, pastikan parameter yang di minta sudah di masukkan dengan benar!\nSilahkan ulangi beberapa saat lagi dan jangan spam!\n\nJika masih tidak bisa segera laporkan ke owner bot!!',
        vokalM: 'Kirim/reply teks dengan caption',
        enterLink: '*Error* harap masukkan link dengan benar!',
        success: '✓ Success',
        admin: 'Fitur ini hanya bisa di gunakan oleh admin!',
        botAdmin: 'Bot harus menjadi admin!',
        owner: 'Fitur ini hanya bisa di gunakan oleh owner bot',
        group: 'Fitur ini hanya bisa di gunakan di dalam group!',
        private: 'Fitur ini hanya bisa di gunakan di privae chat!',
        bot: 'Fitur ini hanya bisa di gunakan oleh pengguna bot',
        wait: 'Loading....',
        join: {
            gcFull: 'Maaf group sudah penuh!, bot tidak bisa bergabung ke dalam group',
            success: 'Berhasil bergabung ke dalam group!',
            gcMin: 'Maaf minimal member group haru 15 peserta!'
        },
        endLimit: 'Limit anda hari ini sudah habis, Limit akan di refresh setiam jam 00:00',
        pd: {
            userPm: 'Tag/reply member yang ingin di promosikan menjadi admin group!',
            promote: 'Berhasil mempromosikan member group menjadi admin group!',
            promote2: 'Pengguna tersebut sudah menjadi admin group!',
            userDm: 'Tag/reply admin yang ingin di demote menjadi member group!',
            demote: 'Berhasil menurunkan pangkat admin group menjadi member group!',
            demote2: 'Pengguna tersebut bukan admin group!'
        },
        group: {
            isOpen: 'Sebelumnya group tidak di batasi, semua peserta dapat mengirim pesan!',
            open: 'Group sekarang tidak lagi di batasi!, semua peserta dapat mengirim pesan!',
            isClose: 'Sebelumnya group sudah di batasi agar hanya admin yang dapat mengirim pesan!',
            close: 'Group sekarang di batasi!, agar hanya admin yang dapat mengirim pesan!',
            mode: '*Pembatasan Mengirim Pesan*\nMembatasi pesan agar hanya admin atau semua peserta yang dapat mengirim pesan ke group\n\n- Pilih close agar hanya admin yang dapat mengirim pesan\n- Pilih open agar semua peserta dapat mengirim pesan\n'
        },
        gcInfo: {
            isFalse: 'Sebelumnya group tidak di batasi, semua peserta dapat mengedit info group!',
            fal: 'Group sekarang tidak lagi di batasi!, semua peserta dapat mengedit info group!',
            isTrue: 'Sebelumnya group sudah di batasi agar hanya admin yang dapat mengedit info group!',
            tru: 'Group sekarang di batasi!, agar hanya admin yang dapat mengedit info group!',
            mode: '*Pembatasan Mengedit Info*\nMembatasi agar hanya admin atau semua peserta yang dapat mengedit info group\n\n- Pilih close agar hanya admin yang dapat mengedit info group\n- Pilih open agar semua peserta dapat mengedit info group\n'
        },
        antilink: {
            isOff: 'Sebelumnya antilink belum di aktifkan di group ini!',
            off: 'Berhasil menonaktifkan antilink di group ini, semua peserta dapat mengirim link group whatsapp!',
            isOn: 'Sebelumnya antilink sudah aktif di group ini!',
            on: 'Berhasil mengaktifkan antilink di group ini, peserta yang mengirim link group whatsapp akan di keluarkan dari group!',
            mode: '*Antilink*\nAntilink group whatsapp, membatasi agar peserta tidak sembarangan mengirim link group lain ke dalam group ini\n\n- Pilih on agar peserta tidak dapat mengirim undangan link group lain!\n- Pilih off agar semua peserta bebas untuk mengirim link group lain kedalam group ini!\n'
        },
        nameGc: {
            text: 'Masukkan nama group baru!\n*Contoh* : ',
            newName: 'Berhasil memperbarui nama group menjadi : '
        },
        descGc: {
            text: 'Masukkan deskripsi group baru!\n*Contoh* : ',
            newDesc: 'Berhasil memperbarui deskripsi group menjadi : '
        },
        ppBot: {
            reply: 'Kirim gambar atau reply gambar yang sudah dikirim dengan caption',
            ok: 'Photo profil WhatsApp Bot Multi Device berhasil de perbarui!'
        },
        ppGc: {
            reply: 'Kirim gambar atau reply gambar yang sudah dikirim dengan caption',
            ok: 'Icon group berhasil di perbarui!'
        },
        bgWelcome: {
            reply: 'Kirim gambar atau reply gambar yang sudah dikirim dengan caption',
            ok: 'Berhasil mengganti background canvas pesan selamat datang!'
        },
    },
    en: {
        callBlock: `Don't call bots!!\nNow your number has been blocked automatically by the bot system!\nTo unblock please contact owner\nwa.me/6285785445412 (owner)`,
        lang: 'The language used in this chat is now in ',
        error: `Error!, make sure the requested parameters have been entered correctly!\nPlease try again in a few more moments and don't spam!\n\nIf you still can't, please report it to the bot owner!!`,
        vokalM: 'Send/reply text with caption',
        enterLink: '*Error*, please enter the link correctly!',
        success: '✓ Success',
        admin: 'This feature can only be used by admin!',
        botAdmin: 'Bot must be admin!',
        owner: 'This feature can only be used by bot owners!',
        group: 'This feature can only be used in groups!',
        private: 'This feature can only be used in private chat!',
        bot: 'This feature can only be used by bot users',
        wait: 'Loading....',
        join: {
            gcFull: `Sorry the group is full!, bots can't join the group`,
            success: 'Successfully joined the group',
            gcMin: 'Sorry, the minimum group member must be 15 participants!'
        },
        endLimit: 'Your limit today has run out, the limit will be refreshed every 00:00',
        pd: {
            userPm: 'Tag/reply users who want to be promoted to admin group',
            promote: 'Successfully promoted group members to group admins',
            promote2: 'The user is already a group admin',
            userDm: 'Tag/reply admin who wants to be demoted to become a member of the group',
            demote: 'Successfully demoted group admin to group member!',
            demote2: 'The user is not a group admin!',
        },
        group: {
            isOpen: 'Previous groups are not restricted, all participants can send messages!',
            open: 'Groups are now no longer restricted!, all participants can send messages!',
            isClose: 'Previously the group had been restricted so that only admins could send messages!',
            close: 'Groups are now restricted!, so only admins can send messages!',
            mode: '*Restrictions on Sending Messages*\nRestricting messages so that only admins or all participants can send messages to the group\n\n- Select close so that only admins can send messages\n- Select open so that all participants can send messages\n'
        },
        gcInfo: {
            isFalse: 'Previous groups are not restricted, all participants can edit group info!',
            fal: 'Groups are now no longer restricted!, all participants can edit group info!',
            isTrue: 'Previously the group had been restricted so that only admins could edit group info!',
            tru: 'Groups are now restricted!, so only admins can edit group info!',
            mode: '*Restrictions on Edit Info*\nRestricting so that only admins or all participants edit group info\n\n- Select close so that only admins can edit group info\n- Select open so that all participants can edit group info\n'
        },
        antilink: {
            isOff: 'Previously antilink has not been activated in this group!',
            off: 'Successfully deactivated antilink in this group, all participants can send whatsapp group link!',
            isOn: 'Previously antilink was active in this group!',
            on: 'Successfully activate antilink in this group, participants who send the whatsapp group link will be removed from the group!',
            mode: '*Antilink*\nAntilink whatsapp group, restricts participants from randomly sending other group links to this group\n\n- Select on so that participants cannot send invitations to other group links!\n- Select off so that all participants are free to send links another group into this group!\n'
        },
        nameGc: {
            text: 'Enter a new group name!\n*Example* : ',
            newName: 'Successfully updated group name to : '
        },
        descGc: {
            text: 'Enter a new group description!\n*Example* : ',
            newDesc: 'Successfully updated group description to : '
        },
        ppBot: {
            reply: 'Send a picture or reply to a picture that has been sent with a caption',
            ok: 'WhatsApp Bot Multi Device profile photo has been successfully updated!'
        },
        ppGc: {
            reply: 'Send a picture or reply to a picture that has been sent with a caption',
            ok: 'Icon group has been successfully updated!'
        },
        bgWelcome: {
            reply: 'Send a picture or reply to a picture that has been sent with a caption',
            ok: 'Successfully changed the welcome message canvas background!'
        },
    }
}
global.limitawal = {
    premium: "Infinity",
    free: 100
}
global.thumb = { url: 'https://telegra.ph/file/15bd797bc9aa97652bc7e.png' }
global.loli = { url: 'https://telegra.ph/file/15bd797bc9aa97652bc7e.png' }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.green(`File '${__filename}' up to date!!`))
    delete require.cache[file]
    require(file)
})
