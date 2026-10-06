"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { cityTime } from "@/lib/city-time";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

// A stylised Lagos-inspired world, rather than a claim about a real office address.
export default function AnniversaryCityScene({ progress, paused, onReady, landing = false, celebrating = true }: { progress: MutableRefObject<number>; paused: boolean; onReady?: () => void; landing?: boolean; celebrating?: boolean }) {
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
    const ambient = new THREE.HemisphereLight(0xe7f1ff, 0x837859, 2.4);
    scene.add(ambient);
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
    let disposed = false;
    const logoImages: HTMLImageElement[] = [];
    const textures: THREE.Texture[] = [];
    const sign = (text: string, subtitle: string, width: number, height: number, x: number, y: number, z: number, parent: THREE.Object3D = scene) => {
      const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = 384;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#121279"; ctx.fillRect(0, 0, 1024, 384);
      ctx.strokeStyle = "#e8cb89"; ctx.lineWidth = 8; ctx.strokeRect(16, 16, 992, 352);
      ctx.fillStyle = "#fff"; ctx.textAlign = "center"; ctx.font = "bold 125px sans-serif"; ctx.fillText(text, 512, 180);
      ctx.fillStyle = "#e8cb89"; ctx.font = "36px sans-serif"; ctx.fillText(subtitle, 512, 275);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      if (text === "codmify") {
        const image = new window.Image();
        logoImages.push(image);
        image.onload = () => {
          if (disposed) return;
          ctx.fillStyle = "#121279"; ctx.fillRect(24, 24, 976, 190);
          const logoWidth = 760, logoHeight = logoWidth * image.height / image.width;
          ctx.drawImage(image, (1024 - logoWidth) / 2, 110 - logoHeight / 2, logoWidth, logoHeight);
          texture.needsUpdate = true;
        };
        image.src = "/brand/logo-1.png";
      }
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
    const buildingColors = [0xdeb18b, 0x8db9ad, 0xd18b79, 0x98abc9, 0xe8ca7c, 0xb2a4c9, 0xe1d8c0, 0x77a1ac, 0xc89dba, 0x9aaf77, 0xcfb69c, 0x82a1ba];
    const windowMaterial = material(0x647f90);
    windowMaterial.emissive.setHex(0xffc976);
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

    // Instanced walkers animate on pavements, safely away from traffic lanes.
    const pedestrianCount = window.innerWidth < 700 ? 24 : 40;
    const walkers = {
      bodies: new THREE.InstancedMesh(new THREE.BoxGeometry(.38,.55,.23),material(0xffffff),pedestrianCount),
      heads: new THREE.InstancedMesh(new THREE.SphereGeometry(.16,8,6),material(0xffffff),pedestrianCount),
      legs: new THREE.InstancedMesh(new THREE.BoxGeometry(.12,.5,.14),material(0x26354a),pedestrianCount*2),
      arms: new THREE.InstancedMesh(new THREE.BoxGeometry(.1,.42,.13),material(0xffffff),pedestrianCount*2),
    };
    const streetOutfits=[0x547ea8,0xeac17e,0xb5776c,0x69a28c,0xbda3ce,0xf0e6d4];
    Object.values(walkers).forEach(mesh=>{mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);scene.add(mesh);});
    for(let i=0;i<pedestrianCount;i++){
      walkers.bodies.setColorAt(i,new THREE.Color(streetOutfits[i%6]));
      walkers.heads.setColorAt(i,new THREE.Color([0x5d3627,0x85543b,0xa16c49][i%3]));
      for(let j=0;j<2;j++)walkers.arms.setColorAt(i*2+j,new THREE.Color(streetOutfits[i%6]));
    }
    const walkerTransform=new THREE.Object3D();
    const flock: {group: THREE.Group; left: THREE.Mesh; right: THREE.Mesh; phase: number}[]=[];
    for(let i=0;i<12;i++){
      const bird=new THREE.Group();
      box(bird,.12,.1,.4,0,0,0,0x394b5c);
      const wings=[-1,1].map(side=>{
        const wing=box(bird,.75,.035,.25,side*.36,0,0,0x394b5c);
        return wing;
      });
      scene.add(bird);flock.push({group:bird,left:wings[0],right:wings[1],phase:i*.7});
    }
    // Gentle particle bursts around the tower, without full-screen flashes.
    const fireworkCount=window.innerWidth<700?3:4;
    const fireworks=Array.from({length:fireworkCount},(_,i)=>{
      const count=48,positions=new Float32Array(count*3);
      const geometry=new THREE.BufferGeometry();geometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
      const mat=new THREE.PointsMaterial({color:[0xe8cb89,0x79d5f2,0xd5a7de,0xa5e6c1][i],size:.3,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
      const particles=new THREE.Points(geometry,mat);
      particles.visible = !landing || celebrating;
      particles.position.set(i%2?17:-17,36+i*5,i<2?8:-14);
      particles.frustumCulled=false;scene.add(particles);
      return {particles,positions,mat,index:i};
    });
    const skyObjects=new THREE.Group();scene.add(skyObjects);
    const moon=new THREE.Mesh(new THREE.SphereGeometry(3.5,16,12),new THREE.MeshBasicMaterial({color:0xffefd2}));
    moon.position.set(-65,90,-95);skyObjects.add(moon);
    const starPositions=new Float32Array(180*3);
    for(let i=0;i<180;i++){starPositions[i*3]=Math.sin(i*39)*170;starPositions[i*3+1]=85+(i%17)*5;starPositions[i*3+2]=-100-Math.abs(Math.cos(i*13))*70;}
    const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute("position",new THREE.BufferAttribute(starPositions,3));
    const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xe8efff,size:.35,transparent:true,opacity:.7,depthWrite:false}));skyObjects.add(stars);
    const skyPresets=[
      {hour:0,color:0x101b3e,light:0xa4b8e5,intensity:.5,ambient:.7,exposure:1.05},
      {hour:6,color:0xe8baa0,light:0xffcf99,intensity:2.2,ambient:1.9,exposure:1.2},
      {hour:12,color:0xb9dcee,light:0xffefd4,intensity:3.5,ambient:2.4,exposure:1.25},
      {hour:17,color:0xe7ac91,light:0xffbb84,intensity:2,ambient:1.6,exposure:1.15},
      {hour:20,color:0x101b3e,light:0xa4b8e5,intensity:.5,ambient:.7,exposure:1.05},
      {hour:24,color:0x101b3e,light:0xa4b8e5,intensity:.5,ambient:.7,exposure:1.05},
    ];
    const updateSky=()=>{
      const {hour,night}=cityTime();
      const index=skyPresets.findIndex((preset,i)=>i<skyPresets.length-1&&hour>=preset.hour&&hour<skyPresets[i+1].hour);
      const a=skyPresets[Math.max(0,index)],b=skyPresets[Math.max(0,index)+1];
      const blend=THREE.MathUtils.smoothstep(hour,a.hour,b.hour);
      const sky=new THREE.Color(a.color).lerp(new THREE.Color(b.color),blend);
      renderer.setClearColor(sky);(scene.fog as THREE.Fog).color.copy(sky);
      sun.color.copy(new THREE.Color(a.light).lerp(new THREE.Color(b.light),blend));
      sun.intensity=THREE.MathUtils.lerp(a.intensity,b.intensity,blend);
      ambient.intensity=THREE.MathUtils.lerp(a.ambient,b.ambient,blend);
      renderer.toneMappingExposure=THREE.MathUtils.lerp(a.exposure,b.exposure,blend);
      sun.position.set(Math.cos(hour/24*Math.PI*2)*65,night?40:65,40);
      windowMaterial.emissiveIntensity=night?.75:hour>=17?.35:0;
      moon.visible=night;stars.visible=night;
    };
    updateSky();
    const skyTimer=setInterval(updateSky,30_000);

    // Transparent office tower: structural ribs and individually visible floors.
    box(scene, 17, .4, 15, 0, .2, 0, 0xe7e6dc);
    const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x86c9df, transparent: true, opacity: .14, metalness: .25, roughness: .15, depthWrite: false, side: THREE.DoubleSide });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(12,48,10),glassMaterial);glass.position.set(0,24,0);scene.add(glass);
    for(let floor=0;floor<=12;floor++)box(scene,12,.15,10,0,floor*4,0,floor===6?0xe8d6b4:0x9caeb8,.25);
    for(const x of [-6,6])for(const z of [-5,5])box(scene,.18,48,.18,x,24,z,0xcbd6db,.7);
    for(let x=-4;x<=4;x+=2)box(scene,.055,48,.055,x,24,5.02,0xc2d2d9,.6);
    sign("codmify", "IDEAS · PEOPLE · POSSIBILITIES", 9, 3.4, 0, 45, 5.14);
    sign(celebrating ? "2 YEARS" : "codmify", celebrating ? "BUILDING TOGETHER · OCTOBER 2026" : "IDEAS BECOME REAL PRODUCTS", 8, 2.6, 0, 26.8, -4.8);
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
    const partyDecor = new THREE.Group();office.add(partyDecor);
    partyDecor.visible = !landing || celebrating;
    // Cake table, candles, bunting and celebratory balloons.
    cylinder(partyDecor,.8,.12,0,1,-1.5,0xd3b58a);
    cylinder(partyDecor,.12,1,0,.5,-1.5,0x626e7d);
    cylinder(partyDecor,.46,.25,0,1.18,-1.5,0xf1e4cc);
    cylinder(partyDecor,.32,.22,0,1.41,-1.5,0xdeb774);
    for(const x of [-.13,.13]){cylinder(partyDecor,.035,.22,x,1.62,-1.5,0x121279);sphere(partyDecor,.04,x,1.76,-1.5,0xffb84f);}
    for(let i=0;i<13;i++){
      const mesh=new THREE.Mesh(new THREE.ConeGeometry(.16,.38,3),material([0xe8cb89,0x51c4ff,0xbdb0e4][i%3]));
      mesh.rotation.z=Math.PI;mesh.position.set(-5+i*.82,3.4-Math.sin(i/12*Math.PI)*.45,-3.5);partyDecor.add(mesh);
    }
    const balloons: THREE.Mesh[]=[];
    for(let i=0;i<8;i++){
      const x=i<4?-5.1:5.1,z=-3+(i%4)*1.8;
      const balloon=sphere(partyDecor,.28,x,2.8,z,[0xe8cb89,0x51c4ff,0xada0de][i%3]);balloon.scale.y=1.25;balloons.push(balloon);
      cylinder(partyDecor,.009,1.7,x,1.8,z,0xb3a487);
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

    if (landing && !celebrating) {
      balloons.forEach(balloon => { balloon.visible = false; });
      confetti.forEach(piece => { piece.visible = false; });
    }
    // Batch the static city by material, keeping mobile draw calls low.
    const batches = new Map<THREE.Material, THREE.Mesh[]>();
    scene.children.forEach(object => {
      if (!(object instanceof THREE.Mesh) || object instanceof THREE.InstancedMesh || object === glass || Array.isArray(object.material)) return;
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

    // A second world: luminous portals, orbiting planets and a branded milestone.
    const universe = new THREE.Scene();
    universe.background = new THREE.Color(0x090e27);
    universe.fog = new THREE.Fog(0x090e27, 100, 240);
    universe.add(new THREE.HemisphereLight(0x829ee8,0x191630,2));
    const cosmicLight = new THREE.PointLight(0x68c9ff,180,140,1.5);
    cosmicLight.position.set(0,10,-40);universe.add(cosmicLight);
    const portals:THREE.Mesh[]=[];
    for(let i=0;i<9;i++){
      const ring=new THREE.Mesh(new THREE.TorusGeometry(16+i*.8,.09,8,80),new THREE.MeshBasicMaterial({color:i%2?0xe8cb89:0x75b9ef,transparent:true,opacity:.55}));
      ring.position.set(Math.sin(i)*3,Math.cos(i)*2,20-i*18);universe.add(ring);portals.push(ring);
    }
    // Separate orbital elements resolve into one typographic anniversary monument.
    const statement = (text:string, width:number, height:number, color:string, logo=false) => {
      const canvas=document.createElement("canvas");canvas.width=1536;canvas.height=256;
      const ctx=canvas.getContext("2d")!;
      ctx.fillStyle=color;ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.font=`${text.length>25?44:text.length>12?62:120}px sans-serif`;
      ctx.fillText(text,768,128);
      const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
      if(logo){
        const image=new window.Image();logoImages.push(image);
        image.onload=()=>{
          if(disposed)return;
          ctx.clearRect(0,0,1536,256);
          const width=1000,height=width*image.height/image.width;
          ctx.drawImage(image,(1536-width)/2,(256-height)/2,width,height);texture.needsUpdate=true;
        };
        image.src="/brand/logo-1.png";
      }
      return new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:THREE.DoubleSide}));
    };
    const twoShape=new THREE.Shape();
    twoShape.moveTo(-3,2);
    twoShape.bezierCurveTo(-3,5.7,3.2,5.7,3.2,2.5);
    twoShape.bezierCurveTo(3.2,.6,1.5,-.3,.2,-1.3);
    twoShape.lineTo(-1.2,-2.7);twoShape.lineTo(3.1,-2.7);twoShape.lineTo(3.1,-4.1);
    twoShape.lineTo(-3.1,-4.1);twoShape.lineTo(-3.1,-2.8);
    twoShape.lineTo(-.7,-.5);twoShape.bezierCurveTo(.8,.8,1.7,1.5,1.7,2.5);
    twoShape.bezierCurveTo(1.7,4.2,-1.5,4.2,-1.5,2);twoShape.closePath();
    const sculptedTwo=new THREE.Mesh(new THREE.ExtrudeGeometry(twoShape,{depth:.65,bevelEnabled:true,bevelThickness:.14,bevelSize:.12,bevelSegments:4,steps:1,curveSegments:24}),new THREE.MeshStandardMaterial({color:0xe8cb89,metalness:.7,roughness:.25,emissive:0x665024,emissiveIntensity:.25}));
    const assembly=[
      {mesh:sculptedTwo,target:new THREE.Vector3(0,.1,-72),radius:27,phase:.4,start:.08,end:.7},
      {mesh:statement("codmify",14,2.5,"#ffffff",true),target:new THREE.Vector3(0,9.5,-72),radius:33,phase:2.4,start:.12,end:.77},
      {mesh:statement("CELEBRATING",13,1.5,"#e8cb89"),target:new THREE.Vector3(0,6.6,-72),radius:24,phase:4.2,start:.2,end:.82},
      {mesh:statement("Y E A R S",10,1.8,"#ffffff"),target:new THREE.Vector3(0,-5.7,-72),radius:31,phase:3.2,start:.16,end:.78},
      {mesh:statement("TOGETHER, WE BUILD WHAT’S NEXT.",24,1.4,"#e8cb89"),target:new THREE.Vector3(0,-8.2,-72),radius:37,phase:5.3,start:.28,end:.86},
      {mesh:statement("Made possible by our people, clients and partners.",24,1.2,"#b8c9e7"),target:new THREE.Vector3(0,-10.1,-72),radius:30,phase:1.7,start:.34,end:.9},
    ];
    const assemblyOrbits:THREE.Mesh[]=[];
    assembly.forEach((element,i)=>{
      universe.add(element.mesh);
      const orbit=new THREE.Mesh(new THREE.TorusGeometry(element.radius,.025,6,100),new THREE.MeshBasicMaterial({color:i%2?0xe8cb89:0x75b9ef,transparent:true,opacity:.18}));
      orbit.position.set(0,0,-72);orbit.rotation.set(i*.35,i*.22,i*.65);universe.add(orbit);assemblyOrbits.push(orbit);
    });
    const goldLight=new THREE.DirectionalLight(0xffe3ab,3);goldLight.position.set(-10,15,-25);universe.add(goldLight);

    const worlds:THREE.Group[]=[];
    for(let i=0;i<6;i++){
      const world=new THREE.Group();
      sphere(world,2+i%3,0,0,0,[0x5985b4,0xad83ac,0xc4a466][i%3]);
      const orbit=new THREE.Mesh(new THREE.TorusGeometry(4+i%3,.04,6,48),new THREE.MeshBasicMaterial({color:0xe8cb89,transparent:true,opacity:.45}));
      orbit.rotation.x=1;world.add(orbit);
      world.position.set((i%2?1:-1)*(17+i*2),Math.sin(i*3)*12,-20-i*20);
      universe.add(world);worlds.push(world);
    }
    const galaxyPositions=new Float32Array(600*3);
    for(let i=0;i<600;i++){galaxyPositions[i*3]=Math.sin(i*23)*95;galaxyPositions[i*3+1]=Math.cos(i*17)*65;galaxyPositions[i*3+2]=30-(i%180);}
    const galaxyGeometry=new THREE.BufferGeometry();galaxyGeometry.setAttribute("position",new THREE.BufferAttribute(galaxyPositions,3));
    universe.add(new THREE.Points(galaxyGeometry,new THREE.PointsMaterial({color:0xb8c9ff,size:.16,transparent:true,opacity:.85})));
    const cosmicCamera=new THREE.PerspectiveCamera(52,1,.1,350);

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
      camera.position.copy(path.getPoint(landing ? smooth : Math.min(1,smooth/.57)));camera.lookAt(lookPath.getPoint(landing ? smooth : Math.min(1,smooth/.57)));
      // A brief dark portal passage joins the two worlds without a hard visible cut.
      if (landing) {
        const aim=lookPath.getPoint(smooth);aim.x+=smooth*3.5;camera.lookAt(aim);
      }
      const passage=landing ? 0 : Math.max(0,1-Math.abs(smooth-.6)/.065);
      container.style.setProperty("--portal-darkness", String(passage));
      // Widen the lens for portrait screens so the office stays in view.
      camera.fov=camera.aspect<.8?65:48;camera.updateProjectionMatrix();
      glassMaterial.opacity=.14*(1-THREE.MathUtils.smoothstep(smooth,.55,.85));
      cars.forEach(car=>{car.group.position.set(car.lane+1.5,.1,((time*car.speed+car.offset+100)%200)-100);});
      for(let i=0;i<pedestrianCount;i++){
        const direction=i%2?1:-1,x=[14,-26,34,-46][i%4];
        const z=direction*(((time*(.8+i%3*.15)+i*13)%160)-80);
        const stride=Math.sin(time*5+i),bounce=Math.abs(stride)*.035;
        const place=(mesh:THREE.InstancedMesh,index:number,dx:number,y:number,rotation:number)=>{
          walkerTransform.position.set(x+dx,y+bounce,z);walkerTransform.rotation.set(rotation,direction<0?Math.PI:0,0);walkerTransform.updateMatrix();mesh.setMatrixAt(index,walkerTransform.matrix);
        };
        place(walkers.bodies,i,0,.95,0);place(walkers.heads,i,0,1.4,0);
        for(let side=0;side<2;side++){
          const sign=side?1:-1;
          place(walkers.legs,i*2+side,sign*.11,.43,stride*.45*sign);
          place(walkers.arms,i*2+side,sign*.26,.96,-stride*.4*sign);
        }
      }
      Object.values(walkers).forEach(mesh=>{mesh.instanceMatrix.needsUpdate=true;});
      flock.forEach((bird,i)=>{
        const angle=time*.1+bird.phase;
        bird.group.position.set(Math.cos(angle)*(28+i*1.5),46+i%4*5+Math.sin(time+bird.phase),Math.sin(angle)*(28+i*1.5));
        bird.group.rotation.y=-angle;bird.left.rotation.z=Math.sin(time*5+bird.phase)*.55;bird.right.rotation.z=-bird.left.rotation.z;
      });
      fireworks.forEach(firework=>{
        const age=(time+firework.index*1.6)%7;
        const expansion=Math.max(0,age-.8);
        firework.mat.opacity=age<.8?0:Math.max(0,Math.min(1,expansion/.25))*Math.max(0,1-expansion/3.8);
        for(let i=0;i<48;i++){
          const y=1-2*(i+.5)/48,r=Math.sqrt(1-y*y),angle=i*2.39996;
          firework.positions[i*3]=Math.cos(angle)*r*expansion*3;
          firework.positions[i*3+1]=y*expansion*3-expansion*expansion*.45;
          firework.positions[i*3+2]=Math.sin(angle)*r*expansion*3;
        }
        firework.particles.geometry.attributes.position.needsUpdate=true;
      });
      people.forEach(p=>{
        const dance=Math.sin(time*3+p.phase);
        p.group.position.set(p.x+Math.sin(time*.65+p.phase)*.18,Math.max(0,dance)*.07,p.z+Math.cos(time*.65+p.phase)*.15);
        p.group.rotation.y=Math.atan2(-p.x,-p.z)+Math.sin(time+p.phase)*.16;
        p.leftArm.rotation.z=celebrating ? -1.8-dance*.35 : -.2;p.rightArm.rotation.z=celebrating ? 1.8+dance*.35 : .2;
        p.leftLeg.rotation.x=dance*.18;p.rightLeg.rotation.x=-dance*.18;
      });
      balloons.forEach((balloon,i)=>{balloon.position.y=2.8+Math.sin(time+i)*.08;});
      confetti.forEach((piece,i)=>{piece.position.y=.2+((i*.2-time*.45)%3+3)%3;piece.rotation.set(time+i,time*.7,i);});
      if(landing || smooth<.6) renderer.render(scene,camera);
      else {
        const travel=Math.max(0,Math.min(1,(smooth-.6)/.4));
        cosmicCamera.aspect=camera.aspect;cosmicCamera.fov=camera.aspect<.8?70:52;cosmicCamera.updateProjectionMatrix();
        cosmicCamera.position.set(Math.sin(travel*Math.PI)*2,Math.sin(travel*Math.PI)*3,48-travel*87);
        cosmicCamera.lookAt(0,0,-72);
        const layoutScale=Math.min(1,camera.aspect/.62);
        assembly.forEach((element,i)=>{
          const converge=THREE.MathUtils.smoothstep(travel,element.start,element.end);
          const angle=element.phase+travel*Math.PI*1.7;
          const orbitPosition=new THREE.Vector3(Math.cos(angle)*element.radius,Math.sin(angle)*element.radius*.65,-72+Math.sin(angle+i)*14);
          const destination=element.target.clone();destination.x*=layoutScale;destination.y*=layoutScale;
          element.mesh.position.copy(orbitPosition.lerp(destination,converge));
          element.mesh.rotation.set((1-converge)*Math.sin(angle)*.5,(1-converge)*Math.cos(angle)*.7,(1-converge)*Math.sin(angle+i)*.25);
          element.mesh.scale.setScalar((.6+.4*converge)*layoutScale);
          assemblyOrbits[i].rotation.z=element.phase+travel*1.4;
          (assemblyOrbits[i].material as THREE.MeshBasicMaterial).opacity=.18*(1-converge)+.035;
        });
        portals.forEach((ring,i)=>{ring.rotation.z=time*.09+i*.3;ring.rotation.y=Math.sin(time*.2+i)*.08;});
        worlds.forEach((world,i)=>{world.rotation.y=time*.15;world.rotation.z=Math.sin(time*.2+i)*.1;});
        renderer.render(universe,cosmicCamera);
      }
      if (!reportedReady) { reportedReady = true; readyRef.current?.(); }
      frame=visible?requestAnimationFrame(render):0;
    };
    let inView=true;
    const intersection=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;visibility();});intersection.observe(container);
    const visibility=()=>{visible=!document.hidden&&inView;if(visible&&!frame){last=performance.now();frame=requestAnimationFrame(render);}};
    document.addEventListener("visibilitychange",visibility);
    const lost=(event:Event)=>{event.preventDefault();setUnavailable(true);cancelAnimationFrame(frame);};
    renderer.domElement.addEventListener("webglcontextlost",lost);
    frame=requestAnimationFrame(render);
    return()=>{
      disposed = true; logoImages.forEach(image => { image.onload = null; }); clearInterval(skyTimer);
      cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();document.removeEventListener("visibilitychange",visibility);renderer.domElement.removeEventListener("webglcontextlost",lost);
      const geometries=new Set<THREE.BufferGeometry>(),allMaterials=new Set<THREE.Material>();
      const disposeObject=(object:THREE.Object3D)=>{if(object instanceof THREE.Mesh || object instanceof THREE.Points){geometries.add(object.geometry);(Array.isArray(object.material)?object.material:[object.material]).forEach(m=>allMaterials.add(m));}};
      scene.traverse(disposeObject);universe.traverse(disposeObject);
      geometries.forEach(g=>g.dispose());allMaterials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();
    };
  },[progress, landing, celebrating]);
  return <div ref={host} className="city-scene-canvas" role="img" aria-label={landing ? "A Lagos-inspired city and the Codmify studio" : "A stylised Lagos city, a transparent skyscraper, and the Codmify team celebrating on an office floor"}>{unavailable&&<div className="city-scene-fallback"><strong>{landing ? "Your next big idea starts here." : "Two years of building together."}</strong><p>{landing ? "Explore Codmify’s services and work below." : "The Codmify team is celebrating. Your browser couldn’t display the 3D city, but you can still explore our anniversary story."}</p></div>}</div>;
}
