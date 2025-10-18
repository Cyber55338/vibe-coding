'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HybridEditor } from '@/components/editors/HybridEditor';
import Link from 'next/link';

export default function SandboxPage() {
  const [code, setCode] = useState('// Welcome to Sandbox Mode!\n// Write any JavaScript code here and experiment freely.\n\nfunction example() {\n  console.log("Hello, World!");\n  return 42;\n}\n\nexample();');
  const [output, setOutput] = useState('');
  const [executing, setExecuting] = useState(false);

  const handleRun = () => {
    setExecuting(true);
    setOutput('');

    try {
      // Capture console.log
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.map(arg => String(arg)).join(' '));
      };

      // Execute code
      const result = eval(code);

      // Restore console.log
      console.log = originalLog;

      // Show output
      let outputText = '';
      if (logs.length > 0) {
        outputText += 'Console Output:\n' + logs.join('\n') + '\n\n';
      }
      if (result !== undefined) {
        outputText += 'Return Value: ' + String(result);
      }

      setOutput(outputText || 'Code executed successfully (no output)');
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setExecuting(false);
    }
  };

  const handleClear = () => {
    setCode('// Your code here\n\n');
    setOutput('');
  };

  const handleSave = () => {
    localStorage.setItem('sandboxCode', code);
    alert('Code saved to local storage!');
  };

  const handleLoad = () => {
    const saved = localStorage.getItem('sandboxCode');
    if (saved) {
      setCode(saved);
      alert('Code loaded from local storage!');
    } else {
      alert('No saved code found!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">← Back</Button>
          </Link>
          <h1 className="text-2xl font-bold">Sandbox Mode</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <p className="text-gray-600">
            Experiment with JavaScript code freely. No tests, no pressure - just code!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <HybridEditor
                  value={code}
                  onChange={setCode}
                  language="javascript"
                  defaultMode="text"
                />
                <div className="mt-4 flex gap-2 flex-wrap">
                  <Button onClick={handleRun} variant="primary" disabled={executing}>
                    {executing ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button onClick={handleClear} variant="outline">
                    Clear
                  </Button>
                  <Button onClick={handleSave} variant="outline">
                    Save
                  </Button>
                  <Button onClick={handleLoad} variant="outline">
                    Load
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Output</CardTitle>
              </CardHeader>
              <CardContent>
                {output ? (
                  <div className="border-2 border-black p-4 bg-gray-50 min-h-[400px]">
                    <pre className="whitespace-pre-wrap break-words font-mono text-sm">
                      {output}
                    </pre>
                  </div>
                ) : (
                  <div className="border-2 border-gray-300 p-4 bg-gray-50 min-h-[400px] flex items-center justify-center text-gray-400">
                    Run your code to see output here
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Use console.log() to print output</li>
                  <li>• Return values are displayed automatically</li>
                  <li>• Code is saved locally in your browser</li>
                  <li>• Switch between text and block editors</li>
                  <li>• Experiment without fear - nothing is graded!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
