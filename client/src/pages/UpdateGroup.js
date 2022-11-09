import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GROUP } from '../utils/queries';
import {UPDATE_GROUP} from '../utils/mutations';


const UpdateGroup= () => {
    const {id: groupId} = useParams();
    const {loading, err, data} = useQuery(QUERY_GROUP, {variables: {id: groupId}});

    const [groupInfo, setGroup] = useState({
        groupName: data.groupName,
        description: data.description,
        location: data.location,
        isPublic: data.isPublic

    });
    const [updateGroup, { error }] = useMutation(UPDATE_GROUP);

    const handleChange = (event) => {
        setGroup({...groupInfo, [event.target.name]: event.target.value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateGroup({
            variables: {...groupInfo}
        });
    }

    if (loading) {
        return <div>Loading...</div>;
      };
    
    if (err) {
        return <p>Something went wrong</p>;
    }

    
    return (

        <div>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Group Name:</label>
                    <input type="text" name="groupName"  placeholder={groupInfo.groupName} value={groupInfo.groupName} className='' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea type="text" name="description" placeholder={groupInfo.description} value={groupInfo.description} className='' onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location" placeholder={groupInfo.location} value={groupInfo.location} className='' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Is this group public?</label>
                    <select onChange={handleChange} className='' value={groupInfo.isPublic}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button type='submit' className=''>Submit</button>

            </form>
            {error && <div>Update group failed</div>}
        </div>
    );
};

export default UpdateGroup;