import Modal from 'components/Modal';
import React, { Component } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component{
    state = {
        showModal: false,
    }


    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
        console.log(this.state.showModal)
    }

    render() {
        const { image } = this.props;
        const { id, webformatURL, tags, largeImageURL } = image;
        const { showModal } = this.state;
        return (
            <>
                <GalleryItem key={id}>
                    <GalleryItemImg
                        src={webformatURL}
                        alt={tags}
                        loading="lazy" 
                        onClick={this.toggleModal}   
                    />
                </GalleryItem>
                
                {showModal && (
                    < Modal onClose={this.toggleModal}>
                        <LazyLoadImage src={largeImageURL} alt={tags} />
                    </Modal>
                )}
            </>
            
        )
    }
}
ImageGalleryItem.propTypes = {
    showModal: PropTypes.bool,
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
    toggleModal: PropTypes.func,
    onClose: PropTypes.func,
}