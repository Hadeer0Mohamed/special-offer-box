import React from 'react';

const StepFour: React.FC = () => {
  const savedData = JSON.parse(localStorage.getItem('formData') || '{}');


  return (
    <div className="step_four">
      <img src="https://media.lordicon.com/icons/wired/lineal/1127-mailbox.gif" alt="" />
      <h4 className='my-4 text-danger'>we will send a message for this email</h4>
      <h5 className='text-muted'>{savedData.user_email}</h5>
    </div>
  );
};

export default StepFour;