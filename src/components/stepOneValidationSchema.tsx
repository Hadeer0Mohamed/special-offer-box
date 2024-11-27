// validationSchema.ts or stepOneValidation.ts
import * as Yup from 'yup';

export const stepOneValidationSchema = Yup.object({
  user_full_name: Yup.string()
    .min(3, 'Full Name must be at least 3 characters')
    .required('Full Name is required'),
  user_email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  user_phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone Number must be 11 digits')
    .required('Phone Number is required'),
  company_country_id: Yup.string().required('Country is required'),
  user_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  user_password_confirmation: Yup.string()
    .oneOf([Yup.ref('user_password')], 'Confirm Passwords must match the password')
    .required('Confirm Password is required'),
});
