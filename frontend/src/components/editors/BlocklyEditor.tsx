'use client';

import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

interface BlocklyEditorProps {
  onChange: (code: string) => void;
  initialXml?: string;
}

export const BlocklyEditor: React.FC<BlocklyEditorProps> = ({
  onChange,
  initialXml,
}) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (blocklyDiv.current && !workspace.current) {
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: getToolbox(),
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        trashcan: true,
      });

      // Load initial XML if provided
      if (initialXml) {
        try {
          const xml = Blockly.utils.xml.textToDom(initialXml);
          Blockly.Xml.domToWorkspace(xml, workspace.current);
        } catch (e) {
          console.error('Failed to load initial XML:', e);
        }
      }

      // Listen for changes
      workspace.current.addChangeListener(() => {
        if (workspace.current) {
          const code = javascriptGenerator.workspaceToCode(workspace.current);
          onChange(code);
        }
      });
    }

    return () => {
      if (workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={blocklyDiv}
      className="border-2 border-black"
      style={{ height: '400px', width: '100%' }}
    />
  );
};

function getToolbox() {
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Logic',
        colour: 210,
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'logic_negate' },
          { kind: 'block', type: 'logic_boolean' },
        ],
      },
      {
        kind: 'category',
        name: 'Loops',
        colour: 120,
        contents: [
          { kind: 'block', type: 'controls_repeat_ext' },
          { kind: 'block', type: 'controls_whileUntil' },
          { kind: 'block', type: 'controls_for' },
          { kind: 'block', type: 'controls_forEach' },
        ],
      },
      {
        kind: 'category',
        name: 'Math',
        colour: 230,
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          { kind: 'block', type: 'math_single' },
          { kind: 'block', type: 'math_trig' },
          { kind: 'block', type: 'math_constant' },
        ],
      },
      {
        kind: 'category',
        name: 'Text',
        colour: 160,
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
          { kind: 'block', type: 'text_append' },
          { kind: 'block', type: 'text_length' },
          { kind: 'block', type: 'text_isEmpty' },
        ],
      },
      {
        kind: 'category',
        name: 'Lists',
        colour: 260,
        contents: [
          { kind: 'block', type: 'lists_create_with' },
          { kind: 'block', type: 'lists_repeat' },
          { kind: 'block', type: 'lists_length' },
          { kind: 'block', type: 'lists_isEmpty' },
          { kind: 'block', type: 'lists_indexOf' },
          { kind: 'block', type: 'lists_getIndex' },
          { kind: 'block', type: 'lists_setIndex' },
        ],
      },
      {
        kind: 'category',
        name: 'Variables',
        colour: 330,
        custom: 'VARIABLE',
      },
      {
        kind: 'category',
        name: 'Functions',
        colour: 290,
        custom: 'PROCEDURE',
      },
    ],
  };
}
