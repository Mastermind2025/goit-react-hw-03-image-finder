import { GalleryContainer } from './ImageGallery.styled';
import Loader from 'components/Loader';
import Button from 'components/Button';
import PropTypes from 'prop-types';


const ImageGallery = ({status, onClickLoadMore, isLoadMore, children}) => {
    console.log('Hi');
    return (
        <>
            <GalleryContainer>
                {children}
            </GalleryContainer>
            {status === 'pending' && <Loader />}

            {status === 'success' && isLoadMore && <Button handleLoadMoreImage={onClickLoadMore} />}
        </>
    )
}

    
export default ImageGallery;

ImageGallery.propTypes = {
    status: PropTypes.string.isRequired,
    onClickLoadMore: PropTypes.func.isRequired,
    
}
