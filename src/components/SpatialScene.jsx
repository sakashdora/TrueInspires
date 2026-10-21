import { useEffect, useRef, useState } from 'react';
import { BrandMark, brandPaths } from './BrandMark';

export default function SpatialScene({ theme, paused }) {
  const hostRef = useRef(null);
  const controller = useRef(null);
  const settings = useRef({ theme, paused });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    settings.current = { theme, paused };
    controller.current?.update();
  }, [theme, paused]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const host = hostRef.current;

    // The content and CSS emblem render immediately, even if this optional chunk
    // cannot load or the browser does not provide a WebGL2 context.
    async function initialize() {
      const [THREE, { RoomEnvironment }, { SVGLoader }] = await Promise.all([
        import('three'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('three/addons/loaders/SVGLoader.js'),
      ]);
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 641 ? 1.5 : 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      host.appendChild(renderer.domElement);
      cleanup = () => { renderer.dispose(); renderer.domElement.remove(); };

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-5, 5, 2, -2, 0.1, 50);
      camera.position.set(0, 0, 10);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      pmrem.dispose();

      const ambient = new THREE.AmbientLight(0xbedaff, 2.5);
      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(-3, 5, 7);
      const blue = new THREE.DirectionalLight(0x1677ff, 4);
      blue.position.set(4, -2, 4);
      scene.add(ambient, key, blue);
      const rig = new THREE.Group();
      scene.add(rig);

      const emblem = new THREE.Group();
      const logoMaterial = new THREE.ShaderMaterial({
        vertexShader: 'varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal; void main(){ vec4 p = modelViewMatrix * vec4(position,1.); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); vLocal = position; gl_Position = projectionMatrix * p; }',
        fragmentShader: 'varying vec3 vNormal; varying vec3 vView; varying vec3 vLocal; void main(){ float y = clamp((vLocal.y + 100.) / 200.,0.,1.); vec3 blue = mix(vec3(.025,.64,1.),vec3(.015,.17,.8),y); float edge = pow(1. - abs(dot(normalize(vNormal),normalize(vView))),1.6); float glint = pow(max(0.,1. - abs(vLocal.x * .006 + vLocal.y * .004 + .2)),14.); blue += vec3(.12,.24,.3) * glint; blue = mix(blue,vec3(.62,.9,1.),edge * .9); gl_FragColor = vec4(blue,1.); }',
      });
      const svg = `<svg xmlns="http://www.w3.org/2000/svg">${brandPaths.map(d => `<path d="${d}"/>`).join('')}</svg>`;
      const vector = new SVGLoader().parse(svg);
      for (const path of vector.paths) {
        for (const shape of path.toShapes()) {
          const geometry = new THREE.ExtrudeGeometry(shape, { depth: 10, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 1.4, bevelThickness: 1.5, curveSegments: 18 });
          geometry.translate(-88, -100, -5);
          const piece = new THREE.Mesh(geometry, logoMaterial);
          piece.scale.set(0.0095, -0.0095, 0.0095);
          emblem.add(piece);
        }
      }
      emblem.position.z = 0.72;
      emblem.rotation.y = -0.08;
      rig.add(emblem);

      // A clear optical lens, not a raster picture of a sphere. Environment
      // reflections, transmission, and a Fresnel edge give it physical depth.
      const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xa3d1ff, metalness: 0.08, roughness: 0.045, transmission: 0.94, thickness: 0.25, ior: 1.16, transparent: true, opacity: 0.3, clearcoat: 1, envMapIntensity: 2.2, depthWrite: false });
      const lens = new THREE.Mesh(new THREE.SphereGeometry(1.32, 64, 40), glassMaterial);
      lens.scale.z = 0.58;
      lens.position.z = 0.7;
      rig.add(lens);

      const rimMaterial = new THREE.ShaderMaterial({
        uniforms: { tint: { value: new THREE.Color(0x4c9fff) }, strength: { value: 0.6 } },
        vertexShader: 'varying vec3 vNormal; varying vec3 vView; void main(){ vec4 p = modelViewMatrix * vec4(position,1.); vNormal = normalize(normalMatrix * normal); vView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }',
        fragmentShader: 'uniform vec3 tint; uniform float strength; varying vec3 vNormal; varying vec3 vView; void main(){ vec3 n = normalize(vNormal); float rim = pow(1. - abs(dot(n,normalize(vView))), 1.6); float glint = pow(max(dot(n,normalize(vec3(-.5,.8,.45))),0.),50.); vec3 color = mix(tint,vec3(.8,.94,1.),glint); gl_FragColor = vec4(color,rim * strength + glint * .65); }',
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Mesh(new THREE.SphereGeometry(1.35, 64, 40), rimMaterial);
      glow.scale.z = 0.6;
      glow.position.z = 0.7;
      rig.add(glow);
      const trimMaterial = new THREE.MeshPhysicalMaterial({ color: 0x318eff, metalness: 0.5, roughness: 0.16, emissive: 0x1144cc, emissiveIntensity: 0.15, clearcoat: 1, envMapIntensity: 0.65 });
      [1.32, 1.4].forEach((radius, index) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, index ? 0.025 : 0.043, 16, 160), trimMaterial);
        ring.position.z = 0.61 - index * 0.1;
        ring.rotation.set(index ? 0.09 : -0.12, index ? -0.1 : 0.1, 0);
        rig.add(ring);
      });
      const innerLight = new THREE.Mesh(new THREE.CircleGeometry(1.28, 80), new THREE.ShaderMaterial({
        vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
        fragmentShader: 'varying vec2 vUv; void main(){ float r=length(vUv-.5)*2.; float halo=pow(r,3.)*.45; float light=pow(max(0.,1.-length(vUv-vec2(.3,.75))*1.5),3.); gl_FragColor=vec4(.04,.3+light*.2,.95, .06+halo+light*.16); }',
        transparent: true, depthWrite: false,
      }));
      innerLight.position.z = 0.25;
      rig.add(innerLight);

      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x438eff, transparent: true, opacity: 0.7 });
      const satelliteMaterial = new THREE.MeshPhysicalMaterial({ color: 0xaad5ff, metalness: 0.65, roughness: 0.15, clearcoat: 1, envMapIntensity: 2 });
      const cobaltMaterial = new THREE.MeshPhysicalMaterial({ color: 0x0875ff, metalness: 0.5, roughness: 0.12, clearcoat: 1 });
      const satellites = [];
      for (let index = 0; index < 2; index++) {
        const group = new THREE.Group();
        group.rotation.z = index ? -0.39 : 0.4;
        group.rotation.x = index ? 0.46 : -0.3;
        const points = Array.from({ length: 129 }, (_, step) => {
          const angle = step / 128 * Math.PI * 2;
          return new THREE.Vector3(Math.cos(angle) * 2.65, Math.sin(angle) * 0.9, 0);
        });
        const curve = new THREE.CatmullRomCurve3(points, true);
        group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.008, 6, true), orbitMaterial));
        for (let node = 0; node < 3; node++) {
          const orb = new THREE.Mesh(new THREE.SphereGeometry(node === 1 ? 0.12 : 0.08, 24, 16), node === 1 ? satelliteMaterial : cobaltMaterial);
          group.add(orb);
          satellites.push({ orb, angle: node * 2.15 + index, orbit: index });
        }
        group.position.z = -0.16;
        rig.add(group);
      }
      [[-4, 1.1, 0.19], [-3.65, -1.22, 0.23], [3.7, -0.95, 0.22], [4.2, 1.4, 0.09]].forEach(([x, y, size], i) => {
        const orb = new THREE.Mesh(new THREE.SphereGeometry(size, 24, 16), i % 2 ? cobaltMaterial : satelliteMaterial);
        orb.position.set(x, y, -0.5);
        rig.add(orb);
      });

      let frame = 0;
      let visible = true;
      let contextLost = false;
      let elapsed = 0;
      let previousTime = 0;
      let pointerX = 0;
      let pointerY = 0;
      const render = () => { if (!disposed && !contextLost) renderer.render(scene, camera); };
      const canAnimate = () => !settings.current.paused && visible && !document.hidden && !contextLost && !disposed;
      const tick = (time) => {
        frame = 0;
        if (!canAnimate()) return;
        elapsed += previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
        previousTime = time;
        rig.rotation.y += (pointerX * 0.12 - rig.rotation.y) * 0.035;
        rig.rotation.x += (-pointerY * 0.07 - rig.rotation.x) * 0.035;
        emblem.rotation.y = -0.08 + Math.sin(elapsed * 0.32) * 0.09;
        satellites.forEach(({ orb, angle, orbit }) => {
          const phase = angle + elapsed * (orbit ? -0.075 : 0.06);
          orb.position.set(Math.cos(phase) * 2.65, Math.sin(phase) * 0.9, 0);
        });
        render();
        frame = requestAnimationFrame(tick);
      };
      const schedule = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
        render();
        if (canAnimate()) frame = requestAnimationFrame(tick);
      };
      satellites.forEach(({ orb, angle }) => orb.position.set(Math.cos(angle) * 2.65, Math.sin(angle) * 0.9, 0));
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        const halfHeight = width < 641 ? 1.67 : 1.75;
        camera.left = -halfHeight * width / height;
        camera.right = halfHeight * width / height;
        camera.top = halfHeight;
        camera.bottom = -halfHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 641 ? 1.5 : 1.75));
        renderer.setSize(width, height);
        render();
      };
      const update = () => {
        const isLight = settings.current.theme === 'light';
        ambient.intensity = isLight ? 1.4 : 0.9;
        glassMaterial.opacity = isLight ? 0.24 : 0.34;
        glassMaterial.color.set(isLight ? 0xd1e8ff : 0x91c8ff);
        orbitMaterial.color.set(isLight ? 0x609dff : 0x3a8fff);
        rimMaterial.uniforms.strength.value = isLight ? 0.35 : 0.7;
        schedule();
      };
      const move = (event) => {
        const rect = host.getBoundingClientRect();
        pointerX = (event.clientX - rect.left) / rect.width * 2 - 1;
        pointerY = (event.clientY - rect.top) / rect.height * 2 - 1;
      };
      const leave = () => { pointerX = 0; pointerY = 0; };
      const lost = (event) => { event.preventDefault(); contextLost = true; setReady(false); schedule(); };
      const restored = () => { contextLost = false; setReady(true); schedule(); };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { rootMargin: '80px' });
      intersection.observe(host);
      host.parentElement.addEventListener('pointermove', move, { passive: true });
      host.parentElement.addEventListener('pointerleave', leave);
      renderer.domElement.addEventListener('webglcontextlost', lost);
      renderer.domElement.addEventListener('webglcontextrestored', restored);
      document.addEventListener('visibilitychange', schedule);
      controller.current = { update };
      resize();
      update();
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(frame);
        controller.current = null;
        resizeObserver.disconnect();
        intersection.disconnect();
        host.parentElement?.removeEventListener('pointermove', move);
        host.parentElement?.removeEventListener('pointerleave', leave);
        document.removeEventListener('visibilitychange', schedule);
        renderer.domElement.removeEventListener('webglcontextlost', lost);
        renderer.domElement.removeEventListener('webglcontextrestored', restored);
        const geometries = new Set();
        const materials = new Set();
        scene.traverse(object => {
          if (object.geometry) geometries.add(object.geometry);
          if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
        });
        geometries.forEach(geometry => geometry.dispose());
        materials.forEach(material => material.dispose());
        environment.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }

    initialize().catch(() => { if (!disposed) { cleanup(); setReady(false); } });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div className={`spatial-scene${ready ? ' is-ready' : ''}`} aria-hidden="true" data-renderer={ready ? 'webgl' : 'fallback'}>
    <div className="scene-fallback"><div className="fallback-orbit" /><div className="fallback-orbit fallback-orbit--second" /><div className="fallback-core"><BrandMark /></div></div>
    <div ref={hostRef} className="scene-canvas" />
  </div>;
}
