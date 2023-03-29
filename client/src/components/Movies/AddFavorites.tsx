import "./Movies.css";

interface AddFavoritesProps {
  firstClick: boolean;
  onFirstFavoritesClick: () => void;
};

const AddFavorites = ({ firstClick, onFirstFavoritesClick }: AddFavoritesProps) => {
  return (
    <div className="favorites-block">
      <a href={firstClick ? "#no" : "#favorites"} onClick={onFirstFavoritesClick}>Add to Favorites</a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#F00"
        className="bi bi-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
    </div>
  );
};

export default AddFavorites;
