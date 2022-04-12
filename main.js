import astroPlugin from "astro/vite-plugin-astro";
import astroPostprocessPlugin from "astro/vite-plugin-astro-postprocess";
import astroMarkdownPlugin from "astro/vite-plugin-markdown";
import vite from "vite";

const port = 3100;
const root = new URL("./content", import.meta.url);

async function main() {
  const config = {
    root,
    srcDir: root,
  };
  const server = await vite.createServer({
    plugins: [
      astroPlugin({
        config,
      }),
      astroPostprocessPlugin({
        config,
      }),
      astroMarkdownPlugin({
        config,
      }),
    ],
    define: {
      global: "globalThis",
    },
    optimizeDeps: {
      include: [
        "serialize-javascript",
        "shorthash",
        "vscode-textmate",
        "vscode-oniguruma",
      ],
    },
  });
  await server.listen(port);
  console.log(`http://localhost:${port}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
