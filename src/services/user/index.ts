export const registerStudent = async (formData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-student`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerInstructor = async (formData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-instructor`,
      {
        method: "POST",
        body: formData,
      },
    );

    console.log(res)

    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


