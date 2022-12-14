import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { PostEdit } from "./PostEdit"
import { getPostById, saveEditedPost, deletePost } from "../../managers/PostsManger"
import "./Posts.css"

export const PostDetails = () => {

    const navigate = useNavigate()
    const { postId } = useParams()
    const [categories, setCategories] = useState([])
    const [clickStatus, updateClickStatus] = useState(false)
    const [post, setPost] = useState({
        user_id: 0,
        category: 0,
        author: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true
    })

    const renderPost = () => {
        if (postId) {
            getPostById(postId).then((res) => {
                setPost(res)
            })
        }
    }

    useEffect(
        () => {
            getCategories()
                .then(data => setCategories(data))
        },
        []
    )

    useEffect(() => {

        renderPost()

    }, [postId])

    const confirmDelete = (evt, post) => {
        let text = 'Are you sure you want to delete'
        window.confirm(text)
            ? deletePost(post.id).then(() => navigate("/posts"))
            : <></>
    }


    const defaultDisplay = () => {
        return <article className="post_details" >
            <button type="button" className="btn__navigate button is-small is-dark ml-2" onClick={() => navigate("/posts")}>Back to Post</button>
            <div className="columns box" id="posts__postDetails">
                < section className="postDetails column">
                    <div className="details__title has-text-left is-size-5 mb-3">Title: {post.title}</div>
                    <figure>
                        <img className="mb-2" src={post.image_url} />
                    </figure>
                    <div className="details__content has-text-left">Content: {post.content}</div>
                    <div className="details__author--name has-text-left">Author: {post.author.full_name}</div>
                    <div className="details__publication--date has-text-left mt-2 is-size-7 is-italic"><span className="">Publish Date: {post.publication_date}</span></div>

                </section >
                <footer className="">
                    {
                        post.is_author
                            ? <>
                                <div>
                                    <button className="button is-small is-warning mb-1" id="btn_mypost" onClick={() => updateClickStatus(true)}>EDIT</button>
                                </div>
                                <div>
                                    <button className="btn_delete-post button is-small mb-1 is-danger" id="btn_mypost" onClick={(evt) => { confirmDelete(evt, post) }}>DELETE</button>
                                </div>
                            </>
                            : <></>
                    }

                    <div>
                        <button className="btn_delete-post button is-small is-outlined" id="btn_mypost" key={`post-${post.id}`} onClick={() => navigate(`/myPosts`)}>myPosts</button>
                    </div>
                </footer>


            </div>
        </article >
    }

    return <main>
        <h2 className="ml-5 mt-5">Post Details:</h2>
        {
            clickStatus
                ? <PostEdit post={post}
                    setPost={setPost}
                    renderPost={renderPost}
                    categories={categories}
                    updateClickStatus={updateClickStatus}
                />
                : defaultDisplay()
        }
    </main>

}