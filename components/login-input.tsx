import Link from "next/link";
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
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text capitalize">{name}</span>
      </label>
      <input
        name={name}
        ref={ref}
        {...rest}
        className={`input input-bordered ${
          hasError ? "border-red-300" : "border-neutral-300"
        }`}
      />

      <label className="label">
        {errors?.map((error, idx) => (
          <span key={idx} className="text-red-400 label-text-alt">
            {error}
          </span>
        ))}
      </label>
    </div>
  );
};

export default forwardRef(_Input);
