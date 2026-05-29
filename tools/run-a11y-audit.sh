#!/bin/bash
# Lightweight A11y Auditor

TARGET=${1:-"."}
echo "♿ Running a11y audit on $TARGET..."

# Mock check for missing alt tags or aria labels
grep -r "img" "$TARGET" | grep -v "alt=" && echo "⚠️ Found img tags without alt attributes."
grep -r "button" "$TARGET" | grep -v "aria-label=" | grep -v ">.*</button>" && echo "⚠️ Found buttons without labels."

echo "✅ Audit complete."
