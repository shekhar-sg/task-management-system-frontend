import {Check, PlusCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {useSearchParams} from "react-router-dom";

type FacetedOption = {
  label: string;
  value: string;
};

type DataTableFacetedFilterProps = {
  title: string;
  paramKey: "status" | "priority" | "view";
  options: FacetedOption[];
};

export const DataTableFacetedFilter = ({ title, paramKey, options }: DataTableFacetedFilterProps) => {
  const [params, setSearchParams] = useSearchParams();

  const selectedValues = params.get(paramKey)?.split(",") || [];

  const clearFilters = () => {
    params.delete(paramKey);
    setSearchParams(params);
  };

  const toggleValue = (value: string) => {
    const current = new Set(selectedValues);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    if (current.size === 0) {
      clearFilters();
      return;
    }
    params.set(paramKey, Array.from(current).join(","));
    setSearchParams(params);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="default" className="h-8">
          <PlusCircle className="mr-2 size-4" />
          {title}

          {selectedValues.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge variant="default" className="rounded-sm px-1 font-normal">
                {selectedValues.length} selected
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Filter ${title}`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);

                return (
                  <CommandItem key={option.value} onSelect={() => toggleValue(option.value)}>
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border",
                        isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="size-3.5" />
                    </div>

                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>

            {selectedValues.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={clearFilters} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
