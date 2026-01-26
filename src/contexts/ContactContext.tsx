// src/contexts/ContactContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

export interface Contact {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  location: string;
  industry: string;
  experience: number;
  seniorityLevel: string;
  companySize?: string;
  skills: string[];
  education: string;
  workExperience?: string;
  email?: string;
  phone?: string;
  avatar: string;
  isUnlocked: boolean;
  uploadedBy: string;
  uploadedAt: Date;
  verified?: boolean;
  hasContactInfo?: boolean;
  extraLinks?: string[];
  linkedinUrl?: string;
}

export interface SearchFilters {
  query?: string;
  linkedinUrl?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  industry?: string;
  seniorityLevel?: string;
  companySize?: string;
  skills?: string[];
  experience?: { min: number; max: number };
  verified?: boolean;
  hasContactInfo?: boolean;
}

interface ContactContextType {
  contacts: Contact[];
  searchResults: Contact[];
  loading: boolean;
  error: string | null;
  addContact: (
    contact: Omit<Contact, "id" | "uploadedAt" | "isUnlocked">
  ) => Promise<void>;
  searchContacts: (filters: SearchFilters) => void;
  unlockContact: (contactId: string) => void;
  resetSearch: () => void;
  refreshContacts: () => Promise<void>;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContacts = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};

interface ContactProviderProps {
  children: ReactNode;
}

