import { useState, useEffect } from 'react';

const useForm = (initialUserData, callback, validate) => {

  const [values, setValues] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleChange = (event) => {
    event.persist();
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  };

  return {
    handleChange,
    initialUserData,
    values,
    errors,
    setErrors,
    setIsSubmitting
  }
};

export default useForm;
