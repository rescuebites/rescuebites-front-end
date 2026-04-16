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

export async function getCommerceProfileImageFile(): Promise<File> {
  let base64Image = localStorage.getItem("commerceProfilePictureBase64");

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
  return new File([u8arr], "commerce-profile.jpg", { type: mime });
}

export function clearCommerceProfileImage() {
  localStorage.removeItem("commerceProfilePictureBase64");
}

// ── Helpers para múltiples imágenes de comercio ──────────────────────────────

function base64ToFile(base64: string, name: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], name, { type: mime });
}

export async function getCommerceProfileImageFiles(): Promise<File[]> {
  const raw = localStorage.getItem("commerceProfilePicturesBase64");
  if (raw) {
    try {
      const base64Array: string[] = JSON.parse(raw);
      if (Array.isArray(base64Array) && base64Array.length > 0) {
        return base64Array.map((b64, i) =>
          base64ToFile(b64, `commerce-image-${i + 1}.jpg`)
        );
      }
    } catch (err) {
      console.warn(
        "Invalid commerceProfilePicturesBase64 in localStorage, falling back to single image",
        err
      );
    }
  }
  return [await getCommerceProfileImageFile()];
}

export function clearCommerceProfileImages() {
  localStorage.removeItem("commerceProfilePicturesBase64");
  localStorage.removeItem("commerceProfilePictureBase64");
}


