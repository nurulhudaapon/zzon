import { plugin } from 'bun';

await plugin({
  name: 'ZON',
  async setup(build) {
    const { ZON } = await import('zzon');

    // when a .zon file is imported...
    build.onLoad({ filter: /\.(zon)$/ }, async (args) => {
      // read and parse the file
      const text = await Bun.file(args.path).text();
      const zon = ZON.parse(text) as Record<string, any>;

      return {
        loader: 'object',
        exports: {
          default: zon,
        },
      };
    });
  },
});
