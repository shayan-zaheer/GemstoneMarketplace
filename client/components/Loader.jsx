import React from 'react';
import { HashLoader } from 'react-spinners';

const override = {
    display: "block",
    margin: "0 auto",
};

const Loader = ({loading}) => {
  return (
    <div className="w-screen h-[50vh] flex justify-center items-center">
    <HashLoader
        color="#665f69"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
  );
};

export default Loader;
