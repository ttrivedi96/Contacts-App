import { useRouter } from 'next/router'
import useSWR from 'swr'
import Register from '../../components/Register'

const fetcher = (url) =>
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

const EditContact = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: contact, error } = useSWR(id ? `/api/contacts/${id}` : null, fetcher)

    if (error) return <p>Failed to load</p>
    if (!contact) return <p>Loading...</p>

    const contactForm = {
        name: contact.name,
        email: contact.email,
        contact: contact.contact,
        address: contact.address,
        city: contact.city,

    }

    return <Register formId="edit-contact-form" contactForm={contactForm} forNewContact={false} />
}


export default EditContact