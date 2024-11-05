"use client";

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { forwardRef, useEffect, useState } from 'react';

const numericFormatter = new Intl.NumberFormat("id-ID", {
  useGrouping: true,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const CurrencyInput = ({
  className,
  initialValue = null,
  onCallback,
  doSomething,
  ...props
}, ref) => {
  const [value, setValue] = useState(
    numericFormatter.format(parseFloat(initialValue || 0))
  );

  const handleChange = (inputValue) => {
    const digits = inputValue.replace(/\D/g, "");
    const realValue = parseFloat(digits || 0);

    // Update the formatted value and trigger callback
    setValue(numericFormatter.format(realValue));
    if (onCallback) onCallback(realValue);  // Send unformatted value to callback
  };

  useEffect(() => {
    setValue(numericFormatter.format(parseFloat(initialValue || 0)));
  }, [initialValue]);

  return (
    <Input
      ref={ref}
      className={cn('w-full', className)}
      {...props}
      value={value}
      onChange={(ev) => {
        handleChange(ev.target.value);
        if (doSomething) doSomething(ev.target.value); // Pass unformatted value
      }}
    />
  );
};

export default forwardRef(CurrencyInput);
