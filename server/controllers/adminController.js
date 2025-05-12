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

async function getRevenueByName (req, res) {
    try {
        const orders = await Order.findAll({
            include: [{
                model: Gem,
                attributes: ['name', 'price']
            }],
            attributes: [],
        });

        const revenueMap = {};

        orders.forEach(order => {
            const name = order.Gem?.name || "Unknown";
            const price = parseFloat(order.Gem?.price) || 0;

            if (!revenueMap[name]) {
                revenueMap[name] = 0;
            }

            revenueMap[name] += price;
        });

        const revenuePerName = Object.entries(revenueMap).map(([name, value]) => ({
            name,
            value
        }));

        res.json(revenuePerName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
};

async function getRevenueByDay(req, res) {
    try {
        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({ error: "Month and year are required as query params." });
        }

        const startDate = new Date(year, month - 1, 1); // JS months are 0-indexed
        const endDate = new Date(year, month, 1); // next month

        // console.log(startDate)
        const orders = await Order.findAll({
            where: {
                createdAt: {
                    [Op.gte]: startDate,
                    [Op.lt]: endDate
                }
            },
            include: [{
                model: Gem,
                attributes: ['price']
            }],
            attributes: ['createdAt']
        });

        const dailyRevenueMap = {};

        orders.forEach(order => {
            const date = new Date(order.createdAt);
            const day = date.getDate(); // 1-31
            const price = parseFloat(order.Gem?.price) || 0;

            if (!dailyRevenueMap[day]) {
                dailyRevenueMap[day] = 0;
            }

            dailyRevenueMap[day] += price;
        });

        const dailyRevenue = Object.entries(dailyRevenueMap).map(([day, revenue]) => ({
            day: parseInt(day),
            revenue
        }));

        dailyRevenue.sort((a, b) => a.day - b.day);

        res.json(dailyRevenue);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong." });
    }
}



module.exports = { getAdminDashboardData,getRevenueByName,getRevenueByDay };
