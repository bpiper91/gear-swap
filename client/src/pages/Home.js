import React from 'react';
import GroupList from '../components/GroupList';

const Home = () => {
  return (
    <>
      <main>
        <div className='container text-center'>
          <div className="row justify-content-center">
            <div className='col-5'>
              <GroupList />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;