###
#  Load GLiNER and expose a FastAPI endpoint for zero-shot NER (according to https://fastapi.tiangolo.com/#example-upgrade)
#  on port 8000.
#  Runs the actual zero-shot NER and forwards the results as JSON to the Express backend.
###
from fastapi import FastAPI
from gliner import GLiNER
from pydantic import BaseModel

app = FastAPI()

# Load GLiNER (https://github.com/urchade/GLiNER) model(s).
gliner_med = GLiNER.from_pretrained("urchade/gliner_medium-v2.1")

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
    res = gliner_med.predict_entities(req.text, req.labels, threshold=0.5, multi_label=False) # TODO: threshold should be variable through API
    return {"entityList": res}