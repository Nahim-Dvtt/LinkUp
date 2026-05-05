export default function Loading() {
  return (
    <div className="home">
      <h1 className="home-title">Chargement...</h1>

      <div className="posts-container">
        {[1, 2, 3].map((i) => (
          <div key={i} className="post-card loading-card">
            <div className="loading-line title"></div>
            <div className="loading-line"></div>
            <div className="loading-line short"></div>
          </div>
        ))}
      </div>
    </div>
  );
}