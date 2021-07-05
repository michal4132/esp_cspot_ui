from flask import Flask, request, send_from_directory, render_template

app = Flask(__name__, static_url_path="", static_folder="www")
app.config["DEBUG"] = True

#internal device variables
settings = {"device_name": "CSpot", "bitrate": "320"}
status = "playing"
current_song = 0
songs = [{"track": "Track 1", "artist": "Artist", "status": status},
         {"track": "Track 2", "artist": "Artist", "status": status},
         {"track": "Track 3", "artist": "Artist", "status": status},
         {"track": "Track 4", "artist": "Artist", "status": status}]

@app.route('/api/play', methods=["PUT"])
def play():
  global status
  status = "playing"
  return "OK"

@app.route('/api/pause', methods=["PUT"])
def pause():
  global status
  status = "paused"
  return "OK"

@app.route('/api/next', methods=["PUT"])
def next():
  global current_song
  current_song+=1
  if(current_song > len(songs)-1):
    current_song = 0
  return "OK"

@app.route('/api/prev', methods=["PUT"])
def prev():
  global current_song
  current_song-=1
  if(current_song < 0):
    current_song = 0
  return "OK"


@app.route('/api/playing')
def current_track():
  return songs[current_song]

@app.route('/api/settings', methods=["GET"])
def get_settings():
  return settings

@app.route('/api/settings', methods=["PUT"])
def set_settings():
  global settings
  settings = request.get_json()
  print(settings)
  return "OK"

@app.route('/')
def index():
  return app.send_static_file("index.html")


print("WARNING: ONLY FOR TESTING")
app.run(host='0.0.0.0', port=8000)
