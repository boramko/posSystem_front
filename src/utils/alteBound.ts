let alertTimeout:any = null;

const showAlert = (message:string, duration = 3000) => {
  if (!alertTimeout) {
    alert(message);
    alertTimeout = setTimeout(() => {
      alertTimeout = null;
    }, duration);
  }
}

export default showAlert;