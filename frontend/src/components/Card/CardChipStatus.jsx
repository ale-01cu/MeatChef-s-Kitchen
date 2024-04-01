import { Chip } from "@nextui-org/react"

export default function CardChipStatus({ startContentIcon, text, color }) {
  return (
    <Chip
      startContent={startContentIcon}
      variant="faded"
      color={color}
      className="z-10"
    >
      { text }
    </Chip>
  )
}