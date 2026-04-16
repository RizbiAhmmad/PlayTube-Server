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
    return {};
}

export const StatsService = {
    getDashboardStatsData
}
