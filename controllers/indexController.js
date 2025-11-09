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