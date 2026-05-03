#!/bin/bash

if command -v ast-grep >/dev/null 2>&1; then
    AST_GREP_BIN="$(command -v ast-grep)"
elif command -v sg >/dev/null 2>&1; then
    AST_GREP_BIN="$(command -v sg)"
else
    echo "⚠️  ast-grep is not installed; skipping .rules scans."
    exit 0
fi

"$AST_GREP_BIN" scan -r .rules/SelectItem.yml

"$AST_GREP_BIN" scan -r .rules/contrast.yml

"$AST_GREP_BIN" scan -r .rules/supabase-google-sso.yml

"$AST_GREP_BIN" scan -r .rules/toast-hook.yml

"$AST_GREP_BIN" scan -r .rules/slot-nesting.yml

"$AST_GREP_BIN" scan -r .rules/require-button-interaction.yml

useauth_output=$("$AST_GREP_BIN" scan -r .rules/useAuth.yml 2>/dev/null)

if [ -z "$useauth_output" ]; then
    exit 0
fi

authprovider_output=$("$AST_GREP_BIN" scan -r .rules/authProvider.yml 2>/dev/null)

if [ -n "$authprovider_output" ]; then
    exit 0
fi

echo "=== ast-grep scan -r .rules/useAuth.yml output ==="
echo "$useauth_output"
echo ""
echo "=== ast-grep scan -r .rules/authProvider.yml output ==="
echo "$authprovider_output"
echo ""
echo "⚠️  Issue detected:"
echo "The code uses useAuth Hook but does not have AuthProvider component wrapping the components."
echo "Please ensure that components using useAuth are wrapped with AuthProvider to provide proper authentication context."
echo ""
echo "Suggested fixes:"
echo "1. Add AuthProvider wrapper in app.tsx or corresponding root component"
echo "2. Ensure all components using useAuth are within AuthProvider scope"
