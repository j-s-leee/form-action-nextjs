import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
}

const _Input = (
  { name, errors, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div>
      <input
        name={name}
        ref={ref}
        {...rest}
        className="bg-transparent rounded-full w-full h-10 placeholder:text-neutral-800 p-2 border border-gray-400"
      />
      {errors?.map((error, idx) => (
        <span key={idx} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
};

export default forwardRef(_Input);
