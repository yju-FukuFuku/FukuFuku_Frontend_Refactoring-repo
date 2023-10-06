import Swal from 'sweetalert2'  // 경고창 라이브러리

export const fire = (
  text: string = "문제가 생겼습니다. 나중에 다시 시도해주세요.",
  icon: "error" | "success" = "error",
  title: "error" | "success" = "error") => {
  Swal.fire({
    icon,
    title,
    text
  });
}