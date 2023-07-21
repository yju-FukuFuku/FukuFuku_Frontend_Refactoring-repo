import axios from "axios";

export async function getReply(c_id: number | null) {
  console.log(await axios.get(`/replys/${c_id}`));
  
  const { data } = await axios.get(`/replys/${c_id}`);
  return data;
}