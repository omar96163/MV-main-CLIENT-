import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../contexts/DashboardContext";
import { Contact } from "../contexts/ContactContext";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  Eye,
  User,
  Search,
  Download,
  Loader,
  Heart,
  Award,
  Briefcase,
} from "lucide-react";

const MyContactsPage: React.FC = () => {
  const { user } = useAuth();
  const { dashboard } = useDashboard();

  // State declarations
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch unlocked contacts
  useEffect(() => {
    const fetchMyContacts = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch all profiles unlocked + uploaded
        const response = await fetch(
          `https://mv-main-server.vercel.app/profiles/mine?userId=${user.id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const allProfiles = await response.json();

        const myContacts = allProfiles;

        // Transform the data
        const transformedContacts = myContacts.map((profile: any) => ({
          id: profile.id || profile._id,
          name: profile.name || "",
          jobTitle: profile.jobTitle || "",
          company: profile.company || "",
          location: profile.location || "",
          industry: profile.industry || "",
          experience: profile.experience || 0,
          seniorityLevel: profile.seniorityLevel || "",
          companySize: profile.companySize || "",
          skills: Array.isArray(profile.skills) ? profile.skills : [],
          education: profile.education || "",
          workExperience: profile.workExperience || "",
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar || "",
          isUnlocked: true,
          isOwnUpload: profile.isOwnUpload || false,
          uploadedBy: profile.uploadedBy || "",
          uploadedAt: profile.uploadedAt
            ? new Date(profile.uploadedAt)
            : new Date(),
          verified: profile.verified || false,
          hasContactInfo: !!(profile.email || profile.phone),
        }));

        setContacts(transformedContacts);
        setFilteredContacts(transformedContacts);
      } catch (err) {
        console.error("Error fetching my contacts:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load contacts",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyContacts();
  }, [user, dashboard]);

  // Filter contacts based on search (now includes work experience)
  useEffect(() => {
    let filtered = [...contacts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(query) ||
          contact.jobTitle.toLowerCase().includes(query) ||
          contact.company.toLowerCase().includes(query) ||
          contact.location.toLowerCase().includes(query) ||
          (contact.workExperience &&
            contact.workExperience.toLowerCase().includes(query)) ||
          contact.skills.some((skill) => skill.toLowerCase().includes(query)),
      );
    }

    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);

  // Export contacts as CSV (now includes work experience)
  const exportContacts = () => {
    if (filteredContacts.length === 0) return;

    const headers = [
      "Name",
      "Job Title",
      "Company",
      "Location",
      "Industry",
      "Experience",
      "Work Experience",
      "Email",
      "Phone",
      "Skills",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredContacts.map((contact) => {
        const formatField = (value) => {
          if (
            value === null ||
            value === undefined ||
            value === "" ||
            (Array.isArray(value) && value.length === 0)
          )
            return " -- ";
          if (Array.isArray(value)) return value.join("; ");
          return String(value).replace(/"/g, '""');
        };

        return [
          formatField(contact.name),
          formatField(contact.jobTitle),
          formatField(contact.company),
          formatField(contact.location),
          formatField(contact.industry),
          contact.experience,
          formatField(contact.workExperience),
          formatField(contact.email),
          formatField(contact.phone),
          formatField(contact.skills),
        ]
          .map((field) => `"${field}"`)
          .join(",");
      }),
    ].join("\n");

    const blob = new Blob(["\ufeff", csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-contacts-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading your contacts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium mb-2">
            Error Loading Contacts
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Contacts
            </h1>
            <p className="text-gray-600">
              Contacts you've unlocked and can reach out to
            </p>
          </div>

          {filteredContacts.length > 0 && (
            <button
              onClick={exportContacts}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.length}
                </p>
                <p className="text-gray-600">Total Unlocked</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.filter((c) => c.email).length}
                </p>
                <p className="text-gray-600">With Email</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {contacts.length * 20}
                </p>
                <p className="text-gray-600">Points Invested</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Unlocked Contacts Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by searching and unlocking contacts to build your network.
          </p>
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Contacts</span>
          </Link>
        </div>
      ) : (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center space-x-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Clear Search */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Clear</span>
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredContacts.length} of {contacts.length} unlocked
                contacts
              </p>
            </div>
          </div>

          {/* Contacts Grid */}
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No contacts match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  {/* Profile Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start space-x-4">
                      {contact.avatar ? (
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop";
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                          {contact.name ? (
                            contact.name
                          ) : (
                            <span className="italic text-gray-400">
                              No name
                            </span>
                          )}
                        </h3>

                        <p className="text-blue-600 font-medium mb-2 text-sm">
                          {contact.jobTitle ? (
                            contact.jobTitle
                          ) : (
                            <span className="italic text-gray-400">
                              No job title
                            </span>
                          )}
                        </p>

                        <div className="flex items-center space-x-1 text-gray-600 mb-1">
                          <Building className="w-3 h-3" />
                          <span className="text-xs truncate">
                            {contact.company ? (
                              contact.company
                            ) : (
                              <span className="italic text-gray-400">
                                No company
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs truncate">
                            {contact.location ? (
                              contact.location
                            ) : (
                              <span className="italic text-gray-400">
                                No location
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="px-6 pb-4">
                    <div className="flex items-center space-x-1 text-gray-600 mb-3">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs">
                        {contact.experience} years experience
                      </span>
                    </div>

                    {/* Work Experience Preview */}
                    <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-1 text-gray-700 mb-1">
                        <Briefcase className="w-3 h-3" />
                        <span className="text-xs font-medium">Experience</span>
                      </div>
                      {contact.workExperience ? (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {contact.workExperience.length > 80
                            ? `${contact.workExperience.substring(0, 80)}...`
                            : contact.workExperience}
                        </p>
                      ) : (
                        <p className="text-xs italic text-gray-400">
                          No experience
                        </p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      {contact.email &&
                      (Array.isArray(contact.email)
                        ? contact.email.length > 0
                        : contact.email.trim() !== "") ? (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {
                              (Array.isArray(contact.email)
                                ? contact.email
                                : [contact.email]
                              ).filter((e) => e.trim() !== "")[0]
                            }
                            {(Array.isArray(contact.email)
                              ? contact.email
                              : [contact.email]
                            ).filter((e) => e.trim() !== "").length > 1 &&
                              " ..."}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          <span className="text-sm italic text-gray-400">
                            N/A
                          </span>
                        </div>
                      )}

                      {contact.phone &&
                      (Array.isArray(contact.phone)
                        ? contact.phone.length > 0
                        : contact.phone.trim() !== "") ? (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {
                              (Array.isArray(contact.phone)
                                ? contact.phone
                                : [contact.phone]
                              ).filter((p) => p.trim() !== "")[0]
                            }
                            {(Array.isArray(contact.phone)
                              ? contact.phone
                              : [contact.phone]
                            ).filter((p) => p.trim() !== "").length > 1 &&
                              " ..."}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span className="text-sm italic text-gray-400">
                            N/A
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Skills Preview */}
                    <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
                      {contact.skills && contact.skills.length > 0 ? (
                        <>
                          {contact.skills.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium truncate max-w-[100px]"
                              title={skill}
                            >
                              {skill}
                            </span>
                          ))}
                          {contact.skills.length > 2 && (
                            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs whitespace-nowrap">
                              +{contact.skills.length - 2} skills
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs italic text-gray-400">
                          No skills
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 pb-6">
                    <Link
                      to={`/profile/${contact.id}`}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Profile</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyContactsPage;
