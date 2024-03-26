import { Link } from "react-router-dom";

export default function CollectionSm({ collection }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <Link
        className="text-decoration-none"
        to={`/user/${collection.user_id}/collection/${collection.id}`}
      >
        <img
          style={{ objectFit: "contain", height: "12rem" }}
          src={collection.imageUrl}
          className="card-img-top"
          alt="collection image"
        />
        <div className="card-body">
          <h5 className="card-title">{collection.name}</h5>
          <p className="card-text">
            <small>{collection.topic}</small>
          </p>
        </div>
      </Link>
    </div>
  );
}
