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
    const rejected = statusCounts.find(s => s.status === "rejected")?.count || 0;

    res.status(200).json({
      area,
      totalConcerns,
      status: {
        resolved,
        pending,
        ongoing,
        rejected
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTodayPostCount = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const count = await userconcern.countDocuments({
      createdAt: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



export const getResolvedPostPercentage = async (req, res) => {
  try {
    const totalPosts = await userconcern.countDocuments();

    if (totalPosts === 0) {
      return res.status(200).json({ percentage: 0 });
    }

    const resolvedPosts = await userconcern.countDocuments({
      status: "resolved",
    });

    const percentage = ((resolvedPosts / totalPosts) * 100).toFixed(2);

    res.status(200).json({
      percentage: Number(percentage),
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};