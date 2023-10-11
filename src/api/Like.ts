import api from '.';

interface LikeData {
  u_id: number;
  b_id: number;
}

export const like = (u_id: number, b_id: number, isUnLike: boolean = false) => {
  const data: LikeData = {
    u_id,
    b_id
  }

  if (isUnLike) {
    return api.delete("/like", { data: { data } });
  }

  return api.post("/like", { data });
}
