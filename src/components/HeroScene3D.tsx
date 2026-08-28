"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pointLight = new THREE.PointLight(0x51c4ff, 1.2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const icosahedron = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: 0x51c4ff, wireframe: true }));
    icosahedron.position.set(1.6, 0.4, 0);
    group.add(icosahedron);

    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), new THREE.MeshStandardMaterial({ color: 0x008de5, wireframe: true }));
    octahedron.position.set(-1.8, -0.6, -1);
    group.add(octahedron);

    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 16, 60), new THREE.MeshStandardMaterial({ color: 0xfafafa, wireframe: true, transparent: true, opacity: 0.6 }));
    torus.position.set(0.2, -1.3, -0.5);
    group.add(torus);

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    let inView = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    }, { threshold: 0 });
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      if (!container.clientWidth || !container.clientHeight) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const delta = clock.getDelta();
      if (!reducedMotionQuery.matches) {
        group.rotation.y += delta * 0.15;
        group.rotation.x += delta * 0.04;
      }
      group.position.x = THREE.MathUtils.lerp(group.position.x, pointer.x * 0.5, 0.04);
      group.position.y = THREE.MathUtils.lerp(group.position.y, -pointer.y * 0.35, 0.04);
      renderer.render(scene, camera);
      animationFrame = inView ? requestAnimationFrame(renderFrame) : 0;
    };
    animationFrame = requestAnimationFrame(renderFrame);

    const visibilityLoop = window.setInterval(() => {
      if (inView && !animationFrame) animationFrame = requestAnimationFrame(renderFrame);
    }, 250);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearInterval(visibilityLoop);
      window.removeEventListener("pointermove", handlePointerMove);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      container.removeChild(renderer.domElement);
      [icosahedron, octahedron, torus].forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }} />;
}
