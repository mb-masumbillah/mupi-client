"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";


import TextInput from "@/src/components/form/TextInput";
import SelectInput from "@/src/components/form/SelectInput";
import ImageUpload from "@/src/components/form/ImageUpload";

/* ================= TYPES ================= */

type RepeatSubject = {
  semester: string;
  subject: string[];
  subjectCode: string;
};

type PaymentFormValues = {
  roll: string;
  amount: string;
  txnId: string;
  number: string;
  semester: string;
  repeats: RepeatSubject[];
  image: File | null;
};

/* ================= COMPONENT ================= */

const PaymentForm = () => {
  const router = useRouter();

  const { handleSubmit, control, setValue, getValues } =
    useForm<PaymentFormValues>({
      defaultValues: {
        roll: "",
        amount: "",
        txnId: "",
        number: "",
        semester: "",
        repeats: [],
        image: null,
      },
    });

  const [repeats, setRepeats] = useState<RepeatSubject[]>([]);

  const semesterOptions = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
  ];

  /* ================= REPEAT HANDLER ================= */

  const addRepeatField = () => {
    const mainSemester = getValues("semester");

    if (!mainSemester) {
      alert("Please select Running / Drop Semester first!");
      return;
    }

    const newField: RepeatSubject = {
      semester: "",
      subject: [],
      subjectCode: "",
    };

    const updated = [...repeats, newField];
    setRepeats(updated);
    setValue("repeats", updated);
  };

  const removeRepeatField = (index: number) => {
    const updated = repeats.filter((_, i) => i !== index);
    setRepeats(updated);
    setValue("repeats", updated);
  };

  const handleSubjectInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value.replace(/,,+/g, ",");

    const codesArray = input
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const updated = [...repeats];
    updated[index].subject = codesArray;
    updated[index].subjectCode = input;

    setRepeats(updated);

    setValue(`repeats.${index}.subject`, codesArray);
    setValue(`repeats.${index}.subjectCode`, input);
  };

  /* ================= SUBMIT ================= */

  const onSubmit = async (data: PaymentFormValues) => {
    try {
      const formData = new FormData();

      const payload = {
        roll: data.roll,
        amount: data.amount,
        txnId: data.txnId,
        number: data.number,
        semester: data.semester,
        repeat: repeats.map((r) => ({
          semester: r.semester,
          subject: r.subject,
        })),
      };

      formData.append("data", JSON.stringify(payload));

      if (data.image) {
        formData.append("file", data.image);
      }

      const res = await fetch("/api/payment/create", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Payment failed");

      alert("Payment submitted successfully ✅");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Payment submission failed ❌");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-6">

        <div className="text-center">
          <h2 className="text-2xl font-bold">Student Payment</h2>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextInput
            label="Roll"
            name="roll"
            type="number"
            control={control}
            rules={{ required: "Roll is required" }}
          />

          <TextInput
            label="Amount"
            name="amount"
            type="number"
            control={control}
            rules={{ required: "Amount is required" }}
          />

          <TextInput
            label="Mobile Number"
            name="number"
            type="number"
            control={control}
            rules={{ required: "Number is required" }}
          />

          <TextInput
            label="Transaction ID"
            name="txnId"
            control={control}
            rules={{ required: "Transaction ID required" }}
          />

          <SelectInput
            label="Running / Drop Semester"
            name="semester"
            control={control}
            rules={{ required: "Semester required" }}
            options={semesterOptions}
          />

          <button
            type="button"
            onClick={addRepeatField}
            className="md:col-span-2 bg-[#00455D] text-white py-2 rounded-xl"
          >
            Add Repeat Semester
          </button>

          {repeats.map((item, index) => (
            <div
              key={index}
              className="md:col-span-2 border p-4 rounded-xl bg-gray-50 relative space-y-2"
            >
              <button
                type="button"
                onClick={() => removeRepeatField(index)}
                className="absolute top-2 right-2 text-red-600"
              >
                <X />
              </button>

              {/* Semester */}
              <Controller
                name={`repeats.${index}.semester`}
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => {
                      const updated = [...repeats];
                      updated[index].semester = e.target.value;
                      setRepeats(updated);
                      field.onChange(e);
                    }}
                    className="w-full border p-2 rounded-xl"
                  >
                    <option value="">Select Semester</option>
                    {semesterOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                )}
              />

              {/* Subject Codes */}
              <Controller
                name={`repeats.${index}.subjectCode`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    onChange={(e) => handleSubjectInput(index, e)}
                    className="w-full border p-2 rounded-xl"
                    placeholder="101, 102, 203"
                  />
                )}
              />
            </div>
          ))}

          {/* IMAGE UPLOAD */}
          <ImageUpload<PaymentFormValues>
            label="Payment Screenshot (Optional)"
            name="image"
            control={control}
          />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#00455D] text-white px-6 py-2 rounded-xl"
            >
              Payment Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
