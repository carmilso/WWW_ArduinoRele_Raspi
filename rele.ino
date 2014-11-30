// rele.ino

#define rele 4

void setup() {
	Serial.begin(9600);
	pinMode(rele, OUTPUT);
	delay(25);
	digitalWrite(rele, 1);
}

void loop() {
	while(Serial.available()>0){
		char dato = Serial.read();
		if(dato=='0' || dato=='1')
			digitalWrite(rele, dato);
		delay(25);
	}
}
