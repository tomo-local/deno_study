import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { sum } from "./sum.ts";

Deno.test("sum() adds given 2 numbers", () => {
  const actual = sum(1, 2);
  const expected = 3;

  assertEquals(actual, expected);
});

Deno.test("sum() adds any number of arguments", () => {
  const actual = sum(1, 2, 3, 4, 5, -4);
  const expected = 11;

  assertEquals(actual, expected);
});

Deno.test("sum() returns 0 when no arguments given", () => {
  const actual = sum();
  const expected = 0;

  assertEquals(actual, expected);
});
