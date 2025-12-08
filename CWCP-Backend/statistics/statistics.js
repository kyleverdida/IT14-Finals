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

export const getAreaStats = async (req, res) => {
  try {
    const { area } = req.params;

    if (!area) {
      return res.status(400).json({ error: "Area parameter is required" });
    }

    // Total concerns in selected area
    const totalConcerns = await userconcern.countDocuments({ area });

    // Count per status
    const statusCounts = await userconcern.aggregate([
      { $match: { area } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } }
    ]);

    // Build response structure
    const resolved = statusCounts.find(s => s.status === "resolved")?.count || 0;
    const pending = statusCounts.find(s => s.status === "pending")?.count || 0;
    const ongoing = statusCounts.find(s => s.status === "ongoing")?.count || 0;

    res.status(200).json({
      area,
      totalConcerns,
      status: {
        resolved,
        pending,
        ongoing
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};