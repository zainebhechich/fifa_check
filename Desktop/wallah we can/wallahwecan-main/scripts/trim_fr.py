from pathlib import Path

path = Path("C:/Users/USER/Downloads/wallah-we-can-nav/messages/fr.json")
text = path.read_text(encoding="utf-8")
marker = '"hello": "Bonjour"'
idx = text.find(marker)
if idx == -1:
    raise SystemExit("marker not found")
start = max(0, idx - 4)
path.write_text("{" + text[start:], encoding="utf-8")
