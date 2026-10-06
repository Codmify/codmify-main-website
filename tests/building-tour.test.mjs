import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildingPose,
  BUILDING_ROOMS,
  FLOOR_HEIGHT,
} from "../src/lib/building-tour.ts";

test("chapter anchors arrive inside their corresponding floor and room", () => {
  BUILDING_ROOMS.forEach((room, index) => {
    const pose = buildingPose(index / 6);
    assert.deepEqual(pose.camera, [
      room.x,
      room.floor * FLOOR_HEIGHT + 2.8,
      9.5,
    ]);
    assert.equal(pose.liftY, room.floor * FLOOR_HEIGHT);
  });
  assert.deepEqual(buildingPose(-1), buildingPose(0));
  assert.deepEqual(buildingPose(2), buildingPose(1));
});

test("vertical travel stays inside the shaft with doors shut", () => {
  for (const index of [0, 2, 3, 4, 5]) {
    for (const local of [0.78, 0.81, 0.84, 0.86]) {
      const pose = buildingPose((index + local) / 6);
      assert.equal(pose.camera[0], 12.5);
      assert.equal(pose.camera[2], 6);
      assert.equal(pose.camera[1], pose.liftY + 2.8);
      assert.equal(pose.doorOpen, 0);
      assert.equal(pose.riding, true);
    }
  }
});

test("studio to capabilities is a room walk on floor one", () => {
  for (let local = 0; local < 1; local += 0.05) {
    const pose = buildingPose((1 + local) / 6);
    assert.equal(pose.camera[1], FLOOR_HEIGHT + 2.8);
    assert.equal(pose.camera[2], 9.5);
    assert.ok(pose.camera[0] >= -4 && pose.camera[0] <= 4);
    assert.equal(pose.riding, false);
  }
});

test("camera and door movement are continuous through travel boundaries", () => {
  for (let index = 0; index < 6; index++) {
    for (const local of [0.58, 0.73, 0.76, 0.87, 0.9, 1]) {
      const boundary = (index + local) / 6;
      const before = buildingPose(boundary - 1e-7);
      const after = buildingPose(boundary + 1e-7);
      for (const key of ["camera", "target"]) {
        assert.ok(
          Math.hypot(...before[key].map((value, i) => value - after[key][i])) <
            0.001,
        );
      }
      assert.ok(Math.abs(before.doorOpen - after.doorOpen) < 0.001);
    }
  }
});

test("forward and reverse scrolling use the same bounded pose", () => {
  const forward = Array.from({ length: 1001 }, (_, index) =>
    buildingPose(index / 1000),
  );
  for (let index = 1000; index >= 0; index--) {
    const pose = buildingPose(index / 1000);
    assert.deepEqual(pose, forward[index]);
    assert.ok(
      [...pose.camera, ...pose.target, pose.liftY].every(Number.isFinite),
    );
    assert.ok(pose.liftY >= 0 && pose.liftY <= 30);
    assert.ok(pose.doorOpen >= 0 && pose.doorOpen <= 1);
  }
});
