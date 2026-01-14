"use client";

import { Controller, Control, RegisterOptions, FieldValues, Path } from "react-hook-form";
import Image from "next/image";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface ImageUploadProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // Correct type for Controller
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

const ImageUpload = <T extends FieldValues>({
  label,
  name,
  control,
  rules,
}: ImageUploadProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Cleanup object URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full md:col-span-2">
      <label className="block text-sm font-medium mb-2">{label}</label>

      <Controller
        name={name}
        control={control}
        defaultValue={undefined} // Undefined is type-safe for optional fields
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {/* Drag & Drop Box */}
            {!preview && (
              <div
                onClick={() =>
                  document.getElementById(`imgInput-${String(name)}`)?.click()
                }
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    field.onChange(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className={`border-2 border-dashed rounded-xl h-36 flex flex-col items-center justify-center cursor-pointer bg-gray-50 ${
                  fieldState.error ? "border-red-500 bg-red-50" : "border-gray-400"
                }`}
              >
                <p className="text-gray-600">Drag & Drop or Click</p>
                <input
                  id={`imgInput-${String(name)}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            )}

            {/* Preview */}
            {preview && (
              <div className="relative mt-3 flex justify-center">
                <div className="relative h-28 w-28 rounded-xl overflow-hidden shadow">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    field.onChange(undefined); // clear value
                    setPreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Validation Error */}
            {fieldState.error && (
              <p className="text-red-500 text-xs mt-1 text-center">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default ImageUpload;
