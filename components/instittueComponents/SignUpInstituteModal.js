import React, {useEffect,useState} from 'react'
import styles from '../styles/modal.module.css'
function SignUpInstituteModal({sendCode}) {
  useEffect(() => {
    
  }, [])
  const[code,setCode] = useState('');

  const sendBackData = async()=>{
    if (code==='') {
      alert("Enter Code!!");
    } else {
      sendCode(code)
    }
  }
  return (
    <div className={styles.mainDiv}>
      <div className={styles.modalBody}>
        <h2>Type Code: <span>{5+' min left'}</span></h2>
        <input type='text' value={code} onChange={(e)=>setCode(e.target.value)} />
        <div className={styles.btnDiv}>
          <button onClick={sendBackData}>Submit</button>
          <button className={styles.resend}>Resend</button>
        </div>
      </div>
    </div>
  )
}

export default SignUpInstituteModal