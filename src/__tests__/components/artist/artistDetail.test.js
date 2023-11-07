import { test, expect } from "vitest"
import TheArtistDetail from "../../../components/artist/detail/TheArtistDetail.vue"

test("mount component", async () => {
  expect(TheArtistDetail).toBeTruthy()
})
