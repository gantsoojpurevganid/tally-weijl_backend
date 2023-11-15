const asyncHandler = require("express-async-handler");
const ErrorBuilder = require("../utils/errorBuilder");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const FileUpload = require("../utils/file-upload");

// api/v1/users
exports.getUsers = asyncHandler(async (req, res, next) => {
    const users = await req.db.user.findAll({
        order:[
            ['createdAt', 'DESC']
        ],
        attributes: ["id", "lname", "fname", "phone", "phone2", "permission", "address", "image", "email", "email", "createdAt", "updatedAt"],
        where: {
            id: {
                [Op.not]: req.userId
            }
        }
    });
    return res.status(200).json({
        status: 200,
        data: users
    });
});

exports.getUser = asyncHandler(async (req, res, next) => {
    if(req.params.id == req.userId) {
        return res.status(200).json({
            status: 200,
            data: []
        });
    }
    const user = await req.db.user.findOne({
        where: {
            [Op.and]: [
                {id: req.params.id}
            ]
        },
        attributes: ["id", "lname", "fname", "phone", "phone_verified", "image", "nickname", "email", "email_verified_at", "permission", "address", "phone2", "createdAt", "updatedAt"]
    });

    if(!user)
    {
        return res.status(200).json({
            status: 201,
            error: req.params.id+' ID тай хэрэглэгчийн мэдээлэл олдсонгүй!'
        });
    }

    return res.status(200).json({
        status: 200,
        data: user
    });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
    const user = await req.db.user.findOne({
        where: {id: req.userId},
        attributes: ["id", "lname", "fname", "phone", "phone_verified", "image", "nickname", "email", "email_verified_at", "permission", "address", "phone2", "createdAt", "updatedAt"]
    });

    return res.status(200).json({
        status: 200,
        data: user
    });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
    if(req.body.password)
    {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const udata = await req.db.user.findOne({
        where: {
            id: req.userId
        }
    });
    if(req.body.email) {
        const checkOldEmail = await req.db.user.count({
            where: {
                [Op.and]: [
                    {email: req.body.email},
                    {
                        email: {
                            [Op.not]: udata.email
                        }
                    }
                ]
            }
        })
        if(checkOldEmail > 0) {
            throw new ErrorBuilder(`"${req.body.email}": Имэйл хаяг бүртгэлтэй байна.`, 400);
        }
    }
    if(req.body.phone) {
        const checkOldPhone = await req.db.user.count({
            where: {
                [Op.and]: [
                    {phone: req.body.phone},
                    {
                        phone: {
                            [Op.not]: udata.phone
                        }
                    }
                ]
            }
        })
        if(checkOldPhone > 0) {
            throw new ErrorBuilder(`"${udata.phone}": Утасны дугаар бүртгэлтэй байна.`, 400);
        }
    }

    ['phone_verified', 'image', 'email_verified_at', 'permission', 'remember_token', 'verify', 'createdAt', 'updatedAt'].forEach((el) => {
        if(req.body[el]) {
            delete req.body[el]
        }
    })

    await req.db.user.update(req.body, {
        where: {id: req.userId}
    });

    return res.status(200).json({
        status: 200,
        message: 'Профайл амжилттай шинэчиллээ.'
    });
});

exports.changeProfile = asyncHandler(async (req, res, next) => {
    if(!(req?.files?.image ?? null)) {
        throw new ErrorBuilder('Профайл зураг хуулна уу?', 400);
    }
    const uData = await req.db.user.findOne({
        where: {id: req.userId}
    })
    req.body.image = await FileUpload({ file: req.files.image, old: uData.image })
    await req.db.user.update({
        image: req.body.image
    }, {
        where: {id: req.userId}
    });
    return res.status(200).json({
        status: 200,
        message: 'Профайл амжилттай шинэчиллээ.'
    });
});

exports.updateProfileImage = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    if(!id) {
        throw new ErrorBuilder('"(id)": Хэрэглэгчийн ID илгээнэ үү.', 400);
    }
    if(parseInt(id) === req.userId) {
        return res.status(200).json({status: 200});
    }
    if(!(req?.files?.image ?? null)) {
        throw new ErrorBuilder('Профайл зураг хуулна уу?', 400);
    }
    const uData = await req.db.user.findOne({
        where: {id: id}
    })
    req.body.image = await FileUpload({ file: req.files.image, old: uData.image })
    await req.db.user.update({
        image: req.body.image
    }, {
        where: {id: id}
    });
    return res.status(200).json({
        status: 200,
        message: 'Профайл амжилттай шинэчиллээ.'
    });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if(!id) {
        throw new ErrorBuilder('"(id)": Хэрэглэгчийн ID илгээнэ үү.', 400);
    }
    if(parseInt(id) === req.userId) throw new ErrorBuilder('"ERR ::: ": SOMETHING WRONG!', 400);
    if(req.body.password)
    {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const udata = await req.db.user.findOne({where: {id: id}});
    if(req.body.email) {
        const checkOldEmail = await req.db.user.count({
            where: {
                [Op.and]: [
                    {email: req.body.email},
                    {
                        email: {
                            [Op.not]: udata.email
                        }
                    }
                ]
            }
        })
        if(checkOldEmail > 0) {
            throw new ErrorBuilder(`"${req.body.email}": Имэйл хаяг бүртгэлтэй байна.`, 400);
        }
    }
    if(req.body.phone) {
        const checkOldPhone = await req.db.user.count({
            where: {
                [Op.and]: [
                    {phone: req.body.phone},
                    {
                        phone: {
                            [Op.not]: udata.phone
                        }
                    }
                ]
            }
        })
        if(checkOldPhone > 0) {
            throw new ErrorBuilder(`"${udata.phone}": Утасны дугаар бүртгэлтэй байна.`, 400);
        }
    }

    ['phone_verified', 'image', 'email_verified_at', 'permission', 'remember_token', 'verify', 'createdAt', 'updatedAt'].forEach((el) => {
        if(req.body[el]) {
            delete req.body[el]
        }
    })

    await req.db.user.update(req.body, {
        where: {id: id}
    });

    return res.status(200).json({
        status: 200,
        message: 'Профайл амжилттай шинэчиллээ.'
    });
});

