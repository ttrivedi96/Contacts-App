import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Contact from '../../models/Contact'

/* Allows you to view contact card info and delete contact card*/
const ContactPage = ({ contact }) => {
    const router = useRouter()
    const [message, setMessage] = useState('')


    const handleDelete = async () => {
        const contactID = router.query.id

        try {
            await fetch(`/api/contacts/${contactID}`, {
                method: 'DELETE',
            })
            router.push('/')
        } catch (error) {
            setMessage('Failed to delete the contact.')
        }
    }


    return (
        <div key={contact._id} className="grid">
            <div className="card">
                <div className="main-content">
                    <p className="pet-name">{contact.name}</p>
                    <p className="owner">Number: {contact.contact}</p>



                    <div className="likes info">
                        <p className="label">E-mail</p>
                        <ul>
                            <li>
                                <p className="owner">{contact.email}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="likes info">
                        <p className="label">Address</p>
                        <ul>
                            <li>
                                <p className="owner">{contact.address}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="likes info">
                        <p className="label">City</p>
                        <ul>
                            <li>
                                <p className="owner">{contact.city}</p>
                            </li>
                        </ul>
                    </div>

                    <div className="btn-container">
                        <Link href="/[id]/edit" as={`/${contact._id}/edit`}>
                            <button className="btn edit">Edit</button>
                        </Link>
                        <button className="btn delete" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect()

    const contact = await Contact.findById(params.id).lean()
    contact._id = contact._id.toString()

    return { props: { contact } }
}

export default ContactPage