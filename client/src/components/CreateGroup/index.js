import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP } from '../../utils/mutations';
import {  QUERY_GROUPS_PUBLIC, QUERY_ME } from '../../utils/queries';
const CreateGroup = () => {
    
    const [addGroup, { error }] = useMutation(CREATE_GROUP)

    const [newGroupInfo, setNewGroup] = useState({
        groupName: "",
        description: "",
        location: "",
        isPublic: true
      });


    
    const handleChange = (event) => {
        setNewGroup({...newGroupInfo, [event.target.name]: event.target.value})
        console.log(newGroupInfo);
    };

    const handleFormSubmit = async event => {
     event.preventDefault();

     try {
      
       await addGroup({
        variables: {...newGroupInfo},
        refetchQueries: [{query:QUERY_GROUPS_PUBLIC}, {query: QUERY_ME}]
       });

       setNewGroup({
        groupName: "",
        description: "",
        location: "",
        isPublic: true
       })

    } catch (e) {
        console.error(e);
      }
      };
      
      return (

        <div>
            <form onSubmit={handleFormSubmit}>

                <div>
                    <label>Group Name:</label>
                    <input type="text" name="groupName"   value={newGroupInfo.groupName} className='' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea type="text" name="description"  value={newGroupInfo.description} className='' onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" name="location"  value={newGroupInfo.location} className='' onChange={handleChange}></input>
                </div>
                <div>
                    <label>Is this group public?</label>
                    <select onChange={handleChange} className='' name="isPublic" value={newGroupInfo.isPublic}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button type='submit' className=''>Submit</button>

            </form>
            {error && <div>Create group failed</div>}
        </div>
    );
}
export default CreateGroup;