import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (values: string[]) => void;
}

export function FilterSelect({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  function toggleOption(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="
            h-9
            rounded-xl
            px-4
            gap-2
            bg-indigo-900/40
            border border-indigo-500/60
            text-white
            hover:bg-indigo-500/30
            hover:text-white
            transition
          "
        >
          <span className="truncate max-w-[120px]">{label}</span>

          {value.length > 0 && (
            <span
              className="
                ml-1
                rounded-full
                bg-indigo-500
                px-2
                text-[11px]
                font-medium
                text-white
              "
            >
              {value.length}
            </span>
          )}

          <ChevronDown size={14} className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        sideOffset={8}
        className="
          max-h-64
          overflow-y-auto
          w-48
          scroll-custom
          bg-indigo-900/90
          border border-indigo-500/40
          text-white
          "
      >
        {options.length === 0 && (
          <div className="px-3 py-2 text-xs text-white/60">Nenhuma opção</div>
        )}

        {options.map((option) => (
       <DropdownMenuCheckboxItem
  key={option}
  checked={value.includes(option)}
  onCheckedChange={() => toggleOption(option)}
  className="
    relative
    flex
    items-center
    gap-2

    cursor-pointer
    rounded-md

    px-3
    py-2
    pl-8

    text-sm
    text-white/90

    hover:bg-indigo-500/20
    hover:text-white

    focus:bg-indigo-500/30
    focus:text-white

    data-[state=checked]:bg-indigo-500/40
    data-[state=checked]:text-white
  "
>
  {option}
</DropdownMenuCheckboxItem>

        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
