#!/bin/bash

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUTPUT=$(npx vite build --minify false --logLevel error --outDir "$PROJECT_ROOT/node_modules/.tmp/rules-dist" 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
    echo "$OUTPUT"
fi

exit $EXIT_CODE
