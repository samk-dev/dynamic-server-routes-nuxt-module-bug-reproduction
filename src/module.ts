import {
  defineNuxtModule,
  addServerHandler,
  addPlugin,
  createResolver,
} from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "my-module",
    configKey: "myModule",
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    addServerHandler({
      route: "/api/hello/[name]",
      handler: resolver.resolve("./runtime/server/api/hello/[name].get.ts"),
    });
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
