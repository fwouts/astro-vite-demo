import { renderMarkdown } from "@astrojs/markdown-remark";
import { renderToString } from "astro/server/index";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import Component from "./content/starter/src/pages/index.astro";

const createAstro = (_, props, slots) => {
  return {
    props,
    slots: {
      render: async (slot) => {
        return renderToString(Astro, slots[slot]);
      },
    },
    __renderMarkdown: async (content, opts) => {
      const { code } = await renderMarkdown(content, {
        remarkPlugins: [remarkGfm, remarkSmartypants],
        rehypePlugins: [rehypeSlug],
        ...opts,
      });
      return code;
    },
  };
};
const Astro = {
  createAstro,
  links: new Set(),
  scripts: new Set(),
  styles: new Set(),
};

renderToString(Astro, Component, {
  label: "foo",
})
  .then((code) => (document.body.innerHTML = code))
  .catch(console.error);
