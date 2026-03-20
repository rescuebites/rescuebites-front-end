import axios from "axios";

export async function getProfileImageFile(): Promise<File> {
  let base64Image = localStorage.getItem("profilePictureBase64");

  if (!base64Image) {
    const response = await axios.get("/styles/default-profile-picture.png", {
      responseType: "blob",
    });
    const blob = response.data;

    base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  const arr = base64Image.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);

  return new File([u8arr], "profile.jpg", { type: mime });
}

export function clearProfileImage() {
  localStorage.removeItem("profilePictureBase64");
}
