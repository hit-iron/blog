const mongoose = require('mongoose');

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 评论人用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 评论时间
    time: {
        type: Date
    },
    // 评论内容
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}