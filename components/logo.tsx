import Image from "next/image"

export function RatsRadarLogo({ className = "h-8 w-8" }: { className?: string }) {
  return <Image src="/ratsradar-logo.png" alt="RatsRadar Logo" width={64} height={64} className={className} priority />
}
