# Redesign asset notes

The images below were generated with the built-in ImageGen tool and optimized to WebP. The current blue-glass design uses the ARGUS factory image; the earlier champagne sculpture is retained as a design asset but is no longer loaded by the page. Both founder portraits are the existing project assets.

The current centerpiece is rendered with Three.js in `src/components/SpatialScene.jsx`: an extruded TI mark, optical lens, orbital curves, and moving satellites. The code-native tracing in `src/components/BrandMark.jsx` is shared by the navigation, fallback, and 3D scene. There is no generated screenshot behind the hero. The scene adapts to the selected theme, pauses when off-screen or the tab is hidden, and honors reduced motion and the page's pause control. A CSS/SVG emblem remains visible when WebGL or its optional module cannot initialize.

## Sculptural identity

Saved asset: [`public/assets/ti-sculpture.webp`](../public/assets/ti-sculpture.webp), 1000 × 1305, transparent background.

Production prompt brief: Create an isolated, sculptural interpretation of the supplied True Inspire TI monogram and star, following the approved dark-and-champagne design reference. Preserve the recognizable silhouette. Use satin champagne brass and charcoal titanium, precise folded surfaces, soft studio lighting, and a transparent background. No text, pedestal, surrounding website, or additional symbols.

## ARGUS illustration

Saved asset: [`public/assets/argus-factory.webp`](../public/assets/argus-factory.webp), 1400 × 933.

Production prompt brief: Create a photorealistic wide industrial factory scene with two workers in protective helmets and high-visibility workwear, viewed from behind. Use a graphite-steel and restrained amber palette, realistic machinery, and natural industrial lighting. No text, interface, detection boxes, logos, or watermark. This is an illustrative scene, not a photograph of a customer installation.

The project preview interfaces are implemented in `src/components/ProjectPreview.jsx`. They are illustrative compositions, not live product screenshots or measurements. The page labels them accordingly; project links use the existing project data.
