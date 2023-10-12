import api from ".";
import { fire } from "../util/fire";

export const postImage = async (image: File, id: number | null) => {
  console.log(image);
  const extension = ["png", "jpg", "jpeg"];
  const fileType = image.type.split("/")[1];

  if (!extension.includes(fileType)) {
    fire("올바르지 않은 확장자입니다. (jpg, jpeg, png)");
    return;
  }

  const formData = new FormData();
  formData.append("file", image);

  const imageData = await api
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        data: `${id}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch(({ response }) => {
      const message =
        response.status === 415
          ? "올바르지 않은 확장자입니다. (jpg, jpeg, png)"
          : undefined;
      fire(message);
      return;
    });

  return imageData;
};
export async function editUserImage(image: FormData, id: number) {
  console.log(image.get("file"));
  const { data } = await api.put(`/user/editImage`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
      data: `${id}`,
    },
  });
  return data;
}
