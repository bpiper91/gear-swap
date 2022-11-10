import React from "react";
import GroupList from "../components/GroupList";
import CreateGroup from "../components/CreateGroup";

const Home = () => {
  return (
    <main className="home-main-class">
      <div className="row justify-content-center">
        <div className="col-4">
          <CreateGroup />
        </div>
        <div className="col-4">
          <GroupList />
        </div>
      </div>
    </main>
  );
};
export default Home;
