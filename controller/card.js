const asyncHandler = require("express-async-handler");
const ErrorBuilder = require("../utils/errorBuilder");
const { Op } = require("sequelize");

// api/v1/card
exports.getCard = asyncHandler(async (req, res, next) => {
    const card = await req.db.card.findAll({
        attributes: ['id', 'price', 'qty'],
        include: [
            {
                model: req.db.user,
                attributes: ['email', 'image', 'phone']
            },
            {
                model: req.db.product,
                attributes: ['id', 'title', 'description', 'images', 'price', 'tags', 'wallet'],
                where: [
                    {isPublished: 1}
                ],
            }
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
        where: [
            {[Op.and]: [
                {isOrder: 0},
                {id: req.userId},
            ]}
        ],
    });
    return res.status(200).json({
        status: 200,
        card
    });
});
exports.addCard = asyncHandler(async (req, res, next) => {
    const { pid, qty = 1 } = req.body
    if(!pid) {
        throw new ErrorBuilder('"(id)": Бүтээгдэхүүний ID илгээнэ үү.', 400);
    }
    const check = await req.db.product.count({where: [
        {[Op.and]: [
            {isPublished: 1},
            {id: pid},
        ]}
    ],})
    if(check !== 1) {
        throw new ErrorBuilder(`"(id ::: ${pid})": Дугаартай барааны мэдээлэл олдсонгүй. Та хүсэлтээ шалгана уу?`, 400);
    }
    const product = await req.db.product.findOne({
        where: [
            {[Op.and]: [
                {isPublished: 1},
                {id: pid},
            ]}
        ],
    })
    req.body.price = parseInt(product.price * qty)
    req.body.productId = pid
    req.body.userId = req.userId
    const checkOld = await req.db.card.count({
        where: [
            {[Op.and]: [
                {isOrder: 0},
                {productId: pid},
                {userId: req.userId},
            ]}
        ],
    })
    if(checkOld > 0) {
        const tmp = await req.db.card.findOne({
            where: [
                {[Op.and]: [
                    {isOrder: 0},
                    {productId: pid},
                    {userId: req.userId},
                ]}
            ],
        })
        await req.db.card.update({
            price: parseInt(tmp.price + (product.price * qty)),
            qty: tmp.qty + qty
        }, {
            where: [
                {[Op.and]: [
                    {isOrder: 0},
                    {productId: pid},
                    {userId: req.userId},
                ]}
            ],
        })
    } else {
        await req.db.card.create(req.body);
    }
    return res.status(200).json({
        status: 200,
        message: 'Бараа амжилттай сагслалаа.'
    });
});
exports.removeCard = asyncHandler(async (req, res, next) => {
    const { id, qty = 1 } = req.body
    if(!id) {
        throw new ErrorBuilder('"(id)": Сагсны ID илгээнэ үү.', 400);
    }
    const check = await req.db.card.count({where: [
        {[Op.and]: [
            {id: id},
            {isOrder: 0},
            {userId: req.userId},
        ]}
    ],})
    if(check !== 1) {
        throw new ErrorBuilder(`"(id ::: ${id})": Дугаартай сагсны мэдээлэл олдсонгүй. Та хүсэлтээ шалгана уу?`, 400);
    }
    const card = await req.db.card.findOne({
        where: [
            {[Op.and]: [
                {id: id},
                {isOrder: 0},
                {userId: req.userId},
            ]}
        ],
    })
    const product = await req.db.product.findOne({
        where: [
            {[Op.and]: [
                {id: card.productId},
                {isPublished: 1},
            ]}
        ],
    })
    if(card.qty > qty) {
        await req.db.card.update({
            price: parseInt(card.price - (product.price * qty)),
            qty: card.qty - qty
        }, {
            where: [
                {[Op.and]: [
                    {id: id},
                    {isOrder: 0},
                    {userId: req.userId},
                ]}
            ],
        })
    } else {
        req.db.card.destroy({
            where: [
                {[Op.and]: [
                    {isOrder: 0},
                    {id: id},
                    {userId: req.userId},
                ]}
            ],
        })
    }
    return res.status(200).json({
        status: 200,
        message: 'Бараа сагснаас сагслалаа.'
    });
});