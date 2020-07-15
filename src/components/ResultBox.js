import React from 'react';

const ResultBox = (props) => {
  return (
    <>
      <a href={props.url} target="_blank" rel="noopener noreferrer">{props.message}</a>
    </>
  );
};

export default ResultBox;