const notFound = (req, res) => {
    res.status(404).json({ message: "Routes not found" });
}

module.exports = notFound;