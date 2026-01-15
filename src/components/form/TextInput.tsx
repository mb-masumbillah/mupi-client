import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { useState } from "react";

interface TextInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  type?: string;
}

const TextInput = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  type = "text",
  placeholder,
}: TextInputProps<T>) => {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <input
                {...field}
                value={(field.value ?? "") as string} // ✅ KEY FIX
                type={
                  type === "password"
                    ? show
                      ? "text"
                      : "password"
                    : type
                }
                placeholder={placeholder}
                className={`w-full border-2 border-gray-300 rounded-xl px-3 py-2 pr-10 focus:outline-none ${
                  fieldState.error
                    ? "border-red-500"
                    : "focus:border-[#00455D]"
                }`}
              />

              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-2 text-xs font-semibold text-gray-600 px-2"
                >
                  {show ? "Hide" : "Show"}
                </button>
              )}
            </div>

            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextInput;
