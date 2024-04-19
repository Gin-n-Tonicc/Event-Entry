function HomeSearch() {
  return (
    <div
      className="container-fluid bg-primary mb-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{ padding: 35 }}>
      <div className="container">
        <div className="row g-2">
          <div className="col-md-10">
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Keyword"
                />
              </div>
              <div className="col-md-4">
                <select className="form-select border-0">
                  <option selected={true}>Category</option>
                  <option value={1}>Category 1</option>
                  <option value={2}>Category 2</option>
                  <option value={3}>Category 3</option>
                </select>
              </div>
              <div className="col-md-4">
                <select className="form-select border-0">
                  <option selected={true}>Location</option>
                  <option value={1}>Location 1</option>
                  <option value={2}>Location 2</option>
                  <option value={3}>Location 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-dark border-0 w-100">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSearch;
