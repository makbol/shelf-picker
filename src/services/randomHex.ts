export default function randomHex() {
  const hex = Math.floor(Math.random()*16777215).toString(16)

  return hex.length === 6 ? hex : hex + '0'
}
