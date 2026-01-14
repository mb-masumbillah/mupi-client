"use client";

import { Controller, Control, RegisterOptions, FieldValues, Path } from "react-hook-form";

interface TextAreaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
}

const TextArea = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  placeholder,
}: TextAreaProps<T>) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue={undefined}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <textarea
              {...field}
              placeholder={placeholder}
              className={`w-full border-2 rounded-xl px-3 py-2 h-24 resize-none focus:outline-none transition-colors duration-300 ${
                fieldState.error ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-[#00455D]"
              }`}
            />
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default TextArea;
