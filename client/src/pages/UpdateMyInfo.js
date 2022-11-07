import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const UpdateMyInfo = () => {
    const [updateUser, { error }] = useMutation(UPDATE_USER);
    const { data: me } = useQuery(QUERY_ME);

    const [formState, setFormState] = useState({
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        location: me.location
    });

    const [emailValidationState, setEmailValidationState] = useState('');

    // update state when form changes
    const handleFormChange = (event) => {
        if (event.target.name === 'myFirstName') {
            setFormState({ ...formState, myFirstName: event.target.value });
        } else if (event.target.name === 'myLastName') {
            setFormState({ ...formState, myLastName: event.target.value });
        } else if (event.target.name === 'myEmail') {
            setFormState({ ...formState, myEmail: event.target.value });

            // check to make sure email is correct format
            const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.email);

            // if incorrect, set validation state to an error message
            if (!result) {
                setEmailValidationState('Please enter a valid email address.')
            } else {
                setEmailValidationState('');
            };
        } else if (event.target.name === 'myLocation') {
            setFormState({ ...formState, myLocation: event.target.value });
        } else {
            return false;
        };
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (emailValidationState !== '') {
            return false;
        };

        try {
            const { data } = await updateUser({
                variables: { ...formState }
            });
        } catch (e) {
            console.error(e);
        };
    };

    return (
        <div className='update-my-info'>
            <form id='update-my-info' onSubmit={handleFormSubmit}>
                <label for='myFirstName'>First Name: </label>
                <input
                    name='myFirstName'
                    id='myFirstName'
                    placeholder='First Name'
                    value={formState.firstName}
                    onChange={handleFormChange}
                />
                <label for='myLastName'>Last Name: </label>
                <input
                    name='myLastName'
                    id='myLastName'
                    placeholder='Last Name'
                    value={formState.lastName}
                    onChange={handleFormChange}
                />
                <label for='myEmail'>Email Address: </label>
                <input
                    name='myEmail'
                    id='myEmail'
                    placeholder='Email Address'
                    value={formState.email}
                    onChange={handleFormChange}
                />
                <label for='myLocation'>Location: </label>
                <input
                    name='myLocation'
                    id='myLocation'
                    placeholder='Location'
                    value={formState.location}
                    onChange={handleFormChange}
                />
                <button type='submit' id='update-my-info-btn' value='update-my-info'>Update My Information</button>
            </form>
            {emailValidationState !== '' && `<p>${emailValidationState}</p>`}
            {error && <p>Failed to update user information.</p>}
        </div>
    );
};

export default UpdateMyInfo;