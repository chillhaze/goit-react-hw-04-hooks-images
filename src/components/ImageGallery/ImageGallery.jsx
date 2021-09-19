import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ searchResult, onSelect }) => {
  return (
    <section>
      <ul className="ImageGallery">
        {searchResult.map(item => {
          const itemId = uuidv4();

          return (
            <ImageGalleryItem
              key={itemId}
              item={item}
              onClick={() => onSelect(item)}
            />
          );
        })}
      </ul>
    </section>
  );
};

ImageGallery.propTypes = {
  onSelect: PropTypes.func,
  searchResult: PropTypes.arrayOf(PropTypes.object),
};
