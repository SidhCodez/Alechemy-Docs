#!/bin/bash
set -e

echo "=== 1. Building mdBook ==="
# Download mdbook if not present
if ! command -v mdbook &> /dev/null
then
    echo "mdbook not found, downloading..."
    curl -sL https://github.com/rust-lang/mdBook/releases/download/v0.4.52/mdbook-v0.4.52-x86_64-unknown-linux-gnu.tar.gz | tar -xz
    export PATH="$PWD:$PATH"
fi

mdbook build docs

echo "=== 1.5. Fixing mdBook relative paths to absolute paths ==="
node scripts/fix-paths.js

echo "=== 2. Setting up Next.js app ==="
cd landing
npm install

echo "=== 3. Copying docs into Next.js public directory ==="
rm -rf public/docs
mkdir -p public/docs
cp -R ../docs/book/* public/docs/

echo "=== 4. Building Next.js ==="
npm run build
