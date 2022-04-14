// import { Container } from 'postcss';
import React from 'react'
import classes from '../styles/NewMeetupForm.module.css';
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { useState } from 'react'


const Register = ({ formId, contactForm, forNewContact = true }) => {

    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        name: contactForm.name,
        contact: contactForm.contact,
        email: contactForm.email,
        address: contactForm.address,
        city: contactForm.city,
    })

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/contacts/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
        } catch (error) {
            setMessage('Failed to update contact')
        }
    }

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form) => {
        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (error) {
            setMessage('Failed to add contact')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value =
            target.name === 'poddy_trained' ? target.checked : target.value
        const name = target.name

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            forNewContact ? postData(form) : putData(form)
        } else {
            setErrors({ errs })
        }
    }


    const formValidate = () => {
        let err = {}
        if (!form.name) err.name = 'Name is required'
        if (!form.email) err.email = 'email is required'
        if (!form.contact) err.contact = 'contact is required'
        if (!form.address) err.address = 'address is required'
        if (!form.city) err.city = 'city is required'

        return err
    }


    return (
        // 
        <>
            <form id={formId} onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' maxLength="20" value={form.name} onChange={handleChange} required />
                </div>
                <div className={classes.control}>
                    <label htmlFor='contact'>Contact</label>
                    <input type='text' required name='contact' value={form.contact} onChange={handleChange} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' required name='email' value={form.email} onChange={handleChange} />
                </div>
                {/* <div className={classes.control}>
                    <label htmlFor='image'>Meetup Image</label>
                    <input type='url' required id='image' />
                </div> */}
                <div className={classes.control}>
                    <label htmlFor='address'>Address</label>
                    <input type='text' required name='address' value={form.address} onChange={handleChange} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='city'>city</label>
                    <input type='text' required name='city' value={form.city} onChange={handleChange} />
                </div>
                <div className={classes.actions}>
                    <button type="submit">Add Contact</button>
                </div>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </>
    )
}

export default Register