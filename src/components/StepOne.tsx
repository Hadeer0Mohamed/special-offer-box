import { useState, forwardRef, useImperativeHandle } from 'react';
import { useFormik } from 'formik'; // Import FormikProps for typing
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup';

// Import the validation schema for form validation
import { stepOneValidationSchema } from './stepOneValidationSchema';

// Define the FormValues type to type the form's values
interface FormValues {
  user_full_name: string;
  user_email: string;
  user_phone: string;
  company_country_id: string;
  user_password: string;
  user_password_confirmation: string;
}

// Forward ref to allow parent components to access this form and methods like validate
const StepOne = forwardRef((_, ref) => {
  // State hooks for controlling visibility of password fields
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Toggle confirm password visibility
  const togglePasswordConfirmationVisibility = () => {
    setConfirmationPasswordVisible((prev) => !prev);
  };

  // Retrieve saved data from local storage if available
  const savedData = JSON.parse(localStorage.getItem('formData') || '{}');

  // Use Formik for form management and validation
  const formik = useFormik<FormValues>({
    initialValues: {
      user_full_name: savedData.user_full_name || '', // Pre-fill from saved data or default to empty
      user_email: savedData.user_email || '',
      user_phone: savedData.user_phone || '',
      company_country_id: savedData.company_country_id || '',
      user_password: savedData.user_password || '',
      user_password_confirmation: savedData.user_password_confirmation || '',
    },
    validationSchema: stepOneValidationSchema, // Use the imported validation schema for the form
    onSubmit: () => {
      // Form submission handler (validation is handled manually)
    },
  });

  // Expose `validate` method to the parent using `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    formik, // Expose the Formik instance to the parent
    validate: async () => {
      // Trigger validation and return a boolean indicating if the form is valid
      const result = await formik.validateForm();
      // Mark all fields as touched
      formik.setTouched({
        user_full_name: true,
        user_email: true,
        user_phone: true,
        company_country_id: true,
        user_password: true,
        user_password_confirmation: true,
      });
      // Return true if no errors were found
      return Object.keys(result).length === 0;
    },
  }));

  return (
    <Form className="container step_form">
      <div className="row">
        <div className="col-12 mb-3">
          {/* Full Name Field */}
          <FloatingLabel controlId="floatingInputName" label="Full Name">
            <Form.Control
              autoFocus
              type="text"
              placeholder="Enter Your Full Name"
              {...formik.getFieldProps('user_full_name')}
              isInvalid={!!formik.errors.user_full_name && formik.touched.user_full_name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.user_full_name}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        <div className="col-12 mb-3">
          {/* Email Field */}
          <FloatingLabel controlId="floatingInputEmail" label="User Email">
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              {...formik.getFieldProps('user_email')}
              isInvalid={!!formik.errors.user_email && formik.touched.user_email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.user_email}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        <div className="col-lg-6 mb-3">
          {/* Country Selection */}
          <FloatingLabel controlId="floatingSelect" label="Country">
            <Form.Select
              {...formik.getFieldProps('company_country_id')}
              isInvalid={!!formik.errors.company_country_id && formik.touched.company_country_id}
            >
              <option value="">Choose Your Country</option>
              <option value="AF">Afghanistan</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>

            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.company_country_id}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        <div className="col-lg-6 mb-3">
          {/* Phone Number Field */}
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+20</InputGroup.Text>
            <FloatingLabel controlId="floatingInputPhone" label="Phone Number">
              <Form.Control
                type="text"
                placeholder="Enter Your Phone Number"
                {...formik.getFieldProps('user_phone')}
                isInvalid={!!formik.errors.user_phone && formik.touched.user_phone}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.user_phone}</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
        </div>

        {/* Password Field */}
        <div className="position-relative col-12 mb-3">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              {...formik.getFieldProps('user_password')}
              isInvalid={!!formik.errors.user_password && formik.touched.user_password}
              style={{ paddingRight: '2.5rem' }}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.user_password}</Form.Control.Feedback>
          </FloatingLabel>
          {/* Toggle password visibility */}
          <span
            className="position-absolute togell_eye"
            onClick={togglePasswordVisibility}
            style={{ cursor: 'pointer', zIndex: 10 }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div className="position-relative col-12 mb-3">
          <FloatingLabel controlId="floatingPasswordConfirmation" label="Confirm Password">
            <Form.Control
              type={confirmationPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              {...formik.getFieldProps('user_password_confirmation')}
              isInvalid={
                !!formik.errors.user_password_confirmation && formik.touched.user_password_confirmation
              }
              style={{ paddingRight: '2.5rem' }}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.user_password_confirmation}
            </Form.Control.Feedback>
          </FloatingLabel>
          {/* Toggle confirm password visibility */}
          <span
            className="position-absolute togell_eye"
            onClick={togglePasswordConfirmationVisibility}
            style={{ cursor: 'pointer', zIndex: 10 }}
          >
            {confirmationPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>
    </Form>
  );
});

// Export StepOne component to be used in other parts of the application
export default StepOne;
