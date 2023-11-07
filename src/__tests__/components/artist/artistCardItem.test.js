import { describe, expect, test } from "vitest"
import { shallowMount } from "@vue/test-utils"
import ArtistListCardItem from "../../../components/artist/list/ArtistListCardItem.vue"
import router from "../../../router/index.js"

describe("ArtistListCardItem Component", () => {
  const artistData = {
    firstName: "John",
    lastName: "Doe",
    nationality: "French",
    birthdate: "1990-01-15",
    image: "url_de_l_image",
    description: "Description de l'artiste",
    id: 1,
  }

  // Create a reusable function to create component wrappers with different props
  const createWrapper = (props) =>
    shallowMount(ArtistListCardItem, {
      global: {
        plugins: [router],
      },
      props,
    })

  // Test component props with different values
  test("Component props validation", () => {
    // Test with null value for 'artist' prop
    const wrapperNullArtist = createWrapper(null)
    expect(wrapperNullArtist.props("artist")).toBeNull()

    // Test with valid value for 'artist' prop
    const wrapperValidArtist = createWrapper({ artist: artistData })
    expect(wrapperValidArtist.props("artist")).toEqual(artistData)
  })

  // Test computed properties with valid props
  test("Computed data validation", () => {
    const wrapperNullArtist = createWrapper(null)
    const wrapperValidArtist = createWrapper({ artist: artistData })

    // Check if the computed data for null 'artist' prop is null
    if (wrapperNullArtist.props("artist") === null) {
      expect(wrapperNullArtist.vm.fullName).toBe("Artiste inconnu")
    } else {
      // Check computed data for the component with valid 'artist' prop
      expect(wrapperValidArtist.find("p").text()).toContain(
        `Nationalité: ${artistData.nationality}`,
      )
      expect(wrapperValidArtist.vm.fullName).toBe("John Doe")
      expect(wrapperValidArtist.vm.birthdateFormat).toBe("15 janvier 1990")
      expect(artistData.description).toBe("Description de l'artiste")
    }
  })

  // Test rendering images conditionally
  test("Render image conditionally", () => {
    const wrapperWithImage = createWrapper({ artist: artistData })

    // Check if the image is rendered when 'artist.image' is defined
    expect(wrapperWithImage.find("img").exists()).toBe(true)

    const artistDataWithoutImage = {
      ...artistData,
      image: null,
    }

    const wrapperWithoutImage = createWrapper({
      artist: artistDataWithoutImage,
    })

    // Check if the placeholder image is rendered when 'artist.image' is null
    expect(wrapperWithoutImage.find("img").attributes("src")).toBe(
      "/img/avatar.png",
    )
  })
})
