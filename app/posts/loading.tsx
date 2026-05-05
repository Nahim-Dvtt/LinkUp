export default function Loading() {
  return (
    <div className="home">
      <h1>Chargement du post...</h1>

      <div className="post-card loading-card">
        <div className="loading-line title"></div>
        <div className="loading-line"></div>
        <div className="loading-line short"></div>
      </div>
    </div>
  );
}