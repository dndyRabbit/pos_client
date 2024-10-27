import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React, { forwardRef, useReducer } from 'react';

const moneyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR"
})

function CurrencyInput({
  className,
  initialValue = "",
  onCallback,
  ...props
}, ref) {
  const [value, setValue] = useReducer(
    (_, next) => {
      const digits = next.replace(/\D/g, "");
      return moneyFormatter.format(Number(digits) / 100);
    },
    initialValue
  );

  const handleChange = (formattedValue) => {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
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
