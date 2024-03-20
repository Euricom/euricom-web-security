import { useNavigate } from "react-router-dom";
import { Session, useSession } from "../common/useSession";
import { useEffect, useState } from "react";
import { clearReviews, getReviews, postReviews, type Review } from "../common/api";

const Profile = ({ session }: { session: Session }) => {
  const navigate = useNavigate();
  const { logout } = useSession();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="m-2">
      {session.authenticated && (
        <div className="">
          <p>Logged in as: {session.userName}</p>
          <button className="btn btn-sm btn-primary" onClick={() => logout()}>
            Logout
          </button>
        </div>
      )}
      {!session.authenticated && (
        <button className="btn btn-sm btn-primary" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
};

const MovieDetails = () => {
  return (
    <section id="movie-data" className="m-2 flex gap-2">
      <img id="playbill" src="/good-bad-ugly.jpg" width="200px" />
      <div id="movie-details" className="w-[350px]">
        <b>Title:</b> The Good, the Bad and the Ugly
        <br />
        <b>Year:</b> 1966
        <br />
        <b>Directed by:</b> Sergio Leone
        <br />
        <b>Starring:</b> Clint Eastwood, Lee Van Cleef, Eli Wallach
        <br />
        <b>Duration:</b> 177 min.
        <br />
        <br />
        <b>Plot:</b>
        <p>
          During the Civil War, two men forming an uneasy alliance as bounty hunting scammers have to fight against a
          third in a race to find a treasure in gold buried in a remote cemetery.
        </p>
        <button type="submit">Play</button>
      </div>
    </section>
  );
};

const Home = () => {
  const { session } = useSession();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  const handleSubmitReview = async () => {
    console.log("Review submitted...", review);
    const reviews = await postReviews({ text: review });
    setReviews(reviews);
  };

  const handleClear = () => {
    clearReviews();
    setReviews([]);
  };

  if (!session) {
    return null;
  }

  return (
    <div>
      <Profile session={session} />

      <MovieDetails />

      <h2>Reviews</h2>
      <div className="">
        <div>
          <div>
            <textarea
              id="review"
              className="textarea textarea-bordered w-[500px] h-[100px]"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="space-x-2">
            <button className="btn btn-sm btn-secondary" onClick={handleSubmitReview} disabled={!session.authenticated}>
              Submit
            </button>
            <button className="btn btn-sm" onClick={handleClear} disabled={!session.authenticated}>
              clear
            </button>
          </div>
        </div>
        <div className="w-[500px]">
          {reviews.map((review: Review) => (
            <div key={review.id} className="m-2">
              <p>
                <b>By:</b> {review.userName} - <b>Text:</b> {review.text}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
