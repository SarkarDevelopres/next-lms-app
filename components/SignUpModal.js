import React, {useEffect,useState} from 'react'
import styles from './styles/modal.module.css'
function SignUpModal({sendCode}) {
  useEffect(() => {
    
  }, [])
  const[userCode,setUserCode] = useState('');
  const[instituteCode,setInstituteCode] = useState('');

  const sendBackData = async()=>{
    if (userCode===''||instituteCode==='') {
      alert("Enter Code!!");
    } else {
      sendCode({userCode,instituteCode})
    }
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalBody}>
        <h2>Enter the Codes:</h2>
        <label htmlFor='userCode'>User Code</label>
        <input id='userCode' type='text' value={userCode}onChange={(e)=>setUserCode(e.target.value)} />
        <label htmlFor='instituteCode'>Institute Code</label>
        <input id='instituteCode' type='text' value={instituteCode} onChange={(e)=>setInstituteCode(e.target.value)} />
        <div className={styles.btnDiv}>
          <button onClick={sendBackData}>Submit</button>
          <button className={styles.resend}>Resend</button>
        </div>
      </div>
    </div>
  )
}

export default SignUpModal