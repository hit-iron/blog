// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body)
    } catch (e) {
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }))
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {

        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }
    // 对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    req.body.password = password;
    await User.create(req.body);
    res.redirect('/admin/user');
}