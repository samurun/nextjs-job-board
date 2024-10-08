import React, { useState } from 'react';
import cities from '@/lib/cities';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { cn } from '@/lib/utils';

interface LocationSeclectProps {
  value?: string;
  onSelect: (location: string) => void;
}

export default React.forwardRef<HTMLDivElement, LocationSeclectProps>(
  function LocationSeclect({ onSelect, value }) {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className={cn(
              'w-[200px] justify-between',
              !value && 'text-muted-foreground'
            )}
          >
            {value
              ? cities.find((city) => city.value === value)?.label
              : 'Select locaiton...'}
            <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command>
            <CommandInput placeholder='Search location...' className='h-9' />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => {
                      onSelect(city.value);
                      setOpen(false);
                    }}
                  >
                    {city.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === city.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
