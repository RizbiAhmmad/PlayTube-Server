import status from "http-status";
import { Role } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../../interfaces/requestUser";

const getDashboardStatsData = async (user: IRequestUser) => {
    let statsData;

    switch(user.role){
        case Role.SUPER_ADMIN:
            statsData = await getSuperAdminStatsData();
            break;
        case Role.ADMIN:
            statsData = await getAdminStatsData();
            break;
        case Role.USER:
            statsData = await getUserStatsData(user);
            break;
        default:
            throw new AppError(status.BAD_REQUEST, "Invalid user role");
    }

    return statsData;
}

const getSuperAdminStatsData = async () => {
    const adminCount = await prisma.user.count({
        where: { role: Role.ADMIN, isDeleted: false }
    });
    const superAdminCount = await prisma.user.count({
        where: { role: Role.SUPER_ADMIN, isDeleted: false }
    });
    const userCount = await prisma.user.count({
        where: { role: Role.USER, isDeleted: false }
    });

    return {
        adminCount,
        superAdminCount,
        userCount,
    }
}

const getAdminStatsData = async () => {
    const adminCount = await prisma.user.count({
        where: { role: Role.ADMIN, isDeleted: false }
    });
    const superAdminCount = await prisma.user.count({
        where: { role: Role.SUPER_ADMIN, isDeleted: false }
    });
    const userCount = await prisma.user.count({
        where: { role: Role.USER, isDeleted: false }
    });

    return {
        adminCount,
        superAdminCount,
        userCount,
    }
}

const getUserStatsData = async (user: IRequestUser) => {
    const userId = user.userId;
    
    const purchaseCount = await prisma.payment.count({
        where: { userId, status: 'PAID' }
    });

    const totalSpent = await prisma.payment.aggregate({
        where: { userId, status: 'PAID' },
        _sum: {
            amount: true
        }
    });

    const watchlistCount = await prisma.watchlist.count({
        where: { userId }
    });

    const reviewCount = await prisma.review.count({
        where: { userId }
    });

    return {
        purchaseCount,
        totalSpent: totalSpent._sum.amount || 0,
        watchlistCount,
        reviewCount
    };
}

const getAnalyticsData = async () => {
    // 1. Fetch all paid payments with media info
    const totalPayments = await prisma.payment.findMany({
        where: { status: 'PAID' },
        include: { media: { select: { title: true } } }
    });

    const totalRevenue = totalPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalSales = totalPayments.length;

    // 2. Revenue by Payment Type
    const typeDistribution = await prisma.payment.groupBy({
        by: ['paymentType'],
        _sum: { amount: true },
        _count: { id: true },
        where: { status: 'PAID' }
    });

    // 3. Sales over time (formatted for charts)
    const salesOverTimeMap = totalPayments.reduce((acc: Record<string, any>, payment) => {
        const date = new Date(payment.createdAt);
        const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
        if(!acc[monthYear]){
            acc[monthYear] = { month: monthYear, revenue: 0, count: 0, timestamp: date.getTime() };
        }
        acc[monthYear].revenue += payment.amount;
        acc[monthYear].count += 1;
        return acc;
    }, {});

    const salesOverTime = Object.values(salesOverTimeMap)
        .sort((a: any, b: any) => a.timestamp - b.timestamp)
        .map(({ timestamp, ...rest } : any) => rest);

    // 4. Top Selling Media
    const mediaSalesMap = totalPayments.reduce((acc: Record<string, any>, payment) => {
        if(payment.mediaId){
            const id = payment.mediaId;
            const title = payment.media?.title || 'Deleted Media';
            if(!acc[id]){
                acc[id] = { title, revenue: 0, count: 0 };
            }
            acc[id].revenue += payment.amount;
            acc[id].count += 1;
        }
        return acc;
    }, {});

    const topMedia = Object.values(mediaSalesMap)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);

    return {
        totalRevenue,
        totalSales,
        typeDistribution: typeDistribution.map(td => ({
            type: td.paymentType,
            revenue: td._sum.amount,
            count: td._count.id
        })),
        salesOverTime,
        topMedia
    };
}

export const StatsService = {
    getDashboardStatsData,
    getAnalyticsData
}
