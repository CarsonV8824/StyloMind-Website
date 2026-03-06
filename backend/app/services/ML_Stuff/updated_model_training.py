import pandas as pd
from pathlib import Path
try:
    from backend.app.services.ML_Stuff.graph_NLP import style_document
except ModuleNotFoundError:
    from graph_NLP import style_document

from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import re

import joblib
#sentences = re.split(r'(?<=[.!?])\s+', text)
DATA_DIR = Path(__file__).resolve().parent / "data"
BALANCED_CSV = DATA_DIR / "balanced.csv"
MODEL_PATH = DATA_DIR / "ridge_model.pkl"
TFIDF_PATH = DATA_DIR / "tfidf_vectorizer.pkl"


def make_model() -> None:
    df = pd.read_csv(BALANCED_CSV)

    texts = df["text"].to_list()
    labels = df["generated"].to_list()

    #labels = [1 if label == "ai" else 0 for label in labels]
    
    combined = zip(texts, labels)

    x_data = []
    y_data = []
    for text, label in list(combined):
        sentences = re.split(r'(?<=[.!?])\s+', text)
        print(sentences)
        for sentence in sentences:
            x_data.append(style_document(sentence))
            y_data.append(label)
    print(x_data, y_data)
    

    # Vectorize
    tfidf = TfidfVectorizer(stop_words=None)
    X = tfidf.fit_transform(x_data)

    # Train model
    Y = y_data

    model = LogisticRegression()
    model.fit(X, Y)

    # Save model + vectorizer
    joblib.dump(model, MODEL_PATH)
    joblib.dump(tfidf, TFIDF_PATH)

def test_text_for_ai(text: str) -> dict:
    if not text:
        raise ValueError("Input text is required")

    # Load model + vectorizer
    model: LogisticRegression = joblib.load(MODEL_PATH)
    tfidf: TfidfVectorizer = joblib.load(TFIDF_PATH)

    final = {}
    sentences = re.split(r'(?<=[.!?])\s+', text)
    #print(sentences)

    for index, sentence in enumerate(sentences):
        if not sentence.strip():
            continue

        styled = style_document(sentence) or ""
        combined = (styled).strip()

        x = tfidf.transform([combined])  # <-- transform, not fit_transform
        result = model.predict(x)[0]     # <-- extract scalar

        final[sentences[index]] = float(result)

    return final

if __name__ == "__main__":
    make_model()
    print(test_text_for_ai("A quiet breeze drifted through the open window, carrying the scent of spring into the room."))
