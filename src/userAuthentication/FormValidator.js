export const validateForm = (formData, formType) => {
  let errors = {};

  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  }else if (!isValidEmail(formData.email)){
    errors.email = "Please enter a valid Email address";
  }

  if (!formData.password || !formData.password.trim()) {
    errors.password = "Password is required";
  }else if (formData.password.trim().length < 4){
    errors.password = "Password must be at least 4 charecters long";
  }

  if (formType === "register") {
    if (!formData.firstName || !formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }else if (!isValidName(formData.firstName)){
      errors.firstName = "FirstName should only contain letters";
    }

    if (!formData.lastName || !formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }else if (!isValidName(formData.lastName)){
      errors.lastName = "LastName should only contain letters";
    }
  }

  if (formType === "blog") {
    if (!formData.imageUrl || !formData.imageUrl.trim()) {
      errors.imageUrl = "imageUrl is required";
    }

    if (!formData.title || !formData.title.trim()) {
      errors.title = "title is required";
    }
    if (!formData.description || !formData.description.trim()) {
      errors.description = "description is required";
    }
  }

  return errors;
};

// Helper function to validate email format
const isValidEmail = (email) => {
  //regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const isValidName = (name) => {
  //regular expression for a simple email validation
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}
