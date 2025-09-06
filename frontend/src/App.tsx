import UploadForm from './components/UploadForm';

export default function App() {
  return (
    <main style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>AI Image Analyzer</h1>
      <p>Upload an image to get AI-generated tags.</p>
      <UploadForm />
    </main>
  );
}
