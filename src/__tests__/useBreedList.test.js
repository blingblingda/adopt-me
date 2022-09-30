/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks";
import useBreedList from "../hook/useBreedList";

test("gives an empty list with no animal", async () => {
  const { result } = renderHook(() => useBreedList(""));
  const [breedList, status] = result.current;

  expect(breedList).toHaveLength(0);
  expect(status).toBe("unloaded");
});
