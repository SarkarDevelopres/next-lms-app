import Pricing from '@/components/Pricing'
import Testimonial from '@/components/Testimonial'
import React from 'react'
import styles from '../styles/plan.module.css'
import Accordion from 'react-bootstrap/Accordion';
function plans() {
    return (
        <div className={styles.maindiv}>
            <section className={styles.plansDetails}>
                <div className={styles.heroHeading}>
                    <div className={styles.heroDiv}></div>
                    <h1>The Perfect Plan<br/> for Everyone</h1>
                </div>
                <div className={styles.recommendationSection}>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0" className={styles.accordianButton}>
                            <Accordion.Header>For Institutes with less than 50 Employees</Accordion.Header>
                            <Accordion.Body>
                                <div className={styles.individualrecommendations}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
                                    <h3>Recommended Plan is: <b>Basic</b></h3>
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
                            <Accordion.Header>For Institutes with less than 100 Employees</Accordion.Header>
                            <Accordion.Body>
                                <div className={styles.individualrecommendations}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
                                    <h3>Recommended Plan is: <b>Professional</b></h3>
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
                            <Accordion.Header>For Institutes with more than 100 Employees </Accordion.Header>
                            <Accordion.Body>
                                <div className={styles.individualrecommendations}>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo incidunt quia quos distinctio ex esse ad? Provident aliquam magnam eum reiciendis rem, illum voluptate? Quod deserunt at earum, beatae, nesciunt nam pariatur ut consectetur maiores animi reprehenderit voluptatem, maxime debitis? Veniam eaque ab temporibus dolorum amet accusamus vel rem accusantium.</p>
                                    <h3>Recommended Plan is: <b>Premium</b></h3>
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
            </section>
            <Pricing />
            <Testimonial />
        </div>
    )
}

export default plans