#!/usr/bin/env node
import path from 'path';
import { runner } from '../../utils/index.mjs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, 'run.mjs');

runner(file);
