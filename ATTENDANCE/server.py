from http.server import BaseHTTPRequestHandler, HTTPServer
from threading import Thread
from face_detection_attendace import business

server_address = ('0.0.0.0', 8000)
on = False

class app(BaseHTTPRequestHandler):
  def do_POST(self):
    print("posteaste!")
    
    self.send_response(200)
    self.send_header('Content-type','text/html')
    self.end_headers()

    global on
    
    if ('/on' == self.path):
      message = "Hello, World"
      on=True
      self.wfile.write(bytes(message, "utf8"))
    
    
    if ('/off' == self.path):
        message = "bye, World"
        on=False
        self.wfile.write(bytes(message, "utf8"))


server = HTTPServer(server_address, RequestHandlerClass=app)

def thread1_main():
    server.serve_forever()

def thread2_main():
    while(True):
        print("thread 2 true")
        if on:
            print("thread 2 looping")
            business()

thread1 = Thread(target=thread1_main)
thread2 = Thread(target=thread2_main)
thread1.start()
thread2.start()

