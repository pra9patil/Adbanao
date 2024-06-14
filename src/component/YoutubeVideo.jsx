import React from "react";

const YoutubeVideo = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 p-4 lg:p-8">
      {/* YouTube Video Section */}
      <div className="lg:w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            className="h-[500px] w-[800px] p-4"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Steps Section */}
      <div className="lg:w-1/2 p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-yellow-500">5 Steps of Template Making</h2>
          <div className="space-y-2">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-yellow-500">Step 1: Planning</h3>
              <p className="text-gray-600">Start by defining the purpose and goals of your template.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-yellow-500">Step 2: Design</h3>
              <p className="text-gray-600">Create a visually appealing design layout for your template.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-yellow-500">Step 3: Content</h3>
              <p className="text-gray-600">Add the necessary content and placeholders for user input.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-yellow-500">Step 4: Testing</h3>
              <p className="text-gray-600">Test the template to ensure it works as intended.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-yellow-500">Step 5: Deployment</h3>
              <p className="text-gray-600">Deploy the template for use and gather feedback for improvements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;
