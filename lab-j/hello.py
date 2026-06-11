import sys

imie = "Szymon"
album = "57760"
python_version = f"{sys.version_info.major}.{sys.version_info.minor}"
executable_location = sys.executable

print(f"Hello {imie} ({album}). This environment is using Python version {python_version} at location {executable_location}.")