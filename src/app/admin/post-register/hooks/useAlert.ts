import Swal from "sweetalert2";

export function useAlert() {
  const showError = (title: string) => {
    Swal.fire({
      icon: "error",
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const showWarning = (title: string, html?: string) => {
    Swal.fire({
      icon: "warning",
      title,
      html,
      showConfirmButton: true,
    });
  };
  return { showError, showWarning };
}
