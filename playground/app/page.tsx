'use client';

import { useState, useEffect } from 'react';
import { ZON } from 'zzon';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-zig';
import 'prismjs/themes/prism-tomorrow.css';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function JsonZonConverter() {
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(examples[0].json, null, 2));
  const [zonValue, setZonValue] = useState<string>(ZON.stringify(examples[0].json, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [zonError, setZonError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [isTypingInJson, setIsTypingInJson] = useState<boolean>(false);
  const [isTypingInZon, setIsTypingInZon] = useState<boolean>(false);

  // Convert JSON to ZON when JSON changes
  useEffect(() => {
    if (!isTypingInJson) return;
    
    try {
      const jsonObj = JSON.parse(jsonValue);
      const zonString = ZON.stringify(jsonObj, null, 2);
      setZonValue(zonString);
      setJsonError(null);
    } catch (error) {
      setJsonError((error as Error).message);
    }
  }, [jsonValue, isTypingInJson]);

  // Convert ZON to JSON when ZON changes
  useEffect(() => {
    if (!isTypingInZon) return;

    try {
      const jsonObj = ZON.parse(zonValue);
      const formattedJson = JSON.stringify(jsonObj, null, 2);
      setJsonValue(formattedJson);
      setZonError(null);
    } catch (error) {
      setZonError((error as Error).message);
    }
  }, [zonValue, isTypingInZon]);

  const handleJsonChange = (value: string) => {
    setIsTypingInJson(true);
    setIsTypingInZon(false);
    setJsonValue(value);
  };

  const handleZonChange = (value: string) => {
    setIsTypingInZon(true);
    setIsTypingInJson(false);
    setZonValue(value);
  };

  const loadExample = (example: (typeof examples)[0]) => {
    const jsonStr = JSON.stringify(example.json, null, 2);
    setJsonValue(jsonStr);
    setZonValue(ZON.stringify(example.json, null, 2));
    setIsTypingInJson(false);
    setIsTypingInZon(false);
    setShowExamples(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row p-0 md:p-2 bg-gray-50 dark:bg-gray-900">
      {/* JSON Editor */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative pr-0 md:pr-1">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-none md:rounded-t-lg mr-0 md:mr-1">
          <div className="text-white font-semibold flex items-center gap-2">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/c/c9/JSON_vector_logo.svg"
              alt="JSON Logo"
              width={20}
              height={20}
            />
            JSON
          </div>
          <div className="relative">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="flex items-center text-sm text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded h-6"
            >
              Examples <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {showExamples && (
              <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg z-20">
                <ul className="py-1">
                  {examples.map((example, index) => (
                    <li key={index}>
                      <button
                        onClick={() => loadExample(example)}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                      >
                        {example.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="h-full rounded-none md:rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <Editor
            value={jsonValue}
            onValueChange={handleJsonChange}
            highlight={(code) => Prism.highlight(code, Prism.languages.json, 'json')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              marginTop: '38px',
              height: '100%',
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
            }}
            className="h-full pt-12"
          />
        </div>
        {jsonError && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-900 bg-opacity-90 text-white text-sm font-mono rounded-b-none md:rounded-b-lg mr-0 md:mr-1">
            {jsonError}
          </div>
        )}
      </div>

      {/* ZON Editor */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative pl-0 md:pl-1">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-none md:rounded-t-lg ml-0 md:ml-1">
          <div className="text-white font-semibold flex items-center gap-2">
            <Image
              src="https://raw.githubusercontent.com/ziglang/logo/master/zig-mark.svg"
              alt="Zig Logo"
              width={20}
              height={20}
            />
            ZON
          </div>
        </div>
        <div className="h-full rounded-none md:rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <Editor
            value={zonValue}
            onValueChange={handleZonChange}
            highlight={(code) => Prism.highlight(code, Prism.languages.zig, 'zig')}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              marginTop: '38px',
              height: '100%',
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
            }}
            className="h-full pt-12"
          />
        </div>
        {zonError && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-900 bg-opacity-90 text-white text-sm font-mono rounded-b-none md:rounded-b-lg ml-0 md:ml-2">
            {zonError}
          </div>
        )}
      </div>
    </div>
  );
}

// Example data for the selector
const examples = [
  {
    name: 'Simple Object',
    json: {
      name: 'Example',
      value: 42,
      isActive: true,
      tags: ['json', 'zon', 'converter'],
    },
  },
  {
    name: 'Nested Object',
    json: {
      person: {
        name: 'John Doe',
        age: 30,
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zip: '12345',
        },
      },
      isEmployed: true,
      skills: ['JavaScript', 'TypeScript', 'React'],
    },
  },
  {
    name: 'Array of Objects',
    json: {
      users: [
        {
          id: 1,
          name: 'Alice',
          role: 'admin',
        },
        {
          id: 2,
          name: 'Bob',
          role: 'user',
        },
        {
          id: 3,
          name: 'Charlie',
          role: 'user',
        },
      ],
      total: 3,
      page: 1,
    },
  },
];
