import { useState, ChangeEvent, DragEvent } from "react";

interface ImportResult {
  success: boolean;
  error?: string;
  results: {
    total: number;
    successful: number;
    failed: number;
    errors: string[];
  };
}

interface ImportContactsModalProps {
  onClose: () => void;
  onImportSuccess: (result: ImportResult) => void;
}

const ImportContactsModal = ({
  onClose,
  onImportSuccess,
}: ImportContactsModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".json")) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Please select a .json file");
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.name.endsWith(".json")) {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please drop a .json file");
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const text = await file.text();

      if (!text.trim()) {
        throw new Error("JSON file is empty");
      }

      const contacts = JSON.parse(text);

      if (!Array.isArray(contacts)) {
        throw new Error("JSON must be an array of contacts");
      }

      if (contacts.length === 0) {
        throw new Error("Contacts array is empty");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in again");
      }

      const response = await fetch(
        "http://localhost:5000/api/admin/import-contacts",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contacts }),
        },
      );

      const result: ImportResult = await response.json();

      if (response.ok && result.success) {
        onImportSuccess(result);
        onClose();
      } else {
        setError(
          result.error || "Import failed. Please check your file format.",
        );
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON file. Please check the file format.");
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Import Contacts</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={(e: DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <div className="text-gray-500 mb-2">
            {file ? (
              <span className="text-green-600 font-medium">{file.name}</span>
            ) : (
              "Drag & drop your JSON file here"
            )}
          </div>
          <div className="text-sm text-gray-400">or click to browse</div>
          <input
            id="file-input"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

        {/* Requirements Guide */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">
            📋 File Requirements :
          </h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>
              • File must be in <strong>.json</strong> format
            </li>
            <li>
              • Must contain an <strong>array of contact objects</strong>
            </li>
            <li>
              • Each contact needs <strong>linkedinUrl</strong> and at least one{" "}
              <strong>email or phone</strong>
            </li>
            <li>
              • Optional fields : jobTitle, company, location, skills, etc.
            </li>
          </ul>
        </div>

        {/* Example */}
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600 overflow-x-auto">
          <strong>Example format :</strong>
          <pre className="mt-1 whitespace-pre-wrap">
            {`[
  {
    "linkedinUrl": "https://www.linkedin.com/in/username",
    "email": ["example@example.com"],
    "phone": ["+123456789"]
  }
]`}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Importing..." : "Import"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportContactsModal;
