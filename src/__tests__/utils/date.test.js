import { describe, expect, it } from "vitest"
import formatDateToFrench from "../../utils/date.js"

describe("formatDateToFrench", () => {
  it("should format a valid date to French", () => {
    const inputDate = "2005-06-20"
    const formattedDate = formatDateToFrench(inputDate)
    const expectedDate = "20 juin 2005"

    expect(formattedDate).toBe(expectedDate)
  })

  it("should handle invalid date", () => {
    const inputDate = "invalid-date"
    const formattedDate = formatDateToFrench(inputDate)
    const expectedDate = ""

    expect(formattedDate).toBe(expectedDate)
  })

  it("should handle empty date", () => {
    const inputDate = null
    const formattedDate = formatDateToFrench(inputDate)

    expect(formattedDate).toBe("")
  })
})
