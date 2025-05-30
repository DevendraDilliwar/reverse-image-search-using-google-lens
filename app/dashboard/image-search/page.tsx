
'use client';
import React, { useState, useRef } from 'react';
import { Upload, Link, Search, Download, Eye, ChevronDown, ChevronUp, X, Check, AlertTriangle } from 'lucide-react';

interface SearchResult {
  id: string;
  sourceImage: string;
  analysisImage: string;
  insights: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  faceDetection: boolean;
  logoDetection: boolean;
  landmarkDetection: boolean;
  labels: string[];
  timestamp: Date;
}

const ImageSearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: '1',
      sourceImage: '/api/placeholder/80/80',
      analysisImage: '/api/placeholder/80/80',
      insights: 'Face, logo, stock photo detected and found on stock.adobe.com, shutterstock.com, bigstockphoto.com, cartoondealer.com, depositphotos.com, dreamstime.com, stockphotos.ro',
      riskLevel: 'High',
      faceDetection: true,
      logoDetection: true,
      landmarkDetection: false,
      labels: ['cap', 'beard', 'glove', 'vehicle', 'headgear', 'jacket', 'snow', 'automotive design', 'eyewear', 'freezing'],
      timestamp: new Date()
    },
    {
      id: '2',
      sourceImage: '/api/placeholder/80/80',
      analysisImage: '/api/placeholder/80/80',
      insights: 'Stock photo, high risk labels detected and found on stock.adobe.com, fotolia.com, allevents.in',
      riskLevel: 'High',
      faceDetection: false,
      logoDetection: false,
      landmarkDetection: false,
      labels: ['daytime', 'water', 'sky', 'blue', 'building', 'lighting', 'architecture', 'window', 'city', 'landmark'],
      timestamp: new Date()
    },
    {
      id: '3',
      sourceImage: '/api/placeholder/80/80',
      analysisImage: '/api/placeholder/80/80',
      insights: 'Face, stock photo, copyright in exif data detected and found on shutterstock.com, stock.adobe.com',
      riskLevel: 'High',
      faceDetection: true,
      logoDetection: false,
      landmarkDetection: false,
      labels: ['cloud', 'sky', 'building', 'plant', 'umbrella', 'travel', 'chair', 'leisure', 'tree', 'house'],
      timestamp: new Date()
    }
  ]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
    // In real implementation, you would add new results here
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Image Search & Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload an image or provide a URL to analyze and search for similar content across the web
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Tab Navigation */}
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Upload size={20} />
                Upload Image
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'url'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Link size={20} />
                Image URL
              </button>
            </div>

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drop your image here, or{' '}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-blue-600 hover:text-blue-700 underline"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                
                {selectedFile && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700">
                      <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* URL Tab */}
            {activeTab === 'url' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className="mt-8">
              <button
                onClick={handleSearch}
                disabled={isSearching || (!selectedFile && !urlInput)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Start Analysis
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searchResults.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Results</h2>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Images
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Analysis Insights
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Detection Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Labels
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((result) => (
                      <React.Fragment key={result.id}>
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <img
                                src={result.sourceImage}
                                alt="Source"
                                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                              />
                              <img
                                src={result.analysisImage}
                                alt="Analysis"
                                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="max-w-xs">
                              <p className="text-sm text-gray-700 line-clamp-3">
                                {result.insights}
                              </p>
                              <button
                                onClick={() => toggleRowExpansion(result.id)}
                                className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                              >
                                {expandedRows.has(result.id) ? (
                                  <>
                                    Show Less <ChevronUp size={16} />
                                  </>
                                ) : (
                                  <>
                                    Show More <ChevronDown size={16} />
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(result.riskLevel)}`}>
                              <AlertTriangle size={14} className="mr-1" />
                              {result.riskLevel}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-4">
                              <div className="flex items-center gap-1">
                                {result.faceDetection ? (
                                  <Check className="text-green-500" size={16} />
                                ) : (
                                  <X className="text-red-500" size={16} />
                                )}
                                <span className="text-xs text-gray-600">Face</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {result.logoDetection ? (
                                  <Check className="text-green-500" size={16} />
                                ) : (
                                  <X className="text-red-500" size={16} />
                                )}
                                <span className="text-xs text-gray-600">Logo</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {result.landmarkDetection ? (
                                  <Check className="text-green-500" size={16} />
                                ) : (
                                  <X className="text-red-500" size={16} />
                                )}
                                <span className="text-xs text-gray-600">Landmark</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {result.labels.slice(0, 3).map((label, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {label}
                                </span>
                              ))}
                              {result.labels.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                  +{result.labels.length - 3} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <Eye size={16} />
                                View
                              </button>
                              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                <Download size={16} />
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedRows.has(result.id) && (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 bg-gray-50">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">Full Analysis</h4>
                                  <p className="text-sm text-gray-600">{result.insights}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-2">All Labels</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {result.labels.map((label, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                      >
                                        {label}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageSearchPage;