import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { PicData } from '../../model';
import './gallery.css'

interface Props {
    photos: PicData[];
}

const Gallery: React.FC<Props> = ({photos}: Props) => {
    const [modal, setModal] = useState<Boolean>(false)
    const [selectedImg, setSelectedImg] = useState<string>('');

    const selectPic = (imgSrc: string) => {
        setModal(!modal);
        setSelectedImg(imgSrc);
    }

    return (
        <>
        <div className={modal ? 'modal open' : 'modal'} onClick={() => setModal(!modal)}>
            <img src={selectedImg} />
            <CloseIcon onClick={() => setModal(!modal)} />
        </div>

        {modal}
        
        <div className='gallery'>
            {photos.map((item, index) => {
                return (
                    <div className='photo' key={index} onClick={() => selectPic(item.src)}>
                        <img src={item.src} style={{width: '100%'}}/>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default Gallery
