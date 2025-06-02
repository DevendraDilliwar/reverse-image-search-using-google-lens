'use client';
import { useState } from "react";
import { Upload, Wand2, Download, Image, Sparkles, X, RefreshCw, Eye } from "lucide-react";

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    
    setLoading(true);

    try {
      const imageBase64 = imageFile ? await toBase64(imageFile) : null;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          image: imageBase64?.split(",")[1], // Strip "data:image/png;base64,"
        }),
      });

      const data = await res.json();
      if (data?.image) {
        setOutput(data.image);
        // Clear inputs after successful generation
        setPrompt('');
        setImageFile(null);
        setImagePreview(null);
      } else {
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    
    if (file) {
      try {
        const preview = await toBase64(file);
        setImagePreview(preview);
      } catch (error) {
        console.error("Error creating preview:", error);
      }
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const generateAnother = () => {
    setOutput(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Image Generator
              </h1>
              <p className="text-sm text-gray-600">Create stunning images with AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          
          {/* Left Side - Input Panel */}
          <div className="flex flex-col">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Create Your Image</h2>
              </div>
              
              <div className="flex-1 space-y-6">
                {/* Prompt Input */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    Describe what you want to generate
                  </label>
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A serene mountain landscape at sunset with purple sky and golden clouds reflecting on a crystal-clear lake..."
                      className="w-full h-36 p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm transition-all duration-200"
                      maxLength={500}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                      {prompt.length}/500
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Image className="w-4 h-4 text-blue-500" />
                    Reference Image (Optional)
                  </label>
                  
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-2">
                        <img
                          src={imagePreview}
                          alt="Reference preview"
                          className="w-full max-h-48 object-contain rounded-xl"
                        />
                        <button
                          onClick={clearImage}
                          className="absolute top-3 right-3 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        {imageFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group bg-white/50 backdrop-blur-sm"
                      >
                        <div className="text-center">
                          <Upload className="w-10 h-10 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" />
                          <p className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors font-medium">
                            Upload reference image
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG up to 10MB
                          </p>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <div className="mt-8">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      <span>Generate Image</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Output Panel */}
          <div className="flex flex-col">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Image className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Generated Image</h2>
                </div>
                {output && (
                  <button
                    onClick={generateAnother}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Image
                  </button>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center">
                {output ? (
                  <div className="w-full space-y-6">
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200 bg-white p-2">
                        <img
                          src={`data:image/png;base64,${output}`}
                          alt="Generated artwork"
                          className="w-full rounded-xl shadow-md"
                        />
                        <div className="absolute inset-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center">
                          <div className="flex gap-3">
                            <button className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                              <Eye className="w-5 h-5" />
                            </button>
                            <a
                              href={`data:image/png;base64,${output}`}
                              download="ai-generated-image.png"
                              className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <a
                        href={`data:image/png;base64,${output}`}
                        download="ai-generated-image.png"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      >
                        <Download className="w-5 h-5" />
                        Download HD
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <Image className="w-16 h-16 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Create</h3>
                    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Enter a detailed prompt and let AI bring your imagination to life with stunning visuals
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}