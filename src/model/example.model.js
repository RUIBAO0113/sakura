const {
    DataTypes
} = require('sequelize')

const seq = require('../db/seq')

// 创建模型(Model zd_user -> 表 zd_users)
const User = seq.define('zd_user', {
    // id 会被sequelize自动创建, 管理
    user_id: {
        type: DataTypes.INTEGER,
        // 是否可以为null
        allowNull: false,
        // 是否自增
        autoIncrement: true,
        // 主键
        primaryKey: true,
        // 字段注解
        comment: '用户名, 唯一',
    },
    user_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: '用户名',
    },
    user_tel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '电话名',
    },
    user_sex: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '性别 0女 1男',
    },
    user_birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '注册日期'
    }
}, {
    tableName: 'zd_user',
    // 是否禁用createAt ... 字段
    timestamps: false
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

module.exports = User