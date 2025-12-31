import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

interface FilterDropdownProps {
  label: string
  options: string[]
  value: string[]
  onChange: (values: string[]) => void
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  function toggleOption(option: string) {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className="rounded-full px-4 gap-2"
        >
          {label}
          {value.length > 0 && (
            <span className="text-xs bg-primary text-primary-foreground rounded-full px-2">
              {value.length}
            </span>
          )}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        {options.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={value.includes(option)}
            onCheckedChange={() => toggleOption(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
