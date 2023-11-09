import { describe, expect, test } from "vitest"
import { shallowMount } from "@vue/test-utils"
import ArtworkCard from "../../../components/artwork/list/ArtworkListCardItem/ArtworkListCardItem.vue"

describe("ArtworkListCardItem Component", () => {
  const artworkData = {
    name: "Artwork Name",
    image: "url_de_l_image",
  }

  // Create a reusable function to create component wrappers with different props
  const createWrapper = (props) =>
    shallowMount(ArtworkCard, {
      props,
    })

  // Test component props with different values
  test("Component props validation", () => {
    // Test with null value for 'artwork' prop
    const wrapperNullArtwork = createWrapper({ artwork: null })
    expect(wrapperNullArtwork.props("artwork")).toBeNull()

    // Test with valid value for 'artwork' prop
    const wrapperValidArtwork = createWrapper({ artwork: artworkData })
    expect(wrapperValidArtwork.props("artwork")).toEqual(artworkData)
  })

  // Test rendering images conditionally
  test("Render image conditionally", () => {
    const wrapperWithImage = createWrapper({ artwork: artworkData })

    // Check if the image is rendered when 'artwork.image' is defined
    expect(wrapperWithImage.find("img").exists()).toBe(true)

    const artworkDataWithoutImage = {
      ...artworkData,
      image: null,
    }

    const wrapperWithoutImage = createWrapper({
      artwork: artworkDataWithoutImage,
    })

    // Check if the default image is rendered when 'artwork.image' is null
    expect(wrapperWithoutImage.find("img").attributes("src")).toBe(
      "/img/brush.jpg",
    )
  })
})
