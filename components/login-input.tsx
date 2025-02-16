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
  { name, errors, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const hasError = errors && errors.length > 0;

  return (
    <div className="fieldset">
      <label className="fieldset-label capitalize" htmlFor={name}>
        {name}
      </label>
      <input
        name={name}
        ref={ref}
        {...rest}
        className={`input ${
          hasError ? "border-red-300" : "border-neutral-300"
        }`}
      />

      <label className="fieldset-label">
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
