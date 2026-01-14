"use client";

import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

interface SelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  options: string[];
}

const SelectInput = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
  options,
}: SelectInputProps<T>) => {
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
            <div className="relative">
              <select
                {...field}
                className={`w-full border-2 rounded-xl px-3 py-2 appearance-none focus:outline-none focus:border-[#00455D] ${
                  fieldState.error ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    className="bg-white text-gray-800"
                  >
                    {opt}
                  </option>
                ))}
              </select>

              {/* Dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-4 w-4 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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

export default SelectInput;
