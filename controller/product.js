const asyncHandler = require("express-async-handler");
const ErrorBuilder = require("../utils/errorBuilder");
const { Op, where } = require("sequelize");
const FileUpload = require("../utils/file-upload");

// api/v1/products
exports.getProducts = asyncHandler(async (req, res, next) => {
    const products = await req.db.product.findAll({
        attributes: ['id', 'title', 'description', 'images', 'price', 'tags', 'wallet', 'createdAt', 'updatedAt'],
        include: [
            {
                model: req.db.user,
                attributes: ['email', 'image', 'phone']
            }
        ],
        where: [
            {[Op.and]: [
                {isPublished: 1},
                {isFeatured: 0},
            ]}
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
    });
    return res.status(200).json({
        status: 200,
        products
    });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    if(!id) {
        throw new ErrorBuilder('"(id)": Бүтээгдэхүүний ID илгээнэ үү.', 400);
    }
    const check = await req.db.product.count({where: [
        {[Op.and]: [
            {isPublished: 1},
            {id: id},
        ]}
    ],})
    if(check !== 1) {
        throw new ErrorBuilder(`"(id ::: ${id})": Дугаартай барааны мэдээлэл олдсонгүй. Та хүсэлтээ шалгана уу?`, 400);
    }
    const product = await req.db.product.findOne({
        attributes: ['id', 'title', 'description', 'images', 'price', 'tags', 'wallet', 'createdAt', 'updatedAt'],
        include: [
            {
                model: req.db.user,
                attributes: ['email', 'image', 'phone']
            }
        ],
        where: [
            {[Op.and]: [
                {isPublished: 1},
                {isFeatured: 0},
                {id: id},
            ]}
        ]
    });
    return res.status(200).json({
        status: 200,
        product
    });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
    const {title, description, isPublished = true, isFeatured = false} = req.body;
    if(!title || !description) {
        throw new ErrorBuilder('"(title, description)": Бүртгэлийн мэдээллээ бүрэн оруулна уу?', 400);
    }
    if(!(req?.files?.image ?? null)) {
        throw new ErrorBuilder('Cover зураг хуулна уу?', 400);
    }
    req.body.images = await FileUpload({ file: req.files.image, dir: './public/upload/product/', rte: 'products' })
    req.body.userId = req.userId
    await req.db.product.create(req.body);
    return res.status(200).json({
        status: 200,
        message: `"${title}" бүтээгдэхүүн нэмэгдлээ.`
    });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if(!id) {
        throw new ErrorBuilder('"(id)": Барааны дугаар илгээнэ үү?', 400);
    }
    const check = await req.db.product.count({where: [
        {[Op.and]: [
            {isPublished: 1},
            {id: parseInt(id)},
        ]}
    ],})
    if(check !== 1) throw new ErrorBuilder(`"(id: ${id})": Дугаартай барааны мэдээлэл олдсонгүй. Та хүсэлтээ шалгана уу?`, 400);
    const product = await req.db.product.findOne({
        where: {
            id: parseInt(id)
        }
    })
    if(req.files && req.files.image) {
        req.body.images = await FileUpload({ file: req.files.image, dir: './public/upload/product/', rte: 'products', old: product.images, module: 'product' })
    }
    await req.db.product.update(req.body, {
        where: {id: id}
    });
    return res.status(200).json({
        status: 200,
        message: `Бүтээгдэхүүний мэдээлэл шинэчлэгдлээ.`
    });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const {id} = req.params
    if(!id) {
        throw new ErrorBuilder('"(id)": Бүтээгдэхүүний ID илгээнэ үү.', 400);
    }
    const check = await req.db.product.count({where: [
        {[Op.and]: [
            {isPublished: 1},
            {id: id},
        ]}
    ],})
    if(check !== 1) {
        throw new ErrorBuilder(`"(id ::: ${id})": Дугаартай барааны мэдээлэл олдсонгүй. Та хүсэлтээ шалгана уу?`, 400);
    }
    await req.db.product.update({
        isPublished: 0
    }, {
        where: {id: id}
    })
    return res.status(200).json({
        status: 200,
        message: `"(id ::: ${id}): Дугаартай барааны мэдээлэл устлаа."`
    });
});