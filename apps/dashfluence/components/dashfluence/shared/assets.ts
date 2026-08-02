const ASSET_ROOT = "/dashfluence/assets";

export function dashfluenceAsset(file: string) {
  return `${ASSET_ROOT}/${file}`;
}

export const dashfluenceAssets = {
  logo: dashfluenceAsset("logo-white.svg"),
  logoDark: dashfluenceAsset("j26wBXykaCK05KDLWRHEmP2Wg.svg"),
  hero: dashfluenceAsset("hero-background.png"),
  heroCards: [
    "qVkI9z8QAQ8zTrl8dJ3IulG1eZc.svg",
    "H9yx96nx8ErGaOEqH7Bu38fsA.avif",
    "6hVmctmvv8CUFaXmdX1J2RZHYA.avif",
  ].map(dashfluenceAsset),
  growthBackground: dashfluenceAsset("growth-banner-background.png"),
  brandLogos: [
    "1UADw1wQdhCS1DtU8eFuLsVH7w.svg",
    "n6M2R4C7f8FpHF4avy39oTxPUw8.svg",
    "NvhPR45XxTUGv5FEP7ezexsCFw.svg",
    "Vf6ApXaJ64J0UnZBkeZG9cfQl4.svg",
    "jPq0DfYBUGdJMdCr3wQYOL0Yd0k.svg",
  ].map(dashfluenceAsset),
  about: [
    "1rWbx7qWz7jBEHJaTotLKdtHrno.png",
    "gdsRfKmUMyKhZn7vlaCO8BKsxYw.png",
    "3NMjGcaahaqhO4a18noW1QE5ifw.png",
  ].map(dashfluenceAsset),
  services: [
    "8pav5SU3BnJ6wETIuurnrNxivo.png",
    "P6VdABYaeMyqzy5lJeVzQ2GSH90.jpg",
    "FZtr09azaTHn6YwdMESKE3Ss3tg.jpg",
    "6hoh6HKRqD2wucm9QOitChDY4S0.png",
    "pwOCQ86eV6uTDBY7fWUfJB09WU.jpg",
  ].map(dashfluenceAsset),
  work: [
    "jAbJAmSYyYg78AqhLtKgpxB5s.png",
    "LBVZNteTWEzdyexqtenEhOIuWs.png",
    "biANzq99SctY7mtsB4aCF7TAO8.png",
    "gSqV2QMer80qOhFG3CHJrpb8Y.png",
    "JmPuHfShaNg5IpRW4NrwPndTtg.png",
    "kVTCyUzuzaIWw160WsWC4dSOlqw.png",
    "AKTxPp6QmoolcD3UqROwiJXF3BU.png",
    "UDdoqh8wPb0xxAWdOiex701l5Xk.png",
  ].map(dashfluenceAsset),
  bannerCards: [
    "NbXNFLFe6YOEfl7YVHiYhkDH3o.png",
    "gujhMUPru8rtI8WrHiHpGzdkoMk.png",
    "OYZLAIPSVvFqINdVqLchvbMf1QQ.png",
    "6RT6sZwUW0zO7FVcKVHRzFXgPFw.png",
  ].map(dashfluenceAsset),
  people: [
    "2iPywJhBjl49nBvmwEHQRJJKb8.png",
    "lpuUlgXRHmsidI0gxcl863te5BE.jpg",
    "AWClv3b7Gk8bEPKJhWzY6kl5c.jpg",
    "7klIo3dIfAwcnqhdEQgEjwOOFgM.png",
  ].map(dashfluenceAsset),
  blogs: [
    "hb6YAFAUOycs9lAqN1tgYSTBmJM.png",
    "ZdlQl6FTcELc9ZKh2EdJGM25oNU.png",
    "nqB5Z3gnxSfIrn4pmUl69OSGZg.png",
    "9na9M8wOFM03WiWuOJ8ABecf0.png",
    "aFNIGDR8O0IxBYdPL2kDBbeuHYs.png",
    "4P2ZA6XJzVl23PauGPN215CueA.png",
    "QXOnuUUDyjBj6D9gMSxdryrCxA.png",
    "3FSm1UsyvoU6bvz9rEyOZt9o.png",
    "MSNUFXhp8jkDCIgiGwmKt5VO1fQ.png",
    "VBH4OwuOOulPINXYWY3jojPU9o.png",
    "81YbcWnRyp3uBRR0JYwULXDUGI.png",
    "WayGLVvuhV4FamgL6bWpSW4AB8.png",
  ].map(dashfluenceAsset),
} as const;
