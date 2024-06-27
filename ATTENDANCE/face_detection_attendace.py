import cv2
import urllib.request
import numpy as np
import os
from datetime import datetime
from datetime import timedelta
import face_recognition

# Rutas de los directorios y archivos
path = r'C:\Users\Admin\Desktop\face-recognition-attendance-system\ATTENDANCE\image_folder'
path_to_attendance_folder = r'C:\Users\Admin\Desktop\face-recognition-attendance-system\ATTENDANCE'
path_to_csv = os.path.join(path_to_attendance_folder, 'Attendance.csv')

# Verificar si el archivo de asistencia existe y crearlo si no
if not os.path.exists(path_to_csv):
    with open(path_to_csv, 'w') as f:
        f.write("Name,Time\n")  # Escribir la cabecera si el archivo se crea nuevo

images = []
classNames = []
myList = os.listdir(path)
#print(myList)
for cl in myList:
    curImg = cv2.imread(os.path.join(path, cl))
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
#print(classNames)


def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList

#
#def markAttendance(name):
#    with open(path_to_csv, 'r+') as f:
#        # Leer todas las líneas existentes en el archivo CSV
#        lines = f.readlines()
#        
#        # Obtener la hora actual
#        now = datetime.now()
#        
#        # Definir el lapso de tiempo permitido (1 hora)
#        time_threshold = timedelta(hours=1)
#        
#        # Recorrer todas las líneas para verificar si ya existe una entrada reciente
#        already_marked = False
#        for line in lines:
#            entry_name, entry_time_str = line.strip().split(',')
#            entry_time = datetime.strptime(entry_time_str, '%H:%M:%S')
#            
#            # Verificar si el nombre coincide y el tiempo está dentro del lapso permitido
#            if name == entry_name and now - entry_time <= time_threshold:
#                already_marked = True
#                break
#        
#        # Si no está marcado aún dentro del lapso de tiempo permitido, añadir la entrada
#        if not already_marked:
#            dtString = now.strftime('%H:%M:%S')
#            f.write(f'{name},{dtString}\n')
#

encodeListKnown = findEncodings(images)
print('Encoding Complete')

url = 'http://<ip>/cam-hi.jpg'

def business():
    print("shamaste")
    img_resp = urllib.request.urlopen(url)
    print("shamaste1")
    imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
    print("shamaste2")
    img = cv2.imdecode(imgnp, -1)
    print("shamaste3")
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    print("shamaste4")
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    print("shamaste5")
    facesCurFrame = face_recognition.face_locations(imgS)
    print("shamaste6")
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    print("shamaste7")
    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        print("shamaste8")
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        print("shamaste9")
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
        print("shamaste10")
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            print("shamaste11")
            name = classNames[matchIndex].upper()
            print("shamaste12")
            y1, x2, y2, x1 = faceLoc
            print("shamaste13")
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            print("damaris")
            
            #markAttendance(name)

        print("sdfg1")
        cv2.imshow('Webcam', img)
        print("sdfg2")
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break

cv2.destroyAllWindows()
