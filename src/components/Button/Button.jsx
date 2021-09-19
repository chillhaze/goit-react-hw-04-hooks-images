import PropTypes from 'prop-types';

export const Button = ({ onBtnClick }) => {
  return (
    <div className="btn_wrapper">
      <button type="button" className="Button" onClick={onBtnClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onBtnClick: PropTypes.func,
};
