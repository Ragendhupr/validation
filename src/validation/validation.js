function validate(name, value) {

    if (name === "username") {
  
      if (value.trim() === "") {
        return "Username is required";
      }
  
      if (value.length < 3) {
        return "Username must be at least 3 characters";
      }
  
      return "";
    }
  
    if (name === "email") {
  
      if (value.trim() === "") {
        return "Email is required";
      }
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailPattern.test(value)) {
        return "Enter a valid email address";
      }
  
      return "";
    }
  
    if (name === "password") {
  
      if (value.trim() === "") {
        return "Password is required";
      }
  
      if (value.length < 8) {
        return "Password must be at least 8 characters";
      }
  
      return "";
    }
  
    return "";
  }
  
  export default validate;