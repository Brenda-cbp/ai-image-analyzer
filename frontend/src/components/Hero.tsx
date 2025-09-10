export default function Hero() {
    return (
      <section className="hero-gradient">
        <div className="container py-5">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-lg-6">
              <h1 className="display-5 fw-bold mb-3">
                File <span className="text-primary">Upload</span>
              </h1>
              <p className="text-secondary mb-4">
                Upload an image and let our AI generate descriptive tags. Fast, secure and private.
              </p>
              <a className="btn btn-primary btn-lg" href="#upload">Read more</a>
            </div>
            <div className="col-12 col-lg-6 text-center">
              <img src="/illustration-upload.png" alt="Upload illustration" className="img-fluid hero-illu" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  