import React from 'react'
import Register from '../components/Register'

const register = () => {

    const contactForm = {
        name: '',
        contact: 0,
        email: '',
        address: '',
        city: '',
    }


    return (
        <Register formId="add-contact-form" contactForm={contactForm} />
    )
}

export default register