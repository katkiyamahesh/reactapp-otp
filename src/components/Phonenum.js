import React, { useState ,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Form, Alert } from "react-bootstrap";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Phone = () =>{
    const [number, setNumeber]= useState("");
    const [otp, setOtp]= useState("");
    const [flag, setFlag]= useState(false);
    const [comfirmobj, setComfirmobj]= useState();
    const [error, setError] = useState("");
    const navigate =useNavigate();

    useEffect(() => {
      if ("OTPCredential" in window) {
        const ac = new AbortController();
  
        navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal
          })
          .then((otp) => {
            // console.log(otp);
            setOtp(otp.code);
            ac.abort();
            setFlag(true);
          })
          .catch((err) => {
            ac.abort();
            console.log(err);
          });
      }
    }, []); // Empty dependency array makes this effect run once, similar to componentDidMount
  

    const {setUpRecaptcha} = useUserAuth();

    const getOtp = async (e) =>{
        e.preventDefault();
        setError("");
        if(number === "" || number === undefined) 
          return setError("plaese enter number");
        try{
          const response =await setUpRecaptcha(number);
          setComfirmobj(response);
          setFlag(true);
          console.log(response);

        }catch(err){
          setError(err.message);
        }
        console.log(number);
    }

    const verifyOtp = async (e)=> {
      e.preventDefault();
      console.log(otp);
      if(otp === "" || otp === null) return;
      try{
        setError("");
        await comfirmobj.confirm(otp);
        navigate('/home');
      }
      catch(err){
        setError(err.message);
      }

    }

    return (
        <>
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Auth Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{display: !flag ? "block": "none"}}>
            <Form.Group className="mb-3" controlId="formBasicphone">
              <PhoneInput
                    country="IN"
                    value={number}
                    onChange={setNumeber}
                    placeholder="enter phone number"
              ></PhoneInput>
              
              <div id="recaptcha-container"></div>
            </Form.Group>

            <div className="button-right">
              <Button variant="secondary">cancel</Button> &nbsp;
              <Button variant="primary" type="submit">Send otp</Button> 

            </div>
          </Form>

          <Form onSubmit={verifyOtp} style={{display: flag ? "block": "none"}}>
            <Form.Group className="mb-3" controlId="formBasicverify">
              <Form.Control
                type="text"
                placeholder="enter otp"
                value={otp}
                onChange={setOtp}
              />
        
            </Form.Group>

            <div className="button-right">
             
              <Button variant="primary" type="submit">verify otp</Button> 

            </div>
          </Form>
          <h1>Hello CodeSandbox</h1>
          <h2>Your OTP is: {otp}</h2>
        </div>
        </>
    );

}

export default Phone;