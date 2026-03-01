import React, { useState } from 'react';
import styles from './Form.module.css';

const formData = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter your name',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Contact Number',
    name: 'contact',
    type: 'number',
    placeholder: 'Enter your contact number',
  },
];

const FormComponent = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const [error, setError] = useState<any>({
    name: '',
    email: '',
    contact: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newError = { ...error };

    if (formState.name.trim() === '') {
      newError.name = 'Name is required';
      isValid = false;
    }

    if (formState.email.trim() === '') {
      newError.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newError.email = 'Email is invalid';
      isValid = false;
    }

    if (formState.contact.trim() === '') {
      newError.contact = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formState.contact)) {
      newError.contact = 'Contact number must be 10 digits';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!');
      // Reset form after successful submission
      setFormState({
        name: '',
        email: '',
        contact: '',
      });
    }
  };

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles['form-container']}>
        <h1 className={styles['form-title']}>Contact Form</h1>
        <p className={styles['form-description']}>
          Please fill in your details below
        </p>

        <form onSubmit={handleSubmit} className={styles['form']}>
          {formData.map(field => (
            <div key={field.name} className={styles['form-group']}>
              <label htmlFor={field.name} className={styles['form-label']}>
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formState[field.name as keyof typeof formState]}
                onChange={handleChange}
                className={styles['form-input']}
              />
              {error[field.name].length > 0 && (
                <span className={styles['error-text']}>
                  {error[field.name]}{' '}
                </span>
              )}
            </div>
          ))}

          <div className={styles['button-container']}>
            <button type="submit" className={styles['submit-btn']}>
              Submit
            </button>
            <button
              type="reset"
              className={styles['reset-btn']}
              onClick={() =>
                setFormState({
                  name: '',
                  email: '',
                  contact: '',
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
