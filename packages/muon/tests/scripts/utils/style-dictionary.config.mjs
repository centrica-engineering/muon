import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const root = path.join(__filename, '..', '..', '..', '..');
const buildPath = path.join(root, 'build', 'tokens');
export default {
  hooks: {
    formats: {
      'font-template': ({ dictionary }) => {
        return _.template(fs.readFileSync(path.join(__filename, '..', 'font.css.template')))({ properties: dictionary.tokens });
      }
    }
  },
  platforms: {
    template: {
      buildPath: path.join(buildPath, 'css/'),
      files: [
        {
          destination: 'font-family.css',
          format: 'font-template'
        }
      ],
      filter: {
        attributes: {
          category: 'theme',
          type: 'font'
        }
      }
    }
  }
};
