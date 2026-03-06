from backend.app.schemas.text_schema import TextPayload
from backend.app.services.ML_Stuff.data_for_graphs import TextDashboardAnalyzer
from backend.app.services.ML_Stuff.updated_model_training import test_text_for_ai


def get_text_payload() -> TextPayload:
    return TextPayload(user_text={"key": "value"})

def create_text_payload(payload: TextPayload) -> TextPayload:
    analyzer = TextDashboardAnalyzer()
    analyzed_text = analyzer.analyze_text(payload.user_text.get("content", ""))
    payload.user_text["analysis"] = str(analyzed_text)

    ai_test_result = test_text_for_ai(payload.user_text.get("content", ""))
    payload.user_text["ai_test"] = str(ai_test_result)

    return payload

