import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
  icon?: ReactNode;
}

const _Input = (
  { name, errors, icon, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const hasError = errors && errors.length > 0;

  return (
    <div>
      <div className="flex relative items-center">
        {icon && (
          <span className="absolute left-4 size-5 text-gray-500">{icon}</span>
        )}
        <input
          name={name}
          ref={ref}
          {...rest}
          className={`"bg-transparent ring-neutral-300 focus:outline-none focus:ring-2 transition placeholder:text-neutral-400 placeholder:text-sm placeholder:font-semibold rounded-lg w-full h-10 py-2 pl-10 border border-neutral-300" ${
            hasError ? "border-red-300" : "border-neutral-300"
          }`}
        />
      </div>
      <div className="flex flex-col gap-2">
        {errors?.map((error, idx) => (
          <span key={idx} className="text-red-400 text-xs font-medium">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(_Input);
