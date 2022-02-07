const getAllProductsStatic = async (req, res) => {
    throw new Error('testing async errors')
    res.status(200).json({ msg:"product testing route"} )
}

const getAllProducts = (req, res) => {
    res.status(200).json({ msg:'product route' })
}

module.exports={
    getAllProducts, getAllProductsStatic
}