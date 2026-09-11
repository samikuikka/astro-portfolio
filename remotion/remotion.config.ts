import { Config } from "@remotion/cli/config";

// Use the system chromium instead of downloading Chrome Headless Shell.
Config.setBrowserExecutable("/usr/bin/chromium");
Config.setOverwriteOutput(true);
Config.setVideoImageFormat("png");
