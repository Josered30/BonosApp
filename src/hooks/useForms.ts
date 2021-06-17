import { useState } from "react";

interface useFormData {
  initialValues: any;
  validationFunction?: (
    newValues: any,
    currentValues: any,
    errors: any,
    setErrors: (error: any) => void
  ) => void;
}

export default function useForm({
  initialValues,
  validationFunction,
}: useFormData) {
  const [values, setValues] = useState(initialValues || ({} as any));
  const [errors, setErrors] = useState({} as any);

  const handleChange = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    setValues({
      ...values,
      [name]: value,
    });

    const newValues = { [name]: value };

    if (validationFunction) {
      validationFunction(newValues, values, errors, setErrors);
    }
  };

  return { values, errors, handleChange };
}
