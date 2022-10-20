import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTags } from "../../managers/TagManager"
import './TagList.css'

export const TagList = () => {
    
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    
    useEffect(
        () => {
            getTags()
            .then(data => setTags(data))
        },
        []
    )

    return <section className="tags__list">
        {
            tags.map(tag => {
                return <div key={`tag--${tag.id}`} className="tag">
                    <h3 className="subtitle is-5 is-marginless">{tag.label}</h3>
                    <div className="tag__buttons">
                        <button className="tag__button button is-small is-success">Edit</button>
                        <button className="tag__button button is-small is-danger">Delete</button>
                    </div>
                </div>
            })   
        }
    </section>
}