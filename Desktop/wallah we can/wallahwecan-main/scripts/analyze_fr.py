from pathlib import Path
import re

text = Path("C:/Users/USER/Downloads/wallah-we-can-nav/messages/fr.json").read_text(encoding="utf-8")
strings = re.findall(r'"((?:\\.|[^"])*)"', text)
print(len(strings))
print(strings[:50])
