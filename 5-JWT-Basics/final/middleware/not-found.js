const notFound = (req, res) => {
    return res.status(404).json({message: 'route does not exist'})
}

module.exports = notFound;