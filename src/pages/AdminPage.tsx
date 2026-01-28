import React, { useState, useEffect } from "react";
import { useContacts } from "../contexts/ContactContext";
import { useDashboard } from "../contexts/DashboardContext";
import { toast } from "react-hot-toast";
import {
  Users,
  Download,
  TrendingUp,
  Award,
  Search,
  Shield,
  Database,
  Loader,
  AlertCircle,
  Trash2,
  Building,
  MapPin,
  Calendar,
} from "lucide-react";

// User interface
interface AdminUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  joinedAt: Date;
  points: number;
  uploads: number;
  unlocks: number;
  isSuperAdmin?: boolean;
}

// Contact interface for admin
interface AdminContact {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  location: string;
  industry: string;
  experience: number;
  seniorityLevel?: string;
  skills?: string[];
  education?: string;
  workExperience?: string;
  email?: string;
  phone?: string;
  avatar: string;
  linkedinUrl?: string;
  linkedinId?: string;
  extraLinks?: string[];
  uploadedBy: string;
  uploadedAt: Date;
  uploaderName: string;
}

const AdminPage: React.FC = () => {
  const { contacts: userContacts, refreshContacts } = useContacts();
  const { refreshDashboard } = useDashboard();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "contacts">(
    "overview",
  );
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [adminContacts, setAdminContacts] = useState<AdminContact[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal state
  const [selectedContact, setSelectedContact] = useState<AdminContact | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mv-main-server.vercel.app/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch users");
      }

      const userData = await response.json();
      setUsers(
        userData.map((user: any) => ({
          id: user.id || user._id,
          name: user.name || user.email,
          email: user.email,
          isAdmin: user.isAdmin,
          points: user.points || 0,
          uploads: user.uploads || 0,
          unlocks: user.unlocks || 0,
          joinedAt: new Date(user.joinedAt || user.createdAt),
          isSuperAdmin: user.isSuperAdmin,
        })),
      );
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err instanceof Error ? err.message : "Failed to load user data");
      toast.error(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  // Fetch contacts data for admin
  const fetchAdminContacts = async () => {
    try {
      setLoadingContacts(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mv-main-server.vercel.app/api/admin/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch contacts");
      }

      const contactsData = await response.json();
      setAdminContacts(
        contactsData.map((contact: any) => ({
          id: contact.id || contact._id,
          name: contact.name || "",
          jobTitle: contact.jobTitle || "",
          company: contact.company || "",
          location: contact.location || "",
          industry: contact.industry || "",
          experience: contact.experience || 0,
          seniorityLevel: contact.seniorityLevel || "",
          skills: Array.isArray(contact.skills) ? contact.skills : [],
          education: contact.education || "",
          workExperience: contact.workExperience || "",
          email: contact.email || "",
          phone: contact.phone || "",
          avatar:
            contact.avatar ||
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
          linkedinUrl: contact.linkedinUrl || "",
          linkedinId: contact.linkedinId || "",
          extraLinks: Array.isArray(contact.extraLinks)
            ? contact.extraLinks
            : [],
          uploadedBy: contact.uploadedBy || "",
          uploadedAt: new Date(contact.uploadedAt),
          uploaderName: contact.uploaderName || "Unknown",
        })),
      );
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load contact data",
      );
      toast.error(
        err instanceof Error ? err.message : "Failed to load contacts",
      );
    } finally {
      setLoadingContacts(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
    fetchAdminContacts();
  }, []);

  // Handle view contact modal
  const handleViewContact = (contact: AdminContact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  // Stats calculation
  const stats = [
    {
      name: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Total Contacts",
      value: adminContacts.length,
      icon: Database,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Total Points Distributed",
      value: users.reduce((sum, user) => sum + user.points, 0),
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Active This Month",
      value: users.filter(
        (user) =>
          new Date().getMonth() === user.joinedAt.getMonth() &&
          new Date().getFullYear() === user.joinedAt.getFullYear(),
      ).length,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Export all data as JSON
  const handleExportAllData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mv-main-server.vercel.app/api/admin/export",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to export data");
      }

      const exportData = await response.json();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `platform_export_${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Data exported successfully");
    } catch (err) {
      console.error("Export error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to export data");
    }
  };

  // Export contacts as CSV
  const handleExportContactsCSV = () => {
    try {
      if (adminContacts.length === 0) {
        toast.error("No contacts to export");
        return;
      }

      const headers = [
        "Name",
        "Job Title",
        "Company",
        "Industry",
        "Experience",
        "Uploaded By",
        "Uploader Name",
        "Uploaded At",
      ];

      const csvContent = [
        headers.join(","),
        ...adminContacts.map(
          (contact) =>
            `"${contact.name.replace(/"/g, '""')}","${contact.jobTitle.replace(
              /"/g,
              '""',
            )}","${contact.company.replace(
              /"/g,
              '""',
            )}","${contact.industry.replace(/"/g, '""')}",${
              contact.experience
            },"${contact.uploadedBy.replace(
              /"/g,
              '""',
            )}","${contact.uploaderName.replace(
              /"/g,
              '""',
            )}","${contact.uploadedAt.toISOString()}"`,
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `contacts_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Contacts exported successfully");
    } catch (err) {
      console.error("Export error:", err);
      toast.error("Failed to export contacts");
    }
  };

  // Handle contact delete
  const handleDeleteContact = async (contactId: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://mv-main-server.vercel.app/api/admin/contacts/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete contact");
      }

      // Update local state immediately
      setAdminContacts((prev) =>
        prev.filter((contact) => contact.id !== contactId),
      );
      refreshContacts();

      toast.success("Contact deleted successfully");
      await refreshDashboard();
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting contact:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to delete contact",
      );
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter contacts based on search
  const filteredContacts = adminContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.uploaderName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Render loading state for each tab
  const renderLoadingState = () => {
    if (activeTab === "users" && loadingUsers) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        </div>
      );
    }

    if (activeTab === "contacts" && loadingContacts) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
        </div>
      );
    }

    return null;
  };

  // Render empty state for each tab
  const renderEmptyState = () => {
    if (activeTab === "users" && !loadingUsers && filteredUsers.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No users match your search" : "No users found"}
        </div>
      );
    }

    if (
      activeTab === "contacts" &&
      !loadingContacts &&
      filteredContacts.length === 0
    ) {
      return (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? "No contacts match your search" : "No contacts found"}
        </div>
      );
    }

    return null;
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://mv-main-server.vercel.app/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to delete user");
      }

      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
      await refreshDashboard();
      await fetchAdminContacts();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  // Handle toggle admin status
  const handleToggleAdmin = async (userId: string, makeAdmin: boolean) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://mv-main-server.vercel.app/api/admin/users/${userId}/toggle-admin`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || `Failed to ${makeAdmin ? "promote" : "demote"} user`,
        );
      }

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, isAdmin: makeAdmin } : user,
        ),
      );

      toast.success(
        `User ${makeAdmin ? "promoted to" : "removed from"} admin successfully`,
      );
    } catch (err) {
      console.error("Error toggling admin status:", err);
      toast.error(
        err instanceof Error
          ? err.message
          : `Failed to ${makeAdmin ? "promote" : "demote"} user`,
      );
    }
  };

  // Render modal if open
  if (isModalOpen && selectedContact) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Contact Details
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex items-start space-x-6 mb-8">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedContact.name}
                </h3>
                <p className="text-xl text-blue-600 font-medium mb-4">
                  {selectedContact.jobTitle}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building className="w-5 h-5" />
                    <span>{selectedContact.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedContact.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedContact.experience} years experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Contact Details */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Full Name :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Job Title :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.jobTitle || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Company :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.company || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Industry :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.industry || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Experience :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.experience || 0} years
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Seniority Level :
                    </span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.seniorityLevel || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Email :</span>
                    <p className="text-blue-700 font-medium break-all">
                      {selectedContact.email || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone :</span>
                    <p className="text-blue-700 font-medium">
                      {selectedContact.phone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      LinkedIn URL :{" "}
                    </span>
                    <a
                      href={selectedContact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 break-all"
                    >
                      {selectedContact.linkedinUrl || "N/A"}
                    </a>
                  </div>
                  {selectedContact.extraLinks &&
                    selectedContact.extraLinks.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">
                          Extra Links :
                        </span>
                        <div className="space-y-1">
                          {selectedContact.extraLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm break-all block"
                            >
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              {/* Professional Details */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Professional Details
                </h4>
                <div className="space-y-4">
                  {selectedContact.education && (
                    <div>
                      <span className="text-sm text-gray-500">Education :</span>
                      <p className="text-gray-900">
                        {selectedContact.education}
                      </p>
                    </div>
                  )}

                  {selectedContact.skills &&
                    selectedContact.skills.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">Skills :</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedContact.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {selectedContact.workExperience && (
                    <div>
                      <span className="text-sm text-gray-500">
                        Work Experience :
                      </span>
                      <div className="bg-white rounded p-3 mt-1 whitespace-pre-wrap text-sm">
                        {selectedContact.workExperience}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Information */}
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Upload Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Uploaded By :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.uploaderName}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Upload Date :</span>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Contact ID :</span>
                    <p className="text-green-700 font-mono text-sm break-all">
                      {selectedContact.id}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage users, contacts, and platform analytics
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Admin Access
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col items-start w-[10%] gap-5 sticky top-28 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`font-medium transition-colors ${
              activeTab === "overview"
                ? "text-blue-700 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`font-medium transition-colors ${
              activeTab === "users"
                ? "text-blue-700 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Users ( {users.length} )
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`font-medium transition-colors ${
              activeTab === "contacts"
                ? "text-blue-700 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Contacts ( {adminContacts.length} )
          </button>
        </div>

        {/* Content */}
        <div className="w-[85%] min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-9">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.name}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 py-6 px-3 hover:shadow-lg"
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
          <div>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Platform Overview
                  </h2>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleExportContactsCSV}
                      disabled={adminContacts.length === 0}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Contacts CSV</span>
                    </button>
                    <button
                      onClick={handleExportAllData}
                      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export All Data</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            New user registered
                          </p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Database className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            5 contacts uploaded
                          </p>
                          <p className="text-xs text-gray-500">4 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Top Contributors
                    </h3>
                    <div className="space-y-3">
                      {users
                        .sort((a, b) => b.uploads - a.uploads)
                        .slice(0, 3)
                        .map((user, index) => (
                          <div
                            key={user.id}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-700">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {user.uploads} uploads
                              </p>
                            </div>
                            <div className="text-sm font-medium text-gray-700">
                              {user.points} pts
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                {error && activeTab === "users" && (
                  <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    User Management
                  </h2>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {renderLoadingState() || (
                  <div className="overflow-x-auto pt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                        >
                          {/* User Avatar */}
                          <div className="p-6 pb-4">
                            <div className="flex items-center justify-center">
                              <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                                  user.isSuperAdmin
                                    ? "bg-purple-100 text-purple-800 shadow-md shadow-purple-300"
                                    : user.isAdmin
                                    ? "bg-red-100 text-red-800 shadow-md shadow-red-300"
                                    : "bg-green-100 text-green-800 shadow-md shadow-green-300"
                                }`}
                              >
                                <Users
                                  className={`w-8 h-8 ${
                                    user.isSuperAdmin
                                      ? "text-purple-800"
                                      : user.isAdmin
                                      ? "text-red-800"
                                      : "text-green-800"
                                  }`}
                                />
                              </div>
                            </div>
                          </div>

                          {/* User Info */}
                          <div className="px-6 pb-6">
                            <div className="text-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {user.name}
                              </h3>
                              <p className="text-blue-600 text-sm mb-2">
                                {user.email}
                              </p>
                              <div className="flex items-center justify-center space-x-2 mb-3">
                                {user.isSuperAdmin ? (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border-x-2 border-purple-300">
                                    Super Admin
                                  </span>
                                ) : user.isAdmin ? (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border-x-2 border-red-300">
                                    Admin
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-x-2 border-green-300">
                                    User
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Points
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {user.points}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Uploads
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {user.uploads}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Unlocks
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {user.unlocks}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Joined Date */}
                            <div className="text-center mb-4">
                              <p className="text-sm text-gray-600">Joined</p>
                              <p className="font-medium text-gray-900">
                                {user.joinedAt.toLocaleDateString()}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                              {(() => {
                                // Get current user from localStorage
                                const currentUserStr =
                                  localStorage.getItem("user");
                                const currentUser = currentUserStr
                                  ? JSON.parse(currentUserStr)
                                  : null;
                                const isCurrentUserSuperAdmin =
                                  currentUser?.isSuperAdmin === true;
                                const isCurrentUser =
                                  user.id === currentUser?.id;

                                // Only super admins can see action buttons
                                if (!isCurrentUserSuperAdmin) {
                                  return null;
                                }

                                // Super admin's own card - no buttons
                                if (isCurrentUser && user.isSuperAdmin) {
                                  return null;
                                }

                                return (
                                  <>
                                    {/* Make Admin button - for regular users only */}
                                    {!user.isAdmin && !user.isSuperAdmin && (
                                      <button
                                        onClick={() =>
                                          handleToggleAdmin(user.id, true)
                                        }
                                        className="w-full bg-purple-100 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors"
                                      >
                                        Make Admin
                                      </button>
                                    )}

                                    {/* Remove Admin button - for admin users only (not super admins) */}
                                    {user.isAdmin && !user.isSuperAdmin && (
                                      <button
                                        onClick={() =>
                                          handleToggleAdmin(user.id, false)
                                        }
                                        className="w-full bg-yellow-100 text-yellow-600 py-2 rounded-lg font-medium hover:bg-yellow-200 transition-colors"
                                      >
                                        Remove Admin
                                      </button>
                                    )}

                                    {/* Delete button - for non-super-admin users only */}
                                    {!user.isSuperAdmin && (
                                      <button
                                        onClick={() =>
                                          handleDeleteUser(user.id)
                                        }
                                        className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                      </button>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {renderEmptyState()}
                  </div>
                )}
              </div>
            )}

            {activeTab === "contacts" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Contact Database
                  </h2>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={handleExportContactsCSV}
                      disabled={adminContacts.length === 0}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {renderLoadingState() || (
                  <div className="overflow-x-auto pt-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 cursor-pointer"
                          onClick={() => handleViewContact(contact)}
                        >
                          {/* Profile Image */}
                          <div className="p-6 pb-4">
                            <div className="flex items-center justify-center">
                              <img
                                src={contact.avatar}
                                alt={contact.name}
                                className="w-20 h-20 rounded-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="px-6 pb-6">
                            <div className="text-center mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {contact.name}
                              </h3>
                              <p className="text-blue-600 font-medium mb-2">
                                {contact.jobTitle}
                              </p>
                              <div className="flex items-center justify-center space-x-1 text-gray-600 mb-2">
                                <Building className="w-4 h-4" />
                                <span className="text-sm">
                                  {contact.company}
                                </span>
                              </div>
                              <div className="flex items-center justify-center space-x-1 text-gray-600">
                                <MapPin className="w-4 h-4" />
                                <span className="text-xs">
                                  {contact.location}
                                </span>
                              </div>
                            </div>

                            {/* Upload Info */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">
                                  Uploaded by :
                                </span>
                                <span className="font-medium text-gray-900">
                                  {contact.uploaderName}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm mt-1">
                                <span className="text-gray-600">
                                  Upload Date :
                                </span>
                                <span className="font-medium text-gray-900">
                                  {contact.uploadedAt.toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteContact(contact.id);
                                }}
                                className="w-full bg-red-50 text-red-600 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {renderEmptyState()}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
