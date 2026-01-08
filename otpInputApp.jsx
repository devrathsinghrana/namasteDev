import React from 'react'

const OTP_LENGTH = 5;
const otpInputApp = () => {
  //try to make a generic component so that if otp length changes we can easily reuse it
  //keep length of otp in constant
  //make input boxes based on otp length
  //make otp input array with length of otp and default value as empty string
  //add class to otp input and add some css to it
  //by default focus on first input
  //we only accept number
  //we only take last input value entered and can't enter more than one digit in input box
  //make reference array to focus on inputs without clicking tab button
  //use handle change and handle key down to manage input focus and value and backspace functionality and only focus of previous input if any value is present in current input else bug is created that is backspace clears previous input value instead of current as current has no value to clear
  //trim to avoid space issues and spacebar click issue also
  const [otpVlueArray, setOtpValueArray] = useState(Array(OTP_LENGTH).fill(''));
  const referenceArray = useRef(Array(OTP_LENGTH).fill(''));
  useEffect(() => {
    referenceArray?.current?.[0]?.focus();
  }, []);
  const handleChange = (e, index) => {
    const reqValue = e.target.value;
    //handle non numeric values
    if (isNaN(reqValue)) return;
    const newOtpValueArray = [...otpVlueArray];
    newOtpValueArray[index] = reqValue.slice(-1);
    setOtpValueArray(newOtpValueArray);
    if (reqValue.trim()) referenceArray?.current?.[index + 1]?.focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.code === 'Backspace' && !e.target.value) {
      referenceArray?.current?.[index - 1]?.focus();
    }
  };
  return (
    <div className={'otp-box-container'}>
      {otpVlueArray.map((otpValue, index) => (
        <input
          key={index}
          className={'otp-box'}
          value={otpValue}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (referenceArray.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default otpInputApp