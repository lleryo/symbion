'use client';

import React, {
  useState,
  useRef,
  useEffect,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils/helpers';

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  outerClassName?: string;
  labelClassName?: string;
  label: string;
}

const NativeInput = ({ label, className, disabled, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      setHasText(inputRef.current.value !== '');
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    if (inputRef.current) {
      setHasText(inputRef.current.value !== '');
      if (inputRef.current.value === '') {
        setIsFocused(false);
      }
    }
  };

  const showPlaceholder = !disabled && !isFocused && !hasText;

  return (
    <div
      className={cn('w-full relative bg-inherit', props.outerClassName)}
      onClick={handleFocus}
    >
      <Input
        {...props}
        disabled={disabled}
        placeholder={showPlaceholder ? '' : props.placeholder}
        ref={inputRef}
        className={cn('w-full px-2', className)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Label
        className={cn(
          'absolute cursor-text left-0 text-sm text-lime-500 bg-inherit mx-1 transition-all',
          props.labelClassName,
          {
            '-top-3 text-lime-600 text-sm z-[20]': isFocused || hasText,
            'top-2 text-lime-500 w-fit': !isFocused && !hasText,
          }
        )}
        onClick={handleFocus}
      >
        {label}
      </Label>
    </div>
  );
};

export default NativeInput;
