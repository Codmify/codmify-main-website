export const BUILDING_ROOMS = [
  { id: "welcome", floor: 0, label: "Reception", x: 0 },
  { id: "studio", floor: 1, label: "The studio", x: -4 },
  { id: "capabilities", floor: 1, label: "Capabilities room", x: 4 },
  { id: "work", floor: 2, label: "Project gallery", x: 0 },
  { id: "plans", floor: 3, label: "Project planning", x: 0 },
  { id: "questions", floor: 4, label: "Answer library", x: 0 },
  { id: "contact", floor: 5, label: "Let's build together", x: 0 },
] as const;

export const FLOOR_HEIGHT = 6;
const ease = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};
const mix = (a: number[], b: number[], t: number) =>
  a.map((value, i) => value + (b[i] - value) * ease(t));

// Reading hold, a walk between rooms, or a lift ride to the next floor.
export function buildingPose(progress: number) {
  const scaled =
    Math.max(0, Math.min(1, progress)) * (BUILDING_ROOMS.length - 1);
  const index = Math.floor(scaled);
  const local = scaled - index;
  const room = BUILDING_ROOMS[index],
    next = BUILDING_ROOMS[Math.min(index + 1, BUILDING_ROOMS.length - 1)];
  const y = room.floor * FLOOR_HEIGHT,
    nextY = next.floor * FLOOR_HEIGHT;
  const start = [room.x, y + 2.8, 9.5],
    end = [next.x, nextY + 2.8, 9.5];
  let camera = start,
    target = [room.x, y + 2.2, -4];
  let liftY = y,
    doorOpen = 1;
  if (room.floor === next.floor) {
    camera = mix(start, end, (local - 0.58) / 0.42);
    target = mix(target, [next.x, nextY + 2.2, -4], (local - 0.58) / 0.42);
  } else if (local > 0.58) {
    if (local < 0.73) {
      camera = mix(start, [12.5, y + 2.8, 6], (local - 0.58) / 0.15);
      target = mix(target, [12.5, y + 2.4, -1], (local - 0.58) / 0.15);
    } else if (local < 0.9) {
      // Close before travelling; open after arriving. Each action follows scroll.
      const travel = ease((local - 0.76) / 0.11);
      liftY = y + (nextY - y) * travel;
      camera = [12.5, liftY + 2.8, 6];
      target = [12.5, liftY + 2.4, -1];
      doorOpen =
        local < 0.76
          ? 1 - ease((local - 0.73) / 0.03)
          : ease((local - 0.87) / 0.03);
    } else {
      liftY = nextY;
      camera = mix([12.5, nextY + 2.8, 6], end, (local - 0.9) / 0.1);
      target = mix(
        [12.5, nextY + 2.4, -1],
        [next.x, nextY + 2.2, -4],
        (local - 0.9) / 0.1,
      );
    }
  }
  return {
    camera,
    target,
    liftY,
    doorOpen,
    room: index,
    riding: room.floor !== next.floor && local >= 0.73 && local < 0.9,
  };
}
