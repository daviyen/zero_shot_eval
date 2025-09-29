###
#  Load GLiNER and expose a FastAPI endpoint for zero-shot NER (according to https://fastapi.tiangolo.com/#example-upgrade).
#  Runs the actual zero-shot NER and forwards the results as JSON to the Express backend.
###
from fastapi import FastAPI
from gliner import GLiNER
from pydantic import BaseModel

app = FastAPI()

# Load GLiNER (https://github.com/urchade/GLiNER) model(s).
gliner_small = GLiNER.from_pretrained("urchade/gliner_small-v2.1")
gliner_med = GLiNER.from_pretrained("urchade/gliner_medium-v2.1")
gliner_large = GLiNER.from_pretrained("urchade/gliner_large-v2.1")
gliner_multi = GLiNER.from_pretrained("urchade/gliner_multi-v2.1")

# Change model here
model = gliner_med

# Define NER request base model
class PredictionRequest(BaseModel):
    text: str
    labels: list[str]

# Expose endpoint for GLiNER zero-shot NER
@app.post("/ner")
async def run_ner(req: PredictionRequest):
    # Run GLiNER NER
    if not req.labels:
        return { "ERROR! Label list is empty!"}
    res = gliner_med.predict_entities(req.text, req.labels, threshold=0.1)
    return {"entityList": res}