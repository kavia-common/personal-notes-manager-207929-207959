#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-notes-manager-207929-207959/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

