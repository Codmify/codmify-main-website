"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// A stylised Lagos-inspired world, rather than a claim about a real office address.
export default function AnniversaryCityScene({ progress, paused, onReady }: { progress: MutableRefObject<number>; paused: boolean; onReady?: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const readyRef = useRef(onReady);
  useEffect(() => { readyRef.current = onReady; }, [onReady]);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }); }
    catch { const id = setTimeout(() => setUnavailable(true), 0); return () => clearTimeout(id); }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0xcedee8);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xcedee8, 130, 300);
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 500);
    scene.add(new THREE.HemisphereLight(0xe7f1ff, 0x837859, 2.4));
    const sun = new THREE.DirectionalLight(0xffe0a6, 3.5);
    sun.position.set(-45, 85, 40);
    scene.add(sun);
    const officeLight = new THREE.PointLight(0xffdf9e, 70, 22, 2);
    officeLight.position.set(0, 29, 2);
    scene.add(officeLight);

    const materials = new Map<string, THREE.MeshStandardMaterial>();
    const material = (color: number, metalness = 0, roughness = .65) => {
      const key = `${color}/${metalness}/${roughness}`;
      if (!materials.has(key)) materials.set(key, new THREE.MeshStandardMaterial({ color, metalness, roughness }));
      return materials.get(key)!;
    };
    const box = (parent: THREE.Object3D, w: number, h: number, d: number, x: number, y: number, z: number, color: number, metalness = 0) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material(color, metalness));
      mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };
    const sphere = (parent: THREE.Object3D, radius: number, x: number, y: number, z: number, color: number) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 10), material(color));
      mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };
    const cylinder = (parent: THREE.Object3D, r: number, h: number, x: number, y: number, z: number, color: number) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 8), material(color));
      mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };
    const textures: THREE.Texture[] = [];
    const sign = (text: string, subtitle: string, width: number, height: number, x: number, y: number, z: number, parent: THREE.Object3D = scene) => {
      const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = 384;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#121279"; ctx.fillRect(0, 0, 1024, 384);
      ctx.strokeStyle = "#e8cb89"; ctx.lineWidth = 8; ctx.strokeRect(16, 16, 992, 352);
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "bold 125px sans-serif"; ctx.fillText(text, 512, 180);
      ctx.fillStyle = "#e8cb89"; ctx.font = "36px sans-serif"; ctx.fillText(subtitle, 512, 275);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
      mesh.position.set(x, y, z); parent.add(mesh); return mesh;
    };

    box(scene, 220, .5, 220, 0, -.4, 0, 0xbcc8b3);
    // Coastal lagoon, causeway and an island street grid.
    box(scene, 250, .2, 55, 0, -.1, -110, 0x559cab);
    box(scene, 9, .6, 65, 36, .5, -106, 0xc0c4bf);
    for (let i = 0; i < 8; i++) box(scene, .5, 3, .5, 32, 1.5, -80 - i * 7, 0xf0e5d0);
    for (let i = -5; i <= 5; i++) {
      box(scene, 210, .08, 6, 0, .02, i * 20 + 10, 0x46545a);
      box(scene, 6, .08, 210, i * 20 + 10, .025, 0, 0x46545a);
      for (let j = -10; j <= 10; j++) {
        box(scene, 2, .03, .14, j * 10, .09, i * 20 + 10, 0xefe2b8);
        box(scene, .14, .03, 2, i * 20 + 10, .09, j * 10, 0xefe2b8);
      }
    }
    const buildingColors = [0xd9d0bc, 0xb3bec0, 0xe2bea5, 0x8a9caa, 0xcbd1c9];
    for (let x = -4; x <= 4; x++) for (let z = -4; z <= 4; z++) {
      if (Math.abs(x) <= 1 && Math.abs(z) <= 1) continue;
      const seed = Math.abs(x * 37 + z * 83 + x * z * 19);
      const h = 5 + seed % 23;
      const bx = x * 20, bz = z * 20;
      box(scene, 11, h, 11, bx, h / 2, bz, buildingColors[seed % buildingColors.length]);
      box(scene, 11.6, .4, 11.6, bx, h + .2, bz, 0x68767e);
      for (let floor = 2; floor < h; floor += 3) {
        box(scene, 9, .9, .08, bx, floor, bz + 5.55, 0x647f90);
        box(scene, .08, .9, 9, bx + 5.55, floor, bz, 0x647f90);
      }
      box(scene, 2, 1.2, 2, bx + 2, h + .8, bz, 0x94a0a5);
    }
    const palm = (x: number, z: number) => {
      cylinder(scene, .18, 5, x, 2.5, z, 0x89785e);
      for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(.6, 3.5, 4), material(0x53835b));
        leaf.position.set(x + Math.sin(i * 1.26), 5, z + Math.cos(i * 1.26));
        leaf.rotation.set(.9 * Math.cos(i * 1.26), 0, .9 * Math.sin(i * 1.26)); scene.add(leaf);
      }
    };
    [-18,18].forEach(x => [-18,0,18].forEach(z => palm(x,z)));
    // Lagos yellow buses and moving city traffic.
    const cars: { group: THREE.Group; lane: number; speed: number; offset: number }[] = [];
    for (let i = 0; i < 10; i++) {
      const car = new THREE.Group();
      const bus = i % 3 === 0;
      box(car, bus ? 2.1 : 1.6, 1, bus ? 4 : 2.8, 0, .9, 0, bus ? 0xe8bc36 : [0xeae5da,0x466b81,0x9c574d][i%3]);
      box(car, 1.65, .5, 2.2, 0, 1.55, -.2, 0x314651);
      if(bus) box(car,2.12,.12,4.02,0,.95,0,0x292c30);
      for(const a of [-.9,.9])for(const b of [-1,1])sphere(car,.28,a,.4,b,0x222831);
      scene.add(car); cars.push({group:car,lane:i%2 ? 10 : -30,speed:3+i*.4,offset:i*19});
    }

    // Transparent office tower: structural ribs and individually visible floors.
    box(scene, 17, .4, 15, 0, .2, 0, 0xe7e6dc);
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x86c9df, transparent: true, opacity: .14, metalness: .25, roughness: .15, depthWrite: false, side: THREE.DoubleSide });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(12,48,10),glassMaterial);glass.position.set(0,24,0);scene.add(glass);
    for(let floor=0;floor<=12;floor++)box(scene,12,.15,10,0,floor*4,0,floor===6?0xe8d6b4:0x9caeb8,.25);
    for(const x of [-6,6])for(const z of [-5,5])box(scene,.18,48,.18,x,24,z,0xcbd6db,.7);
    for(let x=-4;x<=4;x+=2)box(scene,.055,48,.055,x,24,5.02,0xc2d2d9,.6);
    sign("codmify", "IDEAS · PEOPLE · POSSIBILITIES", 9, 3.4, 0, 45, 5.14);
    sign("2 YEARS", "BUILDING TOGETHER · OCTOBER 2026", 8, 2.6, 0, 26.8, -4.8);
    // A green-white-green flag in the plaza.
    cylinder(scene,.07,8,-9,4,6,0xb6c3cb);
    for(let i=0;i<3;i++)box(scene,.6,1.2,.03,-8.7+i*.6,7,6,i===1?0xffffff:0x12885c);

    const office = new THREE.Group();office.position.y=24.15;scene.add(office);
    box(office,11.6,.06,9.6,0,0,0,0xf3e4c9);
    box(office,11.7,3.6,.1,0,1.8,-4.9,0x1a2450);
    // Workstations and monitors on both sides of the celebration space.
    for(const x of [-4,4])for(const z of [-2.3,1.5]){
      box(office,2.2,.13,1.1,x,1,z,0xd3b58a);
      for(const dx of [-.8,.8])box(office,.08,1,.08,x+dx,.5,z,0x465263);
      box(office,.8,.55,.08,x,1.4,z-.2,0x263851);
      box(office,.65,.38,.03,x,1.4,z-.14,0x74c3df);
      box(office,.65,.08,.3,x,1.1,z+.2,0x687785);
      cylinder(office,.38,.1,x,.6,z+.8,0x283f62);
      cylinder(office,.05,.6,x,.3,z+.8,0x707d88);
    }
    // Cake table, candles, bunting and celebratory balloons.
    cylinder(office,.8,.12,0,1,-1.5,0xd3b58a);
    cylinder(office,.12,1,0,.5,-1.5,0x626e7d);
    cylinder(office,.46,.25,0,1.18,-1.5,0xf1e4cc);
    cylinder(office,.32,.22,0,1.41,-1.5,0xdeb774);
    for(const x of [-.13,.13]){cylinder(office,.035,.22,x,1.62,-1.5,0x121279);sphere(office,.04,x,1.76,-1.5,0xffb84f);}
    for(let i=0;i<13;i++){
      const mesh=new THREE.Mesh(new THREE.ConeGeometry(.16,.38,3),material([0xe8cb89,0x51c4ff,0xbdb0e4][i%3]));
      mesh.rotation.z=Math.PI;mesh.position.set(-5+i*.82,3.4-Math.sin(i/12*Math.PI)*.45,-3.5);office.add(mesh);
    }
    const balloons: THREE.Mesh[]=[];
    for(let i=0;i<8;i++){
      const x=i<4?-5.1:5.1,z=-3+(i%4)*1.8;
      const balloon=sphere(office,.28,x,2.8,z,[0xe8cb89,0x51c4ff,0xada0de][i%3]);balloon.scale.y=1.25;balloons.push(balloon);
      cylinder(office,.009,1.7,x,1.8,z,0xb3a487);
    }
    type Person = { group: THREE.Group; leftArm: THREE.Group; rightArm: THREE.Group; leftLeg: THREE.Mesh; rightLeg: THREE.Mesh; x: number; z: number; phase: number };
    const people:Person[]=[];
    const outfits=[0x264a78,0xe6b969,0x69a9b0,0xe9e1d3,0xa888b2,0xcc785f];
    for(let i=0;i<10;i++){
      const person=new THREE.Group();
      const phase=i*.83;
      const x=Math.sin(phase)*2.45,z=Math.cos(phase)*2.8;
      person.position.set(x,0,z);person.rotation.y=Math.atan2(-x,-z);office.add(person);
      const skin=[0x5d3627,0x85543b,0x3d281f,0xa16c49][i%4];
      sphere(person,.19,0,1.55,0,skin);
      const hair=sphere(person,.195,0,1.65,-.035,0x242122);hair.scale.y=.65;
      box(person,.45,.63,.26,0,1.05,0,outfits[i%6]);
      const leftLeg=box(person,.16,.58,.18,-.12,.4,0,0x29374b),rightLeg=box(person,.16,.58,.18,.12,.4,0,0x29374b);
      box(person,.18,.1,.28,-.12,.08,.06,0x242831);box(person,.18,.1,.28,.12,.08,.06,0x242831);
      const arms=[-1,1].map(side=>{const arm=new THREE.Group();arm.position.set(side*.29,1.3,0);person.add(arm);box(arm,.13,.42,.15,0,-.18,0,outfits[i%6]);sphere(arm,.085,0,-.43,0,skin);return arm;});
      people.push({group:person,leftArm:arms[0],rightArm:arms[1],leftLeg,rightLeg,x,z,phase});
    }
    // Office confetti stays inside the celebration floor.
    const confetti:THREE.Mesh[]=[];
    for(let i=0;i<55;i++){
      const piece=box(office,.07,.025,.1,Math.sin(i*7)*5,1+(i%20)*.12,Math.cos(i*3)*4,[0xe8cb89,0x51c4ff,0xad91d9][i%3]);
      confetti.push(piece);
    }

    // Batch the static city by material, keeping mobile draw calls low.
    const batches = new Map<THREE.Material, THREE.Mesh[]>();
    scene.children.forEach(object => {
      if (!(object instanceof THREE.Mesh) || object === glass || Array.isArray(object.material)) return;
      const list = batches.get(object.material) ?? [];
      list.push(object);
      batches.set(object.material, list);
    });
    batches.forEach((meshes, mat) => {
      if (meshes.length < 2) return;
      const transformed = meshes.map(mesh => {
        mesh.updateMatrix();
        return mesh.geometry.clone().applyMatrix4(mesh.matrix);
      });
      const merged = mergeGeometries(transformed);
      transformed.forEach(geometry => geometry.dispose());
      if (!merged) return;
      meshes.forEach(mesh => { scene.remove(mesh); mesh.geometry.dispose(); });
      scene.add(new THREE.Mesh(merged, mat));
    });

    const positions=[new THREE.Vector3(78,104,108),new THREE.Vector3(38,65,64),new THREE.Vector3(17,39,34),new THREE.Vector3(5,28.1,13.8)];
    const targets=[new THREE.Vector3(0,8,0),new THREE.Vector3(0,23,0),new THREE.Vector3(0,26,0),new THREE.Vector3(0,25.8,-1.2)];
    const path=new THREE.CatmullRomCurve3(positions),lookPath=new THREE.CatmullRomCurve3(targets);
    let frame=0,last=0,time=0,smooth=0,visible=!document.hidden,reportedReady=false;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize=()=>{const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize);observer.observe(container);resize();
    const render=(now:number)=>{
      const delta=Math.min((now-last)/1000,.05);last=now;
      if(!pausedRef.current&&!reduced.matches)time+=delta;
      smooth=reduced.matches?progress.current:THREE.MathUtils.damp(smooth,progress.current,5,delta);
      camera.position.copy(path.getPoint(smooth));camera.lookAt(lookPath.getPoint(smooth));
      // Widen the lens for portrait screens so the office stays in view.
      camera.fov=camera.aspect<.8?65:48;camera.updateProjectionMatrix();
      glassMaterial.opacity=.14*(1-THREE.MathUtils.smoothstep(smooth,.55,.85));
      cars.forEach(car=>{car.group.position.set(car.lane+1.5,.1,((time*car.speed+car.offset+100)%200)-100);});
      people.forEach(p=>{
        const dance=Math.sin(time*3+p.phase);
        p.group.position.set(p.x+Math.sin(time*.65+p.phase)*.18,Math.max(0,dance)*.07,p.z+Math.cos(time*.65+p.phase)*.15);
        p.group.rotation.y=Math.atan2(-p.x,-p.z)+Math.sin(time+p.phase)*.16;
        p.leftArm.rotation.z=-1.8-dance*.35;p.rightArm.rotation.z=1.8+dance*.35;
        p.leftLeg.rotation.x=dance*.18;p.rightLeg.rotation.x=-dance*.18;
      });
      balloons.forEach((balloon,i)=>{balloon.position.y=2.8+Math.sin(time+i)*.08;});
      confetti.forEach((piece,i)=>{piece.position.y=.2+((i*.2-time*.45)%3+3)%3;piece.rotation.set(time+i,time*.7,i);});
      renderer.render(scene,camera);
      if (!reportedReady) { reportedReady = true; readyRef.current?.(); }
      frame=visible?requestAnimationFrame(render):0;
    };
    const visibility=()=>{visible=!document.hidden;if(visible&&!frame){last=performance.now();frame=requestAnimationFrame(render);}};
    document.addEventListener("visibilitychange",visibility);
    const lost=(event:Event)=>{event.preventDefault();setUnavailable(true);cancelAnimationFrame(frame);};
    renderer.domElement.addEventListener("webglcontextlost",lost);
    frame=requestAnimationFrame(render);
    return()=>{
      cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener("visibilitychange",visibility);renderer.domElement.removeEventListener("webglcontextlost",lost);
      const geometries=new Set<THREE.BufferGeometry>(),allMaterials=new Set<THREE.Material>();
      scene.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>allMaterials.add(m));}});
      geometries.forEach(g=>g.dispose());allMaterials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();
    };
  },[progress]);
  return <div ref={host} className="city-scene-canvas" role="img" aria-label="A stylised Lagos city, a transparent skyscraper, and the Codmify team celebrating on an office floor">{unavailable&&<div className="city-scene-fallback"><strong>Two years of building together.</strong><p>The Codmify team is celebrating. Your browser couldn’t display the 3D city, but you can still explore our anniversary story.</p></div>}</div>;
}
