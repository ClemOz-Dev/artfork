export default function appendIfNotNull(fieldName, value, formData) {
  if (value !== null) {
    formData.append(fieldName, value)
  }
}
