ya mira en natural language no más
- make sure que tengas python, pip y cmake instalados
- de ahí te vas a mandar el real

```
    pip install -r requirements.txt --default-timeout=100
```

- corre el test-esp32cam\testing\testing.ino
- de ahi ese enlace de la http://<IP_ADDRESS>/cam-mid.jpg vas a pegarlo variable `url` del face_detection_attendance.py
- runneas el program and there u go!


puedes poner las imágenes que desees en image_folder

todo: chequear l8r si la version del face recog models es correcta, tuve problemas con eso