import { forwardRef, useImperativeHandle } from 'react';
import { useFormik } from 'formik'; // Import Formik for form handling
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { stepTwoValidationSchema } from './stepTwoValidationSchema'; // Validation schema for form inputs

// Define the type for the form values to ensure type safety
interface FormValues {
  company_name: string;
  company_business_email: string;
  company_phone: string;
  company_country_id: string;
  company_address: string;
  company_city_id: string;
  company_phone_extra: string;
}

// StepTwo component which is wrapped in forwardRef to allow parent to access form methods
const StepTwo = forwardRef((_, ref) => {

  // Retrieve saved form data from localStorage, if available
  const savedData = JSON.parse(localStorage.getItem('formData') || '{}');

  // Initialize Formik with the form values, validation schema, and submit handler
  const formik = useFormik<FormValues>({
    initialValues: {
      company_address: savedData.company_address || '', // Pre-fill with saved data or empty string
      company_city_id: savedData.company_city_id || '',
      company_name: savedData.company_name || '',
      company_business_email: savedData.company_business_email || '',
      company_phone: savedData.company_phone || '',
      company_phone_extra: savedData.company_phone_extra || '',
      company_country_id: savedData.company_country_id || '',
    },
    validationSchema: stepTwoValidationSchema, // Apply validation schema
    onSubmit: () => {
      // Handle form submission, validation will be handled separately
    },
  });

  // Expose `validate` method to the parent component via `useImperativeHandle`
  useImperativeHandle(ref, () => ({
    formik,  // Provide access to Formik's instance for the parent component
    validate: async () => {
      // Trigger form validation and set all fields as touched
      const result = await formik.validateForm();
      formik.setTouched({
        company_name: true,
        company_business_email: true,
        company_phone: true,
        company_country_id: true,
        company_address: true,
        company_city_id: true,
        company_phone_extra: true,
      });
      // Return true if there are no validation errors, else false
      return Object.keys(result).length === 0;
    },
  }));

  return (
    <Form className="container step_form">
      <div className="row">
        <div className="col-12 text-center mb-3">
          <small className="text-muted">
            Enter the information of your company to create your account
          </small>
        </div>

        {/* Company Name Input Field */}
        <div className="col-12 mb-3">
        <InputGroup>
            <FloatingLabel controlId="floatingInputName" label="Company Name">
            <Form.Control
              type="text"
              autoFocus
              placeholder="Enter Your Company Name"
              {...formik.getFieldProps('company_name')}
              isInvalid={!!formik.errors.company_name && formik.touched.company_name}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.company_name}</Form.Control.Feedback>
          </FloatingLabel>
          <InputGroup.Text id="basic-addon1">
          <Form.Select aria-label="Default select example" className='border-0 bg-transparent'>
      <option value="1">Arabic</option>
      <option value="2" selected>English</option>

    </Form.Select>
          </InputGroup.Text>

          </InputGroup>
 
        </div>

        {/* Company Address Input Field */}
        <div className="col-12 mb-3">
          <FloatingLabel controlId="floatingInputcompany_address" label="Company Address">
            <Form.Control
              type="text"
              placeholder="Enter Your Company Address"
              {...formik.getFieldProps('company_address')}
              isInvalid={!!formik.errors.company_address && formik.touched.company_address}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.company_address}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Business Email Input Field */}
        <div className="col-12 mb-3">
          <FloatingLabel controlId="floatingInputEmail" label="Business Email">
            <Form.Control
              type="email"
              placeholder="Enter Your Business Email"
              {...formik.getFieldProps('company_business_email')}
              isInvalid={!!formik.errors.company_business_email && formik.touched.company_business_email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.company_business_email}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Country Select Field */}
        <div className="col-lg-6 mb-3">
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

        {/* City Select Field */}
        <div className="col-lg-6 mb-3">
          <FloatingLabel controlId="floatingSelectcompany_city_id" label="City">
            <Form.Select
              {...formik.getFieldProps('company_city_id')}
              isInvalid={!!formik.errors.company_city_id && formik.touched.company_city_id}
            >
              <option value="">Choose Your City</option>
              <option value="1">New York</option>
              <option value="2">Los Angeles</option>
              <option value="3">Chicago</option>
              <option value="4">Houston</option>
              <option value="5">Phoenix</option>
              <option value="6">San Antonio</option>
              <option value="7">San Diego</option>
              <option value="8">Dallas</option>
              <option value="9">Austin</option>
              <option value="10">Miami</option>
              <option value="11">Boston</option>
              <option value="12">Seattle</option>
              <option value="13">Denver</option>
              <option value="14">Washington, D.C.</option>
              <option value="15">Philadelphia</option>
              <option value="16">San Francisco</option>
              <option value="17">Las Vegas</option>
              <option value="18">Orlando</option>
              <option value="19">Portland</option>
              <option value="20">Atlanta</option>

            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.company_city_id}</Form.Control.Feedback>
          </FloatingLabel>
        </div>

        {/* Company Phone Input Field */}
        <div className="col-lg-6 mb-3">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+20</InputGroup.Text>
            <FloatingLabel controlId="floatingInputPhone" label="Company Phone Number">
              <Form.Control
                type="text"
                placeholder="Enter Your Phone Number"
                {...formik.getFieldProps('company_phone')}
                isInvalid={!!formik.errors.company_phone && formik.touched.company_phone}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.company_phone}</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
        </div>

        {/* Additional Phone Number Input Field */}
        <div className="col-lg-6 mb-3">
          <InputGroup>
            <InputGroup.Text id="basic-addon1">+20</InputGroup.Text>
            <FloatingLabel controlId="floatingInputPhoneExtra" label="Additional Phone Number">
              <Form.Control
                type="text"
                placeholder="Enter Additional Phone Number"
                {...formik.getFieldProps('company_phone_extra')}
                isInvalid={!!formik.errors.company_phone_extra && formik.touched.company_phone_extra}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.company_phone_extra}</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
        </div>

      </div>
    </Form>
  );
});

export default StepTwo;
