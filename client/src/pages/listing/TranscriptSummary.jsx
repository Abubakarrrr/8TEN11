"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

const TranscriptSummary = ({ transcript }) => {
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Transcript Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">Full Transcript</h3>
          <button
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={() => setShowFullTranscript(!showFullTranscript)}
          >
            {showFullTranscript ? (
              <>
                <ChevronUp className="h-5 w-5 mr-1" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-1" />
                <span>Show</span>
              </>
            )}
          </button>
        </div>

        {showFullTranscript && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-line">{transcript}</p>
          </div>
        )}

    
      </div>
    </div>
  );
};

export default TranscriptSummary;
