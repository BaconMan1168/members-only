const db = require ('../models/queries')
const isAuth = require('../authMiddleware').isAuth

async function getHomePage(req, res){
    const msgs = await db.getMessages();

    if (req.user){
        if (msgs.length === 0){
            res.redirect('/create-message');
        }
        else if (req.user.is_admin){
            res.render('index', { messages: msgs, isMember: true, isAdmin: true })
        }
        else if (req.user.is_member){
            res.render('index', { messages: msgs, isMember: true, isAdmin: false })
        }
        else {
            res.render('index', { messages: msgs, isMember: false, isAdmin: false })
        }
    }
    else {
        res.redirect('/users/sign-up')
    }
}

const getMessageForm = [
    isAuth,
    async (req, res) => {
        res.render('messageForm')
    }
]


async function postMessage(req, res){
    const msg = req.body;
    
    const fullData = {
        title: msg.title,
        message_text: msg.message_text,
        user_id: req.user.id,
        date_posted: new Date().toDateString()
    }

    await db.createMessage(fullData);
    res.redirect('/')
}

async function deleteMessage(req, res){
    const messageId = req.body.message_id;
    await db.deleteMessage(messageId);
    res.redirect('/');
}

module.exports = {
    getHomePage,
    postMessage,
    deleteMessage,
    getMessageForm
}