exports.createUser = asyncHandler(async (req, res, next) => {
    const {email, phone, password} = req.body;
    if(!email || !phone || !password) {
        throw new ErrorBuilder('"(email, phone, password)": Бүртгэлийн мэдээллээ бүрэн оруулна уу?', 400);
    }
    var check = await req.db.user.count({
        where: {email: email}
    });
    if(check > 0) throw new ErrorBuilder(`"${email}" имэйл хаяг бүртгэлтэй байна.`, 400);
    check = await req.db.user.count({
        where: {phone: phone}
    });
    if(check > 0) throw new ErrorBuilder(`"${phone}" утасны дугаар бүртгэлтэй байна.`, 400);

    const user = await req.db.user.create(req.body);
    const token = jwt.sign(
        { id: user.id, permission: user.permission },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRESIN,
        }
    );
    return res.status(200).json({
        status: 200,
        message: 'Хэрэглэгч амжилттай бүртгэлээ',
        token
    });
});

exports.getLogin = asyncHandler(async (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        throw new ErrorBuilder('(Имэйл, Утасны дугаар) болон нууц үг оруулна уу?', 400);
    }
    const user = await req.db.user.findOne({
        where: {
            [Op.or]: [
                {email: username},
                {phone: username},
            ]
        }
    });
    if(!user) {
        return res.status(200).json({
            status: 400,
            message: "(Имэйл, Утасны дугаар), нууц үг буруу байна!",
        });
    }

    var ok = await bcrypt.compare(password, user.password);
    if(!ok)
    {
        return res.status(200).json({
            status: 400,
            message: "Имэйл, нууц үг буруу байна!",
        });
    }
    const token = jwt.sign(
        { id: user.id, permission: user.permission },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRESIN,
        }
    );

    return res.status(200).json({
        status: 200,
        token,
    });
});