'use client';

import { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

export default function ApiKeyInput({ onApiKeyChange }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsConfigured(true);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      setIsConfigured(true);
      onApiKeyChange(apiKey.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleEdit = () => {
    setIsConfigured(false);
  };

  if (isConfigured) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="text-sm text-green-700">API Key configured</span>
          </div>
          <button
            onClick={handleEdit}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-yellow-800 mb-2">
        Configure OpenAI API Key
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="password"
          value={apiKey}
          onChange={handleChange}
          placeholder="Enter your OpenAI API Key (sk-...)"
          className="flex-1 px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
        >
          Save
        </button>
      </form>
      <p className="text-xs text-yellow-700 mt-2">
        Your API key is stored locally in your browser and is never shared.
      </p>
    </div>
  );
}
