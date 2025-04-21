'use client';

import { ChevronDown } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-zig';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { ZON } from '../../src/index';

export default function JsonZonConverter() {
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(examples[0].json, null, 2));
  const [zonValue, setZonValue] = useState<string>(ZON.stringify(examples[0].json, null, 2));
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [zonError, setZonError] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState<boolean>(false);
  const [isTypingInJson, setIsTypingInJson] = useState<boolean>(false);
  const [isTypingInZon, setIsTypingInZon] = useState<boolean>(false);
  const [isStarsLoading, setIsStarsLoading] = useState<boolean>(true);

  // Initialize state from localStorage on client-side
  useEffect(() => {
    const savedJsonValue = localStorage.getItem('jsonValue');
    const savedZonValue = localStorage.getItem('zonValue');
    const savedIsUserInput = localStorage.getItem('isUserInput');

    if (savedJsonValue) setJsonValue(savedJsonValue);
    if (savedZonValue) setZonValue(savedZonValue);
    if (savedIsUserInput === 'true') setIsUserInput(true);
  }, []);

  // Preload GitHub stars image
  useEffect(() => {
    const img = new Image();
    img.src = 'https://img.shields.io/github/stars/nurulhudaapon/zzon?style=social&cacheSeconds=60';
    img.onload = () => setIsStarsLoading(false);
  }, []);

  // Convert JSON to ZON when JSON changes
  useEffect(() => {
    if (!isTypingInJson) return;

    try {
      const jsonObj = JSON.parse(jsonValue);
      const zonString = ZON.stringify(jsonObj, null, 2);
      setZonValue(zonString);
      setJsonError(null);
      if (isUserInput) {
        localStorage.setItem('jsonValue', jsonValue);
        localStorage.setItem('zonValue', zonString);
      }
    } catch (error) {
      setJsonError((error as Error).message);
    }
  }, [jsonValue, isTypingInJson, isUserInput]);

  // Convert ZON to JSON when ZON changes
  useEffect(() => {
    if (!isTypingInZon) return;

    try {
      const jsonObj = ZON.parse(zonValue);
      const formattedJson = JSON.stringify(jsonObj, null, 2);
      setJsonValue(formattedJson);
      setZonError(null);
      if (isUserInput) {
        localStorage.setItem('jsonValue', formattedJson);
        localStorage.setItem('zonValue', zonValue);
      }
    } catch (error) {
      setZonError((error as Error).message);
    }
  }, [zonValue, isTypingInZon, isUserInput]);

  const handleJsonChange = (value: string) => {
    setIsTypingInJson(true);
    setIsTypingInZon(false);
    setJsonValue(value);
    setIsUserInput(true);
    localStorage.setItem('isUserInput', 'true');
  };

  const handleZonChange = (value: string) => {
    setIsTypingInZon(true);
    setIsTypingInJson(false);
    setZonValue(value);
    setIsUserInput(true);
    localStorage.setItem('isUserInput', 'true');
  };

  const loadExample = (example: (typeof examples)[0]) => {
    const jsonStr = JSON.stringify(example.json, null, 2);
    setJsonValue(jsonStr);
    setZonValue(ZON.stringify(example.json, null, 2));
    setIsTypingInJson(false);
    setIsTypingInZon(false);
    setShowExamples(false);
    setIsUserInput(false);
    localStorage.removeItem('jsonValue');
    localStorage.removeItem('zonValue');
    localStorage.setItem('isUserInput', 'false');
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row p-0 md:p-2 bg-gray-50 dark:bg-gray-900">
      {/* JSON Editor */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative pr-0 md:pr-1">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-none md:rounded-t-lg mr-0 md:mr-1">
          <div className="text-white font-semibold flex items-center gap-2">
            <JSONIcon />
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
          <div className="h-full overflow-y-auto bg-[#1e293b]">
            <div className="min-h-full flex flex-col">
              <Editor
                value={jsonValue}
                onValueChange={handleJsonChange}
                highlight={(code) => Prism.highlight(code, Prism.languages.json, 'json')}
                padding={16}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  marginTop: '38px',
                  backgroundColor: 'transparent',
                  color: '#e2e8f0',
                  whiteSpace: 'pre',
                  caretColor: '#fff',
                  width: '100%',
                  flex: '1 1 auto',
                }}
                textareaClassName="flex-1"
                className="h-full pt-12 flex-1"
              />
            </div>
          </div>
        </div>
        {jsonError && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-900/90 text-white text-sm font-mono rounded-b-none md:rounded-b-lg mr-0 md:mr-1">
            {jsonError}
          </div>
        )}
      </div>

      {/* ZON Editor */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative pl-0 md:pl-1">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-4 py-2 bg-gray-700 rounded-t-none md:rounded-t-lg ml-0 md:ml-1">
          <div className="text-white font-semibold flex items-center gap-2">
            <ZonLogo />
            ZON
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.npmjs.com/package/zzon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <NpmIcon />
            </a>
            <a
              href="https://github.com/nurulhudaapon/zzon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://github.com/nurulhudaapon/zzon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {isStarsLoading ? (
                <div className="h-5 w-18 bg-gray-600 animate-pulse rounded" />
              ) : (
                <img
                  src="https://img.shields.io/github/stars/nurulhudaapon/zzon?style=social&cacheSeconds=60"
                  alt="GitHub stars"
                  className="h-5 w-18"
                />
              )}
            </a>
          </div>
        </div>
        <div className="h-full rounded-none md:rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <div className="h-full overflow-y-auto bg-[#1e293b]">
            <div className="min-h-full flex flex-col">
              <Editor
                value={zonValue}
                onValueChange={handleZonChange}
                highlight={(code) => Prism.highlight(code, Prism.languages.zig, 'zig')}
                padding={16}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                  marginTop: '38px',
                  backgroundColor: 'transparent',
                  color: '#e2e8f0',
                  whiteSpace: 'pre',
                  caretColor: '#fff',
                  width: '100%',
                  flex: '1 1 auto',
                }}
                textareaClassName="flex-1"
                className="h-full pt-12 flex-1"
              />
            </div>
          </div>
        </div>
        {zonError && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-red-900/90 text-white text-sm font-mono rounded-b-none md:rounded-b-lg ml-0 md:ml-1">
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
      name: 'zzon',
      value: 42,
      isActive: true,
      tags: ['json', 'zon', 'converter'],
    },
  },
  {
    name: 'About zzon',
    json: {
      name: 'zzon',
      description: 'A fast, spec compliant, ZON parser and serializer for JavaScript.',
      main: 'index.js',
      type: 'module',
      homepage: 'https://github.com/nurulhudaapon/zzon',
      repository: {
        type: 'git',
        url: 'https://github.com/nurulhudaapon/zzon.git',
      },
      keywords: ['zon', 'zig', 'json', 'parser', 'serializer'],
      author: 'Nurul Huda (Apon) <me@nurulhudaapon.com>',
      license: 'MIT',
      module: 'index.js',
      types: 'index.d.ts',
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

// SVG Components
const ZonLogo = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 140">
    <g fill="#f7a41d">
      <g>
        <polygon points="46,22 28,44 19,30" />
        <polygon points="46,22 33,33 28,44 22,44 22,95 31,95 20,100 12,117 0,117 0,22" shapeRendering="crispEdges" />
        <polygon points="31,95 12,117 4,106" />
      </g>
      <g>
        <polygon points="56,22 62,36 37,44" />
        <polygon points="56,22 111,22 111,44 37,44 56,32" shapeRendering="crispEdges" />
        <polygon points="116,95 97,117 90,104" />
        <polygon points="116,95 100,104 97,117 42,117 42,95" shapeRendering="crispEdges" />
        <polygon points="150,0 52,117 3,140 101,22" />
      </g>
      <g>
        <polygon points="141,22 140,40 122,45" />
        <polygon
          points="153,22 153,117 106,117 120,105 125,95 131,95 131,45 122,45 132,36 141,22"
          shapeRendering="crispEdges"
        />
        <polygon points="125,95 130,110 106,117" />
      </g>
    </g>
  </svg>
);

const NpmIcon = () => (
  <svg fill="currentColor" className="w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>npm</title>
    <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
  </svg>
);

const GitHubIcon = () => (
  <svg fill="currentColor" className="w-5" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const JSONIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20"
    height="20"
    viewBox="0 0 160 160"
    version="1.1"
    className="w-5 h-5"
  >
    <title>JSON logo</title>
    <defs>
      <linearGradient id="linearGradient8385">
        <stop offset="0" />
        <stop stopColor="#fff" offset="1" />
      </linearGradient>
      <linearGradient
        id="linearGradient3002"
        x1="-553.27"
        x2="-666.12"
        y1="525.91"
        y2="413.05"
        gradientTransform="matrix(.99884 0 0 .9987 689.01 -388.84)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#linearGradient8385"
      />
      <linearGradient
        id="linearGradient3005"
        x1="-666.12"
        x2="-553.27"
        y1="413.04"
        y2="525.91"
        gradientTransform="matrix(.99884 0 0 .9987 689.01 -388.84)"
        gradientUnits="userSpaceOnUse"
        xlinkHref="#linearGradient8385"
      />
    </defs>
    <g fillRule="evenodd">
      <path
        d="m79.865 119.1c35.398 48.255 70.04-13.469 69.989-50.587-0.0602-43.886-44.541-68.414-70.018-68.414-40.892 0-79.836 33.796-79.836 80.036 0 51.396 44.64 79.865 79.836 79.865-7.9645-1.1468-34.506-6.834-34.863-67.967-0.23987-41.347 13.488-57.866 34.805-50.599 0.47743 0.17707 23.514 9.2645 23.514 38.951 0 29.56-23.427 38.715-23.427 38.715z"
        color="#000000"
        fill="url(#linearGradient3005)"
      />
      <path
        d="m79.823 41.401c-23.39-8.0619-52.043 11.216-52.043 49.829 0 63.048 46.721 68.77 52.384 68.77 40.892 0 79.836-33.796 79.836-80.036 0-51.396-44.64-79.865-79.836-79.865 9.7481-1.35 52.541 10.55 52.541 69.037 0 38.141-31.953 58.905-52.735 50.033-0.47743-0.17707-23.514-9.2645-23.514-38.951 0-29.56 23.367-38.818 23.367-38.818z"
        color="#000000"
        fill="url(#linearGradient3002)"
      />
    </g>
  </svg>
);
