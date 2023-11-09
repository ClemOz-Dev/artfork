import { test, expect } from "vitest"
import ArtistDetail from "../../../components/artist/detail/TheArtistDetail.vue"

test("mount component", async () => {
  expect(ArtistDetail).toBeTruthy()
})
