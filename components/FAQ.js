import React from 'react'
import styles from './styles/faq.module.css'
import { FaChevronDown } from "react-icons/fa";
import Accordion from 'react-bootstrap/Accordion';
function FAQ() {
  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.headerText}>Frequently Asked Questions</h2>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0" >
          <Accordion.Header className='faqAccordianHeader'>Can I upload my own videos ?</Accordion.Header>
          <Accordion.Body>
            <div className={styles.individualrecommendations}>
              <h4><b>Yes!</b> you can definetly add your videos.</h4>
              <p>Ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
              <ul>
                <li>Voluptates omnis labore, fuga earum voluptate.</li>
                <li>Fuga earum voluptate amet error nostrum sit.</li>
                <li>Animi minima fuga earum voluptate.</li>
                <li>Ut, dolores eveniet incidunt voluptatem odio cupiditate.</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className='faqAccordianHeader'>Will I get my own domain/sub-domain ?</Accordion.Header>
          <Accordion.Body>
            <div className={styles.individualrecommendations}>
              <h4><b>Yes definetly!</b> you will be getting your personal sub-domain.</h4>
              <p>Ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
              <ul>
                <li>Voluptates omnis labore, fuga earum voluptate.</li>
                <li>Fuga earum voluptate amet error nostrum sit.</li>
                <li>Animi minima fuga earum voluptate.</li>
                <li>Ut, dolores eveniet incidunt voluptatem odio cupiditate.</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className='faqAccordianHeader'>How can I manage my students ?</Accordion.Header>
          <Accordion.Body>
            <div className={styles.individualrecommendations}>
              <h4>Through the <b>Institute Portal</b> you manage, add, remove students both manually or by a file</h4>
              <p>Ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
              <ul>
                <li>Voluptates omnis labore, fuga earum voluptate.</li>
                <li>Fuga earum voluptate amet error nostrum sit.</li>
                <li>Animi minima fuga earum voluptate.</li>
                <li>Ut, dolores eveniet incidunt voluptatem odio cupiditate.</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header className='faqAccordianHeader'>Is there any certificate generator ?</Accordion.Header>
          <Accordion.Body>
            <div className={styles.individualrecommendations}>
              <h4>An LMS platform is incompleted without one, so <b>of course, there is a certificate generator</b>.</h4>
              <p>Ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
              <ul>
                <li>Voluptates omnis labore, fuga earum voluptate.</li>
                <li>Fuga earum voluptate amet error nostrum sit.</li>
                <li>Animi minima fuga earum voluptate.</li>
                <li>Ut, dolores eveniet incidunt voluptatem odio cupiditate.</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default FAQ