
import React, { Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from "notiflix";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem";

import { getImages, PER_PAGE } from '../services/pixabayAPI.jsx';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    query: '',
    status: 'idle',
    isLoadMore: true,
    
  }
  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    // console.log('prevState.page', prevState.page);
    // console.log('this.state.page', page);

    if (page !== prevState.page || query !== prevState.query) {
      try {
        this.setState({ status: 'pending' });
       
        const data = await getImages(query, page);
        const newImages = await data.hits;
        
        if (newImages.length === 0) {
          return Notiflix.Notify.warning('Please, enter new search!');
        }

        if (!this.isThereImagesOnPage(data.total, page)) {
          this.setState({ isLoadMore: false });
          Notiflix.Notify.info('The end');
        }
       
        this.setState(({ images }) => ({
          images: [...images, ...newImages],
          status: 'success',
        }));
      } catch (error) {
        this.setState({ status: 'rejected' })
        Notiflix.Notify.failure('Sorry ;-(')
        
      }
    }
  }

  isThereImagesOnPage(total, page){
    const totalPages = Math.floor(total / PER_PAGE);
    // console.log(totalPages);
    return page < totalPages;
    
  }
      
  handleSearch = (query) => {
    this.setState({
      query,
      page: 1,
      images: [],
      isLoadMore: true,
    });
  }

     
  loadMore = () => {
    this.setState(({page}) => ({ page: page + 1 }))
    console.log('hi, this is load more, page', this.state.page);
  };
  
  render() {
    const {images, status, isLoadMore} = this.state;
    console.log(images.length);
    return (
      <div>
        <Searchbar onSearch={this.handleSearch} />
        
        {images.length !== 0 &&
          <ImageGallery status={status} onClickLoadMore={this.loadMore} isLoadMore={isLoadMore}>
            {images.map(image => 
              <ImageGalleryItem
                key={image.id}
                image={image}
              />
            )}
          </ImageGallery>
        }
      </div>
    );
  }
};


App.propTypes = {
  status: PropTypes.string,
  isLoadMore: PropTypes.bool,
  onClickLoadMore: PropTypes.func,
  onSearch: PropTypes.func,
  images: PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
}

//installed

//notiflix
//npm i formik
//npm install react-loader-spinner --save
//npm install basiclightbox
//npm install react-icons --save
//npm i react-lazy-load-image-component