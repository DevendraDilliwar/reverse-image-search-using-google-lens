'use client';
import { useState } from 'react';
import { Upload, Image, Download, Loader2, Eye, X, Sparkles } from 'lucide-react';

export default function ImageReimaginePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    if (!imageFile) {
      setError('Please upload an image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred.');
        setLoading(false);
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setGeneratedImageUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mr-4 shadow-lg">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-light bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
              Image Reimagine
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Transform your images with precision and elegance. Upload, reimagine, and create something extraordinary.
          </p>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Input */}
          <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div className="space-y-8">
              <div>
                <label className="block text-2xl font-light text-gray-800 mb-6 flex items-center gap-3">
                  <Upload className="w-6 h-6 text-gray-600" />
                  Upload Image
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    required
                  />
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 group">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-w-full h-56 object-contain mx-auto rounded-xl shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={clearImage}
                          className="absolute -top-2 -right-2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-2 transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                          <Image className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-700 text-lg mb-2 font-medium">Drop your image here</p>
                        <p className="text-gray-500 text-sm">or click to browse • JPG, PNG, WebP</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || !imageFile}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-lg">Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span className="text-lg">✨ Generate Reimagined Image</span>
                  </>
                )}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-800 text-center font-medium">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="bg-white shadow-2xl rounded-3xl p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <h3 className="text-2xl font-light text-gray-800 mb-8 text-center">Result</h3>
            
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              {loading ? (
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
                  </div>
                  <p className="text-gray-800 text-xl font-medium">Processing your image</p>
                  <p className="text-gray-500 text-sm mt-2">This usually takes a few moments</p>
                </div>
              ) : generatedImageUrl ? (
                <div className="w-full">
                  <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                    <img
                      src={generatedImageUrl}
                      alt="Generated"
                      className="w-full max-h-80 object-contain rounded-xl shadow-lg"
                    />
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
                    >
                      <Eye className="w-5 h-5" />
                      View Full Size
                    </button>
                    
                    <a
                      href={generatedImageUrl}
                      download="reimagined-image.jpg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <Image className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">Your reimagined image will appear here</p>
                  <p className="text-gray-400 text-sm mt-2">Upload an image to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for full-size view */}
        {showModal && generatedImageUrl && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="relative max-w-7xl max-h-full bg-white rounded-3xl p-8 shadow-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full p-3 transition-colors z-10 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={generatedImageUrl}
                alt="Generated Full Size"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm font-light">
            Powered by advanced AI technology • Create • Transform • Inspire
          </p>
        </div>
      </div>
    </div>
  );
}