

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });

  console.log(response);

//   if (!response.ok) {
//     throw new Error("Upload failed");
//   }

//   return response.json();
};
