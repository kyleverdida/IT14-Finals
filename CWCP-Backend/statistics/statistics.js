import userconcern from "../model/postModel.js";
export const getPostStats = async (req, res) => {
  try {
    const totalPosts = await userconcern.countDocuments();

    // Group by status
    const statusStats = await userconcern.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } }
    ]);

    // Group by severity
    const severityStats = await userconcern.aggregate([
      { $group: { _id: "$severity", count: { $sum: 1 } } },
      { $project: { _id: 0, severity: "$_id", count: 1 } }
    ]);

    // Group by area
    const areaStats = await userconcern.aggregate([
      { $group: { _id: "$area", count: { $sum: 1 } } },
      { $project: { _id: 0, area: "$_id", count: 1 } }
    ]);

    // Optional: calculate resolved percentage if you have a "resolved" status
    const resolvedCount = await userconcern.countDocuments({ status: "resolved" });
    const resolvedPercentage = totalPosts > 0 ? ((resolvedCount / totalPosts) * 100).toFixed(2) : 0;

    res.status(200).json({
      totalPosts,
      resolvedPercentage: `${resolvedPercentage}%`,
      byStatus: statusStats,
      bySeverity: severityStats,
      byArea: areaStats
    });

  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
