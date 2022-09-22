#!/usr/bin/env bash

# First build muon
npm run build
# Clear up the docs
rm -rf docs/_data/muon
mkdir -p docs/_data/muon
# Copy over relevant files
cp -f dist/custom-elements.json docs/_data/muon/custom-elements.json
cp -f packages/muon/build/tokens/json/muon-tokens-reference.json docs/_data/muon/muon-tokens-reference.json