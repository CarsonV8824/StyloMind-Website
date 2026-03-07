import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import './global_componets.css';

const STORAGE_KEY = 'uploadedText';
GlobalWorkerOptions.workerSrc = pdfWorker;

async function extractPdfText(file: File): Promise<string> {
  const data = await file.arrayBuffer();
  const pdf = await getDocument({ data }).promise;
  let fullText = '';

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str ?? '')
      .join(' ')
      .trim();
    fullText += `${pageText}\n\n`;
  }

  return fullText.trim();
}

export default function TextUpload() {
  const [textContent, setTextContent] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? ''; // question marks are like the else statement in Python returns
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, textContent);
  }, [textContent]);

  const onDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const isPdf =
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf');

      const parsedText = isPdf ? await extractPdfText(file) : await file.text();
      setTextContent(parsedText);
    } catch (error) {
      console.error('File reading error', error);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
    },
    noClick: true,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button className="ComponetButton" type="button" onClick={open}>
          Choose .txt or .pdf
        </button>
      </div>

      {textContent && (
        <div className="textPreview">
          <h4 className="text">Preview:</h4>
          <pre className='uploadedText'>{textContent}</pre>
        </div>
      )}
      {!textContent && (
        <p className="text"></p>
      )}
    </div>
  );
}
