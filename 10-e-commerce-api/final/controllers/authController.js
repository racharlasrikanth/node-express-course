const register = async (req, res) => {
    res.send('register');
}

const login = async (req, res) => {
    res.send('login');
}

const logout = async (req, res) => {
    res.send('logout')
}

module.exports = {
    register,
    login,
    logout
}