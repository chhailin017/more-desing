const Product = require("../models/product");
const getAllProducts = async (req, res) => {
    const {file, name, price, sort, select, image} = req.query;
    const queryObject = {};

    if(file){
        queryObject.file = file;
    }

    if(image){
        queryObject.image = image;
    }

    if(price){
        queryObject.price = price;
    }

    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        // let selecttFix = select.replace(","," ");
        let selecttFix = select.split(",").join(" ");
        apiData = apiData.select(selecttFix);
    }


    // pagination
    // let page = Number(req.query.page) || 1;
    // let limit = Number(req.query.limit) || 12;

    // let skip = (page - 1) * limit;

    // apiData = apiData.skip(skip).limit(limit);
    // pagination close

    const products = await apiData;
    res.status(200).json({products, nbHits: products.length});
};

const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find(req.query);
    res.status(200).json({myData});
};

module.exports = {getAllProducts, getAllProductsTesting};