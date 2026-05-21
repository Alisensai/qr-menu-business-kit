import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts", "lib/generated/prisma/**"]
  },
  ...nextVitals
];

export default eslintConfig;
