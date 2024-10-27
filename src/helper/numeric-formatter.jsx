"use client"

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { forwardRef, useReducer } from 'react';

const numericFormatter = new Intl.NumberFormat("id-ID", {
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const CurrencyInput =({
  className,
  initialValue = null,
  onCallback,
  ...props
}, ref) => {
  const [value, setValue] = useReducer(
    (_, next) => {
      const digits = next.replace(/\D/g, "");
      return numericFormatter.format(Number(digits));
    },
    numericFormatter.format(initialValue)
  );

  const handleChange = (formattedValue) => {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits);
    if (onCallback) onCallback(realValue);
  };

  return (
    <Input
      ref={ref}
      className={cn('w-full', className)}
      {...props}
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
        handleChange(ev.target.value);
      }}
    />
  );
}

export default forwardRef(CurrencyInput);
