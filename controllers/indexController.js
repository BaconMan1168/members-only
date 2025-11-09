const db = require ('../models/queries')

async function getHomePage(req, res){
    const msgs = db.getMessages();

    if (req.user){
        if (req.user.is_admin){
            res.render('index', { messages: msgs, isMember: true, isAdmin: true })
        }
        else if (req.user.is_member){
            res.render('index', { messages: msgs, isMember: true, isAdmin: false })
        }
    }
    else {
        res.redirect('/users/sign-up')
    }
}

async function postMessage(req, res){
    const msg = req.body;
    await db.createMessage(msg);
    res.redirect('/')
}

async function deleteMessage(req, res){
    const messageId = req.body.message_id;
    await db.deleteMessage(messageId);
    res.redirect('/');
}