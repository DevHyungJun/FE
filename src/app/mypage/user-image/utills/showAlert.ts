import Swal from "sweetalert2";

const showAlert = (icon: "success" | "error", title: string) => {
  Swal.fire({ icon, title, showConfirmButton: false, timer: 1500 });
};

export default showAlert;
