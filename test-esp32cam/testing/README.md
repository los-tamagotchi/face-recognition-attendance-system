# face-recognition-attendance-system

## Set up ESP32-CAM Module

## Hardware Prep
- Connect your ESP32-CAM to ESP32_CAM_MB.
- Connect the ESP32_CAM_MB to your computer via USB cable
- Press BOOT + RESET Button on ESP32-CAM module

## Software Prep
- Install ESP32CAM Library. The esp32cam library provides an object oriented API to use OV2640 camera on ESP32 microcontroller. It is a wrapper of esp32-camera library. [Download this repo as .zip format](https://github.com/yoursunny/esp32cam/tree/main?tab=readme-ov-file)
- Once downloaded add this zip library to Arduino Library Folder. To do so follow the following steps: Open Arduino > Sketch > Include Library > Add .ZIP Library… > Navigate to downloaded zip file -> add
- In Arduino IDE, search "esp32" in Library Manager and install the Espressif Systems package
- Go to Tools > Board > ESP32 Arduino. Select AI Thinker ESP32-CAM board
- Go to Tools > Serial Monitor. Make sure the serial monitor speed is set to 115200 baud

## Code Load
- Replace "ssid" y "password" with your WiFi network (preferably not 5G)
- Verify the correct COM port is selected
- Press Verify, then Upload


When the ESP32-CAM has connected to the WiFi network, you will see the assigned IP address on the serial monitor.
Open a web browser and navigate to http://<IP_ADDRESS>/cam-lo.jpg, http://<IP_ADDRESS>/cam-mid.jpg, or http://<IP_ADDRESS>/cam-hi.jpg to View captured images in different resolutions.