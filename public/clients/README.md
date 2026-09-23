# Client logos

Drop logo files here, then add an entry to `src/lib/clients.ts`:

```ts
export const CLIENTS: Client[] = [
  { name: "Top Vision Security", logo: "topvision.svg", slug: "topvision" },
];
```

- `logo` is the filename in this folder
- `slug` is optional - it links the logo to that case study
- `scale` is optional - use it if one logo optically reads too big or small

The "Trusted by" block hides itself while the list is empty, so partial
rollout is safe.

## File requirements

- **SVG preferred** (scales perfectly, tiny). PNG with a transparent
  background is fine as a fallback - at least 400px wide.
- Transparent background, cropped tight to the mark (no baked-in padding).
- Any colour is OK: the component normalises logos to white for the dark
  UI and restores the original colour on hover.
