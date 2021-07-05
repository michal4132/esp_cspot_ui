from flask import Flask, request, send_from_directory, render_template

app = Flask(__name__, static_url_path="", static_folder="www")
app.config["DEBUG"] = True

#internal device variables
device_name = "CSpot"
bitrate = "320"
status = "playing"

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

@app.route('/api/playing')
def current_track():
  return '{"track": "Track name", "artist": "Artist", "status": "' + status + '"}'

@app.route('/api/settings/bitrate', methods=["GET"])
def get_bitrate():
  return bitrate

@app.route('/api/settings/bitrate/<br>', methods=["PUT"])
def set_bitrate(br):
  global bitrate
  bitrate = br
  return "OK"

@app.route('/api/settings/name', methods=["GET"])
def get_name():
  return device_name

@app.route('/api/settings/name/<devname>', methods=["PUT"])
def set_name(devname):
  global device_name
  device_name = devname
  return "OK"

@app.route('/')
def index():
  return app.send_static_file("index.html")


print("WARNING: ONLY FOR TESTING")
app.run(host='0.0.0.0', port=8000)
