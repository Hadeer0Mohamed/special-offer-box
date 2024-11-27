import { useRef, useState, useEffect } from 'react'; // Importing React hooks
import FormWizard from 'react-form-wizard-component'; // Form wizard component for multi-step form
import StepOne from '../components/StepOne'; // Step 1 component
import StepTwo from '../components/StepTwo'; // Step 2 component
import StepThree from '../components/StepThree'; // Step 3 component
import StepFour from '../components/StepFour'; // Step 4 component
import axios from 'axios'; // Axios for HTTP requests
import 'react-form-wizard-component/dist/style.css'; // Styles for the wizard
import '../assets/main.css'; // Custom styles
import { FormikProps } from 'formik'; // FormikProps to type the Formik reference
import toast, { Toaster } from 'react-hot-toast'; // Toast notifications
import { FaImage } from 'react-icons/fa'; // Import the gallery icon
import { FaBuilding } from 'react-icons/fa'; // Import the building icon

// Interface defining the structure of the form values
interface FormValues {
  user_full_name: string;
  user_email: string;
  user_phone: string;
  company_country_id: string;
  user_password: string;
  user_password_confirmation: string;
  company_address: string;
  company_city_id: string;
  company_name: string;
  company_business_email: string;
  company_phone: string;
  company_phone_extra: string;
}

export default function Index() {
  // References to the Formik form instances for each step
  const stepOneRef = useRef<{ formik: FormikProps<FormValues>; validate: () => Promise<boolean> } | null>(null);
  const stepTwoRef = useRef<{ formik: FormikProps<FormValues>; validate: () => Promise<boolean> } | null>(null);
  
  // State to store form data and navigation indexes
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [nextIndex, setNextIndex] = useState(1); // Tracks next step index
  const [prevIndex, setPrevIndex] = useState(0); // Tracks previous step index
  
  // Handle form completion (final step)
  const handleComplete = async () => {
    // Consolidate data from all form steps
    const stepOneData = stepOneRef.current?.formik.values;
    const stepTwoData = stepTwoRef.current?.formik.values;

    // Final data to be sent to the server
    const finalData = {
      ...formData, // Existing form data
      ...stepOneData, // Step 1 data
      ...stepTwoData, // Step 2 data
      lang: 'en',
      created_by: stepOneData?.user_full_name,
      user_position: 'Employee',
      user_nationality: 'nationality',
      user_status: 'Status',
      user_is_admin: false,
      user_extra_data: { phone: '0100000000' },
    };

    try {
      // Send the consolidated data to the server using a POST request
      const response = await axios.post(
        'https://id.safav2.io.safavisa.com/register',
        finalData
      );
      toast.success('Submission successful', response.data); // Display success toast
    } catch (error) {
      toast.error('Submission error: ' + error); // Display error toast
    }
  };

  // Custom handleNext to validate and update form data before moving to the next step
  const customHandleNext = (handleNext: () => void, prevIndex: number, nextIndex: number) => {
    let updatedFormData = { ...formData };

    // Validation for Step 1
    if (prevIndex === 0 && nextIndex === 1 && stepOneRef.current) {
      const formik = stepOneRef.current.formik;
      const isFormTouched = Object.keys(formik.touched).length > 0;
      const isFormValid = Object.keys(formik.errors).length === 0;

      // If form is not completed or valid, show error toast
      if (!isFormTouched || !isFormValid) {
        toast.error('Please complete all fields.');
        return;
      }
      updatedFormData = { ...updatedFormData, ...formik.values }; // Update form data
    }

    // Validation for Step 2
    if (prevIndex !== 1 && nextIndex !== 2 && stepTwoRef.current) {
      const formik = stepTwoRef.current.formik;
      const isFormTouched = Object.keys(formik.touched).length > 0;
      const isFormValid = Object.keys(formik.errors).length === 0;

      // If form is not completed or valid, show error toast
      if (!isFormTouched || !isFormValid) {
        toast.error('Please complete all fields.');
        return;
      }
      updatedFormData = { ...updatedFormData, ...formik.values }; // Update form data
    }

    // Save form data to state and localStorage
    setFormData(updatedFormData);
    localStorage.setItem('formData', JSON.stringify(updatedFormData));

    // Proceed to the next step
    handleNext();
    setNextIndex(nextIndex);
    setPrevIndex(prevIndex);
  };

  // Load saved form data from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }

    // Remove form data from localStorage when the window is unloaded
    const handleBeforeUnload = () => {
      localStorage.removeItem('formData');
    };

    // Add event listener for beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Custom template for the "Back" button
  const backTemplate = (handlePrevious: () => void) => (
    <button className="btn btn-back btn-light" onClick={handlePrevious}>
      back
    </button>
  );

  return (
    <section className="hero">
      <Toaster /> {/* Toast container for notifications */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Form Wizard for multi-step form */}
            <FormWizard
              shape="circle"
              color="#2196f3"
              onComplete={handleComplete} // Function to call on completion
              backButtonTemplate={backTemplate} // Back button custom template
              nextButtonTemplate={(handleNext) => (
                <button
                  className="btn btn-primary btn-next"
                  onClick={() => customHandleNext(handleNext, prevIndex, nextIndex)}
                >
                  next
                </button>
              )}
              finishButtonTemplate={(handleComplete) => (
                <button
                  className="btn btn-primary btn-next finish-button"
                  onClick={handleComplete}
                >
                  Submit
                </button>
              )}
            >
              {/* Step 1: Personal Details */}
              <FormWizard.TabContent icon="ti-user">
                <h3>Tell Us More About You</h3>
                <div className="card rounded bg-white border-0 shadow-sm mt-3">
                  <StepOne ref={stepOneRef} />
                </div>
              </FormWizard.TabContent>

              {/* Step 2: Company Details */}
              <FormWizard.TabContent icon={<FaBuilding />}>
              <h3>Verify Your Company</h3>
                <div className="card rounded bg-white border-0 shadow-sm mt-3">
                  <StepTwo ref={stepTwoRef} />
                </div>
              </FormWizard.TabContent>

              {/* Step 3: Logo Upload */}
              <FormWizard.TabContent icon={<FaImage />}>
              <h3>Upload Your Company Logo</h3>
                <div className="card rounded bg-white border-0 shadow-sm mt-3">
                  <StepThree />
                </div>
              </FormWizard.TabContent>

              {/* Step 4: Final Confirmation */}
              <FormWizard.TabContent icon="ti-check">
                <h3>You are all Set Ready?</h3>
                <div className="card rounded bg-white border-0 shadow-sm mt-3">
                  <StepFour />
                </div>
              </FormWizard.TabContent>
            </FormWizard>
          </div>
        </div>
      </div>
    </section>
  );
}
