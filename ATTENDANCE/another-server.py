from flask import Flask, request, jsonify, Response, send_file, send_from_directory
from threading import Thread
import requests
from face_detection_attendace import business
import time

app = Flask(__name__)
active = False
initial_time = 600
remaining_time = 600

camera_url = "http://192.168.0.156/cam-mid.jpg"
csv_path = "/home/damaris/Coding/face-recognition-attendance-system/ATTENDANCE/Attendance.csv"

@app.route('/on', methods=['POST'])
def turn_on():
    global active, remaining_time, initial_time
    data = request.get_json()
    active = data.get('active')
    initial_time = data.get('initialTime')
    remaining_time = initial_time

    if remaining_time > 0:
        def auto_turn_off():
            global active, remaining_time
            for i in range(remaining_time):
                time.sleep(1)
                remaining_time -= 1
            active = False

    Thread(target=auto_turn_off).start()

    return jsonify(message="Hello, World", active=active, remainingTime=remaining_time, initialTime=initial_time), 200

@app.route('/off', methods=['POST'])
def turn_off():
    global active, initial_time
    data = request.get_json()
    active = data.get('active')
    initial_time = data.get('intialTime')
    print("remaining time: ", remaining_time)

    return jsonify(message="Hello, World", active=active, remaining_time=remaining_time), 200

@app.route('/status', methods=['GET'])
def get_status():
    global active, remaining_time, initial_time
    print(initial_time)
    print(remaining_time)
    return jsonify(active=active, remainingTime=remaining_time, initialTime=initial_time), 200

@app.route('/image/<filename>', methods=['GET'])
def get_image(filename):
    try:
        return send_from_directory(image_folder, filename)
    except Exception as e:
        return jsonify(message=f"Error fetching image: {e}"), 500

#@app.route('/video_feed')
def video_feed():
    def generate():
        while True:
            try:
                response = requests.get(camera_url, timeout=10)
                if response.status_code == 200:
                    yield (b'--frame\r\n'
                           b'Content-Type: image/jpeg\r\n\r\n' + response.content + b'\r\n')
                else:
                    print(f"Received status code: {response.status_code}")
                    time.sleep(1)
            except requests.RequestException as e:
                print(f"Error fetching image: {e}")
                time.sleep(3)

    return Response(generate(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/reports', methods=['GET'])
def get_reports():
    return send_file(csv_path, as_attachment=True)



def run_flask():
    app.run(host='0.0.0.0', port=8000)

def business_thread():
    while True:
        if active:
            print("Running business logic...")
            business(camera_url)
            time.sleep(1)

# if __name__ == '__main__':
flask_thread = Thread(target=run_flask)
business_logic_thread = Thread(target=business_thread)

flask_thread.start()
business_logic_thread.start()

flask_thread.join()
business_logic_thread.join()
