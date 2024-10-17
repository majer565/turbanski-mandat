"use client";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("ticketFile", file);

    const response = await fetch("/api/dodaj", {
      method: "POST",
      body: formData,
    });

    if (response.status === 500)
      throw new Error("Błąd przy zapisywaniu mandatu. Kod błędu: #UPL_FL");

    return response.json();
  } catch (e) {
    throw e;
  }
};
