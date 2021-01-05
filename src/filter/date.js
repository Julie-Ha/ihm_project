export default (value) => {
    const date = new Date(value)
    return date.toLocaleString(['fr-FR'], { year: 'numeric', month: 'long'})
  }