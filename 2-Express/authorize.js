const authorize = (req, res, next) => {
    const {user} = req.query;
    if(user === 'emma'){
        req.user = {name: 'emma', id: 7}
        next();
    }else{
        res.status(401).send("UNAUTHORIZED");
    }
}

module.exports = authorize;