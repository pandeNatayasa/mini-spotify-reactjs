import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';

function scrollContainer(id, { isNegative } = {}) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    console.log("🚀 ~ return ~ scrollableContainer:", scrollableContainer.offsetWidth)
    const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
    console.log("🚀 ~ return ~ amount:", amount)

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

export default function DiscoverBlock({ text, id, data, imagesKey = 'images', messageFetch }) {
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      <div className="discover-block__row" id={id}>
        {
          data.length ? (
            data.map(({ [imagesKey]: images, name }) => (
              <DiscoverItem key={name} images={images} name={name} />
            ))
          ) : <h3>{messageFetch}</h3>
        }
      </div>
    </div>
  );
}
