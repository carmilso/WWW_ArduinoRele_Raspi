#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import serial
import time

arduino = serial.Serial()

try:
	arduino = serial.Serial('/dev/ttyACM0', 9600)
except:
	print "No s'ha pogut connectar a l'arduino"
	sys.exit()

if len(sys.argv) != 2:
    sys.exit()

#ordre = sys.argv[1]

while 1:
	ordre = input()

	print "S'ha rebut un", ordre
	time.sleep(5)
	arduino.write('0')
	time.sleep(0.25)
arduino.close()
print "acabat"

sys.exit()
