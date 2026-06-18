#!/bin/bash
set -e

# Usage: ./update.sh /path/to/hijiffy-ai-training-hub.zip

ZIP="$1"

if [ -z "$ZIP" ]; then
  echo "Usage: ./update.sh /path/to/zip-file.zip"
  exit 1
fi

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
TMP_DIR=$(mktemp -d)

echo "→ Extracting $ZIP..."
unzip -q -o "$ZIP" -d "$TMP_DIR"

# Find the root of the extracted project (handles nested folders)
EXTRACTED=$(find "$TMP_DIR" -name "src" -type d | head -1 | xargs dirname)

echo "→ Copying src/ files..."
cp -r "$EXTRACTED/src/"* "$REPO_DIR/src/"

if [ -d "$EXTRACTED/src/components" ]; then
  echo "→ Copying components..."
  mkdir -p "$REPO_DIR/src/components"
  cp -r "$EXTRACTED/src/components/"* "$REPO_DIR/src/components/"
fi

# Check if package.json has new deps and install if needed
if ! diff -q "$EXTRACTED/package.json" "$REPO_DIR/package.json" > /dev/null 2>&1; then
  echo "→ package.json changed — running npm install..."
  # Only copy new deps, not scripts or other fields (preserve our build script)
  cd "$REPO_DIR" && npm install
fi

echo "→ Committing and pushing..."
cd "$REPO_DIR"
git add -A
git commit -m "update: new session content from AI Studio"
git push origin main

rm -rf "$TMP_DIR"

echo ""
echo "✓ Done. Cloudflare Pages is now building the update."
echo "  Check: https://training.lilitarutyunyan.com/google-ai/"
