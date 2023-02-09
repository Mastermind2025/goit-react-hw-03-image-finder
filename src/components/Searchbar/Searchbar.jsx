import { Formik, ErrorMessage } from 'formik';
import { SearchbarForm, SearchForm, SearchInput } from './Searchbar.styled';
import { SlEyeglass } from "react-icons/sl";

import PropTypes from 'prop-types';
import Notiflix from "notiflix";

const initialValues = {
    query: '',
}
const Searchbar = ({ onSearch }) => {
    
    const handleSubmit = (values, actions) => {
        const { query } = values;
        if (query.trim() === '') {
            return Notiflix.Notify.warning('Please, enter some words')
        }
        // console.log(query);
        onSearch(query);
        actions.resetForm();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <SearchbarForm>
                <SearchForm>
                    <button type="submit" >
                        <span>Search </span><SlEyeglass size={20} />
                    </button>
                    <SearchInput
                    type="text"
                    name="query"    
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                    <ErrorMessage name="query" component="div"/>
                </SearchForm>
            </SearchbarForm> 
        </Formik>
    )
}


export default Searchbar;

Searchbar.propTypes = {
    query: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
}