import { describe, it, expect } from "vitest";
import {
  defineWebSocket,
  defineWebSocketHandler,
  type WebSocketResponse,
} from "../src/index.ts";

const hooks = { message: () => {} };

describe("defineWebSocket", () => {
  it("should return the provided hooks", () => {
    const result = defineWebSocket(hooks);
    expect(result).toEqual(hooks);
  });
});

describe("defineWebSocketHandler", () => {
  it("should attach the provided hooks", () => {
    const wsHandler = defineWebSocketHandler(hooks);
    const res = wsHandler({} as any) as WebSocketResponse;
    expect(res).toBeInstanceOf(Response);
    expect(res.status).toBe(426);
    // expect(res.statusText).toBe("Upgrade Required");
    expect(res.crossws).toEqual(hooks);
  });

  it("should attach the provided hooks with function argument", () => {
    const wsHandler = defineWebSocketHandler(() => hooks);
    const res = wsHandler({} as any) as WebSocketResponse;
    expect(res).toBeInstanceOf(Response);
    expect(res.status).toBe(426);
    // expect(res.statusText).toBe("Upgrade Required");
    expect(res.crossws).toEqual(hooks);
  });
});
