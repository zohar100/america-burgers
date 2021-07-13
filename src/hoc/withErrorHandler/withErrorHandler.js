import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Hoc from '../hoc/Hoc';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Hoc>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message: null}
                </Modal>
                <WrappedComponent {...props}/>
            </Hoc>
        )
    }
}

export default withErrorHandler;