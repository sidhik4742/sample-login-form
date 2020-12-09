import React, {Component, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import './Login.css';

function Login() {
  const history = useHistory();
  const [dp, setDp] = useState();

  const uploadImage = (event) => {
    console.log('Upload image');
    let type = event.target.files[0].type;
    if (type == 'image/jpeg' || type == 'image/jpg') {
      console.log(event.target.files[0]);
      setDp({
        dp: URL.createObjectURL(event.target.files[0]),
      });
      console.log(dp);
    }
  };

  const profilePicture = (event) => {
    console.log('profile picture clicked');
    // history.push('/home');
  };

  const loginButton = (event) => {
    // event.preventDefault();
    console.log('Button clicked');
  };

  return (
    <div className="login">
      <main>
        <form className="form">
          <div className="img-div">
            <label htmlFor="uploadImage">
              <img
                className="image"
                onClick={profilePicture}
                src={
                  dp
                    ? dp
                    : 'https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg'
                }
                alt=""
              />
            </label>
            <input
              type="file"
              id="uploadImage"
              onChange={uploadImage}
              style={{display: 'none'}}
            />
          </div>
          <div>
            <span>
              <i className="fa fa-user fa-2x" aria-hidden="true"></i>
            </span>
            <input type="text" placeholder="user name" />
          </div>
          <div>
            <span>
              <i className="fa fa-lock fa-2x" aria-hidden="true"></i>
            </span>
            <input type="password" placeholder="password" />
          </div>
          <div className="btn-div">
            <Link to="/home/content" >
              {' '}
              <button type="button" onClick={loginButton}>
                Log In
              </button>
            </Link> 
          </div>
        </form>
        <div className="temsService">
          <p>By Registering, | accept the</p>
          <a href="#"> Terms of Service </a> <span>and </span>
          <a href="#"> Privacy Policy</a>
        </div>
      </main>
    </div>
  );
}

export default Login;
