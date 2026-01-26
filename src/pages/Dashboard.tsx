import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDashboard } from "../contexts/DashboardContext";
import { useAuth } from "../contexts/AuthContext";
import {
  Users,
  Upload,
  Unlock,
  RefreshCw,
  Search,
  ArrowRight,
  Calendar,
  Award,
} from "lucide-react";

interface RecentActivityItem {
  action: string;
  timestamp: string;
  points?: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { dashboard, loading, error, refreshDashboard } = useDashboard();
  const [recentActivities, setRecentActivities] = useState<
    RecentActivityItem[]
  >([]);

  useEffect(() => {
    // Process recent activity from dashboard
    if (dashboard?.recentActivity && Array.isArray(dashboard.recentActivity)) {
      const processedActivities: RecentActivityItem[] = dashboard.recentActivity
        .map((activity) => {
          // Upload messages
          if (activity.toLowerCase().includes("uploaded linkedin profile")) {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: 10,
            };
          }
          // Update messages
          else if (
            activity.toLowerCase().includes("updated linkedin profile")
          ) {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: 5,
            };
          }
          // Unlock messages
          else if (
            activity.toLowerCase().includes("unlocked linkedin profile")
          ) {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: -20,
            };
          }
          // Refund messages (when admin deletes contact)
          else if (activity.toLowerCase().includes("refunded 20 points")) {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: 20,
            };
          }
          // Deduct messages (when admin deletes your uploaded contact)
          else if (activity.toLowerCase().includes("deducted 10 points")) {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: -10,
            };
          }
          // Default
          else {
            return {
              action: activity,
              timestamp: dashboard.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "Recent",
              points: 0,
            };
          }
        })
        .reverse();

      setRecentActivities(processedActivities);
    }
  }, [dashboard]);

  const stats = [
    {
      name: "Available Points",
      value: dashboard?.availablePoints ?? 0,
      icon: Award,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Uploaded Profiles",
      value: dashboard?.uploadedProfiles ?? 0,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Unlocked Profiles",
      value: dashboard?.unlockedProfiles ?? 0,
      icon: Unlock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Total Contacts",
      value: dashboard?.totalContacts ?? 0,
      icon: Search,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      name: "Search Contacts",
      description: "Find professionals with advanced filters",
      href: "/search",
      icon: Search,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Upload Contacts",
      description: "Add new contacts and earn points",
      href: "/upload",
      icon: Upload,
      color: "from-green-500 to-green-600",
    },
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading dashboard: {error}</p>
          <button
            onClick={refreshDashboard}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your contact network today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.name}
                    </h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              Last updated:{" "}
              {dashboard?.updatedAt
                ? new Date(dashboard.updatedAt).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.slice(0, 5).map((activity, index) => {
              // Determine activity type and colors
              let bgColor = "bg-blue-50";
              let iconBgColor = "bg-blue-200";
              let IconComponent = Award;
              let iconColor = "text-blue-600";

              if (
                activity.action
                  .toLowerCase()
                  .includes("uploaded linkedin profile")
              ) {
                bgColor = "bg-green-50";
                iconBgColor = "bg-green-200";
                IconComponent = Upload;
                iconColor = "text-green-600";
              } else if (
                activity.action
                  .toLowerCase()
                  .includes("updated linkedin profile")
              ) {
                bgColor = "bg-purple-50";
                iconBgColor = "bg-purple-200";
                IconComponent = RefreshCw;
                iconColor = "text-purple-600";
              } else if (
                activity.action
                  .toLowerCase()
                  .includes("unlocked linkedin profile")
              ) {
                bgColor = "bg-red-50";
                iconBgColor = "bg-red-200";
                IconComponent = Unlock;
                iconColor = "text-red-600";
              } else if (
                activity.action.toLowerCase().includes("refunded 20 points")
              ) {
                bgColor = "bg-green-50";
                iconBgColor = "bg-green-200";
                IconComponent = Award;
                iconColor = "text-green-600";
              } else if (
                activity.action.toLowerCase().includes("deducted 10 points")
              ) {
                bgColor = "bg-red-50";
                iconBgColor = "bg-red-200";
                IconComponent = Award;
                iconColor = "text-red-600";
              }

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${bgColor}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgColor}`}
                  >
                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.points !== undefined &&
                        activity.points !== 0 && (
                          <span
                            className={`font-medium ${
                              activity.points > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {activity.points > 0 ? "+" : ""}
                            {activity.points} points
                          </span>
                        )}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {activity.timestamp}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No recent activity</p>
              <p className="text-sm text-gray-400 mb-4">
                Start by uploading contacts or unlocking profiles to see your
                activity here.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Upload Contacts
                </Link>
                <Link
                  to="/search"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Browse Contacts
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Show More Activity Link */}
        {recentActivities.length > 5 && (
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All Activity ({recentActivities.length} total)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
