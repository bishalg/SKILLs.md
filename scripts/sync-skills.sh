#!/bin/bash
# Skill Sync Deployment Script
# Automatically syncs the orchestrator, agents, and skills to a target project.

TARGET=""

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --target) TARGET="$2"; shift ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

if [ -z "$TARGET" ]; then
    echo "Usage: ./sync-skills.sh --target /path/to/project"
    exit 1
fi

echo "🚀 Syncing Agentic Skills to $TARGET..."

# Create destination directories
mkdir -p "$TARGET/.agents/orchestrator"
mkdir -p "$TARGET/.agents/agents"
mkdir -p "$TARGET/.agents/skills"
mkdir -p "$TARGET/.agents/contracts"

# Sync core directories while preserving the host's PRODUCT.md and DESIGN.md
rsync -av --update ./orchestrator/ "$TARGET/.agents/orchestrator/"
rsync -av --update ./agents/ "$TARGET/.agents/agents/"
rsync -av --update ./skills/ "$TARGET/.agents/skills/"
rsync -av --update ./contracts/ "$TARGET/.agents/contracts/"

echo "✅ Sync complete. Sub-agents updated."
