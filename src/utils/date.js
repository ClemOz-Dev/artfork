import { isValid, format } from "date-fns"
import fr from "date-fns/locale/fr"

export default function formatDateToFrench(inputDate) {
  if (!inputDate || !isValid(new Date(inputDate))) {
    return ""
  }

  return format(new Date(inputDate), "d MMMM yyyy", { locale: fr })
}
