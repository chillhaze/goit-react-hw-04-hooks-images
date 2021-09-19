import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, item, onClick }) => {
  const { webformatURL, tag } = item;
  // console.log(item);
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt={tag}
        onClick={onClick}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  item: PropTypes.objectOf(PropTypes.any),
  onClick: PropTypes.func,
  src: PropTypes.string,
  tag: PropTypes.string,
};
