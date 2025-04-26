const { Op, fn, col, literal } = require("sequelize");
const User = require("../models/User");
const Gem = require("../models/Gem");
const Order = require("../models/Order");

async function getAdminDashboardData(req,res) {
    // Total Users
    const totalUsers = await User.count();

    // Total Gems
    const totalGems = await Gem.count();

    // Gems listed for sale
    const gemsListed = await Gem.count({
        where: { isListed: true },
    });

    // Gems sold (Orders placed)
    const totalOrders = await Order.count();

    // Total Revenue
    const totalRevenueResult = await Order.findOne({
        attributes: [
            [fn('SUM', col('Gem.price')), 'totalRevenue']
        ],
        include: {
            model: Gem,
            attributes: [],
        },
        raw: true,
    });
    const totalRevenue = parseFloat(totalRevenueResult.totalRevenue) || 0;

    // AOV (Average Order Value)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Pending Orders
    const pendingOrders = await Order.count({
        where: { paymentStatus: 'Pending' } // this needs to be rechecked from safepay payment failed event payload
    });

    // Completed Orders
    const completedOrders = await Order.count({
        where: { paymentStatus: 'PAID' }
    });

    // Top Selling Gems (gemId with most orders)
    const topSellingGems = await Order.findAll({
        attributes: [
          'gemId',
          [fn('COUNT', col('gemId')), 'salesCount']
        ],
        group: ['gemId'],
        order: [[literal('"salesCount"'), 'DESC']],
        limit: 5
      });
      

    // New Users This Month
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const newUsersThisMonth = await User.count({
        where: {
            createdAt: {
                [Op.gte]: firstDayOfMonth,
            },
        },
    });

    // Revenue This Month
    const revenueThisMonthResult = await Order.findOne({
        attributes: [
            [fn('SUM', col('Gem.price')), 'revenueThisMonth']
        ],
        include: {
            model: Gem,
            attributes: [],
        },
        where: {
            createdAt: {
                [Op.gte]: firstDayOfMonth,
            },
        },
        raw: true,
    });
    const revenueThisMonth = parseFloat(revenueThisMonthResult.revenueThisMonth) || 0;

    const stats = {
        totalUsers,
        totalGems,
        gemsListed,
        totalOrders,
        totalRevenue,
        averageOrderValue,
        pendingOrders,
        completedOrders,
        topSellingGems,
        newUsersThisMonth,
        revenueThisMonth,
    };

    res.status(200).json({
        status:"Success",
        data:stats
    })

}

module.exports = { getAdminDashboardData };
