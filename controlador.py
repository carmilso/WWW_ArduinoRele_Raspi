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


while 1:
  ordre = raw_input()
  print ordre
  arduino.write(ordre)
	
	
arduino.close()
sys.exit()
