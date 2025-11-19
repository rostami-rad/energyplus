'use client';

import { Upload, FileText, X } from 'lucide-react';
import { useState } from 'react';

interface IDFUploadProps {
  onFileUpload: (content: string) => void;
}

export default function IDFUpload({ onFileUpload }: IDFUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileContent, setFileContent] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFileContent(e.target.value);
  };

  const handleSubmit = () => {
    if (fileContent.trim()) {
      onFileUpload(fileContent);
      setIsOpen(false);
      setFileName('');
      setFileContent('');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setFileName('');
    setFileContent('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-bg-light hover:bg-primary hover:text-white rounded-lg transition-colors border border-border"
        title="Upload IDF"
      >
        <Upload size={18} />
        <span className="hidden sm:inline">Upload IDF</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-bg-medium rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col border border-border">
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <FileText className="text-primary flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-semibold truncate">Upload Custom IDF File</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-bg-light rounded-lg transition-colors flex-shrink-0"
          >
            <X size={18} className="sm:w-5 sm:h-5 text-text-secondary" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">
              Choose IDF File
            </label>
            <input
              type="file"
              accept=".idf,.IDF"
              onChange={handleFileChange}
              className="w-full px-3 sm:px-4 py-2 bg-bg-light border border-border rounded-lg cursor-pointer hover:bg-bg-dark transition-colors text-xs sm:text-sm"
            />
            {fileName && (
              <p className="text-xs sm:text-sm text-text-muted mt-2 truncate">Selected: {fileName}</p>
            )}
          </div>

          <div className="border-t border-border pt-3 sm:pt-4">
            <label className="block text-xs sm:text-sm font-medium mb-2">
              Or paste IDF content
            </label>
            <textarea
              value={fileContent}
              onChange={handleTextAreaChange}
              placeholder="Version,
  24.1;

Building,
  Your Building,..."
              className="w-full h-48 sm:h-64 px-3 sm:px-4 py-2 sm:py-3 bg-bg-light border border-border rounded-lg text-text-primary placeholder-text-muted resize-none font-mono text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={!fileContent.trim()}
            className="flex-1 px-3 sm:px-4 py-2 bg-primary hover:bg-primary-dark disabled:bg-border disabled:cursor-not-allowed rounded-lg transition-colors text-sm sm:text-base"
          >
            Use This IDF
          </button>
          <button
            onClick={handleClose}
            className="px-3 sm:px-4 py-2 bg-bg-light hover:bg-bg-dark rounded-lg transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

