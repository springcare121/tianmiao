#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
PORT="${DEPLOY_RUN_PORT:-5000}"

cd "${COZE_WORKSPACE_PATH}"

echo "Starting standalone server on 0.0.0.0:${PORT}..."
HOSTNAME=0.0.0.0 PORT=${PORT} node .next/standalone/server.js
