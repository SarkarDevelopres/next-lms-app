import { React, useState } from 'react'
import { useRouter } from 'next/router';
import styles from './styles/pricing.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loading from './Loading';
import checkSession from '@/utils/checkSession';
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Secure Payment Portal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Payment for {props.type} Plan</h4>
        <p>
          This is a dummy payment portal to show how the functioning will work in real life scenario.<br />Thank You for Choosing Us !!
        </p>
        <li><span>Total Amount:</span><span>₹ 10,000.00</span></li>
        <li><span>Plan ID:</span><span>23KLMSDLDSK93</span></li>
        <li><span>Order ID:</span><span>JDX23KLMSDL902323DSK93</span></li>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.paymentSuccess} variant="success">Pay Now</Button>
      </Modal.Footer>
    </Modal>
  );
}

function PricingCard({ type }) {
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const openPaymentPortal = () => {
    let validSession = checkSession('subAdminToken');
    if (validSession) {
      setModalShow(true);
    }
    else {
      alert("Login as Sub-Admin to Buy Plans !")
    }
  }
  const closePaymentPortal = async () => {
    setModalShow(false);
    setShowLoading(true);
    let token = localStorage.getItem('subAdminToken');
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/subadmin/addPlanID`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ token: token, planId: type })
    })
    let response = await request.json();
    if (response.success == true) {
      localStorage.removeItem('subAminListToken');
      localStorage.setItem('subAdminListToken', response.subAdminListToken);
      alert("Payment Successful !!");
      setShowLoading(false);
      router.push('/subadmin/owdehow82023')
    } else {
      alert("Payment Failed !!");
    }
  }
  return (
    <><MyVerticallyCenteredModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      paymentSuccess={() => closePaymentPortal()}
      type={type}
    />
      {showLoading && <Loading />}
      <div className={styles.cardMain}>
        <h2>{type}</h2>
        <h2>INR 10000</h2>
        <ul>
          <li>5 Courses</li>
          <li>Upload upto 5 GB</li>
          <li>500 Students</li>
          <li>1 Admin user</li>
          <li>Support 2hr/Week</li>
          <li>Landing Page</li>
          <li>Payment Gateway</li>
        </ul>
        <button onClick={() => openPaymentPortal()}>SUBSCRIBE</button>
        <p>+18% GST</p>
      </div>
    </>
  )
}

export default PricingCard