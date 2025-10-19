#!/bin/bash

# Vibe AI Game Integration Test Script
# This script verifies the AI integration is working correctly

echo "=================================="
echo "VIBE AI INTEGRATION TEST"
echo "=================================="
echo ""

# Test 1: Check file exists
echo "[TEST 1] Checking ai-game.html exists..."
if [ -f "ai-game.html" ]; then
    echo "✅ PASS - ai-game.html found"
    FILE_SIZE=$(ls -lh ai-game.html | awk '{print $5}')
    echo "   File size: $FILE_SIZE"
else
    echo "❌ FAIL - ai-game.html not found"
    exit 1
fi
echo ""

# Test 2: Check proxy exists
echo "[TEST 2] Checking api-proxy.js exists..."
if [ -f "api-proxy.js" ]; then
    echo "✅ PASS - api-proxy.js found"
else
    echo "❌ FAIL - api-proxy.js not found"
    exit 1
fi
echo ""

# Test 3: Verify lesson count
echo "[TEST 3] Verifying 12 lessons..."
LESSON_COUNT=$(grep -c "type: 'multipleChoice'\|type: 'dragDrop'\|type: 'fillBlank'\|type: 'contextWindow'\|type: 'aiChallenge'" ai-game.html)
if [ "$LESSON_COUNT" -eq 12 ]; then
    echo "✅ PASS - Found 12 lessons"
else
    echo "❌ FAIL - Found $LESSON_COUNT lessons (expected 12)"
    exit 1
fi
echo ""

# Test 4: Verify AI lessons count
echo "[TEST 4] Verifying 7 AI challenge lessons..."
AI_LESSON_COUNT=$(grep -c "type: 'aiChallenge'" ai-game.html)
if [ "$AI_LESSON_COUNT" -eq 7 ]; then
    echo "✅ PASS - Found 7 AI challenge lessons"
else
    echo "❌ FAIL - Found $AI_LESSON_COUNT AI lessons (expected 7)"
    exit 1
fi
echo ""

# Test 5: Verify proxy URL
echo "[TEST 5] Verifying CORS proxy URL..."
if grep -q "http://localhost:3001/api/chat" ai-game.html; then
    echo "✅ PASS - Proxy URL configured correctly"
else
    echo "❌ FAIL - Proxy URL not found or incorrect"
    exit 1
fi
echo ""

# Test 6: Verify evaluation engine
echo "[TEST 6] Verifying evaluation engine..."
if grep -q "evaluateAIResponse" ai-game.html; then
    echo "✅ PASS - Evaluation engine present"
else
    echo "❌ FAIL - Evaluation engine not found"
    exit 1
fi
echo ""

# Test 7: Verify API client
echo "[TEST 7] Verifying API client..."
if grep -q "callGroqAPI" ai-game.html; then
    echo "✅ PASS - API client present"
else
    echo "❌ FAIL - API client not found"
    exit 1
fi
echo ""

# Test 8: Verify passing score is 50%
echo "[TEST 8] Verifying passing score is 50%..."
if grep -q "PASSING_SCORE = 50" ai-game.html; then
    echo "✅ PASS - Passing score set to 50%"
else
    echo "❌ FAIL - Passing score not set to 50%"
    exit 1
fi
echo ""

# Test 9: Verify rate limiting
echo "[TEST 9] Verifying rate limiting (5 seconds)..."
if grep -q "RATE_LIMIT_DELAY = 5000" ai-game.html; then
    echo "✅ PASS - Rate limiting configured (5 seconds)"
else
    echo "❌ FAIL - Rate limiting not configured correctly"
    exit 1
fi
echo ""

# Test 10: Verify timeout
echo "[TEST 10] Verifying API timeout (15 seconds)..."
if grep -q "API_TIMEOUT = 15000" ai-game.html; then
    echo "✅ PASS - Timeout configured (15 seconds)"
else
    echo "❌ FAIL - Timeout not configured correctly"
    exit 1
fi
echo ""

# Test 11: Verify hint system
echo "[TEST 11] Verifying hint system..."
if grep -q "hint-btn" ai-game.html && grep -q "hint-box" ai-game.html; then
    echo "✅ PASS - Hint system present"
else
    echo "❌ FAIL - Hint system not found"
    exit 1
fi
echo ""

# Test 12: Verify retry functionality
echo "[TEST 12] Verifying retry functionality..."
if grep -q "retry-btn" ai-game.html; then
    echo "✅ PASS - Retry functionality present"
else
    echo "❌ FAIL - Retry functionality not found"
    exit 1
fi
echo ""

# Test 13: Verify mobile responsive styles
echo "[TEST 13] Verifying mobile responsive styles..."
if grep -q "@media (max-width: 600px)" ai-game.html; then
    echo "✅ PASS - Mobile responsive styles present"
else
    echo "❌ FAIL - Mobile responsive styles not found"
    exit 1
fi
echo ""

# Test 14: Check if proxy is running
echo "[TEST 14] Checking if proxy server is running..."
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ PASS - Proxy server is running"
    PROXY_STATUS=$(curl -s http://localhost:3001/health | grep -o '"status":"ok"')
    if [ ! -z "$PROXY_STATUS" ]; then
        echo "   Status: OK"
    fi
else
    echo "⚠️  WARN - Proxy server not running"
    echo "   Run: node api-proxy.js"
fi
echo ""

# Test 15: Verify all lesson titles
echo "[TEST 15] Verifying lesson titles..."
LESSON_TITLES=(
    "Lesson 6: Function Generator"
    "Lesson 7: Bug Detective"
    "Lesson 8: Code Explainer"
    "Lesson 9: Refactoring Master"
    "Lesson 10: Test Generator"
    "Lesson 11: API Builder"
    "Lesson 12: Documentation Writer"
)

TITLE_FAIL=0
for title in "${LESSON_TITLES[@]}"; do
    if grep -q "$title" ai-game.html; then
        echo "   ✓ Found: $title"
    else
        echo "   ✗ Missing: $title"
        TITLE_FAIL=1
    fi
done

if [ $TITLE_FAIL -eq 0 ]; then
    echo "✅ PASS - All lesson titles present"
else
    echo "❌ FAIL - Some lesson titles missing"
    exit 1
fi
echo ""

# Summary
echo "=================================="
echo "ALL TESTS PASSED! ✅"
echo "=================================="
echo ""
echo "Your Vibe AI Game is ready to use!"
echo ""
echo "Next steps:"
echo "1. Start proxy: node api-proxy.js"
echo "2. Open ai-game.html in browser"
echo "3. Complete all 12 lessons!"
echo ""
echo "File location: $(pwd)/ai-game.html"
echo "File size: $(ls -lh ai-game.html | awk '{print $5}')"
echo "Total lines: $(wc -l < ai-game.html)"
echo ""
