import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../../../firebase.init';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
    return (
      <div className="  container h-25 d-flex justify-content-center align-items-center">
        <div className="text-center mt-5 bg-light p-5 rounded-2">
          <h3 className=" text-danger">Email is not verified!!</h3>
          <h5 className=" text-warning">Verify your email Please</h5>
          <Button
            className=" bg-info bg-gradient bg-opacity-100 border-0 fw-bold mb-3"
            onClick={async () => {
              await sendEmailVerification();
              toast.success('Sent email Successfully!');
            }}
          >
            Send A Verification Email
          </Button>
          <ToastContainer />
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