// Boolean Search
const booleanSearch = (contacts: Contact[], query: string): Contact[] => {
  if (!query.trim()) return contacts;

  const lowerQuery = query.toLowerCase().trim();

  // معالجة العبارات بين علامات الاقتباس
  const exactPhrases = [];
  let processedQuery = lowerQuery;

  const quoteMatches = lowerQuery.match(/"([^"]+)"/g) || [];
  for (const match of quoteMatches) {
    const phrase = match.slice(1, -1);
    exactPhrases.push(phrase);
    processedQuery = processedQuery.replace(match, '');
  }

  // تقسيم باقي الاستعلام
  const terms = processedQuery
    .split(/\s+/)
    .filter(term => term && !['and', 'or', 'not'].includes(term));

  // تحليل المنطق البسيط
  let andTerms = [];
  let orTerms = [];
  let notTerms = [];

  if (lowerQuery.includes(' and ')) {
    andTerms = lowerQuery.split(' and ').map(t => t.trim());
  } else if (lowerQuery.includes(' or ')) {
    orTerms = lowerQuery.split(' or ').map(t => t.trim());
  } else if (lowerQuery.includes(' not ')) {
    const parts = lowerQuery.split(' not ');
    andTerms = [parts[0].trim()];
    notTerms = [parts[1].trim()];
  } else {
    // بحث عادي
    return contacts.filter(contact => {
      const searchText = `${contact.name} ${contact.jobTitle} ${contact.company} ${contact.skills.join(' ')}`.toLowerCase();
      return searchText.includes(lowerQuery) ||
        exactPhrases.some(phrase => searchText.includes(phrase));
    });
  }

  return contacts.filter(contact => {
    const searchText = `${contact.name} ${contact.jobTitle} ${contact.company} ${contact.skills.join(' ')}`.toLowerCase();

    // التحقق من العبارات الدقيقة
    for (const phrase of exactPhrases) {
      if (!searchText.includes(phrase)) return false;
    }

    // التحقق من NOT
    for (const term of notTerms) {
      if (searchText.includes(term)) return false;
    }

    // التحقق من AND
    if (andTerms.length > 0) {
      return andTerms.every(term => {
        const cleanTerm = term.replace(/"/g, '').trim();
        return searchText.includes(cleanTerm) ||
          exactPhrases.some(phrase => phrase.includes(cleanTerm));
      });
    }

    // التحقق من OR
    if (orTerms.length > 0) {
      return orTerms.some(term => {
        const cleanTerm = term.replace(/"/g, '').trim();
        return searchText.includes(cleanTerm) ||
          exactPhrases.some(phrase => phrase.includes(cleanTerm));
      });
    }

    return true;
  });
};

export const ContactProvider: React.FC<ContactProviderProps> = ({
  children,
}) => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchResults, setSearchResults] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = user?.id
        ? `https://mv-main-server.vercel.app/profiles?userId=${user.id}`
        : "https://mv-main-server.vercel.app/profiles";

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch contacts: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();

      const transformedContacts = data.map((profile: any) => ({
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
        isUnlocked: profile.isUnlocked || false,
        uploadedBy: profile.uploadedBy || "",
        uploadedAt: profile.uploadedAt
          ? new Date(profile.uploadedAt)
          : new Date(),
        verified: profile.verified || false,
        hasContactInfo: !!(profile.email || profile.phone),
        linkedinUrl: profile.linkedinUrl || "",
      }));

      setContacts(transformedContacts);
      setSearchResults([]);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError(err instanceof Error ? err.message : "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const searchContacts = (filters: SearchFilters) => {
    let results = [...contacts];

    // Boolean Search filter
    if (filters.query?.trim()) {
      results = booleanSearch(results, filters.query);
    }

    // LinkedIn URL
    if (filters.linkedinUrl?.trim()) {
      const searchUrl = filters.linkedinUrl.trim().toLowerCase().replace(/\/+$/, '');

      results = results.filter(contact => {
        if (!contact.linkedinUrl) return false;
        const contactUrl = contact.linkedinUrl.toLowerCase().replace(/\/+$/, '');
        return contactUrl === searchUrl;
      });
    }

    // Job title filter
    if (filters.jobTitle?.trim()) {
      results = results.filter((contact) =>
        contact.jobTitle
          .toLowerCase()
          .includes(filters.jobTitle!.toLowerCase().trim())
      );
    }

    // Company filter
    if (filters.company?.trim()) {
      results = results.filter((contact) =>
        contact.company
          .toLowerCase()
          .includes(filters.company!.toLowerCase().trim())
      );
    }

    // Location filter
    if (filters.location?.trim()) {
      results = results.filter((contact) =>
        contact.location
          .toLowerCase()
          .includes(filters.location!.toLowerCase().trim())
      );
    }

    // Industry filter
    if (filters.industry) {
      results = results.filter(
        (contact) =>
          contact.industry.toLowerCase() === filters.industry!.toLowerCase()
      );
    }

    // Seniority level filter
    if (filters.seniorityLevel) {
      results = results.filter(
        (contact) => contact.seniorityLevel === filters.seniorityLevel
      );
    }

    // Experience range filter
    if (filters.experience) {
      const { min = 0, max = 50 } = filters.experience;
      results = results.filter(
        (contact) => contact.experience >= min && contact.experience <= max
      );
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      results = results.filter((contact) =>
        filters.skills!.some((skill) =>
          contact.skills.some((contactSkill) =>
            contactSkill.toLowerCase().includes(skill.toLowerCase().trim())
          )
        )
      );
    }

    // Verified filter
    if (filters.verified !== undefined) {
      results = results.filter(
        (contact) => contact.verified === filters.verified
      );
    }

    // Has contact info filter
    if (filters.hasContactInfo !== undefined) {
      results = results.filter(
        (contact) => (contact.email || contact.phone) === filters.hasContactInfo
      );
    }

    setSearchResults(results);
  };

  const addContact = async (
    contactData: Omit<Contact, "id" | "uploadedAt" | "isUnlocked">
  ) => {
    try {
      const res = await fetch("https://mv-main-server.vercel.app/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactData,
          uploadedBy: user?.id,
        }),
      });
      if (!res.ok) throw new Error("Failed to save contact");
      const savedContact = await res.json();

      const transformedContact = {
        ...savedContact,
        id: savedContact.id || savedContact._id,
        uploadedAt: new Date(savedContact.uploadedAt),
        isUnlocked: false,
      };

      setContacts((prev) => [transformedContact, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Could not save contact to the server");
    }
  };

  const unlockContact = (contactId: string) => {
    const updateContact = (contact: Contact) =>
      contact.id === contactId ? { ...contact, isUnlocked: true } : contact;

    setContacts((prev) => prev.map(updateContact));
    setSearchResults((prev) => prev.map(updateContact));
  };

  const resetSearch = () => {
    setSearchResults([]);
  };

  const refreshContacts = async () => {
    await fetchContacts();
  };

  const value = {
    contacts,
    searchResults,
    loading,
    error,
    addContact,
    searchContacts,
    unlockContact,
    resetSearch,
    refreshContacts,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};