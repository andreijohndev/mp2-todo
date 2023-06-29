

import React from 'react';

function ResetPassWord() {
  const handleResetPassWordFormSubmit = (event) => {
    event.preventDefault();
    alert('Reset Password clicked!');
  };

  return (
    <div className="container">
      <h1 className="mt-3">Reset Password</h1>

      <form onSubmit={handleResetPassWordFormSubmit}>
        <div className="form-group">
          <label className="mt-3 mb-3"htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="mt-3 mb-3" htmlFor="newPassword">New Password</label>
          <input type="password" className="form-control" id="newPassword" placeholder="Enter your new password" />
        </div>
        <div className="form-group">
          <label className="mt-3 mb-3" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm your new password"
          />
        </div>
        <button type="submit" className="btn btn-success mt-4">Submit</button>
      </form>

     
    </div>
  );
}

export default ResetPassWord;
