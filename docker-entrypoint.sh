#!/bin/sh

echo "🚀 Starting entrypoint script..."
echo "📂 Current directory: $(pwd)"
echo "📁 Listing .next directory..."
ls -la /app/.next/ || echo "⚠️  .next directory not found!"

echo ""
echo "🔧 Environment variables received:"
echo "   NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL:-NOT_SET}"
echo "   NEXT_PUBLIC_API_URL_Market: ${NEXT_PUBLIC_API_URL_Market:-NOT_SET}"
echo "   NEXT_PUBLIC_API_URL_Reservation: ${NEXT_PUBLIC_API_URL_Reservation:-NOT_SET}"
echo "   NEXT_PUBLIC_API_URL_Slip: ${NEXT_PUBLIC_API_URL_Slip:-NOT_SET}"
echo ""

# Check if .next directory exists
if [ ! -d "/app/.next" ]; then
    echo "❌ ERROR: .next directory not found!"
    echo "   This might be a build issue."
    echo "   Skipping environment variable replacement..."
else
    echo "✅ .next directory found"
    
    # Function to recursively find and replace in JS files
    echo "🔄 Replacing environment variables in static files..."
    if [ -d "/app/.next/static" ]; then
        find /app/.next/static -type f -name "*.js" -exec sed -i \
            -e "s|__NEXT_PUBLIC_API_URL__|${NEXT_PUBLIC_API_URL}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Market__|${NEXT_PUBLIC_API_URL_Market}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Reservation__|${NEXT_PUBLIC_API_URL_Reservation}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Slip__|${NEXT_PUBLIC_API_URL_Slip}|g" \
            {} + 2>/dev/null || echo "⚠️  No static JS files found or replacement failed"
    else
        echo "⚠️  /app/.next/static directory not found"
    fi
    
    echo "🔄 Replacing environment variables in server files..."
    if [ -d "/app/.next/server" ]; then
        find /app/.next/server -type f -name "*.js" -exec sed -i \
            -e "s|__NEXT_PUBLIC_API_URL__|${NEXT_PUBLIC_API_URL}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Market__|${NEXT_PUBLIC_API_URL_Market}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Reservation__|${NEXT_PUBLIC_API_URL_Reservation}|g" \
            -e "s|__NEXT_PUBLIC_API_URL_Slip__|${NEXT_PUBLIC_API_URL_Slip}|g" \
            {} + 2>/dev/null || echo "⚠️  No server JS files found or replacement failed"
    else
        echo "⚠️  /app/.next/server directory not found"
    fi
    
    echo "✅ Environment variable replacement completed!"
fi

echo ""
echo "🎯 Starting Next.js application..."
echo "   Command: $@"
echo ""

# Execute the main command
exec "$@"