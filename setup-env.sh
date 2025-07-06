#!/bin/bash

# Setup script for RexixHybrid React Native project
# This script sets up the necessary environment variables

echo "Setting up environment variables for RexixHybrid..."

# Set Android SDK path
export ANDROID_HOME=~/Library/Android/sdk

# Add Android SDK tools to PATH
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Verify Android SDK location
if [ -d "$ANDROID_HOME" ]; then
    echo "✅ Android SDK found at: $ANDROID_HOME"
else
    echo "❌ Android SDK not found at: $ANDROID_HOME"
    echo "Please install Android SDK or update the path in this script"
fi

# Set React Native environment
export REACT_NATIVE_PACKAGER_HOSTNAME=localhost

echo "Environment setup complete!"
echo "ANDROID_HOME is set to: $ANDROID_HOME" 