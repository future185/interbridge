import 'dotenv/config';

export default {
  expo: {
    name: "interbridge",
    slug: "interbridge",
    scheme: "interbridge",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/logo.png",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: true,
    },
    web: {
      bundler: "metro",
      favicon: "./assets/icons/logo.png",
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  },
};
