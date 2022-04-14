import dbConnect from '../lib/dbConnect'
import Contact from '../models/Contact'
import Link from 'next/link'

export default function Index({ contacts }) {
  return (
    <>
      {/* Create a card for each pet */}
      {contacts.map((contact) => (
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
            </div>


            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${contact._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${contact._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>

      ))
      }
    </>

  )
}
/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Contact.find({})
  const contacts = result.map((doc) => {
    const contact = doc.toObject()
    contact._id = contact._id.toString()
    return contact
  })

  return { props: { contacts: contacts } }

}




