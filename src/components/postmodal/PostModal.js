import React, { useState, useEffect } from 'react'
import './PostModal.css'

import CreateIcon from '@material-ui/icons/Create';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import RoomIcon from '@material-ui/icons/Room';
import DateRangeIcon from '@material-ui/icons/DateRange';

import { ClickAwayListener } from '@material-ui/core';

import { GIPHY_KEY } from '../../giphy'

function PostModal({ isActive, changePostModalState, addPost }) {
    useEffect(() => {
        fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=5&rating=g`)
            .then(response => { return response.json() }).then(result => generateGIFImages(result.data)
            )
    }, [])
    const [textArea, setTextArea] = useState('')
    const [gifWrapperState, setGifWrapperState] = useState('none')
    const [gifImagesArray, setGifImagesArray] = useState([])
    const [insertedGIF, setInsertedGIF] = useState([])
    const insertGIF = (imageURL) => setInsertedGIF([...insertedGIF, imageURL])
    const clearInsertedGIF = () => setInsertedGIF([])
    const clearTextArea = () => setTextArea('')
    const generateGIFImages = (gifArray) => setGifImagesArray(gifArray)
    const changeGifDisplay = () => { gifWrapperState === 'none' ? setGifWrapperState('block') : setGifWrapperState('none') }
    const closeGifDisplay = () => setGifWrapperState('none')

    const fetchGIF = (query) => {
        generateGIFImages([]);
        if (query.length > 0) {
            fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${query}&limit=5&offset=0&rating=g&lang=en`)
                .then(response => { return response.json() }).then(result => generateGIFImages(result.data)
                )
        }
        else {
            fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_KEY}&limit=5&rating=g`)
                .then(response => { return response.json() }).then(result => generateGIFImages(result.data)
                )
        }
    }

    const postHandler = () => {
        if (textArea.trim().length > 0 || insertedGIF.length > 0) {
            addPost({
                name: 'Default name',
                date: `${(new Date()).toLocaleDateString()
                    }`,
                time: `${(new Date()).toLocaleTimeString()}`,
                text: textArea,
                postMessagesImages: insertedGIF,
            })

            changePostModalState(false);
            clearInsertedGIF();
            clearTextArea();
            updateScroll();

        }
    }

    const updateScroll = () => {
        document.getElementById('appID').scrollTop = 0;
    }

    const postModalActionButton = (Icon, name) => (

        <div className="post__modal__action__button">
            {Icon}
            <span className="post__modal__action__btn__name  ml__5">{name}</span>
        </div>
    )

    const postModalOptionButton = (Icon, name, state = "none", functionName = () => { }) => (
        <>

            <div style={{ position: 'relative' }}>
                <div className="post__modal__option" onClick={() => functionName()}>
                    {Icon}
                    <span className="ml__5">{name}</span>
                </div>
                <div className="gif__wrapper" style={{ display: state }}>
                    <input type="text" name="" onChange={(e) => fetchGIF(e.target.value)} />
                    <div className="gif__img__container">
                        {gifImagesArray.length > 0 && gifImagesArray.map(image =>
                            <img className="gif__image" onClick={(e) => { insertGIF(e.target.src); changeGifDisplay(); }} src={image.images.downsized.url} alt="" />
                        )
                        }
                    </div>
                </div>
            </div>


        </>
    )





    return (<>
        <ClickAwayListener onClickAway={() => { changePostModalState(false); clearTextArea(); clearInsertedGIF() }}>
            {isActive === true ?

                <div className="post__modal__wrapper" >
                    <div className="post__modal">
                        <div className="post__modal__actions">
                            {postModalActionButton(<CreateIcon />, 'Create Post')}
                            {postModalActionButton(<PhotoLibraryIcon />, 'Photo / Video Album')}
                            {postModalActionButton(<VideoCallIcon />, 'Live Video')}

                            <div className="post__modal__action__button btn__modal__close" onClick={() => { changePostModalState(false); clearInsertedGIF(); clearTextArea(); }}>
                                <CloseIcon />
                            </div>

                        </div>
                        <div className="post__modal__content">
                            <div className="post__modal__content__text">
                                <img className="post__modal__content__dp" src="data:image/jpeg;base64,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" alt="profile DP" />
                                <div className="post__modal__content__input">
                                    <textarea name="" rows="3" placeholder="Write something here..." onChange={(e) => setTextArea(e.target.value)} value={textArea} />
                                </div>
                            </div>
                            <div className="post__modal__content__image">
                                {insertedGIF.map(imageURL =>
                                    <img className="gif__image" src={imageURL} alt="inserted GIF" />
                                )}
                            </div>

                            <div className="post__modal__options">

                                {postModalOptionButton(<PersonAddIcon />, 'Tag friends')}
                                {postModalOptionButton(<RoomIcon />, 'Check in')}
                                {postModalOptionButton(<PhotoSizeSelectActualIcon />, 'GIF', gifWrapperState, changeGifDisplay)}
                                {postModalOptionButton(<DateRangeIcon />, 'Tag friends')}

                            </div>
                        </div>
                        <div className="post__modal__post">
                            <button onClick={() => postHandler()} >Post</button>
                        </div>
                    </div>
                </div>
                :
                <div className="post__modal__content__text post__modal__content__text__wrapper">
                    <img className="post__modal__content__dp" src="data:image/jpeg;base64,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" alt="profile DP" />
                    <div className="post__modal__content__input">
                        <input name="" placeholder="Write a post..." onClick={() => { changePostModalState(true); updateScroll(); }} />
                    </div>
                </div>

            }
        </ClickAwayListener>
    </>
    )
}

export default PostModal





