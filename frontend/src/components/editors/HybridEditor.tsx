'use client';

import React, { useState } from 'react';
import { MonacoEditor } from './MonacoEditor';
import { BlocklyEditor } from './BlocklyEditor';
import { Tabs } from '../ui/Tabs';

interface HybridEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  defaultMode?: 'text' | 'blocks';
}

export const HybridEditor: React.FC<HybridEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  defaultMode = 'text',
}) => {
  const [mode, setMode] = useState<'text' | 'blocks'>(defaultMode);
  const [blocklyCode, setBlocklyCode] = useState('');

  const tabs = [
    {
      id: 'text',
      label: 'Text Editor',
      content: (
        <MonacoEditor
          value={value}
          onChange={onChange}
          language={language}
        />
      ),
    },
    {
      id: 'blocks',
      label: 'Block Editor',
      content: (
        <div>
          <BlocklyEditor
            onChange={(code) => {
              setBlocklyCode(code);
              onChange(code);
            }}
          />
          {blocklyCode && (
            <div className="mt-4">
              <h4 className="font-bold mb-2">Generated Code:</h4>
              <div className="border-2 border-black p-4 bg-gray-50 overflow-x-auto">
                <pre className="text-sm font-mono">{blocklyCode}</pre>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabs={tabs} defaultTab={defaultMode} />
    </div>
  );
};
