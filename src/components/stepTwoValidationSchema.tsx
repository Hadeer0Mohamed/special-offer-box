// validationSchema.ts or stepOneValidation.ts
import * as Yup from 'yup';

export const stepTwoValidationSchema = Yup.object({
  company_name: Yup.string()
  .min(3, 'company Name must be at least 3 characters')
  .required('company Name is required'),
company_business_email: Yup.string()
  .email('Invalid email address')
  .required('Business Email is required'),
company_phone: Yup.string()
  .matches(/^\d{11}$/, 'Phone Number must be 11 digits')
  .required('Phone Number is required'),
company_country_id: Yup.string().required('company country is required'),
company_address: Yup.string().required('company address is required'),
company_city_id: Yup.string().required('company city_id is required'),
company_phone_extra: Yup.string().required('Extra company phone is required'),
});
