export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-black mb-3">
          Vibe Coding
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn to code through flow
        </p>

        <div className="border-2 border-black rounded-lg p-6 mb-6">
          <p className="text-gray-900 mb-4">
            An educational game that teaches programming through zen-like,
            flow-state-inducing gameplay.
          </p>

          <ul className="text-left text-gray-600 space-y-2 mb-6">
            <li>• Minimal black & white interface</li>
            <li>• AI-powered adaptive learning</li>
            <li>• Progressive: Visual blocks → Text coding</li>
            <li>• BMAD methodology (Build-Measure-Adapt-Deploy)</li>
          </ul>
        </div>

        <button className="px-6 py-3 bg-white border-2 border-black text-black rounded hover:bg-black hover:text-white transition-all duration-200">
          Start Learning
        </button>
      </div>
    </main>
  );
}
