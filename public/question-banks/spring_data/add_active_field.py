import json

INPUT_FILE = "claude_spring_data.json"
OUTPUT_FILE = "claude_spring_data.json"

# IDs de preguntas a marcar como inactive
INACTIVE_IDS = {19, 20, 56, 57, 68}

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    if "active" not in q:
        q["active"] = False if q["id"] in INACTIVE_IDS else True
    else:
        if q["id"] in INACTIVE_IDS:
            q["active"] = False

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

active = sum(1 for q in questions if q.get("active"))
inactive = sum(1 for q in questions if not q.get("active"))
print(f"Total: {len(questions)} | Activas: {active} | Inactivas: {inactive}")
print("Inactivas:", [q["id"] for q in questions if not q.get("active")])