import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleEscClose);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEscClose);
    }

    handleEscClose = (evt) => {
        if (evt.code === "Escape") {
            this.props.onClose();
        }
    };

    handleOverlayClose = (evt) => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    };

    render() {
        
        // console.log(this.props.children);
        return createPortal(
            <Overlay onClick={this.handleOverlayClose}>
                <ModalContainer>
                    {this.props.children}
                    {/* <LazyLoadImage src={src} alt={alt} /> */}
                </ModalContainer>
            </Overlay>,
            modalRoot
        );
    }
}
Modal.propTypes = {
    handleOverlayClose: PropTypes.func,
    onClick: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    
}