import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { reducedMotion } from '../lib/store';

// Ægte 3D-spiralgalakse af partikler (Three.js). Roterer langsomt og følger musen/tilt.
// Respekterer prefers-reduced-motion: tegnes én gang uden animation.

const COLORS = { inner: '#F0C36A', mid: '#F28A3C', outer: '#9B7CFF', edge: '#4DD9E8' };

function makeGalaxy(count: number, radius: number, branches: number) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const cIn = new THREE.Color(COLORS.inner);
  const cMid = new THREE.Color(COLORS.mid);
  const cOut = new THREE.Color(COLORS.outer);
  const cEdge = new THREE.Color(COLORS.edge);
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
  for (let i = 0; i < count; i++) {
    const r = Math.pow(rnd(), 1.15) * radius;
    const branch = ((i % branches) / branches) * Math.PI * 2;
    const spin = r * 0.75;
    const spread = 0.9 + r * 0.12;
    const rx = Math.pow(rnd(), 2.2) * (rnd() < 0.5 ? 1 : -1) * spread * r * 0.5;
    const ry = Math.pow(rnd(), 2.2) * (rnd() < 0.5 ? 1 : -1) * spread * 0.35;
    const rz = Math.pow(rnd(), 2.2) * (rnd() < 0.5 ? 1 : -1) * spread * r * 0.5;
    pos[i * 3] = Math.cos(branch + spin) * r + rx;
    pos[i * 3 + 1] = ry;
    pos[i * 3 + 2] = Math.sin(branch + spin) * r + rz;
    const t = r / radius;
    const c = t < 0.25 ? cIn.clone().lerp(cMid, t / 0.25)
      : t < 0.7 ? cMid.clone().lerp(cOut, (t - 0.25) / 0.45)
      : cOut.clone().lerp(cEdge, (t - 0.7) / 0.3);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d')!;
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export function GalaxyScene({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      el.classList.add('no-webgl');
      return; // ingen WebGL: CSS-baggrunden står alene
    }
    const small = window.innerWidth < 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0, 0);

    const tex = dotTexture();
    const galaxy = new THREE.Points(
      makeGalaxy(small ? 26000 : 50000, 6.5, 5),
      new THREE.PointsMaterial({ size: small ? 0.08 : 0.05, map: tex, vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false, blending: THREE.AdditiveBlending }),
    );
    galaxy.rotation.x = 0.35;
    galaxy.position.y = 1.7;
    scene.add(galaxy);

    // Lysende kerne
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, color: '#FFD9A0', transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    core.scale.set(2.4, 2.4, 1);
    core.position.y = 1.7;
    scene.add(core);

    // Fjerne stjerner
    const starGeo = new THREE.BufferGeometry();
    const sp = new Float32Array(1500 * 3);
    let s = 99;
    const r2 = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
    for (let i = 0; i < sp.length; i++) sp[i] = (r2() - 0.5) * 60;
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.08, map: tex, color: '#cfe3ff', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(stars);

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 8.5 : 6.2;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener('pointermove', onMove);

    const still = reducedMotion();
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(el);
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      galaxy.rotation.y = t * 0.05;
      stars.rotation.y = t * 0.008;
      core.material.opacity = 0.85 + Math.sin(t * 1.3) * 0.1;
      camera.position.x += (target.x * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (3.2 - target.y * 0.8 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };
    if (still) renderer.render(scene, camera);
    else tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      scene.traverse((o) => {
        const m = o as THREE.Points;
        m.geometry?.dispose();
        (m.material as THREE.Material | undefined)?.dispose?.();
      });
      tex.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={`galaxy-scene ${className}`} aria-hidden="true" />;
}
