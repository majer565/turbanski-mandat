"use client";

export const removeFile = async (fileName: string) => {
  try {
    const response = await fetch("/api/removeFile", {
      method: "POST",
      body: fileName,
    });

    if (response.status === 500)
      throw new Error("Błąd przy zapisywaniu mandatu. Kod błędu: #RM_FL");

    return response.json();
  } catch (e) {
    throw e;
  }
};
