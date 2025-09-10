import UploadForm from './UploadForm';

export default function UploadSection() {
  return (
    <section id="upload" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card shadow hero-card">
              <div className="card-body p-4 p-md-5">
                <h2 className="h4 mb-1">Analyze an image</h2>
                <p className="text-secondary mb-4">Supported: PNG, JPEG, WEBP. Max 10MB.</p>
                <UploadForm />
              </div>
            </div>
            <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: 12 }}>
              Files are processed in-memory and not stored on the server.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
