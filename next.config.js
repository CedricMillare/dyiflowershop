/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
<<<<<<< HEAD
=======
    images: {
        domains: ['utfs.io'],
    },
>>>>>>> 6b1f6d74b51cf09f37162d593ed52e813b60c4f5
};

export default config;
