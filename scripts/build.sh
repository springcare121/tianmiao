#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the project..."
pnpm next build

# Copy static assets for standalone mode
echo "Copying static assets for standalone server..."
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

echo "Build completed successfully!"
