import type { Request } from "express";
import type { functionReturnObjectType } from "../../types/index";
import { DonationsModel, DonationStatus } from "../../models/Donations";
import { VolunteersModel, Status as VolunteerStatus } from "../../models/Volunteers";
import { HelpRequestsModel, Status as HelpRequestStatus } from "../../models/HelpRequests";

export const getDashboardStats = async (req: Request): Promise<functionReturnObjectType> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's donations
    const donationsToday = await DonationsModel.countDocuments({
      created_at: { $gte: today, $lt: tomorrow },
      status: { $in: [DonationStatus.COMPLETED, DonationStatus.APPROVED] }
    });

    // Get total donations all time
    const totalDonationsAllTime = await DonationsModel.countDocuments({
      status: { $in: [DonationStatus.COMPLETED, DonationStatus.APPROVED] }
    });

    // Get volunteer pending count
    const volunteerPendingCount = await VolunteersModel.countDocuments({
      status: VolunteerStatus.PENDING
    });

    // Get volunteer approved count
    const volunteerApprovedCount = await VolunteersModel.countDocuments({
      status: VolunteerStatus.APPROVED
    });

    // Get help request pending count
    const helpRequestPendingCount = await HelpRequestsModel.countDocuments({
      status: HelpRequestStatus.PENDING
    });

    // Get help request resolved count
    const helpRequestResolvedCount = await HelpRequestsModel.countDocuments({
      status: HelpRequestStatus.COMPLETED
    });

    // Additional useful stats
    const totalUsers = await DonationsModel.distinct('user_id').then(ids => ids.length);
    const totalVolunteers = await VolunteersModel.countDocuments();
    const totalHelpRequests = await HelpRequestsModel.countDocuments();
    
    // Get donations amount stats
    const donationsAmountStats = await DonationsModel.aggregate([
      {
        $match: {
          status: { $in: [DonationStatus.COMPLETED, DonationStatus.APPROVED] },
          amount: { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          averageAmount: { $avg: "$amount" },
          minAmount: { $min: "$amount" },
          maxAmount: { $max: "$amount" }
        }
      }
    ]);

    // Get donations by type
    const donationsByType = await DonationsModel.aggregate([
      {
        $match: {
          status: { $in: [DonationStatus.COMPLETED, DonationStatus.APPROVED] }
        }
      },
      {
        $group: {
          _id: "$donation_type",
          count: { $sum: 1 },
          totalAmount: { $sum: { $ifNull: ["$amount", 0] } }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentDonations = await DonationsModel.countDocuments({
      created_at: { $gte: sevenDaysAgo },
      status: { $in: [DonationStatus.COMPLETED, DonationStatus.APPROVED] }
    });

    const recentVolunteers = await VolunteersModel.countDocuments({
      created_at: { $gte: sevenDaysAgo }
    });

    const recentHelpRequests = await HelpRequestsModel.countDocuments({
      created_at: { $gte: sevenDaysAgo }
    });

    const stats = {
      // Required fields
      total_donations_today: donationsToday,
      total_donations_all_time: totalDonationsAllTime,
      volunteer_pending_count: volunteerPendingCount,
      volunteer_approved_count: volunteerApprovedCount,
      help_request_pending_count: helpRequestPendingCount,
      help_request_resolved_count: helpRequestResolvedCount,
      
      // Additional useful stats
      total_users: totalUsers,
      total_volunteers: totalVolunteers,
      total_help_requests: totalHelpRequests,
      
      // Financial stats
      donations_amount_stats: donationsAmountStats[0] || {
        totalAmount: 0,
        averageAmount: 0,
        minAmount: 0,
        maxAmount: 0
      },
      
      // Breakdown by type
      donations_by_type: donationsByType,
      
      // Recent activity
      recent_activity: {
        donations_last_7_days: recentDonations,
        volunteers_last_7_days: recentVolunteers,
        help_requests_last_7_days: recentHelpRequests
      }
    };

    return {
      success: {
        data: { stats },
        message: "Dashboard stats retrieved successfully",
        status: 200,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      error: {
        status: 500,
        message: "Failed to fetch dashboard stats",
      },
    };
  }
};