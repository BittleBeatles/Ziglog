import colors from '@src/design/color';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showAlert = (title: string, icon: SweetAlertIcon) => {
  const Toast = Swal.mixin({
    title: title,
    toast: true,
    position: 'top',
    icon: icon,
    showConfirmButton: false,
    timer: 2000,
    didOpen(toast) {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
  Toast.fire();
};
