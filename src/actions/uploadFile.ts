"use client";

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("ticketFile", file);

  const response = await fetch("/api/dodaj", {
    method: "POST",
    body: formData,
  });
  
  return response.json();
};
