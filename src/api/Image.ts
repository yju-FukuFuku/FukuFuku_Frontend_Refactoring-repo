import api from ".";

export const postImage = async (image: File, id: number | null) => {
  console.log(image);
  
  const formData = new FormData();
  formData.append("file", image);
  
  const imageData = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'data': `${id}`
    },
  })
  .then((res) => {
    console.log(res);
    return res.data;
  })
  
  return imageData;
}

export async function editUserImage(image : FormData) {
  const { data } = await api.put(`/user/editNickname`, image) 
  return data;
}