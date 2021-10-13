import React, { useState } from 'react'
import PostMessage from '../../components/postmessage/PostMessage'
import PostModal from '../../components/postmodal/PostModal'
import './PostsScreen.css'
function PostsScreen() {
    const dummyPosts = [
    ]
    const [posts, setPosts] = useState(dummyPosts)
    const addPost = (postObject) => setPosts([...posts, postObject])
    const [postModalIsActive, setPostModalIsActive] = useState(false)
    const changePostModalState = (status) => setPostModalIsActive(status)

    return (<>
        <div className={postModalIsActive ? 'overlay' : null}></div>
        <div id="postsScreenID" className="posts__screen ">

            <div className={!postModalIsActive ? 'post__modal__sticky' : null}>
                <PostModal isActive={postModalIsActive} changePostModalState={changePostModalState} addPost={addPost} />
            </div>
            <div className="posts">
                {posts.map(post =>
                    <PostMessage name={post.name} date={post.date} time={post.time} text={post.text} postMessagesImages={post.postMessagesImages} />
                )
                }
            </div>
        </div>

    </>
    )
}

export default PostsScreen
