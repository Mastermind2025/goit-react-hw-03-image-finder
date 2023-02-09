import React from "react";
import PropTypes from 'prop-types';
import { ButtonLoadMore, ButtonContainer } from './Button.styled';

const Button = ({ handleLoadMoreImage }) => {
    return (
        <ButtonContainer>
            <ButtonLoadMore type='button' onClick={handleLoadMoreImage}>
                Load more
            </ButtonLoadMore>
        </ButtonContainer>
        
    )
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func,
}