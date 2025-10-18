'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { MonacoEditor } from '../editors/MonacoEditor';

interface TutorialStep {
  title: string;
  content: string;
  code?: string;
  task?: string;
  expectedOutput?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Vibe Coding!",
    content: "Learn to code through a zen-like, flow-state experience. We'll guide you step by step with AI-powered hints and instant feedback.",
  },
  {
    title: "How It Works: BMAD Method",
    content: "Every challenge follows 4 phases:\n\n**BUILD** - Write your code\n**MEASURE** - Run tests to see how you did\n**ADAPT** - Get hints and improve\n**DEPLOY** - Celebrate success!\n\nThis cycle helps you learn naturally, like a game.",
  },
  {
    title: "Choose Your Editor",
    content: "You can code in two ways:\n\n**Text Editor** - Write real JavaScript code (Monaco)\n**Block Editor** - Drag and drop code blocks (Blockly)\n\nYou can switch between them anytime. Let's start with text!",
  },
  {
    title: "Your First Challenge",
    content: "Let's write your first function! A function is like a recipe - it takes inputs and returns an output.\n\nYour task: Make a function that says hello.",
    task: "Write a function called solution() that returns the string 'Hello, World!'",
    code: "function solution() {\n  // Your code here\n  \n}",
    expectedOutput: "Hello, World!"
  },
  {
    title: "Understanding Scores",
    content: "Your code is scored on 4 metrics:\n\n**Correctness** (40%) - Does it work?\n**Efficiency** (20%) - Is it fast?\n**Elegance** (20%) - Is it clean?\n**Readability** (20%) - Is it clear?\n\nDon't worry about perfection - focus on learning!",
  },
  {
    title: "Getting Hints",
    content: "Stuck? No problem! Click 'Request Hint' and our AI guide will help you.\n\nHints come in 5 levels:\n1. Conceptual idea\n2. Syntax help\n3. Logic structure\n4. Implementation steps\n5. Direct solution\n\nUse them wisely!",
  },
  {
    title: "Ready to Start!",
    content: "You're all set! Here's what to do next:\n\n✅ Complete Module 1: Sequence Station (10 challenges)\n✅ Move on to Module 2: Loop Gardens\n✅ Build your skills step by step\n\nRemember: The goal is to learn and have fun. Let's code!",
  },
];

export const TutorialFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState(tutorialSteps[3].code || '');
  const [hasCompleted, setHasCompleted] = useState(false);

  const step = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isCodingStep = step.task !== undefined;

  const handleNext = () => {
    if (isLastStep) {
      setHasCompleted(true);
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
      if (tutorialSteps[currentStep + 1].code) {
        setCode(tutorialSteps[currentStep + 1].code || '');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (tutorialSteps[currentStep - 1].code) {
        setCode(tutorialSteps[currentStep - 1].code || '');
      }
    }
  };

  const handleTryCode = () => {
    // Simple validation for tutorial
    try {
      const result = eval(code + '\nsolution()');
      if (result === step.expectedOutput) {
        alert('Perfect! You got it right! 🎉');
        handleNext();
      } else {
        alert(`Not quite! Expected: "${step.expectedOutput}"\nGot: "${result}"\n\nTry again!`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}\n\nCheck your code and try again!`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{step.title}</CardTitle>
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            {/* Progress bar */}
            <div className="mb-6">
              <div className="w-full h-2 border-2 border-black bg-white">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <div className="prose prose-sm max-w-none">
                {step.content.split('\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <p key={idx} className="font-bold">{paragraph.replace(/\*\*/g, '')}</p>
                    );
                  }
                  return paragraph && <p key={idx}>{paragraph}</p>;
                })}
              </div>

              {/* Interactive coding step */}
              {isCodingStep && (
                <div className="mt-6">
                  <div className="mb-4 p-4 border-2 border-black bg-gray-50">
                    <p className="font-bold mb-2">Task:</p>
                    <p>{step.task}</p>
                  </div>

                  <MonacoEditor
                    value={code}
                    onChange={setCode}
                    language="javascript"
                    height="250px"
                  />

                  <div className="mt-4">
                    <Button onClick={handleTryCode} variant="primary">
                      Try It!
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={currentStep === 0}
              >
                Back
              </Button>

              {!isCodingStep && (
                <Button onClick={handleNext} variant="primary">
                  {isLastStep ? 'Start Coding!' : 'Next'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
