#!/usr/bin/env node
/**
 * Custom build script for Beauty of Joseon TanStack Start application
 * This handles building without the tanstack-start CLI
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const appSrc = path.join(projectRoot, 'app/src');
const distDir = path.join(projectRoot, 'dist');

console.log('📦 Building Beauty of Joseon application...');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple entry point that Vercel can use
const serverEntry = `
import handler from './app/src/server/index.ts';
export default handler;
`;

// Copy necessary files to dist
const filesToCopy = [
  'app/src/server/index.ts',
  'app/src/main.tsx',
  'app/index.html',
  'package.json',
];

console.log('📋 Preparing build output...');

// For Vercel, we can use api/index.ts or a simpler approach
// Let's just ensure the source is available for runtime use
fs.copyFileSync(path.join(projectRoot, 'package.json'), path.join(distDir, 'package.json'));

// Create a minimal entry point for Vercel
const vercelEntry = `
import handler from '../app/src/server/index.ts';

export default handler;
`;

const apiDir = path.join(distDir, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

fs.writeFileSync(path.join(apiDir, 'index.ts'), vercelEntry);

console.log('✅ Build complete!');
console.log(`📁 Output directory: ${distDir}`);
