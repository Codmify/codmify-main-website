"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import {
  buildingPose,
  BUILDING_ROOMS,
  FLOOR_HEIGHT,
} from "@/lib/building-tour";
import { ourProjects } from "@/constants/data";
import { servicesHolder } from "@/utils/services-holder";
import { cityTime } from "@/lib/city-time";

export default function BuildingWorld({
  progress,
  paused,
  celebrating,
  onNavigate,
}: {
  progress: MutableRefObject<number>;
  paused: boolean;
  celebrating: boolean;
  onNavigate: (href: string) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const motion = useRef(paused);
  const navigate = useRef(onNavigate);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    motion.current = paused;
    navigate.current = onNavigate;
  }, [paused, onNavigate]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      const task = setTimeout(() => setUnavailable(true), 0);
      return () => clearTimeout(task);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setClearColor(0xdbe5e9);
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xdbe5e9, 65, 145);
    const camera = new THREE.PerspectiveCamera(58, 1, 0.08, 200);
    const ambient = new THREE.HemisphereLight(0xeef4ff, 0xb59b7d, 2.1);
    scene.add(ambient);
    const sunlight = new THREE.DirectionalLight(0xffefd4, 3.2);
    sunlight.position.set(-15, 35, 20);
    scene.add(sunlight);
    const materials = new Map<number, THREE.MeshStandardMaterial>();
    const mat = (color: number) => {
      if (!materials.has(color))
        materials.set(
          color,
          new THREE.MeshStandardMaterial({ color, roughness: 0.6 }),
        );
      return materials.get(color)!;
    };
    const box = (
      parent: THREE.Object3D,
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      color: number,
      rounded = false,
    ) => {
      const geometry = rounded
        ? new RoundedBoxGeometry(
            w,
            h,
            d,
            2,
            Math.min(0.12, w / 5, h / 5, d / 5),
          )
        : new THREE.BoxGeometry(w, h, d);
      const mesh: THREE.Mesh<THREE.BufferGeometry, THREE.Material> =
        new THREE.Mesh(geometry, mat(color));
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const cylinder = (
      parent: THREE.Object3D,
      r: number,
      h: number,
      x: number,
      y: number,
      z: number,
      color: number,
    ) => {
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, h, 12),
        mat(color),
      );
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const sphere = (
      parent: THREE.Object3D,
      r: number,
      x: number,
      y: number,
      z: number,
      color: number,
    ) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, 14, 10),
        mat(color),
      );
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const clickables: THREE.Object3D[] = [];
    const link = (object: THREE.Object3D, href: string) => {
      object.userData.href = href;
      clickables.push(object);
    };
    const textures: THREE.Texture[] = [],
      images: HTMLImageElement[] = [];
    let disposed = false;
    const panel = (
      parent: THREE.Object3D,
      text: string,
      w: number,
      h: number,
      x: number,
      y: number,
      z: number,
      asset?: string,
    ) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = Math.max(128, Math.round((1024 * h) / w));
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#121279";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#e8cb89";
      ctx.textAlign = "center";
      ctx.font = "bold 68px sans-serif";
      ctx.fillText(text, 512, canvas.height / 2 + 22, 950);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      textures.push(texture);
      if (asset) {
        const image = new window.Image();
        images.push(image);
        image.onload = () => {
          if (disposed) return;
          ctx.fillStyle = "#121279";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const scale = Math.min(
            950 / image.width,
            (canvas.height - 40) / image.height,
          );
          ctx.drawImage(
            image,
            (1024 - image.width * scale) / 2,
            (canvas.height - image.height * scale) / 2,
            image.width * scale,
            image.height * scale,
          );
          texture.needsUpdate = true;
        };
        image.src = asset;
      }
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
      );
      screen.position.set(x, y, z);
      parent.add(screen);
      return screen;
    };
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xc0e5eb,
      transparent: true,
      opacity: 0.12,
      roughness: 0.12,
      metalness: 0.12,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const plant = (parent: THREE.Object3D, x: number, z: number) => {
      cylinder(parent, 0.4, 0.65, x, 0.32, z, 0xd3c7b5);
      cylinder(parent, 0.04, 1.5, x, 1.2, z, 0x7d7258);
      for (let i = 0; i < 5; i++) {
        const leaf = sphere(
          parent,
          0.45,
          x + Math.sin(i * 1.3) * 0.25,
          1.5 + i * 0.11,
          z + Math.cos(i * 1.3) * 0.25,
          0x467b64,
        );
        leaf.scale.set(0.8, 0.55, 1.25);
      }
    };
    const sofa = (parent: THREE.Object3D, x: number, z: number, angle = 0) => {
      const group = new THREE.Group();
      group.position.set(x, 0, z);
      group.rotation.y = angle;
      parent.add(group);
      box(group, 3, 0.48, 1.05, 0, 0.55, 0, 0x65868a, true);
      box(group, 3, 0.85, 0.25, 0, 1.04, -0.5, 0x65868a, true);
      for (const side of [-1, 1]) {
        box(group, 0.28, 0.6, 1.1, side * 1.45, 0.9, 0, 0x65868a, true);
        box(group, 0.08, 0.28, 0.08, side * 1.3, 0.15, 0.3, 0xb59b64);
      }
      box(group, 0.55, 0.48, 0.17, -0.8, 1, -0.3, 0xe6c789, true);
      box(group, 0.55, 0.48, 0.17, 0.8, 1, -0.3, 0xe7e8dd, true);
      return group;
    };
    const desk = (parent: THREE.Object3D, x: number, z: number) => {
      box(parent, 2.4, 0.15, 1.3, x, 1, z, 0xc8a57a, true);
      for (const dx of [-1, 1])
        box(parent, 0.08, 1, 0.08, x + dx, 0.5, z, 0x687c8b);
      box(parent, 0.85, 0.6, 0.08, x, 1.42, z - 0.25, 0x25334c, true);
      panel(parent, "BUILD", 0.72, 0.45, x, 1.42, z - 0.2);
      cylinder(parent, 0.3, 0.12, x, 0.6, z + 0.85, 0x233b66);
      cylinder(parent, 0.045, 0.55, x, 0.3, z + 0.85, 0x657987);
    };
    // Six connected floors, real structural proportions and a glazed facade.
    const floors: THREE.Group[] = [];
    for (let floor = 0; floor < 6; floor++) {
      const group = new THREE.Group();
      group.position.y = floor * FLOOR_HEIGHT;
      group.userData.floor = floor;
      floors.push(group);
      scene.add(group);
      // Slabs leave a continuous opening for the elevator shaft.
      const slab = (height: number, thickness: number, color: number) => {
        box(group, 27.3, thickness, 25, -3.35, height, 0, color);
        box(group, 2.3, thickness, 25, 15.85, height, 0, color);
        box(group, 4.4, thickness, 14, 12.5, height, -5.5, color);
        box(group, 4.4, thickness, 6, 12.5, height, 9.5, color);
      };
      slab(-0.15, 0.25, 0xd7d0c4);
      slab(0.015, 0.06, floor === 0 ? 0xe8e1d5 : 0xcbb69c);
      slab(5.82, 0.16, 0xf2ede5);
      box(group, 34, 5.6, 0.3, 0, 2.8, -12.3, 0xe9e4db);
      for (const side of [-1, 1]) {
        box(group, 0.3, 5.6, 25, side * 17, 2.8, 0, 0xe9e4db);
        for (const z of [-11, 1, 11])
          box(group, 0.38, 5.6, 0.38, side * 15.8, 2.8, z, 0xf3eee4);
      }
      for (let x = -14; x <= 14; x += 4) {
        box(group, 0.055, 5.6, 0.08, x, 2.8, 12.3, 0x8c9ea8);
      }
      const window = new THREE.Mesh(new THREE.PlaneGeometry(33, 5.6), glass);
      window.position.set(0, 2.8, 12.4);
      group.add(window);
      // A calm central wall marks the HTML content's place in each room.
      box(group, 14, 4.4, 0.18, 0, 2.65, -7.5, 0xf6f2e9, true);
      for (const x of [-6.8, 6.8])
        box(group, 0.055, 4, 0.08, x, 2.65, -7.37, 0xbda171);
      for (const x of [-9, 9]) {
        plant(group, x, -7);
      }
      for (const x of [-8, 0, 8]) {
        const light = box(group, 4, 0.035, 0.22, x, 5.69, 1, 0xffffff);
        light.material = new THREE.MeshBasicMaterial({ color: 0xfff3d8 });
      }
      const lamp = new THREE.PointLight(0xffe9c8, 45, 23, 2);
      lamp.position.set(0, 4.7, 0);
      group.add(lamp);
      // Elevator lobby: stone surround, call buttons and floor indicator.
      for (const x of [10, 15])
        box(group, 0.5, 5.6, 0.3, x, 2.8, 6.65, 0x505f6d);
      box(group, 5.5, 0.65, 0.3, 12.5, 5.28, 6.65, 0x505f6d);
      panel(group, floor === 0 ? "G" : String(floor), 1, 0.45, 12.5, 5.3, 6.82);
      const call = box(group, 0.22, 0.42, 0.12, 15.4, 1.6, 6.8, 0xe8cb89, true);
      const roomIndex = BUILDING_ROOMS.findIndex(
        (room) => room.floor === floor,
      );
      link(call, `#${BUILDING_ROOMS[roomIndex].id}`);
      cylinder(group, 0.08, 5.6, 9.9, 2.8, 1.5, 0xbda171);
    }
    // A view through the glazed frontage gives the interior depth and a city context.
    box(scene, 100, 0.5, 100, 0, -0.8, 25, 0xa2b3b2);
    for (let i = 0; i < 10; i++) {
      const height = 8 + (i % 4) * 5;
      box(
        scene,
        8,
        height,
        7,
        -45 + i * 10,
        height / 2,
        42 + (i % 2) * 8,
        [0xc6cfd0, 0x9bb1be, 0xd7b69d][i % 3],
      );
    }
    const lobby = floors[0];
    const reception = new THREE.Group();
    reception.position.set(0, 0, -4);
    lobby.add(reception);
    box(reception, 6.5, 1.5, 1.7, 0, 0.85, 0, 0xd3c7b5, true);
    box(reception, 6.8, 0.12, 1.9, 0, 1.64, 0, 0xd0aa72, true);
    for (let x = -3; x <= 3; x += 0.16)
      box(reception, 0.045, 1.1, 0.06, x, 0.8, 0.9, 0xb79a76);
    panel(reception, "codmify", 3.5, 0.85, 0, 0.9, 0.94, "/brand/logo-1.png");
    const heroSign = panel(
      lobby,
      "codmify",
      6,
      1.6,
      0,
      4.7,
      -7.36,
      "/brand/logo-1.png",
    );
    link(heroSign, "/hire-us");
    sofa(lobby, -7, 3);
    sofa(lobby, 7, 3);
    cylinder(lobby, 1, 0.16, -7, 0.65, 5, 0xc8a57a);
    cylinder(lobby, 0.09, 0.6, -7, 0.3, 5, 0x798e9a);
    box(lobby, 6, 0.02, 5, -7, 0.06, 3, 0xc3cac4);
    for (const x of [-11, 11]) plant(lobby, x, 6);
    // Floor one holds two rooms: a working studio and capabilities displays.
    for (const x of [-8, -4]) for (const z of [-2, 3]) desk(floors[1], x, z);
    for (let i = 0; i < 3; i++) {
      const screen = panel(
        floors[1],
        servicesHolder[i].title,
        3,
        1.5,
        4 + i * 3.2,
        2.3,
        -3,
      );
      link(screen, `/services#${servicesHolder[i].reference}`);
    }
    const divider = new THREE.Mesh(new THREE.PlaneGeometry(6, 4), glass);
    divider.rotation.y = Math.PI / 2;
    divider.position.set(0, 2.2, -1);
    floors[1].add(divider);
    // Gallery rooms show actual work, with clickable framed exhibits.
    ourProjects.slice(0, 3).forEach((project, i) => {
      const x = (i - 1) * 7;
      box(floors[2], 5.7, 3.9, 0.2, x, 2.5, -4, 0x293952, true);
      const exhibit = panel(
        floors[2],
        project.title,
        5.4,
        3.6,
        x,
        2.5,
        -3.87,
        project.image,
      );
      link(exhibit, project.url || "/our-projects");
      box(floors[2], 0.2, 1.4, 0.2, x, 0.7, -4, 0xa5b1b7);
      box(floors[2], 2, 0.15, 1, x, 0.1, -4, 0xa5b1b7);
    });
    for (const [floor, label] of [
      [3, "PLAN YOUR NEXT STEP"],
      [4, "CLEAR ANSWERS"],
      [5, "BUILD WITH CODMIFY"],
    ] as const) {
      panel(floors[floor], label, 9, 1.3, 0, 4.9, -7.35);
    }
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 6;
      box(floors[3], 3, 1.3 + i * 0.6, 2, x, 0.7 + i * 0.3, -3, 0xc4ad88, true);
      const packageLink = panel(
        floors[3],
        ["START", "GROW", "SCALE"][i],
        2.5,
        1,
        x,
        2.5 + i * 0.4,
        -1.9,
      );
      link(packageLink, "/pricing");
    }
    for (const x of [-10, 10]) {
      box(floors[4], 3, 4.5, 0.7, x, 2.25, -3, 0xa58b6d);
      for (let shelf = 0; shelf < 5; shelf++)
        for (let book = 0; book < 7; book++)
          box(
            floors[4],
            0.25,
            0.65,
            0.5,
            x - 1.1 + book * 0.35,
            0.5 + shelf * 0.8,
            -2.5,
            [0x5e8795, 0xb8a077, 0x878ca8][book % 3],
          );
    }
    sofa(floors[4], -5, 3);
    sofa(floors[4], 5, 3);
    box(floors[5], 7, 0.16, 2.7, 0, 1, -2, 0xc8a57a, true);
    for (const x of [-3, 0, 3])
      for (const z of [-4, 0]) {
        cylinder(floors[5], 0.4, 0.15, x, 0.6, z, 0x65868a);
        cylinder(floors[5], 0.07, 0.6, x, 0.3, z, 0x748896);
      }
    const contactBoard = panel(floors[5], "LET’S TALK", 4, 1.3, 0, 2.7, -5);
    link(contactBoard, "#contact-us");
    // An actual lift cab travels with the scroll-defined camera.
    const lift = new THREE.Group();
    lift.userData.lift = true;
    scene.add(lift);
    box(lift, 4.4, 0.15, 5, 12.5, 0.03, 4, 0x707f87);
    box(lift, 4.4, 0.15, 5, 12.5, 5.3, 4, 0xabb5b9);
    box(lift, 4.4, 5.3, 0.15, 12.5, 2.65, 1.55, 0x38495d);
    for (const x of [10.3, 14.7]) {
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(5, 5.3), glass);
      wall.rotation.y = Math.PI / 2;
      wall.position.set(x, 2.65, 4);
      lift.add(wall);
    }
    const doors = [-1, 1].map((side) =>
      box(lift, 2.1, 4.8, 0.08, 12.5 + side * 1.05, 2.4, 6.45, 0x94a4ac),
    );
    panel(lift, "CODMIFY / EXPLORE THE FLOORS", 3.5, 0.6, 12.5, 4.25, 1.66);
    const liftButtons = new THREE.Group();
    lift.add(liftButtons);
    BUILDING_ROOMS.filter(
      (room, i, list) =>
        i === list.findIndex((item) => item.floor === room.floor),
    ).forEach((room) => {
      const button = box(
        liftButtons,
        0.3,
        0.3,
        0.06,
        14.1,
        1.5 + room.floor * 0.4,
        1.66,
        0xe8cb89,
        true,
      );
      link(button, `#${room.id}`);
    });

    // Staff and visitors: one receptionist, seated guests, and walking colleagues.
    const people: {
      group: THREE.Group;
      arms: THREE.Mesh[];
      legs: THREE.Mesh[];
      floor: number;
      x: number;
      z: number;
      phase: number;
      walk: boolean;
      seated: boolean;
    }[] = [];
    for (let i = 0; i < 18; i++) {
      const floor = i < 6 ? 0 : 1 + ((i - 6) % 5),
        walk = i > 0 && i % 3 === 0;
      const seated = i < 6 && i !== 0 && !walk;
      const group = new THREE.Group();
      floors[floor].add(group);
      const x =
          i === 0
            ? 0
            : seated
              ? (i % 2 ? -7 : 7) + (i < 3 ? -0.5 : 0.5)
              : (i % 2 ? -1 : 1) * (5 + (i % 3) * 2),
        z = i === 0 ? -5 : i < 6 ? 3 : 2;
      const skin = [0x69422e, 0x875c40, 0xa17450][i % 3];
      const head = sphere(group, 0.18, 0, 1.65, 0, skin);
      head.scale.y = 1.12;
      sphere(group, 0.19, 0, 1.76, -0.025, 0x26231f).scale.y = 0.5;
      for (const side of [-1, 1])
        sphere(group, 0.018, side * 0.065, 1.67, 0.165, 0x151a20);
      box(
        group,
        0.44,
        0.65,
        0.27,
        0,
        1.18,
        0,
        [0x3e6489, 0xc9b28f, 0x7b9b8d, 0xb9a4b6][i % 4],
        true,
      );
      const arms = [-1, 1].map((side) => {
        const arm = box(
          group,
          0.13,
          0.58,
          0.15,
          side * 0.29,
          1.15,
          0,
          skin,
          true,
        );
        return arm;
      });
      const legs = [-1, 1].map((side) =>
        box(group, 0.16, 0.65, 0.2, side * 0.12, 0.48, 0, 0x354658, true),
      );
      for (const side of [-1, 1])
        box(group, 0.18, 0.1, 0.3, side * 0.12, 0.1, 0.06, 0x28313b, true);
      people.push({
        group,
        arms,
        legs,
        floor,
        x,
        z,
        phase: i * 0.8,
        walk,
        seated,
      });
    }
    if (celebrating) {
      panel(lobby, "CELEBRATING 2 YEARS", 4, 1.3, -8, 3.5, -6);
      for (let i = 0; i < 6; i++) {
        const balloon = sphere(
          lobby,
          0.25,
          -10 + i * 0.3,
          2.7 + (i % 2) * 0.3,
          -5,
          i % 2 ? 0xe8cb89 : 0x51c4ff,
        );
        balloon.scale.y = 1.25;
      }
    }
    // Batch permanent surfaces; retain clickable objects and moving characters.
    for (const parent of [scene, ...floors]) {
      const batches = new Map<THREE.Material, THREE.Mesh[]>();
      parent.children.forEach((object) => {
        if (
          !(object instanceof THREE.Mesh) ||
          Array.isArray(object.material) ||
          object.userData.href
        )
          return;
        const list = batches.get(object.material) || [];
        list.push(object);
        batches.set(object.material, list);
      });
      batches.forEach((meshes, material) => {
        if (meshes.length < 2 || material === glass) return;
        const clones = meshes.map((mesh) => {
          mesh.updateMatrix();
          const geometry = mesh.geometry.index
            ? mesh.geometry.toNonIndexed()
            : mesh.geometry.clone();
          return geometry.applyMatrix4(mesh.matrix);
        });
        const merged = mergeGeometries(clones);
        clones.forEach((geometry) => geometry.dispose());
        if (!merged) return;
        meshes.forEach((mesh) => {
          parent.remove(mesh);
          mesh.geometry.dispose();
        });
        parent.add(new THREE.Mesh(merged, material));
      });
    }
    // Device-local lighting is independent of the Lagos anniversary calendar.
    const updateSky = () => {
      const { phase } = cityTime();
      const palettes: Record<
        string,
        { sky: number; sun: number; strength: number }
      > = {
        Morning: { sky: 0xd5e3e8, sun: 0xffdfb1, strength: 2.6 },
        Afternoon: { sky: 0xc5ddea, sun: 0xfff2dc, strength: 3.2 },
        Evening: { sky: 0xa494ac, sun: 0xffbf91, strength: 1.8 },
        Night: { sky: 0x172943, sun: 0xb1c6ee, strength: 0.65 },
      };
      const palette = palettes[phase];
      renderer.setClearColor(palette.sky);
      (scene.fog as THREE.Fog).color.setHex(palette.sky);
      sunlight.color.setHex(palette.sun);
      sunlight.intensity = palette.strength;
      ambient.intensity = phase === "Night" ? 1 : 1.8;
    };
    updateSky();
    const skyTimer = setInterval(updateSky, 30_000);
    const solidSurfaces: THREE.Object3D[] = [];
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      const surface = Array.isArray(object.material)
        ? object.material[0]
        : object.material;
      if (!surface.transparent || surface.opacity >= 0.4)
        solidSurfaces.push(object);
    });
    const raycaster = new THREE.Raycaster(),
      pointer = new THREE.Vector2();
    let currentFloor = 0;
    const visibleExhibit = (object: THREE.Object3D) => {
      for (
        let parent: THREE.Object3D | null = object;
        parent;
        parent = parent.parent
      ) {
        if (parent.userData.lift) return true;
        if (typeof parent.userData.floor === "number")
          return parent.userData.floor === currentFloor;
      }
      return false;
    };
    let down: { x: number; y: number } | null = null;
    const getHit = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      raycaster.far = Infinity;
      const hit = raycaster.intersectObjects(
        clickables.filter(visibleExhibit),
        false,
      )[0];
      if (!hit) return;
      // A display behind a wall or furniture must not receive the click.
      raycaster.far = hit.distance + 0.001;
      const visible = raycaster.intersectObjects(solidSurfaces, false)[0];
      return visible?.object === hit.object ? hit.object : undefined;
    };
    const pointerDown = (event: PointerEvent) => {
      down =
        event.isPrimary && event.button === 0
          ? { x: event.clientX, y: event.clientY }
          : null;
    };
    const pointerUp = (event: PointerEvent) => {
      if (
        down &&
        Math.hypot(event.clientX - down.x, event.clientY - down.y) < 8
      ) {
        const hit = getHit(event);
        if (hit) navigate.current(hit.userData.href);
      }
      down = null;
    };
    const pointerCancel = () => {
      down = null;
    };
    const pointerMove = (event: PointerEvent) => {
      renderer.domElement.style.cursor = getHit(event) ? "pointer" : "default";
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointercancel", pointerCancel);
    renderer.domElement.addEventListener("pointermove", pointerMove);
    const resize = () => {
      const w = container.clientWidth,
        h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.fov = camera.aspect < 0.8 ? 78 : 58;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    let frame = 0,
      last = performance.now(),
      time = 0,
      smooth = progress.current,
      inView = true,
      visible = !document.hidden;
    const render = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!motion.current) time += delta;
      smooth = THREE.MathUtils.damp(smooth, progress.current, 7, delta);
      const pose = buildingPose(smooth);
      currentFloor = Math.round(pose.liftY / FLOOR_HEIGHT);
      camera.position.set(...(pose.camera as [number, number, number]));
      camera.lookAt(
        new THREE.Vector3(...(pose.target as [number, number, number])),
      );
      lift.position.y = pose.liftY;
      doors.forEach((door, i) => {
        door.position.x =
          12.5 + (i === 0 ? -1 : 1) * (1.05 + pose.doorOpen * 1.8);
      });
      people.forEach((person) => {
        const step = Math.sin(time * 4 + person.phase);
        person.group.position.set(
          person.x +
            (person.walk ? Math.sin(time * 0.25 + person.phase) * 2.2 : 0),
          person.seated ? -0.15 : person.walk ? Math.abs(step) * 0.03 : 0,
          person.z +
            (person.walk ? Math.cos(time * 0.25 + person.phase) * 1.3 : 0),
        );
        person.group.rotation.y = person.walk
          ? Math.cos(time * 0.25 + person.phase) * 0.5
          : 0;
        person.arms.forEach((arm, i) => {
          arm.rotation.x = person.walk ? step * 0.35 * (i ? 1 : -1) : 0.05;
        });
        person.legs.forEach((leg, i) => {
          leg.rotation.x = person.seated
            ? -1.15
            : person.walk
              ? step * 0.3 * (i ? -1 : 1)
              : 0;
        });
      });
      renderer.render(scene, camera);
      frame = visible ? requestAnimationFrame(render) : 0;
    };
    const visibility = () => {
      visible = !document.hidden && inView;
      if (visible && !frame) {
        last = performance.now();
        frame = requestAnimationFrame(render);
      }
    };
    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      visibility();
    });
    intersection.observe(container);
    document.addEventListener("visibilitychange", visibility);
    const lost = (event: Event) => {
      event.preventDefault();
      setUnavailable(true);
      cancelAnimationFrame(frame);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    frame = requestAnimationFrame(render);
    return () => {
      disposed = true;
      clearInterval(skyTimer);
      images.forEach((image) => {
        image.onload = null;
      });
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("pointercancel", pointerCancel);
      renderer.domElement.removeEventListener("pointermove", pointerMove);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>(),
        allMaterials = new Set<THREE.Material>();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((item) => allMaterials.add(item));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      allMaterials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress, celebrating]);
  return (
    <div
      ref={host}
      className="building-world-canvas"
      role="img"
      aria-label="Inside the Codmify building: reception, studio rooms, project gallery, planning floor, library and meeting floor"
    >
      {unavailable && (
        <div className="building-world-fallback">
          Explore Codmify’s rooms and content below. The 3D building is
          unavailable on this device.
        </div>
      )}
    </div>
  );
}
