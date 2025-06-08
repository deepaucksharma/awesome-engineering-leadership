#!/bin/bash

echo "🔍 Testing GitHub Pages Deployment..."
echo "====================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URLs to test
MAIN_URL="https://deepaucksharma.github.io/awesome-engineering-leadership/"
SYSTEM_DESIGN_URL="https://deepaucksharma.github.io/awesome-engineering-leadership/system-design-mastery/"

echo "Testing main site..."
if curl -s -o /dev/null -w "%{http_code}" "$MAIN_URL" | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Main site is accessible${NC}"
    echo "   URL: $MAIN_URL"
else
    echo -e "${YELLOW}⏳ Main site not yet accessible (this is normal for first deployment)${NC}"
    echo "   It may take 5-10 minutes for GitHub Pages to activate"
fi

echo ""
echo "Testing System Design Mastery page..."
if curl -s -o /dev/null -w "%{http_code}" "$SYSTEM_DESIGN_URL" | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ System Design page is accessible${NC}"
    echo "   URL: $SYSTEM_DESIGN_URL"
else
    echo -e "${YELLOW}⏳ System Design page not yet accessible${NC}"
fi

echo ""
echo "📊 GitHub Actions Status:"
echo "Check deployment progress at:"
echo "https://github.com/deepaucksharma/awesome-engineering-leadership/actions"

echo ""
echo "🔧 GitHub Pages Settings:"
echo "Verify configuration at:"
echo "https://github.com/deepaucksharma/awesome-engineering-leadership/settings/pages"

echo ""
echo -e "${YELLOW}Note: First-time GitHub Pages deployment can take up to 10 minutes.${NC}"
echo "If the sites aren't accessible yet, please wait a few minutes and try again."
